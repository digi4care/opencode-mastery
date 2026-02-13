import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

import { getTextStats } from '../utils/text';

export const textStatsTool = tool(
  z.object({
    text: z.string().describe('Input text'),
  }),
  async (args) => {
    return {
      success: true,
      data: getTextStats(args.text),
    };
  },
).describe('Compute simple text stats (chars, words, lines)');
