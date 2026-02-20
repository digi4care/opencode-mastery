/**
 * Get memory database status
 * 
 * Reports provider availability, vector status, and chunk counts.
 * Never exposes sensitive information (API keys, raw config values).
 */
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";
import { getChunkCount, getFileCount } from "../../opencode-memory/sync";
import { isFeatureEnabled, getFeatureConfig } from "../../../lib/config";

type EmbeddingsProvider = "local" | "openai" | "gemini" | "voyage" | "none";

/**
 * Check if embeddings provider is available based on config and environment.
 * Does not expose API keys or sensitive details.
 */
function checkProviderAvailability(configuredProvider: string): {
  provider: EmbeddingsProvider;
  available: boolean;
} {
  const env = process.env;
  
  switch (configuredProvider) {
    case "openai":
      return {
        provider: "openai",
        available: !!(env.OPENAI_API_KEY || env.OPENAI_KEY),
      };
    case "gemini":
      return {
        provider: "gemini",
        available: !!(env.GEMINI_API_KEY || env.GOOGLE_AI_KEY),
      };
    case "voyage":
      return {
        provider: "voyage",
        available: !!(env.VOYAGE_API_KEY),
      };
    case "local":
      return {
        provider: "local",
        available: true, // Local provider doesn't need API keys
      };
    default:
      // Auto mode - check which providers are available
      if (env.OPENAI_API_KEY || env.OPENAI_KEY) {
        return { provider: "openai", available: true };
      }
      if (env.GEMINI_API_KEY || env.GOOGLE_AI_KEY) {
        return { provider: "gemini", available: true };
      }
      if (env.VOYAGE_API_KEY) {
        return { provider: "voyage", available: true };
      }
      // Fall back to local
      return { provider: "local", available: true };
  }
}

export const memoryDbStatus = tool(
  z.object({}), // No parameters
  async () => {
    try {
      // Check if memory is enabled
      const memoryEnabled = isFeatureEnabled("memory", "memory");
      
      if (!memoryEnabled) {
        return {
          success: true,
          data: {
            enabled: false,
            provider: "none" as EmbeddingsProvider,
            vectorAvailable: false,
            chunkCount: 0,
            fileCount: 0,
          },
          metadata: {},
        };
      }
      
      // Get memory config
      const config = getFeatureConfig("memory");
      const storageConfig = config.storage as { vector?: { enabled?: boolean } } | undefined;
      const embeddingsConfig = config.embeddings as { provider?: string } | undefined;
      
      // Check embeddings provider availability
      const providerSetting = embeddingsConfig?.provider || "auto";
      const { provider, available } = checkProviderAvailability(providerSetting);
      
      // Vector availability depends on embeddings being available and vector storage enabled
      const vectorStorageEnabled = storageConfig?.vector?.enabled !== false;
      const vectorAvailable = available && vectorStorageEnabled;
      
      // Get counts from database
      let chunkCount = 0;
      let fileCount = 0;
      
      try {
        chunkCount = getChunkCount();
        fileCount = getFileCount();
      } catch {
        // Database not initialized yet - counts remain 0
      }
      
      return {
        success: true,
        data: {
          enabled: true,
          provider,
          vectorAvailable,
          chunkCount,
          fileCount,
          lastSync: undefined, // TODO: track last sync timestamp
          // Don't expose databasePath in production to avoid leaking paths
        },
        metadata: {
          configuredProvider: providerSetting === "auto" ? "auto-detected" : providerSetting,
          vectorStorageEnabled,
        },
      };
    } catch (error) {
      // Graceful error handling - always return usable response
      const errorMessage = error instanceof Error ? error.message : String(error);
      
      return {
        success: false,
        error: `Failed to get memory status: ${errorMessage}`,
        data: {
          enabled: false,
          provider: "none" as EmbeddingsProvider,
          vectorAvailable: false,
          chunkCount: 0,
          fileCount: 0,
        },
        metadata: {},
      };
    }
  }
).describe("Check memory database status: provider availability, vector search status, and chunk counts.");
