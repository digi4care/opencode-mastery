/**
 * Compact memory by summarizing old entries
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { compactMemory, getMemoryStatus, needsCompaction } from "../lib/memory";

export const memoryCompact = tool(
  z.object({
    projectPath: z.string().optional().describe("Project path (defaults to current directory)"),
    force: z.boolean().default(false).describe("Force compaction even if not needed"),
  }),
  async (args) => {
    const path = args.projectPath || process.cwd();
    
    // Check if compaction needed
    if (!args.force && !needsCompaction(path)) {
      const status = getMemoryStatus(path);
      return {
        success: true,
        data: {
          compacted: false,
          reason: `Memory is under threshold (${Math.round(status.size / 1024)}KB < 50KB). Use force=true to compact anyway.`,
          currentSize: status.size,
        },
        metadata: {},
      };
    }
    
    const result = compactMemory(path);
    
    return {
      success: result.success,
      data: {
        compacted: result.success,
        beforeSizeKB: Math.round(result.beforeSize / 1024),
        afterSizeKB: Math.round(result.afterSize / 1024),
        entriesKept: result.entriesKept,
        savedKB: Math.round((result.beforeSize - result.afterSize) / 1024),
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }
).describe("Compact project memory by summarizing old entries. Keeps most recent entries, archives older content.");
