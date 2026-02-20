/**
 * Simple token estimation for memory compaction.
 * Uses ~4 chars per token heuristic (reasonable approximation for GPT models).
 * No external dependencies - saves ~55MB RAM per OpenCode instance.
 */

const CHARS_PER_TOKEN = 4;

export function countTokens(text: string): number {
  if (!text) return 0;
  return Math.ceil(text.length / CHARS_PER_TOKEN);
}

export function truncateToTokens(text: string, maxTokens: number): string {
  if (!text) return "";
  const maxChars = maxTokens * CHARS_PER_TOKEN;
  if (text.length <= maxChars) return text;
  return text.slice(0, maxChars);
}

/**
 * Get semantic overlap from the end of text.
 * Returns the last N tokens of text for chunk overlap.
 */
export function getSemanticOverlap(text: string, overlapTokens: number): string {
  if (!text || overlapTokens <= 0) return "";
  const overlapChars = overlapTokens * CHARS_PER_TOKEN;
  if (text.length <= overlapChars) return text;
  return text.slice(-overlapChars);
}

/**
 * Get overlap text (alias for getSemanticOverlap for compatibility)
 */
export function getOverlapText(text: string, overlapTokens: number): string {
  return getSemanticOverlap(text, overlapTokens);
}

/**
 * Check if token count is within limit
 */
export function isWithinLimit(text: string, maxTokens: number): boolean {
  return countTokens(text) <= maxTokens;
}
