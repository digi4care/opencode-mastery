import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import type { FlowGap, GapSeverity, GapType } from "../types";

const FlowNodeSchema = z.object({
  id: z.string(),
  kind: z.enum(["route", "api", "state", "action", "condition"]),
  label: z.string(),
  sourceRef: z.object({
    path: z.string(),
    line: z.number().int().positive().optional(),
  }).optional(),
}).passthrough();

const FlowEdgeSchema = z.object({
  from: z.string(),
  to: z.string(),
  condition: z.string().optional(),
  dataRequired: z.array(z.string()).optional(),
}).passthrough();

const FlowSchema = z.object({
  id: z.string(),
  name: z.string(),
  entryPoints: z.array(z.string()),
  exits: z.array(z.string()),
  nodes: z.array(FlowNodeSchema),
  edges: z.array(FlowEdgeSchema),
});

const NodeTraceSchema = z.object({
  nodeId: z.string(),
  path: z.string().optional(),
  line: z.number().int().positive().optional(),
  intendedPreconditions: z.array(z.string()).optional(),
  actualPreconditions: z.array(z.string()).optional(),
  postconditions: z.array(z.string()).optional(),
}).passthrough();

const EdgeTraceSchema = z.object({
  from: z.string(),
  to: z.string(),
  providedData: z.array(z.string()).optional(),
}).passthrough();

const TraceSchema = z.object({
  flowId: z.string(),
  nodeMappings: z.array(NodeTraceSchema).default([]),
  edgeMappings: z.array(EdgeTraceSchema).default([]),
  unresolvedNodes: z.array(z.string()).default([]),
}).passthrough();

const GapTypeSchema = z.enum([
  "MISSING_BRANCH",
  "WRONG_PRECONDITION",
  "DEAD_END",
  "MISSING_DATA_FLOW",
  "UNREACHABLE_CODE",
]);

const DEFAULT_GAP_TYPES: GapType[] = [
  "MISSING_BRANCH",
  "WRONG_PRECONDITION",
];

function severityFor(type: GapType): GapSeverity {
  if (type === "WRONG_PRECONDITION" || type === "DEAD_END") return "critical";
  if (type === "MISSING_DATA_FLOW" || type === "UNREACHABLE_CODE") return "high";
  return "medium";
}

function createGap(input: {
  id: string;
  type: GapType;
  flowId: string;
  expected: string;
  actual: string;
  impact: string;
  fixHint: string;
  location?: { path: string; line?: number };
}): FlowGap {
  return {
    id: input.id,
    type: input.type,
    flowId: input.flowId,
    severity: severityFor(input.type),
    location: input.location,
    expected: input.expected,
    actual: input.actual,
    impact: input.impact,
    fixHint: input.fixHint,
  };
}

function includesToken(items: string[], token: string): boolean {
  return items.map((item) => item.toLowerCase()).includes(token.toLowerCase());
}

export const detectFlowGaps = tool(
  z.object({
    flow: FlowSchema,
    trace: TraceSchema.optional(),
    enabledGapTypes: z.array(GapTypeSchema).optional(),
  }),
  async ({ flow, trace, enabledGapTypes }) => {
    const gaps: FlowGap[] = [];
    const activeGapTypes = enabledGapTypes && enabledGapTypes.length > 0
      ? enabledGapTypes
      : DEFAULT_GAP_TYPES;

    const outgoing = new Map<string, { to: string; condition?: string; dataRequired?: string[] }[]>();
    flow.nodes.forEach((node) => {
      outgoing.set(node.id, []);
    });
    flow.edges.forEach((edge) => {
      outgoing.set(edge.from, [...(outgoing.get(edge.from) || []), edge]);
    });

    if (activeGapTypes.includes("MISSING_BRANCH")) {
      flow.nodes
        .filter((node) => node.kind === "condition")
        .forEach((node) => {
          const branches = outgoing.get(node.id) || [];
          if (branches.length >= 2) return;

          gaps.push(createGap({
            id: `gap-${gaps.length + 1}`,
            type: "MISSING_BRANCH",
            flowId: flow.id,
            location: node.sourceRef,
            expected: "Condition nodes should handle at least two branches.",
            actual: `Condition has ${branches.length} implemented branch(es).`,
            impact: "One user path is unhandled, causing incomplete flow behavior.",
            fixHint: "Implement both true/false (or equivalent) branches for this condition.",
          }));
        });
    }

    if (activeGapTypes.includes("WRONG_PRECONDITION") && trace) {
      trace.nodeMappings.forEach((mapping) => {
        const intended = mapping.intendedPreconditions || [];
        const actual = mapping.actualPreconditions || [];

        const anonymousExpected = includesToken(intended, "anonymous_allowed");
        const authRequired = includesToken(actual, "auth_required");
        const authExpected = includesToken(intended, "auth_required");
        const anonymousOnly = includesToken(actual, "anonymous_only");

        const mismatch = (anonymousExpected && authRequired) || (authExpected && anonymousOnly);
        if (!mismatch) return;

        gaps.push(createGap({
          id: `gap-${gaps.length + 1}`,
          type: "WRONG_PRECONDITION",
          flowId: flow.id,
          location: mapping.path ? { path: mapping.path, line: mapping.line } : undefined,
          expected: `Intended preconditions: ${intended.join(", ") || "none provided"}`,
          actual: `Actual preconditions: ${actual.join(", ") || "none provided"}`,
          impact: "Users are blocked from the intended path or routed incorrectly.",
          fixHint: "Align implementation preconditions with intended access rules.",
        }));
      });
    }

    if (activeGapTypes.includes("DEAD_END")) {
      flow.nodes.forEach((node) => {
        const exits = flow.exits.includes(node.id);
        const outDegree = (outgoing.get(node.id) || []).length;
        if (exits || outDegree > 0) return;

        gaps.push(createGap({
          id: `gap-${gaps.length + 1}`,
          type: "DEAD_END",
          flowId: flow.id,
          location: node.sourceRef,
          expected: "Flow paths should end in an explicit exit or continue to the next step.",
          actual: `Node '${node.label}' terminates unexpectedly.`,
          impact: "User flow may stop without feedback or completion.",
          fixHint: "Add redirect, state finalization, or explicit terminal handling.",
        }));
      });
    }

    if (activeGapTypes.includes("MISSING_DATA_FLOW") && trace) {
      flow.edges.forEach((edge) => {
        const required = edge.dataRequired || [];
        if (required.length === 0) return;

        const mapping = trace.edgeMappings.find((item) => item.from === edge.from && item.to === edge.to);
        const provided = new Set((mapping?.providedData || []).map((value) => value.toLowerCase()));
        const missing = required.filter((item) => !provided.has(item.toLowerCase()));
        if (missing.length === 0) return;

        gaps.push(createGap({
          id: `gap-${gaps.length + 1}`,
          type: "MISSING_DATA_FLOW",
          flowId: flow.id,
          expected: `Required data: ${required.join(", ")}`,
          actual: `Missing data: ${missing.join(", ")}`,
          impact: "Downstream step cannot execute reliably.",
          fixHint: "Pass required fields on this transition or adjust consumer expectations.",
        }));
      });
    }

    if (activeGapTypes.includes("UNREACHABLE_CODE")) {
      const visited = new Set<string>();
      const queue = [...flow.entryPoints];

      while (queue.length > 0) {
        const current = queue.shift();
        if (!current || visited.has(current)) continue;
        visited.add(current);

        const neighbors = outgoing.get(current) || [];
        neighbors.forEach((edge) => {
          if (!visited.has(edge.to)) queue.push(edge.to);
        });
      }

      flow.nodes
        .filter((node) => !visited.has(node.id))
        .forEach((node) => {
          gaps.push(createGap({
            id: `gap-${gaps.length + 1}`,
            type: "UNREACHABLE_CODE",
            flowId: flow.id,
            location: node.sourceRef,
            expected: "Node should be reachable from at least one entry point.",
            actual: `Node '${node.label}' is unreachable from declared entry points.`,
            impact: "Code path is never executed in intended flow.",
            fixHint: "Add missing edge(s) or remove obsolete node logic.",
          }));
        });
    }

    return {
      success: true,
      data: {
        flowId: flow.id,
        gaps,
      },
      metadata: {
        totalGaps: gaps.length,
        enabledGapTypes: activeGapTypes,
      },
    };
  },
).describe("Detect flow gaps between intended definitions and traced implementation.");
