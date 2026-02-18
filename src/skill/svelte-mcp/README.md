# Svelte MCP Skill

**Svelte Model Context Protocol server** for AI-assisted Svelte/SvelteKit development.

## Overview

The Svelte MCP server helps LLMs and AI agents write better Svelte code by providing:

- **Real-time documentation access** - Instant answers
- **Static code analysis** - svelte-autofixer
- **Playground link generation** - Code sharing
- **AI-assisted development** - Intelligent suggestions

## When to Use This Skill

Use this skill when you need to:

- **Get Svelte documentation** - Quick reference
- **Analyze code quality** - Static analysis
- **Generate playground links** - Share code examples
- **Debug Svelte issues** - AI-assisted troubleshooting
- **Learn best practices** - Code quality improvements
- **Get suggestions** - AI-powered recommendations

## Key Features

### Documentation Access

- **Instant lookup** - No web searching needed
- **Comprehensive coverage** - All Svelte features
- **Context-aware** - Relevant to current code
- **Searchable** - Find topics quickly

### Code Analysis

- **svelte-autofixer** - Automatic code fixes
- **Static analysis** - Detect issues
- **Best practices** - Suggest improvements
- **Performance** - Optimization tips

### Playground Integration

- **Generate links** - Share code snippets
- **Live examples** - Interactive demos
- **URL encoding** - Automatic formatting
- **Import support** - From npm and CDN

## Usage

### Documentation Lookup

```text
How do I use reactive statements in Svelte?
What are the lifecycle hooks?
How do I create a store?
```

### Code Analysis

```text
Analyze this component for issues
What can be improved in this code?
Show me best practices for this pattern
```

### Playground

```text
Generate a playground link for this code
Create an example of reactive statements
Show me a working store example
```

## Common Use Cases

### Learning

```text
\skill:svelte-mcp How do reactive statements work?
\skill:svelte-mcp What's the difference between $: and $state?
\skill:svelte-mcp How do stores work?
```

### Debugging

```text
\skill:svelte-mcp Component not updating
\skill:svelte-mcp Store is not reactive
\skill:svelte-mcp SSR hydration issues
```

### Best Practices

```text
\skill:svelte-mcp Best practices for components
\skill:svelte-mcp How to structure a Svelte app
\skill:svelte-mcp Performance optimization tips
```

### Code Examples

```text
\skill:svelte-mcp Show me a reactive statement example
\skill:svelte-mcp Create a store example
\skill:svelte-mcp How to use lifecycle hooks
```

## Tools

### svelte-autofixer

Automatically fixes common issues:

- **Syntax errors** - Correct automatically
- **Best practices** - Suggest improvements
- **Performance** - Optimization recommendations
- **Accessibility** - A11y improvements

### Documentation Search

- **Component APIs** - Props, events, slots
- **Directives** - bind, on, use, transition
- **Reactivity** - Runes and stores
- **Lifecycle** - Hooks and timing

### Playground Generator

```javascript
// Example code gets converted to playground link
const link = generatePlaygroundUrl(code);
```

## Integration

### With Claude Code

The MCP server integrates seamlessly with Claude Code:

- **Context-aware** - Knows current file
- **Automatic suggestions** - Proactive help
- **Real-time analysis** - Instant feedback
- **Documentation lookup** - No switching context

### With VS Code

- **Extension support** - Works with Svelte extension
- **Diagnostics** - Real-time error detection
- **Auto-completion** - Context-aware suggestions
- **Quick fixes** - One-click solutions

## Example Workflows

### 1. Learning Reactive Statements

```text
User: How do I make a value reactive in Svelte?
Skill: Shows $state usage with examples
Playground: Generates interactive example
```

### 2. Code Review

```text
User: Analyze this component
Skill: Runs static analysis
Output: List of issues and suggestions
Playground: Links to fixed versions
```

### 3. Debugging

```text
User: My component isn't updating
Skill: Checks for reactivity issues
Output: Identifies problem and solution
```

## Documentation Coverage

### Svelte Core

- **Components** - Structure and props
- **Reactivity** - Runes and statements
- **Directives** - All directive types
- **Stores** - State management
- **Lifecycle** - Hooks and timing

### SvelteKit

- **Routing** - File-based system
- **Load functions** - Data fetching
- **Server endpoints** - API routes
- **SSR** - Server-side rendering

### Advanced Topics

- **Performance** - Optimization
- **Accessibility** - A11y patterns
- **Testing** - Component tests
- **TypeScript** - Type safety

## Benefits

- **Instant Help** - No web searches needed
- **Context-Aware** - Understands current code
- **Practical Examples** - Real-world patterns
- **Best Practices** - Proven approaches
- **AI-Powered** - Intelligent suggestions
- **Integration** - Works with tools

## Additional Resources

- **Official Docs**: https://svelte.dev/docs
- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **GitHub**: https://github.com/sveltejs/mcp
- **SKILL.md** - Complete guide
- **references/** - Additional docs

---

**For comprehensive documentation, see [SKILL.md](SKILL.md)**
