# Button Group

**Source**: https://www.shadcn-svelte.com/docs/components/button-group

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Accessibility](#accessibility)
- [ButtonGroup vs ToggleGroup](#buttongroup-vs-togglegroup)
- [Examples](#examples)
  - [Orientation](#orientation)
  - [Size](#size)
  - [Nested](#nested)
  - [Separator](#separator)
  - [Split](#split)
  - [Input](#input)
  - [Input Group](#input-group)
  - [Dropdown Menu](#dropdown-menu)
  - [Select](#select)
  - [Popover](#popover)

## Content

A container that groups related buttons together with consistent styling.

Copy and paste the following code into your project.

Set the orientation prop to change the button group layout.

Control the size of buttons using the size prop on individual buttons.

Nest ButtonGroup components to create button groups with spacing.

The ButtonGroupSeparator component visually divides buttons within a group.

Buttons with variant outline do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

Create a split button group by adding two buttons separated by a ButtonGroupSeparator.

Wrap an Input component with buttons.

Wrap an InputGroup component to create complex input layouts.

Create a split button group with a DropdownMenu component.

Pair with a Select component.

Use with a Popover component.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import Archive from "@lucide/svelte/icons/archive";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import CalendarPlus from "@lucide/svelte/icons/calendar-plus";
  import Clock from "@lucide/svelte/icons/clock";
  import ListFilter from "@lucide/svelte/icons/list-filter";
  import MailCheck from "@lucide/svelte/icons/mail-check";
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
  import Tag from "@lucide/svelte/icons/tag";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let label = $state("personal");
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root class="hidden sm:flex">
    <Button variant="outline" size="icon-sm" aria-label="Go Back">
      <ArrowLeft />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Archive</Button>
    <Button size="sm" variant="outline">Report</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Snooze</Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="icon-sm"
            aria-label="More Options"
          >
            <MoreHorizontal />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" class="w-52">
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <MailCheck />
            Mark as Read
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Archive />
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Clock />
            Snooze
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CalendarPlus />
            Add to Calendar
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListFilter />
            Add to List
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Tag />
              Label As...
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.RadioGroup bind:value={label}>
                <DropdownMenu.RadioItem value="personal">
                  Personal
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="work"
                  >Work</DropdownMenu.RadioItem
                >
                <DropdownMenu.RadioItem value="other"
                  >Other</DropdownMenu.RadioItem
                >
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item class="text-destructive focus:text-destructive">
            <Trash2 />
            Trash
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 2

```jsx
<script lang="ts">
  import Archive from "@lucide/svelte/icons/archive";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import CalendarPlus from "@lucide/svelte/icons/calendar-plus";
  import Clock from "@lucide/svelte/icons/clock";
  import ListFilter from "@lucide/svelte/icons/list-filter";
  import MailCheck from "@lucide/svelte/icons/mail-check";
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
  import Tag from "@lucide/svelte/icons/tag";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let label = $state("personal");
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root class="hidden sm:flex">
    <Button variant="outline" size="icon-sm" aria-label="Go Back">
      <ArrowLeft />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Archive</Button>
    <Button size="sm" variant="outline">Report</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Snooze</Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="icon-sm"
            aria-label="More Options"
          >
            <MoreHorizontal />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" class="w-52">
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <MailCheck />
            Mark as Read
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Archive />
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Clock />
            Snooze
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CalendarPlus />
            Add to Calendar
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListFilter />
            Add to List
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Tag />
              Label As...
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.RadioGroup bind:value={label}>
                <DropdownMenu.RadioItem value="personal">
                  Personal
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="work"
                  >Work</DropdownMenu.RadioItem
                >
                <DropdownMenu.RadioItem value="other"
                  >Other</DropdownMenu.RadioItem
                >
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item class="text-destructive focus:text-destructive">
            <Trash2 />
            Trash
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add button-group
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add button-group
```

### Example 5

```python
npx shadcn-svelte@latest add button-group
```

### Example 6

```python
npx shadcn-svelte@latest add button-group
```

### Example 7

```python
npx shadcn-svelte@latest add button-group
```

### Example 8

```python
npx shadcn-svelte@latest add button-group
```

### Example 9

```python
bun x shadcn-svelte@latest add button-group
```

### Example 10

```python
bun x shadcn-svelte@latest add button-group
```

### Example 11

```jsx
<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";

  let {
    ref = $bindable(null),
    class: className,
    orientation = "vertical",
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="button-group-separator"
  {orientation}
  class={cn("bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto", className)}
  {...restProps}
/>
```

### Example 12

```jsx
<script lang="ts">
  import { cn } from "$lib/utils.js";
  import type { ComponentProps } from "svelte";
  import { Separator } from "$lib/components/ui/separator/index.js";

  let {
    ref = $bindable(null),
    class: className,
    orientation = "vertical",
    ...restProps
  }: ComponentProps<typeof Separator> = $props();
</script>

<Separator
  bind:ref
  data-slot="button-group-separator"
  {orientation}
  class={cn("bg-input relative !m-0 self-stretch data-[orientation=vertical]:h-auto", className)}
  {...restProps}
/>
```

### Example 13

```jsx
<script lang="ts">import * as ButtonGroup from "$lib/components/ui/button-group/index.js";</script>
```

### Example 14

```jsx
<script lang="ts">import * as ButtonGroup from "$lib/components/ui/button-group/index.js";</script>
```

### Example 15

```typescript
<ButtonGroup.Root>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup.Root>
```

### Example 16

```typescript
<ButtonGroup.Root>
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup.Root>
```

### Example 17

```jsx
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

### Example 18

```jsx
<ButtonGroup aria-label="Button group">
  <Button>Button 1</Button>
  <Button>Button 2</Button>
</ButtonGroup>
```

### Example 19

```jsx
<script lang="ts">
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root
  orientation="vertical"
  aria-label="Media controls"
  class="h-fit"
>
  <Button variant="outline" size="icon">
    <Plus />
  </Button>
  <Button variant="outline" size="icon">
    <Minus />
  </Button>
</ButtonGroup.Root>
```

### Example 20

```jsx
<script lang="ts">
  import Minus from "@lucide/svelte/icons/minus";
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root
  orientation="vertical"
  aria-label="Media controls"
  class="h-fit"
>
  <Button variant="outline" size="icon">
    <Plus />
  </Button>
  <Button variant="outline" size="icon">
    <Minus />
  </Button>
</ButtonGroup.Root>
```

### Example 21

```jsx
<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<div class="flex flex-col items-start gap-8">
  <ButtonGroup.Root>
    <Button variant="outline" size="sm">Small</Button>
    <Button variant="outline" size="sm">Button</Button>
    <Button variant="outline" size="sm">Group</Button>
    <Button variant="outline" size="icon-sm">
      <Plus />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline">Default</Button>
    <Button variant="outline">Button</Button>
    <Button variant="outline">Group</Button>
    <Button variant="outline" size="icon">
      <Plus />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline" size="lg">Large</Button>
    <Button variant="outline" size="lg">Button</Button>
    <Button variant="outline" size="lg">Group</Button>
    <Button variant="outline" size="icon-lg">
      <Plus />
    </Button>
  </ButtonGroup.Root>
</div>
```

### Example 22

```jsx
<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<div class="flex flex-col items-start gap-8">
  <ButtonGroup.Root>
    <Button variant="outline" size="sm">Small</Button>
    <Button variant="outline" size="sm">Button</Button>
    <Button variant="outline" size="sm">Group</Button>
    <Button variant="outline" size="icon-sm">
      <Plus />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline">Default</Button>
    <Button variant="outline">Button</Button>
    <Button variant="outline">Group</Button>
    <Button variant="outline" size="icon">
      <Plus />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline" size="lg">Large</Button>
    <Button variant="outline" size="lg">Button</Button>
    <Button variant="outline" size="lg">Group</Button>
    <Button variant="outline" size="icon-lg">
      <Plus />
    </Button>
  </ButtonGroup.Root>
</div>
```

### Example 23

```jsx
<script lang="ts">
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline" size="sm">1</Button>
    <Button variant="outline" size="sm">2</Button>
    <Button variant="outline" size="sm">3</Button>
    <Button variant="outline" size="sm">4</Button>
    <Button variant="outline" size="sm">5</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline" size="icon-sm" aria-label="Previous">
      <ArrowLeft />
    </Button>
    <Button variant="outline" size="icon-sm" aria-label="Next">
      <ArrowRight />
    </Button>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 24

```jsx
<script lang="ts">
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline" size="sm">1</Button>
    <Button variant="outline" size="sm">2</Button>
    <Button variant="outline" size="sm">3</Button>
    <Button variant="outline" size="sm">4</Button>
    <Button variant="outline" size="sm">5</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button variant="outline" size="icon-sm" aria-label="Previous">
      <ArrowLeft />
    </Button>
    <Button variant="outline" size="icon-sm" aria-label="Next">
      <ArrowRight />
    </Button>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 25

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="secondary" size="sm">Copy</Button>
  <ButtonGroup.Separator />
  <Button variant="secondary" size="sm">Paste</Button>
</ButtonGroup.Root>
```

### Example 26

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="secondary" size="sm">Copy</Button>
  <ButtonGroup.Separator />
  <Button variant="secondary" size="sm">Paste</Button>
</ButtonGroup.Root>
```

### Example 27

```jsx
<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="secondary">Button</Button>
  <ButtonGroup.Separator />
  <Button variant="secondary" size="icon">
    <Plus />
  </Button>
</ButtonGroup.Root>
```

### Example 28

```jsx
<script lang="ts">
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="secondary">Button</Button>
  <ButtonGroup.Separator />
  <Button variant="secondary" size="icon">
    <Plus />
  </Button>
</ButtonGroup.Root>
```

### Example 29

```jsx
<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<ButtonGroup.Root>
  <Input placeholder="Search..." />
  <Button variant="outline" size="icon" aria-label="Search">
    <Search />
  </Button>
</ButtonGroup.Root>
```

### Example 30

```jsx
<script lang="ts">
  import Search from "@lucide/svelte/icons/search";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<ButtonGroup.Root>
  <Input placeholder="Search..." />
  <Button variant="outline" size="icon" aria-label="Search">
    <Search />
  </Button>
</ButtonGroup.Root>
```

### Example 31

```jsx
<script lang="ts">
  import AudioLines from "@lucide/svelte/icons/audio-lines";
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  let voiceEnabled = $state(false);
</script>

<ButtonGroup.Root class="[--radius:9999rem]">
  <ButtonGroup.Root>
    <Button variant="outline" size="icon">
      <Plus />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <InputGroup.Root>
      <InputGroup.Input
        placeholder={voiceEnabled
          ? "Record and send audio..."
          : "Send a message..."}
        disabled={voiceEnabled}
      />
      <InputGroup.Addon align="inline-end">
        <Tooltip.Root>
          <Tooltip.Trigger>
            {#snippet child({ props })}
              <InputGroup.Button
                {...props}
                onclick={() => (voiceEnabled = !voiceEnabled)}
                size="icon-xs"
                data-active={voiceEnabled}
                class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                aria-pressed={voiceEnabled}
              >
                <AudioLines />
              </InputGroup.Button>
            {/snippet}
          </Tooltip.Trigger>
          <Tooltip.Content>Voice Mode</Tooltip.Content>
        </Tooltip.Root>
      </InputGroup.Addon>
    </InputGroup.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 32

```jsx
<script lang="ts">
  import AudioLines from "@lucide/svelte/icons/audio-lines";
  import Plus from "@lucide/svelte/icons/plus";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  let voiceEnabled = $state(false);
</script>

<ButtonGroup.Root class="[--radius:9999rem]">
  <ButtonGroup.Root>
    <Button variant="outline" size="icon">
      <Plus />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <InputGroup.Root>
      <InputGroup.Input
        placeholder={voiceEnabled
          ? "Record and send audio..."
          : "Send a message..."}
        disabled={voiceEnabled}
      />
      <InputGroup.Addon align="inline-end">
        <Tooltip.Root>
          <Tooltip.Trigger>
            {#snippet child({ props })}
              <InputGroup.Button
                {...props}
                onclick={() => (voiceEnabled = !voiceEnabled)}
                size="icon-xs"
                data-active={voiceEnabled}
                class="data-[active=true]:bg-orange-100 data-[active=true]:text-orange-700 dark:data-[active=true]:bg-orange-800 dark:data-[active=true]:text-orange-100"
                aria-pressed={voiceEnabled}
              >
                <AudioLines />
              </InputGroup.Button>
            {/snippet}
          </Tooltip.Trigger>
          <Tooltip.Content>Voice Mode</Tooltip.Content>
        </Tooltip.Root>
      </InputGroup.Addon>
    </InputGroup.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 33

```jsx
<script lang="ts">
  import AlertTriangle from "@lucide/svelte/icons/alert-triangle";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import CopyIcon from "@tabler/icons-svelte/icons/copy";
  import CheckIcon from "@tabler/icons-svelte/icons/check";
  import Share from "@lucide/svelte/icons/share";
  import Trash from "@lucide/svelte/icons/trash";
  import UserRoundX from "@lucide/svelte/icons/user-round-x";
  import VolumeOff from "@lucide/svelte/icons/volume-off";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="outline">Follow</Button>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="outline" class="!ps-2">
          <ChevronDown />
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" class="[--radius:1rem]">
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <VolumeOff />
          Mute Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CheckIcon />
          Mark as Read
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <AlertTriangle />
          Report Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <UserRoundX />
          Block User
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Share />
          Share Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CopyIcon />
          Copy Conversation
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item variant="destructive">
          <Trash />
          Delete Conversation
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</ButtonGroup.Root>
```

### Example 34

```jsx
<script lang="ts">
  import AlertTriangle from "@lucide/svelte/icons/alert-triangle";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import CopyIcon from "@tabler/icons-svelte/icons/copy";
  import CheckIcon from "@tabler/icons-svelte/icons/check";
  import Share from "@lucide/svelte/icons/share";
  import Trash from "@lucide/svelte/icons/trash";
  import UserRoundX from "@lucide/svelte/icons/user-round-x";
  import VolumeOff from "@lucide/svelte/icons/volume-off";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="outline">Follow</Button>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Button {...props} variant="outline" class="!ps-2">
          <ChevronDown />
        </Button>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="end" class="[--radius:1rem]">
      <DropdownMenu.Group>
        <DropdownMenu.Item>
          <VolumeOff />
          Mute Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CheckIcon />
          Mark as Read
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <AlertTriangle />
          Report Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <UserRoundX />
          Block User
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <Share />
          Share Conversation
        </DropdownMenu.Item>
        <DropdownMenu.Item>
          <CopyIcon />
          Copy Conversation
        </DropdownMenu.Item>
      </DropdownMenu.Group>
      <DropdownMenu.Separator />
      <DropdownMenu.Group>
        <DropdownMenu.Item variant="destructive">
          <Trash />
          Delete Conversation
        </DropdownMenu.Item>
      </DropdownMenu.Group>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</ButtonGroup.Root>
```

### Example 35

```jsx
<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  const CURRENCIES = [
    {
      value: "$",
      label: "US Dollar"
    },
    {
      value: "€",
      label: "Euro"
    },
    {
      value: "£",
      label: "British Pound"
    }
  ];

  let currency = $state("$");
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root>
    <Select.Root type="single" bind:value={currency}>
      <Select.Trigger class="font-mono">
        {currency}
      </Select.Trigger>
      <Select.Content class="min-w-24">
        {#each CURRENCIES as currencyOption (currencyOption.value)}
          <Select.Item value={currencyOption.value}>
            {currencyOption.value}
            <span class="text-muted-foreground">{currencyOption.label}</span>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <Input placeholder="10.00" pattern="[0-9]*" />
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button aria-label="Send" size="icon" variant="outline">
      <ArrowRight />
    </Button>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 36

```jsx
<script lang="ts">
  import ArrowRight from "@lucide/svelte/icons/arrow-right";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  const CURRENCIES = [
    {
      value: "$",
      label: "US Dollar"
    },
    {
      value: "€",
      label: "Euro"
    },
    {
      value: "£",
      label: "British Pound"
    }
  ];

  let currency = $state("$");
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root>
    <Select.Root type="single" bind:value={currency}>
      <Select.Trigger class="font-mono">
        {currency}
      </Select.Trigger>
      <Select.Content class="min-w-24">
        {#each CURRENCIES as currencyOption (currencyOption.value)}
          <Select.Item value={currencyOption.value}>
            {currencyOption.value}
            <span class="text-muted-foreground">{currencyOption.label}</span>
          </Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
    <Input placeholder="10.00" pattern="[0-9]*" />
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button aria-label="Send" size="icon" variant="outline">
      <ArrowRight />
    </Button>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

### Example 37

```jsx
<script lang="ts">
  import Bot from "@lucide/svelte/icons/bot";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="outline" size="sm">
    <Bot />
    Copilot
  </Button>
  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          size="icon-sm"
          aria-label="Open Popover"
        >
          <ChevronDown />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content align="end" class="rounded-xl p-0 text-sm">
      <div class="px-4 py-3">
        <div class="text-sm font-medium">Agent Tasks</div>
      </div>
      <Separator />
      <div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
        <Textarea
          placeholder="Describe your task in natural language."
          class="mb-4 resize-none"
        />
        <p class="font-medium">Start a new task with Copilot</p>
        <p class="text-muted-foreground">
          Describe your task in natural language. Copilot will work in the
          background and open a pull request for your review.
        </p>
      </div>
    </Popover.Content>
  </Popover.Root>
</ButtonGroup.Root>
```

### Example 38

```jsx
<script lang="ts">
  import Bot from "@lucide/svelte/icons/bot";
  import ChevronDown from "@lucide/svelte/icons/chevron-down";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<ButtonGroup.Root>
  <Button variant="outline" size="sm">
    <Bot />
    Copilot
  </Button>
  <Popover.Root>
    <Popover.Trigger>
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          size="icon-sm"
          aria-label="Open Popover"
        >
          <ChevronDown />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content align="end" class="rounded-xl p-0 text-sm">
      <div class="px-4 py-3">
        <div class="text-sm font-medium">Agent Tasks</div>
      </div>
      <Separator />
      <div class="p-4 text-sm *:[p:not(:last-child)]:mb-2">
        <Textarea
          placeholder="Describe your task in natural language."
          class="mb-4 resize-none"
        />
        <p class="font-medium">Start a new task with Copilot</p>
        <p class="text-muted-foreground">
          Describe your task in natural language. Copilot will work in the
          background and open a pull request for your review.
        </p>
      </div>
    </Popover.Content>
  </Popover.Root>
</ButtonGroup.Root>
```

## Sections

## Installation

## Usage

## Accessibility

## ButtonGroup vs ToggleGroup

## Examples

### Orientation

### Size

### Nested

### Separator

### Split

### Input

### Input Group

### Dropdown Menu

### Select

### Popover
