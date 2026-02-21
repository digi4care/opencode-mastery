---
name: svelte
description: Svelte core concepts - reactivity ($state, $derived, $effect), components, stores, transitions, and animations. Use for Svelte language questions. For SvelteKit routing/server features use svelte-kit skill. For CLI/scaffolding use svelte-cli skill.
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
- Svelte component architecture used inside SvelteKit apps (component layer only)
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

- references/documentation/runes_state.md - Reactivity with $state
- references/documentation/runes_derived.md - Derived values with $derived
- references/documentation/runes_effect.md - Side effects with $effect
- references/documentation/stores.md - Svelte stores
- references/documentation/svelte_files.md - Component patterns and file conventions
- references/documentation/styles.md - Styling and transitions
- references/documentation/lifecycle_hooks.md - Lifecycle patterns
- references/documentation/other.md - Common issues and advanced topics

## Related Skills

- svelte-kit (full-stack framework)
- svelte-cli (project scaffolding)
- svelte-mcp (MCP server)
- tailwind (styling)
