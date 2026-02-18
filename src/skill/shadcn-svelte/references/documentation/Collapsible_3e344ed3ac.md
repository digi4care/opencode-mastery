# Collapsible

**Source**: https://www.shadcn-svelte.com/docs/components/collapsible

## Table of Contents

    - [@huntabyte starred 3 repositories](#@huntabyte-starred-3-repositories)

- [Installation](#installation)
- [Usage](#usage)

## Content

An interactive component which expands/collapses a panel.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<Collapsible.Root class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
    <Collapsible.Trigger
      class={buttonVariants({ variant: "ghost", size: "sm", class: "w-9 p-0" })}
    >
      <ChevronsUpDownIcon />
      <span class="sr-only">Toggle</span>
    </Collapsible.Trigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">
    @huntabyte/bits-ui
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @melt-ui/melt-ui
    </div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @sveltejs/svelte
    </div>
  </Collapsible.Content>
</Collapsible.Root>
```

### Example 2

```jsx
<script lang="ts">
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<Collapsible.Root class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
    <Collapsible.Trigger
      class={buttonVariants({ variant: "ghost", size: "sm", class: "w-9 p-0" })}
    >
      <ChevronsUpDownIcon />
      <span class="sr-only">Toggle</span>
    </Collapsible.Trigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">
    @huntabyte/bits-ui
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @melt-ui/melt-ui
    </div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @sveltejs/svelte
    </div>
  </Collapsible.Content>
</Collapsible.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add collapsible
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add collapsible
```

### Example 5

```python
npx shadcn-svelte@latest add collapsible
```

### Example 6

```python
npx shadcn-svelte@latest add collapsible
```

### Example 7

```python
npx shadcn-svelte@latest add collapsible
```

### Example 8

```python
npx shadcn-svelte@latest add collapsible
```

### Example 9

```python
bun x shadcn-svelte@latest add collapsible
```

### Example 10

```python
bun x shadcn-svelte@latest add collapsible
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
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: CollapsiblePrimitive.ContentProps = $props();
</script>

<CollapsiblePrimitive.Content bind:ref data-slot="collapsible-content" {...restProps} />
```

### Example 20

```jsx
<script lang="ts">
  import { Collapsible as CollapsiblePrimitive } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: CollapsiblePrimitive.ContentProps = $props();
</script>

<CollapsiblePrimitive.Content bind:ref data-slot="collapsible-content" {...restProps} />
```

### Example 21

```jsx
<script lang="ts">import * as Collapsible from "$lib/components/ui/collapsible/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Collapsible from "$lib/components/ui/collapsible/index.js";</script>
```

### Example 23

```unknown
<Collapsible.Root>
  <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
  <Collapsible.Content>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </Collapsible.Content>
</Collapsible.Root>
```

### Example 24

```unknown
<Collapsible.Root>
  <Collapsible.Trigger>Can I use this in my project?</Collapsible.Trigger>
  <Collapsible.Content>
    Yes. Free to use for personal and commercial projects. No attribution
    required.
  </Collapsible.Content>
</Collapsible.Root>
```

## Sections

#### @huntabyte starred 3 repositories

## Installation

## Usage
