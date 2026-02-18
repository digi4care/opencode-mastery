# Dialog

**Source**: https://www.shadcn-svelte.com/docs/components/dialog

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Custom close button](#custom-close-button)

## Content

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```typescript
<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
      >Open Dialog</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you&apos;re done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4">
        <div class="grid gap-3">
          <Label for="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Dialog.Close
        >
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
```

### Example 2

```typescript
<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
      >Open Dialog</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you&apos;re done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4">
        <div class="grid gap-3">
          <Label for="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Dialog.Close
        >
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add dialog
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add dialog
```

### Example 5

```python
npx shadcn-svelte@latest add dialog
```

### Example 6

```python
npx shadcn-svelte@latest add dialog
```

### Example 7

```python
npx shadcn-svelte@latest add dialog
```

### Example 8

```python
npx shadcn-svelte@latest add dialog
```

### Example 9

```python
bun x shadcn-svelte@latest add dialog
```

### Example 10

```python
bun x shadcn-svelte@latest add dialog
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
  import { Dialog as DialogPrimitive } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: DialogPrimitive.CloseProps = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {...restProps} />
```

### Example 20

```jsx
<script lang="ts">
  import { Dialog as DialogPrimitive } from "bits-ui";

  let { ref = $bindable(null), ...restProps }: DialogPrimitive.CloseProps = $props();
</script>

<DialogPrimitive.Close bind:ref data-slot="dialog-close" {...restProps} />
```

### Example 21

```jsx
<script lang="ts">import * as Dialog from "$lib/components/ui/dialog/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Dialog from "$lib/components/ui/dialog/index.js";</script>
```

### Example 23

```sql
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```

### Example 24

```sql
<Dialog.Root>
  <Dialog.Trigger>Open</Dialog.Trigger>
  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Are you sure absolutely sure?</Dialog.Title>
      <Dialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
```

### Example 25

```jsx
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >Share</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Share link</Dialog.Title>
      <Dialog.Description>
        Anyone who has this link will be able to view this.
      </Dialog.Description>
    </Dialog.Header>
    <div class="flex items-center gap-2">
      <div class="grid flex-1 gap-2">
        <Label for="link" class="sr-only">Link</Label>
        <Input
          id="link"
          defaultValue="https://shadcn-svelte.com/docs/installation"
        />
      </div>
    </div>
    <Dialog.Footer class="sm:justify-start">
      <Dialog.Close class={buttonVariants({ variant: "secondary" })}
        >Close</Dialog.Close
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

### Example 26

```jsx
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Dialog.Root>
  <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
    >Share</Dialog.Trigger
  >
  <Dialog.Content class="sm:max-w-md">
    <Dialog.Header>
      <Dialog.Title>Share link</Dialog.Title>
      <Dialog.Description>
        Anyone who has this link will be able to view this.
      </Dialog.Description>
    </Dialog.Header>
    <div class="flex items-center gap-2">
      <div class="grid flex-1 gap-2">
        <Label for="link" class="sr-only">Link</Label>
        <Input
          id="link"
          defaultValue="https://shadcn-svelte.com/docs/installation"
        />
      </div>
    </div>
    <Dialog.Footer class="sm:justify-start">
      <Dialog.Close class={buttonVariants({ variant: "secondary" })}
        >Close</Dialog.Close
      >
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

## Sections

## Installation

## Usage

## Examples

### Custom close button
