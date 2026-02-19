/**
 * OpenCode Configuration Schema
 * 
 * Single source of truth for all features, plugins, and settings.
 * This schema defines all available configuration options.
 */
import { z } from "zod";

// Feature: Memory
export const MemoryConfigSchema = z.object({
  enabled: z.boolean().default(true),
  lazyLoading: z.boolean().default(true),
  compaction: z.object({
    enabled: z.boolean().default(true),
    max_size_kb: z.number().default(50),
    keep_entries: z.number().default(10),
  }).default({}),
  types: z.object({
    episodic: z.object({
      enabled: z.boolean().default(false),
      retention: z.string().default("30d"),
    }).default({}),
    semantic: z.object({
      enabled: z.boolean().default(false),
      scope: z.enum(["project", "global"]).default("project"),
    }).default({}),
  }).default({}),
  embeddings: z.object({
    provider: z.enum(["auto", "local", "openai", "gemini", "voyage"]).default("auto"),
    model: z.string().nullable().default(null),
    batchSize: z.number().int().min(1).max(1000).default(100),
  }).default({}),
  search: z.object({
    hybrid: z.object({
      enabled: z.boolean().default(true),
      vectorWeight: z.number().min(0).max(1).default(0.7),
      textWeight: z.number().min(0).max(1).default(0.3),
      candidateMultiplier: z.number().int().min(1).default(4),
    }).default({}),
    minScore: z.number().min(0).max(1).default(0.35),
    maxResults: z.number().int().min(1).max(100).default(10),
  }).default({}),
  chunking: z.object({
    tokens: z.number().int().min(50).max(2000).default(400),
    overlap: z.number().int().min(0).max(500).default(80),
  }).default({}),
  storage: z.object({
    vector: z.object({
      enabled: z.boolean().default(true),
    }).default({}),
    cache: z.object({
      enabled: z.boolean().default(true),
      maxEntries: z.number().int().min(100).max(100000).default(10000),
    }).default({}),
  }).default({}),
  intent: z.object({
    enabled: z.boolean().default(true),
    languages: z.array(z.enum(["en", "nl", "de", "fr", "es"])).default(["en", "nl", "de", "fr", "es"]),
    confidenceThreshold: z.number().min(0).max(1).default(0.7),
  }).default({}),
  snapshots: z.object({
    enabled: z.boolean().default(true),
    maxMessages: z.number().int().min(1).max(100).default(15),
    maxContentLength: z.number().int().min(100).max(10000).default(500),
  }).default({}),
});

// Feature: Documentation
export const DocsConfigSchema = z.object({
  enabled: z.boolean().default(true),
  context7: z.boolean().default(true),
  local_fallback: z.boolean().default(true),
  cache_ttl_days: z.number().default(7),
  auto_download: z.boolean().default(false),
});

// Feature: TDD Enforcer
export const TDDConfigSchema = z.object({
  enabled: z.boolean().default(true),
  enforce_on_write: z.boolean().default(true),
  block_without_test: z.boolean().default(true),
  verify_red_phase: z.boolean().default(true),
  check_git_order: z.boolean().default(false),
});

// Feature: Debug Assistant
export const DebugConfigSchema = z.object({
  enabled: z.boolean().default(true),
  auto_start_on_error: z.boolean().default(true),
  max_fix_attempts: z.number().default(3),
  track_phases: z.boolean().default(true),
  require_test_before_fix: z.boolean().default(true),
});

// Feature: Playwright
export const PlaywrightConfigSchema = z.object({
  enabled: z.boolean().default(true),
  headless: z.boolean().default(false),
  screenshots: z.boolean().default(true),
  video: z.boolean().default(false),
  trace: z.boolean().default(false),
  default_timeout: z.number().default(30000),
});

// Feature: Session Manager (uses SDK client - no port config needed!)
export const SessionConfigSchema = z.object({
  enabled: z.boolean().default(true),
  // No server config needed - SDK client is already connected
  track: z.object({
    tool_calls: z.boolean().default(true),
    ai_responses: z.boolean().default(false),
    subagent_calls: z.boolean().default(true),
    file_changes: z.boolean().default(true),
  }).default({}),
  storage: z.object({
    max_sessions: z.number().default(100),
    retention_days: z.number().default(30),
  }).default({}),
  auto_analyze: z.object({
    on_session_end: z.boolean().default(false),
    interval_minutes: z.number().default(0),
  }).default({}),
  ace: z.object({
    max_subagent_depth: z.number().default(2),
    auto_apply_suggestions: z.boolean().default(false),
  }).default({}),
});

// Feature: Flow Analyzer
export const FlowAnalyzerConfigSchema = z.object({
  enabled: z.boolean().default(true),
  register_agents: z.boolean().default(true),
  strict_default: z.boolean().default(false),
  max_gaps_reported: z.number().int().min(1).default(50),
  agent_tool_mode: z.enum(["scoped", "all"]).default("scoped"),
  framework_defaults: z.object({
    gsd: z.boolean().default(true),
    generic: z.boolean().default(true),
  }).default({}),
});

// All features
export const FeaturesConfigSchema = z.object({
  memory: MemoryConfigSchema.default({}),
  docs: DocsConfigSchema.default({}),
  tdd: TDDConfigSchema.default({}),
  debugging: DebugConfigSchema.default({}),
  playwright: PlaywrightConfigSchema.default({}),
  session: SessionConfigSchema.default({}),
  flowAnalyzer: FlowAnalyzerConfigSchema.default({}),
});

// Project metadata
export const ProjectConfigSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  version: z.string().default("1.0.0"),
});

// Full config schema
export const OpenCodeConfigSchema = z.object({
  version: z.string().default("1.0"),
  project: ProjectConfigSchema.default({}),
  features: FeaturesConfigSchema.default({}),
});

// Export types
export type MemoryConfig = z.infer<typeof MemoryConfigSchema>;
export type DocsConfig = z.infer<typeof DocsConfigSchema>;
export type TDDConfig = z.infer<typeof TDDConfigSchema>;
export type DebugConfig = z.infer<typeof DebugConfigSchema>;
export type PlaywrightConfig = z.infer<typeof PlaywrightConfigSchema>;
export type SessionConfig = z.infer<typeof SessionConfigSchema>;
export type FlowAnalyzerConfig = z.infer<typeof FlowAnalyzerConfigSchema>;
export type FeaturesConfig = z.infer<typeof FeaturesConfigSchema>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
export type OpenCodeConfig = z.infer<typeof OpenCodeConfigSchema>;
