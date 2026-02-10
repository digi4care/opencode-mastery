# OpenCode Plugin SDK Reference

## Context Object

Plugins receive a **context object** when initialized.

```typescript
interface Context {
  project: Project;
  client: Client;
  $: ShellAPI;
  directory: string;
  worktree?: string;
}
```

---

## project

Contains project information and path aliases.

### Properties

```typescript
interface Project {
  root: string;              // Project root directory
  paths: {
    [alias: string]: string;  // Path aliases
  };
}
```

### Example Usage

```typescript
export default async function myPlugin(context: Context) {
  const { root } = context.project;
  console.log('Project root:', root);
  
  // Access path aliases
  const srcPath = context.project.paths?.src;
  const testPath = context.project.paths?.tests;
}
```

---

## client

Provides access to OpenCode's session management and UI.

### client.session

**Methods**:

#### prompt(message: string)
Send a prompt to the current session.

```typescript
await context.client.session.prompt('This is a custom message');
```

**Parameters**:
- `message`: string - Message to send

**Returns**: `Promise<void>`

#### list()
List all sessions.

```typescript
const sessions = await context.client.session.list();
console.log('Active sessions:', sessions);
```

**Returns**: `Promise<Session[]>`

**Session Interface**:
```typescript
interface Session {
  id: string;
  createdAt: string;
  lastActivity: string;
  status: 'active' | 'idle' | 'completed';
}
```

#### get(id: string)
Get a specific session by ID.

```typescript
const session = await context.client.session.get('session-123');
console.log('Session:', session);
```

**Parameters**:
- `id`: string - Session ID

**Returns**: `Promise<Session | null>`

### client.tui

Provides UI interaction capabilities.

#### showToast(message: string, type?: string)
Display a toast notification.

```typescript
context.client.tui.showToast('Operation completed', 'success');
```

**Parameters**:
- `message`: string - Message to display
- `type`: 'info' | 'success' | 'warning' | 'error' (default: 'info')

**Returns**: `void`

#### appendPrompt(text: string)
Append text to the input prompt.

```typescript
context.client.tui.appendPrompt('Additional context to consider...');
```

**Parameters**:
- `text`: string - Text to append

**Returns**: `void`

---

## $

Bun's shell API for running commands.

### Basic Usage

```typescript
const result = await context.$`ls -la`;
console.log(result);
```

### With Arguments

```typescript
const output = await context.$`echo "Hello, ${name}!"`;
```

### With Variables

```typescript
const filePath = '/path/to/file.txt';
const content = await context.$`cat ${filePath}`;
```

### Run Any Language

```typescript
// Python
const pythonResult = await context.$`python3 script.py`;
console.log(pythonResult);

// Node
const nodeResult = await context.$`node script.js`;

// Bash scripts
const bashResult = await context.$`./script.sh`;
```

### Shell API Methods

#### Command Execution
```typescript
const result = await $`command`;
```

#### Pipe Operations
```typescript
const output = await $`cat file.txt | grep "pattern"`;
```

#### Output Capture
```typescript
const { stdout, stderr, exitCode } = await context.$`command`;
```

---

## directory

Path to the plugin's directory.

```typescript
console.log('Plugin directory:', context.directory);
```

**Returns**: `string` - Absolute path to plugin directory

---

## worktree

Git worktree path (if applicable).

```typescript
if (context.worktree) {
  console.log('Worktree:', context.worktree);
}
```

**Returns**: `string | null` - Worktree path or null

---

## Event Handlers

### Event Signature

All event handlers receive an event object.

```typescript
interface Event {
  id: string;
  name: string;
  timestamp: string;
  data: any;
  source: string;
}
```

### Example Handler

```typescript
export default async function myPlugin(context: Context) {
  return {
    'tool.execute.before': async ({ event }) => {
      console.log('Tool about to execute:', event.data.toolName);
    }
  };
}
```

---

## Tool Definition

### tool() Function

Define custom tools with Zod schemas.

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

### Parameters

- `schema`: z.ZodType - Zod schema for validation
- `handler`: (args, context) => Promise<Result> - Tool implementation

### Handler Context

```typescript
interface ToolContext extends Context {
  tool: {
    name: string;
    description: string;
  };
}
```

### Return Type

```typescript
interface ToolResult {
  success: boolean;
  data?: any;
  error?: string;
  metadata?: Record<string, any>;
}
```

---

## Agent Registration

### registerCustomAgents Function

Register custom agents in config handler.

```typescript
export const registerMyAgent = (config: any) => {
  return {
    ...config,
    agents: [{
      name: 'my-agent',
      description: 'A specialized assistant',
      instructions: 'You are...',
      model: 'claude-3-5-sonnet-latest',
      tools: ['my-tool', 'read', 'write']
    }]
  };
};
```

### Agent Interface

```typescript
interface Agent {
  name: string;
  description: string;
  instructions: string;
  model?: string;
  tools?: string[];
}
```

### Usage

```typescript
export default async function myPlugin(context: Context) {
  return {
    config: async (currentConfig) => {
      return registerMyAgent(currentConfig);
    }
  };
}
```

---

## Plugin Export

### Default Export

Plugins must export a default async function.

```typescript
export default async function myPlugin(context: Context) {
  return {
    // Event handlers
    'event.name': async ({ event }) => { }
  };
}
```

### Named Exports

Additional exports for tool and agent registration.

```typescript
export const myTool = tool(/*...*/);
export const myAgent = registerMyAgent;
export default async function myPlugin(context: Context) { }
```

---

## Common Patterns

### Accessing Project Files

```typescript
export default async function myPlugin(context: Context) {
  const { root } = context.project;
  
  // Read a file
  const content = await context.$`cat ${root}/README.md`;
  
  return {};
}
```

### Sending Custom Prompts

```typescript
export default async function myPlugin(context: Context) {
  return {
    'session.created': async ({ event }) => {
      await context.client.session.prompt(
        'Welcome to this session! I can help you with...'
      );
    }
  };
}
```

### Showing Toast Notifications

```typescript
export default async function myPlugin(context: Context) {
  return {
    'tool.execute.after': async ({ event }) => {
      const { toolName, result } = event.data;
      
      if (result?.success) {
        context.client.tui.showToast(
          `${toolName} completed successfully`,
          'success'
        );
      }
    }
  };
}
```

---

## Error Handling

### Try-Catch in Handlers

```typescript
export default async function myPlugin(context: Context) {
  return {
    'tool.execute.before': async ({ event }) => {
      try {
        // Handler logic
      } catch (error) {
        console.error('Error in handler:', error);
        // Re-throw or return gracefully
      }
    }
  };
}
```

### Error in Tool Handler

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

## Type Safety

### TypeScript Types

```typescript
import type { Context } from '@opencode-ai/plugin';

export default async function myPlugin(context: Context) {
  // Full type safety
  console.log(context.project.root);
}
```

### Zod Schemas

```typescript
import { z } from 'zod';

export const myTool = tool(
  z.object({
    required: z.string(),
    optional: z.string().optional(),
    number: z.number().min(0).max(100)
  }),
  async (args, context) => { }
).describe('My tool');
```

---

## Best Practices

1. **Always use TypeScript** - Type safety catches errors early
2. **Validate inputs** - Use Zod schemas for tools
3. **Handle errors** - Wrap handlers in try/catch
4. **Log appropriately** - Debug without spam
5. **Use async/await** - Don't block OpenCode
6. **Clean up resources** - Use session.idle for cleanup
7. **Test thoroughly** - Build, load, execute

---

## Further Reading

- **PLUGIN_OVERVIEW.md** - What are plugins?
- **PLUGIN_ARCHITECTURE.md** - Plugin structure
- **PLUGIN_EVENT_HOOKS.md** - 25+ event hooks
- **PLUGIN_BEST_PRACTICES.md** - Development guidelines

---

## Examples

- **minimal-plugin/** - Single event hook
- **intermediate-plugin/** - Custom tools + agents
- **advanced-plugin/** - Full capabilities

---

## Troubleshooting

**Context properties undefined**:
- Check OpenCode version
- Review plugin initialization
- Verify context object structure

**Tool not available**:
- Ensure tool is exported
- Check tool is in plugin return object
- Verify tool name matches reference

**Event not firing**:
- Verify event name spelling
- Check console for errors
- Ensure plugin is loaded

---

Happy SDK usage! 📱
