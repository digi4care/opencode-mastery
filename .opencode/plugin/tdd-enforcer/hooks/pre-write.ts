import type { PluginContext, ToolExecuteEvent } from "@opencode-ai/plugin";
import { checkTestExists } from "../tools/check-test-exists";

/**
 * Hook that runs before any write operation to enforce TDD.
 * Blocks writes to implementation files without corresponding tests.
 */
export const preWriteHook = async (context: PluginContext) => {
  return {
    "tool.execute.before": async ({ event }: { event: ToolExecuteEvent }) => {
      const { toolName, args } = event.data;
      
      // Only intercept write operations
      if (toolName !== "write" && toolName !== "edit") {
        return;
      }

      const filePath = args?.filePath || args?.path;
      if (!filePath) {
        return;
      }

      // Check if it's a source file (not test, config, or doc)
      if (isTestFile(filePath) || isConfigFile(filePath) || isDocFile(filePath)) {
        return;
      }

      // Check if test exists
      const result = await checkTestExists({
        implementationFile: filePath,
        autoCreate: false,
      });

      if (!result.data?.hasTest) {
        // TDD violation detected
        const error = `
⚠️  TDD VIOLATION DETECTED

You are attempting to write to: ${filePath}

No corresponding test file found!

TDD requires:
1. Write failing test FIRST (RED)
2. Write minimal implementation (GREEN)
3. Refactor

Options:
- Create test first: Use /tool check-test-exists with autoCreate=true
- If this is config/docs: Rename file appropriately
- If this is intentional: Use --skip-tdd flag (not recommended)

Create test now? (yes/no)
        `.trim();

        throw new Error(error);
      }
    },
  };
};

function isTestFile(path: string): boolean {
  return /\.(test|spec)\.(ts|js|tsx|jsx)$/.test(path) ||
         /[\/\\]__tests__[\/\\]/.test(path) ||
         /[\/\\]tests?[\/\\]/.test(path);
}

function isConfigFile(path: string): boolean {
  return /\.(json|yaml|yml|toml|config\.|rc\.)/.test(path) ||
         /[\/\\]\.[^\/\\]+$/.test(path); // Hidden files
}

function isDocFile(path: string): boolean {
  return /\.(md|mdx|txt|rst)$/.test(path) ||
         /[\/\\](docs?|documentation)[\/\\]/i.test(path);
}

export default preWriteHook;
