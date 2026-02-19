import type { PluginContext } from "@opencode-ai/plugin";
import * as fs from "fs";
import * as path from "path";

const CONFIG_FILE = "opencode-mastery.json";

function loadMasteryConfig(): any {
  const homeDir = process.env.HOME || process.env.USERPROFILE || "";
  const configPath = path.join(homeDir, ".config", "opencode", CONFIG_FILE);

  try {
    if (fs.existsSync(configPath)) {
      const content = fs.readFileSync(configPath, "utf-8");
      return JSON.parse(content);
    }
  } catch (error) {
    // Silently fail - config is optional
  }

  return {};
}

export const Plugin = async (_context: PluginContext) => {
  const masteryConfig = loadMasteryConfig();

  // Build config updates from opencode-mastery.json
  const configUpdates: any = {
    agents: {},
  };

  // Register agents from config
  if (masteryConfig.agents) {
    for (const [agentName, agentConfig] of Object.entries(masteryConfig.agents)) {
      // If no model specified, let OpenCode use its default
      const config = agentConfig as any;
      if (config.model) {
        (configUpdates.agents as any)[agentName] = config;
      } else {
        // No model defined - leave empty so OpenCode uses default
        (configUpdates.agents as any)[agentName] = {};
      }
    }
  }

  return {
    tool: [],

    config: async (currentConfig: any) => {
      const existingAgents = currentConfig?.agents || {};
      const mergedAgents = { ...existingAgents, ...configUpdates.agents };

      return {
        ...currentConfig,
        agents: mergedAgents,
      };
    },
  };
};

export default Plugin;
