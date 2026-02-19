/**
 * Default Configuration Values
 * 
 * These defaults are used when:
 * - No config file exists
 * - Config file is missing fields
 * - Config validation fails
 */
import { OpenCodeConfig } from "./schema";

export const DEFAULT_CONFIG: OpenCodeConfig = {
  version: "1.0",
  project: {
    name: undefined,
    description: undefined,
    version: "1.0.0",
  },
  features: {
    memory: {
      enabled: true,
      lazyLoading: true,
      compaction: {
        enabled: true,
        max_size_kb: 50,
        keep_entries: 10,
      },
      types: {
        episodic: {
          enabled: false,
          retention: "30d",
        },
        semantic: {
          enabled: false,
          scope: "project",
        },
      },
      embeddings: {
        provider: "auto",
        model: null,
        batchSize: 100,
      },
      search: {
        hybrid: {
          enabled: true,
          vectorWeight: 0.7,
          textWeight: 0.3,
          candidateMultiplier: 4,
        },
        minScore: 0.35,
        maxResults: 10,
      },
      chunking: {
        tokens: 400,
        overlap: 80,
      },
      storage: {
        vector: {
          enabled: true,
        },
        cache: {
          enabled: true,
          maxEntries: 10000,
        },
      },
      intent: {
        enabled: true,
        languages: ["en", "nl", "de", "fr", "es"],
        confidenceThreshold: 0.7,
      },
      snapshots: {
        enabled: true,
        maxMessages: 15,
        maxContentLength: 500,
      },
    },
    docs: {
      enabled: true,
      context7: true,
      local_fallback: true,
      cache_ttl_days: 7,
      auto_download: false,
    },
    tdd: {
      enabled: true,
      enforce_on_write: true,
      block_without_test: true,
      verify_red_phase: true,
      check_git_order: false,
    },
    debugging: {
      enabled: true,
      auto_start_on_error: true,
      max_fix_attempts: 3,
      track_phases: true,
      require_test_before_fix: true,
    },
    playwright: {
      enabled: true,
      headless: false,
      screenshots: true,
      video: false,
      trace: false,
      default_timeout: 30000,
    },
    session: {
      enabled: true,
      server: {
        hostname: "127.0.0.1",
        port: 4096,
        auto_detect: true,
        timeout_ms: 5000,
      },
      track: {
        tool_calls: true,
        ai_responses: false,
        subagent_calls: true,
        file_changes: true,
      },
      storage: {
        max_sessions: 100,
        retention_days: 30,
      },
      ace: {
        max_subagent_depth: 2,
        auto_apply_suggestions: false,
        auto_analyze_on_end: false,
      },
    },
    flowAnalyzer: {
      enabled: true,
      register_agents: true,
      strict_default: false,
      max_gaps_reported: 50,
      agent_tool_mode: "scoped",
      framework_defaults: {
        gsd: true,
        generic: true,
      },
    },
  },
};
