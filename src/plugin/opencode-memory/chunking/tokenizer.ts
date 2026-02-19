/**
 * Token counting utilities using gpt-tokenizer with cl100k_base encoding.
 * This encoding matches GPT-4/GPT-4o tokenization for accurate chunk sizing.
 */
import { encode, decode, isWithinTokenLimit } from "gpt-tokenizer/cl100k_base";

/**
 * Count the number of tokens in a text string.
 * Uses cl100k_base encoding (GPT-4/GPT-4o compatible).
 */
export function countTokens(text: string): number {
  return encode(text).length;
}

/**
 * Extract the last N tokens from text as a string.
 * Used for sentence-based overlap between chunks.
 * 
 * @param text - Source text
 * @param maxTokens - Maximum tokens to extract
 * @returns Text containing the last maxTokens tokens
 */
export function getOverlapText(text: string, maxTokens: number): string {
  const tokens = encode(text);
  if (tokens.length <= maxTokens) return text;

  // Get last N tokens
  const overlapTokens = tokens.slice(-maxTokens);
  return decode(overlapTokens);
}

/**
 * Check if text is within a token limit.
 * Returns true if within limit, false if exceeded, or the actual count if needed.
 * 
 * @param text - Text to check
 * @param limit - Maximum tokens allowed
 * @returns true if within limit, false otherwise
 */
export function isWithinLimit(text: string, limit: number): boolean {
  return isWithinTokenLimit(text, limit) !== false;
}

/**
 * Get the last complete sentences from text within token limit.
 * Used for semantic overlap that doesn't break mid-sentence.
 * 
 * @param text - Source text
 * @param maxTokens - Maximum tokens for overlap
 * @returns Last complete sentences within token limit
 */
export function getSemanticOverlap(text: string, maxTokens: number): string {
  const overlapText = getOverlapText(text, maxTokens);

  // Find sentence boundaries (., !, ? followed by space or end)
  const sentences = overlapText.match(/.*?[.!?](?:\s|$)/g);

  if (sentences && sentences.length > 0) {
    // Return last 1-2 complete sentences
    return sentences.slice(-2).join("").trim();
  }

  // No sentence boundary found, return as-is
  return overlapText.trim();
}
