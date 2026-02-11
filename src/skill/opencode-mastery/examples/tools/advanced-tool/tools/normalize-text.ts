import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

import { normalizeText } from '../utils/text';

export const normalizeTextTool = tool(
  z.object({
    text: z.string().describe('Input text'),
    trim: z.boolean().default(true).describe('Trim leading/trailing whitespace'),
    collapseWhitespace: z.boolean().default(true).describe('Collapse runs of whitespace'),
    lowercase: z.boolean().default(false).describe('Convert to lowercase'),
  }),
  async (args) => {
    const normalized = normalizeText(args.text, {
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
