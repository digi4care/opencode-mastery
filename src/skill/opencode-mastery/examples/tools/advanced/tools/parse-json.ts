import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

import { toErrorMessage } from '../utils/unknown-error';

export const parseJsonTool = tool(
  z.object({
    text: z.string().min(1).describe('JSON string to parse'),
  }),
  async (args) => {
    try {
      const value = JSON.parse(args.text) as unknown;
      const valueType = Array.isArray(value) ? 'array' : typeof value;

      return {
        success: true,
        data: { value },
        metadata: { valueType },
      };
    } catch (error) {
      return { success: false, error: toErrorMessage(error) };
    }
  },
).describe('Parse a JSON string safely');
