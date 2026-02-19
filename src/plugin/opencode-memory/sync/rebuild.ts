/**
 * Database rebuild utilities.
 * 
 * Used for:
 * - Corrupt database recovery (backup .bak + rebuild per CONTEXT.md)
 * - Missing database auto-create
 * - Full reindex from source files
 */
import { getDatabase, closeDatabase } from "../storage/database";
import { syncAllFiles, type SyncResult } from "./indexer";
import { unlink, rename, access } from "fs/promises";
import { join } from "path";

/** Result of a rebuild operation */
export interface RebuildResult {
  success: boolean;
  filesProcessed: number;
  totalChunks: number;
  errors: string[];
}

/**
 * Rebuild the database from source MEMORY.md files.
 * 
 * Steps:
 * 1. Backup existing database as .bak
 * 2. Create fresh database with schema
 * 3. Sync all memory files
 * 4. Validate integrity
 */
export async function rebuildDatabase(
  projectRoot: string
): Promise<RebuildResult> {
  const errors: string[] = [];
  let filesProcessed = 0;
  let totalChunks = 0;

  try {
    // Get current database path (we need to access it)
    const db = getDatabase();
    // @ts-ignore - accessing internal path
    const dbPath = db?.filename;

    // Close current connection
    closeDatabase();

    // Backup existing database if it exists
    if (dbPath) {
      try {
        await access(dbPath);
        const backupPath = `${dbPath}.bak`;
        await rename(dbPath, backupPath);
      } catch {
        // Database file didn't exist, that's fine
      }
    }

    // Get fresh database (will create new)
    const newDb = getDatabase();

    // Sync all files
    const results = await syncAllFiles(projectRoot);

    for (const result of results) {
      if (result.action === "error") {
        errors.push(`${result.path}: ${result.error}`);
      } else {
        filesProcessed++;
        if (result.chunkCount) {
          totalChunks += result.chunkCount;
        }
      }
    }

    return {
      success: errors.length === 0,
      filesProcessed,
      totalChunks,
      errors,
    };
  } catch (error) {
    errors.push(error instanceof Error ? error.message : String(error));
    return {
      success: false,
      filesProcessed,
      totalChunks,
      errors,
    };
  }
}

/**
 * Validate database integrity.
 * Checks for orphaned chunks, missing files, and FTS sync.
 */
export async function validateIntegrity(): Promise<{
  valid: boolean;
  issues: string[];
}> {
  const db = getDatabase();
  const issues: string[] = [];

  // Check for orphaned chunks (chunks without corresponding file record)
  const orphanedStmt = db.prepare<{ count: number }, []>(`
    SELECT COUNT(*) as count FROM chunks c
    WHERE NOT EXISTS (SELECT 1 FROM files f WHERE f.path = c.path)
  `);
  const orphaned = orphanedStmt.get();
  if (orphaned && orphaned.count > 0) {
    issues.push(`${orphaned.count} orphaned chunks without file record`);
  }

  // Check FTS5 sync by comparing counts
  const chunksCountStmt = db.prepare<{ count: number }, []>(
    "SELECT COUNT(*) as count FROM chunks"
  );
  const ftsCountStmt = db.prepare<{ count: number }, []>(
    "SELECT COUNT(*) as count FROM chunks_fts"
  );

  const chunksCount = chunksCountStmt.get()?.count ?? 0;
  const ftsCount = ftsCountStmt.get()?.count ?? 0;

  if (chunksCount !== ftsCount) {
    issues.push(
      `FTS5 out of sync: ${chunksCount} chunks but ${ftsCount} in FTS index`
    );
  }

  // Check schema version
  const versionStmt = db.prepare<{ value: string }, []>(
    "SELECT value FROM meta WHERE key = 'schema_version'"
  );
  const version = versionStmt.get();
  if (!version || version.value !== "1") {
    issues.push(`Unexpected schema version: ${version?.value ?? "missing"}`);
  }

  return {
    valid: issues.length === 0,
    issues,
  };
}

/**
 * Force FTS5 rebuild (if index is corrupted).
 */
export function rebuildFtsIndex(): void {
  const db = getDatabase();
  // FTS5 rebuild command
  db.run("INSERT INTO chunks_fts(chunks_fts) VALUES('rebuild')");
}
