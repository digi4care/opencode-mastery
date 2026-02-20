/**
 * Get memory status for current project
 * Respects opencode.config.yaml settings
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { getMemoryStatus, needsCompaction } from "../lib/memory";
import { getFeatureConfig, isFeatureEnabled } from "../lib/config";

export const memoryStatus = tool(
  z.object({
    projectPath: z.string().optional().describe("Project path (defaults to current directory)"),
  }),
  async (args) => {
    const path = args.projectPath || process.cwd();
    
    // Check if memory is enabled in config
    const memoryEnabled = isFeatureEnabled("memory", "memory");
    const config = getFeatureConfig("memory");
    
    if (!memoryEnabled) {
      return {
        success: true,
        data: {
          enabled: false,
          reason: "Memory is disabled in opencode.config.yaml",
        },
        metadata: {},
      };
    }
    
    const status = getMemoryStatus(path);
    
    return {
      success: true,
      data: {
        enabled: true,
        exists: status.exists,
        sizeKB: Math.round(status.size / 1024),
        entries: status.entries,
        path: status.path,
        needsCompaction: status.exists && needsCompaction(path),
        config: {
          lazyLoading: config.lazyLoading,
          compactionEnabled: config.compaction?.enabled !== false,
        },
      },
      metadata: {
        maxSizeKB: 50,
      },
    };
  }
).describe("Check memory status for current project. Respects opencode.config.yaml settings.");
