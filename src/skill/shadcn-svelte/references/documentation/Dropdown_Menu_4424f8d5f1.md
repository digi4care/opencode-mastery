# Dropdown Menu

**Source**: https://www.shadcn-svelte.com/docs/components/dropdown-menu

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Checkboxes](#checkboxes)
  - [Radio Group](#radio-group)
  - [Dialog](#dialog)
- [Changelog](#changelog)
  - [2024-10-30 Classes for DropdownMenu.SubTrigger](#2024-10-30-classes-for-dropdownmenu.subtrigger)

## Content

Displays a menu to the user — such as a set of actions or functions — triggered by a button.

Copy and paste the following code into your project.

This example shows how to open a dialog from a dropdown menu.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        Profile
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Billing
        <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Settings
        <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Keyboard shortcuts
        <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Email</DropdownMenu.Item>
          <DropdownMenu.Item>Message</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>
        New Team
        <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Support</DropdownMenu.Item>
    <DropdownMenu.Item disabled>API</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      Log out
      <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 2

```jsx
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        Profile
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Billing
        <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Settings
        <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Keyboard shortcuts
        <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Email</DropdownMenu.Item>
          <DropdownMenu.Item>Message</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>
        New Team
        <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Support</DropdownMenu.Item>
    <DropdownMenu.Item disabled>API</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      Log out
      <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add dropdown-menu
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add dropdown-menu
```

### Example 5

```python
npx shadcn-svelte@latest add dropdown-menu
```

### Example 6

```python
npx shadcn-svelte@latest add dropdown-menu
```

### Example 7

```python
npx shadcn-svelte@latest add dropdown-menu
```

### Example 8

```python
npx shadcn-svelte@latest add dropdown-menu
```

### Example 9

```python
bun x shadcn-svelte@latest add dropdown-menu
```

### Example 10

```python
bun x shadcn-svelte@latest add dropdown-menu
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
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    value = $bindable([]),
    ...restProps
  }: DropdownMenuPrimitive.CheckboxGroupProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxGroup
  bind:ref
  bind:value
  data-slot="dropdown-menu-checkbox-group"
  {...restProps}
/>
```

### Example 20

```jsx
<script lang="ts">
  import { DropdownMenu as DropdownMenuPrimitive } from "bits-ui";

  let {
    ref = $bindable(null),
    value = $bindable([]),
    ...restProps
  }: DropdownMenuPrimitive.CheckboxGroupProps = $props();
</script>

<DropdownMenuPrimitive.CheckboxGroup
  bind:ref
  bind:value
  data-slot="dropdown-menu-checkbox-group"
  {...restProps}
/>
```

### Example 21

```jsx
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>
```

### Example 22

```jsx
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>
```

### Example 23

```unknown
<DropdownMenu.Root>
  <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 24

```unknown
<DropdownMenu.Root>
  <DropdownMenu.Trigger>Open</DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group>
      <DropdownMenu.Label>My Account</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.Item>Profile</DropdownMenu.Item>
      <DropdownMenu.Item>Billing</DropdownMenu.Item>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Item>Subscription</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 25

```typescript
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let showStatusBar = $state(true);
  let showActivityBar = $state(false);
  let showPanel = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Group>
      <DropdownMenu.Label>Appearance</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
        Status Bar
      </DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
        Activity Bar
      </DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem bind:checked={showPanel}
        >Panel</DropdownMenu.CheckboxItem
      >
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 26

```typescript
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let showStatusBar = $state(true);
  let showActivityBar = $state(false);
  let showPanel = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Group>
      <DropdownMenu.Label>Appearance</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.CheckboxItem bind:checked={showStatusBar}>
        Status Bar
      </DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem bind:checked={showActivityBar} disabled>
        Activity Bar
      </DropdownMenu.CheckboxItem>
      <DropdownMenu.CheckboxItem bind:checked={showPanel}
        >Panel</DropdownMenu.CheckboxItem
      >
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 27

```typescript
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let position = $state("bottom");
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Group>
      <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.RadioGroup bind:value={position}>
        <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 28

```typescript
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";

  let position = $state("bottom");
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56">
    <DropdownMenu.Group>
      <DropdownMenu.Label>Panel Position</DropdownMenu.Label>
      <DropdownMenu.Separator />
      <DropdownMenu.RadioGroup bind:value={position}>
        <DropdownMenu.RadioItem value="top">Top</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="bottom">Bottom</DropdownMenu.RadioItem>
        <DropdownMenu.RadioItem value="right">Right</DropdownMenu.RadioItem>
      </DropdownMenu.RadioGroup>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

### Example 29

```css
<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
    Actions
  </DropdownMenu.Trigger>
</DropdownMenu.Root>
```

### Example 30

```css
<DropdownMenu.Root>
  <DropdownMenu.Trigger class={buttonVariants({ variant: "outline" })}>
    Actions
  </DropdownMenu.Trigger>
</DropdownMenu.Root>
```

### Example 31

```jsx
<script lang="ts">
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";

  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Field from "$lib/components/ui/field/index.js";

  let showNewDialog = $state(false);
  let showShareDialog = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={buttonVariants({ variant: "outline", size: "icon-sm" })}
  >
    <MoreHorizontal />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-40" align="end">
    <DropdownMenu.Label>File Actions</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item onSelect={() => (showNewDialog = true)}>
        New File...
      </DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => (showShareDialog = true)}>
        Share...
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled>Download</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={showNewDialog}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create New File</Dialog.Title>
      <Dialog.Description>
        Provide a name for your new file. Click create when you&apos;re done.
      </Dialog.Description>
    </Dialog.Header>
    <Field.Group class="pb-3">
      <Field.Field>
        <Field.Label for="filename">File Name</Field.Label>
        <Input id="filename" name="filename" placeholder="document.txt" />
      </Field.Field>
    </Field.Group>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: "outline" })}
        >Cancel</Dialog.Close
      >
      <Button type="submit">Create</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={showShareDialog}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Share File</Dialog.Title>
      <Dialog.Description>
        Anyone with the link will be able to view this file.
      </Dialog.Description>
    </Dialog.Header>
    <Field.Group class="py-3">
      <Field.Field>
        <Label for="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="shadcn@vercel.com"
        />
      </Field.Field>
      <Field.Field>
        <Field.Label for="message">Message (Optional)</Field.Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Check out this file"
        />
      </Field.Field>
    </Field.Group>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: "outline" })}
        >Cancel</Dialog.Close
      >
      <Button type="submit">Send Invite</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

### Example 32

```jsx
<script lang="ts">
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";

  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
  import * as Field from "$lib/components/ui/field/index.js";

  let showNewDialog = $state(false);
  let showShareDialog = $state(false);
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger
    class={buttonVariants({ variant: "outline", size: "icon-sm" })}
  >
    <MoreHorizontal />
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-40" align="end">
    <DropdownMenu.Label>File Actions</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item onSelect={() => (showNewDialog = true)}>
        New File...
      </DropdownMenu.Item>
      <DropdownMenu.Item onSelect={() => (showShareDialog = true)}>
        Share...
      </DropdownMenu.Item>
      <DropdownMenu.Item disabled>Download</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<Dialog.Root bind:open={showNewDialog}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Create New File</Dialog.Title>
      <Dialog.Description>
        Provide a name for your new file. Click create when you&apos;re done.
      </Dialog.Description>
    </Dialog.Header>
    <Field.Group class="pb-3">
      <Field.Field>
        <Field.Label for="filename">File Name</Field.Label>
        <Input id="filename" name="filename" placeholder="document.txt" />
      </Field.Field>
    </Field.Group>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: "outline" })}
        >Cancel</Dialog.Close
      >
      <Button type="submit">Create</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>

<Dialog.Root bind:open={showShareDialog}>
  <Dialog.Content class="sm:max-w-[425px]">
    <Dialog.Header>
      <Dialog.Title>Share File</Dialog.Title>
      <Dialog.Description>
        Anyone with the link will be able to view this file.
      </Dialog.Description>
    </Dialog.Header>
    <Field.Group class="py-3">
      <Field.Field>
        <Label for="email">Email Address</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="shadcn@vercel.com"
        />
      </Field.Field>
      <Field.Field>
        <Field.Label for="message">Message (Optional)</Field.Label>
        <Textarea
          id="message"
          name="message"
          placeholder="Check out this file"
        />
      </Field.Field>
    </Field.Group>
    <Dialog.Footer>
      <Dialog.Close class={buttonVariants({ variant: "outline" })}
        >Cancel</Dialog.Close
      >
      <Button type="submit">Send Invite</Button>
    </Dialog.Footer>
  </Dialog.Content>
</Dialog.Root>
```

## Sections

## Installation

## Usage

## Examples

### Checkboxes

### Radio Group

### Dialog

## Changelog

### 2024-10-30 Classes for DropdownMenu.SubTrigger
