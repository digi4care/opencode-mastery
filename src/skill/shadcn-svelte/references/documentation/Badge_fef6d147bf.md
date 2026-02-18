# Badge

**Source**: https://www.shadcn-svelte.com/docs/components/badge

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Link](#link)

## Content

Displays a badge or a component that looks like a badge.

Copy and paste the following code into your project.

You can use the badgeVariants helper to create a link that looks like a badge.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
</script>

<div class="flex flex-col items-center gap-2">
  <div class="flex w-full flex-wrap gap-2">
    <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
  <div class="flex w-full flex-wrap gap-2">
    <Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
      <BadgeCheckIcon />
      Verified
    </Badge>
    <Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge
    >
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="destructive"
    >
      99
    </Badge>
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="outline"
    >
      20+
    </Badge>
  </div>
</div>
```

### Example 2

```jsx
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
</script>

<div class="flex flex-col items-center gap-2">
  <div class="flex w-full flex-wrap gap-2">
    <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
  <div class="flex w-full flex-wrap gap-2">
    <Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
      <BadgeCheckIcon />
      Verified
    </Badge>
    <Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge
    >
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="destructive"
    >
      99
    </Badge>
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="outline"
    >
      20+
    </Badge>
  </div>
</div>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add badge
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add badge
```

### Example 5

```python
npx shadcn-svelte@latest add badge
```

### Example 6

```python
npx shadcn-svelte@latest add badge
```

### Example 7

```python
npx shadcn-svelte@latest add badge
```

### Example 8

```python
npx shadcn-svelte@latest add badge
```

### Example 9

```python
bun x shadcn-svelte@latest add badge
```

### Example 10

```python
bun x shadcn-svelte@latest add badge
```

### Example 11

```typescript
<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants";

  export const badgeVariants = tv({
    base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
        destructive:
          "bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
  } = $props();
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  {href}
  class={cn(badgeVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
```

### Example 12

```typescript
<script lang="ts" module>
  import { type VariantProps, tv } from "tailwind-variants";

  export const badgeVariants = tv({
    base: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3",
    variants: {
      variant: {
        default:
          "bg-primary text-primary-foreground [a&]:hover:bg-primary/90 border-transparent",
        secondary:
          "bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90 border-transparent",
        destructive:
          "bg-destructive [a&]:hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/70 border-transparent text-white",
        outline: "text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  });

  export type BadgeVariant = VariantProps<typeof badgeVariants>["variant"];
</script>

<script lang="ts">
  import type { HTMLAnchorAttributes } from "svelte/elements";
  import { cn, type WithElementRef } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    href,
    class: className,
    variant = "default",
    children,
    ...restProps
  }: WithElementRef<HTMLAnchorAttributes> & {
    variant?: BadgeVariant;
  } = $props();
</script>

<svelte:element
  this={href ? "a" : "span"}
  bind:this={ref}
  data-slot="badge"
  {href}
  class={cn(badgeVariants({ variant }), className)}
  {...restProps}
>
  {@render children?.()}
</svelte:element>
```

### Example 13

```jsx
<script lang="ts">import {Badge} from "$lib/components/ui/badge/index.js";</script>
```

### Example 14

```jsx
<script lang="ts">import {Badge} from "$lib/components/ui/badge/index.js";</script>
```

### Example 15

```jsx
<Badge variant="outline">Badge</Badge>
```

### Example 16

```jsx
<Badge variant="outline">Badge</Badge>
```

### Example 17

```jsx
<script lang="ts">
  import { badgeVariants } from "$lib/components/ui/badge/index.js";
</script>

<a href="/dashboard" class={badgeVariants({ variant: "outline" })}>Badge</a>
```

### Example 18

```jsx
<script lang="ts">
  import { badgeVariants } from "$lib/components/ui/badge/index.js";
</script>

<a href="/dashboard" class={badgeVariants({ variant: "outline" })}>Badge</a>
```

## Sections

## Installation

## Usage

### Link
