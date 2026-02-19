/**
 * Read OpenCode Session Messages
 * 
 * Retrieves messages via the OpenCode SDK client.
 * No port detection needed - uses the client from plugin context.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

let sdkClient: any = null;

export function setSessionClient(client: any): void {
  sdkClient = client;
}

export const sessionRead = tool(
  z.object({
    sessionId: z.string().describe("Session ID to read"),
    limit: z.number().min(1).max(500).default(100).describe("Maximum messages to return"),
    includeToolCalls: z.boolean().default(true).describe("Include tool call details"),
    offset: z.number().min(0).default(0).describe("Message offset for pagination"),
  }),
  async (args) => {
    if (!sdkClient) {
      return {
        success: false,
        data: {
          messages: [],
          error: "SDK client not initialized",
          sessionId: args.sessionId,
        },
        metadata: {},
      };
    }

    try {
      // Gebruik SDK client
      const result = await sdkClient.session.messages(args.sessionId, {
        limit: args.limit,
        offset: args.offset,
        includeToolCalls: args.includeToolCalls,
      });

      const messages = result.data?.messages || [];

      // Summarize for context efficiency
      const summary = {
        totalMessages: messages.length,
        userMessages: messages.filter((m: any) => m.role === "user").length,
        assistantMessages: messages.filter((m: any) => m.role === "assistant").length,
        toolCallsCount: messages.reduce(
          (sum: number, m: any) => sum + (m.toolCalls?.length || m.tool_calls?.length || 0),
          0
        ),
      };

      return {
        success: true,
        data: {
          sessionId: args.sessionId,
          messages: messages.map((m: any) => ({
            id: m.id,
            role: m.role,
            content: (m.content || "").slice(0, 1000) + ((m.content || "").length > 1000 ? "..." : ""),
            timestamp: m.timestamp || m.created_at,
            toolCalls: args.includeToolCalls ? (m.toolCalls || m.tool_calls) : undefined,
          })),
          summary,
          hasMore: result.data?.hasMore || result.data?.has_more || false,
        },
        metadata: {
          source: "opencode-sdk",
          limit: args.limit,
          offset: args.offset,
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          messages: [],
          error: error instanceof Error ? error.message : "Failed to read session",
          sessionId: args.sessionId,
        },
        metadata: {},
      };
    }
  }
).describe("Read messages from an OpenCode session. Uses SDK client - works with any port.");
