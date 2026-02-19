/**
 * OM Session Plugin
 * 
 * Provides session management tools for OpenCode:
 * - List sessions
 * - Read session messages
 * - Search session content
 * - Get session statistics
 * 
 * Uses OpenCode SDK client from plugin context.
 * Works with ANY port - no detection needed!
 * 
 * Configuration: opencode.config.yaml → features.session
 */
import type { PluginContext } from "@opencode-ai/plugin";
import { isFeatureEnabled } from "../../lib/config";
import { sessionList, setSessionClient as setListClient } from "./tools/session-list";
import { sessionRead, setSessionClient as setReadClient } from "./tools/session-read";
import { sessionSearch, setSessionClient as setSearchClient } from "./tools/session-search";
import { sessionStats, setSessionClient as setStatsClient } from "./tools/session-stats";

export const Plugin = async (context: PluginContext) => {
  // Check if session feature is enabled
  if (!isFeatureEnabled("session")) {
    console.log("Session management is disabled in config");
    return { tool: [] };
  }

  // De client uit de context is AL verbonden met de juiste server
  // Het maakt niet uit op welke poort OpenCode draait!
  const { client } = context;
  
  // Geef client door aan alle tools
  if (client) {
    setListClient(client);
    setReadClient(client);
    setSearchClient(client);
    setStatsClient(client);
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
      console.log("OM Session plugin loaded - using SDK client");
    },
  };
};

export default Plugin;
