/**
 * Advanced Plugin Example
 * 
 * This demonstrates full plugin capabilities:
 * - Custom tools with Zod schemas
 * - Custom agents with scoped tools
 * - Multiple event hooks
 * - Tool interception (before/after)
 * - Configurable behavior
 * - Multi-file structure
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

// ============================================
// Custom Tools
// ============================================

/**
 * Tool: Analyze Code Complexity
 * 
 * Analyzes TypeScript/JavaScript code complexity
 */
export const analyzeComplexity = tool(
  z.object({
    code: z.string().describe('Code to analyze'),
    language: z.string().default('typescript').describe('Programming language')
  }),
  async ({ code, language }, context) => {
    console.log(`[Advanced Plugin] Analyzing ${language} code complexity...`);
    
    // Simple complexity analysis
    const lines = code.split('\n').length;
    const functions = (code.match(/function|=>|=>/g) || []).length;
    const complexity = Math.round((functions / lines) * 100);
    
    return {
      success: true,
      data: {
        language,
        lines,
        functions,
        complexity,
        rating: complexity < 5 ? 'Low' : complexity < 15 ? 'Medium' : 'High'
      }
    };
  }
).describe('Analyze code complexity and structure');

/**
 * Tool: Get Session Stats
 * 
 * Returns current session statistics
 */
export const getSessionStats = tool(
  z.object({}),
  async (_, context) => {
    console.log('[Advanced Plugin] Getting session stats...');
    
    // Access session info from context
    const sessionId = context.project.root;
    
    return {
      success: true,
      data: {
        sessionId,
        timestamp: new Date().toISOString(),
        pluginVersion: '1.0.0',
        capabilities: ['tools', 'agents', 'events', 'interception']
      }
    };
  }
).describe('Get current session statistics');

// ============================================
// Custom Agents
// ============================================

/**
 * Agent: Code Quality Assistant
 * 
 * Specialized agent for code quality analysis
 */
export const registerCodeQualityAgent = (config: any) => {
  return {
    ...config,
    agents: [
      {
        name: 'code-quality-assistant',
        description: 'A specialized agent for code quality analysis and improvement',
        instructions: `You are a Code Quality Assistant. Your role is to:
        
1. Analyze code for complexity, readability, and maintainability
2. Suggest improvements and refactoring opportunities
3. Identify potential bugs or security issues
4. Follow best practices for the given language
5. Be constructive and provide specific, actionable feedback

When analyzing code, consider:
- Naming conventions
- Code organization and structure
- Error handling
- Performance implications
- Documentation completeness`,
        model: 'claude-3-5-sonnet-latest',
        tools: ['analyze_complexity', 'get_session_stats', 'read', 'write']
      }
    ]
  };
};

// ============================================
// Plugin Export
// ============================================

export default async function advancedPlugin(context: any) {
  console.log('[Advanced Plugin] Initializing advanced plugin...');
  console.log('[Advanced Plugin] Project root:', context.project.root);
  
  return {
    // Register custom tools
    tool: [analyzeComplexity, getSessionStats],
    
    // Register custom agents
    config: async (currentConfig: any) => {
      console.log('[Advanced Plugin] Registering custom agents...');
      return registerCodeQualityAgent(currentConfig);
    },
    
    // Event hooks: Tool Interception
    'tool.execute.before': async ({ event }: any) => {
      const toolName = event.data?.toolName || 'unknown';
      console.log(`[Advanced Plugin] Tool execution started: ${toolName}`);
      
      // Example: Validate tool arguments before execution
      if (toolName === 'write' && event.data?.args?.filePath) {
        const filePath = event.data.args.filePath;
        console.log(`[Advanced Plugin] File write detected: ${filePath}`);
        
        // Could implement validation or logging here
        if (filePath.includes('dangerous')) {
          console.warn('[Advanced Plugin] WARNING: Potentially dangerous file path detected');
        }
      }
    },
    
    'tool.execute.after': async ({ event }: any) => {
      const toolName = event.data?.toolName || 'unknown';
      const success = event.data?.result?.success !== false;
      console.log(`[Advanced Plugin] Tool execution completed: ${toolName} (Success: ${success})`);
      
      // Example: Log tool usage statistics
      if (success) {
        // Track successful tool executions
      }
    },
    
    // Event hooks: Command Execution
    'command.executed': async ({ event }: any) => {
      const command = event.data?.command || 'unknown';
      console.log(`[Advanced Plugin] Command executed: ${command}`);
      
      // Example: Log all commands
      console.log(`[Advanced Plugin] Command log: ${new Date().toISOString()} - ${command}`);
    },
    
    // Event hooks: File Operations
    'file.edited': async ({ event }: any) => {
      const filePath = event.data?.filePath || 'unknown';
      console.log(`[Advanced Plugin] File edited: ${filePath}`);
    },
    
    // Event hooks: Session Lifecycle
    'session.created': async ({ event }: any) => {
      console.log('[Advanced Plugin] New session created');
      
      // Example: Initialize plugin state for new session
    },
    
    'session.idle': async ({ event }: any) => {
      console.log('[Advanced Plugin] Session idle');
      
      // Example: Cleanup resources when session ends
    }
  };
}

/**
 * Plugin Metadata
 * 
 * This would be in plugin.json if packaged
 */
export const pluginManifest = {
  name: 'advanced-plugin',
  version: '1.0.0',
  description: 'Advanced plugin demonstrating full OpenCode capabilities',
  author: {
    name: 'OpenCode Mastery Team'
  },
  capabilities: [
    'custom-tools',
    'custom-agents',
    'event-hooks',
    'tool-interception',
    'session-management'
  ]
};
