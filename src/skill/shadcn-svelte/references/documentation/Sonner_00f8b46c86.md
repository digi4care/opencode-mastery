# Sonner

**Source**: https://www.shadcn-svelte.com/docs/components/sonner

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
- [Changelog](#changelog)
  - [2025-12 Icons](#2025-12-icons)

## Content

An opinionated toast component for Svelte.

The Sonner component is provided by svelte-sonner, which is a Svelte port of Sonner, originally created by Emil Kowalski for React.

By default, Sonner will use the user's system preferences to determine whether to show the light or dark theme. To get around this, you can either pass in a custom theme prop to the component, or simply use mode-watcher which you can hardcode to dark or light mode should you wish.

You can learn more about setting up Dark Mode support here.

If you wish to opt out of Dark Mode support, you can uninstall mode-watcher and remove the theme prop from the component after installing via CLI, or manually install the component and don't include mode-watcher

Install svelte-sonner:

Copy and paste the following code into your project.

We've updated the Sonner component to use icons from lucide. Update your sonner.svelte file to use the new icons.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button
  variant="outline"
  onclick={() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.info("Undo")
      }
    })}
>
  Show Toast
</Button>
```

### Example 2

```jsx
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button
  variant="outline"
  onclick={() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.info("Undo")
      }
    })}
>
  Show Toast
</Button>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add sonner
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add sonner
```

### Example 5

```python
npx shadcn-svelte@latest add sonner
```

### Example 6

```python
npx shadcn-svelte@latest add sonner
```

### Example 7

```python
npx shadcn-svelte@latest add sonner
```

### Example 8

```python
npx shadcn-svelte@latest add sonner
```

### Example 9

```python
bun x shadcn-svelte@latest add sonner
```

### Example 10

```python
bun x shadcn-svelte@latest add sonner
```

### Example 11

```jsx
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  let { children } = $props();
</script>

<Toaster />

{@render children?.()}
```

### Example 12

```jsx
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  let { children } = $props();
</script>

<Toaster />

{@render children?.()}
```

### Example 13

```unknown
pnpm i svelte-sonner -D
```

### Example 14

```unknown
pnpm i svelte-sonner -D
```

### Example 15

```unknown
npm i svelte-sonner -D
```

### Example 16

```unknown
npm i svelte-sonner -D
```

### Example 17

```unknown
yarn install svelte-sonner -D
```

### Example 18

```unknown
yarn install svelte-sonner -D
```

### Example 19

```unknown
bun install svelte-sonner -D
```

### Example 20

```unknown
bun install svelte-sonner -D
```

### Example 21

```sql
export { default as Toaster } from "./sonner.svelte";
```

### Example 22

```sql
export { default as Toaster } from "./sonner.svelte";
```

### Example 23

```jsx
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  let { children } = $props();
</script>

<Toaster />

{@render children?.()}
```

### Example 24

```jsx
<script lang="ts">
  import { Toaster } from "$lib/components/ui/sonner/index.js";
  let { children } = $props();
</script>

<Toaster />

{@render children?.()}
```

### Example 25

```jsx
<script lang="ts">
  import {toast} from "svelte-sonner"; import {Button} from "$lib/components/ui/button/index.js";
</script>
```

### Example 26

```jsx
<script lang="ts">
  import {toast} from "svelte-sonner"; import {Button} from "$lib/components/ui/button/index.js";
</script>
```

### Example 27

```jsx
<Button onclick={() => toast("Hello world")}>Show toast</Button>
```

### Example 28

```jsx
<Button onclick={() => toast("Hello world")}>Show toast</Button>
```

### Example 29

```jsx
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex flex-wrap gap-2">
  <Button variant="outline" onclick={() => toast("Event has been created")}
    >Default</Button
  >
  <Button
    variant="outline"
    onclick={() => toast.success("Event has been created")}
  >
    Success
  </Button>
  <Button
    variant="outline"
    onclick={() =>
      toast.info("Be at the area 10 minutes before the event time")}
  >
    Info
  </Button>
  <Button
    variant="outline"
    onclick={() => toast.warning("Event start time cannot be earlier than 8am")}
  >
    Warning
  </Button>
  <Button
    variant="outline"
    onclick={() => toast.error("Event has not been created")}
  >
    Error
  </Button>
  <Button
    variant="outline"
    onclick={() => {
      toast.promise<{ name: string }>(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: "Event" }), 2000)
          ),
        {
          loading: "Loading...",
          success: (data) => `${data.name} has been created`,
          error: "Error"
        }
      );
    }}
  >
    Promise
  </Button>
</div>
```

### Example 30

```jsx
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex flex-wrap gap-2">
  <Button variant="outline" onclick={() => toast("Event has been created")}
    >Default</Button
  >
  <Button
    variant="outline"
    onclick={() => toast.success("Event has been created")}
  >
    Success
  </Button>
  <Button
    variant="outline"
    onclick={() =>
      toast.info("Be at the area 10 minutes before the event time")}
  >
    Info
  </Button>
  <Button
    variant="outline"
    onclick={() => toast.warning("Event start time cannot be earlier than 8am")}
  >
    Warning
  </Button>
  <Button
    variant="outline"
    onclick={() => toast.error("Event has not been created")}
  >
    Error
  </Button>
  <Button
    variant="outline"
    onclick={() => {
      toast.promise<{ name: string }>(
        () =>
          new Promise((resolve) =>
            setTimeout(() => resolve({ name: "Event" }), 2000)
          ),
        {
          loading: "Loading...",
          success: (data) => `${data.name} has been created`,
          error: "Error"
        }
      );
    }}
  >
    Promise
  </Button>
</div>
```

### Example 31

```typescript
<script lang="ts">
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
  import InfoIcon from "@lucide/svelte/icons/info";
  import Loader2Icon from "@lucide/svelte/icons/loader-2";
  import OctagonXIcon from "@lucide/svelte/icons/octagon-x";
  import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";

  import {
    Toaster as Sonner,
    type ToasterProps as SonnerProps,
  } from "svelte-sonner";
  import { mode } from "mode-watcher";

  let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
  theme={mode.current}
  class="toaster group"
  style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
  {...restProps}
  >{#snippet loadingIcon()}
    <Loader2Icon class="size-4 animate-spin" />
  {/snippet}
  {#snippet successIcon()}
    <CircleCheckIcon class="size-4" />
  {/snippet}
  {#snippet errorIcon()}
    <OctagonXIcon class="size-4" />
  {/snippet}
  {#snippet infoIcon()}
    <InfoIcon class="size-4" />
  {/snippet}
  {#snippet warningIcon()}
    <TriangleAlertIcon class="size-4" />
  {/snippet}
</Sonner>
```

### Example 32

```typescript
<script lang="ts">
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";
  import InfoIcon from "@lucide/svelte/icons/info";
  import Loader2Icon from "@lucide/svelte/icons/loader-2";
  import OctagonXIcon from "@lucide/svelte/icons/octagon-x";
  import TriangleAlertIcon from "@lucide/svelte/icons/triangle-alert";

  import {
    Toaster as Sonner,
    type ToasterProps as SonnerProps,
  } from "svelte-sonner";
  import { mode } from "mode-watcher";

  let { ...restProps }: SonnerProps = $props();
</script>

<Sonner
  theme={mode.current}
  class="toaster group"
  style="--normal-bg: var(--color-popover); --normal-text: var(--color-popover-foreground); --normal-border: var(--color-border);"
  {...restProps}
  >{#snippet loadingIcon()}
    <Loader2Icon class="size-4 animate-spin" />
  {/snippet}
  {#snippet successIcon()}
    <CircleCheckIcon class="size-4" />
  {/snippet}
  {#snippet errorIcon()}
    <OctagonXIcon class="size-4" />
  {/snippet}
  {#snippet infoIcon()}
    <InfoIcon class="size-4" />
  {/snippet}
  {#snippet warningIcon()}
    <TriangleAlertIcon class="size-4" />
  {/snippet}
</Sonner>
```

## Sections

## About

## Installation

## Usage

## Examples

## Changelog

### 2025-12 Icons
