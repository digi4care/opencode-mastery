/**
 * Memory Compaction Hook
 * 
 * Monitors context window and triggers compaction
 * Triggered by: experimental.session.compacting
 */

import type { Hook, HookExecuteInput } from "@opencode-ai/plugin"
import { readFile, writeFile, mkdir, existsSync } from "fs/promises"
import { join, dirname } from "path"

export interface CompactionConfig {
  thresholdPercent: number
  maxEntries: number
  preserveCritical: boolean
}

/**
 * Parse frontmatter from memory file
 */
function parseFrontmatter(content: string): { config: CompactionConfig; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) {
    return {
      config: { thresholdPercent: 80, maxEntries: 200, preserveCritical: true },
      body: content
    }
  }
  
  const yaml = match[1]
  const body = content.slice(match[0].length)
  
  const config: CompactionConfig = {
    thresholdPercent: 80,
    maxEntries: 200,
    preserveCritical: true
  }
  
  yaml.split("\n").forEach(line => {
    const [key, value] = line.split(":").map(s => s.trim())
    if (key === "count_based") {
      config.thresholdPercent = parseInt(value)
    } else if (key === "max_entries") {
      config.maxEntries = parseInt(value)
    }
  })
  
  return { config, body }
}

/**
 * Extract key entries for compaction
 */
function extractKeyEntries(content: string): string[] {
  const entries: string[] = []
  const lines = content.split("\n")
  
  for (const line of lines) {
    // Look for entries in Recent Context or similar sections
    if (line.trim().startsWith("- [")) {
      entries.push(line.trim())
    }
  }
  
  return entries
}

/**
 * Write daily log entry
 */
async function writeDailyLog(
  projectRoot: string,
  entries: string[]
): Promise<string> {
  const date = new Date().toISOString().split("T")[0]
  const dailyPath = join(projectRoot, ".memory", "daily")
  
  await mkdir(dailyPath, { recursive: true })
  
  const filePath = join(dailyPath, `${date}.md`)
  const timestamp = new Date().toISOString()
  
  const logContent = entries.map(e => `- [${timestamp}] COMPACTED: ${e}`).join("\n")
  
  try {
    const existing = await readFile(filePath, "utf-8")
    await writeFile(filePath, existing + "\n" + logContent, "utf-8")
  } catch {
    await writeFile(filePath, logContent, "utf-8")
  }
  
  return filePath
}

/**
 * Create compaction hook
 */
export function createMemoryCompactionHook(config: CompactionConfig = {
  thresholdPercent: 80,
  maxEntries: 200,
  preserveCritical: true
}): Hook {
  return {
    name: "memory-compaction",
    trigger: "experimental.session.compacting",
    description: "Flushes memory to daily log when context is near limit",
    
    execute: async (input: HookExecuteInput) => {
      const { session, context } = input
      const projectRoot = session?.workingDirectory || process.cwd()
      const memoryPath = join(projectRoot, ".memory.md")
      
      // Check if memory file exists
      if (!existsSync(memoryPath)) {
        return {
          success: true,
          message: "No .memory.md found, skipping compaction"
        }
      }
      
      try {
        const content = await readFile(memoryPath, "utf-8")
        const { config: fileConfig, body } = parseFrontmatter(content)
        
        // Use file config if available
        const threshold = fileConfig.thresholdPercent || config.thresholdPercent
        const maxEntries = fileConfig.maxEntries || config.maxEntries
        
        // Check context usage
        const contextSize = context?.size || 0
        if (contextSize < threshold) {
          return {
            success: true,
            message: `Context at ${contextSize}%, below threshold ${threshold}%`
          }
        }
        
        // Extract entries to compact
        const entries = extractKeyEntries(body)
        
        if (entries.length > maxEntries) {
          // Keep only recent entries
          const toKeep = entries.slice(-maxEntries)
          const toCompact = entries.slice(0, -maxEntries)
          
          // Write compacted entries to daily log
          if (toCompact.length > 0) {
            await writeDailyLog(projectRoot, toCompact)
          }
          
          // Update memory file with kept entries
          const newContent = body.replace(
            /- \[.*?\].*/g,
            (match, offset) => {
              const idx = body.indexOf(match)
              const entryNum = body.slice(0, idx).split("- [").length - 1
              return toKeep.includes(match) ? match : ""
            }
          ).split("\n").filter(l => l.trim()).join("\n")
          
          await writeFile(memoryPath, `---\nmemory:\n  version: "1.0"\n---\n\n${newContent}`, "utf-8")
          
          return {
            success: true,
            message: `Compacted ${toCompact.length} entries to daily log`,
            compacted: toCompact.length,
            kept: toKeep.length
          }
        }
        
        return {
          success: true,
          message: "No compaction needed"
        }
      } catch (error) {
        return {
          success: false,
          message: `Compaction error: ${error}`
        }
      }
    }
  }
}

export default createMemoryCompactionHook
