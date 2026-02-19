import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

const FlowNodeSchema = z.object({
  id: z.string(),
  kind: z.enum(["route", "api", "state", "action", "condition"]),
  label: z.string(),
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

export const buildFlowGraph = tool(
  z.object({
    flow: FlowSchema,
  }),
  async ({ flow }) => {
    const outgoing = new Map<string, string[]>();
    const incoming = new Map<string, string[]>();

    flow.nodes.forEach((node) => {
      outgoing.set(node.id, []);
      incoming.set(node.id, []);
    });

    flow.edges.forEach((edge) => {
      outgoing.set(edge.from, [...(outgoing.get(edge.from) || []), edge.to]);
      incoming.set(edge.to, [...(incoming.get(edge.to) || []), edge.from]);
    });

    const conditionNodes = flow.nodes
      .filter((node) => node.kind === "condition")
      .map((node) => ({
        id: node.id,
        label: node.label,
        branchCount: (outgoing.get(node.id) || []).length,
      }));

    const terminalNodes = flow.nodes
      .filter((node) => (outgoing.get(node.id) || []).length === 0)
      .map((node) => node.id);

    const orphanNodes = flow.nodes
      .filter((node) => {
        const inDegree = (incoming.get(node.id) || []).length;
        const isEntry = flow.entryPoints.includes(node.id);
        return inDegree === 0 && !isEntry;
      })
      .map((node) => node.id);

    return {
      success: true,
      data: {
        flowId: flow.id,
        nodeCount: flow.nodes.length,
        edgeCount: flow.edges.length,
        entryPoints: flow.entryPoints,
        exits: flow.exits,
        conditionNodes,
        terminalNodes,
        orphanNodes,
        adjacency: Object.fromEntries(outgoing),
      },
    };
  },
).describe("Build graph metadata from a structured flow definition.");
