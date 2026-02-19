/**
 * TDD Feature Module
 * 
 * Central exports for all TDD-related tools.
 * Re-exports from plugin for modular import paths.
 */
export * from "../../plugin/tdd-enforcer/tools/validate-tdd-cycle";
export * from "../../plugin/tdd-enforcer/tools/check-test-exists";
export * from "../../plugin/tdd-enforcer/tools/analyze-git-order";

export const feature = {
  name: "tdd",
  description: "Test-Driven Development enforcement tools",
  tools: ["validate-tdd-cycle", "check-test-exists", "analyze-git-order"],
  plugin: "tdd-enforcer",
};
