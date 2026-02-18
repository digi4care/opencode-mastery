# Range Calendar

**Source**: https://www.shadcn-svelte.com/docs/components/range-calendar

## Table of Contents

- [About](#about)
- [Blocks](#blocks)
- [Installation](#installation)

## Content

A calendar component that allows users to select a range of dates.

The <RangeCalendar /> component is built on top of the Bits Range Calendar component, which uses the @internationalized/date package to handle dates.

You can see the RangeCalendar component in action in the 30+ Calendar Blocks we've built.

Install bits-ui and @internationalized/date:

Copy and paste the following code into your project.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";

  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });

  let value = $state({
    start,
    end
  });
</script>

<RangeCalendar bind:value class="rounded-md border" />
```

### Example 2

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";

  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });

  let value = $state({
    start,
    end
  });
</script>

<RangeCalendar bind:value class="rounded-md border" />
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add range-calendar
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add range-calendar
```

### Example 5

```python
npx shadcn-svelte@latest add range-calendar
```

### Example 6

```python
npx shadcn-svelte@latest add range-calendar
```

### Example 7

```python
npx shadcn-svelte@latest add range-calendar
```

### Example 8

```python
npx shadcn-svelte@latest add range-calendar
```

### Example 9

```python
bun x shadcn-svelte@latest add range-calendar
```

### Example 10

```python
bun x shadcn-svelte@latest add range-calendar
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

```sql
import Root from "./range-calendar.svelte";
import Cell from "./range-calendar-cell.svelte";
import Day from "./range-calendar-day.svelte";
import Grid from "./range-calendar-grid.svelte";
import Header from "./range-calendar-header.svelte";
import Months from "./range-calendar-months.svelte";
import GridRow from "./range-calendar-grid-row.svelte";
import Heading from "./range-calendar-heading.svelte";
import HeadCell from "./range-calendar-head-cell.svelte";
import NextButton from "./range-calendar-next-button.svelte";
import PrevButton from "./range-calendar-prev-button.svelte";
import MonthSelect from "./range-calendar-month-select.svelte";
import YearSelect from "./range-calendar-year-select.svelte";
import Caption from "./range-calendar-caption.svelte";
import Nav from "./range-calendar-nav.svelte";
import Month from "./range-calendar-month.svelte";
import GridBody from "./range-calendar-grid-body.svelte";
import GridHead from "./range-calendar-grid-head.svelte";

export {
  Day,
  Cell,
  Grid,
  Header,
  Months,
  GridRow,
  Heading,
  GridBody,
  GridHead,
  HeadCell,
  NextButton,
  PrevButton,
  MonthSelect,
  YearSelect,
  Caption,
  Nav,
  Month,
  //
  Root as RangeCalendar,
};
```

### Example 20

```sql
import Root from "./range-calendar.svelte";
import Cell from "./range-calendar-cell.svelte";
import Day from "./range-calendar-day.svelte";
import Grid from "./range-calendar-grid.svelte";
import Header from "./range-calendar-header.svelte";
import Months from "./range-calendar-months.svelte";
import GridRow from "./range-calendar-grid-row.svelte";
import Heading from "./range-calendar-heading.svelte";
import HeadCell from "./range-calendar-head-cell.svelte";
import NextButton from "./range-calendar-next-button.svelte";
import PrevButton from "./range-calendar-prev-button.svelte";
import MonthSelect from "./range-calendar-month-select.svelte";
import YearSelect from "./range-calendar-year-select.svelte";
import Caption from "./range-calendar-caption.svelte";
import Nav from "./range-calendar-nav.svelte";
import Month from "./range-calendar-month.svelte";
import GridBody from "./range-calendar-grid-body.svelte";
import GridHead from "./range-calendar-grid-head.svelte";

export {
  Day,
  Cell,
  Grid,
  Header,
  Months,
  GridRow,
  Heading,
  GridBody,
  GridHead,
  HeadCell,
  NextButton,
  PrevButton,
  MonthSelect,
  YearSelect,
  Caption,
  Nav,
  Month,
  //
  Root as RangeCalendar,
};
```

## Sections

## About

## Blocks

## Installation
