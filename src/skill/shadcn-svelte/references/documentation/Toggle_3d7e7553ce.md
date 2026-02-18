# Toggle

**Source**: https://www.shadcn-svelte.com/docs/components/toggle

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Default](#default)
  - [Outline](#outline)
  - [With Text](#with-text)
  - [Small](#small)
  - [Large](#large)
  - [Disabled](#disabled)

## Content

A two-state button that can be either on or off.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>
```

### Example 2

```jsx
<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add toggle
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add toggle
```

### Example 5

```python
npx shadcn-svelte@latest add toggle
```

### Example 6

```python
npx shadcn-svelte@latest add toggle
```

### Example 7

```python
npx shadcn-svelte@latest add toggle
```

### Example 8

```python
npx shadcn-svelte@latest add toggle
```

### Example 9

```python
bun x shadcn-svelte@latest add toggle
```

### Example 10

```python
bun x shadcn-svelte@latest add toggle
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
import Root from "./toggle.svelte";
export {
  toggleVariants,
  type ToggleSize,
  type ToggleVariant,
  type ToggleVariants,
} from "./toggle.svelte";

export {
  Root,
  //
  Root as Toggle,
};
```

### Example 20

```sql
import Root from "./toggle.svelte";
export {
  toggleVariants,
  type ToggleSize,
  type ToggleVariant,
  type ToggleVariants,
} from "./toggle.svelte";

export {
  Root,
  //
  Root as Toggle,
};
```

### Example 21

```jsx
<script lang="ts">import {Toggle} from "$lib/components/ui/toggle/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import {Toggle} from "$lib/components/ui/toggle/index.js";</script>
```

### Example 23

```typescript
<Toggle>Toggle</Toggle>
```

### Example 24

```typescript
<Toggle>Toggle</Toggle>
```

### Example 25

```jsx
<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>
```

### Example 26

```jsx
<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>
```

### Example 27

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle variant="outline" aria-label="Toggle italic">
  <ItalicIcon class="size-4" />
</Toggle>
```

### Example 28

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle variant="outline" aria-label="Toggle italic">
  <ItalicIcon class="size-4" />
</Toggle>
```

### Example 29

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle italic">
  <ItalicIcon class="me-2 size-4" />
  Italic
</Toggle>
```

### Example 30

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle italic">
  <ItalicIcon class="me-2 size-4" />
  Italic
</Toggle>
```

### Example 31

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle size="sm" aria-label="Toggle italic">
  <ItalicIcon class="size-4" />
</Toggle>
```

### Example 32

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle size="sm" aria-label="Toggle italic">
  <ItalicIcon class="size-4" />
</Toggle>
```

### Example 33

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle size="lg" aria-label="Toggle italic">
  <ItalicIcon class="size-4" />
</Toggle>
```

### Example 34

```jsx
<script lang="ts">
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle size="lg" aria-label="Toggle italic">
  <ItalicIcon class="size-4" />
</Toggle>
```

### Example 35

```jsx
<script lang="ts">
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle underline" disabled>
  <UnderlineIcon class="size-4" />
</Toggle>
```

### Example 36

```jsx
<script lang="ts">
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle aria-label="Toggle underline" disabled>
  <UnderlineIcon class="size-4" />
</Toggle>
```

## Sections

## Installation

## Usage

## Examples

### Default

### Outline

### With Text

### Small

### Large

### Disabled
