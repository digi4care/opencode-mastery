---
name: tailwind
description: Use when styling with Tailwind CSS v4 - covers CSS-first configuration (@theme, @utility, @plugin), grid layouts, container queries, custom utilities, and framework integration (SvelteKit, Next.js, Vite, React)
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "2.0"
  source: https://tailwindcss.com/docs
---

# Tailwind CSS v4

Comprehensive Tailwind CSS skill covering v4's CSS-first configuration, utilities, grid layouts, container queries, and framework integration.

## Quick Summary

| Feature               | Syntax                         | Description                     |
| --------------------- | ------------------------------ | ------------------------------- |
| **v4 Import**         | `@import "tailwindcss"`        | Replaces `@tailwind` directives |
| **Theme**             | `@theme { --color-*: ... }`    | CSS variables for customization |
| **Custom Utilities**  | `@utility name { ... }`        | Define utilities in CSS         |
| **Plugins**           | `@plugin "@tailwindcss/forms"` | Load plugins in CSS             |
| **Container Queries** | `@container`, `@md:`, `@lg:`   | Responsive to parent container  |

## When to Use This Skill

Use this skill when:

- CSS-first configuration with `@import "tailwindcss"`, `@theme`, `@utility`
- Utility-first styling with utility classes
- Grid layouts with `grid-cols-*`, `col-span-*`
- Container queries with `@container`, `@min-*`, `@max-*`
- Custom utilities with `@utility` directive
- Custom plugins with `@plugin` directive
- Framework integration (React, Vue, Svelte, Next.js, Vite)

## Quick Reference

### Tailwind v4 Import

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}
```

### Custom Utilities (@utility)

```css
@utility text-balance {
  text-wrap: balance;
}
```

### Custom Plugin (@plugin)

```css
@import "tailwindcss";
@plugin "@tailwindcss/forms";
@plugin "@tailwindcss/typography";
```

### Container Queries

```jsx
<div class="@container">
  <div class="@md:flex @lg:grid gap-4">Adapts to container size</div>
</div>
```

### Grid Layout

```jsx
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-2">Wide (2 cols)</div>
  <div class="row-span-2">Tall (2 rows)</div>
  <div>Item</div>
  <div>Item</div>
</div>
```

## Best Practices

1. Use `@import "tailwindcss"` instead of `@tailwind` directives
2. Configure theme with CSS variables in `@theme { }`
3. Use `@utility` for custom utilities in v4
4. Use `@plugin` for official plugins
5. Use container queries (`@container`) for component-responsive layouts
6. Migrate from v3: convert `tailwind.config.js` to CSS `@theme`

## Framework Integration

- **SvelteKit**: Use `@tailwindcss/vite` plugin
- **Next.js**: Use `@tailwindcss/postcss`
- **React/Vue**: Use `@tailwindcss/vite`

## References

- [Tailwind v4 Documentation](https://tailwindcss.com/docs)
- [Migration Guide](https://tailwindcss.com/docs/upgrade-guide)

See `references/` folder for detailed documentation:

- references/configuration.md - Complete v4 setup guide
- references/grid-layouts.md - All grid patterns
- references/container-queries.md - Container query usage
- references/custom-utilities.md - @utility directive
- references/plugins.md - @plugin system
- references/variants.md - All variants (hover, focus, dark, etc.)
- references/best-practices.md - Performance and organization tips
- references/common-patterns.md - Card, Form, Navigation patterns
- references/framework-integration.md - Per-framework setup
- references/troubleshooting.md - Common issues and fixes

_Last updated: 2026-01-03 for Tailwind CSS v4_
