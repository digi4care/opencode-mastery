/**
 * Check Test Exists
 * 
 * Verifies that a test file exists for a given source file.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { existsSync } from "fs";

export const checkTestExists = tool(
  z.object({
    sourceFile: z.string().describe("Path to source file"),
    testPattern: z.enum([".test.", ".spec.", "both"]).default("both").describe("Test file pattern to look for"),
  }),
  async (args) => {
    const dir = args.sourceFile.substring(0, args.sourceFile.lastIndexOf("/"));
    const fileName = args.sourceFile.substring(args.sourceFile.lastIndexOf("/") + 1);
    const ext = fileName.split(".").pop();
    const baseName = fileName.replace(`.${ext}`, "");
    
    const possibleTestFiles: string[] = [];
    
    if (args.testPattern === ".test." || args.testPattern === "both") {
      possibleTestFiles.push(`${dir}/${baseName}.test.${ext}`);
    }
    if (args.testPattern === ".spec." || args.testPattern === "both") {
      possibleTestFiles.push(`${dir}/${baseName}.spec.${ext}`);
    }
    
    const existingTests = possibleTestFiles.filter(f => existsSync(f));
    
    return {
      success: existingTests.length > 0,
      data: {
        sourceFile: args.sourceFile,
        hasTest: existingTests.length > 0,
        testFiles: existingTests,
        searchedPatterns: possibleTestFiles,
      },
      metadata: {
        testPattern: args.testPattern,
      },
    };
  }
).describe("Check if a test file exists for the given source file.");
