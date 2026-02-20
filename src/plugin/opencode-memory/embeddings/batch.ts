/**
 * Batch Embedding with Retry and Fallback
 * 
 * Processes embeddings in batches with:
 * - Single retry with 2s backoff (per user decision: "retry once")
 * - Rate limit handling (max 10s wait)
 * - FTS-only fallback when provider fails
 * - Cache-first strategy
 */
import type { EmbeddingBatchResult, EmbeddingProvider } from './types';
import { getLockedProvider, isFTSOnly } from './provider-lock';
import { getCachedEmbedding, setCachedEmbedding } from './cache';
import { getFeatureConfig } from '../../../lib/config';
import type { Chunk } from '../chunking/chunker';

// Single retry with 2s backoff (per user decision: "retry once")
const BACKOFF_DELAYS = [2000];
const MAX_WAIT_FOR_RATE_LIMIT = 10000; // 10s per user decision

/**
 * Check if error is a rate limit error.
 */
function isRateLimitError(error: unknown): boolean {
  if (error instanceof Error) {
    const message = error.message.toLowerCase();
    return (
      message.includes('429') ||
      message.includes('rate limit') ||
      message.includes('too many requests')
    );
  }
  return false;
}

/**
 * Extract Retry-After header value in milliseconds.
 */
function getRetryAfterMs(error: unknown): number | null {
  // Most APIs return this in error or response headers
  // For simplicity, default to 2s if rate limited
  if (isRateLimitError(error)) {
    return 2000;
  }
  return null;
}

/**
 * Sleep for specified milliseconds.
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

/**
 * Embed texts with retry logic.
 */
async function embedWithRetry(
  provider: EmbeddingProvider,
  texts: string[],
  backoffDelays: number[] = BACKOFF_DELAYS
): Promise<Map<string, number[] | null>> {
  const results = new Map<string, number[] | null>();

  for (let attempt = 0; attempt <= backoffDelays.length; attempt++) {
    try {
      const embeddings = await provider.embed(texts);
      
      for (const result of embeddings) {
        results.set(texts[result.index], result.embedding);
      }
      
      return results;
    } catch (error) {
      const isLastAttempt = attempt === backoffDelays.length;
      
      if (isRateLimitError(error) && !isLastAttempt) {
        const retryAfter = getRetryAfterMs(error);
        const delay = Math.min(retryAfter ?? backoffDelays[attempt], MAX_WAIT_FOR_RATE_LIMIT);
        
        console.warn(`[embeddings] Rate limited, waiting ${delay}ms before retry`);
        await sleep(delay);
        continue;
      }
      
      if (!isLastAttempt) {
        console.warn(`[embeddings] Embedding failed, retry ${attempt + 1}/${backoffDelays.length}`);
        await sleep(backoffDelays[attempt]);
        continue;
      }
      
      // All retries exhausted - mark as failed
      for (const text of texts) {
        results.set(text, null);
      }
    }
  }

  return results;
}

/**
 * Embed an array of texts in batches.
 * Uses cache-first strategy, falls back to FTS-only on failure.
 */
export async function embedBatch(
  texts: string[],
  provider: EmbeddingProvider
): Promise<EmbeddingBatchResult> {
  const results = new Map<string, number[] | null>();
  let successCount = 0;
  let failureCount = 0;

  const config = getFeatureConfig('memory');
  const batchSize = config.embeddings.batchSize ?? 100;
  const providerName = provider.name;
  const model = provider.model;

  // Process in batches
  const batches: string[][] = [];
  for (let i = 0; i < texts.length; i += batchSize) {
    batches.push(texts.slice(i, i + batchSize));
  }

  // Simple hash function for cache key
  function simpleHash(text: string): string {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      const char = text.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return Math.abs(hash).toString(16).padStart(16, '0');
  }

  for (const batch of batches) {
    // Check cache first
    const toEmbed: string[] = [];
    const cacheHits: { text: string; embedding: number[] }[] = [];

    for (const text of batch) {
      const contentHash = simpleHash(text);
      const cached = getCachedEmbedding(contentHash, providerName, model);
      
      if (cached) {
        cacheHits.push({ text, embedding: cached });
        successCount++;
      } else {
        toEmbed.push(text);
      }
    }

    // Add cache hits to results
    for (const hit of cacheHits) {
      results.set(hit.text, hit.embedding);
    }

    // Embed uncached texts
    if (toEmbed.length > 0) {
      const embedResults = await embedWithRetry(provider, toEmbed);

      for (const [text, embedding] of embedResults) {
        results.set(text, embedding);

        if (embedding) {
          successCount++;
          // Cache the result
          const contentHash = simpleHash(text);
          setCachedEmbedding(contentHash, providerName, model, embedding, provider.getDimensions());
        } else {
          failureCount++;
        }
      }
    }
  }

  return {
    results,
    successCount,
    failureCount,
    ftsOnly: failureCount === texts.length,
  };
}

/**
 * Embed chunks from the database.
 * Returns a map of chunk hash to embedding (null if failed).
 */
export async function embedChunks(chunks: Chunk[]): Promise<Map<string, number[] | null>> {
  const provider = getLockedProvider();

  if (!provider || isFTSOnly()) {
    // FTS-only mode - return null for all chunks
    const results = new Map<string, number[] | null>();
    for (const chunk of chunks) {
      results.set(chunk.hash, null);
    }
    return results;
  }

  // Extract texts from chunks
  const texts = chunks.map(c => c.text);
  const hashToText = new Map(chunks.map(c => [c.text, c.hash]));

  const result = await embedBatch(texts, provider);

  // Convert text-based results to hash-based
  const hashResults = new Map<string, number[] | null>();
  for (const [text, embedding] of result.results) {
    const hash = hashToText.get(text);
    if (hash) {
      hashResults.set(hash, embedding);
    }
  }

  return hashResults;
}
