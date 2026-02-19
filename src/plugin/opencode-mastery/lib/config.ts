/**
 * Config access for opencode-mastery plugin
 * 
 * Uses the shared config library at src/lib/config
 * This ensures all plugins use the same configuration source.
 */
export {
  loadConfig,
  getFeatures,
  isFeatureEnabled,
  getFeatureConfig,
  clearConfigCache,
  reloadConfig,
  type OpenCodeConfig,
  type FeaturesConfig,
  type MemoryConfig,
  type DocsConfig,
} from "../../../lib/config";
