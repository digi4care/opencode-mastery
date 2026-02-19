/**
 * Flow Analysis Feature Module
 * 
 * Central exports for all flow analysis tools.
 * Re-exports from plugin for modular import paths.
 */
export * from "../../plugin/flow-analyzer/tools/extract-flows";
export * from "../../plugin/flow-analyzer/tools/build-flow-graph";
export * from "../../plugin/flow-analyzer/tools/trace-implementation";
export * from "../../plugin/flow-analyzer/tools/detect-flow-gaps";
export * from "../../plugin/flow-analyzer/tools/score-flow-confidence";

export const feature = {
  name: "flow",
  description: "Flow completeness analysis tools",
  tools: ["extract-flows", "build-flow-graph", "trace-implementation", "detect-flow-gaps", "score-flow-confidence"],
  plugin: "flow-analyzer",
};
