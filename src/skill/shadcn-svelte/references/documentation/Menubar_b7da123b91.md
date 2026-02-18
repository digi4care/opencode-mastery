# Menubar

**Source**: https://www.shadcn-svelte.com/docs/components/menubar

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```typescript
<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar/index.js";

  let bookmarks = $state(false);
  let fullUrls = $state(true);
  let profileRadioValue = $state("benoit");
</script>

<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Incognito Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Share</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Email link</Menubar.Item>
          <Menubar.Item>Messages</Menubar.Item>
          <Menubar.Item>Notes</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>
        Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Find</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Search the web</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Find...</Menubar.Item>
          <Menubar.Item>Find Next</Menubar.Item>
          <Menubar.Item>Find Previous</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>Cut</Menubar.Item>
      <Menubar.Item>Copy</Menubar.Item>
      <Menubar.Item>Paste</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.CheckboxItem bind:checked={bookmarks}
        >Always Show Bookmarks Bar</Menubar.CheckboxItem
      >
      <Menubar.CheckboxItem bind:checked={fullUrls}>
        Always Show Full URLs
      </Menubar.CheckboxItem>
      <Menubar.Separator />
      <Menubar.Item inset>
        Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item inset>
        Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Hide Sidebar</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Profiles</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup bind:value={profileRadioValue}>
        <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
        <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
        <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
      </Menubar.RadioGroup>
      <Menubar.Separator />
      <Menubar.Item inset>Edit...</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Add Profile...</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

### Example 2

```typescript
<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar/index.js";

  let bookmarks = $state(false);
  let fullUrls = $state(true);
  let profileRadioValue = $state("benoit");
</script>

<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Incognito Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Share</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Email link</Menubar.Item>
          <Menubar.Item>Messages</Menubar.Item>
          <Menubar.Item>Notes</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>
        Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Find</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Search the web</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Find...</Menubar.Item>
          <Menubar.Item>Find Next</Menubar.Item>
          <Menubar.Item>Find Previous</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>Cut</Menubar.Item>
      <Menubar.Item>Copy</Menubar.Item>
      <Menubar.Item>Paste</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.CheckboxItem bind:checked={bookmarks}
        >Always Show Bookmarks Bar</Menubar.CheckboxItem
      >
      <Menubar.CheckboxItem bind:checked={fullUrls}>
        Always Show Full URLs
      </Menubar.CheckboxItem>
      <Menubar.Separator />
      <Menubar.Item inset>
        Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item inset>
        Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Hide Sidebar</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Profiles</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup bind:value={profileRadioValue}>
        <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
        <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
        <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
      </Menubar.RadioGroup>
      <Menubar.Separator />
      <Menubar.Item inset>Edit...</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Add Profile...</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add menubar
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add menubar
```

### Example 5

```python
npx shadcn-svelte@latest add menubar
```

### Example 6

```python
npx shadcn-svelte@latest add menubar
```

### Example 7

```python
npx shadcn-svelte@latest add menubar
```

### Example 8

```python
npx shadcn-svelte@latest add menubar
```

### Example 9

```python
bun x shadcn-svelte@latest add menubar
```

### Example 10

```python
bun x shadcn-svelte@latest add menubar
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
import Root from "./menubar.svelte";
import Menu from "./menubar-menu.svelte";
import Sub from "./menubar-sub.svelte";
import RadioGroup from "./menubar-radio-group.svelte";
import CheckboxItem from "./menubar-checkbox-item.svelte";
import Content from "./menubar-content.svelte";
import Item from "./menubar-item.svelte";
import Group from "./menubar-group.svelte";
import RadioItem from "./menubar-radio-item.svelte";
import Separator from "./menubar-separator.svelte";
import Shortcut from "./menubar-shortcut.svelte";
import SubContent from "./menubar-sub-content.svelte";
import SubTrigger from "./menubar-sub-trigger.svelte";
import Trigger from "./menubar-trigger.svelte";
import Label from "./menubar-label.svelte";
import GroupHeading from "./menubar-group-heading.svelte";
import Portal from "./menubar-portal.svelte";

export {
  Root,
  CheckboxItem,
  Content,
  Item,
  RadioItem,
  Separator,
  Shortcut,
  SubContent,
  SubTrigger,
  Trigger,
  Menu,
  Group,
  Sub,
  RadioGroup,
  Label,
  GroupHeading,
  Portal,
  //
  Root as Menubar,
  CheckboxItem as MenubarCheckboxItem,
  Content as MenubarContent,
  Item as MenubarItem,
  RadioItem as MenubarRadioItem,
  Separator as MenubarSeparator,
  Shortcut as MenubarShortcut,
  SubContent as MenubarSubContent,
  SubTrigger as MenubarSubTrigger,
  Trigger as MenubarTrigger,
  Menu as MenubarMenu,
  Group as MenubarGroup,
  Sub as MenubarSub,
  RadioGroup as MenubarRadioGroup,
  Label as MenubarLabel,
  GroupHeading as MenubarGroupHeading,
  Portal as MenubarPortal,
};
```

### Example 20

```sql
import Root from "./menubar.svelte";
import Menu from "./menubar-menu.svelte";
import Sub from "./menubar-sub.svelte";
import RadioGroup from "./menubar-radio-group.svelte";
import CheckboxItem from "./menubar-checkbox-item.svelte";
import Content from "./menubar-content.svelte";
import Item from "./menubar-item.svelte";
import Group from "./menubar-group.svelte";
import RadioItem from "./menubar-radio-item.svelte";
import Separator from "./menubar-separator.svelte";
import Shortcut from "./menubar-shortcut.svelte";
import SubContent from "./menubar-sub-content.svelte";
import SubTrigger from "./menubar-sub-trigger.svelte";
import Trigger from "./menubar-trigger.svelte";
import Label from "./menubar-label.svelte";
import GroupHeading from "./menubar-group-heading.svelte";
import Portal from "./menubar-portal.svelte";

export {
  Root,
  CheckboxItem,
  Content,
  Item,
  RadioItem,
  Separator,
  Shortcut,
  SubContent,
  SubTrigger,
  Trigger,
  Menu,
  Group,
  Sub,
  RadioGroup,
  Label,
  GroupHeading,
  Portal,
  //
  Root as Menubar,
  CheckboxItem as MenubarCheckboxItem,
  Content as MenubarContent,
  Item as MenubarItem,
  RadioItem as MenubarRadioItem,
  Separator as MenubarSeparator,
  Shortcut as MenubarShortcut,
  SubContent as MenubarSubContent,
  SubTrigger as MenubarSubTrigger,
  Trigger as MenubarTrigger,
  Menu as MenubarMenu,
  Group as MenubarGroup,
  Sub as MenubarSub,
  RadioGroup as MenubarRadioGroup,
  Label as MenubarLabel,
  GroupHeading as MenubarGroupHeading,
  Portal as MenubarPortal,
};
```

### Example 21

```jsx
<script lang="ts">import * as Menubar from "$lib/components/ui/menubar/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Menubar from "$lib/components/ui/menubar/index.js";</script>
```

### Example 23

```unknown
<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab
        <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Share</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Print</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

### Example 24

```unknown
<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab
        <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Share</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item>Print</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

## Sections

## Installation

## Usage
