# Hover Card

**Source**: https://www.shadcn-svelte.com/docs/components/hover-card

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

For sighted users to preview content available behind a link.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```html
<script lang="ts">
  import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as HoverCard from "$lib/components/ui/hover-card/index.js";
</script>

<HoverCard.Root>
  <HoverCard.Trigger
    href="https://github.com/sveltejs"
    target="_blank"
    rel="noreferrer noopener"
    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
  >
    @sveltejs
  </HoverCard.Trigger>
  <HoverCard.Content class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/sveltejs.png" />
        <Avatar.Fallback>SK</Avatar.Fallback>
      </Avatar.Root>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">@sveltejs</h4>
        <p class="text-sm">Cybernetically enhanced web apps.</p>
        <div class="flex items-center pt-2">
          <CalendarDaysIcon class="me-2 size-4 opacity-70" />
          <span class="text-muted-foreground text-xs"> Joined September 2022 </span>
        </div>
      </div>
    </div>
  </HoverCard.Content>
</HoverCard.Root>
```

### Example 2

```html
<script lang="ts">
  import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as HoverCard from "$lib/components/ui/hover-card/index.js";
</script>

<HoverCard.Root>
  <HoverCard.Trigger
    href="https://github.com/sveltejs"
    target="_blank"
    rel="noreferrer noopener"
    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
  >
    @sveltejs
  </HoverCard.Trigger>
  <HoverCard.Content class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/sveltejs.png" />
        <Avatar.Fallback>SK</Avatar.Fallback>
      </Avatar.Root>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">@sveltejs</h4>
        <p class="text-sm">Cybernetically enhanced web apps.</p>
        <div class="flex items-center pt-2">
          <CalendarDaysIcon class="me-2 size-4 opacity-70" />
          <span class="text-muted-foreground text-xs"> Joined September 2022 </span>
        </div>
      </div>
    </div>
  </HoverCard.Content>
</HoverCard.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add hover-card
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add hover-card
```

### Example 5

```python
npx shadcn-svelte@latest add hover-card
```

### Example 6

```python
npx shadcn-svelte@latest add hover-card
```

### Example 7

```python
npx shadcn-svelte@latest add hover-card
```

### Example 8

```python
npx shadcn-svelte@latest add hover-card
```

### Example 9

```python
bun x shadcn-svelte@latest add hover-card
```

### Example 10

```python
bun x shadcn-svelte@latest add hover-card
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

```typescript
<script lang="ts">
  import { LinkPreview as HoverCardPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
  import HoverCardPortal from "./hover-card-portal.svelte";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    class: className,
    align = "center",
    sideOffset = 4,
    portalProps,
    ...restProps
  }: HoverCardPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof HoverCardPortal>>;
  } = $props();
</script>

<HoverCardPortal {...portalProps}>
  <HoverCardPrimitive.Content
    bind:ref
    data-slot="hover-card-content"
    {align}
    {sideOffset}
    class={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 mt-3 w-64 rounded-md border p-4 shadow-md outline-hidden outline-none",
      className
    )}
    {...restProps}
  />
</HoverCardPortal>
```

### Example 20

```typescript
<script lang="ts">
  import { LinkPreview as HoverCardPrimitive } from "bits-ui";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";
  import HoverCardPortal from "./hover-card-portal.svelte";
  import type { ComponentProps } from "svelte";

  let {
    ref = $bindable(null),
    class: className,
    align = "center",
    sideOffset = 4,
    portalProps,
    ...restProps
  }: HoverCardPrimitive.ContentProps & {
    portalProps?: WithoutChildrenOrChild<ComponentProps<typeof HoverCardPortal>>;
  } = $props();
</script>

<HoverCardPortal {...portalProps}>
  <HoverCardPrimitive.Content
    bind:ref
    data-slot="hover-card-content"
    {align}
    {sideOffset}
    class={cn(
      "bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-end-2 data-[side=right]:slide-in-from-start-2 data-[side=top]:slide-in-from-bottom-2 z-50 mt-3 w-64 rounded-md border p-4 shadow-md outline-hidden outline-none",
      className
    )}
    {...restProps}
  />
</HoverCardPortal>
```

### Example 21

```jsx
<script lang="ts">import * as HoverCard from "$lib/components/ui/hover-card/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as HoverCard from "$lib/components/ui/hover-card/index.js";</script>
```

### Example 23

```unknown
<HoverCard.Root>
  <HoverCard.Trigger>Hover</HoverCard.Trigger>
  <HoverCard.Content>
    SvelteKit - Web development, streamlined
  </HoverCard.Content>
</HoverCard.Root>
```

### Example 24

```unknown
<HoverCard.Root>
  <HoverCard.Trigger>Hover</HoverCard.Trigger>
  <HoverCard.Content>
    SvelteKit - Web development, streamlined
  </HoverCard.Content>
</HoverCard.Root>
```

## Sections

## Installation

## Usage
