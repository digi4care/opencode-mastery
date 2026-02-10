# OpenCode Plugin Examples

This directory contains progressive OpenCode plugin examples that demonstrate different levels of complexity and capability. Each tier builds upon the previous one, showing how to scale from a simple event hook to a full-featured plugin with custom tools and agents.

## 📚 Learning Path

Follow tiers in order to build your understanding:

```
Tier 1 (Minimal) → Tier 2 (Intermediate) → Tier 3 (Advanced)
    ⭐                    ⭐⭐                    ⭐⭐⭐
```

## 🎯 Tiers Overview

| Tier | Example | Complexity | Files | Use Case | Learning Curve |
|------|----------|-------------|--------|-----------|---------------|
| **1** | `minimal-plugin/` | ⭐ Minimal | 1 (index.ts) | Event Logging | 5 minutes |
| **2** | `intermediate-plugin/` | ⭐⭐ Intermediate | 1 (index.ts) | Custom Tools + Agents | 15 minutes |
| **3** | `advanced-plugin/` | ⭐⭐⭐ Advanced | 1 + dirs | Full Capabilities | 30+ minutes |

---

## Tier 1: Minimal Plugin ⭐

**Location**: `minimal-plugin/`

**What it demonstrates**:
- Basic plugin structure (single file)
- Event hook subscription
- Simple logging
- Plugin = TypeScript/JavaScript code, not Markdown

**Files**:
```
minimal-plugin/
└── index.ts
```

**Key concepts**:
- Plugins are TypeScript/JavaScript modules
- Export async function as plugin entry point
- Subscribe to events in return object
- Access context object (project, client, $ shell)

**Use case**: 
- Event logging
- Simple monitoring
- Proof of concept

**How to use**:
1. Place in `.opencode/plugin/` (project) or `~/.config/opencode/plugin/` (global)
2. Restart OpenCode
3. Events will be logged to console

**Learning objectives**:
- ✅ Understand plugin basic structure
- ✅ Learn event subscription pattern
- ✅ Grasp context object access
- ✅ See plugins vs skills difference

---

## Tier 2: Intermediate Plugin ⭐⭐

**Location**: `intermediate-plugin/`

**What it demonstrates**:
- Custom tools with Zod schemas
- Custom agents with scoped tools
- Tool interceptie (before/after)
- Agent registration

**Files**:
```
intermediate-plugin/
└── index.ts
```

**Key concepts**:
- Custom tools have Zod schema for type safety
- Tools can access shell API ($)
- Agents can have scoped toolsets
- Plugins can extend OpenCode config

**How to use**:
```bash
# Build
bun build src/index.ts --outdir dist

# Watch mode
bun build src/index.ts --outdir dist --watch
```

**Custom Tools**:
- `calculateDistance` - Distance calculator with Zod validation
- Accessible to AI during conversations

**Custom Agents**:
- `math-helper` - Specialized for calculations
- Scoped tools: only math-related tools

**Learning objectives**:
- ✅ Create custom tools with Zod schemas
- ✅ Register custom agents
- ✅ Use tool interceptie
- ✅ Scope tools for safety/focus

---

## Tier 3: Advanced Plugin ⭐⭐⭐

**Location**: `advanced-plugin/`

**What it demonstrates**:
- Multiple event hooks (tools, commands, files, sessions)
- Multiple custom tools
- Custom agent with personality
- Tool validation in before hook
- Session lifecycle management
- Multi-file structure potential

**Files**:
```
advanced-plugin/
├── agents/        # Helper modules (optional)
├── commands/      # Custom commands (optional)
├── hooks/         # Event handlers (optional)
└── index.ts        # Main plugin export
```

**Architecture**:
```
┌─────────────────────────────────────┐
│          index.ts (Main Export)     │
├─────────────────────────────────────┤
│ Tools:                           │
│  • analyze_complexity              │
│  • get_session_stats              │
├─────────────────────────────────────┤
│ Agents:                          │
│  • code-quality-assistant         │
├─────────────────────────────────────┤
│ Event Hooks:                      │
│  • tool.execute.before (validate)   │
│  • tool.execute.after (log)       │
│  • command.executed (monitor)      │
│  • file.edited (track)            │
│  • session.created (init)         │
│  • session.idle (cleanup)        │
└─────────────────────────────────────┘
```

**Key Features**:

**Custom Tools**:
- `analyze_complexity` - Code complexity analysis
  - Language support
  - Complexity scoring
  - Quality rating
  
- `get_session_stats` - Session information
  - Session ID
  - Timestamp
  - Plugin capabilities

**Custom Agents**:
- `code-quality-assistant`
  - Specialized instructions
  - Scoped tools
  - Model selection

**Event Hooks**:
- `tool.execute.before` - Validate tool arguments
  - Prevent dangerous operations
  - Log all tool calls
  
- `tool.execute.after` - Track usage
  - Log success/failure
  - Collect statistics
  
- `command.executed` - Monitor commands
  - Audit log
  - Usage tracking
  
- `file.edited` - Track file changes
  - Auto-format
  - Lint on save
  
- `session.created/idle` - Lifecycle management
  - Initialize state
  - Cleanup resources

**Learning objectives**:
- ✅ Implement multiple event hooks
- ✅ Create production-ready plugins
- ✅ Add tool validation
- ✅ Manage session lifecycle
- ✅ Implement custom agents

---

## 📖 Additional Documentation

### Plugin Fundamentals
- **PLUGIN_OVERVIEW.md** - What are plugins?
- **PLUGIN_VS_SKILLS.md** - When to use which?

### Technical Details
- **PLUGIN_ARCHITECTURE.md** - Structure and SDK
- **PLUGIN_EVENT_HOOKS.md** - 25+ event hooks
- **PLUGIN_SDK_REFERENCE.md** - API reference

### Best Practices
- **PLUGIN_BEST_PRACTICES.md** - Guidelines and patterns

---

## 🚀 Getting Started

### For Beginners (New to Plugins)

Start with **Tier 1** to understand basics:
```bash
cd minimal-plugin
cat index.ts
```

### For Intermediate Users

Move to **Tier 2** to learn tools and agents:
```bash
cd intermediate-plugin
cat index.ts
```

### For Advanced Users

Explore **Tier 3** for full capabilities:
```bash
cd advanced-plugin
cat index.ts
```

---

## 📊 Comparison Matrix

### Capabilities

| Feature | Tier 1 | Tier 2 | Tier 3 |
|---------|---------|----------|----------|
| Event Hooks | ✅ (1) | ✅ (3) | ✅ (6+) |
| Custom Tools | ❌ | ✅ (2) | ✅ (2+) |
| Custom Agents | ❌ | ✅ (1) | ✅ (1+) |
| Tool Interception | ❌ | ✅ | ✅ |
| Session Management | ❌ | ❌ | ✅ |
| File Tracking | ❌ | ❌ | ✅ |
| Config Extension | ❌ | ✅ | ✅ |

### Plugin vs Skills

| Aspect | Skills | Plugins |
|---------|---------|----------|
| **Format** | Markdown (.md) | TypeScript (.ts) / JavaScript (.js) |
| **Complexity** | Low | Medium-High |
| **Execution** | Via bash tool | Direct execution |
| **Tools** | Via script | Custom tools with Zod schemas |
| **Agents** | Via config | Custom agents with scoped tools |
| **Hooks** | None | 25+ event hooks |
| **SDK Access** | Limited | Full API (session, TUI, shell) |
| **Best For** | Simple instructions | Advanced features |

---

## 🔍 Common Patterns

### Event Logging
Use `command.executed` to track all commands:
```typescript
'command.executed': async ({ event }) => {
  console.log(`Command: ${event.data.command}`);
}
```

### Tool Validation
Validate tool arguments in `tool.execute.before`:
```typescript
'tool.execute.before': async ({ event }) => {
  if (event.data.toolName === 'delete') {
    // Validate before execution
  }
}
```

### Custom Tools
Define tools with Zod for type safety:
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

### Custom Agents
Register agents with scoped tools:
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

---

## 🐛 Troubleshooting

### Common Issues

**Issue**: Plugin not loading
- Check file extension is `.ts` or `.js`
- Verify plugin is in `.opencode/plugin/` or `~/.config/opencode/plugin/`
- Restart OpenCode

**Issue**: Event hooks not firing
- Verify event name is correct (see PLUGIN_EVENT_HOOKS.md)
- Check console for errors
- Ensure plugin is returning event handlers

**Issue**: Build errors
- Install dependencies: `bun install`
- Check TypeScript version compatibility
- Verify `@opencode-ai/plugin` is installed

**Issue**: Tool not available
- Ensure tool is exported
- Check tool is in plugin return object
- Verify tool name matches reference

---

## 📈 Roadmap

### Completed
- ✅ Tier 1: Minimal plugin
- ✅ Tier 2: Intermediate plugin
- ✅ Tier 3: Advanced plugin
- ✅ Complete documentation

### Future Enhancements
- ⏳ Plugin packaging (NPM distribution)
- ⏳ Plugin testing framework
- ⏳ Multi-file plugin examples
- ⏳ Plugin marketplace integration

---

## 🤝 Contributing

Have ideas for new plugin examples or improvements?

1. Fork repository
2. Create a new example or enhance existing ones
3. Test thoroughly
4. Submit a pull request

**Guidelines**:
- Follow best practices from `PLUGIN_BEST_PRACTICES.md`
- Document new patterns in relevant documentation
- Update this README with new examples
- Ensure all code compiles without errors

---

## 📄 License

This examples repository is part of OpenCode Mastery and follows the same license terms.

---

## 🙏 Acknowledgments

Inspired by and patterns learned from:
- [OpenCode-plugin-starter](https://github.com/darrenhinde/OpenCode-plugin-starter) by Darren Hinde
- OpenCode community contributions
- Real-world plugin implementations

---

**Happy Coding! 🚀**

For questions or issues, please refer to main OpenCode Mastery documentation or submit an issue.
