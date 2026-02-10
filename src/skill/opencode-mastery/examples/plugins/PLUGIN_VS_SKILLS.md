# Plugins vs Skills: When to Use Which?

## Quick Reference

| Use Case | Use | Why |
|----------|------|------|
| **Simple instructions** | Skill | Markdown, human-readable, quick |
| **Custom tools** | Plugin | TypeScript, type-safe, Zod schemas |
| **Event hooks** | Plugin | Interception, modification, lifecycle |
| **Custom agents** | Plugin | Scoped tools, model selection, personality |
| **Production features** | Plugin | Full SDK access, testing, deployment |

---

## Decision Tree

```
Need to extend OpenCode?
├─ Simple, human-readable instructions?
│  └─→ Use SKILL
├─ Type-safe custom tools?
│  └─→ Use PLUGIN
├─ Event interception?
│  └─→ Use PLUGIN
├─ Custom agents?
│  └─→ Use PLUGIN
└─ Full SDK access?
   └─→ Use PLUGIN
```

---

## Detailed Comparison

### Skills

**Format**: Markdown (.md) files with YAML frontmatter

**Best For**:
- Quick prototyping (5 minutes)
- Human-readable documentation
- Simple configuration
- Educational content
- Version control friendly

**Capabilities**:
- ✅ Instructions for AI
- ✅ Workflow documentation
- ✅ Learning objectives
- ✅ Best practices

**Limitations**:
- ❌ No event hooks
- ❌ No tool interception
- ❌ Limited SDK access
- ❌ No custom tools
- ❌ No custom agents

**Example Use Cases**:
- Code review guidelines
- Documentation generation
- Project-specific conventions
- Learning resources

---

### Plugins

**Format**: TypeScript (.ts) or JavaScript (.js) modules

**Best For**:
- Custom tool development
- Event interception
- Custom agents with scoped tools
- UI extensions
- Production deployment

**Capabilities**:
- ✅ 25+ event hooks
- ✅ Custom tools with Zod
- ✅ Custom agents
- ✅ Tool interception (before/after)
- ✅ Full SDK access
- ✅ Session management
- ✅ TUI extensions

**Limitations**:
- ⚠️ More complex (steeper learning curve)
- ⚠️ Requires TypeScript/JavaScript
- ⚠️ Build step required
- ⚠️ More maintenance overhead

**Example Use Cases**:
- Custom database tools
- CI/CD integration
- Auto-formatting/linting
- Custom agents for specific tasks
- Performance monitoring

---

## Comparison Table

| Aspect | Skills | Plugins |
|---------|---------|----------|
| **Format** | Markdown (.md) | TypeScript (.ts) / JavaScript (.js) |
| **Complexity** | ⭐ Low | ⭐⭐⭐⭐ High |
| **Learning Curve** | 5 minutes | 30-60 minutes |
| **Execution** | Via bash tool | Direct execution |
| **Type Safety** | None | Zod schemas |
| **Event Hooks** | None | 25+ hooks |
| **Custom Tools** | Via scripts | Custom with Zod |
| **Custom Agents** | Via config | Custom with scoped tools |
| **Interception** | None | Before/After hooks |
| **SDK Access** | Limited (bash tool) | Full (session, TUI, shell) |
| **Build Required** | No | Yes |
| **Testing** | Manual testing | Automated testing possible |
| **Version Control** | Git-friendly | Git-friendly |
| **Distribution** | Copy/paste | NPM packages possible |
| **Best For** | Simple instructions | Advanced features |
| **Use Cases** | Documentation, guidelines | Tools, agents, events |

---

## When to Choose

### Choose Skills When:

1. **Quick Prototyping** ⚡
   - You have a simple idea
   - Want to test in 5 minutes
   - Don't need complex features

2. **Human-Readable Content** 📝
   - Instructions for team members
   - Educational material
   - Documentation
   - Best practices guides

3. **Simple Configuration** ⚙️
   - Setting project preferences
   - Defining workflows
   - Simple rules/constraints
   - Environment-specific settings

4. **Low Complexity** 🎯
   - Straightforward use cases
   - No event handling needed
   - No tool interception required
   - Simple instructions sufficient

### Choose Plugins When:

1. **Custom Tools** 🛠️
   - Need type-safe tool definitions
   - Want Zod schema validation
   - Building reusable tools
   - Complex tool logic

2. **Event Interception** 🔗
   - Need to hook into OpenCode lifecycle
   - Want to intercept/modify tool calls
   - Need before/after hooks
   - Event-driven behavior

3. **Custom Agents** 🤖
   - Need specialized AI personalities
   - Want scoped toolsets for safety
   - Specific model selection per agent
   - Custom system instructions

4. **Full SDK Access** 📱
   - Need to access session API
   - Want to extend TUI
   - Need shell API access
   - Integration with external systems

5. **Production Deployment** 🚀
   - Building reusable packages
   - Distributing plugins
   - Automated testing
   - CI/CD integration

---

## Hybrid Approach

You can combine both for maximum flexibility:

### Example: Skill + Plugin
```
Skill: Define high-level workflows and documentation
Plugin: Provide custom tools and event hooks
```

### When to Use Hybrid:
- Complex workflows with custom tools
- Documentation for plugin features
- Skills guide AI, plugins extend capabilities

---

## Real-World Examples

### Skill Example
**Use Case**: Code Review Guidelines

```markdown
---
name: code-review-guidelines
description: Team code review standards
---

## Code Review Checklist

- [ ] Naming conventions followed
- [ ] Error handling present
- [ ] Tests included
- [ ] Documentation updated
```

**Why Skill?**
- Simple, human-readable guidelines
- Quick to create and modify
- Team collaboration focused

### Plugin Example
**Use Case**: Auto-Format on File Edit

```typescript
export const autoFormatPlugin = async (context) => {
  return {
    'file.edited': async ({ event }) => {
      const filePath = event.data.filePath;
      await formatFile(filePath);
    }
  };
};
```

**Why Plugin?**
- Event interception needed (`file.edited`)
- Automated execution
- No user interaction required

---

## Migration Path

### Skill → Plugin Migration

When you outgrow a skill:

1. **Identify the need**
   - Need custom tools? → Migrate to plugin
   - Need event hooks? → Migrate to plugin
   - Need custom agents? → Migrate to plugin

2. **Convert the skill**
   - Extract instructions → TypeScript code
   - Add Zod schemas for inputs
   - Implement event handlers

3. **Test thoroughly**
   - Build without errors
   - Load in OpenCode
   - Verify functionality

4. **Remove old skill**
   - Delete `.md` file
   - Update documentation
   - Commit changes

---

## Best Practices

### For Skills
- Keep it simple and focused
- Use clear, actionable instructions
- Include learning objectives
- Document why decisions were made

### For Plugins
- Start with minimal hooks
- Add complexity incrementally
- Test each feature thoroughly
- Use Zod for type safety
- Handle errors gracefully
- Log debugging information

---

## Decision Framework

Use this framework when deciding:

```
1. What is the primary goal?
   - Instruction/documentation → Skill
   - Execution/automation → Plugin

2. What features are required?
   - Simple, human-readable → Skill
   - Custom tools/agents → Plugin
   - Event hooks → Plugin

3. What is the complexity?
   - Low (quick, simple) → Skill
   - Medium-High (advanced features) → Plugin

4. What is the timeline?
   - Immediate prototype → Skill
   - Production-ready → Plugin
```

---

## Summary

| Decision | Use | Confidence |
|----------|------|------------|
| Quick, simple, human-readable | SKILL | 95% |
| Custom tools, type-safe | PLUGIN | 95% |
| Event hooks, interception | PLUGIN | 100% |
| Custom agents, scoped tools | PLUGIN | 95% |
| Low complexity, prototype | SKILL | 90% |
| Production-ready, advanced | PLUGIN | 90% |

---

## Further Reading

- **PLUGIN_OVERVIEW.md** - What are plugins?
- **PLUGIN_ARCHITECTURE.md** - Plugin structure
- **PLUGIN_EVENT_HOOKS.md** - 25+ event hooks
- **PLUGIN_SDK_REFERENCE.md** - API reference
- **PLUGIN_BEST_PRACTICES.md** - Guidelines

- **examples/README.md** - Skill examples
- **examples/BEST_PRACTICES.md** - Skill best practices
- **examples/WORKFLOW_PATTERNS.md** - Workflow patterns

---

## Conclusion

**Skills** are perfect for quick, human-readable instructions and documentation.

**Plugins** are ideal for advanced features, custom tools, event hooks, and production-ready extensions.

**Choose wisely** based on your use case, complexity, and requirements. Both have their place in the OpenCode ecosystem!
