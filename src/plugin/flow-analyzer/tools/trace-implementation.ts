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

const NodeMappingSchema = z.object({
  nodeId: z.string(),
  path: z.string().optional(),
  line: z.number().int().positive().optional(),
  intendedPreconditions: z.array(z.string()).optional(),
  actualPreconditions: z.array(z.string()).optional(),
  postconditions: z.array(z.string()).optional(),
}).passthrough();

const EdgeMappingSchema = z.object({
  from: z.string(),
  to: z.string(),
  providedData: z.array(z.string()).optional(),
}).passthrough();

export const traceImplementation = tool(
  z.object({
    flow: FlowSchema,
    nodeMappings: z.array(NodeMappingSchema).optional(),
    edgeMappings: z.array(EdgeMappingSchema).optional(),
  }),
  async ({ flow, nodeMappings = [], edgeMappings = [] }) => {
    const mappedNodeIds = new Set(nodeMappings.map((mapping) => mapping.nodeId));
    const unresolvedNodes = flow.nodes
      .map((node) => node.id)
      .filter((nodeId) => !mappedNodeIds.has(nodeId));

    const tracedEdgeKeys = new Set(edgeMappings.map((edge) => `${edge.from}->${edge.to}`));
    const unresolvedEdges = flow.edges
      .map((edge) => `${edge.from}->${edge.to}`)
      .filter((key) => !tracedEdgeKeys.has(key));

    const nodeCoverage = flow.nodes.length === 0
      ? 1
      : nodeMappings.length / flow.nodes.length;

    const edgeCoverage = flow.edges.length === 0
      ? 1
      : edgeMappings.length / flow.edges.length;

    return {
      success: true,
      data: {
        flowId: flow.id,
        nodeMappings,
        edgeMappings,
        unresolvedNodes,
        unresolvedEdges,
        summary: {
          totalNodes: flow.nodes.length,
          tracedNodes: nodeMappings.length,
          totalEdges: flow.edges.length,
          tracedEdges: edgeMappings.length,
          nodeCoverage,
          edgeCoverage,
        },
      },
    };
  },
).describe("Trace flow nodes and edges to implementation evidence.");
