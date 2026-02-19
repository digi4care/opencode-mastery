/**
 * Memory Feature Module
 * 
 * Central exports for memory and docs tools.
 * Re-exports from plugin for modular import paths.
 */
export * from "../../plugin/opencode-mastery/tools/search-docs";
export * from "../../plugin/opencode-mastery/tools/download-docs";
// Memory tools - need to check actual file locations

export const feature = {
  name: "memory",
  description: "Memory and documentation tools",
  tools: ["search-docs", "download-docs", "memory-remember", "memory-status"],
  plugin: "opencode-mastery",
};
