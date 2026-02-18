# AGENTS.md - Shadcn-Svelte Skill

**Skill:** shadcn-svelte - Accessible UI components met Svelte 5 en Bits UI

## Overview

Svelte port van shadcn-ui. Components landen in `$lib/components/ui/`. Gebruikt Tailwind CSS v4 en Bits UI voor accessibility.

## Commands

```bash
# Initialize
pnpm dlx shadcn-svelte@latest init

# Add components
pnpm dlx shadcn-svelte@latest add button
pnpm dlx shadcn-svelte@latest add dialog
pnpm dlx shadcn-svelte@latest add card
pnpm dlx shadcn-svelte@latest add form
```

## Usage Pattern

```svelte
<script lang="ts">
  import { Button } from "$lib/components/ui/button";
  import * as Card from "$lib/components/ui/card";
</script>

<Card.Root>
  <Card.Header>
    <Card.Title>Title</Card.Title>
  </Card.Header>
  <Card.Content>Content</Card.Content>
  <Card.Footer>
    <Button>Action</Button>
  </Card.Footer>
</Card.Root>
```

## Key Concepts

| Concept    | Details                |
| ---------- | ---------------------- |
| Location   | `$lib/components/ui/`  |
| Primitives | Bits UI (headless)     |
| Styling    | Tailwind CSS v4        |
| Dark mode  | `mode-watcher` package |

## Anti-Patterns

| Niet doen                        | Wel doen                        |
| -------------------------------- | ------------------------------- |
| Components zelf schrijven        | CLI gebruiken om te installeren |
| `npm`/`yarn` in dit project      | `pnpm dlx` voor shadcn CLI      |
| Tailwind v3 config in v4 project | `@theme` block gebruiken        |

## When to Use

- shadcn-svelte componenten installeren
- Component usage en API
- Dark mode setup
- Accessibility patterns
- Form components

## Related Skills

- **tailwind** - Styling
- **svelte-kit** - Framework

## Resources

- **SKILL.md** → Complete reference
- **References**:
  - [Installation](references/installation.md)
  - [Dark Mode](references/dark_mode.md)
  - [Forms](references/forms.md)
  - [Troubleshooting](references/troubleshooting.md)
- **Official Site**: https://www.shadcn-svelte.com/
