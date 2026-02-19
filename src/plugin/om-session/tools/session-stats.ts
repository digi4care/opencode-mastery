/**
 * Get OpenCode Session Statistics
 * 
 * Provides statistics and insights about sessions.
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { openCodeRequest, getServerConfig } from "../lib/server";

interface SessionStats {
  totalSessions: number;
  totalMessages: number;
  averageMessagesPerSession: number;
  oldestSession: string;
  newestSession: string;
  topTools: Array<{ name: string; count: number }>;
  sessionsPerDay: Array<{ date: string; count: number }>;
}

interface StatsResponse {
  stats: SessionStats;
}

export const sessionStats = tool(
  z.object({
    projectId: z.string().optional().describe("Filter by project ID"),
    days: z.number().min(1).max(365).default(30).describe("Number of days to analyze"),
  }),
  async (args) => {
    // Build query string
    const params = new URLSearchParams();
    params.set("days", String(args.days));
    if (args.projectId) {
      params.set("projectId", args.projectId);
    }
    
    // Request stats from OpenCode server
    const result = await openCodeRequest<StatsResponse>(
      `/session/stats?${params.toString()}`
    );
    
    if (!result.success) {
      // Return basic stats if server doesn't support stats endpoint
      return {
        success: true,
        data: {
          serverStatus: "limited",
          message: "Statistics endpoint not available on this OpenCode version",
          config: getServerConfig(),
        },
        metadata: {
          error: result.error,
        },
      };
    }
    
    const stats = result.data?.stats;
    
    if (!stats) {
      return {
        success: false,
        data: {
          error: "No statistics available",
        },
        metadata: {},
      };
    }
    
    return {
      success: true,
      data: {
        totalSessions: stats.totalSessions,
        totalMessages: stats.totalMessages,
        averageMessagesPerSession: Math.round(stats.averageMessagesPerSession),
        dateRange: {
          oldest: stats.oldestSession,
          newest: stats.newestSession,
          daysAnalyzed: args.days,
        },
        topTools: stats.topTools?.slice(0, 10) || [],
        sessionsPerDay: stats.sessionsPerDay?.slice(-7) || [], // Last 7 days
      },
      metadata: {
        projectId: args.projectId || "all",
      },
    };
  }
).describe("Get statistics about OpenCode sessions. Use to understand usage patterns and session activity.");
