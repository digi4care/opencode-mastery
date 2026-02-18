# Kbd

**Source**: https://www.shadcn-svelte.com/docs/components/kbd

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Group](#group)
  - [Button](#button)
  - [Tooltip](#tooltip)
  - [Input Group](#input-group)

## Content

Used to display textual user input from keyboard.

Copy and paste the following code into your project.

Use the Kbd.Group component to group keyboard keys together.

Use Ctrl + B Ctrl + K to open the command palette

Use the Kbd.Root component inside a Button component to display a keyboard key inside a button.

You can use the Kbd.Root component inside a Tooltip component to display a tooltip with a keyboard key.

You can use the Kbd.Root component inside a InputGroup.Addon component to display a keyboard key inside an input group.

## Code Examples

### Example 1

```html
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <Kbd.Group>
    <Kbd.Root>⌘</Kbd.Root>
    <Kbd.Root>⇧</Kbd.Root>
    <Kbd.Root>⌥</Kbd.Root>
    <Kbd.Root>⌃</Kbd.Root>
  </Kbd.Group>
  <Kbd.Group>
    <Kbd.Root>Ctrl</Kbd.Root>
    <span>+</span>
    <Kbd.Root>B</Kbd.Root>
  </Kbd.Group>
</div>
```

### Example 2

```html
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <Kbd.Group>
    <Kbd.Root>⌘</Kbd.Root>
    <Kbd.Root>⇧</Kbd.Root>
    <Kbd.Root>⌥</Kbd.Root>
    <Kbd.Root>⌃</Kbd.Root>
  </Kbd.Group>
  <Kbd.Group>
    <Kbd.Root>Ctrl</Kbd.Root>
    <span>+</span>
    <Kbd.Root>B</Kbd.Root>
  </Kbd.Group>
</div>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add kbd
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add kbd
```

### Example 5

```python
npx shadcn-svelte@latest add kbd
```

### Example 6

```python
npx shadcn-svelte@latest add kbd
```

### Example 7

```python
npx shadcn-svelte@latest add kbd
```

### Example 8

```python
npx shadcn-svelte@latest add kbd
```

### Example 9

```python
bun x shadcn-svelte@latest add kbd
```

### Example 10

```python
bun x shadcn-svelte@latest add kbd
```

### Example 11

```sql
import Root from "./kbd.svelte";
import Group from "./kbd-group.svelte";

export {
  Root,
  Group,
  //
  Root as Kbd,
  Group as KbdGroup,
};
```

### Example 12

```sql
import Root from "./kbd.svelte";
import Group from "./kbd-group.svelte";

export {
  Root,
  Group,
  //
  Root as Kbd,
  Group as KbdGroup,
};
```

### Example 13

```jsx
<script lang="ts">import * as Kbd from "$lib/components/ui/kbd/index.js";</script>
```

### Example 14

```jsx
<script lang="ts">import * as Kbd from "$lib/components/ui/kbd/index.js";</script>
```

### Example 15

```unknown
<Kbd.Root>B</Kbd.Root>
```

### Example 16

```unknown
<Kbd.Root>B</Kbd.Root>
```

### Example 17

```jsx
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <p class="text-muted-foreground text-sm">
    Use
    <Kbd.Group>
      <Kbd.Root>Ctrl + B</Kbd.Root>
      <Kbd.Root>Ctrl + K</Kbd.Root>
    </Kbd.Group>
    to open the command palette
  </p>
</div>
```

### Example 18

```jsx
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <p class="text-muted-foreground text-sm">
    Use
    <Kbd.Group>
      <Kbd.Root>Ctrl + B</Kbd.Root>
      <Kbd.Root>Ctrl + K</Kbd.Root>
    </Kbd.Group>
    to open the command palette
  </p>
</div>
```

### Example 19

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-wrap items-center gap-4">
  <Button variant="outline" size="sm" class="pe-2">
    Accept <Kbd.Root>⏎</Kbd.Root>
  </Button>
  <Button variant="outline" size="sm" class="pe-2">
    Cancel <Kbd.Root>Esc</Kbd.Root>
  </Button>
</div>
```

### Example 20

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-wrap items-center gap-4">
  <Button variant="outline" size="sm" class="pe-2">
    Accept <Kbd.Root>⏎</Kbd.Root>
  </Button>
  <Button variant="outline" size="sm" class="pe-2">
    Cancel <Kbd.Root>Esc</Kbd.Root>
  </Button>
</div>
```

### Example 21

```jsx
<script lang="ts">
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Kbd from "$lib/components/ui/kbd/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<div class="flex flex-wrap gap-4">
  <ButtonGroup.Root>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button size="sm" variant="outline" {...props}>Save</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div class="flex items-center gap-2">
          Save Changes <Kbd.Root>S</Kbd.Root>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button size="sm" variant="outline" {...props}>Print</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div class="flex items-center gap-2">
          Print Document
          <Kbd.Group>
            <Kbd.Root>Ctrl</Kbd.Root>
            <Kbd.Root>P</Kbd.Root>
          </Kbd.Group>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </ButtonGroup.Root>
</div>
```

### Example 22

```jsx
<script lang="ts">
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Kbd from "$lib/components/ui/kbd/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<div class="flex flex-wrap gap-4">
  <ButtonGroup.Root>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button size="sm" variant="outline" {...props}>Save</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div class="flex items-center gap-2">
          Save Changes <Kbd.Root>S</Kbd.Root>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
    <Tooltip.Root>
      <Tooltip.Trigger>
        {#snippet child({ props })}
          <Button size="sm" variant="outline" {...props}>Print</Button>
        {/snippet}
      </Tooltip.Trigger>
      <Tooltip.Content>
        <div class="flex items-center gap-2">
          Print Document
          <Kbd.Group>
            <Kbd.Root>Ctrl</Kbd.Root>
            <Kbd.Root>P</Kbd.Root>
          </Kbd.Group>
        </div>
      </Tooltip.Content>
    </Tooltip.Root>
  </ButtonGroup.Root>
</div>
```

### Example 23

```jsx
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
</script>

<div class="flex w-full max-w-xs flex-col gap-6">
  <InputGroup.Root>
    <InputGroup.Input placeholder="Search..." />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">
      <Kbd.Root>⌘</Kbd.Root>
      <Kbd.Root>K</Kbd.Root>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
```

### Example 24

```jsx
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
</script>

<div class="flex w-full max-w-xs flex-col gap-6">
  <InputGroup.Root>
    <InputGroup.Input placeholder="Search..." />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">
      <Kbd.Root>⌘</Kbd.Root>
      <Kbd.Root>K</Kbd.Root>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
```

## Sections

## Installation

## Usage

## Examples

### Group

### Button

### Tooltip

### Input Group
