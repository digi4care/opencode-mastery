/**
 * Shared Configuration Library
 * 
 * Single source of truth for all OpenCode plugins and tools.
 * 
 * Usage:
 * ```typescript
 * import { loadConfig, isFeatureEnabled, getFeatureConfig } from "@lib/config";
 * 
 * // Load full config
 * const config = loadConfig();
 * 
 * // Check if feature is enabled
 * if (isFeatureEnabled("tdd")) {
 *   // TDD is enabled
 * }
 * 
 * // Get specific feature config
 * const tddConfig = getFeatureConfig("tdd");
 * if (tddConfig.block_without_test) {
 *   // Block writes without tests
 * }
 * ```
 */
export * from "./schema";
export * from "./loader";
export * from "./defaults";
export * from "./types";
export * from "./frontmatter-parser";
export * from "./model-resolver";
