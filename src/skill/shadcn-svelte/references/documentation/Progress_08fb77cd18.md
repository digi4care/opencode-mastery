# Progress

**Source**: https://www.shadcn-svelte.com/docs/components/progress

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```javascript
<script lang="ts">
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress/index.js";

  let value = $state(13);

  onMount(() => {
    const timer = setTimeout(() => (value = 66), 500);
    return () => clearTimeout(timer);
  });
</script>

<Progress {value} max={100} class="w-[60%]" />
```

### Example 2

```javascript
<script lang="ts">
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress/index.js";

  let value = $state(13);

  onMount(() => {
    const timer = setTimeout(() => (value = 66), 500);
    return () => clearTimeout(timer);
  });
</script>

<Progress {value} max={100} class="w-[60%]" />
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add progress
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add progress
```

### Example 5

```python
npx shadcn-svelte@latest add progress
```

### Example 6

```python
npx shadcn-svelte@latest add progress
```

### Example 7

```python
npx shadcn-svelte@latest add progress
```

### Example 8

```python
npx shadcn-svelte@latest add progress
```

### Example 9

```python
bun x shadcn-svelte@latest add progress
```

### Example 10

```python
bun x shadcn-svelte@latest add progress
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
import Root from "./progress.svelte";

export {
  Root,
  //
  Root as Progress,
};
```

### Example 20

```sql
import Root from "./progress.svelte";

export {
  Root,
  //
  Root as Progress,
};
```

### Example 21

```jsx
<script lang="ts">import {Progress} from "$lib/components/ui/progress/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import {Progress} from "$lib/components/ui/progress/index.js";</script>
```

### Example 23

```jsx
<Progress value={33} />
```

### Example 24

```jsx
<Progress value={33} />
```

## Sections

## Installation

## Usage
