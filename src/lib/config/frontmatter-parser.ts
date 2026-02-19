/**
 * Frontmatter Parser - Extract YAML frontmatter from markdown files
 *
 * Parses the YAML frontmatter block at the start of markdown files:
 * ---
 * model: openai/gpt-4
 * description: My agent
 * ---
 *
 * @module @lib/config/frontmatter-parser
 */

import type { ParsedFrontmatter } from "./types";

/**
 * Regex pattern to match YAML frontmatter block
 * Matches content between --- delimiters at the start of a file
 */
const FRONTMATTER_REGEX = /^---\s*\n([\s\S]*?)\n---\s*\n/;

/**
 * Parse YAML frontmatter from markdown content.
 *
 * @param content - The full markdown file content
 * @returns Parsed frontmatter object, or empty object if no frontmatter
 *
 * @example
 * ```typescript
 * const content = `---
 * model: openai/gpt-4
 * description: Code reviewer
 * ---
 *
 * # My Agent
 * `;
 *
 * const fm = parseFrontmatter(content);
 * // { model: "openai/gpt-4", description: "Code reviewer" }
 * ```
 */
export function parseFrontmatter(content: string): ParsedFrontmatter {
  const match = content.match(FRONTMATTER_REGEX);

  if (!match) {
    return {};
  }

  const frontmatterText = match[1];
  const result: ParsedFrontmatter = {};

  // Simple YAML parsing (key: value pairs)
  // Supports basic string values, no nested structures
  const lines = frontmatterText.split("\n");

  for (const line of lines) {
    const colonIndex = line.indexOf(":");

    if (colonIndex === -1) {
      continue;
    }

    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    // Remove quotes if present
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (key && value !== undefined) {
      result[key] = value;
    }
  }

  return result;
}

/**
 * Extract the model from frontmatter if present.
 *
 * @param content - The full markdown file content
 * @returns The model string, or undefined if not found
 *
 * @example
 * ```typescript
 * const model = extractModelFromFrontmatter(content);
 * // "openai/gpt-4" or undefined
 * ```
 */
export function extractModelFromFrontmatter(
  content: string,
): string | undefined {
  const frontmatter = parseFrontmatter(content);
  return frontmatter.model;
}

/**
 * Check if content has frontmatter.
 *
 * @param content - The markdown content to check
 * @returns true if frontmatter block exists
 */
export function hasFrontmatter(content: string): boolean {
  return FRONTMATTER_REGEX.test(content);
}

/**
 * Strip frontmatter from markdown content.
 *
 * @param content - The markdown content with potential frontmatter
 * @returns Content without the frontmatter block
 *
 * @example
 * ```typescript
 * const body = stripFrontmatter(content);
 * // Returns just the markdown body without --- block
 * ```
 */
export function stripFrontmatter(content: string): string {
  return content.replace(FRONTMATTER_REGEX, "");
}
