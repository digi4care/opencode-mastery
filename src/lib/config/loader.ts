/**
 * Configuration Loader
 * 
 * Loads opencode.config.yaml from project root and provides
 * typed access to all configuration options.
 */
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { parse } from "yaml";
import { OpenCodeConfigSchema, OpenCodeConfig, FeaturesConfig } from "./schema";
import { DEFAULT_CONFIG } from "./defaults";

const CONFIG_FILE = "opencode.config.yaml";

let cachedConfig: OpenCodeConfig | null = null;

/**
 * Find the project root directory
 */
export function findProjectRoot(startPath: string = process.cwd()): string | null {
  let currentPath = startPath;
  
  while (currentPath !== "/") {
    const configPath = join(currentPath, CONFIG_FILE);
    if (existsSync(configPath)) {
      return currentPath;
    }
    currentPath = join(currentPath, "..");
  }
  
  return null;
}

/**
 * Load configuration from file
 */
export function loadConfig(projectPath?: string): OpenCodeConfig {
  if (cachedConfig) {
    return cachedConfig;
  }
  
  const root = projectPath || findProjectRoot();
  
  if (!root) {
    console.log("No opencode.config.yaml found, using defaults");
    cachedConfig = DEFAULT_CONFIG;
    return cachedConfig;
  }
  
  const configPath = join(root, CONFIG_FILE);
  
  if (!existsSync(configPath)) {
    console.log("Config file not found, using defaults");
    cachedConfig = DEFAULT_CONFIG;
    return cachedConfig;
  }
  
  try {
    const content = readFileSync(configPath, "utf-8");
    const rawConfig = parse(content);
    
    // Validate and apply defaults
    const result = OpenCodeConfigSchema.safeParse(rawConfig);
    
    if (!result.success) {
      console.error("Config validation errors:", result.error.errors);
      console.log("Using default config due to validation errors");
      cachedConfig = DEFAULT_CONFIG;
      return cachedConfig;
    }
    
    // Merge with defaults
    cachedConfig = {
      ...DEFAULT_CONFIG,
      ...result.data,
      features: {
        ...DEFAULT_CONFIG.features,
        ...result.data.features,
      },
    };
    
    return cachedConfig;
  } catch (error) {
    console.error("Failed to load config:", error);
    cachedConfig = DEFAULT_CONFIG;
    return cachedConfig;
  }
}

/**
 * Get features configuration
 */
export function getFeatures(projectPath?: string): FeaturesConfig {
  const config = loadConfig(projectPath);
  return config.features;
}

/**
 * Check if a feature is enabled
 */
export function isFeatureEnabled(
  feature: keyof FeaturesConfig,
  projectPath?: string
): boolean {
  const features = getFeatures(projectPath);
  return features[feature]?.enabled ?? false;
}

/**
 * Get specific feature config
 */
export function getFeatureConfig<K extends keyof FeaturesConfig>(
  feature: K,
  projectPath?: string
): FeaturesConfig[K] {
  const features = getFeatures(projectPath);
  return features[feature];
}

/**
 * Clear config cache (useful after config changes)
 */
export function clearConfigCache(): void {
  cachedConfig = null;
}

/**
 * Reload config from file
 */
export function reloadConfig(projectPath?: string): OpenCodeConfig {
  clearConfigCache();
  return loadConfig(projectPath);
}
