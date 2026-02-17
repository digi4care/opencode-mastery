/**
 * Memory Tool - AI callable memory operations
 * 
 * Provides tools for reading, writing, and searching memory
 */

import type { Tool, ToolExecuteInput } from "@opencode-ai/plugin"
import { readFile, writeFile, readdir, mkdir, stat } from "fs/promises"
import { join, dirname } from "path"
import { existsSync } from "fs"

export interface MemoryConfig {
  version: string
  enabled: boolean
  compaction: {
    count_based: number
    time_based: number
    event_based: boolean
  }
  types: {
    semantic: { enabled: boolean; scope: string }
    episodic: { enabled: boolean; retention: string }
    procedural: { enabled: boolean }
  }
}

export interface MemoryEntry {
  id: string
  type: "semantic" | "episodic"
  content: string
  timestamp: string
  category?: string
}

/**
 * Load .memory.md from project root
 */
async function loadMemoryFile(projectRoot: string): Promise<{ config: MemoryConfig | null; content: string }> {
  const memoryPath = join(projectRoot, ".memory.md")
  
  try {
    const content = await readFile(memoryPath, "utf-8")
    const config = parseFrontmatter(content)
    return { config, content }
  } catch {
    return { config: null, content: "" }
  }
}

/**
 * Parse YAML frontmatter from markdown
 */
function parseFrontmatter(content: string): MemoryConfig | null {
  const match = content.match(/^---\n([\s\S]*?)\n---/)
  if (!match) return null
  
  try {
    // Simple YAML parsing for memory config
    const yaml = match[1]
    const config: any = { compaction: {}, types: { semantic: {}, episodic: {}, procedural: {} } }
    
    yaml.split("\n").forEach(line => {
      const [key, value] = line.split(":").map(s => s.trim())
      if (!key || !value) return
      
      if (key === "version" || key === "enabled") {
        config[key] = value === "true" || value === "true"
      } else if (key === "count_based" || key === "time_based") {
        config.compaction[key] = parseInt(value)
      } else if (key === "event_based") {
        config.compaction[key] = value === "true"
      } else if (key === "scope" || key === "retention") {
        const type = key === "scope" ? "semantic" : "episodic"
        config.types[type][key] = value
      }
    })
    
    return config as MemoryConfig
  } catch {
    return null
  }
}

/**
 * Search memory for keywords
 */
async function searchMemory(projectRoot: string, query: string): Promise<MemoryEntry[]> {
  const entries: MemoryEntry[] = []
  const keywords = query.toLowerCase().split(/\s+/)
  
  // Search in .memory.md
  const { content } = await loadMemoryFile(projectRoot)
  if (content) {
    const lines = content.split("\n")
    let currentSection = ""
    
    lines.forEach((line, index) => {
      const lineLower = line.toLowerCase()
      const matches = keywords.some(kw => lineLower.includes(kw))
      
      if (line.startsWith("#")) {
        currentSection = line.replace(/^#+\s*/, "").trim()
      } else if (matches && line.trim()) {
        entries.push({
          id: `memory-md-${index}`,
          type: "semantic",
          content: line.trim(),
          timestamp: new Date().toISOString(),
          category: currentSection
        })
      }
    })
  }
  
  // Search in daily logs
  const dailyPath = join(projectRoot, ".memory", "daily")
  if (existsSync(dailyPath)) {
    try {
      const files = await readdir(dailyPath)
      for (const file of files.slice(-7)) { // Last 7 days
        const filePath = join(dailyPath, file)
        const content = await readFile(filePath, "utf-8")
        
        content.split("\n").forEach((line, index) => {
          const lineLower = line.toLowerCase()
          const matches = keywords.some(kw => lineLower.includes(kw))
          
          if (matches && line.trim()) {
            entries.push({
              id: `daily-${file}-${index}`,
              type: "episodic",
              content: line.trim(),
              timestamp: file.replace(".md", ""),
              category: "daily log"
            })
          }
        })
      }
    } catch {
      // Ignore errors
    }
  }
  
  return entries.slice(0, 10) // Max 10 results
}

/**
 * Write to memory
 */
async function writeToMemory(
  projectRoot: string,
  content: string,
  type: "semantic" | "episodic" = "semantic"
): Promise<{ success: boolean; message: string }> {
  const timestamp = new Date().toISOString()
  
  if (type === "semantic") {
    // Append to .memory.md
    const memoryPath = join(projectRoot, ".memory.md")
    
    try {
      let existingContent = ""
      try {
        existingContent = await readFile(memoryPath, "utf-8")
      } catch {
        // File doesn't exist, create new
      }
      
      // Find last semantic entry or append at end
      const newEntry = `\n- [${timestamp.split("T")[0]}] ${content}`
      
      // Check if "## Recent Context" section exists
      if (existingContent.includes("## Recent Context")) {
        // Insert before the section
        existingContent = existingContent.replace(
          "## Recent Context",
          `## Recent Context${newEntry}`
        )
      } else {
        // Append at end
        existingContent += `\n\n## Recent Context${newEntry}`
      }
      
      await writeFile(memoryPath, existingContent, "utf-8")
      return { success: true, message: "Added to semantic memory" }
    } catch (error) {
      return { success: false, message: `Error writing: ${error}` }
    }
  } else {
    // Write to daily log
    const date = timestamp.split("T")[0]
    const dailyPath = join(projectRoot, ".memory", "daily")
    
    try {
      await mkdir(dailyPath, { recursive: true })
      const filePath = join(dailyPath, `${date}.md`)
      
      let existingContent = ""
      try {
        existingContent = await readFile(filePath, "utf-8")
      } catch {
        // File doesn't exist
      }
      
      const newEntry = `- [${timestamp}] ${content}\n`
      await writeFile(filePath, existingContent + newEntry, "utf-8")
      
      return { success: true, message: "Added to daily log" }
    } catch (error) {
      return { success: false, message: `Error writing: ${error}` }
    }
  }
}

/**
 * Get memory status
 */
async function getMemoryStatus(projectRoot: string): Promise<{
  enabled: boolean
  config: MemoryConfig | null
  entries: number
  lastUpdated: string | null
}> {
  const { config, content } = await loadMemoryFile(projectRoot)
  
  let entries = 0
  let lastUpdated: string | null = null
  
  // Count entries
  if (content) {
    entries = content.split("\n").filter(line => line.startsWith("- [")).length
  }
  
  // Check daily logs
  const dailyPath = join(projectRoot, ".memory", "daily")
  if (existsSync(dailyPath)) {
    try {
      const files = await readdir(dailyPath)
      for (const file of files) {
        const filePath = join(dailyPath, file)
        const stats = await stat(filePath)
        if (!lastUpdated || stats.mtime > new Date(lastUpdated)) {
          lastUpdated = stats.mtime.toISOString()
        }
      }
    } catch {
      // Ignore
    }
  }
  
  return {
    enabled: config?.enabled ?? false,
    config,
    entries,
    lastUpdated
  }
}

/**
 * Create the memory tool
 */
export function createMemoryTool(): Tool {
  return {
    name: "memory",
    description: "Persistent memory for storing and retrieving context across sessions",
    inputSchema: {
      type: "object",
      properties: {
        action: {
          type: "string",
          enum: ["read", "write", "search", "status"],
          description: "The memory action to perform"
        },
        query: {
          type: "string",
          description: "Query for search action"
        },
        content: {
          type: "string",
          description: "Content to write for write action"
        },
        type: {
          type: "string",
          enum: ["semantic", "episodic"],
          description: "Type of memory entry"
        }
      },
      required: ["action"]
    },
    execute: async (input: ToolExecuteInput) => {
      const { action, query, content, type = "semantic" } = input.arguments as {
        action: string
        query?: string
        content?: string
        type?: "semantic" | "episodic"
      }
      
      // Get project root from context (would be injected by plugin)
      const projectRoot = process.cwd()
      
      try {
        switch (action) {
          case "read": {
            const entries = await searchMemory(projectRoot, query || "")
            return {
              success: true,
              entries,
              message: `Found ${entries.length} entries`
            }
          }
          
          case "write": {
            if (!content) {
              return { success: false, message: "Content is required for write action" }
            }
            return await writeToMemory(projectRoot, content, type)
          }
          
          case "search": {
            const entries = await searchMemory(projectRoot, query || "")
            return {
              success: true,
              entries,
              message: `Found ${entries.length} entries`
            }
          }
          
          case "status": {
            const status = await getMemoryStatus(projectRoot)
            return {
              success: true,
              ...status,
              message: `Memory ${status.enabled ? "enabled" : "disabled"}`
            }
          }
          
          default:
            return { success: false, message: `Unknown action: ${action}` }
        }
      } catch (error) {
        return { success: false, message: `Error: ${error}` }
      }
    }
  }
}

export default createMemoryTool
