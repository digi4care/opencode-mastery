/**
 * Intermediate Plugin Example
 *
 * This plugin demonstrates custom tools and custom agents.
 * It shows how to build typesafe tools and specialized AI agents.
 *
 * What this plugin does:
 * - Defines a custom tool: "greet-user" with Zod schema validation
 * - Registers a custom agent: "Greeter Agent" with scoped tools
 * - Intercepts tool executions for logging
 *
 * Learning Objectives:
 * ✅ Define custom tools with Zod schemas
 * ✅ Register custom agents with model selection
 * ✅ Implement tool interception (before/after)
 * ✅ Use shell ($) API from context
 *
 * Usage:
 * 1. Place this file in: .opencode/plugin/intermediate-plugin/index.ts
 * 2. Build: bun build index.ts --outdir dist
 * 3. Start OpenCode - plugin auto-loads
 * 4. Ask: "Use the Greeter Agent to say hello to John"
 *
 * To build locally:
 * bun build src/skill/opencode-mastery/examples/plugins/intermediate-plugin/index.ts \
 *   --outdir src/skill/opencode-mastery/examples/plugins/intermediate-plugin/dist
 */

import { z } from 'zod';
import { tool } from '@opencode-ai/plugin';

/**
 * Custom Tool: Greet User
 *
 * This tool demonstrates:
 * - Zod schema for input validation
 * - Type-safe tool implementation
 * - Shell API usage from context
 *
 * @param args - Validated tool arguments (name, enthusiastic)
 * @param context - OpenCode context object
 * @returns Tool result with message
 */
export const greetUser = tool(
  /**
   * Zod schema for input validation
   *
   * This ensures tool arguments are always valid.
   * OpenCode will validate inputs before calling this function.
   */
  z.object({
    name: z.string().min(1, 'Name is required'),
    enthusiastic: z.boolean().default(false).describe('Make greeting enthusiastic?'),
  }),

  /**
   * Tool implementation function
   *
   * @param args - Validated arguments (guaranteed to match schema)
   * @param context - OpenCode context
   *   - $: Bun shell API (can run any command)
   *   - project: Project information
   *   - client: SDK for session/UI
   */
  async (args, context) => {
    const { name, enthusiastic } = args;

    // Use shell API to get current time (demonstrates $ usage)
    const timestamp = await context.$`date -u +%Y-%m-%d %H:%M:%S`.text();

    // Build greeting based on enthusiastic flag
    const greeting = enthusiastic
      ? `🎉 HELLO, ${name.toUpperCase()}! 🎉`
      : `Hello, ${name}!`;

    // Return tool result
    return {
      success: true,
      message: greeting,
      timestamp: timestamp.trim(),
    };
  },

).describe('Greet a user by name');

/**
 * Tool Interceptor
 *
 * Logs all tool executions before and after.
 * This demonstrates the interception pattern.
 *
 * You can:
 * - Block tool execution (throw error in before handler)
 * - Modify tool arguments (change event.data.args)
 * - Log/track all tool usage
 * - Add side effects (metrics, analytics, etc.)
 */
const logToolExecution = {
  // Called BEFORE tool executes
  'tool.execute.before': async ({ event }) => {
    const { toolName, args } = event.data;
    console.log(`🔧 Tool "${toolName}" starting...`);
    console.log('   Arguments:', JSON.stringify(args, null, 2));
  },

  // Called AFTER tool completes
  'tool.execute.after': async ({ event }) => {
    const { toolName, result } = event.data;
    console.log(`✅ Tool "${toolName}" completed`);
    console.log('   Result:', JSON.stringify(result, null, 2));
  },
};

/**
 * Custom Agent Registration
 *
 * This function registers a custom agent with OpenCode.
 *
 * Agent features:
 * - Custom name and description
 * - System instructions (personality, rules)
 * - Model selection (can differ from default)
 * - Scoped tools (only can access specific tools)
 *
 * @param currentConfig - Current OpenCode configuration
 * @returns New configuration with custom agent added
 */
const registerCustomAgent = (currentConfig) => {
  return {
    ...currentConfig,
    agents: [
      ...(currentConfig.agents || []), // Keep existing agents
      {
        name: 'Greeter Agent',
        description: 'A friendly agent that specializes in greetings',
        instructions: `
          You are the Greeter Agent. Your specialty is warm, friendly greetings.

          Rules:
          1. Always use the greet-user tool for greetings
          2. Be polite and enthusiastic
          3. Ask follow-up questions about the user's day
          4. Keep responses brief and welcoming

          When someone says hello or asks you to greet someone:
          - Use the greet-user tool
          - Ask how they're doing
          - Offer to help further
        `,
        model: 'claude-3-5-sonnet-latest',
        tools: ['greet-user', 'read', 'write'], // Scoped toolset
      },
    ],
  };
};

/**
 * Main plugin function
 *
 * @param context - OpenCode context object
 * @returns Plugin configuration with tools, agents, config, and hooks
 */
export const IntermediatePlugin = async (context) => {
  console.log('🔌 Intermediate Plugin loaded');
  console.log('   Features: custom tools, custom agents, tool interception');

  return {
    /**
     * Register custom tools
     *
     * Tools become available to all agents in OpenCode.
     * They show up in the AI's tool list.
     */
    tool: [greetUser],

    /**
     * Register configuration hook
     *
     * This runs when OpenCode loads configuration.
     * We use it to register our custom agent.
     */
    config: async (currentConfig) => {
      return registerCustomAgent(currentConfig);
    },

    /**
     * Register event hooks
     *
     * This adds tool execution logging.
     */
    ...logToolExecution,
  };
};

/**
 * Default export (required for plugin discovery)
 */
export default IntermediatePlugin;
