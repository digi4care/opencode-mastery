import type { Plugin, PluginContext } from "@opencode-ai/plugin";
import { validateTDDCycle } from "./tools/validate-tdd-cycle";
import { checkTestExists } from "./tools/check-test-exists";
import { analyzeGitOrder } from "./tools/analyze-git-order";

/**
 * TDD Enforcer Plugin
 * 
 * Enforces Test-Driven Development discipline by:
 * - Validating TDD cycle was followed
 * - Checking test existence before implementation
 * - Analyzing git history for test-first commits
 * - Blocking writes without tests (via hooks)
 */
const TDDEnforcerPlugin: Plugin = async (context: PluginContext) => {
  return {
    name: "tdd-enforcer",
    version: "1.0.0",
    description: "Enforces TDD discipline with automated validation and enforcement",
    
    tools: [
      validateTDDCycle,
      checkTestExists,
      analyzeGitOrder,
    ],

    config: async (currentConfig) => {
      return {
        ...currentConfig,
        strictMode: true, // Enforce TDD violations as errors
      };
    },
  };
};

export default TDDEnforcerPlugin;
