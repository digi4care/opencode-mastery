/**
 * Analyze Git Order
 * 
 * Checks git history to verify test was committed before implementation.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";

export const analyzeGitOrder = tool(
  z.object({
    testFile: z.string().describe("Path to test file"),
    implementationFile: z.string().describe("Path to implementation file"),
  }),
  async (args) => {
    try {
      // Get first commit for each file
      const testCommitResult = await $`git log --follow --format="%H %ai" -- ${args.testFile} | tail -1`.quiet();
      const implCommitResult = await $`git log --follow --format="%H %ai" -- ${args.implementationFile} | tail -1`.quiet();
      
      const testCommit = testCommitResult.text().trim();
      const implCommit = implCommitResult.text().trim();
      
      if (!testCommit || !implCommit) {
        return {
          success: false,
          data: {
            testFirst: false,
            testCommit: testCommit || "not found",
            implCommit: implCommit || "not found",
          },
          metadata: { error: "Could not find commits for both files" },
        };
      }
      
      // Parse dates
      const testDate = new Date(testCommit.split(" ").slice(1).join(" "));
      const implDate = new Date(implCommit.split(" ").slice(1).join(" "));
      
      const testFirst = testDate <= implDate;
      
      return {
        success: testFirst,
        data: {
          testFirst,
          testCommit: testCommit.split(" ")[0],
          testDate: testDate.toISOString(),
          implCommit: implCommit.split(" ")[0],
          implDate: implDate.toISOString(),
          timeDiff: Math.abs(implDate.getTime() - testDate.getTime()) / 1000 / 60, // minutes
        },
        metadata: {},
      };
    } catch (error) {
      return {
        success: false,
        data: {
          testFirst: false,
          testCommit: "error",
          implCommit: "error",
        },
        metadata: { error: String(error) },
      };
    }
  }
).describe("Analyze git history to verify test was committed before implementation.");
