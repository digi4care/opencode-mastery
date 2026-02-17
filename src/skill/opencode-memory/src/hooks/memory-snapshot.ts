/**
 * Memory Snapshot Hook
 * 
 * Saves session snapshot on session end
 * Triggered by: session.deleted
 */

import type { Hook, HookExecuteInput } from "@opencode-ai/plugin"
import { writeFile, mkdir, existsSync } from "fs/promises"
import { join } from "path"

export interface SnapshotConfig {
  maxMessages: number
  includeToolCalls: boolean
}

/**
 * Create snapshot hook
 */
export function createMemorySnapshotHook(config: SnapshotConfig = {
  maxMessages: 15,
  includeToolCalls: false
}): Hook {
  return {
    name: "memory-snapshot",
    trigger: "session.deleted",
    description: "Saves session snapshot when session ends",
    
    execute: async (input: HookExecuteInput) => {
      const { session } = input
      const projectRoot = session?.workingDirectory || process.cwd()
      const sessionId = session?.id || "unknown"
      
      // Create snapshots directory
      const snapshotsPath = join(projectRoot, ".memory", "snapshots")
      await mkdir(snapshotsPath, { recursive: true })
      
      try {
        // Get session messages
        const messages = session?.messages || []
        
        // Filter messages
        const filtered = config.includeToolCalls
          ? messages
          : messages.filter(m => 
              m.role === "user" || m.role === "assistant"
            )
        
        // Take last N messages
        const lastMessages = filtered.slice(-config.maxMessages)
        
        // Create snapshot content
        const timestamp = new Date().toISOString()
        const snapshot = {
          sessionId,
          timestamp,
          messageCount: lastMessages.length,
          messages: lastMessages.map(m => ({
            role: m.role,
            content: typeof m.content === "string" 
              ? m.content.slice(0, 500)  // Truncate long content
              : JSON.stringify(m.content).slice(0, 500)
          }))
        }
        
        // Write snapshot file
        const filename = `${timestamp.replace(/[:.]/g, "-")}-${sessionId.slice(0, 8)}.json`
        const filepath = join(snapshotsPath, filename)
        
        await writeFile(filepath, JSON.stringify(snapshot, null, 2), "utf-8")
        
        // Also update .memory.md if exists
        const memoryPath = join(projectRoot, ".memory.md")
        if (existsSync(memoryPath)) {
          const memoryContent = await import("fs/promises").then(fs => 
            fs.readFile(memoryPath, "utf-8").catch(() => "")
          )
          
          // Add to recent context
          const entry = `- [${timestamp.split("T")[0]}] Session ${sessionId.slice(0, 8)}: ${lastMessages.length} messages`
          
          const updated = memoryContent.includes("## Recent Context")
            ? memoryContent.replace(
                "## Recent Context",
                `## Recent Context\n${entry}`
              )
            : memoryContent + `\n\n## Recent Context\n${entry}`
          
          await import("fs/promises").then(fs => 
            fs.writeFile(memoryPath, updated, "utf-8")
          )
        }
        
        return {
          success: true,
          message: `Snapshot saved: ${filename}`,
          file: filename,
          messagesSaved: lastMessages.length
        }
      } catch (error) {
        return {
          success: false,
          message: `Snapshot error: ${error}`
        }
      }
    }
  }
}

export default createMemorySnapshotHook
