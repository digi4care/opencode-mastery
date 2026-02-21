/**
 * Repository Analysis Feature Module
 * 
 * Central exports for repo analysis tools.
 * Exposes plugin entrypoint for modular import paths.
 */
import { REPO_ANALYZE_TOOL_NAME } from "../../plugin/repo-analyzer";

export { default as repoAnalyzerPlugin } from "../../plugin/repo-analyzer";

export const feature = {
  name: "repo",
  description: "GitHub repository analysis tools",
  tools: [REPO_ANALYZE_TOOL_NAME],
  plugin: "repo-analyzer",
};
