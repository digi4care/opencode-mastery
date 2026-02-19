/**
 * Features Index
 * 
 * Central exports for all feature modules.
 * Provides unified access to all tools.
 * 
 * Usage:
 *   import { session, debugging, tdd } from "./features";
 * 
 * Or import individual features:
 *   import { session } from "./features/session";
 */
export { feature as sessionFeature } from "./session";
export { feature as debuggingFeature } from "./debugging";
export { feature as tddFeature } from "./tdd";
export { feature as flowFeature } from "./flow";
export { feature as repoFeature } from "./repo";
export { feature as memoryFeature } from "./memory";

/**
 * All features metadata
 */
export const allFeatures = [
  require("./session").feature,
  require("./debugging").feature,
  require("./tdd").feature,
  require("./flow").feature,
  require("./repo").feature,
  require("./memory").feature,
];

/**
 * Get feature by name
 */
export function getFeature(name: string) {
  const map: Record<string, any> = {
    session: require("./session"),
    debugging: require("./debugging"),
    tdd: require("./tdd"),
    flow: require("./flow"),
    repo: require("./repo"),
    memory: require("./memory"),
  };
  return map[name] || null;
}
