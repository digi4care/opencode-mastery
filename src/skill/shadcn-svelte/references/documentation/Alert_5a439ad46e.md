# Alert

**Source**: https://www.shadcn-svelte.com/docs/components/alert

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

Displays a callout for user attention.

Please verify your billing information and try again.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as Alert from "$lib/components/ui/alert/index.js";
  import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
  import PopcornIcon from "@lucide/svelte/icons/popcorn";
</script>

<div class="grid w-full max-w-xl items-start gap-4">
  <Alert.Root>
    <CheckCircle2Icon />
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description
      >This is an alert with icon, title and description.</Alert.Description
    >
  </Alert.Root>
  <Alert.Root>
    <PopcornIcon />
    <Alert.Title
      >This Alert has a title and an icon. No description.</Alert.Title
    >
  </Alert.Root>
  <Alert.Root variant="destructive">
    <AlertCircleIcon />
    <Alert.Title>Unable to process your payment.</Alert.Title>
    <Alert.Description>
      <p>Please verify your billing information and try again.</p>
      <ul class="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </Alert.Description>
  </Alert.Root>
</div>
```

### Example 2

```jsx
<script lang="ts">
  import * as Alert from "$lib/components/ui/alert/index.js";
  import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
  import PopcornIcon from "@lucide/svelte/icons/popcorn";
</script>

<div class="grid w-full max-w-xl items-start gap-4">
  <Alert.Root>
    <CheckCircle2Icon />
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description
      >This is an alert with icon, title and description.</Alert.Description
    >
  </Alert.Root>
  <Alert.Root>
    <PopcornIcon />
    <Alert.Title
      >This Alert has a title and an icon. No description.</Alert.Title
    >
  </Alert.Root>
  <Alert.Root variant="destructive">
    <AlertCircleIcon />
    <Alert.Title>Unable to process your payment.</Alert.Title>
    <Alert.Description>
      <p>Please verify your billing information and try again.</p>
      <ul class="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </Alert.Description>
  </Alert.Root>
</div>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add alert
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add alert
```

### Example 5

```python
npx shadcn-svelte@latest add alert
```

### Example 6

```python
npx shadcn-svelte@latest add alert
```

### Example 7

```python
npx shadcn-svelte@latest add alert
```

### Example 8

```python
npx shadcn-svelte@latest add alert
```

### Example 9

```python
bun x shadcn-svelte@latest add alert
```

### Example 10

```python
bun x shadcn-svelte@latest add alert
```

### Example 11

```html
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="alert-description"
  class={cn(
    "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
```

### Example 12

```html
<script lang="ts">
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="alert-description"
  class={cn(
    "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
    className
  )}
  {...restProps}
>
  {@render children?.()}
</div>
```

### Example 13

```jsx
<script lang="ts">import * as Alert from "$lib/components/ui/alert/index.js";</script>
```

### Example 14

```jsx
<script lang="ts">import * as Alert from "$lib/components/ui/alert/index.js";</script>
```

### Example 15

```julia
<Alert.Root>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    You can add components to your app using the cli.
  </Alert.Description>
</Alert.Root>
```

### Example 16

```julia
<Alert.Root>
  <Alert.Title>Heads up!</Alert.Title>
  <Alert.Description>
    You can add components to your app using the cli.
  </Alert.Description>
</Alert.Root>
```

## Sections

## Installation

## Usage
