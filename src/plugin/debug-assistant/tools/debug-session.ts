/**
 * Debug Session
 * 
 * Tracks and manages a systematic debugging session.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { getFeatureConfig } from "../../../lib/config";

interface DebugPhase {
  name: string;
  description: string;
  completed: boolean;
  findings: string[];
}

const PHASES: DebugPhase[] = [
  { name: "investigation", description: "Root cause investigation", completed: false, findings: [] },
  { name: "pattern", description: "Pattern analysis", completed: false, findings: [] },
  { name: "hypothesis", description: "Hypothesis testing", completed: false, findings: [] },
  { name: "implementation", description: "Implementation", completed: false, findings: [] },
];

let currentSession: {
  id: string;
  startTime: Date;
  phases: DebugPhase[];
  currentPhase: number;
  fixAttempts: number;
} | null = null;

export const debugSession = tool(
  z.object({
    action: z.enum(["start", "phase", "finding", "fix", "status", "end"]).describe("Action to perform"),
    phase: z.number().optional().describe("Phase number (1-4)"),
    finding: z.string().optional().describe("Finding to record"),
    success: z.boolean().optional().describe("Whether fix was successful"),
  }),
  async (args) => {
    const debugConfig = getFeatureConfig("debugging");
    
    switch (args.action) {
      case "start":
        currentSession = {
          id: `debug-${Date.now()}`,
          startTime: new Date(),
          phases: PHASES.map(p => ({ ...p, findings: [] })),
          currentPhase: 0,
          fixAttempts: 0,
        };
        return {
          success: true,
          data: {
            session: currentSession,
            message: "Debug session started. Begin with Phase 1: Root Cause Investigation.",
          },
          metadata: { config: debugConfig },
        };
        
      case "phase":
        if (!currentSession) {
          return { success: false, data: { error: "No active debug session" }, metadata: {} };
        }
        if (args.phase && args.phase >= 1 && args.phase <= 4) {
          currentSession.currentPhase = args.phase - 1;
          currentSession.phases[args.phase - 1].completed = true;
        }
        return {
          success: true,
          data: {
            session: currentSession,
            currentPhase: PHASES[currentSession.currentPhase],
          },
          metadata: {},
        };
        
      case "finding":
        if (!currentSession || !args.finding) {
          return { success: false, data: { error: "No session or finding provided" }, metadata: {} };
        }
        currentSession.phases[currentSession.currentPhase].findings.push(args.finding);
        return {
          success: true,
          data: { session: currentSession },
          metadata: {},
        };
        
      case "fix":
        if (!currentSession) {
          return { success: false, data: { error: "No active debug session" }, metadata: {} };
        }
        currentSession.fixAttempts++;
        
        if (args.success) {
          return {
            success: true,
            data: {
              session: currentSession,
              message: "Fix successful! Debug session can be ended.",
            },
            metadata: {},
          };
        }
        
        if (currentSession.fixAttempts >= debugConfig.max_fix_attempts) {
          return {
            success: false,
            data: {
              session: currentSession,
              warning: `Max fix attempts (${debugConfig.max_fix_attempts}) reached. Consider questioning the architecture.`,
            },
            metadata: {},
          };
        }
        
        return {
          success: false,
          data: {
            session: currentSession,
            message: `Fix attempt ${currentSession.fixAttempts} failed. Try another hypothesis.`,
          },
          metadata: {},
        };
        
      case "status":
        if (!currentSession) {
          return { success: true, data: { active: false, message: "No active debug session" }, metadata: {} };
        }
        return {
          success: true,
          data: {
            active: true,
            session: currentSession,
            duration: Date.now() - currentSession.startTime.getTime(),
          },
          metadata: {},
        };
        
      case "end":
        const summary = currentSession;
        currentSession = null;
        return {
          success: true,
          data: {
            message: "Debug session ended.",
            summary,
          },
          metadata: {},
        };
    }
  }
).describe("Manage a systematic 4-phase debugging session with tracking.");
