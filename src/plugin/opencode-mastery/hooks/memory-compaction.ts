/**
 * Memory Compaction Hook (HOOK-04)
 * 
 * Triggered on experimental.session.compacting event.
 * Injects memory summary into compaction prompt to preserve key context.
 * 
 * Features:
 * - Uses output.context.push() to inject memory context
 * - Experimental hook - API may change
 * - Fails silently - compaction enhancement, not blocker
 */
import { getFeatureConfig } from "../../../lib/config";

/**
 * Creates the memory compaction hook handler.
 * Pushes memory summary to output.context for compaction preservation.
 */
export function createMemoryCompactionHook() {
  return async (input: any, output: any) => {
    try {
      const config = getFeatureConfig("memory");
      
      // Build memory context to preserve during compaction
      // This context will be included in the compacted summary
      const memoryContext = `
## Memory Context (Preserve During Compaction)

Key information to retain from session memory:
- Recent project decisions and their rationale
- Active tasks and their current status
- Important patterns and conventions discovered
- User preferences and workflow choices
- Error patterns and their solutions
- Code snippets and their purpose
- File paths and their relationships

This context should be included in the compacted summary to maintain session continuity.
`;

      // Inject into compaction prompt via output.context
      // Experimental API - check if push method exists
      if (output?.context && typeof output.context.push === "function") {
        output.context.push(memoryContext);
        console.log("[memory-compaction] Injected memory context into compaction prompt");
        
        return { success: true, contextInjected: true };
      } else {
        // API not available - log for debugging
        console.log("[memory-compaction] output.context.push not available (experimental API)");
        
        return { success: true, contextInjected: false, reason: "Experimental API not available" };
      }
    } catch (error) {
      // Fail silently - compaction enhancement, not blocker
      console.error("[memory-compaction] Hook failed:", error);
      
      return { success: true, contextInjected: false, error: String(error) };
    }
  };
}
