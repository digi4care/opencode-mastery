/**
 * List OpenCode Sessions
 * 
 * Retrieves a list of available sessions via the OpenCode SDK client.
 * No port detection needed - uses the client from plugin context.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

// Client wordt via context doorgegeven
let sdkClient: any = null;

export function setSessionClient(client: any): void {
  sdkClient = client;
}

export const sessionList = tool(
  z.object({
    limit: z.number().min(1).max(100).default(20).describe("Maximum number of sessions to return"),
    offset: z.number().min(0).default(0).describe("Offset for pagination"),
    projectId: z.string().optional().describe("Filter by project ID"),
  }),
  async (args) => {
    if (!sdkClient) {
      return {
        success: false,
        data: {
          sessions: [],
          error: "SDK client not initialized",
        },
        metadata: {},
      };
    }

    try {
      // Gebruik SDK client - deze weet al de juiste server/poort
      const result = await sdkClient.session.list({
        limit: args.limit,
        offset: args.offset,
        projectId: args.projectId,
      });

      const sessions = result.data?.sessions || [];

      return {
        success: true,
        data: {
          sessions: sessions.map((s: any) => ({
            id: s.id,
            title: s.title || "Untitled",
            projectId: s.projectId,
            createdAt: s.createdAt || s.created_at,
            updatedAt: s.updatedAt || s.updated_at,
            messageCount: s.messageCount || s.message_count,
          })),
          total: result.data?.total || sessions.length,
          limit: args.limit,
          offset: args.offset,
        },
        metadata: {
          source: "opencode-sdk",
        },
      };
    } catch (error) {
      return {
        success: false,
        data: {
          sessions: [],
          error: error instanceof Error ? error.message : "Failed to list sessions",
        },
        metadata: {},
      };
    }
  }
).describe("List available OpenCode sessions. Uses SDK client - works with any port.");
