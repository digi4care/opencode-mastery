import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

type Deps = {
  now: () => Date;
};

export const createTimestampTool = (deps: Deps) =>
  tool(
    z.object({
      format: z.enum(['iso', 'unixMs']).default('iso').describe('Output format'),
    }),
    async (args) => {
      const d = deps.now();

      return {
        success: true,
        data: {
          timestamp: args.format === 'iso' ? d.toISOString() : d.getTime(),
        },
      };
    },
  ).describe('Return the current timestamp');

export const timestampTool = createTimestampTool({ now: () => new Date() });
