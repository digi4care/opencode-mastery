import { Database } from "bun:sqlite";
import { join } from "path";
import { homedir } from "os";
import { createHash } from "crypto";
import { createSchema } from "./schema";
import { getFeatureConfig } from "../../../lib/config";

let db: Database | null = null;

/**
 * Get the database path based on config or default.
 * Default: ~/.local/share/opencode/memory/{project_name}/{project_name_hash}.sqlite
 */
function getDatabasePath(): string {
  const config = getFeatureConfig("memory");
  // TODO: storage.path will be added in schema extension
  // For now, use default path based on project name
  
  const projectName = "opencode-mastery"; // TODO: read from config.project.name
  const projectHash = createHash("sha256")
    .update(projectName)
    .digest("hex")
    .slice(0, 8);
  
  const baseDir = join(homedir(), ".local", "share", "opencode", "memory", projectName);
  
  // Ensure directory exists
  Bun.write(join(baseDir, ".gitkeep"), "");
  
  return join(baseDir, `${projectHash}.sqlite`);
}

/**
 * Get or create the database connection.
 * Implements singleton pattern with WAL mode for concurrent access.
 */
export function getDatabase(): Database {
  if (db) return db;
  
  const dbPath = getDatabasePath();
  db = new Database(dbPath, { create: true, strict: true });
  
  // Enable WAL mode for better concurrent performance (per CONTEXT.md)
  db.run("PRAGMA journal_mode = WAL;");
  db.run("PRAGMA busy_timeout = 30000;"); // 30s timeout per CONTEXT.md
  db.run("PRAGMA synchronous = NORMAL;"); // Balance durability/performance
  
  // Create schema if not exists
  createSchema(db);
  
  return db;
}

/**
 * Close the database connection.
 * Call on plugin unload or process exit.
 */
export function closeDatabase(): void {
  if (db) {
    db.close();
    db = null;
  }
}
