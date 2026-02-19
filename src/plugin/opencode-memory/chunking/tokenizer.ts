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
