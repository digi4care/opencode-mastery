/**
 * Minimal Tool Example
 *
 * This file demonstrates the smallest useful custom tool using:
 * - Zod schema validation
 * - The `tool()` helper from `@opencode-ai/plugin`
 * - A stable ToolResult-style return shape
 *
 * Intended usage: import this tool into a plugin and register it via `tool: [echoText]`.
 */

import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

export const echoText = tool(
  z.object({
    text: z.string().min(1).describe('Text to echo'),
    uppercase: z.boolean().default(false).describe('Uppercase the echoed text'),
  }),
  async (args) => {
    const echoed = args.uppercase ? args.text.toUpperCase() : args.text;

    return {
      success: true,
      data: { echoed },
      metadata: { length: echoed.length, uppercaseApplied: args.uppercase },
    };
  },
).describe('Echo back a string');
