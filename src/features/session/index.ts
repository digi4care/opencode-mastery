/**
 * Session Feature Module
 * 
 * Central exports for all session-related tools.
 * Re-exports from plugin for modular import paths.
 * 
 * Usage:
 *   import { sessionList, sessionRead } from "../../features/session";
 */
export * from "../../plugin/om-session/tools/session-list";
export * from "../../plugin/om-session/tools/session-read";
export * from "../../plugin/om-session/tools/session-search";
export * from "../../plugin/om-session/tools/session-stats";

/**
 * Feature metadata
 */
export const feature = {
  name: "session",
  description: "Session management tools",
  tools: ["session-list", "session-read", "session-search", "session-stats"],
  plugin: "om-session",
};
