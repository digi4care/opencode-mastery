/**
 * Search OpenCode Sessions
 * 
 * Full-text search across session content.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { openCodeRequest } from "../lib/server";

interface SearchResult {
  sessionId: string;
  messageId: string;
  role: "user" | "assistant";
  snippet: string;
  timestamp: string;
  relevanceScore: number;
}

interface SearchResponse {
  results: SearchResult[];
  total: number;
  query: string;
}

export const sessionSearch = tool(
  z.object({
    query: z.string().min(1).describe("Search query"),
    sessionId: z.string().optional().describe("Limit search to specific session"),
    limit: z.number().min(1).max(50).default(10).describe("Maximum results to return"),
    caseSensitive: z.boolean().default(false).describe("Case-sensitive search"),
  }),
  async (args) => {
    // Build query string
    const params = new URLSearchParams();
    params.set("q", args.query);
    params.set("limit", String(args.limit));
    params.set("caseSensitive", String(args.caseSensitive));
    if (args.sessionId) {
      params.set("sessionId", args.sessionId);
    }
    
    // Search sessions via OpenCode server
    const result = await openCodeRequest<SearchResponse>(
      `/session/search?${params.toString()}`
    );
    
    if (!result.success) {
      return {
        success: false,
        data: {
          results: [],
          error: result.error || "Search failed",
          query: args.query,
        },
        metadata: {},
      };
    }
    
    const results = result.data?.results || [];
    
    return {
      success: true,
      data: {
        query: args.query,
        results: results.map(r => ({
          sessionId: r.sessionId,
          messageId: r.messageId,
          role: r.role,
          snippet: r.snippet,
          timestamp: r.timestamp,
          relevanceScore: r.relevanceScore,
        })),
        total: result.data?.total || results.length,
      },
      metadata: {
        caseSensitive: args.caseSensitive,
        limitedTo: args.sessionId || "all sessions",
      },
    };
  }
).describe("Search for content across OpenCode sessions. Use to find specific conversations, topics, or patterns in session history.");
