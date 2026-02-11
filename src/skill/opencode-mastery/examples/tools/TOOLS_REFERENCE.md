# Tools Reference

This reference collects the core code patterns used for tools in this repo.

The authoritative repo-local references are:

- `../plugins/PLUGIN_SDK_REFERENCE.md` (tool() + return shape)
- `../plugins/PLUGIN_BEST_PRACTICES.md` (patterns and testing)

## tool() Pattern

```ts
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const myTool = tool(
  z.object({ query: z.string().describe("Search query") }),
  async (args, context) => {
    return { success: true, data: { query: args.query } };
  },
).describe("A short, action-focused description");
```

## ToolResult Shape

As documented in `../plugins/PLUGIN_SDK_REFERENCE.md`:

```ts
interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}
```

Practical guidance:

- Use `success: false` + `error` for failures.
- Put structured outputs in `data` (avoid unstructured strings where possible).
- Use `metadata` for non-core info (counts, timings, ids).

## Common Pitfalls

- Overly-large schemas: keep inputs minimal; pass references/ids, not entire files.
- Unstable outputs: changing `data` shape breaks agents; version changes deliberately.
- Hidden side effects: document and guard operations that write files or execute commands.
