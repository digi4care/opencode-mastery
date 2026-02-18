# Accordion

**Source**: https://www.shadcn-svelte.com/docs/components/accordion

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)

## Content

A vertically stacked set of interactive headings that each reveal a section of content.

Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.

Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.

We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.

All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.

We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.

Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.

Copy and paste the following code into your project.

## Code Examples

### Example 1

```tsx
<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Product Information</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        Our flagship product combines cutting-edge technology with sleek design.
        Built with premium materials, it offers unparalleled performance and
        reliability.
      </p>
      <p>
        Key features include advanced processing capabilities, and an intuitive
        user interface designed for both beginners and experts.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Shipping Details</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We offer worldwide shipping through trusted courier partners. Standard
        delivery takes 3-5 business days, while express shipping ensures
        delivery within 1-2 business days.
      </p>
      <p>
        All orders are carefully packaged and fully insured. Track your shipment
        in real-time through our dedicated tracking portal.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Return Policy</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We stand behind our products with a comprehensive 30-day return policy.
        If you&apos;re not completely satisfied, simply return the item in its
        original condition.
      </p>
      <p>
        Our hassle-free return process includes free return shipping and full
        refunds processed within 48 hours of receiving the returned item.
      </p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Example 2

```tsx
<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Product Information</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        Our flagship product combines cutting-edge technology with sleek design.
        Built with premium materials, it offers unparalleled performance and
        reliability.
      </p>
      <p>
        Key features include advanced processing capabilities, and an intuitive
        user interface designed for both beginners and experts.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Shipping Details</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We offer worldwide shipping through trusted courier partners. Standard
        delivery takes 3-5 business days, while express shipping ensures
        delivery within 1-2 business days.
      </p>
      <p>
        All orders are carefully packaged and fully insured. Track your shipment
        in real-time through our dedicated tracking portal.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Return Policy</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We stand behind our products with a comprehensive 30-day return policy.
        If you&apos;re not completely satisfied, simply return the item in its
        original condition.
      </p>
      <p>
        Our hassle-free return process includes free return shipping and full
        refunds processed within 48 hours of receiving the returned item.
      </p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add accordion
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add accordion
```

### Example 5

```python
npx shadcn-svelte@latest add accordion
```

### Example 6

```python
npx shadcn-svelte@latest add accordion
```

### Example 7

```python
npx shadcn-svelte@latest add accordion
```

### Example 8

```python
npx shadcn-svelte@latest add accordion
```

### Example 9

```python
bun x shadcn-svelte@latest add accordion
```

### Example 10

```python
bun x shadcn-svelte@latest add accordion
```

### Example 11

```unknown
pnpm i bits-ui
```

### Example 12

```unknown
pnpm i bits-ui
```

### Example 13

```unknown
npm i bits-ui
```

### Example 14

```unknown
npm i bits-ui
```

### Example 15

```unknown
yarn install bits-ui
```

### Example 16

```unknown
yarn install bits-ui
```

### Example 17

```unknown
bun install bits-ui
```

### Example 18

```unknown
bun install bits-ui
```

### Example 19

```jsx
<script lang="ts">
  import { Accordion as AccordionPrimitive } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
  {...restProps}
>
  <div class={cn("pt-0 pb-4", className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
```

### Example 20

```jsx
<script lang="ts">
  import { Accordion as AccordionPrimitive } from "bits-ui";
  import { cn, type WithoutChild } from "$lib/utils.js";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithoutChild<AccordionPrimitive.ContentProps> = $props();
</script>

<AccordionPrimitive.Content
  bind:ref
  data-slot="accordion-content"
  class="data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down overflow-hidden text-sm"
  {...restProps}
>
  <div class={cn("pt-0 pb-4", className)}>
    {@render children?.()}
  </div>
</AccordionPrimitive.Content>
```

### Example 21

```jsx
<script lang="ts">import * as Accordion from "$lib/components/ui/accordion/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as Accordion from "$lib/components/ui/accordion/index.js";</script>
```

### Example 23

```unknown
<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

### Example 24

```unknown
<Accordion.Root type="single">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
    <Accordion.Content>
      Yes. It adheres to the WAI-ARIA design pattern.
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

## Sections

## Installation

## Usage
