/**
 * Search OpenCode Sessions
 * 
 * Full-text search via the OpenCode SDK client.
 * No port detection needed - uses the client from plugin context.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

let sdkClient: any = null;

export function setSessionClient(client: any): void {
  sdkClient = client;
}

export const sessionSearch = tool(
  z.object({
    query: z.string().min(1).describe("Search query"),
    sessionId: z.string().optional().describe("Limit search to specific session"),
    limit: z.number().min(1).max(50).default(10).describe("Maximum results to return"),
  }),
  async (args) => {
    if (!sdkClient) {
      return {
        success: false,
        data: {
          results: [],
          error: "SDK client not initialized",
          query: args.query,
        },
        metadata: {},
      };
    }

    try {
      // Gebruik SDK client voor search
      const result = await sdkClient.session.search({
        query: args.query,
        sessionId: args.sessionId,
        limit: args.limit,
      });

      const results = result.data?.results || [];

      return {
        success: true,
        data: {
          query: args.query,
          results: results.map((r: any) => ({
            sessionId: r.sessionId || r.session_id,
            messageId: r.messageId || r.message_id,
            role: r.role,
            snippet: r.snippet,
            timestamp: r.timestamp || r.created_at,
            relevanceScore: r.relevanceScore || r.relevance_score || 0,
          })),
          total: result.data?.total || results.length,
        },
        metadata: {
          source: "opencode-sdk",
          limitedTo: args.sessionId || "all sessions",
        },
      };
    } catch (error) {
      // Fallback: search not supported, return hint
      return {
        success: true,
        data: {
          query: args.query,
          results: [],
          total: 0,
          hint: "Search not available. Use sessionList + sessionRead to find content manually.",
        },
        metadata: {
          source: "opencode-sdk",
          error: error instanceof Error ? error.message : "Search failed",
        },
      };
    }
  }
).describe("Search for content across OpenCode sessions. Uses SDK client - works with any port.");
