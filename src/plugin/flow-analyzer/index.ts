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
  "extract-flows",
  "build-flow-graph",
  "trace-implementation",
  "detect-flow-gaps",
  "score-flow-confidence",
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
      const mergedAgents = [...existingAgents];

      for (const additionalAgent of additionalAgents) {
        const existingIndex = mergedAgents.findIndex(
          (agent: any) => agent?.name === additionalAgent.name
        );

        if (existingIndex === -1) {
          mergedAgents.push(additionalAgent);
          continue;
        }

        mergedAgents[existingIndex] = {
          ...mergedAgents[existingIndex],
          ...additionalAgent,
        };
      }

      return {
        ...currentConfig,
        agents: mergedAgents,
      };
    },
  };
};

export default Plugin;
