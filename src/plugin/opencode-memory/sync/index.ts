/**
 * Synchronization module for memory files.
 * 
 * Exports:
 * - syncFile: Sync single file with hash-based detection
 * - syncAllFiles: Sync all memory files in project
 * - getChangedFiles: Get list of changed files
 * - rebuildDatabase: Full database rebuild
 * - validateIntegrity: Check database integrity
 */
export {
  syncFile,
  syncAllFiles,
  getChangedFiles,
  getChunkCount,
  getFileCount,
  type SyncResult,
  type MemorySource,
} from "./indexer";

export {
  rebuildDatabase,
  validateIntegrity,
  rebuildFtsIndex,
  type RebuildResult,
} from "./rebuild";
