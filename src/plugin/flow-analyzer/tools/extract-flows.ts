import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import type { FlowDefinition, FlowEdge, FlowNode } from "../types";

const TRANSITION_PATTERN = /->|=>|->>|→/;

function slugify(value: string): string {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function inferNodeKind(label: string): FlowNode["kind"] {
  const normalized = label.toLowerCase();

  if (normalized.startsWith("/")) return "route";
  if (normalized.includes("api") || normalized.includes("post ") || normalized.includes("get ")) {
    return "api";
  }
  if (normalized.includes("if ") || normalized.includes("condition") || normalized.includes("has ")) {
    return "condition";
  }
  if (normalized.includes("state") || normalized.includes("session")) {
    return "state";
  }

  return "action";
}

function nodeId(label: string, index: number): string {
  const base = slugify(label);
  return base ? `${base}-${index}` : `step-${index}`;
}

function dedupeNodes(nodes: FlowNode[]): FlowNode[] {
  const seen = new Set<string>();
  const unique: FlowNode[] = [];

  nodes.forEach((node) => {
    if (seen.has(node.id)) return;
    seen.add(node.id);
    unique.push(node);
  });

  return unique;
}

function normalizeFlowName(flowName?: string): string {
  const name = (flowName || "Detected Flow").trim();
  return name || "Detected Flow";
}

export const extractFlows = tool(
  z.object({
    source: z.string().min(1),
    flowName: z.string().optional(),
    entryPoints: z.array(z.string()).optional(),
    exits: z.array(z.string()).optional(),
  }),
  async ({ source, flowName, entryPoints, exits }) => {
    const lines = source
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean)
      .filter((line) => !line.startsWith("#") && !line.startsWith("```"));

    const nodes: FlowNode[] = [];
    const edges: FlowEdge[] = [];

    let stepIndex = 1;

    lines.forEach((line) => {
      const parts = line.split(TRANSITION_PATTERN).map((part) => part.trim()).filter(Boolean);
      if (parts.length < 2) return;

      const sequenceNodes = parts.map((part) => {
        const node: FlowNode = {
          id: nodeId(part, stepIndex),
          kind: inferNodeKind(part),
          label: part,
        };
        stepIndex += 1;
        return node;
      });

      nodes.push(...sequenceNodes);

      for (let i = 0; i < sequenceNodes.length - 1; i += 1) {
        edges.push({
          from: sequenceNodes[i].id,
          to: sequenceNodes[i + 1].id,
        });
      }
    });

    const uniqueNodes = dedupeNodes(nodes);
    const outgoing = new Set(edges.map((edge) => edge.from));

    const normalizedName = normalizeFlowName(flowName);
    const flow: FlowDefinition = {
      id: slugify(normalizedName) || "detected-flow",
      name: normalizedName,
      entryPoints: entryPoints && entryPoints.length > 0 ? entryPoints : uniqueNodes.slice(0, 1).map((node) => node.id),
      exits: exits && exits.length > 0
        ? exits
        : uniqueNodes.filter((node) => !outgoing.has(node.id)).map((node) => node.id),
      nodes: uniqueNodes,
      edges,
    };

    return {
      success: true,
      data: {
        flows: [flow],
      },
      metadata: {
        flowCount: 1,
        nodeCount: uniqueNodes.length,
        edgeCount: edges.length,
      },
    };
  },
).describe("Extract intended flow definitions from plain text or plan snippets.");
