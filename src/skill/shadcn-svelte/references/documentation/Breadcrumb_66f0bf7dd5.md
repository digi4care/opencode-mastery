# Breadcrumb

**Source**: https://www.shadcn-svelte.com/docs/components/breadcrumb

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Custom separator](#custom-separator)
  - [Dropdown](#dropdown)
  - [Collapsed](#collapsed)
  - [Link component](#link-component)
  - [Responsive](#responsive)

## Content

Displays the path to the current resource using a hierarchy of links.

Copy and paste the following code into your project.

Use a custom component in the <slot> of <Breadcrumb.Separator /> to create a custom separator.

You can compose <Breadcrumb.Item /> with a <DropdownMenu /> to create a dropdown in the breadcrumb.

We provide a <Breadcrumb.Ellipsis /> component to show a collapsed state when the breadcrumb is too long.

To use a custom link component from your routing library, you can use the asChild prop on <Breadcrumb.Link />.

Here's an example of a responsive breadcrumb that composes <Breadcrumb.Item /> with <Breadcrumb.Ellipsis />, <DropdownMenu />, and <Drawer />.

It displays a dropdown on desktop and a drawer on mobile.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          <Breadcrumb.Ellipsis class="size-4" />
          <span class="sr-only">Toggle menu</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item>Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>Themes</DropdownMenu.Item>
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 2

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          <Breadcrumb.Ellipsis class="size-4" />
          <span class="sr-only">Toggle menu</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item>Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>Themes</DropdownMenu.Item>
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add breadcrumb
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add breadcrumb
```

### Example 5

```python
npx shadcn-svelte@latest add breadcrumb
```

### Example 6

```python
npx shadcn-svelte@latest add breadcrumb
```

### Example 7

```python
npx shadcn-svelte@latest add breadcrumb
```

### Example 8

```python
npx shadcn-svelte@latest add breadcrumb
```

### Example 9

```python
bun x shadcn-svelte@latest add breadcrumb
```

### Example 10

```python
bun x shadcn-svelte@latest add breadcrumb
```

### Example 11

```html
<script lang="ts">
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
  bind:this={ref}
  data-slot="breadcrumb-ellipsis"
  role="presentation"
  aria-hidden="true"
  class={cn("flex size-9 items-center justify-center", className)}
  {...restProps}
>
  <EllipsisIcon class="size-4" />
  <span class="sr-only">More</span>
</span>
```

### Example 12

```html
<script lang="ts">
  import EllipsisIcon from "@lucide/svelte/icons/ellipsis";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn, type WithElementRef, type WithoutChildren } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    ...restProps
  }: WithoutChildren<WithElementRef<HTMLAttributes<HTMLSpanElement>>> = $props();
</script>

<span
  bind:this={ref}
  data-slot="breadcrumb-ellipsis"
  role="presentation"
  aria-hidden="true"
  class={cn("flex size-9 items-center justify-center", className)}
  {...restProps}
>
  <EllipsisIcon class="size-4" />
  <span class="sr-only">More</span>
</span>
```

### Example 13

```jsx
<script lang="ts">import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";</script>
```

### Example 14

```jsx
<script lang="ts">import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";</script>
```

### Example 15

```unknown
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 16

```unknown
<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 17

```jsx
<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 18

```jsx
<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 19

```jsx
<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 20

```jsx
<script lang="ts">
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 21

```jsx
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          Components
          <ChevronDownIcon class="size-4" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item>Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>Themes</DropdownMenu.Item>
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 22

```jsx
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          Components
          <ChevronDownIcon class="size-4" />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item>Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>Themes</DropdownMenu.Item>
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator>
      <SlashIcon />
    </Breadcrumb.Separator>
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 23

```jsx
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<!-- ... -->

<Breadcrumb.Item>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex items-center gap-1">
      Components
      <ChevronDownIcon class="size-4" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="start">
      <DropdownMenu.Item>Documentation</DropdownMenu.Item>
      <DropdownMenu.Item>Themes</DropdownMenu.Item>
      <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Breadcrumb.Item>
```

### Example 24

```jsx
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import SlashIcon from "@lucide/svelte/icons/slash";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<!-- ... -->

<Breadcrumb.Item>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger class="flex items-center gap-1">
      Components
      <ChevronDownIcon class="size-4" />
    </DropdownMenu.Trigger>
    <DropdownMenu.Content align="start">
      <DropdownMenu.Item>Documentation</DropdownMenu.Item>
      <DropdownMenu.Item>Themes</DropdownMenu.Item>
      <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Breadcrumb.Item>
```

### Example 25

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Ellipsis />
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 26

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Ellipsis />
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 27

```jsx
<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
 <Breadcrumb.List>
     {/* ... */}
  <Breadcrumb.Item>
   <Breadcrumb.Ellipsis />
  </Breadcrumb.Item>
    {/* ... */}
 </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 28

```jsx
<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
 <Breadcrumb.List>
     {/* ... */}
  <Breadcrumb.Item>
   <Breadcrumb.Ellipsis />
  </Breadcrumb.Item>
    {/* ... */}
 </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 29

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 30

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 31

```jsx
<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
 <Breadcrumb.List>
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
    {/* ... */}
 </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 32

```jsx
<script lang="ts">
 import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
</script>

<Breadcrumb.Root>
 <Breadcrumb.List>
  <Breadcrumb.Item>
   <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
  </Breadcrumb.Item>
    {/* ... */}
 </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 33

```sql
<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";

  const items = [
    { href: "#", label: "Home" },
    { href: "#", label: "Documentation" },
    { href: "#", label: "Building Your Application" },
    { href: "#", label: "Data Fetching" },
    { label: "Caching and Revalidating" }
  ];

  const ITEMS_TO_DISPLAY = 3;

  let open = $state(false);

  const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href={items[0].href}>
        {items[0].label}
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    {#if items.length > ITEMS_TO_DISPLAY}
      <Breadcrumb.Item>
        {#if isDesktop.current}
          <DropdownMenu.Root bind:open>
            <DropdownMenu.Trigger
              class="flex items-center gap-1"
              aria-label="Toggle menu"
            >
              <Breadcrumb.Ellipsis class="size-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              {#each items.slice(1, -2) as item, i (i)}
                <DropdownMenu.Item>
                  <a href={item.href ? item.href : "#"}>
                    {item.label}
                  </a>
                </DropdownMenu.Item>
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {:else}
          <Drawer.Root bind:open>
            <Drawer.Trigger aria-label="Toggle Menu">
              <Breadcrumb.Ellipsis class="size-4" />
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header class="text-start">
                <Drawer.Title>Navigate to</Drawer.Title>
                <Drawer.Description>
                  Select a page to navigate to.
                </Drawer.Description>
              </Drawer.Header>
              <div class="grid gap-1 px-4">
                {#each items.slice(1, -2) as item, i (i)}
                  <a href={item.href ? item.href : "#"} class="py-1 text-sm">
                    {item.label}
                  </a>
                {/each}
              </div>
              <Drawer.Footer class="pt-4">
                <Drawer.Close class={buttonVariants({ variant: "outline" })}>
                  Close
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        {/if}
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
    {/if}

    {#each items.slice(-ITEMS_TO_DISPLAY + 1) as item (item.label)}
      <Breadcrumb.Item>
        {#if item.href}
          <Breadcrumb.Link
            href={item.href}
            class="max-w-20 truncate md:max-w-none"
          >
            {item.label}
          </Breadcrumb.Link>
          <Breadcrumb.Separator />
        {:else}
          <Breadcrumb.Page class="max-w-20 truncate md:max-w-none">
            {item.label}
          </Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
```

### Example 34

```sql
<script lang="ts">
  import { MediaQuery } from "svelte/reactivity";
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";

  const items = [
    { href: "#", label: "Home" },
    { href: "#", label: "Documentation" },
    { href: "#", label: "Building Your Application" },
    { href: "#", label: "Data Fetching" },
    { label: "Caching and Revalidating" }
  ];

  const ITEMS_TO_DISPLAY = 3;

  let open = $state(false);

  const isDesktop = new MediaQuery("(min-width: 768px)");
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href={items[0].href}>
        {items[0].label}
      </Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    {#if items.length > ITEMS_TO_DISPLAY}
      <Breadcrumb.Item>
        {#if isDesktop.current}
          <DropdownMenu.Root bind:open>
            <DropdownMenu.Trigger
              class="flex items-center gap-1"
              aria-label="Toggle menu"
            >
              <Breadcrumb.Ellipsis class="size-4" />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content align="start">
              {#each items.slice(1, -2) as item, i (i)}
                <DropdownMenu.Item>
                  <a href={item.href ? item.href : "#"}>
                    {item.label}
                  </a>
                </DropdownMenu.Item>
              {/each}
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        {:else}
          <Drawer.Root bind:open>
            <Drawer.Trigger aria-label="Toggle Menu">
              <Breadcrumb.Ellipsis class="size-4" />
            </Drawer.Trigger>
            <Drawer.Content>
              <Drawer.Header class="text-start">
                <Drawer.Title>Navigate to</Drawer.Title>
                <Drawer.Description>
                  Select a page to navigate to.
                </Drawer.Description>
              </Drawer.Header>
              <div class="grid gap-1 px-4">
                {#each items.slice(1, -2) as item, i (i)}
                  <a href={item.href ? item.href : "#"} class="py-1 text-sm">
                    {item.label}
                  </a>
                {/each}
              </div>
              <Drawer.Footer class="pt-4">
                <Drawer.Close class={buttonVariants({ variant: "outline" })}>
                  Close
                </Drawer.Close>
              </Drawer.Footer>
            </Drawer.Content>
          </Drawer.Root>
        {/if}
      </Breadcrumb.Item>
      <Breadcrumb.Separator />
    {/if}

    {#each items.slice(-ITEMS_TO_DISPLAY + 1) as item (item.label)}
      <Breadcrumb.Item>
        {#if item.href}
          <Breadcrumb.Link
            href={item.href}
            class="max-w-20 truncate md:max-w-none"
          >
            {item.label}
          </Breadcrumb.Link>
          <Breadcrumb.Separator />
        {:else}
          <Breadcrumb.Page class="max-w-20 truncate md:max-w-none">
            {item.label}
          </Breadcrumb.Page>
        {/if}
      </Breadcrumb.Item>
    {/each}
  </Breadcrumb.List>
</Breadcrumb.Root>
```

## Sections

## Installation

## Usage

## Examples

### Custom separator

### Dropdown

### Collapsed

### Link component

### Responsive
