/**
 * Download OpenCode documentation from GitHub
 * 
 * Downloads official docs from anomalyco/opencode repository
 * and builds a local search index.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { downloadDocs, buildIndex, docsNeedUpdate } from "../lib/docs";

export const downloadDocsTool = tool(
  z.object({
    force: z.boolean().default(false).describe("Force re-download even if docs are recent"),
    rebuildIndex: z.boolean().default(true).describe("Rebuild search index after download"),
  }),
  async (args) => {
    // Check if update needed
    if (!args.force && !(await docsNeedUpdate())) {
      return {
        success: true,
        data: {
          downloaded: false,
          reason: "Docs are recent (less than 7 days old). Use force=true to re-download.",
        },
        metadata: {
          cached: true,
        },
      };
    }
    
    // Download docs
    const downloadResult = await downloadDocs(args.force);
    
    if (!downloadResult.success) {
      return {
        success: false,
        data: {
          downloaded: false,
          error: "Failed to download docs from GitHub",
        },
        metadata: {},
      };
    }
    
    // Build index if requested
    let indexResult = { success: false, keywords: 0, sections: 0 };
    if (args.rebuildIndex) {
      indexResult = await buildIndex();
    }
    
    return {
      success: true,
      data: {
        downloaded: true,
        filesDownloaded: downloadResult.count,
        path: downloadResult.path,
        indexBuilt: indexResult.success,
        keywords: indexResult.keywords,
        sections: indexResult.sections,
      },
      metadata: {
        timestamp: new Date().toISOString(),
      },
    };
  }
).describe("Download latest OpenCode documentation from GitHub (anomalyco/opencode) and build search index.");
