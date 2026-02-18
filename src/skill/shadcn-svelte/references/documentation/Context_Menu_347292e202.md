# Context Menu

**Source**: https://www.shadcn-svelte.com/docs/components/context-menu

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

Displays a menu to the user — such as a set of actions or functions — triggered by right click.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```typescript
<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  let showBookmarks = $state(false);
  let showFullURLs = $state(true);

  let value = $state("pedro");
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger
    class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
  >
    Right click here
  </ContextMenu.Trigger>
  <ContextMenu.Content class="w-52">
    <ContextMenu.Item inset>
      Back
      <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset disabled>
      Forward
      <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset>
      Reload
      <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
      <ContextMenu.SubContent class="w-48">
        <ContextMenu.Item>
          Save Page As...
          <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
        <ContextMenu.Item>Name Window...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Developer Tools</ContextMenu.Item>
      </ContextMenu.SubContent>
    </ContextMenu.Sub>
    <ContextMenu.Separator />
    <ContextMenu.CheckboxItem bind:checked={showBookmarks}>
      Show Bookmarks
    </ContextMenu.CheckboxItem>
    <ContextMenu.CheckboxItem bind:checked={showFullURLs}>
      Show Full URLs
    </ContextMenu.CheckboxItem>
    <ContextMenu.Separator />
    <ContextMenu.RadioGroup bind:value>
      <ContextMenu.Group>
        <ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
        <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem
        >
        <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
      </ContextMenu.Group>
    </ContextMenu.RadioGroup>
  </ContextMenu.Content>
</ContextMenu.Root>
```

### Example 2

```typescript
<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  let showBookmarks = $state(false);
  let showFullURLs = $state(true);

  let value = $state("pedro");
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger
    class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
  >
    Right click here
  </ContextMenu.Trigger>
  <ContextMenu.Content class="w-52">
    <ContextMenu.Item inset>
      Back
      <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset disabled>
      Forward
      <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset>
      Reload
      <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
      <ContextMenu.SubContent class="w-48">
        <ContextMenu.Item>
          Save Page As...
          <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
        <ContextMenu.Item>Name Window...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Developer Tools</ContextMenu.Item>
      </ContextMenu.SubContent>
    </ContextMenu.Sub>
    <ContextMenu.Separator />
    <ContextMenu.CheckboxItem bind:checked={showBookmarks}>
      Show Bookmarks
    </ContextMenu.CheckboxItem>
    <ContextMenu.CheckboxItem bind:checked={showFullURLs}>
      Show Full URLs
    </ContextMenu.CheckboxItem>
    <ContextMenu.Separator />
    <ContextMenu.RadioGroup bind:value>
      <ContextMenu.Group>
        <ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
        <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem
        >
        <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
      </ContextMenu.Group>
    </ContextMenu.RadioGroup>
  </ContextMenu.Content>
</ContextMenu.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add context-menu
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add context-menu
```

### Example 5

```python
npx shadcn-svelte@latest add context-menu
```

### Example 6

```python
npx shadcn-svelte@latest add context-menu
```

### Example 7

```python
npx shadcn-svelte@latest add context-menu
```

### Example 8

```python
npx shadcn-svelte@latest add context-menu
```

### Example 9

```python
bun x shadcn-svelte@latest add context-menu
```

### Example 10

```python
bun x shadcn-svelte@latest add context-menu
```

### Example 11

```unknown
pnpm i bits-ui -D
```

### Example 12

```unknown
pnpm i bits-ui -D
```

### Example 13

```unknown
npm i bits-ui -D
```

### Example 14

```unknown
npm i bits-ui -D
```

### Example 15

```unknown
yarn install bits-ui -D
```

### Example 16

```unknown
yarn install bits-ui -D
```

### Example 17

```unknown
bun install bits-ui -D
```

### Example 18

```unknown
bun install bits-ui -D
```

### Example 19

```jsx
<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<ContextMenuPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();
</script>

<ContextMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="context-menu-checkbox-item"
  class={cn(
    "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span
      class="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center"
    >
      {#if checked}
        <CheckIcon class="size-4" />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</ContextMenuPrimitive.CheckboxItem>
```

### Example 20

```jsx
<script lang="ts">
  import { ContextMenu as ContextMenuPrimitive } from "bits-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
  import type { Snippet } from "svelte";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    children: childrenProp,
    ...restProps
  }: WithoutChildrenOrChild<ContextMenuPrimitive.CheckboxItemProps> & {
    children?: Snippet;
  } = $props();
</script>

<ContextMenuPrimitive.CheckboxItem
  bind:ref
  bind:checked
  bind:indeterminate
  data-slot="context-menu-checkbox-item"
  class={cn(
    "data-highlighted:bg-accent data-highlighted:text-accent-foreground relative flex cursor-default items-center gap-2 rounded-sm py-1.5 ps-8 pe-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    className
  )}
  {...restProps}
>
  {#snippet children({ checked })}
    <span
      class="pointer-events-none absolute start-2 flex size-3.5 items-center justify-center"
    >
      {#if checked}
        <CheckIcon class="size-4" />
      {/if}
    </span>
    {@render childrenProp?.()}
  {/snippet}
</ContextMenuPrimitive.CheckboxItem>
```

### Example 21

```jsx
<script lang="ts">import * as ContextMenu from "$lib/components/ui/context-menu/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as ContextMenu from "$lib/components/ui/context-menu/index.js";</script>
```

### Example 23

```unknown
<ContextMenu.Root>
  <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Profile</ContextMenu.Item>
    <ContextMenu.Item>Billing</ContextMenu.Item>
    <ContextMenu.Item>Team</ContextMenu.Item>
    <ContextMenu.Item>Subscription</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```

### Example 24

```unknown
<ContextMenu.Root>
  <ContextMenu.Trigger>Right click</ContextMenu.Trigger>
  <ContextMenu.Content>
    <ContextMenu.Item>Profile</ContextMenu.Item>
    <ContextMenu.Item>Billing</ContextMenu.Item>
    <ContextMenu.Item>Team</ContextMenu.Item>
    <ContextMenu.Item>Subscription</ContextMenu.Item>
  </ContextMenu.Content>
</ContextMenu.Root>
```

## Sections

## Installation

## Usage
