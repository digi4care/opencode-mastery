---
name: svelte
description: Complete Svelte and SvelteKit knowledge base combining official documentation and GitHub repositories. Use when building Svelte components, working with reactivity, stores, animations, or SvelteKit applications.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "2.0"
  source: https://svelte.dev/docs
---

# Svelte Expert

Complete Svelte knowledge base combining official documentation and real-world patterns.

## When to Use

- Building Svelte components
- Working with Svelte reactivity (runes)
- State management with stores
- Animations and transitions
- SvelteKit full-stack development
- Component composition patterns

## Quick Reference

### Svelte 5 Runes

```svelte
<script>
  let count = $state(0);
  double = $derived(count * 2);

  function increment() {
    count += 1;
  }
</script>

<button onclick={increment}>
  {count} x 2 = {double}
</button>
```

### Stores

```javascript
import { writable } from "svelte/store";
const count = writable(0);
```

### Props

```svelte
<script>
  let { name = 'World', ...props } = $props();
</script>
```

## References

- references/svelte-5-runes.md - Reactivity with $state, $derived, $effect
- references/stores.md - Svelte stores
- references/components.md - Component patterns
- references/animations.md - Transitions and animations
- references/sveltekit.md - SvelteKit integration
- references/troubleshooting.md - Common issues

## Related Skills

- svelte-kit (full-stack framework)
- svelte-cli (project scaffolding)
- svelte-mcp (MCP server)
- tailwind (styling)
