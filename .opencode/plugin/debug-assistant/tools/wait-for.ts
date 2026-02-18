import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

/**
 * Waits for a condition to be met with configurable timeout and polling.
 * Replaces arbitrary sleep delays with explicit condition waiting.
 */
export const waitFor = tool(
  z.object({
    condition: z.string().describe("JavaScript expression that evaluates to truthy when condition is met (e.g., 'document.querySelector(\".loaded\") !== null')"),
    description: z.string().describe("Human-readable description of what's being waited for"),
    timeoutMs: z.number().default(5000).describe("Maximum time to wait in milliseconds"),
    pollIntervalMs: z.number().default(100).describe("Polling interval in milliseconds"),
    context: z.enum(["page", "browser", "node"]).default("page").describe("Execution context"),
  }),
  async (args) => {
    const startTime = Date.now();
    let lastError: string | null = null;
    let attempts = 0;

    try {
      while (true) {
        attempts++;
        
        try {
          // Evaluate condition (simplified - in real implementation this would use playwright)
          // This is a placeholder for the actual implementation
          const result = await evaluateCondition(args.condition, args.context);
          
          if (result) {
            const elapsed = Date.now() - startTime;
            return {
              success: true,
              data: {
                condition: args.condition,
                satisfied: true,
                elapsedMs: elapsed,
                attempts,
              },
              metadata: {
                description: args.description,
                message: `Condition met after ${elapsed}ms (${attempts} attempts)`,
              },
            };
          }
        } catch (error) {
          lastError = error instanceof Error ? error.message : String(error);
        }

        // Check timeout
        if (Date.now() - startTime > args.timeoutMs) {
          return {
            success: false,
            data: {
              condition: args.condition,
              satisfied: false,
              elapsedMs: Date.now() - startTime,
              attempts,
              lastError,
            },
            metadata: {
              description: args.description,
              message: `Timeout after ${args.timeoutMs}ms - condition not met`,
              recommendation: "Check if condition is achievable or increase timeout",
            },
          };
        }

        // Wait before next poll
        await new Promise(resolve => setTimeout(resolve, args.pollIntervalMs));
      }
    } catch (error) {
      return {
        success: false,
        data: null,
        metadata: {
          error: error instanceof Error ? error.message : "Unknown error in waitFor",
          recommendation: "Check condition syntax and context",
        },
      };
    }
  }
).describe("Wait for a condition to be met instead of using arbitrary delays");

async function evaluateCondition(condition: string, context: string): Promise<boolean> {
  // Placeholder - actual implementation would use playwright to evaluate in browser context
  // For now, return false to demonstrate the tool structure
  return false;
}

export default waitFor;
