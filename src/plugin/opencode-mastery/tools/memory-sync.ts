/**
 * Trigger memory file synchronization
 * 
 * Syncs MEMORY.md and daily logs to the vector database.
 * Supports incremental sync (default) or full rebuild.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { syncAllFiles, rebuildDatabase, type SyncResult } from "../../opencode-memory/sync";

export const memorySync = tool(
  z.object({
    force: z.boolean().default(false).describe("Force full rebuild instead of incremental sync"),
    projectPath: z.string().optional().describe("Project path (defaults to current directory)"),
  }),
  async (args) => {
    const projectRoot = args.projectPath || process.cwd();
    const errors: string[] = [];
    let filesProcessed = 0;
    let chunksCreated = 0;
    
    try {
      if (args.force) {
        // Full rebuild
        const result = await rebuildDatabase(projectRoot);
        
        return {
          success: true,
          data: {
            mode: "full" as const,
            filesProcessed: result.filesProcessed,
            chunksCreated: result.chunksCreated,
            errors: result.errors || [],
          },
          metadata: {
            force: true,
            timestamp: new Date().toISOString(),
          },
        };
      }
      
      // Incremental sync
      const results = await syncAllFiles(projectRoot);
      
      for (const r of results) {
        if (r.action === "error" && r.error) {
          errors.push(`${r.path}: ${r.error}`);
        } else if (r.action !== "skipped") {
          filesProcessed++;
          chunksCreated += r.chunkCount ?? 0;
        }
      }
      
      return {
        success: true,
        data: {
          mode: "incremental" as const,
          filesProcessed,
          chunksCreated,
          errors,
        },
        metadata: {
          force: false,
          timestamp: new Date().toISOString(),
          totalFilesChecked: results.length,
          skipped: results.filter(r => r.action === "skipped").length,
        },
      };
    } catch (error) {
      // Graceful error handling - never throw
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      // Check for common recoverable errors
      if (errorMessage.includes("database") && errorMessage.includes("locked")) {
        return {
          success: true, // Not a blocking error
          data: {
            mode: args.force ? "full" as const : "incremental" as const,
            filesProcessed: 0,
            chunksCreated: 0,
            errors: ["Database temporarily locked. Please retry in a moment."],
          },
          metadata: {
            force: args.force,
            timestamp: new Date().toISOString(),
            warning: "Database lock detected",
          },
        };
      }
      
      // Missing MEMORY.md is not an error
      if (errorMessage.includes("ENOENT") || errorMessage.includes("not found")) {
        return {
          success: true,
          data: {
            mode: args.force ? "full" as const : "incremental" as const,
            filesProcessed: 0,
            chunksCreated: 0,
            errors: ["No memory files found. Create MEMORY.md to get started."],
          },
          metadata: {
            force: args.force,
            timestamp: new Date().toISOString(),
          },
        };
      }
      
      return {
        success: false,
        error: `Sync failed: ${errorMessage}`,
        data: {
          mode: args.force ? "full" as const : "incremental" as const,
          filesProcessed: 0,
          chunksCreated: 0,
          errors: [errorMessage],
        },
        metadata: {
          force: args.force,
          timestamp: new Date().toISOString(),
        },
      };
    }
  }
).describe("Sync memory files to vector database. Use force=true for full rebuild, default is incremental sync.");
