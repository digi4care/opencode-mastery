# AGENTS.md - Tailwind CSS Skill v4

This file provides guidance to AI agents when working with Tailwind CSS v4.

## Overview

**Tailwind CSS v4 with CSS-first configuration** - Modern utility-first CSS framework with `@import "tailwindcss"`, `@theme`, `@utility`, and `@plugin` directives.

## Skill Invocation

```text
\skill:tailwind-expert:tailwind
```

Use this skill when you need knowledge about Tailwind CSS v4.

## Key Topics

### Tailwind v4 Setup
- **CSS-first config**: `@import "tailwindcss"` replaces `@tailwind` directives
- **@theme block**: CSS variables for colors, spacing, fonts, animations
- **@utility**: Define custom utilities in CSS
- **@plugin**: Load official and custom plugins
- **Auto content detection**: No explicit content paths needed

### Grid Layouts
- **grid-cols-***: Column counts from 1-12
- **col-span-***: Column spanning
- **row-span-***: Row spanning
- **gap-***: Spacing between grid items
- **grid-flow-dense**: Dense packing algorithm

### Container Queries
- **@container**: Enable container queries on parent
- **@<breakpoint>**: Responsive to container size
- **@min-*** / @max-***: Min/max width queries
- Requires `@plugin "@tailwindcss/container-queries"`

### Modern CSS Features
- **@import "tailwindcss"**: New import syntax
- **@theme { --color-* }**: CSS variables theming
- **@utility custom-name**: Custom utilities
- **@plugin "@tailwindcss/forms"**: Plugin system

## Quick Examples

### Basic Setup

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
```

### Grid Layout

```jsx
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="col-span-2">Wide</div>
  <div class="row-span-2">Tall</div>
</div>
```

### Container Queries

```jsx
<div class="@container">
  <div class="@md:flex @lg:grid @lg:grid-cols-2">
    Adapts to container
  </div>
</div>
```

### Custom Utility

```css
@utility text-balance {
  text-wrap: balance;
}

@utility container-query {
  container-type: inline-size;
}
```

## When to Use

**Use this skill when user asks about:**

- Tailwind v4 setup and configuration
- Grid layouts (grid-cols-*, col-span-*, row-span-*)
- Container queries (@container, @md:, @lg:)
- CSS-first configuration (@theme, @utility, @plugin)
- Migration from v3 to v4
- Framework integration (SvelteKit, Next.js, Vite, React)
- Custom utilities and plugins
- Dark mode implementation
- Responsive design patterns

**Invoke with:**

```text
\skill:tailwind-expert:tailwind How do I set up Tailwind v4?
\skill:tailwind-expert:tailwind How do I use grid layouts?
\skill:tailwind-expert:tailwind What are container queries?
\skill:tailwind-expert:tailwind How do I create custom utilities?
\skill:tailwind-expert:tailwind How do I migrate from v3 to v4?
```

## Common Patterns

### Card Component

```jsx
<div class="bg-white rounded-xl shadow-lg p-6">
  <h3 class="text-xl font-bold mb-2">Title</h3>
  <p class="text-gray-600 mb-4">Description</p>
  <button class="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg">
    Action
  </button>
</div>
```

### Responsive Navigation

```jsx
<nav class="flex items-center justify-between p-4 bg-white shadow">
  <div class="hidden md:flex gap-6">
    <a href="#" class="hover:text-blue-600">Link</a>
  </div>
</nav>
```

### Grid Gallery

```jsx
<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <img class="rounded-lg shadow" src="..." />
</div>
```

## Framework Integration

### SvelteKit
```bash
npm install -D @tailwindcss/vite
```

```js
// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

### Next.js App Router
```bash
npm install -D @tailwindcss/postcss
```

```css
/* app/globals.css */
@import "tailwindcss";
```

### React + Vite
```bash
npm install -D @tailwindcss/vite
```

```js
// vite.config.js
export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

## Best Practices

### Performance
- Use auto content detection (no explicit paths needed in v4)
- Configure @theme only for custom values
- Use JIT mode (default in v4)

### Organization
- Keep utilities composable
- Use @apply for repeated patterns
- Document custom @theme values

### v4 Migration
1. Replace `@tailwind base` with `@import "tailwindcss"`
2. Convert `tailwind.config.js` to `@theme` block
3. Use `@utility` instead of `addUtilities` in plugins
4. Remove PostCSS config when using Vite

## Related Skills

- **shadcn-svelte** - Uses Tailwind for styling components
- **svelte/svelte-kit** - Framework integration
- **prp-framework** - CSS implementation in PRPs

## Additional Resources

- **SKILL.md** - Complete Tailwind v4 reference
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Migration Guide**: https://tailwindcss.com/docs/upgrade-guide
- **references/** - Additional documentation

---

_For UI components: Use `\skill:shadcn-svelte`_
