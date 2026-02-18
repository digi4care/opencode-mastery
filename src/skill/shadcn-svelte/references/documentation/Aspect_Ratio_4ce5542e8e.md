# Aspect Ratio

**Source**: https://www.shadcn-svelte.com/docs/components/aspect-ratio

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

Displays content within a desired ratio.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
</script>

<AspectRatio ratio={16 / 9} class="bg-muted rounded-lg">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Gray by Drew Beamer"
    class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
  />
</AspectRatio>
```

### Example 2

```jsx
<script lang="ts">
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
</script>

<AspectRatio ratio={16 / 9} class="bg-muted rounded-lg">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Gray by Drew Beamer"
    class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
  />
</AspectRatio>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add aspect-ratio
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add aspect-ratio
```

### Example 5

```python
npx shadcn-svelte@latest add aspect-ratio
```

### Example 6

```python
npx shadcn-svelte@latest add aspect-ratio
```

### Example 7

```python
npx shadcn-svelte@latest add aspect-ratio
```

### Example 8

```python
npx shadcn-svelte@latest add aspect-ratio
```

### Example 9

```python
bun x shadcn-svelte@latest add aspect-ratio
```

### Example 10

```python
bun x shadcn-svelte@latest add aspect-ratio
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
  import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: AspectRatioPrimitive.RootProps = $props();
</script>

<AspectRatioPrimitive.Root bind:ref data-slot="aspect-ratio" {...restProps} />
```

### Example 20

```jsx
<script lang="ts">
  import { AspectRatio as AspectRatioPrimitive } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: AspectRatioPrimitive.RootProps = $props();
</script>

<AspectRatioPrimitive.Root bind:ref data-slot="aspect-ratio" {...restProps} />
```

### Example 21

```jsx
<script lang="ts">import {AspectRatio} from "$lib/components/ui/aspect-ratio/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import {AspectRatio} from "$lib/components/ui/aspect-ratio/index.js";</script>
```

### Example 23

```jsx
<div class="w-[450px]">
  <AspectRatio ratio={16 / 9} class="bg-muted">
    <img src="..." alt="..." class="rounded-md object-cover" />
  </AspectRatio>
</div>
```

### Example 24

```jsx
<div class="w-[450px]">
  <AspectRatio ratio={16 / 9} class="bg-muted">
    <img src="..." alt="..." class="rounded-md object-cover" />
  </AspectRatio>
</div>
```

## Sections

## Installation

## Usage
