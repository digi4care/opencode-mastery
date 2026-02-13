# OpenCode Tools Guide

Complete gids voor het schrijven van custom tools in OpenCode plugins.

## Wat zijn Tools?

Tools zijn **Zod-gevalideerde functies** die door de AI kunnen worden aangeroepen. Ze bieden:

- **Type safety** - Input validatie via Zod schemas
- **Consistente output** - ToolResult shape
- **Safety patterns** - Dry-run, path validation, side effect warnings

## Quick Start

### Stap 1: Zod Schema

```typescript
import { z } from "zod";

const schema = z.object({
  path: z.string().min(1).describe("File path to process"),
  recursive: z.boolean().optional().default(false),
});
```

### Stap 2: Handler

```typescript
async function handler(args: z.infer<typeof schema>, context: ToolContext) {
  try {
    const result = await processFile(args.path, args.recursive);
    return {
      success: true,
      data: result,
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}
```

### Stap 3: Register in Plugin

```typescript
import { tool } from "@opencode-ai/plugin";

export const myTool = tool(schema, handler).describe("Process a file");

export default async function myPlugin(context) {
  return { tool: [myTool] };
}
```

## ToolResult Shape

Elke tool moet een consistent resultaat teruggeven:

```typescript
interface ToolResult {
  success: boolean; // Required: true or false
  data?: any; // Optional: success data
  error?: string; // Optional: error message
  metadata?: {
    // Optional: metadata
    duration?: number; // Execution time in ms
    tokens?: number; // Tokens used
    files?: string[]; // Files affected
  };
}
```

### Success Example

```typescript
return {
  success: true,
  data: {
    files: ["a.ts", "b.ts"],
    count: 2,
  },
  metadata: {
    duration: 150,
    files: ["a.ts", "b.ts"],
  },
};
```

### Error Example

```typescript
return {
  success: false,
  error: "File not found: /path/to/file.ts",
  metadata: {
    duration: 5,
  },
};
```

## Zod Schema Patterns

### Primitives

```typescript
z.string();
z.string().min(1);
z.string().min(1).max(100);
z.number();
z.number().int().positive();
z.boolean();
```

### Optional & Default

```typescript
z.string().optional();
z.string().optional().default("default-value");
z.boolean().optional().default(false);
```

### Enums

```typescript
z.enum(["utf-8", "binary", "json"]);
z.enum(["create", "update", "delete"]);
```

### Objects

```typescript
z.object({
  path: z.string(),
  options: z
    .object({
      recursive: z.boolean().optional(),
      exclude: z.array(z.string()).optional(),
    })
    .optional(),
});
```

### Arrays

```typescript
z.array(z.string());
z.array(z.string()).min(1).max(10);
z.array(z.object({ name: z.string(), value: z.number() }));
```

### Descriptions (voor AI)

```typescript
z.string().describe("The file path to read");
z.enum(["json", "yaml"]).describe("Output format");
```

## ToolContext

De handler ontvangt een context object:

```typescript
interface ToolContext {
  // Project info
  project: {
    root: string;
    paths: { absolute: string; relative: string };
  };

  // Client APIs
  client: {
    session: SessionAPI;
    tui: TuiAPI;
  };

  // Shell (Bun)
  $: ShellAPI;

  // Logging
  log: {
    info: (msg: string) => void;
    error: (msg: string) => void;
    debug: (msg: string) => void;
  };
}
```

### Shell Usage

```typescript
async function handler(args, ctx) {
  // Execute command
  const result = await ctx.$`ls -la ${args.path}`;

  // Quiet mode (no stdout)
  const files = await ctx.$`find . -name "*.ts"`.quiet();

  // Get stdout as string
  const output = result.stdout.toString();
}
```

### Toast Notifications

```typescript
async function handler(args, ctx) {
  ctx.client.tui.showToast({
    message: "Processing...",
    type: "info",
  });

  // ... do work

  ctx.client.tui.showToast({
    message: "Done!",
    type: "success",
  });
}
```

## Safety Patterns

### 1. Path Validation

```typescript
import path from "path";

function validatePath(input: string, root: string): string {
  const resolved = path.resolve(root, input);

  // No traversal
  if (resolved.includes("..")) {
    throw new Error("Path traversal not allowed");
  }

  // Must be within root
  if (!resolved.startsWith(root)) {
    throw new Error("Path must be within project root");
  }

  return resolved;
}

async function handler(args, ctx) {
  const safePath = validatePath(args.path, ctx.project.root);
  // ... use safePath
}
```

### 2. Dry-Run Support

```typescript
const schema = z.object({
  path: z.string(),
  dryRun: z.boolean().optional().default(false),
});

async function handler(args, ctx) {
  if (args.dryRun) {
    return {
      success: true,
      data: {
        preview: `Would delete ${args.path}`,
        dryRun: true,
      },
    };
  }

  // Actual deletion
  await fs.unlink(args.path);
  return { success: true, data: { deleted: args.path } };
}
```

### 3. Side Effect Warnings

```typescript
export const deleteTool = tool(z.object({ path: z.string() }), async (args) => {
  await fs.unlink(args.path);
  return { success: true };
}).describe("⚠️ Permanently deletes a file - cannot be undone");
```

### 4. Confirmation Required

```typescript
const schema = z.object({
  path: z.string(),
  force: z.boolean().optional().default(false),
});

async function handler(args, ctx) {
  if (!args.force) {
    return {
      success: false,
      error: "Confirmation required. Use force=true to proceed.",
    };
  }

  // Proceed with dangerous operation
}
```

## Common Pitfalls

### 1. Overly Large Schemas

```typescript
// ❌ BAD: Too many fields
const schema = z.object({
  field1: z.string(),
  field2: z.string(),
  // ... 20 more fields
});

// ✅ GOOD: Keep it focused
const schema = z.object({
  path: z.string(),
  options: z
    .object({
      recursive: z.boolean().optional(),
    })
    .optional(),
});
```

### 2. Unstable Outputs

```typescript
// ❌ BAD: Non-deterministic
async function handler(args) {
  return {
    success: true,
    data: { timestamp: Date.now() }, // Changes every call
  };
}

// ✅ GOOD: Stable structure
async function handler(args) {
  const result = await process(args);
  return {
    success: true,
    data: { files: result.files, count: result.files.length },
  };
}
```

### 3. Hidden Side Effects

```typescript
// ❌ BAD: Side effects not documented
export const readTool = tool(schema, async (args) => {
  await logToExternalService(args); // Hidden side effect!
  return { success: true, data: await readFile(args.path) };
});

// ✅ GOOD: Document side effects
export const readTool = tool(schema, async (args) => {
  return { success: true, data: await readFile(args.path) };
}).describe("Read a file (no side effects)");
```

### 4. Missing Error Handling

```typescript
// ❌ BAD: No error handling
async function handler(args) {
  const content = await readFile(args.path); // Can throw!
  return { success: true, data: content };
}

// ✅ GOOD: Proper error handling
async function handler(args) {
  try {
    const content = await readFile(args.path);
    return { success: true, data: content };
  } catch (error) {
    return { success: false, error: `Failed to read: ${error.message}` };
  }
}
```

## Examples

### File Reader Tool

```typescript
const readFileTool = tool(
  z.object({
    path: z.string().min(1).describe("File path to read"),
    encoding: z.enum(["utf-8", "binary"]).optional().default("utf-8"),
  }),
  async (args, ctx) => {
    try {
      const safePath = validatePath(args.path, ctx.project.root);
      const content = await fs.readFile(safePath, args.encoding);
      return { success: true, data: { content: content.toString() } };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
).describe("Read a file from the project");
```

### Shell Runner Tool

```typescript
const runCommandTool = tool(
  z.object({
    command: z.string().min(1).describe("Command to run"),
    cwd: z.string().optional().describe("Working directory"),
    timeout: z.number().int().positive().optional().default(30000),
  }),
  async (args, ctx) => {
    try {
      const cwd = args.cwd || ctx.project.root;
      const result = await ctx.$`cd ${cwd} && ${args.command}`.timeout(
        args.timeout,
      );

      return {
        success: true,
        data: {
          stdout: result.stdout.toString(),
          stderr: result.stderr.toString(),
          exitCode: result.exitCode,
        },
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  },
).describe("Run a shell command");
```

### Batch Processor Tool

```typescript
const batchProcessTool = tool(
  z.object({
    files: z.array(z.string()).min(1).max(100),
    operation: z.enum(["format", "lint", "test"]),
    parallel: z.boolean().optional().default(true),
  }),
  async (args, ctx) => {
    const results: Array<{ file: string; success: boolean; error?: string }> =
      [];

    const process = async (file: string) => {
      try {
        await runOperation(file, args.operation);
        return { file, success: true };
      } catch (error) {
        return { file, success: false, error: error.message };
      }
    };

    if (args.parallel) {
      const promises = args.files.map(process);
      results.push(...(await Promise.all(promises)));
    } else {
      for (const file of args.files) {
        results.push(await process(file));
      }
    }

    const failed = results.filter((r) => !r.success);

    return {
      success: failed.length === 0,
      data: {
        processed: results.length,
        succeeded: results.length - failed.length,
        failed: failed.length,
        results,
      },
    };
  },
).describe("Process multiple files in batch");
```

## Testing Tools

```typescript
import { describe, it, expect } from "bun:test";

describe("readFileTool", () => {
  it("should read a valid file", async () => {
    const result = await readFileTool.handler(
      { path: "test.txt" },
      mockContext,
    );
    expect(result.success).toBe(true);
    expect(result.data.content).toBeDefined();
  });

  it("should reject path traversal", async () => {
    const result = await readFileTool.handler(
      { path: "../etc/passwd" },
      mockContext,
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain("traversal");
  });

  it("should handle missing files", async () => {
    const result = await readFileTool.handler(
      { path: "nonexistent.txt" },
      mockContext,
    );
    expect(result.success).toBe(false);
    expect(result.error).toContain("not found");
  });
});
```

## Referenties

- Voorbeelden: `src/skill/opencode-mastery/examples/tools/`
- Plugin Guide: `docs/opencode/plugins.md`
- Zod Docs: https://zod.dev/
