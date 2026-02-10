/**
 * Minimal Plugin Example
 *
 * This is the simplest possible OpenCode plugin.
 * It demonstrates the basic plugin structure and one event hook.
 *
 * What this plugin does:
 * - Logs every command that gets executed in OpenCode
 * - Demonstrates the plugin registration pattern
 * - Shows basic event handling
 *
 * Learning Objectives:
 * ✅ Understand plugin basic structure (export async function)
 * ✅ See how to subscribe to events
 * ✅ Learn about the context object and its properties
 *
 * Usage:
 * 1. Place this file in: .opencode/plugin/minimal-plugin/index.ts
 * 2. Build: bun build index.ts --outdir dist
 * 3. Start OpenCode - plugin auto-loads
 *
 * To build locally:
 * bun build src/skill/opencode-mastery/examples/plugins/minimal-plugin/index.ts \
 *   --outdir src/skill/opencode-mastery/examples/plugins/minimal-plugin/dist
 */

/**
 * Main plugin function
 *
 * @param context - OpenCode context object containing:
 *   - project: Project information (root, paths, etc.)
 *   - client: OpenCode SDK (session, tui, etc.)
 *   - $: Bun shell API for running commands
 *   - directory: Plugin location
 *   - worktree: Git worktree path
 *
 * @returns Plugin configuration with event handlers
 */
export const MinimalPlugin = async (context) => {
  // Extract useful context properties for logging
  const projectName = context.project.paths?.[0]?.split('/')?.pop() || 'unknown';

  console.log(`🔌 Minimal Plugin loaded for project: ${projectName}`);

  /**
   * Return plugin configuration
   *
   * Plugins can subscribe to 25+ events across the OpenCode lifecycle.
   * This example shows the simplest: logging command executions.
   */
  return {
    /**
     * Subscribe to command.executed event
     *
     * This event fires whenever a command is executed in OpenCode
     * - By the user (slash commands)
     * - By the AI (tool calls)
     * - By other plugins
     *
     * Event data contains:
     *   - command: The command string that was executed
     *   - timestamp: When it was executed
     *   - source: Who executed it (user, ai, plugin)
     */
    'command.executed': async ({ event }) => {
      console.log('📝 Command executed:', event.data.command);
      console.log('   Timestamp:', new Date(event.data.timestamp).toISOString());
      console.log('   Source:', event.data.source || 'unknown');

      // You could log to a file, send to an API, etc.
      // For this minimal example, we just console.log
    },
  };
};

/**
 * Default export (required for plugin discovery)
 *
 * OpenCode looks for a default export from plugin files.
 * This makes the plugin discoverable without configuration.
 */
export default MinimalPlugin;
