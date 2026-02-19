/**
 * Content hashing utilities using Bun's built-in CryptoHasher.
 * SHA-256 hashing for file and chunk change detection.
 */

/**
 * Hash a string content using SHA-256.
 * Used for chunk content hashing.
 * 
 * @param content - String content to hash
 * @returns Hex-encoded SHA-256 hash
 */
export function hashContent(content: string): string {
  const hasher = new Bun.CryptoHasher("sha256");
  hasher.update(content);
  return hasher.digest("hex");
}

/**
 * Hash a file using SHA-256.
 * Used for file change detection in incremental sync.
 * 
 * @param path - Path to file
 * @returns Hex-encoded SHA-256 hash
 */
export async function hashFile(path: string): Promise<string> {
  const hasher = new Bun.CryptoHasher("sha256");
  const file = Bun.file(path);

  // Stream for large files (>5MB)
  const stats = await file.size;
  if (stats > 5 * 1024 * 1024) {
    const stream = file.stream();
    for await (const chunk of stream) {
      hasher.update(chunk);
    }
  } else {
    // Small files: load entirely
    const content = await file.text();
    hasher.update(content);
  }

  return hasher.digest("hex");
}

/**
 * Hash file synchronously (for smaller files).
 * Uses Bun.file().text() which is fast for small files.
 * 
 * @param path - Path to file
 * @returns Hex-encoded SHA-256 hash
 */
export function hashFileSync(path: string): string {
  const hasher = new Bun.CryptoHasher("sha256");
  const file = Bun.file(path);
  hasher.update(file);
  return hasher.digest("hex");
}

/**
 * Compare two hashes for equality.
 * Type-safe comparison that handles null/undefined.
 */
export function hashesMatch(hash1: string | null | undefined, hash2: string | null | undefined): boolean {
  return hash1 !== null && hash1 !== undefined && hash1 === hash2;
}
