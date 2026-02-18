import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

/**
 * Manages debugging sessions with structured 4-phase process.
 * Tracks progress and enforces systematic debugging methodology.
 */
export const debugSession = tool(
  z.object({
    action: z.enum(["start", "phase", "hypothesis", "evidence", "conclusion", "status"])
      .describe("Action to perform on debug session"),
    sessionId: z.string().optional().describe("Session identifier (auto-generated if not provided)"),
    phase: z.enum(["investigation", "pattern-analysis", "hypothesis", "implementation"])
      .optional()
      .describe("Current debugging phase"),
    hypothesis: z.string().optional().describe("Current hypothesis being tested"),
    evidence: z.string().optional().describe("Evidence or observations"),
    conclusion: z.string().optional().describe("Conclusion or findings"),
  }),
  async (args) => {
    // In-memory session storage (would be persistent in production)
    const sessions = new Map<string, any>();

    switch (args.action) {
      case "start":
        const newSessionId = args.sessionId || `debug-${Date.now()}`;
        sessions.set(newSessionId, {
          id: newSessionId,
          startTime: new Date().toISOString(),
          currentPhase: "investigation",
          phases: {
            investigation: { completed: false, notes: [] },
            "pattern-analysis": { completed: false, notes: [] },
            hypothesis: { completed: false, tested: [], current: null },
            implementation: { completed: false, fixes: [] },
          },
          hypotheses: [],
          fixesAttempted: 0,
        });
        
        return {
          success: true,
          data: {
            sessionId: newSessionId,
            currentPhase: "investigation",
            message: "Debug session started",
          },
          metadata: {
            nextSteps: [
              "Phase 1: Root Cause Investigation",
              "Read error messages carefully",
              "Reproduce the issue consistently",
              "Check recent changes (git diff)",
              "Gather evidence from all components",
            ],
          },
        };

      case "phase":
        if (!args.sessionId || !sessions.has(args.sessionId)) {
          return {
            success: false,
            data: null,
            metadata: {
              error: "Session not found",
              recommendation: "Start a new session with action: 'start'",
            },
          };
        }

        const session = sessions.get(args.sessionId);
        
        if (args.phase) {
          // Validate phase transition
          const validTransitions: Record<string, string[]> = {
            investigation: ["pattern-analysis"],
            "pattern-analysis": ["hypothesis"],
            hypothesis: ["implementation", "pattern-analysis"], // Can go back
            implementation: ["hypothesis"], // If fix fails, go back
          };

          const valid = validTransitions[session.currentPhase]?.includes(args.phase);
          
          if (!valid) {
            return {
              success: false,
              data: { currentPhase: session.currentPhase, requestedPhase: args.phase },
              metadata: {
                error: `Invalid phase transition: ${session.currentPhase} → ${args.phase}`,
                recommendation: `Complete ${session.currentPhase} before moving to ${args.phase}`,
              },
            };
          }

          // Mark current phase complete
          session.phases[session.currentPhase].completed = true;
          session.currentPhase = args.phase;

          const phaseGuidance: Record<string, string[]> = {
            investigation: ["Read error messages", "Reproduce consistently", "Check git diff", "Gather evidence"],
            "pattern-analysis": ["Find working examples", "Compare with references", "Identify differences", "Understand dependencies"],
            hypothesis: ["Form single hypothesis", "Test minimally", "Verify before continuing"],
            implementation: ["Create failing test", "Implement single fix", "Verify fix works", "Stop after 3 failed attempts"],
          };

          return {
            success: true,
            data: {
              sessionId: args.sessionId,
              currentPhase: args.phase,
              completedPhases: Object.entries(session.phases)
                .filter(([_, v]) => v.completed)
                .map(([k]) => k),
            },
            metadata: {
              phaseGuidance: phaseGuidance[args.phase],
              warning: args.phase === "implementation" && session.fixesAttempted >= 2
                ? "⚠️  You have attempted 2+ fixes. If this fails, STOP and question architecture."
                : undefined,
            },
          };
        }
        break;

      case "hypothesis":
        if (!args.sessionId || !args.hypothesis) {
          return {
            success: false,
            data: null,
            metadata: { error: "Session ID and hypothesis required" },
          };
        }

        const hypSession = sessions.get(args.sessionId);
        hypSession.hypotheses.push({
          text: args.hypothesis,
          timestamp: new Date().toISOString(),
          tested: false,
          result: null,
        });
        hypSession.phases.hypothesis.current = args.hypothesis;

        return {
          success: true,
          data: {
            sessionId: args.sessionId,
            hypothesisCount: hypSession.hypotheses.length,
            current: args.hypothesis,
          },
          metadata: {
            message: "Hypothesis recorded",
            instruction: "Test this hypothesis MINIMALLY before proposing fixes",
          },
        };

      case "status":
        if (!args.sessionId) {
          // Return all sessions summary
          const allSessions = Array.from(sessions.values());
          return {
            success: true,
            data: {
              totalSessions: allSessions.length,
              activeSessions: allSessions.filter((s: any) => !s.phases.implementation.completed).length,
            },
            metadata: {
              message: "Use sessionId to get detailed status of a specific session",
            },
          };
        }

        const statusSession = sessions.get(args.sessionId);
        if (!statusSession) {
          return {
            success: false,
            data: null,
            metadata: { error: "Session not found" },
          };
        }

        return {
          success: true,
          data: statusSession,
          metadata: {
            phaseProgress: `${Object.values(statusSession.phases).filter((p: any) => p.completed).length}/4 phases complete`,
          },
        };

      default:
        return {
          success: false,
          data: null,
          metadata: { error: `Unknown action: ${args.action}` },
        };
    }
  }
).describe("Manage systematic debugging sessions with structured 4-phase process");

export default debugSession;
