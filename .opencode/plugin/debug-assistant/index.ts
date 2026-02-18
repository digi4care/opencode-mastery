import type { Plugin, PluginContext } from "@opencode-ai/plugin";
import { waitFor } from "./tools/wait-for";
import { findFlakyTests } from "./tools/find-flaky-tests";
import { traceRootCause } from "./tools/trace-root-cause";
import { debugSession } from "./tools/debug-session";

/**
 * Debug Assistant Plugin
 * 
 * Provides systematic debugging tools:
 * - waitFor: Replace arbitrary delays with condition-based waiting
 * - findFlakyTests: Detect test pollution and flakiness
 * - traceRootCause: Analyze stack traces to find root cause
 * - debugSession: Track debugging progress through 4 phases
 * 
 * Includes hooks for automatic error handling.
 */
const DebugAssistantPlugin: Plugin = async (context: PluginContext) => {
  return {
    name: "debug-assistant",
    version: "1.0.0",
    description: "Systematic debugging tools with automated error handling",
    
    tools: [
      waitFor,
      findFlakyTests,
      traceRootCause,
      debugSession,
    ],

    config: async (currentConfig) => {
      return {
        ...currentConfig,
        autoDebug: true, // Automatically start debug session on errors
      };
    },
  };
};

export default DebugAssistantPlugin;
