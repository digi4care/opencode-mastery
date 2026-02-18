# Toggle Group

**Source**: https://www.shadcn-svelte.com/docs/components/toggle-group

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Outline](#outline)
  - [Single](#single)
  - [Small](#small)
  - [Large](#large)
  - [Disabled](#disabled)
  - [Spacing](#spacing)

## Content

A set of two-state buttons that can be toggled on or off.

Copy and paste the following code into your project.

Use spacing={2} to add spacing between toggle group items.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
  <ToggleGroup.Item
    value="star"
    aria-label="Toggle star"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
  >
    <StarIcon />
    Star
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="heart"
    aria-label="Toggle heart"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
  >
    <HeartIcon />
    Heart
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="bookmark"
    aria-label="Toggle bookmark"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
  >
    <BookmarkIcon />
    Bookmark
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 2

```jsx
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
  <ToggleGroup.Item
    value="star"
    aria-label="Toggle star"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
  >
    <StarIcon />
    Star
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="heart"
    aria-label="Toggle heart"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
  >
    <HeartIcon />
    Heart
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="bookmark"
    aria-label="Toggle bookmark"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
  >
    <BookmarkIcon />
    Bookmark
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add toggle-group
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add toggle-group
```

### Example 5

```python
npx shadcn-svelte@latest add toggle-group
```

### Example 6

```python
npx shadcn-svelte@latest add toggle-group
```

### Example 7

```python
npx shadcn-svelte@latest add toggle-group
```

### Example 8

```python
npx shadcn-svelte@latest add toggle-group
```

### Example 9

```python
bun x shadcn-svelte@latest add toggle-group
```

### Example 10

```python
bun x shadcn-svelte@latest add toggle-group
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
import Root from "./toggle-group.svelte";
import Item from "./toggle-group-item.svelte";

export {
  Root,
  Item,
  //
  Root as ToggleGroup,
  Item as ToggleGroupItem,
};
```

### Example 20

```sql
import Root from "./toggle-group.svelte";
import Item from "./toggle-group-item.svelte";

export {
  Root,
  Item,
  //
  Root as ToggleGroup,
  Item as ToggleGroupItem,
};
```

### Example 21

```jsx
<script lang="ts">import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";</script>
```

### Example 23

```unknown
<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 24

```unknown
<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="a">A</ToggleGroup.Item>
  <ToggleGroup.Item value="b">B</ToggleGroup.Item>
  <ToggleGroup.Item value="c">C</ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 25

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root variant="outline" type="multiple">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 26

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root variant="outline" type="multiple">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 27

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 28

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root type="single">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 29

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root size="sm" type="single">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 30

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root size="sm" type="single">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 31

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root size="lg" type="multiple">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 32

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root size="lg" type="multiple">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 33

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root disabled type="single">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 34

```jsx
<script lang="ts">
  import BoldIcon from "@lucide/svelte/icons/bold";
  import ItalicIcon from "@lucide/svelte/icons/italic";
  import UnderlineIcon from "@lucide/svelte/icons/underline";
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
</script>

<ToggleGroup.Root disabled type="single">
  <ToggleGroup.Item value="bold" aria-label="Toggle bold">
    <BoldIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="italic" aria-label="Toggle italic">
    <ItalicIcon class="size-4" />
  </ToggleGroup.Item>
  <ToggleGroup.Item value="strikethrough" aria-label="Toggle strikethrough">
    <UnderlineIcon class="size-4" />
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 35

```jsx
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
  <ToggleGroup.Item
    value="star"
    aria-label="Toggle star"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
  >
    <StarIcon />
    Star
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="heart"
    aria-label="Toggle heart"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
  >
    <HeartIcon />
    Heart
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="bookmark"
    aria-label="Toggle bookmark"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
  >
    <BookmarkIcon />
    Bookmark
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

### Example 36

```jsx
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
  <ToggleGroup.Item
    value="star"
    aria-label="Toggle star"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
  >
    <StarIcon />
    Star
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="heart"
    aria-label="Toggle heart"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
  >
    <HeartIcon />
    Heart
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="bookmark"
    aria-label="Toggle bookmark"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
  >
    <BookmarkIcon />
    Bookmark
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

## Sections

## Installation

## Usage

## Examples

### Outline

### Single

### Small

### Large

### Disabled

### Spacing
