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
  },
};
