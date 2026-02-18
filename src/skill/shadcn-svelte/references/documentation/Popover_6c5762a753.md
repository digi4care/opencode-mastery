# Popover

**Source**: https://www.shadcn-svelte.com/docs/components/popover

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

Displays rich content in a portal, triggered by a button.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>

<Popover.Root>
  <Popover.Trigger class={buttonVariants({ variant: "outline" })}
    >Open popover</Popover.Trigger
  >
  <Popover.Content class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="leading-none font-medium">Dimensions</h4>
        <p class="text-muted-foreground text-sm">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxWidth">Max. width</Label>
          <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">Height</Label>
          <Input id="height" value="25px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxHeight">Max. height</Label>
          <Input id="maxHeight" value="none" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
```

### Example 2

```jsx
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>

<Popover.Root>
  <Popover.Trigger class={buttonVariants({ variant: "outline" })}
    >Open popover</Popover.Trigger
  >
  <Popover.Content class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="leading-none font-medium">Dimensions</h4>
        <p class="text-muted-foreground text-sm">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxWidth">Max. width</Label>
          <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">Height</Label>
          <Input id="height" value="25px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxHeight">Max. height</Label>
          <Input id="maxHeight" value="none" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add popover
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add popover
```

### Example 5

```python
npx shadcn-svelte@latest add popover
```

### Example 6

```python
npx shadcn-svelte@latest add popover
```

### Example 7

```python
npx shadcn-svelte@latest add popover
```

### Example 8

```python
npx shadcn-svelte@latest add popover
```

### Example 9

```python
bun x shadcn-svelte@latest add popover
```

### Example 10

```python
bun x shadcn-svelte@latest add popover
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
import Root from "./popover.svelte";
import Close from "./popover-close.svelte";
import Content from "./popover-content.svelte";
import Trigger from "./popover-trigger.svelte";
import Portal from "./popover-portal.svelte";

export {
  Root,
  Content,
  Trigger,
  Close,
  Portal,
  //
  Root as Popover,
  Content as PopoverContent,
  Trigger as PopoverTrigger,
  Close as PopoverClose,
  Portal as PopoverPortal,
};
```

### Example 20

```sql
import Root from "./popover.svelte";
import Close from "./popover-close.svelte";
import Content from "./popover-content.svelte";
import Trigger from "./popover-trigger.svelte";
import Portal from "./popover-portal.svelte";

export {
  Root,
  Content,
  Trigger,
  Close,
  Portal,
  //
  Root as Popover,
  Content as PopoverContent,
  Trigger as PopoverTrigger,
  Close as PopoverClose,
  Portal as PopoverPortal,
};
```

### Example 21

```jsx
<script lang="ts">import * as Popover from "$lib/components/ui/popover/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Popover from "$lib/components/ui/popover/index.js";</script>
```

### Example 23

```unknown
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>Place content for the popover here.</Popover.Content>
</Popover.Root>
```

### Example 24

```unknown
<Popover.Root>
  <Popover.Trigger>Open</Popover.Trigger>
  <Popover.Content>Place content for the popover here.</Popover.Content>
</Popover.Root>
```

## Sections

## Installation

## Usage
