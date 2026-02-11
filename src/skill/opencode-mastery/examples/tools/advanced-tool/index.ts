/**
 * Advanced Tool Example
 *
 * Demonstrates:
 * - Multi-file toolset (`tools/` + `utils/`)
 * - Pure utilities for testability
 * - A factory-style tool (dependency injection)
 * - Consistent ToolResult-style returns
 */

import { normalizeTextTool } from './tools/normalize-text';
import { parseJsonTool } from './tools/parse-json';
import { textStatsTool } from './tools/text-stats';
import { timestampTool } from './tools/timestamp';

export { normalizeTextTool, parseJsonTool, textStatsTool, timestampTool };

export const toolset = [normalizeTextTool, textStatsTool, parseJsonTool, timestampTool];
