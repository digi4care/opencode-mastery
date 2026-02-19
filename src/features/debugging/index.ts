/**
 * Debugging Feature Module
 * 
 * Central exports for all debugging-related tools.
 * Re-exports from plugin for modular import paths.
 */
export * from "../../plugin/debug-assistant/tools/wait-for";
export * from "../../plugin/debug-assistant/tools/find-flaky-tests";
export * from "../../plugin/debug-assistant/tools/trace-root-cause";
export * from "../../plugin/debug-assistant/tools/debug-session";

export const feature = {
  name: "debugging",
  description: "Systematic debugging workflow tools",
  tools: ["wait-for", "find-flaky-tests", "trace-root-cause", "debug-session"],
  plugin: "debug-assistant",
};
