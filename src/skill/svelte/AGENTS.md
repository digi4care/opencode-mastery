# AGENTS.md - Svelte Skill

**Skill:** Svelte 5 - Reactive UI framework met runes en compile-time optimalisatie

## Overview

Complete Svelte en SvelteKit kennis: components, reactivity, stores, lifecycle, routing, SSR.

## Svelte 5 Runes

```svelte
<script>
  let count = $state(0);
  let doubled = $derived(count * 2);

  $effect(() => {
    console.log(`Count is now ${count}`);
  });
</script>

<button onclick={() => count++}>
  {count} (doubled: {doubled})
</button>
```

## Key Concepts

| Concept | Svelte 5 Rune          | Legacy         |
| ------- | ---------------------- | -------------- |
| State   | `$state()`             | `let x = 0`    |
| Derived | `$derived()`           | `$: doubled`   |
| Effect  | `$effect()`            | `onMount()`    |
| Props   | `let { x } = $props()` | `export let x` |

## Store Pattern

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

## Anti-Patterns

| Niet doen                | Wel doen                  |
| ------------------------ | ------------------------- |
| `$:` reactive statements | `$derived()` in Svelte 5  |
| `export let prop`        | `$props()` in Svelte 5    |
| `onMount` lifecycle      | `$effect()` in Svelte 5   |
| Direct DOM manipulation  | Svelte bindings gebruiken |

## When to Use

- Svelte component development
- Reactivity en state management
- SvelteKit routing en SSR
- Store patterns
- Debugging Svelte issues

## Related Skills

- **svelte-kit** - Full-stack framework details
- **svelte-cli** - Project scaffolding
- **svelte-mcp** - AI-assisted development
- **shadcn-svelte** - UI components

## Resources

- **SKILL.md** → Comprehensive framework guide
- **Svelte Docs**: https://svelte.dev/docs
- **SvelteKit Docs**: https://kit.svelte.dev/docs
