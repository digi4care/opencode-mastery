# OpenCode Plugins Guide

Complete gids voor plugin development in OpenCode.

## Wat zijn Plugins?

Plugins zijn **TypeScript/JavaScript modules** die OpenCode uitbreiden met:

- **Custom Tools** - Zod-gevalideerde functies
- **Event Hooks** - 25+ events om te intercepten
- **Custom Agents** - Gespecialiseerde subagents
- **SDK Access** - Volledige API toegang (session, TUI, shell)

## Plugins vs Skills

| Aspect             | Skills         | Plugins                             |
| ------------------ | -------------- | ----------------------------------- |
| **Format**         | Markdown (.md) | TypeScript (.ts) / JavaScript (.js) |
| **Complexity**     | Laag           | Medium-Hoog                         |
| **Execution**      | Via bash tool  | Direct execution                    |
| **Tools**          | Via scripts    | Custom tools met Zod schemas        |
| **Hooks**          | Geen           | 25+ event hooks                     |
| **SDK Access**     | Beperkt        | Volledig (session, TUI, shell)      |
| **Learning curve** | 5 min          | 30-60 min                           |

### Wanneer wat kiezen?

```
Use Skills wanneer:
  - Simpele, mens-leesbare instructies
  - Snelle prototyping
  - Geen event interception nodig
  - Use case is straightforward

Use Plugins wanneer:
  - Type-safe custom tools nodig
  - Tool executions willen intercepten
  - Custom agents met scoped tools
  - Event-driven behavior
  - UI of session management uitbreiden
```

## Directory Structuur

### Local Plugins

```
# Project-level
.opencode/plugin/          # Voorkeur
.opencode/plugins/         # Ook mogelijk

# Global
~/.config/opencode/plugin/
~/.config/opencode/plugins/
```

### NPM Plugins

```bash
# Installeer published package
bun add @scope/opencode-plugin-name

# In opencode.json
{
  "plugins": ["@scope/opencode-plugin-name"]
}
```

## Plugin Architectuur

### Basis Structuur

```typescript
// .opencode/plugin/index.ts
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

export default async function myPlugin(context: PluginContext) {
  return {
    // Tools registreren
    tool: [myTool],

    // Event handlers
    "tool.execute.before": [beforeHandler],
    "tool.execute.after": [afterHandler],

    // Custom agents toevoegen
    config: async (cfg) => ({
      ...cfg,
      agents: [...cfg.agents, myCustomAgent],
    }),
  };
}
```

### Context Object

```typescript
interface PluginContext {
  // Project info
  project: {
    root: string;
    paths: {
      absolute: string;
      relative: string;
    };
  };

  // Client APIs
  client: {
    session: SessionAPI;
    tui: TuiAPI;
  };

  // Shell API (Bun)
  $: ShellAPI;

  // File system
  directory: DirectoryManager;
  worktree: WorktreeManager;
}
```

### Session API

```typescript
// Prompt manipulation
await context.client.session.prompt("Add this to prompt");
await context.client.session.prompt({ type: "user", content: "..." });

// Message access
const messages = await context.client.session.list();
const msg = await context.client.session.get(messageId);
```

### TUI API

```typescript
// Toast notifications
context.client.tui.showToast({
  message: "Operation complete",
  type: "success",
});

// Prompt appending
context.client.tui.appendPrompt("Additional context");
```

### Shell API (Bun)

```typescript
// Execute shell commands
const result = await context.$`echo "Hello"`;
const files = await context.$`ls -la`.quiet();

// With variables
const name = "world";
await context.$`echo "Hello ${name}"`;
```

## Custom Tools

### Tool Definitie

```typescript
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

// 1. Zod schema
const schema = z.object({
  path: z.string().min(1).describe("File path to read"),
  encoding: z.enum(["utf-8", "binary"]).optional().default("utf-8"),
});

// 2. Handler
async function handler(args: z.infer<typeof schema>, context: ToolContext) {
  try {
    const content = await readFile(args.path, args.encoding);
    return {
      success: true,
      data: { content },
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

// 3. Register
export const readFileTool = tool(schema, handler).describe(
  "Read a file from the filesystem",
);
```

### ToolResult Shape

```typescript
interface ToolResult {
  success: boolean;
  data?: any; // Optional success data
  error?: string; // Optional error message
  metadata?: {
    // Optional metadata
    duration?: number;
    tokens?: number;
  };
}
```

### Safety Patterns

```typescript
// 1. Path validation (geen .. traversal)
function validatePath(input: string): string {
  const resolved = path.resolve(input);
  if (resolved.includes("..")) {
    throw new Error("Path traversal not allowed");
  }
  return resolved;
}

// 2. Dry-run support
async function handler(args, ctx) {
  if (args.dryRun) {
    return { success: true, data: { preview: "Would do X" } };
  }
  // Actual execution
}

// 3. Side effects expliciet
const deleteTool = tool(z.object({ path: z.string() }), async (args) => {
  // DANGEROUS: Has side effects
  await fs.unlink(args.path);
  return { success: true };
}).describe("⚠️ Permanently deletes a file");
```

## Event Hooks

### Beschikbare Events

| Category    | Event                  | Trigger                 |
| ----------- | ---------------------- | ----------------------- |
| **Tool**    | `tool.execute.before`  | Voor tool execution     |
|             | `tool.execute.after`   | Na tool execution       |
| **Command** | `command.executed`     | User command uitgevoerd |
| **File**    | `file.edited`          | Bestand bewerkt         |
|             | `file.watcher.updated` | File watcher update     |
| **Message** | `message.updated`      | Bericht bijgewerkt      |
|             | `message.part`         | Bericht deel ontvangen  |
|             | `message.removed`      | Bericht verwijderd      |
| **Session** | `session.created`      | Nieuwe sessie           |
|             | `session.idle`         | Sessie idle             |
|             | `session.error`        | Sessie error            |
|             | `session.status`       | Status wijziging        |
|             | `session.compacted`    | Context gecomprimeerd   |
| **TUI**     | `tui.toast.show`       | Toast getoond           |
|             | `tui.prompt.append`    | Prompt toegevoegd       |
|             | `tui.command.execute`  | Command uitgevoerd      |

### Event Handler Pattern

```typescript
export default async function myPlugin(context) {
  return {
    // Before tool execution - kan modificeren
    "tool.execute.before": async ({ event }) => {
      console.log(`Tool ${event.tool} about to execute`);
      // Return modified args or null to proceed
      return null;
    },

    // After tool execution - kan resultaat loggen
    "tool.execute.after": async ({ event }) => {
      console.log(`Tool ${event.tool} finished: ${event.result.success}`);
    },

    // File changes
    "file.edited": async ({ event }) => {
      console.log(`File ${event.path} was edited`);
    },
  };
}
```

### Interception (tool.execute.before)

```typescript
"tool.execute.before": async ({ event }) => {
  // Block dangerous operations
  if (event.tool === "bash" && event.args.command.includes("rm -rf /")) {
    return {
      blocked: true,
      reason: "Dangerous command blocked"
    };
  }

  // Log all writes
  if (event.tool === "write") {
    console.log(`Writing to ${event.args.filePath}`);
  }

  return null; // Proceed with execution
}
```

## Custom Agents

### Agent Registratie

```typescript
import { agent } from "@opencode-ai/plugin";

const reviewerAgent = agent({
  name: "code-reviewer",
  description: "Reviews code for quality and security",
  tools: ["read", "grep", "glob"], // Scoped tools
  model: "claude-3-sonnet",
  instructions: `You are a code reviewer...`,
});

export default async function myPlugin(context) {
  return {
    config: async (cfg) => ({
      ...cfg,
      agents: [...cfg.agents, reviewerAgent],
    }),
  };
}
```

### Agent Tools Scoping

```typescript
// Agent heeft alleen toegang tot specifieke tools
const secureAgent = agent({
  name: "safe-analyzer",
  tools: ["read", "grep"], // Geen write, edit, bash!
  instructions: `Analyze code without modifying anything`,
});
```

## Best Practices

### Code Quality

```typescript
// ✅ TypeScript strict mode
// ✅ Zod validation for all inputs
// ✅ Error handling with try/catch
// ✅ Logging voor debugging

export const myTool = tool(
  z.object({
    input: z.string().min(1),
  }),
  async (args, ctx) => {
    try {
      ctx.log.info(`Processing: ${args.input}`);
      // ... logic
      return { success: true, data: result };
    } catch (error) {
      ctx.log.error(`Failed: ${error.message}`);
      return { success: false, error: error.message };
    }
  },
);
```

### Event Handlers

```typescript
// ✅ Throttle frequent events
// ✅ Debounce rapid events
// ✅ Early return for irrelevant events

"file.watcher.updated": async ({ event }) => {
  // Early return voor irrelevante files
  if (!event.path.endsWith('.ts')) return;

  // Debounce logic
  await debounce(100);

  // Process
  console.log(`TypeScript file changed: ${event.path}`);
}
```

### Security

```typescript
// ✅ Valideer alle paden
// ✅ Sanitize shell commands
// ✅ Geen hardcoded secrets
// ✅ Minimal permissions

async function handler(args, ctx) {
  // Path validation
  const safePath = validatePath(args.path);

  // Shell sanitization
  const safeInput = args.input.replace(/[^\w\s]/g, "");

  // Execute safely
  await ctx.$`echo ${safeInput}`;
}
```

### Testing

```typescript
// Unit tests voor tools
describe("myTool", () => {
  it("should return success for valid input", async () => {
    const result = await handler({ input: "test" }, mockContext);
    expect(result.success).toBe(true);
  });

  it("should reject invalid paths", async () => {
    await expect(
      handler({ path: "../etc/passwd" }, mockContext),
    ).rejects.toThrow("Path traversal");
  });
});
```

## Voorbeelden

### Minimal Plugin (Event Logging)

```typescript
// .opencode/plugin/index.ts
export default async function loggerPlugin(context) {
  return {
    "tool.execute.after": async ({ event }) => {
      console.log(
        `[${new Date().toISOString()}] ${event.tool}: ${event.result.success}`,
      );
    },
  };
}
```

### Intermediate Plugin (Custom Tool)

```typescript
import { tool } from "@opencode-ai/plugin";
import { z } from "zod";

const echoTool = tool(z.object({ text: z.string() }), async (args) => ({
  success: true,
  data: { echoed: args.text },
})).describe("Echo back a string");

export default async function myPlugin(context) {
  return { tool: [echoTool] };
}
```

### Advanced Plugin (Full Features)

```typescript
import { tool, agent } from "@opencode-ai/plugin";
import { z } from "zod";

// Tools
const analyzeTool = tool(z.object({ path: z.string() }), async (args, ctx) => {
  const content = await ctx.$`cat ${args.path}`.quiet();
  return { success: true, data: { analysis: analyzeContent(content) } };
}).describe("Analyze a file");

// Agent
const analyzerAgent = agent({
  name: "file-analyzer",
  description: "Analyzes files and reports findings",
  tools: ["read", "grep", "analyze"],
  instructions: "You are a file analyzer...",
});

// Plugin
export default async function myPlugin(context) {
  return {
    tool: [analyzeTool],
    config: async (cfg) => ({
      ...cfg,
      agents: [...cfg.agents, analyzerAgent],
    }),
    "tool.execute.before": async ({ event }) => {
      if (event.tool === "analyze") {
        context.client.tui.showToast({ message: "Analyzing...", type: "info" });
      }
    },
  };
}
```

## Troubleshooting

### Plugin laadt niet

```bash
# Check directory
ls -la .opencode/plugin/
ls -la ~/.config/opencode/plugin/

# Check exports
node -e "console.log(require('./.opencode/plugin/index.ts').default)"

# Check TypeScript errors
bun run tsc --noEmit
```

### Tool werkt niet

```bash
# Check Zod schema
# Check handler return shape
# Check tool registration in plugin export

# Debug logging
console.log = (...args) => process.stderr.write(args.join(' ') + '\n');
```

### Events niet firing

```bash
# Check event name spelling
# Check handler signature
# Check plugin export structure

# Debug
"tool.execute.before": async ({ event }) => {
  console.log("Event fired:", event);
}
```

## Referenties

- Voorbeelden: `src/skill/opencode-mastery/examples/plugins/`
- SDK Types: `@opencode-ai/plugin` package
- Context API: Zie PLUGIN_SDK_REFERENCE.md
- Event Hooks: Zie PLUGIN_EVENT_HOOKS.md
