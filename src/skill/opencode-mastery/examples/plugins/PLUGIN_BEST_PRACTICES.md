# OpenCode Plugin Best Practices

## Core Principles

### 1. Keep Plugins Focused
- Single responsibility
- One clear purpose
- Avoid feature creep

### 2. Use TypeScript
- Type safety catches errors early
- Better IDE support
- Self-documenting code

### 3. Validate Inputs
- Always use Zod schemas for tools
- Provide clear error messages
- Validate early, fail fast

### 4. Handle Errors Gracefully
- Wrap handlers in try/catch
- Log errors appropriately
- Provide fallback functionality
- Don't crash the plugin

### 5. Log Appropriately
- Debug without spam
- Use appropriate log levels
- Include context in logs
- Avoid sensitive data in logs

### 6. Test Thoroughly
- Unit tests for tools
- Integration tests for events
- Manual testing with OpenCode
- Test edge cases

---

## Tool Development

### Define Tools with Zod

```typescript
import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

export const myTool = tool(
  z.object({
    required: z.string().describe('Required parameter'),
    optional: z.string().optional().describe('Optional parameter'),
    number: z.number().min(0).max(100).describe('Number 0-100')
  }),
  async (args, context) => {
    // Implementation
    return { success: true, data: result };
  }
).describe('My custom tool');
```

### Tool Handler Best Practices

```typescript
async (args: Args, context: Context) => {
  try {
    // 1. Validate inputs (already done by Zod)
    console.log(`Tool executing with args:`, args);
    
    // 2. Implement tool logic
    const result = await performOperation(args);
    
    // 3. Return success result
    return { success: true, data: result };
    
  } catch (error) {
    // 4. Handle errors
    console.error('Tool error:', error);
    return { 
      success: false, 
      error: error.message,
      metadata: { step: 'execution' }
    };
  }
}
```

### Return Type

```typescript
interface ToolResult {
  success: boolean;          // Required
  data?: any;              // Data on success
  error?: string;           // Error message on failure
  metadata?: Record<string, any>;  // Additional context
}
```

---

## Event Handler Development

### Event Handler Structure

```typescript
export default async function myPlugin(context: Context) {
  return {
    'event.name': async ({ event }) => {
      try {
        // 1. Extract event data
        const data = event.data;
        
        // 2. Validate data
        if (!data) return;
        
        // 3. Implement handler logic
        await handleEvent(data);
        
        // 4. Log appropriately
        console.log(`Event handled: ${event.name}`);
        
      } catch (error) {
        // 5. Handle errors
        console.error(`Error in ${event.name}:`, error);
      }
    }
  };
}
```

### Event Handler Best Practices

#### 1. Keep Handlers Lightweight
```typescript
// ❌ BAD: Heavy computation in handler
'file.edited': async ({ event }) => {
  const result = await heavyAnalysis(event.data.filePath); // Blocks!
}

// ✅ GOOD: Queue or defer heavy work
'file.edited': async ({ event }) => {
  queueAnalysis(event.data.filePath); // Non-blocking
}
```

#### 2. Use Event Throttling
```typescript
let lastTime = 0;
'tool.execute.before': async ({ event }) => {
  const now = Date.now();
  if (now - lastTime < 100) { // Throttle to 100ms
    return; // Skip
  }
  lastTime = now;
  // Handle event
}
```

#### 3. Debounce Rapid Events
```typescript
let debounceTimer: NodeJS.Timeout | null = null;
'file.edited': async ({ event }) => {
  if (debounceTimer) clearTimeout(debounceTimer);
  
  debounceTimer = setTimeout(async () => {
    await processFileEdit(event.data.filePath);
  }, 300); // Wait 300ms
}
```

---

## Custom Agents

### Define Agents Properly

```typescript
export const registerMyAgent = (config: any) => {
  return {
    ...config,
    agents: [{
      name: 'my-specialized-agent',
      description: 'A specialized assistant for specific tasks',
      instructions: `You are a specialized assistant for X.
      
Your responsibilities:
- Focus on Y
- Use tools: my-tool, read, write
- Always validate inputs
- Provide clear, actionable output`,
      model: 'claude-3-5-sonnet-latest',
      tools: ['my-tool', 'read', 'write']  // Scoped!
    }]
  };
};
```

### Agent Best Practices

#### 1. Use Scoped Tools
```typescript
// ✅ GOOD: Scoped tools
agents: [{
  name: 'read-only-agent',
  tools: ['read']  // Only read, no write
}]

// ❌ BAD: All tools
agents: [{
  name: 'full-access-agent',
  tools: ['*']  // Can access everything!
}]
```

#### 2. Provide Clear Instructions
```typescript
instructions: `You are a Code Quality Assistant.

## Your Role
- Analyze code for complexity
- Suggest improvements
- Identify potential bugs

## Your Capabilities
- You have access to: read, write, my-tool
- Use my-tool for complexity analysis
- Use read/write for code changes

## Best Practices
- Be constructive
- Provide specific examples
- Explain WHY changes are needed
- Follow project conventions

## When in Doubt
- Ask for clarification
- Don't make assumptions
- Prefer being explicit over implicit`
```

#### 3. Choose Appropriate Model
```typescript
agents: [{
  name: 'fast-response-agent',
  model: 'claude-3-5-haiku-latest',  // Faster, cheaper
  tools: ['read']
}, {
  name: 'deep-reasoning-agent',
  model: 'claude-3-5-sonnet-latest',  // Slower, smarter
  tools: ['my-tool', 'write']
}]
```

---

## SDK Usage

### Accessing Project Paths

```typescript
export default async function myPlugin(context: Context) {
  const { root, paths } = context.project;
  
  // Use root
  const readmePath = `${root}/README.md`;
  
  // Use path aliases (if available)
  const srcPath = paths?.src || `${root}/src`;
  const testPath = paths?.tests || `${root}/tests`;
}
```

### Using Client SDK

```typescript
export default async function myPlugin(context: Context) {
  return {
    'session.created': async ({ event }) => {
      // Send custom prompt
      await context.client.session.prompt(
        'Welcome! I can help you with...'
      );
      
      // Show toast notification
      context.client.tui.showToast(
        'Plugin initialized',
        'success'
      );
    }
  };
}
```

### Using Shell API

```typescript
export default async function myPlugin(context: Context) {
  return {
    'tool.execute.before': async ({ event }) => {
      // Run shell command
      const result = await context.$`git status`;
      console.log('Git status:', result);
      
      // Run with arguments
      const output = await context.$`ls ${context.project.root}`;
      
      // Run any language
      const pythonResult = await context.$`python3 script.py`;
    }
  };
}
```

---

## Error Handling

### Plugin-Level Error Handling

```typescript
export default async function myPlugin(context: Context) {
  try {
    // Plugin initialization
    console.log('Plugin initializing...');
    
    return {
      // Event handlers
      'event.name': async ({ event }) => {
        // Handler logic
      }
    };
    
  } catch (error) {
    console.error('Plugin initialization error:', error);
    
    // Return fallback or partial functionality
    return {
      'event.name': async ({ event }) => {
        console.log('Plugin running in degraded mode');
      }
    };
  }
}
```

### Tool-Level Error Handling

```typescript
export const myTool = tool(
  z.object({ query: z.string() }),
  async (args, context) => {
    try {
      // 1. Validate inputs (already done by Zod)
      
      // 2. Implement tool logic
      const result = await performQuery(args.query);
      
      // 3. Return success
      return { success: true, data: result };
      
    } catch (error) {
      // 4. Handle specific errors
      if (error instanceof NetworkError) {
        return { 
          success: false, 
          error: 'Network error, please try again',
          metadata: { retry: true }
        };
      }
      
      // 5. Generic error handling
      return { 
        success: false, 
        error: error.message 
      };
    }
  }
).describe('My tool');
```

### Event Handler Error Handling

```typescript
export default async function myPlugin(context: Context) {
  return {
    'event.name': async ({ event }) => {
      try {
        // Handler logic
        await handleEvent(event.data);
        
      } catch (error) {
        // Don't crash the plugin
        console.error(`Error in ${event.name}:`, error);
        
        // Optionally notify user
        context.client.tui.showToast(
          'An error occurred',
          'error'
        );
      }
    }
  };
}
```

---

## Performance

### Optimize Event Handlers

```typescript
// ❌ BAD: Synchronous heavy work
'file.edited': async ({ event }) => {
  const result = await heavyAnalysis(event.data.filePath); // Blocks!
}

// ✅ GOOD: Queue or defer
'file.edited': async ({ event }) => {
  queueHeavyWork(event.data.filePath); // Non-blocking
}

// ✅ GOOD: Batch processing
'file.edited': async ({ event }) => {
  if (!batch) {
    batch = [];
    setTimeout(() => processBatch(batch), 500);
  }
  batch.push(event.data.filePath);
}
```

### Use Async/Await Properly

```typescript
// ❌ BAD: Blocking async operations
'tool.execute.after': async ({ event }) => {
  const data = await fetchSomeData(event.data); // Blocks next event
  console.log(data);
}

// ✅ GOOD: Non-blocking async
'tool.execute.after': async ({ event }) => {
  fetchSomeData(event.data)
    .then(data => console.log(data))
    .catch(error => console.error(error));
}
```

---

## Security

### Validate Inputs

```typescript
export const myTool = tool(
  z.object({
    filePath: z.string()
      .refine(path => !path.includes('..'), {
        message: 'Path traversal not allowed'
      })
      .refine(path => !path.startsWith('/'), {
        message: 'Absolute paths not allowed'
      })
  }),
  async (args, context) => {
    // Safe to use args.filePath
  }
).describe('My tool');
```

### Sanitize Shell Commands

```typescript
// ❌ BAD: Direct user input in shell
const command = await context.$`rm ${userInput}`; // DANGEROUS!

// ✅ GOOD: Validate and escape
const safePath = validateAndEscape(userInput);
const command = await context.$`rm "${safePath}"`;
```

### Avoid Exposing Secrets

```typescript
// ❌ BAD: Logging secrets
console.log('API Key:', apiKey); // DANGEROUS!

// ✅ GOOD: Log only metadata
console.log('API Request:', {
  endpoint: 'https://api.example.com/data',
  method: 'POST'
});
```

---

## Testing

### Unit Testing Tools

```typescript
// tests/tool.test.ts
import { describe, it, expect } from 'bun:test';
import { myTool } from '../src/tool';

describe('myTool', () => {
  it('should succeed with valid input', async () => {
    const result = await myTool.handler(
      { query: 'test' },
      {} as any
    );
    expect(result.success).toBe(true);
  });
  
  it('should fail with invalid input', async () => {
    // Test Zod validation
    // ...
  });
});
```

### Testing Event Handlers

```typescript
// tests/events.test.ts
describe('Plugin Events', () => {
  it('should handle file.edited event', async () => {
    const plugin = await myPlugin(testContext);
    const handler = plugin['file.edited'];
    await handler({ 
      data: { filePath: '/test.txt' },
      id: '1',
      name: 'file.edited',
      timestamp: '2024-01-01T00:00:00Z',
      source: 'test'
    });
    // Verify behavior
  });
});
```

### Manual Testing Checklist

- [ ] Plugin loads without errors
- [ ] Event handlers fire correctly
- [ ] Tools are accessible to AI
- [ ] Agents are available in UI
- [ ] Error handling works
- [ ] Logging is appropriate
- [ ] No console errors
- [ ] Performance is acceptable
- [ ] Edge cases are handled

---

## Documentation

### Document Plugin Purpose

```typescript
/**
 * My Plugin
 * 
 * Purpose: What this plugin does
 * 
 * Features:
 * - Feature 1
 * - Feature 2
 * 
 * Events:
 * - event.name.1
 * - event.name.2
 * 
 * Tools:
 * - tool.name.1
 * - tool.name.2
 * 
 * Usage:
 * 1. Install plugin
 * 2. Restart OpenCode
 * 3. Features are available
 */
```

### Document Tools

```typescript
/**
 * My Custom Tool
 * 
 * Parameters:
 * - query: Search query (required)
 * - limit: Max results (optional, default: 10)
 * 
 * Returns:
 * - success: boolean
 * - data: Search results array
 * - error: Error message (if failed)
 */
export const myTool = tool(/*...*/);
```

### Document Events

```typescript
/**
 * Event: tool.execute.before
 * 
 * Purpose: Validate tool arguments before execution
 * 
 * Use Cases:
 * - Prevent dangerous operations
 * - Log all tool calls
 * - Modify arguments
 * 
 * Example:
 * ```typescript
 * 'tool.execute.before': async ({ event }) => { ... }
 * ```
 */
```

---

## Common Pitfalls

### ❌ Blocking OpenCode

```typescript
// ❌ BAD: Blocking synchronous operations
'tool.execute.before': async ({ event }) => {
  while (true) { } // Blocks forever!
}
```

### ✅ Non-Blocking Operations

```typescript
// ✅ GOOD: Use async/await or queue
'tool.execute.before': async ({ event }) => {
  await someAsyncOperation(); // Non-blocking
}
```

---

### ❌ Over-Logging

```typescript
// ❌ BAD: Spams console
'command.executed': async ({ event }) => {
  console.log(event.data);  // Logs everything
  console.log(event.data);  // Twice!
}
```

### ✅ Appropriate Logging

```typescript
// ✅ GOOD: Selective, meaningful logging
'command.executed': async ({ event }) => {
  if (event.data.command === 'delete') {
    console.log('Delete command:', event.data.args);
  }
}
```

---

### ❌ No Error Handling

```typescript
// ❌ BAD: Crashes on error
'tool.execute.after': async ({ event }) => {
  const data = await fetchData(event.data); // Might throw
  console.log(data);  // Never reaches here on error
}
```

### ✅ Proper Error Handling

```typescript
// ✅ GOOD: Graceful degradation
'tool.execute.after': async ({ event }) => {
  try {
    const data = await fetchData(event.data);
    console.log(data);
  } catch (error) {
    console.error('Fetch failed:', error);
    // Continue processing
  }
}
```

---

## Deployment

### Build Configuration

```json
// package.json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "type": "module",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "bun build src/index.ts --outdir dist",
    "dev": "bun build src/index.ts --outdir dist --watch",
    "test": "bun test"
  },
  "dependencies": {
    "@opencode-ai/plugin": "latest",
    "zod": "latest"
  }
}
```

### Plugin Manifest

```json
// .claude-plugin/plugin.json
{
  "name": "my-plugin",
  "version": "1.0.0",
  "description": "A custom OpenCode plugin",
  "author": {
    "name": "Your Name",
    "email": "you@example.com"
  },
  "main": "index.ts",
  "capabilities": [
    "custom-tools",
    "custom-agents",
    "event-hooks"
  ]
}
```

---

## Summary

### Key Principles
- ✅ Use TypeScript for type safety
- ✅ Validate inputs with Zod
- ✅ Handle errors gracefully
- ✅ Log appropriately
- ✅ Keep handlers lightweight
- ✅ Test thoroughly
- ✅ Document clearly
- ✅ Optimize performance
- ✅ Prioritize security

### Testing Checklist
- [ ] Build without errors
- [ ] Load in OpenCode
- [ ] Event handlers fire
- [ ] Tools are accessible
- [ ] Agents are available
- [ ] Error handling works
- [ ] Edge cases covered

### Deployment Checklist
- [ ] Dependencies installed
- [ ] Build configuration complete
- [ ] Plugin manifest created
- [ ] Documentation updated
- [ ] Tests passing

---

## Further Reading

- **PLUGIN_OVERVIEW.md** - What are plugins?
- **PLUGIN_ARCHITECTURE.md** - Plugin structure
- **PLUGIN_EVENT_HOOKS.md** - Event hooks
- **PLUGIN_SDK_REFERENCE.md** - API reference
- **PLUGIN_VS_SKILLS.md** - When to use which

---

Happy plugin development! 🚀

Follow these best practices to create robust, maintainable, and user-friendly plugins!
