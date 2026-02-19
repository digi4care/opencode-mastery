/**
 * Model Resolution Pipeline - Resolve which model to use for agents/features
 *
 * Implements a 5-level priority pipeline for model resolution:
 * 1. CLI flag (--model or -m)
 * 2. Markdown frontmatter (model: in .md files)
 * 3. JSON config (agent.model in opencode-mastery.json)
 * 4. Inherited from parent agent (subagents)
 * 5. System default (OpenCode's active model)
 *
 * Based on oh-my-opencode's model resolution pattern.
 *
 * @module @lib/config/model-resolver
 */

import type {
  ModelResolutionOptions,
  ModelResolutionResult,
  ModelSource,
} from "./types";

/**
 * Normalize a model string (trim whitespace, return undefined if empty).
 */
function normalizeModel(model: string | undefined): string | undefined {
  if (model === undefined) {
    return undefined;
  }

  const trimmed = model.trim();
  return trimmed === "" ? undefined : trimmed;
}

/**
 * Resolve which model to use with the full 5-level priority pipeline.
 *
 * Priority order (highest to lowest):
 * 1. CLI flag (cliModel) - explicit CLI override
 * 2. Frontmatter (frontmatterModel) - from markdown file
 * 3. User config (userModel) - from JSON config
 * 4. Inherited (inheritedModel) - from parent agent
 * 5. System default (systemDefault) - ultimate fallback
 *
 * @param options - Resolution options
 * @returns The resolved model string
 *
 * @example
 * ```typescript
 * // Simple case - just system default
 * resolveModel({ systemDefault: "zai-coding-plan/glm-5" })
 * // Returns: "zai-coding-plan/glm-5"
 *
 * // With user override
 * resolveModel({
 *   userModel: "openai/gpt-4",
 *   systemDefault: "zai-coding-plan/glm-5"
 * })
 * // Returns: "openai/gpt-4"
 *
 * // Full pipeline
 * resolveModel({
 *   cliModel: "anthropic/claude-sonnet-4",
 *   frontmatterModel: "openai/gpt-4",
 *   userModel: "openai/gpt-3.5-turbo",
 *   inheritedModel: "google/gemini-pro",
 *   systemDefault: "zai-coding-plan/glm-5"
 * })
 * // Returns: "anthropic/claude-sonnet-4" (CLI wins)
 * ```
 */
export function resolveModel(options: ModelResolutionOptions): string {
  // 1️⃣ CLI flag (highest priority)
  const cliModel = normalizeModel(options.cliModel);
  if (cliModel !== undefined) {
    return cliModel;
  }

  // 2️⃣ Frontmatter from markdown file
  const frontmatterModel = normalizeModel(options.frontmatterModel);
  if (frontmatterModel !== undefined) {
    return frontmatterModel;
  }

  // 3️⃣ User config override (JSON config)
  const userModel = normalizeModel(options.userModel);
  if (userModel !== undefined) {
    return userModel;
  }

  // 4️⃣ Inherited from parent agent
  const inheritedModel = normalizeModel(options.inheritedModel);
  if (inheritedModel !== undefined) {
    return inheritedModel;
  }

  // 5️⃣ System default (ultimate fallback)
  return options.systemDefault;
}

/**
 * Resolve model with detailed result (includes source metadata).
 *
 * Same logic as resolveModel() but returns additional information
 * about where the model value came from.
 *
 * @param options - Resolution options
 * @returns Detailed result with model and source
 *
 * @example
 * ```typescript
 * const result = resolveModelWithSource({
 *   userModel: "openai/gpt-4",
 *   systemDefault: "zai-coding-plan/glm-5"
 * });
 *
 * console.log(result);
 * // { model: "openai/gpt-4", source: "user-override" }
 * ```
 */
export function resolveModelWithSource(
  options: ModelResolutionOptions,
): ModelResolutionResult {
  // Check each source in priority order
  const sources: Array<{ value: string | undefined; source: ModelSource }> = [
    { value: options.cliModel, source: "cli" },
    { value: options.frontmatterModel, source: "frontmatter" },
    { value: options.userModel, source: "user-override" },
    { value: options.inheritedModel, source: "inherited" },
  ];

  for (const { value, source } of sources) {
    const normalized = normalizeModel(value);
    if (normalized !== undefined) {
      return { model: normalized, source };
    }
  }

  // Ultimate fallback
  return { model: options.systemDefault, source: "system-default" };
}

/**
 * Create a partial options object with CLI model.
 * Helper for building options incrementally.
 *
 * @param model - Model from CLI
 * @returns Partial options object
 */
export function withCliModel(model: string | undefined): {
  cliModel?: string;
} {
  return model !== undefined ? { cliModel: model } : {};
}

/**
 * Create a partial options object with frontmatter model.
 * Helper for building options incrementally.
 *
 * @param model - Model from frontmatter
 * @returns Partial options object
 */
export function withFrontmatterModel(model: string | undefined): {
  frontmatterModel?: string;
} {
  return model !== undefined ? { frontmatterModel: model } : {};
}

/**
 * Create a partial options object with user config model.
 * Helper for building options incrementally.
 *
 * @param model - Model from JSON config
 * @returns Partial options object
 */
export function withUserModel(model: string | undefined): {
  userModel?: string;
} {
  return model !== undefined ? { userModel: model } : {};
}

/**
 * Create a partial options object with inherited model.
 * Helper for building options incrementally.
 *
 * @param model - Model from parent agent
 * @returns Partial options object
 */
export function withInheritedModel(model: string | undefined): {
  inheritedModel?: string;
} {
  return model !== undefined ? { inheritedModel: model } : {};
}

/**
 * Build complete options from partials.
 * Useful when gathering model sources from different places.
 *
 * @param partials - Array of partial option objects
 * @param systemDefault - The required system default model
 * @returns Complete options object
 *
 * @example
 * ```typescript
 * const options = buildOptions(
 *   withCliModel(process.env.CLI_MODEL),
 *   withUserModel(config.agent?.model),
 *   context.model  // system default
 * );
 *
 * const model = resolveModel(options);
 * ```
 */
export function buildOptions(
  ...partials: Array<Partial<ModelResolutionOptions> & { systemDefault?: string }>
): ModelResolutionOptions {
  const merged: Partial<ModelResolutionOptions> = {};

  let systemDefault: string | undefined;

  for (const partial of partials) {
    // Extract systemDefault separately
    if (partial.systemDefault !== undefined) {
      systemDefault = partial.systemDefault;
    }

    // Merge other fields
    Object.assign(merged, partial);
  }

  if (systemDefault === undefined) {
    throw new Error("systemDefault is required for model resolution");
  }

  return {
    cliModel: merged.cliModel,
    frontmatterModel: merged.frontmatterModel,
    userModel: merged.userModel,
    inheritedModel: merged.inheritedModel,
    systemDefault,
  };
}
