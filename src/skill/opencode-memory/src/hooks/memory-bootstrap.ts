/**
 * Memory Bootstrap Hook
 * 
 * Loads .memory.md on session start
 * Triggered by: session.created
 */

import type { Hook, HookExecuteInput } from "@opencode-ai/plugin"
import { readFile, existsSync, readdir } from "fs/promises"
import { join } from "path"

export interface BootstrapConfig {
  loadGlobal: boolean
  loadProject: boolean
  loadRecentDays: number
  maxContextLines: number
}

/**
 * Load .memory.md from project root
 */
async function loadProjectMemory(projectRoot: string): Promise<string | null> {
  const memoryPath = join(projectRoot, ".memory.md")
  
  try {
    if (!existsSync(memoryPath)) {
      return null
    }
    
    const content = await readFile(memoryPath, "utf-8")
    
    // Extract relevant sections (skip frontmatter)
    const lines = content.split("\n")
    let inFrontmatter = false
    let relevantContent: string[] = []
    
    for (const line of lines) {
      if (line.trim() === "---") {
        inFrontmatter = !inFrontmatter
        continue
      }
      if (!inFrontmatter && line.trim()) {
        relevantContent.push(line)
      }
    }
    
    return relevantContent.slice(0, 200).join("\n") // Max 200 lines
  } catch {
    return null
  }
}

/**
 * Load recent daily logs
 */
async function loadRecentLogs(projectRoot: string, days: number = 7): Promise<string> {
  const dailyPath = join(projectRoot, ".memory", "daily")
  const logs: string[] = []
  
  try {
    if (!existsSync(dailyPath)) {
      return ""
    }
    
    const files = await readdir(dailyPath)
    const recentFiles = files
      .filter(f => f.endsWith(".md"))
      .sort()
      .slice(-days)
    
    for (const file of recentFiles) {
      const content = await readFile(join(dailyPath, file), "utf-8")
      logs.push(`\n## ${file.replace(".md", "")}`)
      logs.push(content)
    }
  } catch {
    // Ignore errors
  }
  
  return logs.join("\n")
}

/**
 * Create bootstrap hook
 */
export function createMemoryBootstrapHook(config: BootstrapConfig = {
  loadGlobal: true,
  loadProject: true,
  loadRecentDays: 7,
  maxContextLines: 200
}): Hook {
  return {
    name: "memory-bootstrap",
    trigger: "session.created",
    description: "Loads .memory.md on session start",
    
    execute: async (input: HookExecuteInput) => {
      const { session, context } = input
      const projectRoot = session?.workingDirectory || process.cwd()
      
      const bootstrapContext: string[] = []
      
      // Load project memory
      if (config.loadProject) {
        const projectMemory = await loadProjectMemory(projectRoot)
        if (projectMemory) {
          bootstrapContext.push("## Project Memory")
          bootstrapContext.push(projectMemory)
        }
      }
      
      // Load recent daily logs
      if (config.loadRecentDays > 0) {
        const recentLogs = await loadRecentLogs(projectRoot, config.loadRecentDays)
        if (recentLogs) {
          bootstrapContext.push("\n## Recent Context")
          bootstrapContext.push(recentLogs)
        }
      }
      
      // Inject into session context
      if (bootstrapContext.length > 0) {
        return {
          success: true,
          context: bootstrapContext.join("\n"),
          message: "Memory bootstrap completed"
        }
      }
      
      return {
        success: true,
        context: "",
        message: "No memory found"
      }
    }
  }
}

export default createMemoryBootstrapHook
