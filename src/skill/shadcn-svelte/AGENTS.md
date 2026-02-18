# AGENTS.md - Shadcn-Svelte Skill

This file provides guidance to AI agents when working with the Shadcn-Svelte skill.

## Overview

**Beautifully designed, accessible UI components built with Svelte 5 and Bits UI** - Comprehensive documentation for modern Svelte UI components.

## Skill Invocation

```text
\skill:shadcn-svelte
```

Use this skill when you need knowledge about shadcn-svelte component library.

## Key Topics

### Installation

- **Initialize**: `pnpm dlx shadcn-svelte@latest init`
- **Add components**: `pnpm dlx shadcn-svelte@latest add <component>`

### Core Components

- **Button** - Various variants (default, outline, ghost, etc.)
- **Input** - Form input fields
- **Dialog** - Modal dialogs and popovers
- **Accordion** - Collapsible content sections
- **Alert** - Notification messages
- **Card** - Content containers
- **Tabs** - Tabbed navigation

### Accessibility Features

- WAI-ARIA compliant
- Keyboard navigation
- Screen reader support
- Focus management

### Theming

- CSS variables for theming
- Dark mode support via mode-watcher
- Tailwind CSS integration
- Customizable variants

## Common Usage Patterns

### Install and Setup

```text
\skill:shadcn-svelte How do I install shadcn-svelte in my SvelteKit project?
\skill:shadcn-svelte How do I add components?
```

### Component Usage

```text
\skill:shadcn-svelte How do I use the Button component?
\skill:shadcn-svelte How do I create a modal dialog?
\skill:shadcn-svelte How do I build an accordion?
```

### Styling and Customization

```text
\skill:shadcn-svelte How do I customize component styles?
\skill:shadcn-svelte How do I set up dark mode?
\skill:shadcn-svelte What are the available variants?
```

### Troubleshooting

```text
\skill:shadcn-svelte Component not found error
\skill:shadcn-svelte Styling issues
\skill:shadcn-svelte TypeScript errors
```

## Component Reference

### Button Variants

- `default` - Standard button
- `destructive` - Delete/error actions
- `outline` - Outlined style
- `secondary` - Muted appearance
- `ghost` - Minimal styling
- `link` - Link-like appearance

### Button Sizes

- `default` - Standard size
- `sm` - Small
- `lg` - Large
- `icon` - Icon-only button

### Common Components

| Component     | Use Case             |
| ------------- | -------------------- |
| **Accordion** | Collapsible sections |
| **Alert**     | Notifications        |
| **Button**    | Actions              |
| **Card**      | Content containers   |
| **Dialog**    | Modals               |
| **Input**     | Form fields          |
| **Tabs**      | Navigation           |

## Integration Examples

### SvelteKit Setup

```bash
npm create svelte@latest my-app
cd my-app
pnpm dlx shadcn-svelte@latest init
pnpm dlx shadcn-svelte@latest add button
```

### Basic Component

```svelte
<script>
  import { Button } from "$lib/components/ui/button";
</script>

<Button variant="default">Click me</Button>
```

### With Dark Mode

```svelte
<script>
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
```

## When to Use

**Use this skill when user asks about:**

- Installing shadcn-svelte components
- Component usage and API
- Accessibility features
- Customization and theming
- Dark mode setup
- Integration with Svelte/SvelteKit
- Troubleshooting component issues

**Invoke with:**

```text
\skill:shadcn-svelte How do I add a button component?
\skill:shadcn-svelte How do I set up dark mode?
\skill:shadcn-svelte Show me dialog examples
```

## Configuration

### Tailwind Setup (v4 - Recommended)

```css
/* app.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-primary: hsl(var(--primary));
  --color-background: hsl(var(--background));
}
```

```typescript
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";

export default { plugins: [tailwindcss(), sveltekit()] };
```

### Tailwind v3 (Legacy)

```js
// tailwind.config.js
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: { extend: {} },
  plugins: [],
};
```

### Path Aliases

```js
// svelte.config.js
export default {
  alias: {
    $lib: "src/lib",
    $components: "src/lib/components",
  },
};
```

## Additional Resources

- **SKILL.md** - Complete documentation (85 pages)
- **references/** - Additional guides
- **Official Site**: https://www.shadcn-svelte.com/
- **GitHub**: https://github.com/huntabyte/shadcn-svelte

---

_For general Svelte help: Use `\skill:svelte`_
