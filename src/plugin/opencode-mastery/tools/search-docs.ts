/**
 * Search OpenCode documentation
 * 
 * Searches both Context7 API (live docs) and local documentation.
 * Provides structured results with source attribution.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { searchLocalDocs, docsNeedUpdate } from "../lib/docs";

const OPENCODE_LIB_ID = "/anomalyco/opencode";

export const searchDocs = tool(
  z.object({
    query: z.string().min(1).describe("Search query (e.g., 'skills', 'plugins', 'SDK', 'tools')"),
    source: z.enum(["context7", "local", "both"]).default("both").describe("Where to search: context7 (live), local (cached), or both"),
    maxResults: z.number().min(1).max(20).default(5).describe("Maximum results to return"),
  }),
  async (args) => {
    const results: Array<{
      source: "context7" | "local";
      title: string;
      file?: string;
      snippet: string;
      score?: number;
    }> = [];
    
    // 1. Try Context7 first (live docs)
    if (args.source === "context7" || args.source === "both") {
      try {
        const response = await fetch(
          `https://api.context7.com/v1/search?libraryId=${OPENCODE_LIB_ID}&query=${encodeURIComponent(args.query)}&limit=${args.maxResults}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        
        if (response.ok) {
          const data = await response.json();
          if (data.results && Array.isArray(data.results)) {
            for (const result of data.results.slice(0, args.maxResults)) {
              results.push({
                source: "context7",
                title: result.title || result.path?.split("/").pop() || "Unknown",
                file: result.path,
                snippet: result.snippet || result.content?.slice(0, 300) || "",
              });
            }
          }
        }
      } catch (error) {
        // Context7 failed, continue with local
        console.error("Context7 search failed:", error);
      }
    }
    
    // 2. Fallback to local docs
    if ((args.source === "local" || args.source === "both") && results.length < args.maxResults) {
      try {
        // Check if docs need update
        if (await docsNeedUpdate()) {
          console.log("Local docs may be outdated. Consider running download-docs tool.");
        }
        
        const localResults = await searchLocalDocs(args.query, args.maxResults - results.length);
        for (const result of localResults) {
          results.push({
            source: "local",
            title: result.title,
            file: result.file,
            snippet: result.snippet,
            score: result.score,
          });
        }
      } catch (error) {
        console.error("Local search failed:", error);
      }
    }
    
    // Sort by score if available
    results.sort((a, b) => (b.score || 0) - (a.score || 0));
    
    return {
      success: results.length > 0,
      data: {
        query: args.query,
        results: results.slice(0, args.maxResults),
        sources: {
          context7: args.source === "context7" || args.source === "both",
          local: args.source === "local" || args.source === "both",
        },
      },
      metadata: {
        totalFound: results.length,
        query: args.query,
      },
    };
  }
).describe("Search OpenCode documentation for SDK, skills, plugins, tools, agents, etc. Uses live Context7 API with local fallback.");
