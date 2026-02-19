/**
 * Read OpenCode Session Messages
 * 
 * Retrieves messages and content from a specific session.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { openCodeRequest } from "../lib/server";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  toolCalls?: Array<{
    name: string;
    input: Record<string, unknown>;
    output?: unknown;
  }>;
}

interface SessionReadResponse {
  sessionId: string;
  messages: Message[];
  hasMore: boolean;
}

export const sessionRead = tool(
  z.object({
    sessionId: z.string().describe("Session ID to read"),
    limit: z.number().min(1).max(500).default(100).describe("Maximum messages to return"),
    includeToolCalls: z.boolean().default(true).describe("Include tool call details"),
    offset: z.number().min(0).default(0).describe("Message offset for pagination"),
  }),
  async (args) => {
    // Build query string
    const params = new URLSearchParams();
    params.set("limit", String(args.limit));
    params.set("offset", String(args.offset));
    params.set("includeToolCalls", String(args.includeToolCalls));
    
    // Request session messages from OpenCode server
    const result = await openCodeRequest<SessionReadResponse>(
      `/session/${args.sessionId}/message?${params.toString()}`
    );
    
    if (!result.success) {
      return {
        success: false,
        data: {
          messages: [],
          error: result.error || "Failed to read session",
          sessionId: args.sessionId,
        },
        metadata: {},
      };
    }
    
    const messages = result.data?.messages || [];
    
    // Summarize for context efficiency
    const summary = {
      totalMessages: messages.length,
      userMessages: messages.filter(m => m.role === "user").length,
      assistantMessages: messages.filter(m => m.role === "assistant").length,
      toolCallsCount: messages.reduce(
        (sum, m) => sum + (m.toolCalls?.length || 0),
        0
      ),
    };
    
    return {
      success: true,
      data: {
        sessionId: args.sessionId,
        messages: messages.map(m => ({
          id: m.id,
          role: m.role,
          content: m.content.slice(0, 1000) + (m.content.length > 1000 ? "..." : ""),
          timestamp: m.timestamp,
          toolCalls: args.includeToolCalls ? m.toolCalls : undefined,
        })),
        summary,
        hasMore: result.data?.hasMore || false,
      },
      metadata: {
        limit: args.limit,
        offset: args.offset,
      },
    };
  }
).describe("Read messages from an OpenCode session. Use to analyze conversation history and understand what happened during a session.");
