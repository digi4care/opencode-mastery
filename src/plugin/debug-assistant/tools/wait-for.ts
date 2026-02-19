/**
 * Wait For Condition
 * 
 * Waits for a condition to be true instead of using arbitrary timeouts.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const waitFor = tool(
  z.object({
    description: z.string().describe("Human-readable description of what we're waiting for"),
    timeoutMs: z.number().default(5000).describe("Maximum wait time in milliseconds"),
    pollIntervalMs: z.number().default(100).describe("How often to check the condition"),
  }),
  async (args) => {
    // Note: This is a placeholder - actual condition checking would need
    // to be done by the AI or via a callback mechanism
    return {
      success: true,
      data: {
        description: args.description,
        timeoutMs: args.timeoutMs,
        pollIntervalMs: args.pollIntervalMs,
        note: "Use this pattern in your code: while(!condition) { await sleep(pollIntervalMs); if (elapsed > timeoutMs) throw Error; }",
      },
      metadata: {},
    };
  }
).describe("Template for condition-based waiting instead of fixed timeouts.");
