# Spinner

**Source**: https://www.shadcn-svelte.com/docs/components/spinner

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Customization](#customization)
- [Examples](#examples)
  - [Size](#size)
  - [Color](#color)
  - [Button](#button)
  - [Badge](#badge)
  - [Input Group](#input-group)
  - [Empty](#empty)
  - [Item](#item)

## Content

An indicator that can be used to show a loading state.

Install @lucide/svelte:

Copy and paste the following code into your project.

You can replace the default spinner icon with any other icon by editing the Spinner component.

Use the size-\* utility class to change the size of the spinner.

Use the text-\* utility class to change the color of the spinner.

Add a spinner to a button to indicate a loading state. The <Button /> will handle the spacing between the spinner and the text.

You can also use a spinner inside a badge.

Input Group can have spinners inside <InputGroup.Addon>.

Use the spinner inside <Item.Media> to indicate a loading state.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
</script>

<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="muted">
    <Item.Media>
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title class="line-clamp-1">Processing payment...</Item.Title>
    </Item.Content>
    <Item.Content class="flex-none justify-end">
      <span class="text-sm tabular-nums">$100.00</span>
    </Item.Content>
  </Item.Root>
</div>
```

### Example 2

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
</script>

<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="muted">
    <Item.Media>
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title class="line-clamp-1">Processing payment...</Item.Title>
    </Item.Content>
    <Item.Content class="flex-none justify-end">
      <span class="text-sm tabular-nums">$100.00</span>
    </Item.Content>
  </Item.Root>
</div>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add spinner
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add spinner
```

### Example 5

```python
npx shadcn-svelte@latest add spinner
```

### Example 6

```python
npx shadcn-svelte@latest add spinner
```

### Example 7

```python
npx shadcn-svelte@latest add spinner
```

### Example 8

```python
npx shadcn-svelte@latest add spinner
```

### Example 9

```python
bun x shadcn-svelte@latest add spinner
```

### Example 10

```python
bun x shadcn-svelte@latest add spinner
```

### Example 11

```python
pnpm i @lucide/svelte -D
```

### Example 12

```python
pnpm i @lucide/svelte -D
```

### Example 13

```python
npm i @lucide/svelte -D
```

### Example 14

```python
npm i @lucide/svelte -D
```

### Example 15

```python
yarn install @lucide/svelte -D
```

### Example 16

```python
yarn install @lucide/svelte -D
```

### Example 17

```python
bun install @lucide/svelte -D
```

### Example 18

```python
bun install @lucide/svelte -D
```

### Example 19

```sql
export { default as Spinner } from "./spinner.svelte";
```

### Example 20

```sql
export { default as Spinner } from "./spinner.svelte";
```

### Example 21

```jsx
<script lang="ts">import {Spinner} from "$lib/components/ui/spinner/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import {Spinner} from "$lib/components/ui/spinner/index.js";</script>
```

### Example 23

```jsx
<Spinner />
```

### Example 24

```jsx
<Spinner />
```

### Example 25

```typescript
<script lang="ts">
  import { cn } from "$lib/utils.js";
  import LoaderIcon from "@lucide/svelte/icons/loader";
  import type { ComponentProps } from "svelte";

  type Props = ComponentProps<typeof LoaderIcon>;

  let { class: className, ...restProps }: Props = $props();
</script>

<LoaderIcon
  role="status"
  aria-label="Loading"
  class={cn("size-4 animate-spin", className)}
  {...restProps}
/>
```

### Example 26

```typescript
<script lang="ts">
  import { cn } from "$lib/utils.js";
  import LoaderIcon from "@lucide/svelte/icons/loader";
  import type { ComponentProps } from "svelte";

  type Props = ComponentProps<typeof LoaderIcon>;

  let { class: className, ...restProps }: Props = $props();
</script>

<LoaderIcon
  role="status"
  aria-label="Loading"
  class={cn("size-4 animate-spin", className)}
  {...restProps}
/>
```

### Example 27

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex items-center gap-6">
  <Spinner class="size-3" />
  <Spinner class="size-4" />
  <Spinner class="size-6" />
  <Spinner class="size-8" />
</div>
```

### Example 28

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex items-center gap-6">
  <Spinner class="size-3" />
  <Spinner class="size-4" />
  <Spinner class="size-6" />
  <Spinner class="size-8" />
</div>
```

### Example 29

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex items-center gap-6">
  <Spinner class="size-6 text-red-500" />
  <Spinner class="size-6 text-green-500" />
  <Spinner class="size-6 text-blue-500" />
  <Spinner class="size-6 text-yellow-500" />
  <Spinner class="size-6 text-purple-500" />
</div>
```

### Example 30

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex items-center gap-6">
  <Spinner class="size-6 text-red-500" />
  <Spinner class="size-6 text-green-500" />
  <Spinner class="size-6 text-blue-500" />
  <Spinner class="size-6 text-yellow-500" />
  <Spinner class="size-6 text-purple-500" />
</div>
```

### Example 31

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <Button disabled size="sm">
    <Spinner />
    Loading...
  </Button>
  <Button variant="outline" disabled size="sm">
    <Spinner />
    Please wait
  </Button>
  <Button variant="secondary" disabled size="sm">
    <Spinner />
    Processing
  </Button>
</div>
```

### Example 32

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <Button disabled size="sm">
    <Spinner />
    Loading...
  </Button>
  <Button variant="outline" disabled size="sm">
    <Spinner />
    Please wait
  </Button>
  <Button variant="secondary" disabled size="sm">
    <Spinner />
    Processing
  </Button>
</div>
```

### Example 33

```jsx
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex items-center gap-2">
  <Badge>
    <Spinner />
    Syncing
  </Badge>
  <Badge variant="secondary">
    <Spinner />
    Updating
  </Badge>
  <Badge variant="outline">
    <Spinner />
    Loading
  </Badge>
</div>
```

### Example 34

```jsx
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
</script>

<div class="flex items-center gap-2">
  <Badge>
    <Spinner />
    Syncing
  </Badge>
  <Badge variant="secondary">
    <Spinner />
    Updating
  </Badge>
  <Badge variant="outline">
    <Spinner />
    Loading
  </Badge>
</div>
```

### Example 35

```jsx
<script lang="ts">
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
</script>

<div class="flex w-full max-w-md flex-col gap-4">
  <InputGroup.Root>
    <InputGroup.Input placeholder="Send a message..." disabled />
    <InputGroup.Addon align="inline-end">
      <Spinner />
    </InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Textarea placeholder="Send a message..." disabled />
    <InputGroup.Addon align="block-end">
      <Spinner /> Validating...
      <InputGroup.Button class="ms-auto" variant="default">
        <ArrowUpIcon />
        <span class="sr-only">Send</span>
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
```

### Example 36

```jsx
<script lang="ts">
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
</script>

<div class="flex w-full max-w-md flex-col gap-4">
  <InputGroup.Root>
    <InputGroup.Input placeholder="Send a message..." disabled />
    <InputGroup.Addon align="inline-end">
      <Spinner />
    </InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Textarea placeholder="Send a message..." disabled />
    <InputGroup.Addon align="block-end">
      <Spinner /> Validating...
      <InputGroup.Button class="ms-auto" variant="default">
        <ArrowUpIcon />
        <span class="sr-only">Send</span>
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
```

### Example 37

```jsx
<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Empty.Root class="w-full border md:p-6">
  <Empty.Header>
    <Empty.Media variant="icon">
      <Spinner />
    </Empty.Media>
    <Empty.Title>Processing your request</Empty.Title>
    <Empty.Description>
      Please wait while we process your request. Do not refresh the page.
    </Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <Button variant="outline" size="sm">Cancel</Button>
  </Empty.Content>
</Empty.Root>
```

### Example 38

```jsx
<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Empty.Root class="w-full border md:p-6">
  <Empty.Header>
    <Empty.Media variant="icon">
      <Spinner />
    </Empty.Media>
    <Empty.Title>Processing your request</Empty.Title>
    <Empty.Description>
      Please wait while we process your request. Do not refresh the page.
    </Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <Button variant="outline" size="sm">Cancel</Button>
  </Empty.Content>
</Empty.Root>
```

### Example 39

```jsx
<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Progress } from "$lib/components/ui/progress/index.js";
</script>

<div class="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="outline">
    <Item.Media variant="icon">
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title>Downloading...</Item.Title>
      <Item.Description>129 MB / 1000 MB</Item.Description>
    </Item.Content>
    <Item.Actions class="hidden sm:flex">
      <Button variant="outline" size="sm">Cancel</Button>
    </Item.Actions>
    <Item.Footer>
      <Progress value={75} />
    </Item.Footer>
  </Item.Root>
</div>
```

### Example 40

```jsx
<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Progress } from "$lib/components/ui/progress/index.js";
</script>

<div class="flex w-full max-w-md flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="outline">
    <Item.Media variant="icon">
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title>Downloading...</Item.Title>
      <Item.Description>129 MB / 1000 MB</Item.Description>
    </Item.Content>
    <Item.Actions class="hidden sm:flex">
      <Button variant="outline" size="sm">Cancel</Button>
    </Item.Actions>
    <Item.Footer>
      <Progress value={75} />
    </Item.Footer>
  </Item.Root>
</div>
```

## Sections

## Installation

## Usage

## Customization

## Examples

### Size

### Color

### Button

### Badge

### Input Group

### Empty

### Item
