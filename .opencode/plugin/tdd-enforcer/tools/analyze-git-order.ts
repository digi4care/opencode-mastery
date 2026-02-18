import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";

/**
 * Analyzes git history to verify test was written before implementation.
 * Provides detailed timeline of file changes.
 */
export const analyzeGitOrder = tool(
  z.object({
    testFile: z.string().describe("Path to test file"),
    implementationFile: z.string().describe("Path to implementation file"),
    maxCommits: z.number().default(20).describe("Maximum commits to analyze"),
  }),
  async (args) => {
    try {
      // Get commit history for both files
      const [testLog, implLog] = await Promise.all([
        $`git log --follow --format="%H|%at|%s|%an" -n ${args.maxCommits} -- ${args.testFile}`.text(),
        $`git log --follow --format="%H|%at|%s|%an" -n ${args.maxCommits} -- ${args.implementationFile}`.text(),
      ]);

      const testCommits = parseGitLog(testLog);
      const implCommits = parseGitLog(implLog);

      if (testCommits.length === 0 && implCommits.length === 0) {
        return {
          success: true,
          data: {
            testFirst: null,
            testCommits: [],
            implCommits: [],
            timeline: [],
          },
          metadata: {
            message: "No git history found for either file - cannot determine order",
            recommendation: "Commit test file first to follow TDD",
          },
        };
      }

      // Find first commits
      const firstTestCommit = testCommits[testCommits.length - 1];
      const firstImplCommit = implCommits[implCommits.length - 1];

      let testFirst: boolean | null = null;
      let timeDiff: number | null = null;

      if (firstTestCommit && firstImplCommit) {
        testFirst = firstTestCommit.timestamp <= firstImplCommit.timestamp;
        timeDiff = Math.abs(firstTestCommit.timestamp - firstImplCommit.timestamp);
      } else if (firstTestCommit && !firstImplCommit) {
        testFirst = true; // Only test exists
      } else if (!firstTestCommit && firstImplCommit) {
        testFirst = false; // Only impl exists - violation!
      }

      // Build timeline
      const timeline = buildTimeline(testCommits, implCommits);

      return {
        success: testFirst === true,
        data: {
          testFirst,
          firstTestCommit,
          firstImplCommit,
          timeDiff,
          testCommits,
          implCommits,
          timeline,
        },
        metadata: {
          testCommitCount: testCommits.length,
          implCommitCount: implCommits.length,
          tddFollowed: testFirst === true,
          violation: testFirst === false,
          recommendation: testFirst === false
            ? "TDD VIOLATION: Implementation was committed before test"
            : testFirst === true
            ? "TDD followed: Test was committed before implementation"
            : "Cannot determine order - ensure test exists",
        },
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        metadata: {
          error: error instanceof Error ? error.message : "Git analysis failed",
          recommendation: "Ensure you're in a git repository",
        },
      };
    }
  }
).describe("Analyze git history to verify test-before-implementation order");

interface GitCommit {
  hash: string;
  timestamp: number;
  message: string;
  author: string;
}

function parseGitLog(log: string): GitCommit[] {
  return log
    .trim()
    .split("\n")
    .filter(Boolean)
    .map(line => {
      const parts = line.split("|");
      return {
        hash: parts[0],
        timestamp: parseInt(parts[1]),
        message: parts[2],
        author: parts[3],
      };
    })
    .reverse(); // Oldest first
}

function buildTimeline(testCommits: GitCommit[], implCommits: GitCommit[]): Array<{
  type: "test" | "impl";
  commit: GitCommit;
}> {
  const allEvents = [
    ...testCommits.map(c => ({ type: "test" as const, commit: c, time: c.timestamp })),
    ...implCommits.map(c => ({ type: "impl" as const, commit: c, time: c.timestamp })),
  ];

  return allEvents.sort((a, b) => a.time - b.time);
}

export default analyzeGitOrder;
