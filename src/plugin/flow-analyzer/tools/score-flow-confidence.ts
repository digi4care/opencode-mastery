import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

const FlowSchema = z.object({
  id: z.string(),
  nodes: z.array(z.object({ id: z.string() }).passthrough()),
  edges: z.array(z.object({ from: z.string(), to: z.string() }).passthrough()),
}).passthrough();

const GapSchema = z.object({
  id: z.string(),
  severity: z.enum(["critical", "high", "medium", "low"]),
}).passthrough();

const TraceSchema = z.object({
  nodeMappings: z.array(z.object({ nodeId: z.string() }).passthrough()).default([]),
}).passthrough();

const PENALTY: Record<string, number> = {
  critical: 40,
  high: 20,
  medium: 10,
  low: 5,
};

function toGrade(score: number): string {
  if (score >= 90) return "A";
  if (score >= 80) return "B";
  if (score >= 70) return "C";
  if (score >= 60) return "D";
  return "F";
}

export const scoreFlowConfidence = tool(
  z.object({
    flow: FlowSchema,
    gaps: z.array(GapSchema).default([]),
    trace: TraceSchema.optional(),
  }),
  async ({ flow, gaps, trace }) => {
    const penalty = gaps.reduce((acc, gap) => acc + (PENALTY[gap.severity] || 0), 0);
    const baseScore = Math.max(0, 100 - penalty);

    const tracedNodes = trace?.nodeMappings.length || 0;
    const nodeCoverage = flow.nodes.length === 0 ? 1 : tracedNodes / flow.nodes.length;
    const coverageScore = Math.round(nodeCoverage * 100);

    const finalScore = Math.round(baseScore * 0.7 + coverageScore * 0.3);

    return {
      success: true,
      data: {
        flowId: flow.id,
        score: finalScore,
        grade: toGrade(finalScore),
        detail: {
          baseScore,
          coverageScore,
          penalty,
          totalGaps: gaps.length,
          nodeCoverage,
        },
      },
    };
  },
).describe("Score confidence for flow completeness using gaps and coverage.");
