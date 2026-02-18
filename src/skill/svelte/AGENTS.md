# AGENTS.md - Svelte Skill

This file provides guidance to AI agents when working with the Svelte skill.

## Overview

**Complete Svelte and SvelteKit knowledge base** - Covers component development, reactivity, routing, SSR, and framework internals.

## Skill Invocation

```text
\skill:svelte
```

Use this skill when you need knowledge about Svelte or SvelteKit framework.

## Key Topics

### Svelte Core

- **Components** - Props, slots, lifecycle
- **Reactivity** - Runes ($state, $derived, $effect)
- **Directives** - bind, on, use, transition
- **Stores** - State management
- **Lifecycle** - onMount, onDestroy (legacy), $effect (modern Svelte 5)

### SvelteKit Framework

- **Routing** - File-based routing
- **Load functions** - Data fetching
- **Server endpoints** - API routes
- **SSR** - Server-side rendering
- **Adapters** - Deployment

### Advanced Concepts

- **Compiler internals** - How Svelte works
- **Runtime optimization** - Performance
- **TypeScript integration**
- **Testing strategies**

## Common Use Cases

### Getting Started

```text
\skill:svelte How do I create a Svelte app?
\skill:svelte What's the difference between Svelte and SvelteKit?
\skill:svelte How do I set up a new project?
```

### Component Development

```text
\skill:svelte How do I create a component?
\skill:svelte How do I pass props?
\skill:svelte How do I use slots?
\skill:svelte What are lifecycle hooks?
```

### Reactivity

```text
\skill:svelte How do reactive statements work?
\skill:svelte What are runes?
\skill:svelte How do I use $state?
\skill:svelte How do stores work?
```

### SvelteKit

```text
\skill:svelte How do I create a route?
\skill:svelte How do I fetch data?
\skill:svelte How do server endpoints work?
\skill:svelte How do I implement SSR?
```

### Troubleshooting

```text
\skill:svelte Component not updating
\skill:svelte Store not reactive
\skill:svelte SSR issues
\skill:svelte Performance optimization
```

## Quick Reference

### Basic Component

```svelte
<script>
  let count = 0;
  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  Count: {count}
</button>
```

### Reactive Statement

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);
</script>

<p>{doubled}</p>
```

### SvelteKit Route

```svelte
// src/routes/+page.svelte
<script>
  let { data } = $props();
</script>

<h1>{data.title}</h1>
```

### Store Usage

```javascript
// store.js
import { writable } from "svelte/store";
export const count = writable(0);
```

```svelte
<script>
  import { count } from './store.js';
</script>

<p>{$count}</p>
```

## Architecture Patterns

### Component Structure

```svelte
<script>
  // Logic
</script>

<div>
  {@render children?.()}
</div>

<style>
  /* Scoped styles */
</style>
```

### SvelteKit Structure

```
src/
├── routes/          # Pages
├── lib/             # Components
├── app.html         # Template
└── +layout.svelte   # Layout
```

## When to Use

**Use this skill when user asks about:**

- Svelte or SvelteKit fundamentals
- Component development patterns
- Reactivity and state management
- Routing and data fetching
- SSR implementation
- Framework internals
- Debugging Svelte issues

**Invoke with:**

```text
\skill:svelte How do I create a Svelte component?
\skill:svelte How do stores work?
\skill:svelte What's the difference between Svelte and SvelteKit?
```

## Related Skills

- **svelte-cli** - Project scaffolding and CLI tools
- **svelte-kit** - SvelteKit framework specifics
- **svelte-mcp** - AI-assisted development
- **shadcn-svelte** - UI component library

## Additional Resources

- **SKILL.md** - Comprehensive framework guide
- **references/** - Official docs and repositories
- **Svelte.dev**: https://svelte.dev/docs
- **Kit.svelte.dev**: https://kit.svelte.dev/docs

---

_For SvelteKit specifics: Use `\skill:svelte-kit`_
