/**
 * OpenCode Mastery Plugin
 * 
 * Provides tools for accessing OpenCode documentation and managing project memory.
 * Replaces Python scripts with native TypeScript tools.
 */
import type { PluginContext } from "@opencode-ai/plugin";
import { searchDocs } from "./tools/search-docs";
import { downloadDocsTool } from "./tools/download-docs";
import { memoryStatus } from "./tools/memory-status";
import { memoryRemember } from "./tools/memory-remember";
import { memoryCompact } from "./tools/memory-compact";
// Phase 4 memory tools
import { memoryGet } from "./tools/memory-get";
import { memorySync } from "./tools/memory-sync";
import { memoryDbStatus } from "./tools/memory-db-status";
import { memorySearch } from "./tools/memory-search";
// Phase 5 memory hooks
import { createMemoryBootstrapHook } from "./hooks/memory-bootstrap";
import { createMemorySnapshotHook } from "./hooks/memory-snapshot";
import { createMemoryReindexHook } from "./hooks/memory-reindex";
import { createMemoryCompactionHook } from "./hooks/memory-compaction";
import { createMemoryIntentHook } from "./hooks/memory-intent";

export const Plugin = async (context: PluginContext) => {
  return {
    // Register tools
    tool: [
      searchDocs,
      downloadDocsTool,
      // Old memory tools (kept for backward compatibility)
      memoryStatus,
      memoryRemember,
      memoryCompact,
      // Phase 4 memory tools
      memoryGet,
      memorySync,
      memoryDbStatus,
      memorySearch,
    ],
    
    // Configuration
    config: async (currentConfig: Record<string, unknown>) => {
      return {
        ...currentConfig,
        // Register agents if needed
        agents: currentConfig.agents || [],
      };
    },
    
    // Phase 5 hooks - memory lifecycle integration
    "session.created": createMemoryBootstrapHook(),
    "session.deleted": createMemorySnapshotHook(),
    "file.edited": createMemoryReindexHook(),
    "experimental.session.compacting": createMemoryCompactionHook(),
    "tool.execute.before": createMemoryIntentHook(),
  };
};

export default Plugin;
