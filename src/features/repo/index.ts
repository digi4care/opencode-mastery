/**
 * Repository Analysis Feature Module
 * 
 * Central exports for repo analysis tools.
 * Re-exports from plugin for modular import paths.
 */
export * from "../../plugin/repo-analyzer/tools/repo-analyze";

export const feature = {
  name: "repo",
  description: "GitHub repository analysis tools",
  tools: ["repo-analyze"],
  plugin: "repo-analyzer",
};
