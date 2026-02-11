/**
 * Intermediate Tool Example
 *
 * Demonstrates:
 * - Multiple tools in one module
 * - Shared, pure utility functions
 * - Stable ToolResult-style returns (data + metadata)
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

type NormalizeOptions = {
  trim: boolean;
  collapseWhitespace: boolean;
  lowercase: boolean;
};

const normalizeTextCore = (text: string, opts: NormalizeOptions): string => {
  let result = text;

  if (opts.trim) result = result.trim();
  if (opts.collapseWhitespace) result = result.replace(/\s+/g, ' ');
  if (opts.lowercase) result = result.toLowerCase();

  return result;
};

const splitWords = (text: string): string[] => {
  const trimmed = text.trim();
  if (trimmed.length === 0) return [];
  return trimmed.split(/\s+/g);
};

export const normalizeText = tool(
  z.object({
    text: z.string().describe('Input text'),
    trim: z.boolean().default(true).describe('Trim leading/trailing whitespace'),
    collapseWhitespace: z.boolean().default(true).describe('Collapse runs of whitespace'),
    lowercase: z.boolean().default(false).describe('Convert to lowercase'),
  }),
  async (args) => {
    const normalized = normalizeTextCore(args.text, {
      trim: args.trim,
      collapseWhitespace: args.collapseWhitespace,
      lowercase: args.lowercase,
    });

    return {
      success: true,
      data: { normalized },
      metadata: {
        originalLength: args.text.length,
        normalizedLength: normalized.length,
      },
    };
  },
).describe('Normalize text (trim, collapse whitespace, lowercase)');

export const textStats = tool(
  z.object({
    text: z.string().describe('Input text'),
  }),
  async (args) => {
    const words = splitWords(args.text);
    const lines = args.text.length === 0 ? 0 : args.text.split('\n').length;

    return {
      success: true,
      data: {
        chars: args.text.length,
        words: words.length,
        lines,
      },
    };
  },
).describe('Compute simple text stats (chars, words, lines)');
