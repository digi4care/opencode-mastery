# Svelte Skill

**Complete Svelte and SvelteKit knowledge base** combining official documentation with GitHub repository analysis.

## Overview

This skill provides comprehensive knowledge of:

- **Svelte core framework** - Components, reactivity, runes
- **SvelteKit framework** - Full-stack web applications
- **Compiler internals** - How Svelte compiles components
- **Runtime behavior** - Execution and optimization
- **Best practices** - Proven patterns and approaches

## When to Use This Skill

Use this skill when you need to:

- **Build Svelte/SvelteKit applications** - From basics to advanced
- **Understand compiler/runtime internals** - Deep framework knowledge
- **Debug framework issues** - Troubleshooting and solutions
- **Learn reactivity patterns** - Runes and reactive statements
- **Master component development** - Props, slots, lifecycle
- **Optimize performance** - Compilation and runtime optimization

## Key Topics

### Svelte Core

- **Components** - Structure, props, slots
- **Reactivity** - Runes ($state, $derived, $effect)
- **Directives** - bind, on, use, transition
- **Stores** -Writable, readable, derived stores
- **Lifecycle** - onMount, onDestroy, afterUpdate

### SvelteKit Framework

- **Routing** - File-based routing system
- **Load functions** - Data loading and fetching
- **Server endpoints** - API routes and handlers
- **Server-side rendering** - SSR and hydration
- **Adapters** - Deployment targets

### Advanced Concepts

- **Compiler** - How Svelte transforms code
- **Optimization** - Dead code elimination
- **Accessibility** - A11y best practices
- **Testing** - Component and integration tests
- **TypeScript** - Type safety and integration

## Quick Start

### Create Svelte App

```bash
npm create svelte@latest my-app
cd my-app
npm install
npm run dev
```

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

<p>{count} doubled is {doubled}</p>
```

### SvelteKit Route

```svelte
// src/routes/+page.svelte
<script>
  let { data } = $props();
</script>

<h1>{data.title}</h1>
```

## Architecture

### Component Structure

```svelte
<script>
  // Logic
</script>

<!-- Markup -->
<div class="component">
  {@render children?.()}
</div>

<style>
  /* Scoped styles */
</style>
```

### SvelteKit Structure

```
src/
├── routes/
│   ├── +page.svelte      # Page
│   ├── +layout.svelte    # Layout
│   └── api/
│       └── +server.js    # Endpoint
├── lib/
│   └── components/       # Components
└── app.html              # HTML template
```

## Common Patterns

### Store Pattern

```javascript
// stores.js
import { writable } from "svelte/store";
export const count = writable(0);
```

```svelte
<script>
  import { count } from './stores.js';
</script>

<p>Count: {$count}</p>
<button onclick={() => count.update(n => n + 1)}>
  Increment
</button>
```

### Form Handling

```svelte
<script>
  let name = '';

  function handleSubmit() {
    console.log(name);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input bind:value={name} />
  <button type="submit">Submit</button>
</form>
```

### Async Data

```svelte
<script>
  import { onMount } from 'svelte';

  let data = [];

  onMount(async () => {
    const response = await fetch('/api/data');
    data = await response.json();
  });
</script>
```

### Modern Svelte 5: Using $effect

```svelte
<script>
  let data = $state([]);

  $effect(async () => {
    const response = await fetch('/api/data');
    data = await response.json();
  });
</script>
```

> **Note**: `onMount` still works in Svelte 5, but `$effect` is the modern rune-based approach. Both are valid.

### $effect Patterns

#### 1. Basic Effect

```svelte
<script>
  let count = $state(0);

  $effect(() => {
    console.log('Count changed to:', count);
  });
</script>
```

#### 2. Effect with Cleanup

```svelte
<script>
  let timer = $state(null);

  $effect(() => {
    timer = setInterval(() => {
      console.log('tick');
    }, 1000);

    return () => clearInterval(timer);
  });
</script>
```

#### 3. Canvas/DOM Manipulation

```svelte
<script>
  let canvas;
  let size = $state(50);
  let color = $state('#ff3e00');

  $effect(() => {
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = color;
    context.fillRect(0, 0, size, size);
  });
</script>

<canvas bind:this={canvas} width="200" height="200"></canvas>
```

#### 4. Third-party Library Integration

```svelte
<script>
  let chart;

  $effect(() => {
    // Initialize chart only when component mounts
    const chartInstance = new Chart(chart, {
      type: 'bar',
      data: { labels: ['A', 'B', 'C'], datasets: [{ data: [1, 2, 3] }] }
    });

    // Cleanup on destroy
    return () => chartInstance.destroy();
  });
</script>

<canvas bind:this={chart}></canvas>
```

#### 5. Effect with Dependencies

```svelte
<script>
  let userId = $state(1);
  let userData = $state(null);

  $effect(() => {
    // Re-runs when userId changes
    fetch(`/api/users/${userId}`)
      .then(res => res.json())
      .then(data => userData = data);
  });
</script>
```

#### 6. Async $effect ⚠️

```svelte
<script>
  let data = $state([]);

  $effect(async () => {
    // Async effects work but have considerations:
    // - Dependencies tracked BEFORE await
    // - Async code doesn't track dependencies
    const response = await fetch('/api/data');
    data = await response.json();
  });
</script>
```

> **Warning**: Async $effect has caveats. Dependencies are tracked synchronously, so values read after `await` won't trigger re-runs. Consider using `$derived` for async computations instead.

#### 7. $effect.pre (Before DOM Updates)

```svelte
<script>
  let count = $state(0);

  $effect.pre(() => {
    // Runs BEFORE DOM updates
    console.log('Before render:', count);
  });
</script>
```

#### 8. $effect.tracking (Advanced)

```svelte
<script>
  let isTracked = $state(false);

  $effect(() => {
    isTracked = $effect.tracking();
  });
</script>
```

## Best Practices

### Performance

- Use reactive statements efficiently
- Minimize DOM updates
- Leverage compiler optimizations
- Use `{#if}` for conditional rendering

### Accessibility

- Use semantic HTML
- Implement keyboard navigation
- Provide ARIA labels
- Test with screen readers

### Code Organization

- Keep components focused
- Use stores for shared state
- Extract reusable logic
- Follow naming conventions

## Testing

### Component Testing

```javascript
import { render } from "@testing-library/svelte";
import Component from "./Component.svelte";

test("renders button", () => {
  const { getByText } = render(Component, {
    props: { count: 0 },
  });

  expect(getByText("Count: 0")).toBeTruthy();
});
```

## Integration

### With TypeScript

```svelte
<script lang="ts">
  interface Props {
    name: string;
  }

  let { name }: Props = $props();
</script>
```

### With Tailwind CSS

```svelte
<div class="bg-blue-500 text-white p-4 rounded">
  Styled with Tailwind
</div>
```

## Resources

- **Official Documentation**: https://svelte.dev/docs
- **SvelteKit Docs**: https://kit.svelte.dev/docs
- **GitHub Repository**: https://github.com/sveltejs/svelte
- **SKILL.md** - Complete framework guide
- **references/** - Additional documentation

---

**For comprehensive documentation, see [SKILL.md](SKILL.md)**
