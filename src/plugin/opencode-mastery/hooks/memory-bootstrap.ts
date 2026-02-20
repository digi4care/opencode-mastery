/**
 * Memory Bootstrap Hook (HOOK-01)
 * 
 * Triggered on session.created event.
 * Loads relevant project memory into context using semantic search.
 */
import { getFeatureConfig } from "../../../lib/config";
import { searchMemory } from "../../opencode-memory/lib/search";

/**
 * Creates the memory bootstrap hook handler.
 * Searches memory and injects context when a new session starts.
 */
export function createMemoryBootstrapHook() {
  return async (input: any, output: any) => {
    const config = getFeatureConfig("memory");
    
    try {
      const { session, project } = input;
      const projectRoot = session?.workingDirectory || process.cwd();
      
      // Build query from project context
      const projectName = project?.name || projectRoot.split("/").pop() || "project";
      const query = `${projectName} recent context important decisions`;
      
      // Use Phase 3 search API
      const results = await searchMemory(query, {
        maxResults: config.search?.maxResults || 10,
        minScore: 0.3,
      });
      
      if (results && results.results && results.results.length > 0) {
        const context = results.results
          .map((r) => {
            const citation = r.path ? `[${r.path}]` : "";
            return `${citation}\n${r.content}`;
          })
          .join("\n\n---\n\n");
        
        // Inject context into session using prompt API with noReply
        // This is the standard pattern for context injection in session hooks
        if (session?.client?.session?.prompt) {
          await session.client.session.prompt({
            path: { id: session.id },
            body: {
              noReply: true,
              parts: [{ type: "text", text: `## Project Memory\n\n${context}` }],
            },
          });
        }
        
        console.log(`[memory-bootstrap] Loaded ${results.results.length} memory entries`);
        return { success: true, entriesLoaded: results.results.length };
      }
      
      return { success: true, entriesLoaded: 0 };
    } catch (error) {
      // Fail silently - memory is enhancement, not blocker
      console.error("[memory-bootstrap] Hook failed:", error);
      return { success: true, entriesLoaded: 0, error: String(error) };
    }
  };
}
