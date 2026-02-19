/**
 * File synchronization with incremental hash-based updates.
 * 
 * Features:
 * - Detects unchanged files via SHA-256 hash comparison
 * - Skips re-processing unchanged files
 * - Deletes old chunks before adding new ones for changed files
 * - Tracks file metadata (hash, mtime, size) in files table
 * - Supports memory files: MEMORY.md, .memory/daily/*.md
 */
import { getDatabase } from "../storage/database";
import { chunkMarkdown, type Chunk, hashContent, hashFile } from "../chunking";
import { stat } from "fs/promises";
import { join, basename } from "path";

/** Memory file sources */
export type MemorySource = "memory" | "daily" | "session";

/** Result of a sync operation */
export interface SyncResult {
  path: string;
  action: "created" | "updated" | "skipped" | "error";
  chunkCount?: number;
  error?: string;
}

/** File record from database */
interface FileRecord {
  path: string;
  source: string;
  hash: string;
  mtime: number;
  size: number;
}

/**
 * Sync a single file to the database.
 * Uses hash comparison to skip unchanged files.
 */
export async function syncFile(
  filePath: string,
  source: MemorySource = "memory"
): Promise<SyncResult> {
  const db = getDatabase();

  try {
    // Get file stats
    const stats = await stat(filePath);

    // Compute file hash
    const currentHash = await hashFile(filePath);

    // Check if file exists and has same hash
    const existingStmt = db.prepare<FileRecord, [string]>(
      "SELECT * FROM files WHERE path = ?"
    );
    const existing = existingStmt.get(filePath);

    if (existing && existing.hash === currentHash) {
      // File unchanged, skip
      return { path: filePath, action: "skipped" };
    }

    // Read file content
    const file = Bun.file(filePath);
    const content = await file.text();

    if (!content.trim()) {
      // Empty file, nothing to index
      return { path: filePath, action: "skipped", chunkCount: 0 };
    }

    // Delete old chunks for this file
    const deleteStmt = db.prepare("DELETE FROM chunks WHERE path = ?");
    deleteStmt.run(filePath);

    // Chunk the content
    const chunks = chunkMarkdown(content, filePath, source);

    // Insert new chunks
    const insertStmt = db.prepare(`
      INSERT INTO chunks (path, source, start_line, end_line, hash, text)
      VALUES ($path, $source, $startLine, $endLine, $hash, $text)
    `);

    for (const chunk of chunks) {
      insertStmt.run({
        path: chunk.path,
        source: chunk.source,
        startLine: chunk.startLine,
        endLine: chunk.endLine,
        hash: chunk.hash,
        text: chunk.text,
      });
    }

    // Update file record
    const upsertFileStmt = db.prepare(`
      INSERT OR REPLACE INTO files (path, source, hash, mtime, size)
      VALUES (?, ?, ?, ?, ?)
    `);
    upsertFileStmt.run(
      filePath,
      source,
      currentHash,
      Math.floor(stats.mtimeMs / 1000),
      stats.size
    );

    return {
      path: filePath,
      action: existing ? "updated" : "created",
      chunkCount: chunks.length,
    };
  } catch (error) {
    return {
      path: filePath,
      action: "error",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

/**
 * Get list of files that have changed (for incremental sync).
 */
export async function getChangedFiles(
  filePaths: string[]
): Promise<string[]> {
  const db = getDatabase();
  const changed: string[] = [];

  for (const filePath of filePaths) {
    try {
      const currentHash = await hashFile(filePath);

      const existingStmt = db.prepare<FileRecord, [string]>(
        "SELECT hash FROM files WHERE path = ?"
      );
      const existing = existingStmt.get(filePath);

      if (!existing || existing.hash !== currentHash) {
        changed.push(filePath);
      }
    } catch {
      // File doesn't exist or can't be read
      changed.push(filePath);
    }
  }

  return changed;
}

/**
 * Sync all memory files in a directory.
 * Discovers MEMORY.md and .memory/daily/*.md files.
 */
export async function syncAllFiles(
  projectRoot: string
): Promise<SyncResult[]> {
  const results: SyncResult[] = [];

  // Find MEMORY.md in project root
  const memoryPath = join(projectRoot, "MEMORY.md");
  try {
    await stat(memoryPath);
    const result = await syncFile(memoryPath, "memory");
    results.push(result);
  } catch {
    // MEMORY.md doesn't exist - silent skip per CONTEXT.md
  }

  // Find daily logs in .memory/daily/
  const dailyDir = join(projectRoot, ".memory", "daily");
  try {
    const dailyDirStat = await stat(dailyDir);
    if (dailyDirStat.isDirectory()) {
      const glob = new Bun.Glob("*.md");
      for await (const file of glob.scan({ cwd: dailyDir })) {
        const result = await syncFile(join(dailyDir, file), "daily");
        results.push(result);
      }
    }
  } catch {
    // .memory/daily/ doesn't exist - silent skip
  }

  return results;
}

/**
 * Get total chunk count in database.
 */
export function getChunkCount(): number {
  const db = getDatabase();
  const stmt = db.prepare<{ count: number }, []>(
    "SELECT COUNT(*) as count FROM chunks"
  );
  return stmt.get()?.count ?? 0;
}

/**
 * Get file count in database.
 */
export function getFileCount(): number {
  const db = getDatabase();
  const stmt = db.prepare<{ count: number }, []>(
    "SELECT COUNT(*) as count FROM files"
  );
  return stmt.get()?.count ?? 0;
}
