import type { PluginContext } from "@opencode-ai/plugin";
import { getFeatureConfig, isFeatureEnabled } from "../../lib/config";
import { buildFlowGraph } from "./tools/build-flow-graph";
import { detectFlowGaps } from "./tools/detect-flow-gaps";
import { extractFlows } from "./tools/extract-flows";
import { scoreFlowConfidence } from "./tools/score-flow-confidence";
import { traceImplementation } from "./tools/trace-implementation";

const SCOPED_TOOLS = [
  "read",
  "glob",
  "grep",
  "extract_flows",
  "build_flow_graph",
  "trace_implementation",
  "detect_flow_gaps",
  "score_flow_confidence",
];

function buildAgentInstructions(target: "generic" | "gsd"): string {
  if (target === "gsd") {
    return [
      "Analyze GSD phases for flow completeness.",
      "Load PLAN and SUMMARY artifacts first.",
      "Use flow analyzer tools to extract flows, trace implementation, detect gaps, and score confidence.",
      "Prioritize WRONG_PRECONDITION and DEAD_END as critical.",
      "Return both a concise summary and actionable fix hints.",
    ].join(" ");
  }

  return [
    "Analyze software flows for completeness in a framework-agnostic way.",
    "Extract flow definitions from specs or plans.",
    "Trace implementation evidence before reporting gaps.",
    "Report expected vs actual behavior with impact and fix hints.",
  ].join(" ");
}

export const Plugin = async (_context: PluginContext) => {
  if (!isFeatureEnabled("flowAnalyzer")) {
    return { tool: [] };
  }

  const flowConfig = getFeatureConfig("flowAnalyzer");

  return {
    tool: {
      "extract-flows": extractFlows,
      "build-flow-graph": buildFlowGraph,
      "trace-implementation": traceImplementation,
      "detect-flow-gaps": detectFlowGaps,
      "score-flow-confidence": scoreFlowConfidence,
    },

    config: async (currentConfig: any) => {
      if (!flowConfig.register_agents) {
        return currentConfig;
      }

      const toolScope = flowConfig.agent_tool_mode === "all" ? ["*"] : SCOPED_TOOLS;

      const additionalAgents = [
        {
          name: "flow-analyzer",
          description: "Framework-agnostic flow completeness analyzer",
          instructions: buildAgentInstructions("generic"),
          tools: toolScope,
        },
        {
          name: "gsd-flow-analyzer",
          description: "GSD-specific flow analyzer for phase plans and implementation",
          instructions: buildAgentInstructions("gsd"),
          tools: toolScope,
        },
      ];

      const existingAgents = currentConfig?.agents || [];
      const existingNames = new Set(existingAgents.map((agent: any) => agent?.name));
      const mergedAgents = [
        ...existingAgents,
        ...additionalAgents.filter((agent) => !existingNames.has(agent.name)),
      ];

      return {
        ...currentConfig,
        agents: mergedAgents,
      };
    },
  };
};

export default Plugin;
