# OpenCode Plugin Overview

## What Are Plugins?

OpenCode plugins are **TypeScript or JavaScript modules** that extend OpenCode's capabilities beyond what skills can provide. While skills are **instruction-based Markdown files**, plugins are **executable code** that can:

- Hook into 25+ lifecycle events
- Create custom tools with type-safe schemas
- Define custom agents with scoped toolsets
- Intercept and modify tool executions
- Access the full OpenCode SDK

---

## Skills vs Plugins

| Aspect | Skills | Plugins |
|---------|---------|----------|
| **Format** | Markdown (.md) | TypeScript (.ts) / JavaScript (.js) |
| **Execution** | Via bash tool | Direct execution |
| **Complexity** | Low | Medium-High |
| **Tools** | Via scripts | Custom tools with Zod schemas |
| **Agents** | Via config | Custom agents with scoped tools |
| **Hooks** | None | 25+ event hooks |
| **SDK Access** | Limited | Full API (session, TUI, shell) |
| **Best For** | Simple instructions | Advanced features |

---

## When to Use Plugins vs Skills

### Use Skills When:
✅ You need simple, human-readable instructions
✅ You want quick prototyping
✅ You don't need event interception
✅ Your use case is straightforward

### Use Plugins When:
✅ You need type-safe custom tools
✅ You want to intercept tool executions
✅ You need custom agents with scoped tools
✅ You require event-driven behavior
✅ You want to extend OpenCode's UI or session management

---

## Key Plugin Features

### 1. Custom Tools
Define tools with Zod schemas for type safety:
```typescript
import { tool } from '@opencode-ai/plugin';
import { z } from 'zod';

export const myTool = tool(
  z.object({ query: z.string() }),
  async (args, context) => {
    // Implementation
    return { success: true };
  }
).describe('My custom tool');
```

### 2. Custom Agents
Register specialized agents:
```typescript
export const myPlugin = async (context) => {
  return {
    config: async (currentConfig) => ({
      ...currentConfig,
      agents: [{
        name: 'my-agent',
        tools: ['my-tool', 'read', 'write']
      }]
    })
  };
};
```

### 3. Event Hooks
Subscribe to 25+ lifecycle events:
```typescript
export const myPlugin = async (context) => {
  return {
    'tool.execute.before': async ({ event }) => {
      // Intercept before execution
    },
    'command.executed': async ({ event }) => {
      // Log commands
    }
  };
};
```

### 4. SDK Access
Access full OpenCode capabilities:
```typescript
context.client.session.prompt()  // Send prompts
context.client.tui.showToast()  // UI notifications
context.$  // Bun shell API
```

---

## Plugin Types

### Local Plugins
- Location: `.opencode/plugin/` (project) or `~/.config/opencode/plugin/` (global)
- Auto-discovered by OpenCode
- Drop `.ts` or `.js` files and they work

### NPM Plugins
- Published as npm packages
- Installed via `npm install`
- Distributed and shared across projects

---

## Getting Started

1. **Learn Basics** → See `minimal-plugin/`
2. **Custom Tools** → See `intermediate-plugin/`
3. **Full Capabilities** → See `advanced-plugin/`

## Documentation

- **PLUGIN_ARCHITECTURE.md** - Structure and SDK
- **PLUGIN_EVENT_HOOKS.md** - 25+ event hooks
- **PLUGIN_SDK_REFERENCE.md** - API reference
- **PLUGIN_BEST_PRACTICES.md** - Guidelines
- **PLUGIN_VS_SKILLS.md** - When to use which
