/**
 * Vector Similarity Search
 * 
 * Implements semantic search using cosine similarity on embedding vectors.
 * Integrates with embedding cache and provider lock from Phase 2.
 */

import { getDatabase } from "../../storage/database";
import { getLockedProvider } from "../../embeddings/provider-lock";
import { embedBatch } from "../../embeddings/batch";
import { getFeatureConfig } from "../../../../lib/config";
import type { SearchResult, SearchOptions, SourceFilter } from "./types";

/**
 * Deserialize embedding from BLOB storage
 */
function deserializeEmbedding(blob: Buffer): number[] {
  const float32 = new Float32Array(blob.buffer, blob.byteOffset, blob.byteLength / 4);
  return Array.from(float32);
}

/**
 * Calculate cosine similarity between two vectors
 * Returns value in [-1, 1] range, which we then normalize to [0, 1]
 */
function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    return 0;
  }

  let dotProduct = 0;
  let magnitudeA = 0;
  let magnitudeB = 0;

  for (let i = 0; i < a.length; i++) {
    dotProduct += a[i] * b[i];
    magnitudeA += a[i] * a[i];
    magnitudeB += b[i] * b[i];
  }

  magnitudeA = Math.sqrt(magnitudeA);
  magnitudeB = Math.sqrt(magnitudeB);

  // Handle zero magnitude
  if (magnitudeA === 0 || magnitudeB === 0) {
    return 0;
  }

  return dotProduct / (magnitudeA * magnitudeB);
}

/**
 * Normalize cosine similarity from [-1, 1] to [0, 1]
 */
function normalizeCosine(similarity: number): number {
  return (similarity + 1) / 2;
}

/**
 * Get or create embedding for query text
 * Uses cache-first strategy with same provider/model as chunks
 */
async function getQueryEmbedding(query: string): Promise<number[] | null> {
  // Check if provider is locked
  if (getLockedProvider() === null) {
    return null;
  }

  const provider = getLockedProvider();
  if (!provider) {
    return null;
  }

  const db = getDatabase();
  const config = getFeatureConfig("memory");

  // Create cache key (same format as chunk embeddings)
  const crypto = require("crypto");
  const contentHash = crypto.createHash("sha256").update(query).digest("hex");
  const model = config.embeddings.model || "default";

  // Check cache first
  const cachedStmt = db.prepare(`
    SELECT embedding, dims FROM embedding_cache
    WHERE provider = ? AND model = ? AND content_hash = ?
  `);
  const cached = cachedStmt.get(provider, model, contentHash) as {
    embedding: Buffer;
    dims: number;
  } | undefined;

  if (cached) {
    return deserializeEmbedding(cached.embedding);
  }

  // Generate new embedding
  try {
    const embeddings = await embedBatch([query], {
      provider: provider as any,
      batchSize: 1,
    });

    if (embeddings.length === 0 || !embeddings[0]) {
      return null;
    }

    return embeddings[0];
  } catch (error) {
    console.error("Query embedding error:", error);
    return null;
  }
}

/**
 * Execute vector similarity search
 * Returns results with normalized 0-1 scores
 */
export async function vectorSearch(
  query: string,
  options: SearchOptions = {}
): Promise<SearchResult[]> {
  const config = getFeatureConfig("memory");
  const maxResults = options.maxResults ?? config.search.maxResults ?? 10;
  const minScore = options.minScore ?? config.search.minScore ?? 0.35;
  const source = options.source ?? "all";

  // Get query embedding
  const queryEmbedding = await getQueryEmbedding(query);
  if (!queryEmbedding) {
    return [];  // No provider available
  }

  const db = getDatabase();

  // Build source filter clause
  let sourceClause = "";
  if (source !== "all") {
    sourceClause = `AND c.source = '${source}'`;
  }

  // Get all chunks with embeddings
  const sql = `
    SELECT 
      c.id,
      c.path,
      c.source,
      c.start_line,
      c.end_line,
      c.text,
      e.embedding
    FROM chunks c
    INNER JOIN embedding_cache e ON e.content_hash = c.hash
    WHERE 1=1 ${sourceClause}
  `;

  try {
    const stmt = db.prepare(sql);
    const rows = stmt.all() as Array<{
      id: number;
      path: string;
      source: SourceFilter;
      start_line: number;
      end_line: number;
      text: string;
      embedding: Buffer;
    }>;

    if (rows.length === 0) {
      return [];
    }

    // Calculate similarities
    const scored = rows.map(row => {
      const chunkEmbedding = deserializeEmbedding(row.embedding);
      const similarity = cosineSimilarity(queryEmbedding, chunkEmbedding);
      const normalized = normalizeCosine(similarity);

      return {
        id: row.id,
        path: row.path,
        source: row.source,
        start_line: row.start_line,
        end_line: row.end_line,
        text: row.text,
        score: normalized,
        vector_score: normalized,
      };
    });

    // Apply Min-Max normalization across results
    const scores = scored.map(r => r.score);
    const minScore_raw = Math.min(...scores);
    const maxScore_raw = Math.max(...scores);

    const results: SearchResult[] = scored
      .map(r => {
        // Re-normalize with Min-Max
        let normalizedScore = 0.5;
        if (maxScore_raw !== minScore_raw) {
          normalizedScore = (r.score - minScore_raw) / (maxScore_raw - minScore_raw);
        }
        r.score = normalizedScore;
        r.vector_score = normalizedScore;
        return r;
      })
      .filter(r => r.score >= minScore)
      .sort((a, b) => b.score - a.score)
      .slice(0, maxResults);

    return results;
  } catch (error) {
    console.error("Vector search error:", error);
    return [];
  }
}

/**
 * Check if vector search is available
 */
export function isVectorSearchAvailable(): boolean {
  return getLockedProvider() !== null;
}
