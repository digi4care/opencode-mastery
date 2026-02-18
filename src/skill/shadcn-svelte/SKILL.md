---
name: shadcn-svelte
description: Provide guidance for shadcn-svelte UI component installation, configuration, and usage. Use when installing or troubleshooting shadcn-svelte components.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: 1.0.0
  source: shadcn-svelte documentation
  last_updated: "2026-01-22"
triggers:
  - shadcn-svelte
  - install component
  - add button
  - add dialog
  - UI component
  - tailwind component
  - bits-ui
  - dark mode
  - mode-watcher
  - component library
  - shadcn init
  - accordion
  - alert
  - card
  - dropdown
  - modal
  - popover
  - sheet
  - tabs
  - form component
  - select
  - checkbox
  - radio
  - input
  - textarea
  - calendar
  - table
  - badge
  - avatar
  - breadcrumb
  - navigation
  - tooltip
negativeTriggers:
  - svelte only
  - vanilla css
  - bootstrap
  - material-ui
  - chakra
  - general css
  - sveltekit routing
  - svelte stores
  - svelte context
  - svelte transitions
  - svelte animations
  - plain html
  - css framework
  - not shadcn
  - general svelte questions
  - non-shadcn components
---

# shadcn-svelte

I provide comprehensive guidance for installing, configuring, and using shadcn-svelte UI components with proper accessibility, theming, and customization patterns.

## When to Use Me

Use me when:

- Installing shadcn-svelte components in your project
- Using shadcn-svelte UI components (Button, Dialog, Card, etc.)
- Setting up dark mode with mode-watcher
- Customizing component styling with Tailwind
- Troubleshooting component installation or usage issues
- Understanding the shadcn-svelte registry system
- Working with Bits UI primitives
- Configuring component theming

Do not use me for:

- General Svelte questions (use svelte skill instead)
- Vanilla CSS or non-Tailwind styling
- Other UI libraries (Bootstrap, Material-UI, Chakra)
- SvelteKit routing or stores
- Svelte transitions and animations
- Plain HTML/CSS without shadcn-svelte

## Quick Summary

shadcn-svelte provides accessible, customizable UI components built on [Bits UI](https://bits-ui.com/) primitives.

**Component Categories:**

| Category       | Components                                                                                                                                  |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------- |
| **Layout**     | `Accordion`, `Collapsible`, `Resizable`, `Scroll Area`, `Separator`, `Splitter`                                                             |
| **Forms**      | `Button`, `Checkbox`, `Input`, `Radio Group`, `Select`, `Slider`, `Switch`, `Textarea`, `Toggle`, `Toggle Group`, `Combobox`, `Date Picker` |
| **Overlays**   | `Alert Dialog`, `Dialog`, `Dropdown Menu`, `Hover Card`, `Popover`, `Sheet`                                                                 |
| **Display**    | `Alert`, `Avatar`, `Badge`, `Card`, `Carousel`, `Kbd`, `Progress`, `Skeleton`, `Table`, `Tabs`, `Tooltip`                                   |
| **Navigation** | `Breadcrumb`, `Command`, `Context Menu`, `Menubar`, `Navigation Menu`, `Pagination`, `Sidebar`                                              |
| **Advanced**   | `Calendar`, `Chart`, `Data Table`                                                                                                           |

## Workflow

1. **Identify Component Need**
   - Determine which UI component fits your use case
   - Check if component exists in shadcn-svelte registry

2. **Install Component**

   ```bash
   pnpm dlx shadcn-svelte@latest add button
   ```

   Or add multiple: `pnpm dlx shadcn-svelte@latest add button card dialog`

3. **Import Component**

   ```typescript
   import Button from "$lib/components/ui/button/button.svelte";
   ```

4. **Configure Dependencies**
   - Install Bits UI if peer dependency warning: `pnpm i bits-ui -D`
   - Set up ModeWatcher for dark mode in root layout

5. **Implement Component**
   - Use proper TypeScript types
   - Follow Svelte 5 $props() syntax
   - Add accessibility attributes

6. **Test and Customize**
   - Verify rendering and functionality
   - Customize with Tailwind classes
   - Test keyboard navigation

## Execution Rules

- Always use `pnpm dlx shadcn-svelte@latest` for installation (not npx)
- Install to `$lib/components/ui/` by default
- Use proper Bits UI peer dependencies
- Follow Svelte 5 $props() syntax for components
- Test accessibility (keyboard navigation, ARIA)
- Use Tailwind v4 with @custom-variant for theming

## Error Handling

**Component not found:**

- Check installation path: `$lib/components/ui/`
- Verify `$lib` alias in `svelte.config.js`
- Re-install: `pnpm dlx shadcn-svelte@latest add <component>`

**Bits UI peer dependency warning:**

```bash
pnpm i bits-ui -D
```

**Dark mode not working:**

- Verify ModeWatcher in root layout (`+layout.svelte`)
- Check Tailwind dark variant: `@custom-variant dark (&:where(.dark, .dark *));`
- Confirm mode-watcher is installed: `pnpm i mode-watcher`

**TypeScript errors:**

- Update to Svelte 5 with `svelte-migrate`
- Use `$props()` instead of `export let`
- Check tsconfig.json paths

**Import errors:**

- Verify component was installed successfully
- Check `$lib` alias configuration
- Restart TypeScript server

**Styling not applied:**

- Confirm Tailwind CSS is configured in `app.css`
- Check `@import "tailwindcss";` is present
- Verify PostCSS config

## Quick Tests

**Should trigger:**

- "How do I add a button component"
- "Install shadcn-svelte dialog"
- "Set up dark mode with mode-watcher"
- "Create an accordion"
- "How to use Alert component"
- "Style customization for Card"
- "Troubleshoot component not found"
- "shadcn-svelte installation"

**Should not trigger:**

- "How does Svelte reactivity work"
- "Set up SvelteKit routing"
- "Use Svelte stores"
- "Create custom transition"
- "General CSS grid layout"
- "Bootstrap vs Tailwind comparison"
- "Material-UI components"

**Functional:**

- "Add Button component to SvelteKit project"
- "Set up dark mode toggle with mode-watcher"

## Common Patterns

### Installation

```bash
# Initialize shadcn-svelte (first time)
pnpm dlx shadcn-svelte@latest init

# Add specific component
pnpm dlx shadcn-svelte@latest add button

# Add multiple components
pnpm dlx shadcn-svelte@latest add button card dialog
```

### Dark Mode Setup

```svelte
<!-- +layout.svelte -->
<script>
  import { ModeWatcher } from "mode-watcher";
</script>

<ModeWatcher />
<slot />
```

### Component Usage

```svelte
<script>
  import Button from "$lib/components/ui/button/button.svelte";
</script>

<Button variant="default" size="default">Click me</Button>
```

## References

- references/installation.md - Installation guide
- references/dark_mode.md - Dark mode configuration
- references/components/ - Individual component documentation
- references/theming.md - Theming and customization
- references/api/merged_api.md - API documentation
- Related: Use with tailwind-expert skill for styling questions

## Constraints

- Must use `pnpm dlx shadcn-svelte@latest` for installation
- Components require Bits UI as peer dependency
- Uses Tailwind CSS v4 with `@custom-variant` for dark mode
- Requires Svelte 5 with `$props()` syntax
- Components installed to `$lib/components/ui/` by default
- Must use mode-watcher package for dark mode functionality
