import type { Database } from "bun:sqlite";

/**
 * Create all required tables and FTS5 virtual table.
 * Tables: meta, files, chunks, embedding_cache, chunks_fts
 */
export function createSchema(db: Database): void {
  // Meta table for version/config
  db.run(`
    CREATE TABLE IF NOT EXISTS meta (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `);

  // Files table - tracks source files and their hashes
  db.run(`
    CREATE TABLE IF NOT EXISTS files (
      path TEXT PRIMARY KEY,
      source TEXT NOT NULL,
      hash TEXT NOT NULL,
      mtime INTEGER NOT NULL,
      size INTEGER NOT NULL
    )
  `);

  // Chunks table - stores chunked content with line numbers
  db.run(`
    CREATE TABLE IF NOT EXISTS chunks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      source TEXT NOT NULL,
      start_line INTEGER NOT NULL,
      end_line INTEGER NOT NULL,
      hash TEXT NOT NULL,
      text TEXT NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s','now')),
      updated_at INTEGER DEFAULT (strftime('%s','now'))
    )
  `);

  // Embedding cache - composite key (provider, model, content_hash)
  db.run(`
    CREATE TABLE IF NOT EXISTS embedding_cache (
      provider TEXT NOT NULL,
      model TEXT NOT NULL,
      content_hash TEXT NOT NULL,
      embedding BLOB NOT NULL,
      dims INTEGER NOT NULL,
      created_at INTEGER DEFAULT (strftime('%s','now')),
      PRIMARY KEY (provider, model, content_hash)
    )
  `);

  // Indexes for common queries
  db.run(`CREATE INDEX IF NOT EXISTS idx_chunks_path ON chunks(path)`);
  db.run(`CREATE INDEX IF NOT EXISTS idx_chunks_source ON chunks(source)`);

  // FTS5 virtual table - references chunks as external content
  db.run(`
    CREATE VIRTUAL TABLE IF NOT EXISTS chunks_fts USING fts5(
      text,
      id UNINDEXED,
      path UNINDEXED,
      source UNINDEXED,
      start_line UNINDEXED,
      end_line UNINDEXED,
      content='chunks',
      content_rowid='id'
    )
  `);

  // Create FTS5 triggers for auto-sync
  createFtsTriggers(db);

  // Set schema version
  const stmt = db.prepare(
    "INSERT OR REPLACE INTO meta (key, value) VALUES ('schema_version', ?)"
  );
  stmt.run("1");
}

/**
 * Create FTS5 triggers to keep chunks_fts in sync with chunks table.
 * Pattern: External content table with auto-triggers.
 */
export function createFtsTriggers(db: Database): void {
  // Trigger: INSERT - add new chunk to FTS
  db.run(`
    CREATE TRIGGER IF NOT EXISTS chunks_ai AFTER INSERT ON chunks BEGIN
      INSERT INTO chunks_fts(rowid, text, id, path, source, start_line, end_line)
      VALUES (new.id, new.text, new.id, new.path, new.source, new.start_line, new.end_line);
    END
  `);

  // Trigger: UPDATE - remove old, add new
  db.run(`
    CREATE TRIGGER IF NOT EXISTS chunks_au AFTER UPDATE ON chunks BEGIN
      INSERT INTO chunks_fts(chunks_fts, rowid, text, id, path, source, start_line, end_line)
      VALUES('delete', old.id, old.text, old.id, old.path, old.source, old.start_line, old.end_line);
      INSERT INTO chunks_fts(rowid, text, id, path, source, start_line, end_line)
      VALUES (new.id, new.text, new.id, new.path, new.source, new.start_line, new.end_line);
    END
  `);

  // Trigger: DELETE - remove from FTS
  db.run(`
    CREATE TRIGGER IF NOT EXISTS chunks_ad AFTER DELETE ON chunks BEGIN
      INSERT INTO chunks_fts(chunks_fts, rowid, text, id, path, source, start_line, end_line)
      VALUES('delete', old.id, old.text, old.id, old.path, old.source, old.start_line, old.end_line);
    END
  `);
}
