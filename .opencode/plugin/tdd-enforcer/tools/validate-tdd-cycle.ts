import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";

/**
 * Validates that TDD cycle was followed by checking git history
 * and file relationships between tests and implementation.
 */
export const validateTDDCycle = tool(
  z.object({
    testFile: z.string().describe("Path to the test file"),
    implementationFile: z.string().describe("Path to the implementation file"),
    checkCommitOrder: z.boolean().default(true).describe("Check git commit order"),
    verifySingleBehavior: z.boolean().default(true).describe("Verify test tests single behavior"),
  }),
  async (args) => {
    const violations: string[] = [];
    const checks: Record<string, boolean> = {};

    try {
      // Check 1: Test file exists
      const testExists = await $`test -f ${args.testFile}`.nothrow().exitCode === 0;
      checks.testExists = testExists;
      
      if (!testExists) {
        violations.push(`Test file does not exist: ${args.testFile}`);
      }

      // Check 2: Implementation file exists
      const implExists = await $`test -f ${args.implementationFile}`.nothrow().exitCode === 0;
      checks.implementationExists = implExists;

      // Check 3: Git commit order
      if (args.checkCommitOrder && testExists && implExists) {
        try {
          const testCommits = await $`git log --follow --format="%H %at" -- ${args.testFile}`.text();
          const implCommits = await $`git log --follow --format="%H %at" -- ${args.implementationFile}`.text();
          
          const testFirstCommit = testCommits.trim().split("\n").filter(Boolean).pop();
          const implFirstCommit = implCommits.trim().split("\n").filter(Boolean).pop();
          
          if (testFirstCommit && implFirstCommit) {
            const testTime = parseInt(testFirstCommit.split(" ")[1]);
            const implTime = parseInt(implFirstCommit.split(" ")[1]);
            
            checks.testCommittedFirst = testTime <= implTime;
            if (!checks.testCommittedFirst) {
              violations.push("Implementation was committed before test (TDD violation)");
            }
          }
        } catch (e) {
          // Git check failed, skip
          checks.gitCheckSkipped = true;
        }
      }

      // Check 4: Test file is not empty
      if (testExists) {
        const testContent = await $`cat ${args.testFile}`.text();
        const hasTestCases = /test\(|it\(|describe\(/.test(testContent);
        checks.hasTestCases = hasTestCases;
        
        if (!hasTestCases) {
          violations.push("Test file exists but contains no test cases");
        }
      }

      // Check 5: Single behavior verification (basic)
      if (args.verifySingleBehavior && testExists) {
        const testContent = await $`cat ${args.testFile}`.text();
        const testCount = (testContent.match(/test\(|it\(/g) || []).length;
        checks.singleTestInFile = testCount === 1;
        
        if (testCount > 3) {
          violations.push(`Test file has ${testCount} tests - consider splitting (TDD best practice)`);
        }
      }

      const allChecksPassed = Object.values(checks).every(c => c === true || c === undefined);

      return {
        success: violations.length === 0,
        data: {
          followsTDD: violations.length === 0,
          checks,
          violations,
        },
        metadata: {
          testFile: args.testFile,
          implementationFile: args.implementationFile,
          allChecksPassed,
          recommendation: violations.length > 0 
            ? "Fix violations before proceeding with TDD"
            : "TDD cycle validated successfully",
        },
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        metadata: {
          error: error instanceof Error ? error.message : "Unknown error",
          recommendation: "Unable to validate TDD cycle - check file paths",
        },
      };
    }
  }
).describe("Validate that TDD cycle was followed - test before implementation");

export default validateTDDCycle;
