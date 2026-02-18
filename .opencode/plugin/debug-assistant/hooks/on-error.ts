import type { PluginContext, ToolExecuteEvent } from "@opencode-ai/plugin";
import { debugSession } from "../tools/debug-session";
import { traceRootCause } from "../tools/trace-root-cause";

/**
 * Hook that automatically starts debug protocol when errors occur.
 * Enforces systematic debugging methodology.
 */
export const onErrorHook = async (context: PluginContext) => {
  return {
    "tool.execute.error": async ({ event }: { event: ToolExecuteEvent }) => {
      const { toolName, error, args } = event.data;
      
      // Check if this is a test or build error
      const isTestError = toolName === "Bash" && (
        args?.command?.includes("test") ||
        args?.command?.includes("build")
      );
      
      const isDirectError = error && (
        error.includes("Error:") ||
        error.includes("Exception:") ||
        error.includes("Failed")
      );

      if (!isTestError && !isDirectError) {
        return;
      }

      console.log(`
⚠️  ERROR DETECTED - Starting Systematic Debugging Protocol

Error: ${error?.substring(0, 200)}...

The systematic-debugging skill will now guide you through:
1. Root Cause Investigation
2. Pattern Analysis  
3. Hypothesis Testing
4. Implementation

Starting debug session...
      `);

      // Start a debug session
      const sessionResult = await debugSession({
        action: "start",
      });

      if (sessionResult.success) {
        console.log(`
✅ Debug session started: ${sessionResult.data.sessionId}

Current Phase: ${sessionResult.data.currentPhase}

Next Steps:
${sessionResult.metadata.nextSteps?.map((step: string) => `  • ${step}`).join("\n")}

Use /tool debug-session to track progress.
        `);

        // If we have a stack trace, automatically analyze it
        if (error && error.includes("at ")) {
          console.log("🔍 Auto-analyzing stack trace...");
          
          const traceResult = await traceRootCause({
            errorMessage: error,
            stackTrace: error,
            analyzeGitHistory: true,
          });

          if (traceResult.success && traceResult.data?.rootCause) {
            console.log(`
📍 ROOT CAUSE ANALYSIS

File: ${traceResult.data.rootCause.file}
Line: ${traceResult.data.rootCause.line}
Confidence: ${traceResult.data.rootCause.confidence}

Reasoning:
${traceResult.data.rootCause.reasoning}

Recommendations:
${traceResult.data.recommendations?.map((r: string) => `  • ${r}`).join("\n")}
            `);
          }
        }
      }
    },
  };
};

export default onErrorHook;
