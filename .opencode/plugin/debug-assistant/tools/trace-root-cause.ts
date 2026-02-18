import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { $ } from "bun";

/**
 * Traces an error backwards through the call stack to find root cause.
 * Analyzes each frame to identify where the problem originated.
 */
export const traceRootCause = tool(
  z.object({
    errorMessage: z.string().describe("The error message or exception text"),
    stackTrace: z.string().optional().describe("Full stack trace if available"),
    sourceFile: z.string().optional().describe("Source file where error occurred"),
    lineNumber: z.number().optional().describe("Line number where error occurred"),
    analyzeGitHistory: z.boolean().default(true).describe("Check recent git changes"),
  }),
  async (args) => {
    try {
      const analysis: {
        frames: Array<{
          file: string;
          line: number;
          function: string;
          source: string | null;
          recentChanges: Array<{
            commit: string;
            message: string;
            author: string;
            date: string;
          }> | null;
        }>;
        rootCause: {
          file: string | null;
          line: number | null;
          confidence: "high" | "medium" | "low";
          reasoning: string;
        };
        recommendations: string[];
      } = {
        frames: [],
        rootCause: {
          file: null,
          line: null,
          confidence: "low",
          reasoning: "",
        },
        recommendations: [],
      };

      // Parse stack trace
      const frames = parseStackTrace(args.stackTrace || args.errorMessage);
      
      // Analyze each frame
      for (const frame of frames.slice(0, 5)) { // Analyze top 5 frames
        let source: string | null = null;
        let recentChanges = null;

        // Try to read source file
        try {
          source = await $`sed -n '${frame.line},${frame.line + 5}p' ${frame.file} 2>/dev/null`.text();
        } catch {
          source = null;
        }

        // Check git history if enabled
        if (args.analyzeGitHistory) {
          try {
            const gitLog = await $`git log -n 5 --format="%H|%s|%an|%ad" -- ${frame.file} 2>/dev/null`.text();
            recentChanges = gitLog
              .trim()
              .split("\n")
              .filter(Boolean)
              .map(line => {
                const parts = line.split("|");
                return {
                  commit: parts[0]?.slice(0, 7),
                  message: parts[1],
                  author: parts[2],
                  date: parts[3],
                };
              });
          } catch {
            recentChanges = null;
          }
        }

        analysis.frames.push({
          file: frame.file,
          line: frame.line,
          function: frame.function,
          source,
          recentChanges,
        });
      }

      // Determine root cause
      if (analysis.frames.length > 0) {
        // Heuristic: The deepest frame with recent changes is likely the culprit
        const framesWithChanges = analysis.frames.filter(f => f.recentChanges && f.recentChanges.length > 0);
        
        if (framesWithChanges.length > 0) {
          // Take the last frame with changes (deepest in stack)
          const likelyCause = framesWithChanges[framesWithChanges.length - 1];
          analysis.rootCause = {
            file: likelyCause.file,
            line: likelyCause.line,
            confidence: "high",
            reasoning: `Recent changes in ${likelyCause.file} at line ${likelyCause.line}. Stack trace shows this is where the error originated.`,
          };
        } else {
          // No recent changes, use top of stack
          const topFrame = analysis.frames[0];
          analysis.rootCause = {
            file: topFrame.file,
            line: topFrame.line,
            confidence: "medium",
            reasoning: `Error surfaced at ${topFrame.file}:${topFrame.line}. No recent changes detected in call stack.`,
          };
        }
      }

      // Generate recommendations
      analysis.recommendations = generateRecommendations(analysis, args);

      return {
        success: true,
        data: analysis,
        metadata: {
          framesAnalyzed: analysis.frames.length,
          confidence: analysis.rootCause.confidence,
          message: `Root cause identified: ${analysis.rootCause.file}:${analysis.rootCause.line}`,
          recommendation: analysis.recommendations[0] || "Investigate the identified location",
        },
      };
    } catch (error) {
      return {
        success: false,
        data: null,
        metadata: {
          error: error instanceof Error ? error.message : "Failed to trace root cause",
          recommendation: "Check if source files are accessible and git is available",
        },
      };
    }
  }
).describe("Trace error backwards through call stack to identify root cause");

interface StackFrame {
  file: string;
  line: number;
  column: number;
  function: string;
}

function parseStackTrace(trace: string): StackFrame[] {
  const frames: StackFrame[] = [];
  const lines = trace.split("\n");

  for (const line of lines) {
    // Match patterns like:
    // at functionName (file:line:column)
    // at file:line:column
    // at Object.functionName (file:line:column)
    const match = line.match(/at\s+(?:Object\.)?(?:(\S+)\s+\()?([^\s:]+):(\d+):(\d+)\)?/);
    
    if (match) {
      frames.push({
        function: match[1] || "<anonymous>",
        file: match[2],
        line: parseInt(match[3]),
        column: parseInt(match[4]),
      });
    }
  }

  return frames;
}

function generateRecommendations(
  analysis: any,
  args: any
): string[] {
  const recommendations: string[] = [];

  if (analysis.rootCause.confidence === "high") {
    recommendations.push(`Focus investigation on ${analysis.rootCause.file}:${analysis.rootCause.line} - recent changes detected`);
  }

  if (analysis.frames.some((f: any) => f.recentChanges && f.recentChanges.length > 0)) {
    recommendations.push("Review recent git commits in the affected files");
  }

  recommendations.push("Create a minimal reproduction test case before attempting fixes");
  recommendations.push("Follow systematic-debugging skill 4-phase process");

  return recommendations;
}

export default traceRootCause;
