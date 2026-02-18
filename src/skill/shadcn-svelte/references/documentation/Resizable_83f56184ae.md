# Resizable

**Source**: https://www.shadcn-svelte.com/docs/components/resizable

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Vertical](#vertical)
  - [Handle](#handle)

## Content

Accessible resizable panel groups and layouts with keyboard support.

The Resizable component is built on top of PaneForge by Huntabyte. Visit the PaneForge documentation for all the available props and abilities of the Resizable component.

Copy and paste the following code into your project.

Use the direction prop to set the direction of the resizable panels.

You can set or hide the handle by using the withHandle prop on the ResizableHandle component.

## Code Examples

### Example 1

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" class="max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{50}">
    <div class="flex h-[200px] items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize="{50}">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize="{25}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane defaultSize="{75}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 2

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" class="max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{50}">
    <div class="flex h-[200px] items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize="{50}">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize="{25}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane defaultSize="{75}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add resizable
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add resizable
```

### Example 5

```python
npx shadcn-svelte@latest add resizable
```

### Example 6

```python
npx shadcn-svelte@latest add resizable
```

### Example 7

```python
npx shadcn-svelte@latest add resizable
```

### Example 8

```python
npx shadcn-svelte@latest add resizable
```

### Example 9

```python
bun x shadcn-svelte@latest add resizable
```

### Example 10

```python
bun x shadcn-svelte@latest add resizable
```

### Example 11

```python
pnpm i paneforge@next -D
```

### Example 12

```python
pnpm i paneforge@next -D
```

### Example 13

```python
npm i paneforge@next -D
```

### Example 14

```python
npm i paneforge@next -D
```

### Example 15

```python
yarn install paneforge@next -D
```

### Example 16

```python
yarn install paneforge@next -D
```

### Example 17

```python
bun install paneforge@next -D
```

### Example 18

```python
bun install paneforge@next -D
```

### Example 19

```sql
import { Pane } from "paneforge";
import Handle from "./resizable-handle.svelte";
import PaneGroup from "./resizable-pane-group.svelte";

export {
  PaneGroup,
  Pane,
  Handle,
  //
  PaneGroup as ResizablePaneGroup,
  Pane as ResizablePane,
  Handle as ResizableHandle,
};
```

### Example 20

```sql
import { Pane } from "paneforge";
import Handle from "./resizable-handle.svelte";
import PaneGroup from "./resizable-pane-group.svelte";

export {
  PaneGroup,
  Pane,
  Handle,
  //
  PaneGroup as ResizablePaneGroup,
  Pane as ResizablePane,
  Handle as ResizableHandle,
};
```

### Example 21

```jsx
<script lang="ts">import * as Resizable from "$lib/components/ui/resizable/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Resizable from "$lib/components/ui/resizable/index.js";</script>
```

### Example 23

```unknown
<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 24

```unknown
<Resizable.PaneGroup direction="horizontal">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 25

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="vertical" class="min-h-[200px] max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{25}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Header</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize="{75}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Content</span>
    </div>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 26

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="vertical" class="min-h-[200px] max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{25}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Header</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize="{75}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Content</span>
    </div>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 27

```jsx
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 28

```jsx
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 29

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{25}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Sidebar</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane defaultSize="{75}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Content</span>
    </div>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 30

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" class="min-h-[200px] max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{25}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Sidebar</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane defaultSize="{75}">
    <div class="flex h-full items-center justify-center p-6">
      <span class="font-semibold">Content</span>
    </div>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 31

```jsx
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

### Example 32

```jsx
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="vertical">
  <Resizable.Pane>One</Resizable.Pane>
  <Resizable.Handle withHandle />
  <Resizable.Pane>Two</Resizable.Pane>
</Resizable.PaneGroup>
```

## Sections

## About

## Installation

## Usage

## Examples

### Vertical

### Handle
