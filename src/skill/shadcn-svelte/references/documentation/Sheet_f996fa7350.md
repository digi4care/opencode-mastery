# Sheet

**Source**: https://www.shadcn-svelte.com/docs/components/sheet

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Side](#side)
  - [Size](#size)

## Content

Extends the Dialog component to display content that complements the main content of the screen.

Copy and paste the following code into your project.

Pass the side property to <Sheet.Content /> to indicate the edge of the screen where the component will appear. The values can be top, right, bottom or left.

You can adjust the size of the sheet using CSS classes:

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Sheet.Root>
  <Sheet.Trigger class={buttonVariants({ variant: "outline" })}
    >Open</Sheet.Trigger
  >
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit profile</Sheet.Title>
      <Sheet.Description>
        Make changes to your profile here. Click save when you're done.
      </Sheet.Description>
    </Sheet.Header>
    <div class="grid flex-1 auto-rows-min gap-6 px-4">
      <div class="grid gap-3">
        <Label for="name" class="text-end">Name</Label>
        <Input id="name" value="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="username" class="text-end">Username</Label>
        <Input id="username" value="@peduarte" />
      </div>
    </div>
    <Sheet.Footer>
      <Button type="submit">Save changes</Button>
      <Sheet.Close class={buttonVariants({ variant: "outline" })}
        >Close</Sheet.Close
      >
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
```

### Example 2

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Sheet.Root>
  <Sheet.Trigger class={buttonVariants({ variant: "outline" })}
    >Open</Sheet.Trigger
  >
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit profile</Sheet.Title>
      <Sheet.Description>
        Make changes to your profile here. Click save when you're done.
      </Sheet.Description>
    </Sheet.Header>
    <div class="grid flex-1 auto-rows-min gap-6 px-4">
      <div class="grid gap-3">
        <Label for="name" class="text-end">Name</Label>
        <Input id="name" value="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="username" class="text-end">Username</Label>
        <Input id="username" value="@peduarte" />
      </div>
    </div>
    <Sheet.Footer>
      <Button type="submit">Save changes</Button>
      <Sheet.Close class={buttonVariants({ variant: "outline" })}
        >Close</Sheet.Close
      >
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add sheet
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add sheet
```

### Example 5

```python
npx shadcn-svelte@latest add sheet
```

### Example 6

```python
npx shadcn-svelte@latest add sheet
```

### Example 7

```python
npx shadcn-svelte@latest add sheet
```

### Example 8

```python
npx shadcn-svelte@latest add sheet
```

### Example 9

```python
bun x shadcn-svelte@latest add sheet
```

### Example 10

```python
bun x shadcn-svelte@latest add sheet
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
import Root from "./sheet.svelte";
import Portal from "./sheet-portal.svelte";
import Trigger from "./sheet-trigger.svelte";
import Close from "./sheet-close.svelte";
import Overlay from "./sheet-overlay.svelte";
import Content from "./sheet-content.svelte";
import Header from "./sheet-header.svelte";
import Footer from "./sheet-footer.svelte";
import Title from "./sheet-title.svelte";
import Description from "./sheet-description.svelte";

export {
  Root,
  Close,
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description,
  //
  Root as Sheet,
  Close as SheetClose,
  Trigger as SheetTrigger,
  Portal as SheetPortal,
  Overlay as SheetOverlay,
  Content as SheetContent,
  Header as SheetHeader,
  Footer as SheetFooter,
  Title as SheetTitle,
  Description as SheetDescription,
};
```

### Example 20

```sql
import Root from "./sheet.svelte";
import Portal from "./sheet-portal.svelte";
import Trigger from "./sheet-trigger.svelte";
import Close from "./sheet-close.svelte";
import Overlay from "./sheet-overlay.svelte";
import Content from "./sheet-content.svelte";
import Header from "./sheet-header.svelte";
import Footer from "./sheet-footer.svelte";
import Title from "./sheet-title.svelte";
import Description from "./sheet-description.svelte";

export {
  Root,
  Close,
  Trigger,
  Portal,
  Overlay,
  Content,
  Header,
  Footer,
  Title,
  Description,
  //
  Root as Sheet,
  Close as SheetClose,
  Trigger as SheetTrigger,
  Portal as SheetPortal,
  Overlay as SheetOverlay,
  Content as SheetContent,
  Header as SheetHeader,
  Footer as SheetFooter,
  Title as SheetTitle,
  Description as SheetDescription,
};
```

### Example 21

```jsx
<script lang="ts">import * as Sheet from "$lib/components/ui/sheet/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Sheet from "$lib/components/ui/sheet/index.js";</script>
```

### Example 23

```sql
<Sheet.Root>
  <Sheet.Trigger>Open</Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
      <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
```

### Example 24

```sql
<Sheet.Root>
  <Sheet.Trigger>Open</Sheet.Trigger>
  <Sheet.Content>
    <Sheet.Header>
      <Sheet.Title>Are you sure absolutely sure?</Sheet.Title>
      <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
```

### Example 25

```sql
<Sheet.Root>
  <Sheet.Trigger>Open</Sheet.Trigger>
  <Sheet.Content class="w-[400px] sm:w-[540px]">
    <Sheet.Header>
      <Sheet.Title>Are you absolutely sure?</Sheet.Title>
      <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
```

### Example 26

```sql
<Sheet.Root>
  <Sheet.Trigger>Open</Sheet.Trigger>
  <Sheet.Content class="w-[400px] sm:w-[540px]">
    <Sheet.Header>
      <Sheet.Title>Are you absolutely sure?</Sheet.Title>
      <Sheet.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </Sheet.Description>
    </Sheet.Header>
  </Sheet.Content>
</Sheet.Root>
```

## Sections

## Installation

## Usage

## Examples

### Side

### Size
