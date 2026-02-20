/**
 * Memory Reindex Hook (HOOK-03)
 * 
 * Triggered on file.edited event.
 * Auto-reindexes memory files when .memory.md changes are detected.
 * 
 * Features:
 * - Debounces 2.5 seconds to prevent excessive reindexing
 * - Uses incremental sync mode (not full rebuild)
 * - Filters to .memory.md files only
 * - Fails silently with internal logging
 */
import { getFeatureConfig } from "../../../lib/config";
import { debounce } from "../lib/debounce";
import { syncAllFiles, type SyncResult } from "../../opencode-memory/sync";

/**
 * Creates the memory reindex hook handler.
 * Debounces file edits and triggers incremental sync.
 */
export function createMemoryReindexHook() {
  // Module-level debounced function (persists across hook calls)
  // This ensures rapid edits don't trigger multiple syncs
  const debouncedReindex = debounce(async () => {
    try {
      // Use incremental sync (force: false behavior)
      const projectRoot = process.cwd();
      const results = await syncAllFiles(projectRoot);
      
      // Log results for debugging
      const processed = results.filter(r => r.action !== "skipped");
      const errors = results.filter(r => r.action === "error");
      
      if (processed.length > 0) {
        console.log(`[memory-reindex] Incremental sync completed: ${processed.length} files processed`);
      }
      
      if (errors.length > 0) {
        console.error("[memory-reindex] Sync errors:", errors.map(e => e.error).join(", "));
      }
    } catch (error) {
      console.error("[memory-reindex] Sync failed:", error);
    }
  }, 2500);

  return async (input: any, output: any) => {
    try {
      const config = getFeatureConfig("memory");
      const event = input?.event || input;
      
      // Extract file path from various event structures
      const filePath = event?.data?.filePath || 
                       event?.properties?.file || 
                       event?.file ||
                       input?.filePath;
      
      if (!filePath) {
        return { success: true, reindexed: false, reason: "No file path in event" };
      }
      
      // Only process .memory.md files
      if (!filePath.includes(".memory.md")) {
        return { success: true, reindexed: false, reason: "Not a memory file" };
      }
      
      console.log(`[memory-reindex] Memory file edited: ${filePath}`);
      
      // Trigger debounced reindex
      debouncedReindex();
      
      return { success: true, reindexed: true, file: filePath };
    } catch (error) {
      // Fail silently, log for debugging
      console.error("[memory-reindex] Hook failed:", error);
      return { success: true, reindexed: false, error: String(error) };
    }
  };
}
