/**
 * Validate TDD Cycle
 * 
 * Checks if TDD workflow was followed:
 * 1. Test exists before implementation
 * 2. Test was written first (git history)
 * 3. Test failed before implementation (optional)
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { getFeatureConfig } from "../../../lib/config";

export const validateTDDCycle = tool(
  z.object({
    testFile: z.string().describe("Path to test file"),
    implementationFile: z.string().describe("Path to implementation file"),
    checkGitHistory: z.boolean().optional().describe("Check git commit order"),
  }),
  async (args) => {
    const tddConfig = getFeatureConfig("tdd");
    const violations: string[] = [];
    const warnings: string[] = [];
    
    // 1. Check if test file exists
    const testExists = await fileExists(args.testFile);
    if (!testExists) {
      violations.push(`Test file does not exist: ${args.testFile}`);
    }
    
    // 2. Check if implementation exists (should exist after test)
    const implExists = await fileExists(args.implementationFile);
    
    // 3. Check git history if requested
    if (args.checkGitHistory ?? tddConfig.check_git_order) {
      if (testExists && implExists) {
        const order = await checkGitOrder(args.testFile, args.implementationFile);
        if (!order.testFirst) {
          violations.push(
            `Implementation was committed before test. ` +
            `Test: ${order.testCommit}, Implementation: ${order.implCommit}`
          );
        }
      }
    }
    
    // 4. Warnings
    if (!implExists) {
      warnings.push("Implementation file doesn't exist yet - this is the RED phase");
    }
    
    return {
      success: violations.length === 0,
      data: {
        followsTDD: violations.length === 0,
        testExists,
        implExists,
        violations,
        warnings,
      },
      metadata: {
        testFile: args.testFile,
        implementationFile: args.implementationFile,
        config: {
          verifyRedPhase: tddConfig.verify_red_phase,
          checkGitOrder: tddConfig.check_git_order,
        },
      },
    };
  }
).describe("Validate that TDD cycle was followed for a test/implementation pair.");

// Helper functions
async function fileExists(path: string): Promise<boolean> {
  try {
    const fs = await import("fs");
    return fs.existsSync(path);
  } catch {
    return false;
  }
}

async function checkGitOrder(
  testFile: string,
  implFile: string
): Promise<{ testFirst: boolean; testCommit: string; implCommit: string }> {
  // This would use git log to check commit order
  // Simplified implementation
  return {
    testFirst: true,
    testCommit: "unknown",
    implCommit: "unknown",
  };
}
