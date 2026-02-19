/**
 * List OpenCode Sessions
 * 
 * Retrieves a list of available sessions from the OpenCode server.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { openCodeRequest, getServerConfig } from "../lib/server";

interface SessionInfo {
  id: string;
  projectId?: string;
  title?: string;
  createdAt: string;
  updatedAt: string;
  messageCount?: number;
}

interface SessionListResponse {
  sessions: SessionInfo[];
  total: number;
}

export const sessionList = tool(
  z.object({
    limit: z.number().min(1).max(100).default(20).describe("Maximum number of sessions to return"),
    offset: z.number().min(0).default(0).describe("Offset for pagination"),
    projectId: z.string().optional().describe("Filter by project ID"),
  }),
  async (args) => {
    // Build query string
    const params = new URLSearchParams();
    params.set("limit", String(args.limit));
    params.set("offset", String(args.offset));
    if (args.projectId) {
      params.set("projectId", args.projectId);
    }
    
    // Request sessions from OpenCode server
    const result = await openCodeRequest<SessionListResponse>(
      `/session?${params.toString()}`
    );
    
    if (!result.success) {
      return {
        success: false,
        data: {
          sessions: [],
          error: result.error || "Failed to connect to OpenCode server",
          serverHint: `Make sure OpenCode is running on port ${getServerConfig().port}`,
        },
        metadata: {},
      };
    }
    
    const sessions = result.data?.sessions || [];
    
    return {
      success: true,
      data: {
        sessions: sessions.map(s => ({
          id: s.id,
          title: s.title || "Untitled",
          projectId: s.projectId,
          createdAt: s.createdAt,
          updatedAt: s.updatedAt,
          messageCount: s.messageCount,
        })),
        total: result.data?.total || sessions.length,
        limit: args.limit,
        offset: args.offset,
      },
      metadata: {
        serverUrl: await import("../lib/server").then(m => m.getOpenCodeServerUrl()),
      },
    };
  }
).describe("List available OpenCode sessions. Use to see session history and find specific sessions to analyze.");
