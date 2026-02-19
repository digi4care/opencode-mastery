/**
 * Find Flaky Tests
 * 
 * Detects tests that pollute global state and cause flakiness.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";

export const findFlakyTests = tool(
  z.object({
    testPattern: z.string().describe("Glob pattern for test files (e.g., '**/*.test.ts')"),
    runs: z.number().default(3).describe("Number of test runs to detect flakiness"),
    testCommand: z.string().default("bun test").describe("Command to run tests"),
  }),
  async (args) => {
    const results: Array<{ run: number; passed: boolean; output: string }> = [];
    
    // Run tests multiple times
    for (let i = 0; i < args.runs; i++) {
      try {
        const result = await $`${args.testCommand} ${args.testPattern}`.quiet().nothrow();
        results.push({
          run: i + 1,
          passed: result.exitCode === 0,
          output: result.text(),
        });
      } catch (error) {
        results.push({
          run: i + 1,
          passed: false,
          output: String(error),
        });
      }
    }
    
    // Analyze for flakiness
    const passCount = results.filter(r => r.passed).length;
    const failCount = results.filter(r => !r.passed).length;
    const isFlaky = passCount > 0 && failCount > 0;
    
    return {
      success: !isFlaky,
      data: {
        isFlaky,
        passRate: passCount / args.runs,
        results: results.map(r => ({ run: r.run, passed: r.passed })),
        recommendation: isFlaky 
          ? "Tests are flaky. Check for global state pollution, timing issues, or external dependencies."
          : "Tests are stable.",
      },
      metadata: {
        runs: args.runs,
        testPattern: args.testPattern,
      },
    };
  }
).describe("Detect flaky tests by running them multiple times and analyzing results.");
