/**
 * OpenCode Memory Plugin
 * 
 * Main entry point for the memory plugin
 * Combines tools and hooks following oh-my-opencode patterns
 * 
 * Usage in oh-my-opencode:
 * 
 * import { createMemoryPlugin } from "./memory-plugin"
 * 
 * export default createMemoryPlugin({
 *   config: {
 *     memory: {
 *       enabled: true,
 *       compaction: { count_based: 80 }
 *     }
 *   }
 * })
 */

import type { Plugin, PluginInput } from "@opencode-ai/plugin"
import { createMemoryTool } from "./tools/memory-tool"
import { createMemoryBootstrapHook } from "./hooks/memory-bootstrap"
import { createMemoryCompactionHook } from "./hooks/memory-compaction"
import { createMemorySnapshotHook } from "./hooks/memory-snapshot"
import { createMemoryIntentHook } from "./hooks/memory-intent"

export interface MemoryPluginConfig {
  enabled: boolean
  bootstrap: {
    loadProject: boolean
    loadGlobal: boolean
    loadRecentDays: number
    maxContextLines: number
  }
  compaction: {
    thresholdPercent: number
    maxEntries: number
    preserveCritical: boolean
  }
  snapshot: {
    maxMessages: number
    includeToolCalls: boolean
  }
  intent: {
    enabled: boolean
    languages: string[]
    confidenceThreshold: number
  }
}

const defaultConfig: MemoryPluginConfig = {
  enabled: true,
  bootstrap: {
    loadProject: true,
    loadGlobal: true,
    loadRecentDays: 7,
    maxContextLines: 200
  },
  compaction: {
    thresholdPercent: 80,
    maxEntries: 200,
    preserveCritical: true
  },
  snapshot: {
    maxMessages: 15,
    includeToolCalls: false
  },
  intent: {
    enabled: true,
    languages: ["en", "nl", "de", "fr", "es"],
    confidenceThreshold: 0.7
  }
}

/**
 * Create the memory plugin
 * 
 * This is the main export that oh-my-opencode will use
 */
export function createMemoryPlugin(input: PluginInput): Plugin {
  // Merge with default config
  const userConfig = (input as any).config?.memory || {}
  const config: MemoryPluginConfig = {
    ...defaultConfig,
    ...userConfig,
    bootstrap: { ...defaultConfig.bootstrap, ...userConfig.bootstrap },
    compaction: { ...defaultConfig.compaction, ...userConfig.compaction },
    snapshot: { ...defaultConfig.snapshot, ...userConfig.snapshot },
    intent: { ...defaultConfig.intent, ...userConfig.intent }
  }
  
  if (!config.enabled) {
    // Return empty plugin if disabled
    return {
      name: "memory",
      version: "1.0.0",
      tools: {},
      hooks: {}
    }
  }
  
  return {
    name: "memory",
    version: "1.0.0",
    description: "Persistent memory system with .memory.md, compaction, and LLM-powered intent detection",
    
    // ===== TOOLS =====
    // AI callable memory operations
    tools: {
      memory: createMemoryTool()
    },
    
    // ===== HOOKS =====
    // Event-driven memory operations
    
    // 1. Session created - load memory
    "session.created": createMemoryBootstrapHook(config.bootstrap),
    
    // 2. Session compaction - flush to daily log
    "experimental.session.compacting": createMemoryCompactionHook(config.compaction),
    
    // 3. Session deleted - create snapshot
    "session.deleted": createMemorySnapshotHook(config.snapshot),
    
    // 4. Tool execution - detect memory intent (LLM-powered)
    "tool.execute.before": createMemoryIntentHook(config.intent)
  }
}

/**
 * Default export for easy importing
 */
export default createMemoryPlugin

/**
 * Export individual components for testing or partial usage
 */
export {
  createMemoryTool,
  createMemoryBootstrapHook,
  createMemoryCompactionHook,
  createMemorySnapshotHook,
  createMemoryIntentHook
}
