/**
 * Debug Assistant Plugin
 * 
 * Provides systematic debugging workflow:
 * - 4-phase debugging process
 * - Root cause tracing
 * - Flaky test detection
 * - Condition-based waiting
 * 
 * Uses shared config from src/lib/config
 */
import type { PluginContext } from "@opencode-ai/plugin";
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";
import { waitFor } from "./tools/wait-for";
import { findFlakyTests } from "./tools/find-flaky-tests";
import { traceRootCause } from "./tools/trace-root-cause";
import { debugSession } from "./tools/debug-session";

export const Plugin = async (context: PluginContext) => {
  // Check if debugging is enabled
  if (!isFeatureEnabled("debugging")) {
    console.log("Debug assistant is disabled in config");
    return { tool: [] };
  }

  const debugConfig = getFeatureConfig("debugging");
  
  return {
    // Register tools
    tool: [
      waitFor,
      findFlakyTests,
      traceRootCause,
      debugSession,
    ],
    
    // Hook: Auto-start debug on errors
    "tool.execute.after": async ({ event }) => {
      if (!debugConfig.auto_start_on_error) {
        return;
      }
      
      const { toolName, result } = event.data;
      
      // Detect test failures
      if (toolName === "bash" && result?.includes?.("FAIL")) {
        console.log("Test failure detected. Consider using debug-session tool.");
      }
    },
  };
};

export default Plugin;
