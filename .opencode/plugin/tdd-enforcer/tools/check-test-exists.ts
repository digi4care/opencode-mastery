import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";
import { join, dirname, basename, extname } from "path";

/**
 * Checks if a corresponding test file exists for an implementation file.
 * Supports multiple test naming conventions.
 */
export const checkTestExists = tool(
  z.object({
    implementationFile: z.string().describe("Path to the implementation file"),
    testPatterns: z.array(z.string()).default([
      "{name}.test{ext}",
      "{name}.spec{ext}",
      "__tests__/{name}{ext}",
      "tests/{name}.test{ext}",
    ]).describe("Patterns to search for test files"),
    autoCreate: z.boolean().default(false).describe("Suggest test file creation if not found"),
  }),
  async (args) => {
    const dir = dirname(args.implementationFile);
    const name = basename(args.implementationFile, extname(args.implementationFile));
    const ext = extname(args.implementationFile);
    
    const possibleTests: string[] = [];
    const checkedPaths: string[] = [];

    // Generate possible test file paths
    for (const pattern of args.testPatterns) {
      const testPath = pattern
        .replace("{name}", name)
        .replace("{ext}", ext);
      
      const fullPath = join(dir, testPath);
      possibleTests.push(fullPath);
      checkedPaths.push(fullPath);
    }

    // Check which exist
    const existingTests: string[] = [];
    for (const testPath of possibleTests) {
      const exists = await $`test -f ${testPath}`.nothrow().exitCode === 0;
      if (exists) {
        existingTests.push(testPath);
      }
    }

    const hasTest = existingTests.length > 0;

    // Suggest creation if not found
    let suggestion = null;
    if (!hasTest && args.autoCreate) {
      const suggestedPath = join(dir, `${name}.test${ext}`);
      suggestion = {
        path: suggestedPath,
        template: generateTestTemplate(name, ext),
      };
    }

    return {
      success: hasTest,
      data: {
        hasTest,
        existingTests,
        checkedPaths,
        implementationFile: args.implementationFile,
        suggestion,
      },
      metadata: {
        totalChecked: checkedPaths.length,
        testsFound: existingTests.length,
        action: hasTest 
          ? "Test file exists - proceed with TDD"
          : "Test file missing - create test first",
      },
    };
  }
).describe("Check if test file exists for implementation file");

function generateTestTemplate(name: string, ext: string): string {
  const isTS = ext === ".ts" || ext === ".tsx";
  const importExt = isTS ? '' : '.js';
  
  return `import { describe, test, expect } from "bun:test";
import { ${name} } from "./${name}${importExt}";

describe("${name}", () => {
  test("should [expected behavior]", () => {
    // Arrange
    const input = /* setup */;
    
    // Act
    const result = ${name}(input);
    
    // Assert
    expect(result).toBe(/* expected */);
  });
});
`;
}

export default checkTestExists;
