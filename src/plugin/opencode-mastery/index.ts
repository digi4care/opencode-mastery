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

export const Plugin = async (context: PluginContext) => {
  return {
    // Register tools
    tool: [
      searchDocs,
      downloadDocsTool,
      memoryStatus,
      memoryRemember,
      memoryCompact,
    ],
    
    // Configuration
    config: async (currentConfig: Record<string, unknown>) => {
      return {
        ...currentConfig,
        // Register agents if needed
        agents: currentConfig.agents || [],
      };
    },
    
    // Lifecycle hooks
    "session.start": async () => {
      console.log("OpenCode Mastery plugin loaded");
    },
  };
};

export default Plugin;
