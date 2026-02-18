# AGENTS.md - Svelte MCP Skill

This file provides guidance to AI agents when working with the Svelte MCP skill.

## Overview

**Svelte Model Context Protocol server** - AI-assisted Svelte/SvelteKit development with documentation, code analysis, and playground integration.

## Skill Invocation

```text
\skill:svelte-mcp
```

Use this skill when you need AI assistance with Svelte development.

## Key Features

### Documentation Access

- **Instant lookup** - Real-time documentation
- **Context-aware** - Relevant to current code
- **Comprehensive** - All Svelte features
- **Searchable** - Quick topic finding

### Static Code Analysis

- **svelte-autofixer** - Automatic fixes
- **Issue detection** - Problems in code
- **Best practices** - Improvement suggestions
- **Performance** - Optimization tips

### Playground Integration

- **Generate links** - Share code snippets
- **Live examples** - Interactive demos
- **URL encoding** - Automatic formatting

## Common Use Cases

### Learning

```text
\skill:svelte-mcp How do reactive statements work?
\skill:svelte-mcp What are runes?
\skill:svelte-mcp How do stores work?
\skill:svelte-mcp What's the difference between Svelte and SvelteKit?
```

### Code Analysis

```text
\skill:svelte-mcp Analyze this component
\skill:svelte-mcp What issues do you see?
\skill:svelte-mcp How can I improve this code?
\skill:svelte-mcp Best practices for this pattern?
```

### Debugging

```text
\skill:svelte-mcp Component not updating
\skill:svelte-mcp Store is not reactive
\skill:svelte-mcp SSR hydration issues
\skill:svelte-mcp Lifecycle hook not firing
```

### Examples

```text
\skill:svelte-mcp Show me a reactive statement example
\skill:svelte-mcp Create a store example
\skill:svelte-mcp How to use lifecycle hooks?
\skill:svelte-mcp SvelteKit route example?
```

## Tools

### svelte-autofixer

Automatic code improvements:

- **Syntax fixes** - Correct errors
- **Best practices** - Suggest patterns
- **Performance** - Optimize code
- **Accessibility** - A11y improvements

### Documentation Search

Find information on:

- **Component APIs** - Props, events, slots
- **Directives** - bind, on, use, transition
- **Reactivity** - Runes and stores
- **Lifecycle** - Hooks and timing

### Playground Generator

```javascript
// Convert code to playground link
const link = await generatePlaygroundUrl(code);
```

## When to Use

**Use this skill when user asks about:**

- Svelte documentation
- Code analysis and suggestions
- Best practices and patterns
- Debugging help
- Learning examples
- Playground links

**Invoke with:**

```text
\skill:svelte-mcp How do I use $state?
\skill:svelte-mcp Analyze this component
\skill:svelte-mcp Show me examples
\skill:svelte-mcp Generate playground link
```

## Example Workflows

### Learning Reactive Statements

1. User asks about reactivity
2. Skill provides explanation
3. Shows code examples
4. Generates playground link

### Code Review

1. User shares component
2. Skill analyzes code
3. Lists issues and suggestions
4. Provides improved version

### Debugging

1. User describes problem
2. Skill diagnoses issue
3. Explains root cause
4. Provides solution

## Integration

### With AI agents

- **Context-aware** - Knows current file
- **Real-time** - Instant feedback
- **Suggestions** - Proactive help
- **Analysis** - Automatic detection

### With VS Code

- **Extension support** - Works with Svelte extension
- **Diagnostics** - Real-time errors
- **Auto-completion** - Context suggestions
- **Quick fixes** - One-click solutions

## Documentation Topics

### Svelte Core

- Components, props, slots
- Reactivity (runes, statements)
- Directives (bind, on, use)
- Stores (writable, readable)
- Lifecycle hooks

### SvelteKit

- File-based routing
- Load functions
- Server endpoints
- SSR and hydration

### Advanced

- Performance optimization
- Accessibility patterns
- Testing approaches
- TypeScript integration

## Quick Reference

### Reactive Statement

```svelte
<script>
  let count = 0;
  $: doubled = count * 2;
</script>
```

### Store

```javascript
// store.js
import { writable } from "svelte/store";
export const count = writable(0);
```

### SvelteKit Route

```svelte
<!-- src/routes/+page.svelte -->
<script>
  export let data;
</script>

<h1>{data.title}</h1>
```

## Additional Resources

- **SKILL.md** - Complete guide
- **references/** - Documentation
- **Svelte.dev**: https://svelte.dev/docs
- **Kit.svelte.dev**: https://kit.svelte.dev/docs

---

_For general Svelte help: Use `\skill:svelte`_
