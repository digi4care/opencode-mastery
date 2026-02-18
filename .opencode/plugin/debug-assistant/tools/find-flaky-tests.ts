import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";

/**
 * Finds tests that pollute global state and cause flakiness.
 * Runs tests in isolation vs together to identify polluters.
 */
export const findFlakyTests = tool(
  z.object({
    testPattern: z.string().default("**/*.test.{ts,js}").describe("Glob pattern for test files"),
    testCommand: z.string().default("bun test").describe("Test runner command"),
    runsPerTest: z.number().default(3).describe("Number of times to run each test"),
    verbose: z.boolean().default(false).describe("Show detailed output"),
  }),
  async (args) => {
    const results = {
      isolated: new Map<string, boolean[]>(),
      together: new Map<string, boolean[]>(),
    };

    try {
      // Find all test files
      const testFiles = await $`find . -path "${args.testPattern}" -type f 2>/dev/null`.lines();
      
      if (testFiles.length === 0) {
        return {
          success: true,
          data: {
            polluters: [],
            flakyTests: [],
            totalFiles: 0,
          },
          metadata: {
            message: "No test files found matching pattern",
          },
        };
      }

      // Run tests in isolation
      if (args.verbose) console.log("Running tests in isolation...");
      for (const file of testFiles) {
        results.isolated.set(file, []);
        
        for (let i = 0; i < args.runsPerTest; i++) {
          const result = await $`${args.testCommand} ${file}`.nothrow();
          const passed = result.exitCode === 0;
          results.isolated.get(file)!.push(passed);
        }
      }

      // Run all tests together
      if (args.verbose) console.log("Running all tests together...");
      for (let i = 0; i < args.runsPerTest; i++) {
        const result = await $`${args.testCommand} ${testFiles.join(" ")}`.nothrow();
        const allPassed = result.exitCode === 0;
        
        // Store in together map (we'll analyze per file later)
        for (const file of testFiles) {
          if (!results.together.has(file)) {
            results.together.set(file, []);
          }
          results.together.get(file)!.push(allPassed);
        }
      }

      // Analyze results
      const polluters: Array<{
        file: string;
        isolatedPassRate: number;
        togetherPassRate: number;
        likelyPolluter: boolean;
      }> = [];

      const flakyTests: Array<{
        file: string;
        passRate: number;
        inconsistent: boolean;
      }> = [];

      for (const file of testFiles) {
        const isolatedRuns = results.isolated.get(file) || [];
        const togetherRuns = results.together.get(file) || [];
        
        const isolatedPassRate = isolatedRuns.filter(Boolean).length / isolatedRuns.length;
        const togetherPassRate = togetherRuns.filter(Boolean).length / togetherRuns.length;
        
        // Check if this test is flaky (inconsistent in isolation)
        if (isolatedPassRate < 1.0 && isolatedPassRate > 0) {
          flakyTests.push({
            file,
            passRate: isolatedPassRate,
            inconsistent: true,
          });
        }
        
        // Check if this test pollutes (passes alone but fails together)
        if (isolatedPassRate === 1.0 && togetherPassRate < 1.0) {
          polluters.push({
            file,
            isolatedPassRate,
            togetherPassRate,
            likelyPolluter: true,
          });
        }
      }

      const hasIssues = polluters.length > 0 || flakyTests.length > 0;

      return {
        success: !hasIssues,
        data: {
          polluters,
          flakyTests,
          totalFiles: testFiles.length,
          isolatedResults: Object.fromEntries(results.isolated),
          togetherResults: Object.fromEntries(results.together),
        },
        metadata: {
          polluterCount: polluters.length,
          flakyCount: flakyTests.length,
          message: hasIssues
            ? `Found ${polluters.length} polluters and ${flakyTests.length} flaky tests`
            : "No test pollution or flakiness detected",
          recommendation: hasIssues
            ? "Run with verbose=true to see details. Consider isolating polluters or fixing state management."
            : "All tests appear stable",
        },
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        metadata: {
          error: error instanceof Error ? error.message : "Failed to analyze tests",
          recommendation: "Check test command and pattern are correct",
        },
      };
    }
  }
).describe("Find tests that pollute global state and cause flaky test failures");

export default findFlakyTests;
