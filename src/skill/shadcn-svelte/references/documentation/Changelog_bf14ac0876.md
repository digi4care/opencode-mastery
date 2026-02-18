# Changelog

**Source**: https://www.shadcn-svelte.com/docs/changelog

## Table of Contents

- [October 2025 - New Components](#october-2025---new-components)
- [June 2025](#june-2025)
  - [New Calendar Components](#new-calendar-components)
- [May 2025](#may-2025)
  - [Tailwind v4 Support](#tailwind-v4-support)
  - [Charts](#charts)
  - [Custom Registry Support](#custom-registry-support)
- [March 2024](#march-2024)
  - [Introducing Blocks](#introducing-blocks)
  - [New Component: Breadcrumb](#new-component:-breadcrumb)
  - [New Component: Scroll Area](#new-component:-scroll-area)
- [February 2024](#february-2024)
  - [New Component: Resizable](#new-component:-resizable)
  - [Updated Icon Imports](#updated-icon-imports)
  - [Major Forms Update](#major-forms-update)
- [January 2024](#january-2024)
  - [New Component: Carousel](#new-component:-carousel)
  - [New Component: Drawer](#new-component:-drawer)
  - [New Component: Sonner](#new-component:-sonner)
  - [New Component: Pagination](#new-component:-pagination)
- [December 2023](#december-2023)
- [November 2023](#november-2023)
  - [New Component: Toggle Group](#new-component:-toggle-group)
- [October 2023](#october-2023)
  - [New Component: Command](#new-component:-command)
  - [New Component: Combobox](#new-component:-combobox)
  - [Updates to Form](#updates-to-form)
    - [Form.Label Changes](#form.label-changes)
  - [Form.Control](#form.control)

## Content

Latest updates and announcements.

For this round of components, I looked at what we build every day, the boring stuff we rebuild over and over, and made reusable abstractions you can actually use.

We've completely overhauled the Calendar and RangeCalendar components to support dropdowns for the month and year selectors, and have added 30+ Calendar blocks to help you get started building your own calendar components.

Check out the Calendar docs page and the Calendar Blocks page for more.

Tailwind v4 support has officially landed. You can see a full demo of the refreshed styles that come with it here: https://v4.shadcn-svelte.com.

This release includes several key changes, all outlined in the Tailwind v4 migration guide. If you're still using Svelte v5 with Tailwind v3, your project and the CLI will continue to work as expected until you're ready to upgrade.

Charts have been added as a preview component to the project. See the Charts page for examples.

If you're running Svelte v5 and Tailwind v4 you can add them to your project via the CLI.

We've added support for custom/remote registries - This means you can publish your own components and share them with the community via the shadcn-svelte CLI.

See the Registry documentation for more information.

Blocks are ready-made components that you can use to build your apps. They are fully responsive, accessible, and composable, meaning they are built using the same principles as the rest of the components in shadcn-svelte.

v0 only supports React at the moment, so you can't customize them like you can the original from shadcn/ui. However, if having support for Svelte interests you, I'm sure the v0 team would love to hear about it. :)

We've added a new component to the project, Breadcrumb.

We've added a new component to the project, Scroll Area, which is built on top of the Scroll Area component from Bits UI.

It supports both vertical and horizontal scrolling, and is designed to provide a consistent experience across all browsers and platforms.

We've added a new component to the project, Resizable, which is built on top of PaneForge. PaneForge is still in an early stage, so be sure to raise any issues you find with the library on the PaneForge GitHub.

After some feedback about dev server performance, we've updated the way we import icons. With this change, we've decided to move away from the unmaintained radix-icons-svelte package to svelte-radix for the new-york style.

Instead of importing icons like so:

We now import them directly:

With deep imports, we're preventing Vite from optimizing the entire icon collections, and instead only optimizing the icons that are actually used in your project. From what we've seen, this has a massive impact on dev server performance. Enjoy! 🚀

Formsnap has been completely rewritten to be more flexible, easier to use, and less opinionated. This means we've had to make some changes to the way we use it in shadcn-svelte, but once you get the hang of it, you'll find it's much more powerful and less restrictive than the previous iteration.

Since the changes are so significant, there isn't a direct migration path from the old version to the new version. You'll need to update your components to use the new API, as well as ensure you're using the latest version of formsnap and sveltekit-superforms.

All of the Form components have been updated to use the new API, and you can see live examples of them on the Forms Examples page.

Visit the Formsnap documentation (which has also been updated) to learn more about the new API and how its used.

We've added four new components to the project, Carousel, Drawer, Sonner, & Pagination.

We've added a new component to the project, Carousel.

The Drawer is built on top of vaul-svelte and is a port of vaul, originally created by Emil Kowalski for React.

The Sonner component is provided by svelte-sonner, which is a Svelte port of Sonner, originally created by Emil Kowalski for React.

Pagination leverages the Pagination component from Bits UI.

We've added three new components to the project, Calendar, Range Calendar, & Date Picker.

We've added a new component to the library, Toggle Group.

We've added two new components to the library, Command & Combobox. We've also made some updates to the <Form.Label /> component that you'll want to be aware of.

Command is a component that allows you to create a command palette. It's built on top of cmdk-sv, which is a Svelte port of cmdk. The library is still in its infancy, but we're excited to see where it goes. If you notice any issues, please open an issue with the library.

Be sure to check out the Command docs for more information.

Combobox is a combination of the <Command /> & <Popover /> components. It allows you to create a searchable dropdown menu.

Be sure to check out the Combobox docs for more information.

Since we had to make some internal changes to formsnap to fix outstanding issues, there is a slight modification we have to make to the <Form.Label /> component. The ids returned from getFormField() is now a store, so we need to prefix it with $ when we use it.

Formsnap introduced a new component <Form.Control /> which wraps non-traditional form elements. This allows us to ensure the components are accessible, and work well with the rest of the form components. You'll need to define & export that control in your form/index.ts file.

## Code Examples

### Example 1

```sql
import { Check } from "@lucide/svelte";
```

### Example 2

```sql
import { Check } from "@lucide/svelte";
```

### Example 3

```python
import Check from "@lucide/svelte/icons/check";
```

### Example 4

```python
import Check from "@lucide/svelte/icons/check";
```

### Example 5

```html
<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<Carousel.Root class="w-full max-w-xs">
  <Carousel.Content>
    {#each Array(5), i}
    <Carousel.Item>
      <div class="p-1">
        <Card.Root>
          <Card.Content class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">{i + 1}</span>
          </Card.Content>
        </Card.Root>
      </div>
    </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
```

### Example 6

```html
<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<Carousel.Root class="w-full max-w-xs">
  <Carousel.Content>
    {#each Array(5), i}
    <Carousel.Item>
      <div class="p-1">
        <Card.Root>
          <Card.Content class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">{i + 1}</span>
          </Card.Content>
        </Card.Root>
      </div>
    </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
```

### Example 7

```jsx
<script lang="ts">
  import MinusIcon from "@lucide/svelte/icons/minus";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { BarChart, type ChartContextValue } from "layerchart";
  import { scaleBand } from "d3-scale";
  import { cubicInOut } from "svelte/easing";

  const data = [
    {
      goal: 400
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 239
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 349
    }
  ];

  let goal = $state(350);

  function handleClick(adjustment: number) {
    goal = Math.max(200, Math.min(400, goal + adjustment));
  }

  let context = $state<ChartContextValue>();
</script>

<Drawer.Root>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}
    >Open Drawer</Drawer.Trigger
  >
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Move Goal</Drawer.Title>
        <Drawer.Description>Set your daily activity goal.</Drawer.Description>
      </Drawer.Header>
      <div class="p-4 pb-0">
        <div class="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(-10)}
            disabled={goal <= 200}
          >
            <MinusIcon />
            <span class="sr-only">Decrease</span>
          </Button>
          <div class="flex-1 text-center">
            <div class="text-7xl font-bold tracking-tighter">
              {goal}
            </div>
            <div class="text-muted-foreground text-[0.70rem] uppercase">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(10)}
            disabled={goal >= 400}
          >
            <PlusIcon />
            <span class="sr-only">Increase</span>
          </Button>
        </div>
        <div class="mt-3 h-[120px]">
          <div class="h-full w-full">
            <BarChart
              bind:context
              data={data.map((d, i) => ({ goal: d.goal, index: i }))}
              y="goal"
              x="index"
              xScale={scaleBand().padding(0.25)}
              axis={false}
              tooltip={false}
              props={{
                bars: {
                  stroke: "none",
                  rounded: "all",
                  radius: 4,
                  // use the height of the chart to animate the bars
                  initialY: context?.height,
                  initialHeight: 0,
                  motion: {
                    x: { type: "tween", duration: 500, easing: cubicInOut },
                    width: { type: "tween", duration: 500, easing: cubicInOut },
                    height: {
                      type: "tween",
                      duration: 500,
                      easing: cubicInOut
                    },
                    y: { type: "tween", duration: 500, easing: cubicInOut }
                  },
                  fill: "var(--color-foreground)",
                  fillOpacity: 0.9
                },
                highlight: { area: { fill: "none" } }
              }}
            />
          </div>
        </div>
      </div>
      <Drawer.Footer>
        <Button>Submit</Button>
        <Drawer.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
```

### Example 8

```jsx
<script lang="ts">
  import MinusIcon from "@lucide/svelte/icons/minus";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { BarChart, type ChartContextValue } from "layerchart";
  import { scaleBand } from "d3-scale";
  import { cubicInOut } from "svelte/easing";

  const data = [
    {
      goal: 400
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 239
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 349
    }
  ];

  let goal = $state(350);

  function handleClick(adjustment: number) {
    goal = Math.max(200, Math.min(400, goal + adjustment));
  }

  let context = $state<ChartContextValue>();
</script>

<Drawer.Root>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}
    >Open Drawer</Drawer.Trigger
  >
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Move Goal</Drawer.Title>
        <Drawer.Description>Set your daily activity goal.</Drawer.Description>
      </Drawer.Header>
      <div class="p-4 pb-0">
        <div class="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(-10)}
            disabled={goal <= 200}
          >
            <MinusIcon />
            <span class="sr-only">Decrease</span>
          </Button>
          <div class="flex-1 text-center">
            <div class="text-7xl font-bold tracking-tighter">
              {goal}
            </div>
            <div class="text-muted-foreground text-[0.70rem] uppercase">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(10)}
            disabled={goal >= 400}
          >
            <PlusIcon />
            <span class="sr-only">Increase</span>
          </Button>
        </div>
        <div class="mt-3 h-[120px]">
          <div class="h-full w-full">
            <BarChart
              bind:context
              data={data.map((d, i) => ({ goal: d.goal, index: i }))}
              y="goal"
              x="index"
              xScale={scaleBand().padding(0.25)}
              axis={false}
              tooltip={false}
              props={{
                bars: {
                  stroke: "none",
                  rounded: "all",
                  radius: 4,
                  // use the height of the chart to animate the bars
                  initialY: context?.height,
                  initialHeight: 0,
                  motion: {
                    x: { type: "tween", duration: 500, easing: cubicInOut },
                    width: { type: "tween", duration: 500, easing: cubicInOut },
                    height: {
                      type: "tween",
                      duration: 500,
                      easing: cubicInOut
                    },
                    y: { type: "tween", duration: 500, easing: cubicInOut }
                  },
                  fill: "var(--color-foreground)",
                  fillOpacity: 0.9
                },
                highlight: { area: { fill: "none" } }
              }}
            />
          </div>
        </div>
      </div>
      <Drawer.Footer>
        <Button>Submit</Button>
        <Drawer.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
```

### Example 9

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

### Example 10

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

### Example 11

```jsx
<Label for={$ids.input} class={cn($errors && "text-destructive", className)} {...$$restProps}>
  <slot />
</Label>
```

### Example 12

```jsx
<Label for={$ids.input} class={cn($errors && "text-destructive", className)} {...$$restProps}>
  <slot />
</Label>
```

### Example 13

```typescript
// ...rest
const Control = FormPrimitive.Control;

export {
  // ...rest
  Control,
  Control as FormControl,
};
```

### Example 14

```typescript
// ...rest
const Control = FormPrimitive.Control;

export {
  // ...rest
  Control,
  Control as FormControl,
};
```

## Sections

## October 2025 - New Components

## June 2025

### New Calendar Components

## May 2025

### Tailwind v4 Support

### Charts

### Custom Registry Support

## March 2024

### Introducing Blocks

### New Component: Breadcrumb

### New Component: Scroll Area

## February 2024

### New Component: Resizable

### Updated Icon Imports

### Major Forms Update

## January 2024

### New Component: Carousel

### New Component: Drawer

### New Component: Sonner

### New Component: Pagination

## December 2023

## November 2023

### New Component: Toggle Group

## October 2023

### New Component: Command

### New Component: Combobox

### Updates to Form

#### Form.Label Changes

### Form.Control
