/**
 * Memory Reindex Hook (HOOK-03)
 * 
 * Triggered on file.edited event.
 * Auto-reindexes memory files when .memory.md changes are detected.
 */
import { getFeatureConfig } from "../../../lib/config";
import { debounce } from "../lib/debounce";

/**
 * Creates the memory reindex hook handler.
 * Debounces file edits and triggers incremental sync.
 */
export function createMemoryReindexHook() {
  // Create debounced reindex function (2.5s delay per config recommendation)
  const debouncedReindex = debounce(async (filePath: string) => {
    try {
      // TODO: Implementation in next plan
      // Will call memory-sync tool for incremental reindex
      console.log("[memory-reindex] Reindexing after edit:", filePath);
    } catch (error) {
      console.error("[memory-reindex] Reindex failed:", error);
    }
  }, 2500);

  return async (input: any, output: any) => {
    const config = getFeatureConfig("memory");
    
    try {
      const filePath = input?.event?.data?.filePath || input?.event?.properties?.file;
      
      // Only process .memory.md files
      if (!filePath?.includes(".memory.md")) {
        return;
      }
      
      console.log("[memory-reindex] Hook triggered for:", filePath);
      
      // Debounce rapid edits
      debouncedReindex(filePath);
    } catch (error) {
      // Fail silently - memory is enhancement, not blocker
      console.error("[memory-reindex] Hook failed:", error);
    }
  };
}
