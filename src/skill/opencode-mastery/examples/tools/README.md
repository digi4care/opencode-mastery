# OpenCode Tool Examples

This directory contains progressive examples and documentation for writing **custom tools** in OpenCode.

In OpenCode, tools are typically authored **inside plugins** (TypeScript/JavaScript) and validated with **Zod** schemas. These examples focus specifically on the tool-authoring part (schema + handler + return shape), without requiring you to learn the full plugin event-hook surface area first.

If you need the full plugin installation/runtime story, start with `../plugins/README.md`.

## Learning Path

Tools scale the same way the other examples in this repo do:

```
Tier 1 (Minimal) -> Tier 2 (Intermediate) -> Tier 3 (Advanced)
    *                    **                   ***
```

## Tiers Overview

| Tier  | Example         | Complexity        | Use Case                                            |
| ----- | --------------- | ----------------- | --------------------------------------------------- |
| **1** | `minimal/`      | \* Minimal        | One tool, one schema, happy path                    |
| **2** | `intermediate/` | \*\* Intermediate | Multiple tools, validation, safer returns           |
| **3** | `advanced/`     | \*\*\* Advanced   | Multi-file toolset, shared utils, stricter patterns |

Current status:

- Tier 1 is implemented (`minimal/`)
- Tier 2 is implemented (`intermediate/`)
- Tier 3 is implemented (`advanced/`) (tests are still TODO)

## Documentation

Voor volledige tools documentatie, zie de geconsolideerde docs:

- **[docs/opencode/tools.md](../../../../../docs/opencode/tools.md)** - Complete tools gids

Deze bevat:

- Tool basics (schema + handler + result)
- Zod validatie patterns
- ToolResult shapes
- Best practices
- Common pitfalls

## Quick Reference

```ts
// Tool pattern
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const myTool = tool(
  z.object({ input: z.string() }),
  async (args, ctx) => {
    return { success: true, data: { result: args.input } };
  },
).describe("Tool description");
```

## What A Tool Looks Like

This repo's plugin examples use the `@opencode-ai/plugin` `tool()` helper with Zod.

```ts
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export const echo = tool(
  z.object({ text: z.string().describe("Text to echo") }),
  async (args) => {
    return { success: true, data: { echoed: args.text } };
  },
).describe("Echo back a string");
```

## Next

Zie `minimal/` voor het eerste voorbeeld.
