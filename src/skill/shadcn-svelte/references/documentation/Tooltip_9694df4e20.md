# Tooltip

**Source**: https://www.shadcn-svelte.com/docs/components/tooltip

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
  - [Nested Providers](#nested-providers)
- [Changelog](#changelog)
  - [2025-12 Update tooltip colors](#2025-12-update-tooltip-colors)

## Content

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

Copy and paste the following code into your project.

The Tooltip.Provider component should be placed once in your root layout, wrapping all content that will contain tooltips. This ensures that only one tooltip within the provider can be open at a time.

Then use tooltips anywhere in your app:

You can nest providers to create groups with different settings. Tooltips use the closest ancestor provider. This is useful when you want instant tooltips in specific areas:

We've updated the tooltip colors to use the foreground color for the background and the background color for the foreground.

Replace bg-primary text-primary-foreground with bg-foreground text-background for <Tooltip.Content />.

## Code Examples

### Example 1

```typescript
<script lang="ts">
  import { buttonVariants } from "../ui/button/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger class={buttonVariants({ variant: "outline" })}
      >Hover</Tooltip.Trigger
    >
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
```

### Example 2

```typescript
<script lang="ts">
  import { buttonVariants } from "../ui/button/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger class={buttonVariants({ variant: "outline" })}
      >Hover</Tooltip.Trigger
    >
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add tooltip
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add tooltip
```

### Example 5

```python
npx shadcn-svelte@latest add tooltip
```

### Example 6

```python
npx shadcn-svelte@latest add tooltip
```

### Example 7

```python
npx shadcn-svelte@latest add tooltip
```

### Example 8

```python
npx shadcn-svelte@latest add tooltip
```

### Example 9

```python
bun x shadcn-svelte@latest add tooltip
```

### Example 10

```python
bun x shadcn-svelte@latest add tooltip
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

```sql
import Root from "./tooltip.svelte";
import Trigger from "./tooltip-trigger.svelte";
import Content from "./tooltip-content.svelte";
import Provider from "./tooltip-provider.svelte";
import Portal from "./tooltip-portal.svelte";

export {
  Root,
  Trigger,
  Content,
  Provider,
  Portal,
  //
  Root as Tooltip,
  Content as TooltipContent,
  Trigger as TooltipTrigger,
  Provider as TooltipProvider,
  Portal as TooltipPortal,
};
```

### Example 20

```sql
import Root from "./tooltip.svelte";
import Trigger from "./tooltip-trigger.svelte";
import Content from "./tooltip-content.svelte";
import Provider from "./tooltip-provider.svelte";
import Portal from "./tooltip-portal.svelte";

export {
  Root,
  Trigger,
  Content,
  Provider,
  Portal,
  //
  Root as Tooltip,
  Content as TooltipContent,
  Trigger as TooltipTrigger,
  Provider as TooltipProvider,
  Portal as TooltipPortal,
};
```

### Example 21

```jsx
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js"; let {children} = $props();
</script>
```

### Example 22

```jsx
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js"; let {children} = $props();
</script>
```

### Example 23

```json
<Tooltip.Provider>
  {@render children()}
</Tooltip.Provider>
```

### Example 24

```json
<Tooltip.Provider>
  {@render children()}
</Tooltip.Provider>
```

### Example 25

```typescript
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Root>
  <Tooltip.Trigger>Hover</Tooltip.Trigger>
  <Tooltip.Content>
    <p>Add to library</p>
  </Tooltip.Content>
</Tooltip.Root>
```

### Example 26

```typescript
<script lang="ts">
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Root>
  <Tooltip.Trigger>Hover</Tooltip.Trigger>
  <Tooltip.Content>
    <p>Add to library</p>
  </Tooltip.Content>
</Tooltip.Root>
```

### Example 27

```php
<Tooltip.Provider delayDuration={0}>
  <!-- Tooltips here will open instantly -->
</Tooltip.Provider>
```

### Example 28

```php
<Tooltip.Provider delayDuration={0}>
  <!-- Tooltips here will open instantly -->
</Tooltip.Provider>
```

## Sections

## Installation

## Usage

### Nested Providers

## Changelog

### 2025-12 Update tooltip colors
