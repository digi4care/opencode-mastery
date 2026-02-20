/**
 * Search memory with hybrid search
 * 
 * Provides AI-consumable search tool wrapping Phase 3 search API.
 * Supports source filtering, score thresholds, and FTS-only fallback.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { searchMemory, type SearchResponse } from "../../opencode-memory/lib/search";
import { getFeatureConfig } from "../../../lib/config";

export const memorySearch = tool(
  z.object({
    query: z.string().min(1).describe("Search query to find relevant memory entries"),
    maxResults: z.number().int().min(1).max(100).optional().describe("Maximum results to return (default: 10)"),
    minScore: z.number().min(0).max(1).optional().describe("Minimum relevance score 0-1 (default: 0.35)"),
    source: z.enum(["memory", "sessions", "all"]).optional().describe("Filter by source type (default: all)"),
  }),
  async (args) => {
    try {
      // Pull defaults from config
      const config = getFeatureConfig("memory");
      const maxResults = args.maxResults ?? config.search.maxResults ?? 10;
      const minScore = args.minScore ?? config.search.minScore ?? 0.35;
      const source = args.source ?? "all";

      // Call Phase 3 search API
      const response: SearchResponse = await searchMemory(args.query, {
        maxResults,
        minScore,
        source,
      });

      // Return structured response
      return {
        success: true,
        data: {
          results: response.results.map(r => ({
            path: r.path,
            content: r.content,
            citation: r.citation,
            score: r.score,
            chunk_id: r.chunk_id,
          })),
          mode: response.mode,
          warning: response.warning,
        },
        metadata: {
          query: args.query,
          count: response.count,
          mode: response.mode,
        },
      };
    } catch (error) {
      // Graceful error handling - never throw
      const errorMessage = error instanceof Error ? error.message : String(error);

      return {
        success: false,
        error: `Search failed: ${errorMessage}`,
        data: {
          results: [],
          mode: "fts-only" as const,
          warning: "Search error occurred",
        },
        metadata: {
          query: args.query,
          count: 0,
          mode: "error",
        },
      };
    }
  }
).describe("Search memory with hybrid search. Returns relevant entries with citations. Automatically falls back to keyword-only when embeddings unavailable.");
