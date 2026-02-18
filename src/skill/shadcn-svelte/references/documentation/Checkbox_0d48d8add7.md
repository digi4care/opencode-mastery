# Checkbox

**Source**: https://www.shadcn-svelte.com/docs/components/checkbox

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

A control that allows the user to toggle between checked and not checked.

By clicking this checkbox, you agree to the terms and conditions.

You can enable or disable notifications at any time.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center gap-3">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="terms-2" checked />
    <div class="grid gap-2">
      <Label for="terms-2">Accept terms and conditions</Label>
      <p class="text-muted-foreground text-sm">
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="toggle" disabled />
    <Label for="toggle">Enable notifications</Label>
  </div>
  <Label
    class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
  >
    <Checkbox
      id="toggle-2"
      checked
      class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
    />
    <div class="grid gap-1.5 font-normal">
      <p class="text-sm leading-none font-medium">Enable notifications</p>
      <p class="text-muted-foreground text-sm">
        You can enable or disable notifications at any time.
      </p>
    </div>
  </Label>
</div>
```

### Example 2

```jsx
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center gap-3">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="terms-2" checked />
    <div class="grid gap-2">
      <Label for="terms-2">Accept terms and conditions</Label>
      <p class="text-muted-foreground text-sm">
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="toggle" disabled />
    <Label for="toggle">Enable notifications</Label>
  </div>
  <Label
    class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
  >
    <Checkbox
      id="toggle-2"
      checked
      class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
    />
    <div class="grid gap-1.5 font-normal">
      <p class="text-sm leading-none font-medium">Enable notifications</p>
      <p class="text-muted-foreground text-sm">
        You can enable or disable notifications at any time.
      </p>
    </div>
  </Label>
</div>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add checkbox
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add checkbox
```

### Example 5

```python
npx shadcn-svelte@latest add checkbox
```

### Example 6

```python
npx shadcn-svelte@latest add checkbox
```

### Example 7

```python
npx shadcn-svelte@latest add checkbox
```

### Example 8

```python
npx shadcn-svelte@latest add checkbox
```

### Example 9

```python
bun x shadcn-svelte@latest add checkbox
```

### Example 10

```python
bun x shadcn-svelte@latest add checkbox
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
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
  import MinusIcon from "@lucide/svelte/icons/minus";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  class={cn(
    "border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive peer flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div data-slot="checkbox-indicator" class="text-current transition-none">
      {#if checked}
        <CheckIcon class="size-3.5" />
      {:else if indeterminate}
        <MinusIcon class="size-3.5" />
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
```

### Example 20

```jsx
<script lang="ts">
  import { Checkbox as CheckboxPrimitive } from "bits-ui";
  import CheckIcon from "@lucide/svelte/icons/check";
  import MinusIcon from "@lucide/svelte/icons/minus";
  import { cn, type WithoutChildrenOrChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    checked = $bindable(false),
    indeterminate = $bindable(false),
    class: className,
    ...restProps
  }: WithoutChildrenOrChild<CheckboxPrimitive.RootProps> = $props();
</script>

<CheckboxPrimitive.Root
  bind:ref
  data-slot="checkbox"
  class={cn(
    "border-input dark:bg-input/30 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground dark:data-[state=checked]:bg-primary data-[state=checked]:border-primary focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive peer flex size-4 shrink-0 items-center justify-center rounded-[4px] border shadow-xs transition-shadow outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50",
    className
  )}
  bind:checked
  bind:indeterminate
  {...restProps}
>
  {#snippet children({ checked, indeterminate })}
    <div data-slot="checkbox-indicator" class="text-current transition-none">
      {#if checked}
        <CheckIcon class="size-3.5" />
      {:else if indeterminate}
        <MinusIcon class="size-3.5" />
      {/if}
    </div>
  {/snippet}
</CheckboxPrimitive.Root>
```

### Example 21

```jsx
<script lang="ts">import {Checkbox} from "$lib/components/ui/checkbox/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import {Checkbox} from "$lib/components/ui/checkbox/index.js";</script>
```

### Example 23

```jsx
<Checkbox />
```

### Example 24

```jsx
<Checkbox />
```

## Sections

## Installation

## Usage
