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

// All features
export const FeaturesConfigSchema = z.object({
  memory: MemoryConfigSchema.default({}),
  docs: DocsConfigSchema.default({}),
  tdd: TDDConfigSchema.default({}),
  debugging: DebugConfigSchema.default({}),
  playwright: PlaywrightConfigSchema.default({}),
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
export type FeaturesConfig = z.infer<typeof FeaturesConfigSchema>;
export type ProjectConfig = z.infer<typeof ProjectConfigSchema>;
export type OpenCodeConfig = z.infer<typeof OpenCodeConfigSchema>;
