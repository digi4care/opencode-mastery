/**
 * Store information in project memory
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { remember, needsCompaction, getMemoryStatus } from "../lib/memory";

export const memoryRemember = tool(
  z.object({
    content: z.string().min(1).describe("Content to remember for future sessions"),
    category: z.enum(["preference", "pattern", "correction", "context", "decision"]).optional().describe("Category for organization"),
    priority: z.enum(["high", "medium", "low"]).default("medium").describe("Importance level"),
    projectPath: z.string().optional().describe("Project path (defaults to current directory)"),
  }),
  async (args) => {
    const path = args.projectPath || process.cwd();
    const result = remember(path, args.content, args.category, args.priority);
    
    const status = getMemoryStatus(path);
    
    return {
      success: result.success,
      data: {
        stored: result.success,
        category: args.category,
        priority: args.priority,
        path: result.path,
        totalEntries: status.entries,
        warning: needsCompaction(path) ? "Memory is getting large. Consider running memory-compact." : undefined,
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }
).describe("Store information in project memory (.memory.md) for future sessions. Use for preferences, patterns, corrections, decisions.");
