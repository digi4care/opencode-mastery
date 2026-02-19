/**
 * Shared types for model resolution pipeline
 *
 * @module @lib/config/types
 */

/**
 * Sources where a model can be defined (in priority order)
 */
export type ModelSource =
  | "cli" // 1️⃣ CLI flag (--model or -m)
  | "frontmatter" // 2️⃣ Markdown frontmatter (model: in .md files)
  | "user-override" // 3️⃣ JSON config (agent.model in opencode-mastery.json)
  | "inherited" // 4️⃣ Inherited from parent agent (subagents)
  | "system-default"; // 5️⃣ OpenCode's global default model

/**
 * Options for model resolution pipeline
 *
 * Priority order (highest to lowest):
 * 1. CLI flag (cliModel)
 * 2. Frontmatter (frontmatterModel)
 * 3. User config override (userModel)
 * 4. Inherited from parent (inheritedModel)
 * 5. System default (systemDefault)
 */
export interface ModelResolutionOptions {
  /** Model from CLI flag (--model or -m) */
  cliModel?: string;

  /** Model from markdown frontmatter (model: in YAML) */
  frontmatterModel?: string;

  /** Model from JSON config (agent.model) */
  userModel?: string;

  /** Model inherited from parent agent (for subagents) */
  inheritedModel?: string;

  /** OpenCode's global default model (required as ultimate fallback) */
  systemDefault: string;
}

/**
 * Result of model resolution with metadata
 */
export interface ModelResolutionResult {
  /** The resolved model identifier (e.g., "openai/gpt-4", "anthropic/claude-sonnet-4") */
  model: string;

  /** Where the model value came from */
  source: ModelSource;
}

/**
 * Parsed frontmatter from a markdown file
 */
export interface ParsedFrontmatter {
  /** Model specified in frontmatter */
  model?: string;

  /** Description from frontmatter */
  description?: string;

  /** Any other frontmatter fields */
  [key: string]: string | undefined;
}
