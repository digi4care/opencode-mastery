/**
 * Embeddings Module
 * 
 * Public API for embedding operations.
 * 
 * Usage:
 *   import { lockProvider, embedChunks, getEmbeddingStatus } from './embeddings';
 *   
 *   // Lock provider at startup
 *   await lockProvider();
 *   
 *   // Embed chunks
 *   const embeddings = await embedChunks(chunks);
 *   
 *   // Check status
 *   const status = getEmbeddingStatus();
 */
import { lockProvider, getLockedProvider, getProviderStatus, isFTSOnly } from './provider-lock';
import { embedBatch, embedChunks } from './batch';
import { getCachedEmbedding, setCachedEmbedding, cleanupOrphanedCache, getCacheStats } from './cache';

// Re-export types
export type { EmbeddingProvider, EmbeddingResult, EmbeddingBatchResult, ProviderName } from './types';

// Re-export provider lock functions
export { lockProvider, getLockedProvider, isFTSOnly };

// Re-export batch embedding functions
export { embedBatch, embedChunks };

// Re-export cache functions
export { getCachedEmbedding, setCachedEmbedding, cleanupOrphanedCache, getCacheStats };

/**
 * Get combined embedding system status.
 * Used by /memory status command.
 */
export function getEmbeddingStatus() {
  const providerStatus = getProviderStatus();
  const cacheStats = getCacheStats();

  return {
    provider: {
      name: providerStatus.name,
      model: providerStatus.model,
      dimensions: providerStatus.dimensions,
      available: providerStatus.available,
    },
    cache: {
      totalEntries: cacheStats.total,
      byProvider: cacheStats.byProvider,
    },
    ftsOnly: isFTSOnly(),
    lastChecked: providerStatus.checkedAt,
  };
}

/**
 * Initialize embeddings system.
 * Call at startup to lock provider.
 */
export async function initializeEmbeddings(): Promise<boolean> {
  const provider = await lockProvider();
  await cleanupOrphanedCache();
  return provider !== null;
}
