/**
 * TDD Enforcer Plugin
 * 
 * Enforces Test-Driven Development workflow:
 * - Blocks writes without tests
 * - Verifies RED phase (test must fail first)
 * - Tracks TDD compliance
 * 
 * Uses shared config from src/lib/config
 */
import type { PluginContext } from "@opencode-ai/plugin";
import { isFeatureEnabled, getFeatureConfig } from "../../lib/config";
import { validateTDDCycle } from "./tools/validate-tdd-cycle";
import { checkTestExists } from "./tools/check-test-exists";
import { analyzeGitOrder } from "./tools/analyze-git-order";

export const Plugin = async (context: PluginContext) => {
  // Check if TDD is enabled
  if (!isFeatureEnabled("tdd")) {
    console.log("TDD enforcement is disabled in config");
    return { tool: [] };
  }

  const tddConfig = getFeatureConfig("tdd");
  
  return {
    // Register tools
    tool: [
      validateTDDCycle,
      checkTestExists,
      ...(tddConfig.check_git_order ? [analyzeGitOrder] : []),
    ],
    
    // Hook: Block writes without tests
    "tool.execute.before": async ({ event }) => {
      if (!tddConfig.enforce_on_write || !tddConfig.block_without_test) {
        return;
      }
      
      const { toolName, args } = event.data;
      
      // Intercept write/edit operations
      if (toolName === "write" || toolName === "edit") {
        const filePath = args.filePath || args.path;
        
        if (filePath && isSourceFile(filePath)) {
          const testFile = findCorrespondingTest(filePath);
          
          if (!testFile) {
            throw new Error(
              `TDD VIOLATION: Cannot write ${filePath} without corresponding test file.\n` +
              `Expected test file: ${testFile}\n` +
              `Follow TDD: Write failing test first, then implementation.`
            );
          }
        }
      }
    },
  };
};

function isSourceFile(path: string): boolean {
  return /\.(ts|tsx|js|jsx|py|go|rs|java)$/.test(path) && 
         !path.includes(".test.") && 
         !path.includes(".spec.");
}

function findCorrespondingTest(sourcePath: string): string | null {
  // Simple heuristic: replace extension with .test.ext
  const ext = sourcePath.split(".").pop();
  return sourcePath.replace(`.${ext}`, `.test.${ext}`);
}

export default Plugin;
