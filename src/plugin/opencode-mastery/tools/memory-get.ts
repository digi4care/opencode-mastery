/**
 * Get memory file snippet with optional line slicing
 * 
 * Reads MEMORY.md or daily log files with optional from/lines parameters
 * for efficient snippet retrieval without loading entire files.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { stat, readFile } from "fs/promises";
import { join } from "path";

// Maximum file size to read into memory (5MB threshold per CONTEXT.md)
const MAX_MEMORY_SIZE = 5 * 1024 * 1024;

export const memoryGet = tool(
  z.object({
    path: z.string().min(1).describe("File path (e.g., 'MEMORY.md', '.memory/daily/2024-01-15.md')"),
    from: z.number().int().min(1).optional().describe("Starting line number (1-indexed)"),
    lines: z.number().int().min(1).optional().describe("Number of lines to read"),
  }),
  async (args) => {
    try {
      // Resolve path - support both absolute and relative paths
      const filePath = args.path.startsWith("/") 
        ? args.path 
        : join(process.cwd(), args.path);
      
      // Check file exists and get stats
      const stats = await stat(filePath);
      
      // Check file size for memory safety
      if (stats.size > MAX_MEMORY_SIZE) {
        // For large files, we should stream - but for now return error
        // Full streaming implementation would use readline
        return {
          success: false,
          error: `File too large (${Math.round(stats.size / 1024 / 1024)}MB). Maximum supported: 5MB.`,
          data: {
            path: args.path,
            totalLines: -1,
          },
          metadata: { path: args.path },
        };
      }
      
      // Read file content
      const content = await readFile(filePath, "utf-8");
      const allLines = content.split("\n");
      const totalLines = allLines.length;
      
      // Determine line range
      const fromLine = args.from !== undefined ? Math.max(1, args.from) : 1;
      const toLine = args.lines !== undefined 
        ? Math.min(totalLines, fromLine + args.lines - 1)
        : totalLines;
      
      // Clamp values to valid range
      const clampedFrom = Math.min(fromLine, totalLines);
      const clampedTo = Math.min(toLine, totalLines);
      
      // Extract lines (0-indexed internally)
      const selectedLines = allLines.slice(clampedFrom - 1, clampedTo);
      const snippet = selectedLines.join("\n");
      
      return {
        success: true,
        data: {
          path: args.path,
          content: snippet,
          from: clampedFrom,
          to: clampedTo,
          totalLines,
        },
        metadata: { 
          path: args.path,
          linesRequested: args.lines,
          linesReturned: selectedLines.length,
        },
      };
    } catch (error) {
      // Graceful error handling
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      if (errorMessage.includes("ENOENT") || errorMessage.includes("no such file")) {
        return {
          success: false,
          error: `File not found: ${args.path}`,
          data: {
            path: args.path,
            totalLines: 0,
          },
          metadata: { path: args.path },
        };
      }
      
      if (errorMessage.includes("EACCES") || errorMessage.includes("permission")) {
        return {
          success: false,
          error: `Permission denied: ${args.path}`,
          data: {
            path: args.path,
            totalLines: 0,
          },
          metadata: { path: args.path },
        };
      }
      
      return {
        success: false,
        error: `Failed to read file: ${errorMessage}`,
        data: {
          path: args.path,
          totalLines: 0,
        },
        metadata: { path: args.path },
      };
    }
  }
).describe("Read memory file snippets with optional line range. Use 'from' and 'lines' parameters for efficient partial reads.");
