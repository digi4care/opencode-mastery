/**
 * Embedding Cache Operations
 * 
 * Cache operations using the existing embedding_cache table.
 * Cache key: (content_hash, provider, model)
 */
import { getDatabase } from '../storage/database';
import type { ProviderName } from './types';

/**
 * Get cached embedding if available.
 * Returns null if not cached or on error.
 */
export function getCachedEmbedding(
  contentHash: string,
  provider: ProviderName,
  model: string
): number[] | null {
  try {
    const db = getDatabase();
    const stmt = db.prepare<{
      embedding: Buffer;
      dims: number;
    }>(`
      SELECT embedding, dims FROM embedding_cache
      WHERE content_hash = ? AND provider = ? AND model = ?
    `);
    
    const row = stmt.get(contentHash, provider, model);
    
    if (!row) return null;
    
    // Deserialize Float32Array from BLOB
    const float32 = new Float32Array(row.embedding.buffer);
    return Array.from(float32);
  } catch {
    return null;
  }
}

/**
 * Store embedding in cache.
 * Uses INSERT OR REPLACE for upsert behavior.
 */
export function setCachedEmbedding(
  contentHash: string,
  provider: ProviderName,
  model: string,
  embedding: number[],
  dims: number
): void {
  const db = getDatabase();
  
  // Serialize to Float32Array BLOB
  const buffer = new Float32Array(embedding);
  
  const stmt = db.prepare(`
    INSERT OR REPLACE INTO embedding_cache 
    (content_hash, provider, model, embedding, dims, created_at)
    VALUES (?, ?, ?, ?, ?, strftime('%s', 'now'))
  `);
  
  stmt.run(contentHash, provider, model, Buffer.from(buffer.buffer), dims);
}

/**
 * Remove orphaned cache entries (no matching chunk).
 * Call during startup or /memory sync.
 */
export function cleanupOrphanedCache(): number {
  const db = getDatabase();
  const stmt = db.prepare(`
    DELETE FROM embedding_cache
    WHERE content_hash NOT IN (
      SELECT DISTINCT hash FROM chunks
    )
  `);
  const result = stmt.run();
  return result.changes;
}

/**
 * Get cache statistics.
 */
export function getCacheStats(): { total: number; byProvider: Record<string, number> } {
  const db = getDatabase();
  
  const totalStmt = db.prepare<{ count: number }>(`SELECT COUNT(*) as count FROM embedding_cache`);
  const totalRow = totalStmt.get();
  
  const byProviderStmt = db.prepare<{ provider: string; count: number }>(`
    SELECT provider, COUNT(*) as count 
    FROM embedding_cache 
    GROUP BY provider
  `);
  const byProviderRows = byProviderStmt.all();
  
  const byProvider: Record<string, number> = {};
  for (const row of byProviderRows) {
    byProvider[row.provider] = row.count;
  }
  
  return {
    total: totalRow?.count ?? 0,
    byProvider,
  };
}
