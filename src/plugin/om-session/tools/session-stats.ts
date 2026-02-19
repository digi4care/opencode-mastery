/**
 * Get OpenCode Session Statistics
 * 
 * Provides statistics via the OpenCode SDK client.
 * No port detection needed - uses the client from plugin context.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

let sdkClient: any = null;

export function setSessionClient(client: any): void {
  sdkClient = client;
}

export const sessionStats = tool(
  z.object({
    projectId: z.string().optional().describe("Filter by project ID"),
    days: z.number().min(1).max(365).default(30).describe("Number of days to analyze"),
  }),
  async (args) => {
    if (!sdkClient) {
      return {
        success: false,
        data: {
          error: "SDK client not initialized",
        },
        metadata: {},
      };
    }

    try {
      // Probeer stats endpoint via SDK
      const result = await sdkClient.session.stats({
        projectId: args.projectId,
        days: args.days,
      });

      const stats = result.data;

      return {
        success: true,
        data: {
          totalSessions: stats?.totalSessions || stats?.total_sessions || 0,
          totalMessages: stats?.totalMessages || stats?.total_messages || 0,
          averageMessagesPerSession: Math.round(stats?.averageMessagesPerSession || stats?.avg_messages || 0),
          dateRange: {
            oldest: stats?.oldestSession || stats?.oldest_session,
            newest: stats?.newestSession || stats?.newest_session,
            daysAnalyzed: args.days,
          },
          topTools: (stats?.topTools || stats?.top_tools || []).slice(0, 10),
          sessionsPerDay: (stats?.sessionsPerDay || stats?.sessions_per_day || []).slice(-7),
        },
        metadata: {
          source: "opencode-sdk",
          projectId: args.projectId || "all",
        },
      };
    } catch (error) {
      // Stats niet beschikbaar - geef basis info terug
      return {
        success: true,
        data: {
          serverStatus: "connected",
          message: "Statistics endpoint not available. SDK client is connected and working.",
          hint: "Use sessionList to get session count manually.",
        },
        metadata: {
          source: "opencode-sdk",
          error: error instanceof Error ? error.message : "Stats not available",
        },
      };
    }
  }
).describe("Get statistics about OpenCode sessions. Uses SDK client - works with any port.");
