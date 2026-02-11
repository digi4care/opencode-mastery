# Tools Guide

This guide focuses on writing **custom tools** for OpenCode using the patterns already used in this repo's plugin examples.

For plugin basics (where tools live, how plugins load, etc.), see `../plugins/PLUGIN_OVERVIEW.md`.

## 1) Define A Schema (Zod)

Your schema is the tool's contract. Keep it small and descriptive.

```ts
import { z } from "zod";

export const searchSchema = z.object({
  query: z.string().min(1).describe("Search query"),
  limit: z.number().int().positive().default(10).describe("Max results"),
});
```

Guidelines:

- Prefer explicit constraints (`min(1)`, `int()`, `positive()`) over documenting expectations in prose.
- Use `.describe()` strings as user-facing parameter help.

## 2) Implement The Handler

Handlers should be small, explicit, and return a predictable shape.

This repo documents the common return shape as:

```ts
interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}
```

Example handler:

```ts
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const search = tool(
  z.object({ query: z.string().min(1) }),
  async (args, context) => {
    try {
      // Implement your logic (prefer pure functions + explicit deps)
      const results = [{ title: "Example", score: 1 }];

      return {
        success: true,
        data: { results },
        metadata: { count: results.length },
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  },
).describe("Search for items");
```

Guidelines:

- Validate at boundaries (Zod schema), keep core logic pure.
- Keep errors user-readable; avoid dumping stack traces into `error`.
- Return `metadata` for counts/timing/ids (things that help the agent decide what to do next).

## 3) Register Tools In A Plugin

Tools are usually exposed by returning them from your plugin.

See `../plugins/PLUGIN_ARCHITECTURE.md` and `../plugins/PLUGIN_SDK_REFERENCE.md` for the full plugin shape.

## 4) Design For Safety

- Make side effects explicit (file writes, network calls, shell).
- Prefer "read-only" tools when possible.
- Consider adding a dry-run option for dangerous operations.
