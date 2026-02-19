/**
 * OM Session Plugin
 * 
 * Provides session management tools for OpenCode:
 * - List sessions
 * - Read session messages
 * - Search session content
 * - Get session statistics
 * 
 * Uses OpenCode HTTP API for session data.
 * Auto-detects OpenCode server port.
 * 
 * Configuration: opencode.config.yaml → features.session
 */
import type { PluginContext } from "@opencode-ai/plugin";
import { isFeatureEnabled } from "../../lib/config";
import { sessionList } from "./tools/session-list";
import { sessionRead } from "./tools/session-read";
import { sessionSearch } from "./tools/session-search";
import { sessionStats } from "./tools/session-stats";

export const Plugin = async (context: PluginContext) => {
  // Check if session feature is enabled
  if (!isFeatureEnabled("session")) {
    console.log("Session management is disabled in config");
    return { tool: [] };
  }

  return {
    // Register all session tools
    tool: [
      sessionList,
      sessionRead,
      sessionSearch,
      sessionStats,
    ],
    
    // Lifecycle hooks
    "session.start": async () => {
      console.log("OM Session plugin loaded");
    },
  };
};

export default Plugin;
