---
name: shadcn-svelte
description: Use when working with shadcn-svelte UI components - covers component installation, usage patterns, registry system, accessibility features, and theming with Tailwind CSS.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "2.0"
  source: https://github.com/huntabyte/shadcn-svelte
---

# shadcn-svelte

shadcn-svelte is a Svelte port of shadcn-ui - accessible UI components built with Tailwind CSS and Bits UI.

## When to Use

- Installing shadcn-svelte components (Button, Dialog, Card, etc.)
- Setting up theming with Tailwind CSS v4
- Configuring dark mode with mode-watcher
- Building accessible forms with Bits UI
- Troubleshooting component issues

## Quick Reference

```bash
# Install shadcn-svelte
pnpm dlx shadcn-svelte@latest init

# Add components
pnpm dlx shadcn-svelte@latest add button
pnpm dlx shadcn-svelte@latest add dialog
pnpm dlx shadcn-svelte@latest add card

# Add form components
pnpm dlx shadcn-svelte@latest add form
pnpm dlx shadcn-svelte@latest add input
pnpm dlx shadcn-svelte@latest add select
```

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
    <Card.Description>Description</Card.Description>
  </Card.Header>
  <Card.Content>
    Content here
  </Card.Content>
  <Card.Footer>
    <Button>Click me</Button>
  </Card.Footer>
</Card.Root>
```

## Key Concepts

- **Components** - Installed to `$lib/components/ui/`
- **Bits UI** - Headless primitives for accessibility
- **Tailwind v4** - Styling with CSS-first config
- **Dark Mode** - Via `mode-watcher` package

## References

- [Installation](references/installation.md)
- [Dark Mode Setup](references/dark_mode.md)
- [Component Categories](references/registry.json)
- [Troubleshooting](references/troubleshooting.md)
- [Form Components](references/forms.md)

## Related Skills

- [tailwind](file://../../../tailwind/SKILL.md) - Styling
- [svelte-kit](file://../../../svelte-kit/SKILL.md) - Framework
