# OpenCode Plugin Architecture

## Plugin Structure

OpenCode plugins are **TypeScript or JavaScript modules** that extend OpenCode's functionality through a registration system.

### Basic Plugin Shape

```typescript
export default async function myPlugin(context: Context) {
  return {
    // Event hooks
    'event.name': async ({ event }) => {
      // Handle event
    }
  };
}
```

---

## Directory Structure

### Project-Level Plugins

```
my-project/
├── .opencode/
│   └── plugin/
│       ├── my-plugin/
│       │   ├── index.ts
│       │   ├── commands/  # Optional: custom commands
│       │   ├── agents/    # Optional: custom agents
│       │   ├── hooks/     # Optional: event handlers
│       │   └── package.json
│       └── .claude-plugin/
│           └── plugin.json  # Manifest
└── src/
    └── ...
```

### Global Plugins

```
~/.config/opencode/plugin/
├── my-plugin-1/
├── my-plugin-2/
└── ...
```

---

## Plugin Registration

### Auto-Discovery

OpenCode automatically discovers plugins in:
1. **Project plugins**: `.opencode/plugin/` (project root)
2. **Global plugins**: `~/.config/opencode/plugin/` (home directory)

**How it works**:
- Scans for `.ts` and `.js` files
- Loads and executes default export
- No configuration needed (zero-config)

### Manual Registration

Plugins can also be registered via configuration:

```json
{
  "plugins": [
    "my-local-plugin",
    "@scope/npm-plugin"
  ]
}
```

---

## Plugin Manifest (.claude-plugin/plugin.json)

For complex plugins, include a manifest:

```json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A custom OpenCode plugin",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "main": "index.ts",
  "type": "module",
  "dependencies": {},
  "capabilities": [
    "custom-tools",
    "custom-agents",
    "event-hooks"
  ]
}
```

**Purpose**:
- Package metadata
- Version management
- Capability declaration
- Distribution ready

---

## Plugin Lifecycle

### 1. Discovery
```
OpenCode scans plugin directories
    ↓
Finds .ts/.js files
    ↓
Checks for default export
```

### 2. Initialization
```
Loads plugin file
    ↓
Executes default export with context
    ↓
Plugin receives context object
```

### 3. Registration
```
Plugin returns handlers object
    ↓
OpenCode registers event hooks
    ↓
Plugin is now active
```

### 4. Runtime
```
Events occur in OpenCode
    ↓
Plugin handlers are invoked
    ↓
Plugin can access SDK
```

### 5. Cleanup
```
OpenCode shuts down
    ↓
Plugin receives cleanup signals
    ↓
Plugin releases resources
```

---

## Context Object

Plugins receive a **context object** with the following properties:

### project
```typescript
{
  root: string;           // Project root directory
  paths: {
    [key: string]: string; // Path aliases
  };
}
```

### client
```typescript
{
  session: {
    prompt(message: string): Promise<void>;
    list(): Promise<Session[]>;
    get(id: string): Promise<Session>;
    // ... more session methods
  },
  tui: {
    showToast(message: string): void;
    appendPrompt(text: string): void;
    // ... more TUI methods
  }
}
```

### $
```typescript
// Bun shell API
const result = await $`echo "Hello"`;
```

### directory
```typescript
string;  // Plugin's directory path
```

### worktree
```typescript
string | null;  // Git worktree path (if applicable)
```

---

## Event System

### Event Subscription

Plugins subscribe to events by returning handlers:

```typescript
export default async function myPlugin(context: Context) {
  return {
    // Subscribe to specific events
    'tool.execute.before': async ({ event }) => {
      console.log('Tool about to execute');
    },
    
    'tool.execute.after': async ({ event }) => {
      console.log('Tool executed');
    }
  };
}
```

### Event Format

All events have this structure:

```typescript
{
  id: string;           // Unique event ID
  name: string;         // Event name (e.g., 'tool.execute.before')
  timestamp: string;     // ISO 8601 timestamp
  data: any;           // Event-specific data
  source: string;      // Event source (plugin name, etc.)
}
```

### Event Categories

| Category | Events | Examples |
|----------|---------|----------|
| **Tools** | `tool.execute.before`, `tool.execute.after` | Intercept tool calls |
| **Commands** | `command.executed` | Log/modify commands |
| **Files** | `file.edited`, `file.watcher.updated` | Track file changes |
| **Messages** | `message.updated`, `message.part.updated` | Monitor AI messages |
| **Session** | `session.created`, `session.idle`, `session.error` | Session lifecycle |
| **TUI** | `tui.toast.show`, `tui.prompt.append` | UI interactions |

---

## Build System

### TypeScript

```bash
# Build plugin
bun build src/index.ts --outdir dist

# Watch mode (for development)
bun build src/index.ts --outdir dist --watch

# Target specific platforms
bun build src/index.ts --target node --outdir dist
```

### JavaScript

```bash
# No build step needed
# Just drop .js files in plugin directory
```

### Bundling

For production, bundle to single file:

```bash
bun build src/index.ts --outdir dist --format esm
```

---

## Custom Tools

### Tool Definition

```typescript
import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

export const myTool = tool(
  z.object({
    query: z.string().describe('Search query'),
    limit: z.number().default(10).describe('Max results')
  }),
  async (args, context) => {
    // Implementation
    return { success: true, data: [] };
  }
).describe('My custom tool');
```

### Tool Registration

```typescript
export default async function myPlugin(context: Context) {
  return {
    tool: [myTool, anotherTool]
  };
}
```

### Tool Execution Flow

```
AI requests tool
    ↓
OpenCode validates args (Zod)
    ↓
Tool function executes
    ↓
Returns result
    ↓
AI continues with result
```

---

## Custom Agents

### Agent Definition

```typescript
export const registerMyAgent = (config: any) => {
  return {
    ...config,
    agents: [{
      name: 'my-specialized-agent',
      description: 'A specialized assistant for X',
      instructions: 'You are...',
      model: 'claude-3-5-sonnet-latest',
      tools: ['my-tool', 'read', 'write']  // Scoped!
    }]
  };
};
```

### Agent Registration

```typescript
export default async function myPlugin(context: Context) {
  return {
    config: async (currentConfig: any) => {
      return registerMyAgent(currentConfig);
    }
  };
}
```

### Agent Scoping

Scoped tools limit what an agent can access:

```typescript
agents: [{
  name: 'read-only-agent',
  tools: ['read']  // Only read, no write!
}]
```

**Benefits**:
- Security: Restrict dangerous operations
- Focus: Agent only sees relevant tools
- Specialization: Tailored to specific tasks

---

## Session Lifecycle

### session.created
Fired when new session starts:
```typescript
'session.created': async ({ event }) => {
  // Initialize plugin state
  // Load session-specific data
  // Setup logging
}
```

### session.idle
Fired when session completes:
```typescript
'session.idle': async ({ event }) => {
  // Cleanup resources
  // Save session data
  // Flush logs
}
```

### session.error
Fired on errors:
```typescript
'session.error': async ({ event }) => {
  // Log errors
  // Attempt recovery
  // Notify users
}
```

---

## Multi-File Plugins

For complex plugins, organize into multiple files:

```
my-plugin/
├── index.ts          // Main export
├── tools/
│   ├── tool1.ts
│   └── tool2.ts
├── agents/
│   └── agent.ts
└── hooks/
    ├── hook1.ts
    └── hook2.ts
```

### Import Pattern

```typescript
// index.ts
import tool1 from './tools/tool1';
import tool2 from './tools/tool2';
import agent from './agents/agent';

export default async function myPlugin(context: Context) {
  return {
    tool: [tool1, tool2],
    config: async (config) => agent(config)
  };
}
```

---

## Error Handling

### Plugin Errors

```typescript
export default async function myPlugin(context: Context) {
  try {
    // Plugin logic
    return { /* handlers */ };
  } catch (error) {
    console.error('Plugin error:', error);
    // Return partial functionality or rethrow
    return { /* fallback handlers */ };
  }
}
```

### Tool Errors

```typescript
export const myTool = tool(
  z.object({ /* schema */ }),
  async (args, context) => {
    try {
      // Tool logic
      return { success: true, data: result };
    } catch (error) {
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
).describe('My tool');
```

---

## Best Practices

1. **Keep plugins focused** - Single responsibility
2. **Use TypeScript** - Type safety catches errors early
3. **Validate inputs** - Use Zod schemas
4. **Log appropriately** - Debug without spam
5. **Handle errors** - Graceful degradation
6. **Test thoroughly** - Build, load, execute
7. **Document well** - Why, how, examples

---

## Further Reading

- **PLUGIN_EVENT_HOOKS.md** - 25+ event hooks detailed
- **PLUGIN_SDK_REFERENCE.md** - Full API reference
- **PLUGIN_BEST_PRACTICES.md** - Development guidelines
- **PLUGIN_OVERVIEW.md** - What are plugins?
- **PLUGIN_VS_SKILLS.md** - When to use which

---

## Examples

- **minimal-plugin/** - Single event hook
- **intermediate-plugin/** - Custom tools + agents
- **advanced-plugin/** - Full capabilities

---

## Troubleshooting

**Plugin not loading**:
- Check file extension (.ts/.js)
- Verify directory location
- Restart OpenCode

**Events not firing**:
- Verify event name spelling
- Check console for errors
- Ensure handlers are returned

**Build errors**:
- Install dependencies
- Check TypeScript version
- Verify SDK imports

---

Happy plugin development! 🚀
