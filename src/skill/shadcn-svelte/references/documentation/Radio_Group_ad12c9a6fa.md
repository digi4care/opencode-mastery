# Radio Group

**Source**: https://www.shadcn-svelte.com/docs/components/radio-group

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<RadioGroup.Root value="comfortable">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="default" id="r1" />
    <Label for="r1">Default</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="comfortable" id="r2" />
    <Label for="r2">Comfortable</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="compact" id="r3" />
    <Label for="r3">Compact</Label>
  </div>
</RadioGroup.Root>
```

### Example 2

```jsx
<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<RadioGroup.Root value="comfortable">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="default" id="r1" />
    <Label for="r1">Default</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="comfortable" id="r2" />
    <Label for="r2">Comfortable</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="compact" id="r3" />
    <Label for="r3">Compact</Label>
  </div>
</RadioGroup.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add radio-group
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add radio-group
```

### Example 5

```python
npx shadcn-svelte@latest add radio-group
```

### Example 6

```python
npx shadcn-svelte@latest add radio-group
```

### Example 7

```python
npx shadcn-svelte@latest add radio-group
```

### Example 8

```python
npx shadcn-svelte@latest add radio-group
```

### Example 9

```python
bun x shadcn-svelte@latest add radio-group
```

### Example 10

```python
bun x shadcn-svelte@latest add radio-group
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
import Root from "./radio-group.svelte";
import Item from "./radio-group-item.svelte";

export {
  Root,
  Item,
  //
  Root as RadioGroup,
  Item as RadioGroupItem,
};
```

### Example 20

```sql
import Root from "./radio-group.svelte";
import Item from "./radio-group-item.svelte";

export {
  Root,
  Item,
  //
  Root as RadioGroup,
  Item as RadioGroupItem,
};
```

### Example 21

```jsx
<script lang="ts">
  import {Label} from "$lib/components/ui/label/index.js"; import * as RadioGroup from
  "$lib/components/ui/radio-group/index.js";
</script>
```

### Example 22

```jsx
<script lang="ts">
  import {Label} from "$lib/components/ui/label/index.js"; import * as RadioGroup from
  "$lib/components/ui/radio-group/index.js";
</script>
```

### Example 23

```jsx
<RadioGroup.Root value="option-one">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-one" id="option-one" />
    <Label for="option-one">Option One</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-two" id="option-two" />
    <Label for="option-two">Option Two</Label>
  </div>
</RadioGroup.Root>
```

### Example 24

```jsx
<RadioGroup.Root value="option-one">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-one" id="option-one" />
    <Label for="option-one">Option One</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="option-two" id="option-two" />
    <Label for="option-two">Option Two</Label>
  </div>
</RadioGroup.Root>
```

## Sections

## Installation

## Usage
