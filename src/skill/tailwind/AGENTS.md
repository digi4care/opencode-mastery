# AGENTS.md - Tailwind CSS Skill

**Skill:** Tailwind CSS v4 - Utility-first CSS met CSS-first configuration

## Overview

Tailwind v4 met `@import "tailwindcss"`, `@theme`, `@utility`, en `@plugin` directives. Geen `tailwind.config.js` meer nodig.

## v4 Setup

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --font-sans: "Inter", sans-serif;
}

@utility text-balance {
  text-wrap: balance;
}
```

## SvelteKit Integration

```bash
bun add -D @tailwindcss/vite
```

```js
// vite.config.js
import { sveltekit } from "@sveltejs/kit/vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

## Key Features

| Feature           | v4 Syntax                      |
| ----------------- | ------------------------------ |
| Import            | `@import "tailwindcss"`        |
| Theme config      | `@theme { --color-*: ... }`    |
| Custom utility    | `@utility name { ... }`        |
| Plugins           | `@plugin "@tailwindcss/forms"` |
| Container queries | `@container`, `@md:`, `@lg:`   |

## Grid Patterns

```html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
  <div class="col-span-2">Wide</div>
  <div class="row-span-2">Tall</div>
</div>
```

## Anti-Patterns

| Niet doen                   | Wel doen                |
| --------------------------- | ----------------------- |
| `tailwind.config.js` in v4  | `@theme` block in CSS   |
| `@tailwind base/components` | `@import "tailwindcss"` |
| Content paths configureren  | Auto-detection in v4    |
| `pnpm` in dit project       | `bun` gebruiken         |

## v3 → v4 Migration

1. Replace `@tailwind base; @tailwind components; @tailwind utilities;` → `@import "tailwindcss";`
2. Convert `tailwind.config.js` → `@theme` block
3. Use `@utility` instead of `addUtilities()`
4. Remove PostCSS config when using Vite plugin

## When to Use

- Tailwind v4 setup en configuratie
- Grid layouts en container queries
- Custom utilities maken
- Framework integratie
- v3 naar v4 migratie

## Related Skills

- **shadcn-svelte** - UI components met Tailwind
- **svelte-kit** - Framework integratie

## Resources

- **SKILL.md** → Complete Tailwind v4 reference
- **Official Docs**: https://tailwindcss.com/docs
- **Migration Guide**: https://tailwindcss.com/docs/upgrade-guide
