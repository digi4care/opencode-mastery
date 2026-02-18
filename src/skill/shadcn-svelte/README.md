# Shadcn-Svelte Skill

**Beautifully designed, accessible UI components built with Svelte 5 and Bits UI.**

This skill provides comprehensive documentation for shadcn-svelte - a collection of modern, accessible UI components for Svelte applications.

## Overview

Combines knowledge from:

- **Official Documentation** (85 pages)
- **GitHub Repository** (huntabyte/shadcn-svelte)
- **Deep code analysis** of components and patterns

## When to Use This Skill

Use this skill when you need to:

- **Install and configure** shadcn-svelte in a SvelteKit project
- **Build UI components** using the component library
- **Implement accessible patterns** (Accordion, Alert, Dialog, etc.)
- **Set up dark mode** using mode-watcher
- **Customize component styles** with Tailwind CSS
- **Troubleshoot component issues** or registry system
- **Integrate Bits UI primitives** with custom styling
- **Configure path aliases** and component installation

## Installation

### Initialize shadcn-svelte

```bash
# Using pnpm (recommended)
pnpm dlx shadcn-svelte@latest init

# Using npm
npx shadcn-svelte@latest init

# Using bun
bun x shadcn-svelte@latest init
```

### Add Components

```bash
# Add individual components
pnpm dlx shadcn-svelte@latest add accordion
pnpm dlx shadcn-svelte@latest add alert
pnpm dlx shadcn-svelte@latest add dialog
pnpm dlx shadcn-svelte@latest add button

# Add multiple components
pnpm dlx shadcn-svelte@latest add button alert accordion
```

## Available Components

### Form Components

- Button
- Input
- Label
- Select
- Checkbox
- Radio Group
- Switch
- Textarea

### Data Display

- Accordion
- Alert
- Badge
- Card
- Table
- Tabs
- Tooltip

### Navigation

- Breadcrumb
- Command
- Navigation Menu
- Pagination

### Feedback

- Alert Dialog
- Dialog
- Popover
- Sheet (Drawer)
- Toast

### Layout

- Aspect Ratio
- Avatar
- Collapsible
- Drawer
- Separator
- Skeleton

## Basic Usage

### Accordion Component

```svelte
<script>
  import { Accordion } from "$lib/components/ui/accordion";
</script>

<Accordion.Root>
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Button Component

```svelte
<script>
  import { Button } from "$lib/components/ui/button";
</script>

<Button variant="default">Click me</Button>
<Button variant="destructive">Delete</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>
```

### Dialog Component

```svelte
<script>
  import { Dialog } from "$lib/components/ui/dialog";
</script>

<Dialog.Root>
  <Dialog.Trigger>Open Dialog</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Edit profile</Dialog.Title>
      <Dialog.Description>
        Make changes to your profile here.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```

## Dark Mode Setup

### Install Mode Watcher

```bash
pnpm dlx shadcn-svelte@latest add mode-watcher
```

### Basic Implementation

```svelte
<script>
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
```

## Customization

### Component Variants

Each component supports multiple variants:

- **default** - Standard appearance
- **destructive** - Error/delete actions
- **outline** - Outlined style
- **secondary** - Muted appearance
- **ghost** - Minimal styling
- **link** - Link-like appearance

### Size Options

```svelte
<Button size="default">Default</Button>
<Button size="sm">Small</Button>
<Button size="lg">Large</Button>
<Button size="icon">Icon</Button>
```

### Custom Styling

```svelte
<Button class="custom-class">
  Custom Button
</Button>
```

## Key Features

### Accessibility

- WAI-ARIA compliant
- Keyboard navigation support
- Screen reader friendly
- Focus management

### Theming

- CSS variables for easy theming
- Dark mode support
- Customizable through Tailwind classes

### TypeScript Support

- Full type safety
- IntelliSense support
- Auto-completion

### Svelte 5 Ready

- Compatible with Svelte 5
- Reactive patterns
- Modern Svelte features

## Configuration

### Tailwind Setup

#### Tailwind v4 (Recommended)

shadcn-svelte uses Tailwind CSS for styling. Tailwind v4 uses CSS-first configuration:

```css
/* app.css */
@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:is(.dark *));

@theme {
  --color-background: hsl(var(--background));
  --color-foreground: hsl(var(--foreground));
  --color-primary: hsl(var(--primary));
  --color-primary-foreground: hsl(var(--primary-foreground));
}
```

```typescript
// vite.config.ts
import tailwindcss from "@tailwindcss/vite";
import { sveltekit } from "@sveltejs/kit/vite";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [tailwindcss(), sveltekit()],
});
```

#### Tailwind v3 (Legacy)

```js
// tailwind.config.js
export default {
  content: ["./src/**/*.{html,js,svelte,ts}"],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

### Path Aliases

```js
// svelte.config.js
import { vitePreprocess } from "@sveltejs/vite-plugin-svelte";

export default {
  preprocess: vitePreprocess(),
  alias: {
    $lib: "src/lib",
    $components: "src/lib/components",
  },
};
```

## Common Patterns

### Form Validation

```svelte
<script>
  import { Button } from "$lib/components/ui/button";
  import { Input } from "$lib/components/ui/input";
</script>

<form>
  <Input type="email" placeholder="Email" />
  <Button type="submit">Submit</Button>
</form>
```

### Modal Workflow

```svelte
<script>
  import { Dialog } from "$lib/components/ui/dialog";
  let open = false;
</script>

<Dialog.Root bind:open>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Title</Dialog.Title>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```

## Troubleshooting

### Component Not Found

- Check path aliases configuration
- Verify component installation
- Ensure proper import path

### Styling Issues

- Check Tailwind configuration
- Verify CSS variables
- Check component variants

### Type Errors

- Update TypeScript configuration
- Check component prop types
- Verify Svelte version compatibility

## Integration with SvelteKit

```bash
# Install SvelteKit
npm create svelte@latest my-app

# Add shadcn-svelte
cd my-app
pnpm dlx shadcn-svelte@latest init
pnpm dlx shadcn-svelte@latest add button
```

## Benefits

- **Beautiful Design**: Modern, clean aesthetics
- **Accessible**: WCAG compliant components
- **Customizable**: Easy theming and styling
- **Type-Safe**: Full TypeScript support
- **Well-Documented**: Comprehensive guides
- **Active Community**: Regular updates and support

## Additional Resources

- **Official Site**: https://www.shadcn-svelte.com/
- **GitHub**: https://github.com/huntabyte/shadcn-svelte
- **SKILL.md** - Complete documentation
- **references/** - Additional guides and examples

---

**For comprehensive documentation, see [SKILL.md](SKILL.md)**
