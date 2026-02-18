# Calendar

**Source**: https://www.shadcn-svelte.com/docs/components/calendar

## Table of Contents

- [Blocks](#blocks)
- [Installation](#installation)
- [About](#about)
- [Date Picker](#date-picker)
- [Examples](#examples)
  - [Range Calendar](#range-calendar)
  - [Month and Year Selector](#month-and-year-selector)
  - [Date of Birth Picker](#date-of-birth-picker)
  - [Date and Time Picker](#date-and-time-picker)
  - [Natural Language Picker](#natural-language-picker)
- [Upgrade Guide](#upgrade-guide)
  - [Installing Blocks](#installing-blocks)

## Content

A calendar component that allows users to select dates.

We have built a collection of 30+ calendar blocks that you can use to build your own calendar components.

See call calendar blocks in the Blocks Library page.

Install bits-ui and @internationalized/date:

Copy and paste the following code into your project.

The <Calendar /> component is built on top of the Bits UI Calendar component, which uses the @internationalized/date package to handle dates.

If you're looking for a range calendar, check out the Range Calendar component.

You can use the <Calendar /> component to build a date picker. See the Date Picker page for more information.

This component uses the chrono-node library to parse natural language dates.

You can upgrade to the latest version of the <Calendar /> component by running the following command:

When you're prompted to overwrite the existing files, select Yes. If you have made any changes to the Calendar component, you will need to merge your changes with the new version.

After upgrading the Calendar component, you can add the new blocks with the following:

This will add the latest version of the calendar blocks.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = today(getLocalTimeZone());
</script>

<Calendar
  type="single"
  bind:value
  class="rounded-md border shadow-sm"
  captionLayout="dropdown"
/>
```

### Example 2

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = today(getLocalTimeZone());
</script>

<Calendar
  type="single"
  bind:value
  class="rounded-md border shadow-sm"
  captionLayout="dropdown"
/>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add calendar
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add calendar
```

### Example 5

```python
npx shadcn-svelte@latest add calendar
```

### Example 6

```python
npx shadcn-svelte@latest add calendar
```

### Example 7

```python
npx shadcn-svelte@latest add calendar
```

### Example 8

```python
npx shadcn-svelte@latest add calendar
```

### Example 9

```python
bun x shadcn-svelte@latest add calendar
```

### Example 10

```python
bun x shadcn-svelte@latest add calendar
```

### Example 11

```python
pnpm i bits-ui @internationalized/date -D
```

### Example 12

```python
pnpm i bits-ui @internationalized/date -D
```

### Example 13

```python
npm i bits-ui @internationalized/date -D
```

### Example 14

```python
npm i bits-ui @internationalized/date -D
```

### Example 15

```python
yarn install bits-ui @internationalized/date -D
```

### Example 16

```python
yarn install bits-ui @internationalized/date -D
```

### Example 17

```python
bun install bits-ui @internationalized/date -D
```

### Example 18

```python
bun install bits-ui @internationalized/date -D
```

### Example 19

```javascript
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import type Calendar from "./calendar.svelte";
  import CalendarMonthSelect from "./calendar-month-select.svelte";
  import CalendarYearSelect from "./calendar-year-select.svelte";
  import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";

  let {
    captionLayout,
    months,
    monthFormat,
    years,
    yearFormat,
    month,
    locale,
    placeholder = $bindable(),
    monthIndex = 0,
  }: {
    captionLayout: ComponentProps<typeof Calendar>["captionLayout"];
    months: ComponentProps<typeof CalendarMonthSelect>["months"];
    monthFormat: ComponentProps<typeof CalendarMonthSelect>["monthFormat"];
    years: ComponentProps<typeof CalendarYearSelect>["years"];
    yearFormat: ComponentProps<typeof CalendarYearSelect>["yearFormat"];
    month: DateValue;
    placeholder: DateValue | undefined;
    locale: string;
    monthIndex: number;
  } = $props();

  function formatYear(date: DateValue) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
    return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
  }

  function formatMonth(date: DateValue) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
    return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
  }
</script>

{#snippet MonthSelect()}
  <CalendarMonthSelect
    {months}
    {monthFormat}
    value={month.month}
    onchange={(e) => {
      if (!placeholder) return;
      const v = Number.parseInt(e.currentTarget.value);
      const newPlaceholder = placeholder.set({ month: v });
      placeholder = newPlaceholder.subtract({ months: monthIndex });
    }}
  />
{/snippet}

{#snippet YearSelect()}
  <CalendarYearSelect {years} {yearFormat} value={month.year} />
{/snippet}

{#if captionLayout === "dropdown"}
  {@render MonthSelect()}
  {@render YearSelect()}
{:else if captionLayout === "dropdown-months"}
  {@render MonthSelect()}
  {#if placeholder}
    {formatYear(placeholder)}
  {/if}
{:else if captionLayout === "dropdown-years"}
  {#if placeholder}
    {formatMonth(placeholder)}
  {/if}
  {@render YearSelect()}
{:else}
  {formatMonth(month)} {formatYear(month)}
{/if}
```

### Example 20

```javascript
<script lang="ts">
  import type { ComponentProps } from "svelte";
  import type Calendar from "./calendar.svelte";
  import CalendarMonthSelect from "./calendar-month-select.svelte";
  import CalendarYearSelect from "./calendar-year-select.svelte";
  import { DateFormatter, getLocalTimeZone, type DateValue } from "@internationalized/date";

  let {
    captionLayout,
    months,
    monthFormat,
    years,
    yearFormat,
    month,
    locale,
    placeholder = $bindable(),
    monthIndex = 0,
  }: {
    captionLayout: ComponentProps<typeof Calendar>["captionLayout"];
    months: ComponentProps<typeof CalendarMonthSelect>["months"];
    monthFormat: ComponentProps<typeof CalendarMonthSelect>["monthFormat"];
    years: ComponentProps<typeof CalendarYearSelect>["years"];
    yearFormat: ComponentProps<typeof CalendarYearSelect>["yearFormat"];
    month: DateValue;
    placeholder: DateValue | undefined;
    locale: string;
    monthIndex: number;
  } = $props();

  function formatYear(date: DateValue) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof yearFormat === "function") return yearFormat(dateObj.getFullYear());
    return new DateFormatter(locale, { year: yearFormat }).format(dateObj);
  }

  function formatMonth(date: DateValue) {
    const dateObj = date.toDate(getLocalTimeZone());
    if (typeof monthFormat === "function") return monthFormat(dateObj.getMonth() + 1);
    return new DateFormatter(locale, { month: monthFormat }).format(dateObj);
  }
</script>

{#snippet MonthSelect()}
  <CalendarMonthSelect
    {months}
    {monthFormat}
    value={month.month}
    onchange={(e) => {
      if (!placeholder) return;
      const v = Number.parseInt(e.currentTarget.value);
      const newPlaceholder = placeholder.set({ month: v });
      placeholder = newPlaceholder.subtract({ months: monthIndex });
    }}
  />
{/snippet}

{#snippet YearSelect()}
  <CalendarYearSelect {years} {yearFormat} value={month.year} />
{/snippet}

{#if captionLayout === "dropdown"}
  {@render MonthSelect()}
  {@render YearSelect()}
{:else if captionLayout === "dropdown-months"}
  {@render MonthSelect()}
  {#if placeholder}
    {formatYear(placeholder)}
  {/if}
{:else if captionLayout === "dropdown-years"}
  {#if placeholder}
    {formatMonth(placeholder)}
  {/if}
  {@render YearSelect()}
{:else}
  {formatMonth(month)} {formatYear(month)}
{/if}
```

### Example 21

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { CalendarDate } from "@internationalized/date";

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Calendar
  type="single"
  bind:value
  class="rounded-lg border shadow-sm"
  numberOfMonths={2}
/>
```

### Example 22

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import { CalendarDate } from "@internationalized/date";

  let value = $state<CalendarDate | undefined>(new CalendarDate(2025, 6, 12));
</script>

<Calendar
  type="single"
  bind:value
  class="rounded-lg border shadow-sm"
  numberOfMonths={2}
/>
```

### Example 23

```typescript
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { CalendarDate } from "@internationalized/date";
  import type { ComponentProps } from "svelte";

  let value = $state<CalendarDate>(new CalendarDate(2025, 6, 12));
  let dropdown =
    $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");

  const dropdownOptions = [
    {
      label: "Month and Year",
      value: "dropdown"
    },
    {
      label: "Month Only",
      value: "dropdown-months"
    },
    {
      label: "Year Only",
      value: "dropdown-years"
    }
  ];

  const selectedDropdown = $derived(
    dropdownOptions.find((option) => option.value === dropdown)?.label ??
      "Dropdown"
  );

  const id = $props.id();
</script>

<div class="flex flex-col gap-4">
  <Calendar
    type="single"
    bind:value
    class="rounded-lg border shadow-sm"
    captionLayout={dropdown}
  />
  <div class="flex flex-col gap-3">
    <Label for="{id}-dropdown" class="px-1">Dropdown</Label>
    <Select.Root type="single" bind:value={dropdown}>
      <Select.Trigger id="{id}-dropdown" size="sm" class="bg-background w-full">
        {selectedDropdown}
      </Select.Trigger>
      <Select.Content align="center">
        {#each dropdownOptions as option (option.value)}
          <Select.Item value={option.value}>{option.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
</div>
```

### Example 24

```typescript
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { CalendarDate } from "@internationalized/date";
  import type { ComponentProps } from "svelte";

  let value = $state<CalendarDate>(new CalendarDate(2025, 6, 12));
  let dropdown =
    $state<ComponentProps<typeof Calendar>["captionLayout"]>("dropdown");

  const dropdownOptions = [
    {
      label: "Month and Year",
      value: "dropdown"
    },
    {
      label: "Month Only",
      value: "dropdown-months"
    },
    {
      label: "Year Only",
      value: "dropdown-years"
    }
  ];

  const selectedDropdown = $derived(
    dropdownOptions.find((option) => option.value === dropdown)?.label ??
      "Dropdown"
  );

  const id = $props.id();
</script>

<div class="flex flex-col gap-4">
  <Calendar
    type="single"
    bind:value
    class="rounded-lg border shadow-sm"
    captionLayout={dropdown}
  />
  <div class="flex flex-col gap-3">
    <Label for="{id}-dropdown" class="px-1">Dropdown</Label>
    <Select.Root type="single" bind:value={dropdown}>
      <Select.Trigger id="{id}-dropdown" size="sm" class="bg-background w-full">
        {selectedDropdown}
      </Select.Trigger>
      <Select.Content align="center">
        {#each dropdownOptions as option (option.value)}
          <Select.Item value={option.value}>{option.label}</Select.Item>
        {/each}
      </Select.Content>
    </Select.Root>
  </div>
</div>
```

### Example 25

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import {
    getLocalTimeZone,
    today,
    type CalendarDate
  } from "@internationalized/date";

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Date of birth</Label>
  <Popover.Root bind:open>
    <Popover.Trigger id="{id}-date">
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          class="w-48 justify-between font-normal"
        >
          {value
            ? value.toDate(getLocalTimeZone()).toLocaleDateString()
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto overflow-hidden p-0" align="start">
      <Calendar
        type="single"
        bind:value
        captionLayout="dropdown"
        onValueChange={() => {
          open = false;
        }}
        maxValue={today(getLocalTimeZone())}
      />
    </Popover.Content>
  </Popover.Root>
</div>
```

### Example 26

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import {
    getLocalTimeZone,
    today,
    type CalendarDate
  } from "@internationalized/date";

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Date of birth</Label>
  <Popover.Root bind:open>
    <Popover.Trigger id="{id}-date">
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          class="w-48 justify-between font-normal"
        >
          {value
            ? value.toDate(getLocalTimeZone()).toLocaleDateString()
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto overflow-hidden p-0" align="start">
      <Calendar
        type="single"
        bind:value
        captionLayout="dropdown"
        onValueChange={() => {
          open = false;
        }}
        maxValue={today(getLocalTimeZone())}
      />
    </Popover.Content>
  </Popover.Root>
</div>
```

### Example 27

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import { getLocalTimeZone } from "@internationalized/date";
  import type { CalendarDate } from "@internationalized/date";

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex gap-4">
  <div class="flex flex-col gap-3">
    <Label for="{id}-date" class="px-1">Date</Label>
    <Popover.Root bind:open>
      <Popover.Trigger id="{id}-date">
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            class="w-32 justify-between font-normal"
          >
            {value
              ? value.toDate(getLocalTimeZone()).toLocaleDateString()
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          type="single"
          bind:value
          onValueChange={() => {
            open = false;
          }}
          captionLayout="dropdown"
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="flex flex-col gap-3">
    <Label for="{id}-time" class="px-1">Time</Label>
    <Input
      type="time"
      id="{id}-time"
      step="1"
      value="10:30:00"
      class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
  </div>
</div>
```

### Example 28

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import { getLocalTimeZone } from "@internationalized/date";
  import type { CalendarDate } from "@internationalized/date";

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex gap-4">
  <div class="flex flex-col gap-3">
    <Label for="{id}-date" class="px-1">Date</Label>
    <Popover.Root bind:open>
      <Popover.Trigger id="{id}-date">
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            class="w-32 justify-between font-normal"
          >
            {value
              ? value.toDate(getLocalTimeZone()).toLocaleDateString()
              : "Select date"}
            <ChevronDownIcon />
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="w-auto overflow-hidden p-0" align="start">
        <Calendar
          type="single"
          bind:value
          onValueChange={() => {
            open = false;
          }}
          captionLayout="dropdown"
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="flex flex-col gap-3">
    <Label for="{id}-time" class="px-1">Time</Label>
    <Input
      type="time"
      id="{id}-time"
      step="1"
      value="10:30:00"
      class="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
    />
  </div>
</div>
```

### Example 29

```javascript
<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { parseDate } from "chrono-node";
  import {
    CalendarDate,
    getLocalTimeZone,
    type DateValue
  } from "@internationalized/date";
  import { untrack } from "svelte";

  function formatDate(date: DateValue | undefined) {
    if (!date) return "";

    return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  const id = $props.id();

  let open = $state(false);
  let inputValue = $state("In 2 days");
  let value = $state<DateValue | undefined>(
    untrack(() => {
      const date = parseDate(inputValue);
      if (date)
        return new CalendarDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
      return undefined;
    })
  );
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Schedule Date</Label>
  <div class="relative flex gap-2">
    <Input
      id="date"
      bind:value={
        () => inputValue,
        (v) => {
          inputValue = v;
          const date = parseDate(v);
          if (date) {
            value = new CalendarDate(
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            );
          }
        }
      }
      placeholder="Tomorrow or next week"
      class="bg-background pe-10"
      onkeydown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          open = true;
        }
      }}
    />
    <Popover.Root bind:open>
      <Popover.Trigger id="{id}-date-picker">
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            class="absolute end-2 top-1/2 size-6 -translate-y-1/2"
          >
            <CalendarIcon class="size-3.5" />
            <span class="sr-only">Select date</span>
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="w-auto overflow-hidden p-0" align="end">
        <Calendar
          type="single"
          bind:value
          captionLayout="dropdown"
          onValueChange={(v) => {
            inputValue = formatDate(v);
            open = false;
          }}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="text-muted-foreground px-1 text-sm">
    Your post will be published on
    <span class="font-medium">{formatDate(value)}</span>.
  </div>
</div>
```

### Example 30

```javascript
<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import { parseDate } from "chrono-node";
  import {
    CalendarDate,
    getLocalTimeZone,
    type DateValue
  } from "@internationalized/date";
  import { untrack } from "svelte";

  function formatDate(date: DateValue | undefined) {
    if (!date) return "";

    return date.toDate(getLocalTimeZone()).toLocaleDateString("en-US", {
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
  }

  const id = $props.id();

  let open = $state(false);
  let inputValue = $state("In 2 days");
  let value = $state<DateValue | undefined>(
    untrack(() => {
      const date = parseDate(inputValue);
      if (date)
        return new CalendarDate(
          date.getFullYear(),
          date.getMonth() + 1,
          date.getDate()
        );
      return undefined;
    })
  );
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Schedule Date</Label>
  <div class="relative flex gap-2">
    <Input
      id="date"
      bind:value={
        () => inputValue,
        (v) => {
          inputValue = v;
          const date = parseDate(v);
          if (date) {
            value = new CalendarDate(
              date.getFullYear(),
              date.getMonth() + 1,
              date.getDate()
            );
          }
        }
      }
      placeholder="Tomorrow or next week"
      class="bg-background pe-10"
      onkeydown={(e) => {
        if (e.key === "ArrowDown") {
          e.preventDefault();
          open = true;
        }
      }}
    />
    <Popover.Root bind:open>
      <Popover.Trigger id="{id}-date-picker">
        {#snippet child({ props })}
          <Button
            {...props}
            variant="ghost"
            class="absolute end-2 top-1/2 size-6 -translate-y-1/2"
          >
            <CalendarIcon class="size-3.5" />
            <span class="sr-only">Select date</span>
          </Button>
        {/snippet}
      </Popover.Trigger>
      <Popover.Content class="w-auto overflow-hidden p-0" align="end">
        <Calendar
          type="single"
          bind:value
          captionLayout="dropdown"
          onValueChange={(v) => {
            inputValue = formatDate(v);
            open = false;
          }}
        />
      </Popover.Content>
    </Popover.Root>
  </div>
  <div class="text-muted-foreground px-1 text-sm">
    Your post will be published on
    <span class="font-medium">{formatDate(value)}</span>.
  </div>
</div>
```

### Example 31

```python
pnpm dlx shadcn-svelte@latest add calendar
```

### Example 32

```python
pnpm dlx shadcn-svelte@latest add calendar
```

### Example 33

```python
npx shadcn-svelte@latest add calendar
```

### Example 34

```python
npx shadcn-svelte@latest add calendar
```

### Example 35

```python
npx shadcn-svelte@latest add calendar
```

### Example 36

```python
npx shadcn-svelte@latest add calendar
```

### Example 37

```python
bun x shadcn-svelte@latest add calendar
```

### Example 38

```python
bun x shadcn-svelte@latest add calendar
```

### Example 39

```python
pnpm dlx shadcn-svelte@latest add calendar-02
```

### Example 40

```python
pnpm dlx shadcn-svelte@latest add calendar-02
```

### Example 41

```python
npx shadcn-svelte@latest add calendar-02
```

### Example 42

```python
npx shadcn-svelte@latest add calendar-02
```

### Example 43

```python
npx shadcn-svelte@latest add calendar-02
```

### Example 44

```python
npx shadcn-svelte@latest add calendar-02
```

### Example 45

```python
bun x shadcn-svelte@latest add calendar-02
```

### Example 46

```python
bun x shadcn-svelte@latest add calendar-02
```

## Sections

## Blocks

## Installation

## About

## Date Picker

## Examples

### Range Calendar

### Month and Year Selector

### Date of Birth Picker

### Date and Time Picker

### Natural Language Picker

## Upgrade Guide

#### Installing Blocks
