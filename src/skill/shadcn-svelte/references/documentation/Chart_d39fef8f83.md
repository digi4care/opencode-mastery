# Chart

**Source**: https://www.shadcn-svelte.com/docs/components/chart

## Table of Contents

- [Component](#component)
- [Installation](#installation)
- [Your First Chart](#your-first-chart)
  - [Start by defining your data](#start-by-defining-your-data)
  - [Define your chart config](#define-your-chart-config)
  - [Build your chart](#build-your-chart)
  - [Adjusting the Axis Ticks](#adjusting-the-axis-ticks)
  - [Add a custom formatter to the x axis](#add-a-custom-formatter-to-the-x-axis)
  - [Add Tooltip](#add-tooltip)
  - [Add the Chart.Tooltip component to the chart](#add-the-chart.tooltip-component-to-the-chart)
  - [Add Legend](#add-legend)
  - [Set the legend prop to true](#set-the-legend-prop-to-true)
- [Chart Config](#chart-config)
- [Theming](#theming)
  - [CSS Variables](#css-variables)
  - [Define your colors in your css file](#define-your-colors-in-your-css-file)
  - [Add the color to your chartConfig](#add-the-color-to-your-chartconfig)
  - [hex, hsl or oklch](#hex,-hsl-or-oklch)
  - [Using Colors](#using-colors)
    - [Components](#components)
    - [Chart Data](#chart-data)
    - [Tailwind](#tailwind)
- [Tooltip](#tooltip)
  - [Props](#props)
  - [Colors](#colors)
  - [Custom](#custom)

## Content

Beautiful charts. Built using LayerChart. Copy and paste into your apps.

Important: LayerChart v2 is still in pre-release and is actively evolving. Only use if you're comfortable with potential breaking changes before stable v2.

Your feedback will be invaluable in shaping the release and features. Current development status can be tracked here.

Showing total visitors for the last 3 months

Introducing Charts. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with other components are are fully customizable to fit your project.

Browse the Charts Library

We use LayerChart under the hood.

We designed the Chart component with composition in mind. You build your charts using LayerChart components and only bring in custom components, such as ChartTooltip, when and where you need it

We do not wrap LayerChart. This means you're not locked into an abstraction. When a new LayerChart version is released, you can follow the official upgrade path to upgrade your charts.

The components are yours.

Add the following colors to your CSS file

Copy and paste the following code into your project.

Let's build your first chart. We'll build a bar chart with an axis, grid, tooltip, and legend.

The following data represents the number of desktop and mobile users for each month.

Note: Your data can be in any shape. You are not limited to the shape of the data below. Use the dataKey prop to map your data to the chart.

The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons, and color tokens for theming.

You can now build your chart using LayerChart components. We're using the BarChart component in this example, which is one of LayerChart's "Simplified Charts".

These components handle a lot of the common chart scaffolding for you, while allowing you to customize them to your liking.

We now have a group-stacked bar chart with an x axis and a grid.

Our bar chart is currently displaying the full month name for each tick on the x axis. Let's shorten it to just the first three letters.

The props prop is how you can pass custom props to the various components that make up the chart. Here we're passing a custom formatter to the x axis.

So far we've only used the BarChart component from LayerChart. They look great out of the box thanks to some customizations in the chart component.

To add a tooltip, we'll use the custom Chart.Tooltip component from chart.

We'll replace the tooltip={false} prop with the tooltip snippet where we'll place the Chart.Tooltip component.

The legend prop is used to show a legend for the chart. We are working with LayerChart to add a payload similar to the tooltip so we can more easily create a custom legend.

Done. You've built your first chart! What's next?

The chart config is where you define the labels, icons and colors for a chart.

It is intentionally decoupled from chart data.

This allows you to share config and color tokens between charts. It can also works independently for cases where your data or color tokens live remotely or in a different format.

Charts has built-in support for theming. You can use css variables (recommended) or color values in any color format, such as hex, hsl, or oklch.

You can also define your colors directly in the chart config. Use the color format you prefer.

To use the theme colors in your chart, reference the colors using the format var(--color-KEY).

A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.

You can turn on/off any of these using the hideLabel, hideIndicator props and customize the indicator style using the indicator prop.

Use labelKey and nameKey to use a custom key for the tooltip label and name.

Chart comes with the <Chart.Tooltip> component. You can use this component to add custom tooltips to your chart.

Use the following props to customize the tooltip.

Colors are automatically referenced from the chart config.

To use a custom key for tooltip label and names, use the labelKey and nameKey props.

This will use Total Visitors for label and Chrome and Safari for the tooltip names.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { BarChart } from "layerchart";

  const data = [
    // ...
  ];
</script>

<Chart.Container>
  <BarChart {data} x="date" y="value">
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 2

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { BarChart } from "layerchart";

  const data = [
    // ...
  ];
</script>

<Chart.Container>
  <BarChart {data} x="date" y="value">
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add chart
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add chart
```

### Example 5

```python
npx shadcn-svelte@latest add chart
```

### Example 6

```python
npx shadcn-svelte@latest add chart
```

### Example 7

```python
npx shadcn-svelte@latest add chart
```

### Example 8

```python
npx shadcn-svelte@latest add chart
```

### Example 9

```python
bun x shadcn-svelte@latest add chart
```

### Example 10

```python
bun x shadcn-svelte@latest add chart
```

### Example 11

```python
pnpm i layerchart@next -D
```

### Example 12

```python
pnpm i layerchart@next -D
```

### Example 13

```python
npm i layerchart@next -D
```

### Example 14

```python
npm i layerchart@next -D
```

### Example 15

```python
yarn install layerchart@next -D
```

### Example 16

```python
yarn install layerchart@next -D
```

### Example 17

```python
bun install layerchart@next -D
```

### Example 18

```python
bun install layerchart@next -D
```

### Example 19

```css
:root {
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}

@theme inline {
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
}
```

### Example 20

```css
:root {
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
  --chart-3: oklch(0.398 0.07 227.392);
  --chart-4: oklch(0.828 0.189 84.429);
  --chart-5: oklch(0.769 0.188 70.08);
}

.dark {
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
  --chart-3: oklch(0.769 0.188 70.08);
  --chart-4: oklch(0.627 0.265 303.9);
  --chart-5: oklch(0.645 0.246 16.439);
}

@theme inline {
  --color-chart-1: var(--chart-1);
  --color-chart-2: var(--chart-2);
  --color-chart-3: var(--chart-3);
  --color-chart-4: var(--chart-4);
  --color-chart-5: var(--chart-5);
}
```

### Example 21

```jsx
<script lang="ts">
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
</script>
```

### Example 22

```jsx
<script lang="ts">
  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 },
  ];
</script>
```

### Example 23

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 24

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 25

```typescript
<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import ChartStyle from "./chart-style.svelte";
  import { setChartContext, type ChartConfig } from "./chart-utils.js";

  const uid = $props.id();

  let {
    ref = $bindable(null),
    id = uid,
    class: className,
    children,
    config,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    config: ChartConfig;
  } = $props();

  const chartId = `chart-${id || uid.replace(/:/g, "")}`;

  setChartContext({
    get config() {
      return config;
    },
  });
</script>

<div
  bind:this={ref}
  data-chart={chartId}
  data-slot="chart"
  class={cn(
    "flex aspect-video justify-center overflow-visible text-xs",
    // Overrides
    //
    // Stroke around dots/marks when hovering
    "[&_.lc-highlight-point]:stroke-transparent",
    // override the default stroke color of lines
    "[&_.lc-line]:stroke-border/50",

    // by default, layerchart shows a line intersecting the point when hovering, this hides that
    "[&_.lc-highlight-line]:stroke-0",

    // by default, when you hover a point on a stacked series chart, it will drop the opacity
    // of the other series, this overrides that
    "[&_.lc-area-path]:opacity-100 [&_.lc-highlight-line]:opacity-100 [&_.lc-highlight-point]:opacity-100 [&_.lc-spline-path]:opacity-100 [&_.lc-text]:text-xs [&_.lc-text-svg]:overflow-visible",

    // We don't want the little tick lines between the axis labels and the chart, so we remove
    // the stroke. The alternative is to manually disable `tickMarks` on the x/y axis of every
    // chart.
    "[&_.lc-axis-tick]:stroke-0",

    // We don't want to display the rule on the x/y axis, as there is already going to be
    // a grid line there and rule ends up overlapping the marks because it is rendered after
    // the marks
    "[&_.lc-rule-x-line:not(.lc-grid-x-rule)]:stroke-0 [&_.lc-rule-y-line:not(.lc-grid-y-rule)]:stroke-0",
    "[&_.lc-grid-x-radial-line]:stroke-border [&_.lc-grid-x-radial-circle]:stroke-border",
    "[&_.lc-grid-y-radial-line]:stroke-border [&_.lc-grid-y-radial-circle]:stroke-border",

    // Legend adjustments
    "[&_.lc-legend-swatch-button]:items-center [&_.lc-legend-swatch-button]:gap-1.5",
    "[&_.lc-legend-swatch-group]:items-center [&_.lc-legend-swatch-group]:gap-4",
    "[&_.lc-legend-swatch]:size-2.5 [&_.lc-legend-swatch]:rounded-[2px]",

    // Labels
    "[&_.lc-labels-text:not([fill])]:fill-foreground [&_text]:stroke-transparent",

    // Tick labels on th x/y axes
    "[&_.lc-axis-tick-label]:fill-muted-foreground [&_.lc-axis-tick-label]:font-normal",
    "[&_.lc-tooltip-rects-g]:fill-transparent",
    "[&_.lc-layout-svg-g]:fill-transparent",
    "[&_.lc-root-container]:w-full",
    className
  )}
  {...restProps}
>
  <ChartStyle id={chartId} {config} />
  {@render children?.()}
</div>
```

### Example 26

```typescript
<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";
  import ChartStyle from "./chart-style.svelte";
  import { setChartContext, type ChartConfig } from "./chart-utils.js";

  const uid = $props.id();

  let {
    ref = $bindable(null),
    id = uid,
    class: className,
    children,
    config,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLElement>> & {
    config: ChartConfig;
  } = $props();

  const chartId = `chart-${id || uid.replace(/:/g, "")}`;

  setChartContext({
    get config() {
      return config;
    },
  });
</script>

<div
  bind:this={ref}
  data-chart={chartId}
  data-slot="chart"
  class={cn(
    "flex aspect-video justify-center overflow-visible text-xs",
    // Overrides
    //
    // Stroke around dots/marks when hovering
    "[&_.lc-highlight-point]:stroke-transparent",
    // override the default stroke color of lines
    "[&_.lc-line]:stroke-border/50",

    // by default, layerchart shows a line intersecting the point when hovering, this hides that
    "[&_.lc-highlight-line]:stroke-0",

    // by default, when you hover a point on a stacked series chart, it will drop the opacity
    // of the other series, this overrides that
    "[&_.lc-area-path]:opacity-100 [&_.lc-highlight-line]:opacity-100 [&_.lc-highlight-point]:opacity-100 [&_.lc-spline-path]:opacity-100 [&_.lc-text]:text-xs [&_.lc-text-svg]:overflow-visible",

    // We don't want the little tick lines between the axis labels and the chart, so we remove
    // the stroke. The alternative is to manually disable `tickMarks` on the x/y axis of every
    // chart.
    "[&_.lc-axis-tick]:stroke-0",

    // We don't want to display the rule on the x/y axis, as there is already going to be
    // a grid line there and rule ends up overlapping the marks because it is rendered after
    // the marks
    "[&_.lc-rule-x-line:not(.lc-grid-x-rule)]:stroke-0 [&_.lc-rule-y-line:not(.lc-grid-y-rule)]:stroke-0",
    "[&_.lc-grid-x-radial-line]:stroke-border [&_.lc-grid-x-radial-circle]:stroke-border",
    "[&_.lc-grid-y-radial-line]:stroke-border [&_.lc-grid-y-radial-circle]:stroke-border",

    // Legend adjustments
    "[&_.lc-legend-swatch-button]:items-center [&_.lc-legend-swatch-button]:gap-1.5",
    "[&_.lc-legend-swatch-group]:items-center [&_.lc-legend-swatch-group]:gap-4",
    "[&_.lc-legend-swatch]:size-2.5 [&_.lc-legend-swatch]:rounded-[2px]",

    // Labels
    "[&_.lc-labels-text:not([fill])]:fill-foreground [&_text]:stroke-transparent",

    // Tick labels on th x/y axes
    "[&_.lc-axis-tick-label]:fill-muted-foreground [&_.lc-axis-tick-label]:font-normal",
    "[&_.lc-tooltip-rects-g]:fill-transparent",
    "[&_.lc-layout-svg-g]:fill-transparent",
    "[&_.lc-root-container]:w-full",
    className
  )}
  {...restProps}
>
  <ChartStyle id={chartId} {config} />
  {@render children?.()}
</div>
```

### Example 27

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    tooltip={false}
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
  />
</Chart.Container>
```

### Example 28

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    tooltip={false}
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
  />
</Chart.Container>
```

### Example 29

```jsx
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    tooltip={false}
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color,
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color,
      },
    ]}
    props={{
      xAxis: {
        format: d => d.slice(0, 3),
      },
    }}
  />
</Chart.Container>
```

### Example 30

```jsx
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    tooltip={false}
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color,
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color,
      },
    ]}
    props={{
      xAxis: {
        format: d => d.slice(0, 3),
      },
    }}
  />
</Chart.Container>
```

### Example 31

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    tooltip={false}
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
    props={{
      xAxis: {
        format: (d) => d.slice(0, 3)
      }
    }}
  />
</Chart.Container>
```

### Example 32

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    tooltip={false}
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
    props={{
      xAxis: {
        format: (d) => d.slice(0, 3)
      }
    }}
  />
</Chart.Container>
```

### Example 33

```jsx
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color,
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color,
      },
    ]}
    props={{
      xAxis: {
        format: (d) => d.slice(0, 3),
      },
    }}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 34

```jsx
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color,
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color,
      },
    ]}
    props={{
      xAxis: {
        format: (d) => d.slice(0, 3),
      },
    }}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 35

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 36

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 37

```jsx
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    legend
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color,
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color,
      },
    ]}
    props={{
      xAxis: {
        format: (d) => d.slice(0, 3),
      },
    }}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 38

```jsx
<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    legend
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color,
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color,
      },
    ]}
    props={{
      xAxis: {
        format: (d) => d.slice(0, 3),
      },
    }}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 39

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    legend
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 40

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { scaleBand } from "d3-scale";
  import { BarChart } from "layerchart";

  const chartData = [
    { month: "January", desktop: 186, mobile: 80 },
    { month: "February", desktop: 305, mobile: 200 },
    { month: "March", desktop: 237, mobile: 120 },
    { month: "April", desktop: 73, mobile: 190 },
    { month: "May", desktop: 209, mobile: 130 },
    { month: "June", desktop: 214, mobile: 140 }
  ];

  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb"
    },
    mobile: {
      label: "Mobile",
      color: "#60a5fa"
    }
  } satisfies Chart.ChartConfig;
</script>

<Chart.Container config={chartConfig} class="min-h-[200px] w-full">
  <BarChart
    data={chartData}
    xScale={scaleBand().padding(0.25)}
    x="month"
    axis="x"
    seriesLayout="group"
    legend
    series={[
      {
        key: "desktop",
        label: chartConfig.desktop.label,
        color: chartConfig.desktop.color
      },
      {
        key: "mobile",
        label: chartConfig.mobile.label,
        color: chartConfig.mobile.color
      }
    ]}
  >
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

### Example 41

```jsx
<script lang="ts">
  import MonitorIcon from "@lucide/svelte/icons/monitor";
  import * as Chart from "$lib/components/ui/chart/index.js";

  const chartConfig = {
    desktop: {
      label: "Desktop",
      icon: MonitorIcon,
      // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
      color: "#2563eb",
      // OR a theme object with 'light' and 'dark' keys
      theme: {
        light: "#2563eb",
        dark: "#dc2626",
      },
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 42

```jsx
<script lang="ts">
  import MonitorIcon from "@lucide/svelte/icons/monitor";
  import * as Chart from "$lib/components/ui/chart/index.js";

  const chartConfig = {
    desktop: {
      label: "Desktop",
      icon: MonitorIcon,
      // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
      color: "#2563eb",
      // OR a theme object with 'light' and 'dark' keys
      theme: {
        light: "#2563eb",
        dark: "#dc2626",
      },
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 43

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
}
```

### Example 44

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  /* ... */
  --chart-1: oklch(0.646 0.222 41.116);
  --chart-2: oklch(0.6 0.118 184.704);
}

.dark {
  --background: oklch(0.145 0 0);
  --foreground: oklch(0.985 0 0);
  /* ... */
  --chart-1: oklch(0.488 0.243 264.376);
  --chart-2: oklch(0.696 0.17 162.48);
}
```

### Example 45

```jsx
<script lang="ts">
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 46

```jsx
<script lang="ts">
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "var(--chart-1)",
    },
    mobile: {
      label: "Mobile",
      color: "var(--chart-2)",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 47

```jsx
<script lang="ts">
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 48

```jsx
<script lang="ts">
  const chartConfig = {
    desktop: {
      label: "Desktop",
      color: "#2563eb",
    },
  } satisfies Chart.ChartConfig;
</script>
```

### Example 49

```jsx
<Bar fill="var(--color-desktop)" />
```

### Example 50

```jsx
<Bar fill="var(--color-desktop)" />
```

### Example 51

```json
const chartData = [
  { browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, color: "var(--color-safari)" },
];
```

### Example 52

```json
const chartData = [
  { browser: "chrome", visitors: 275, color: "var(--color-chrome)" },
  { browser: "safari", visitors: 200, color: "var(--color-safari)" },
];
```

### Example 53

```jsx
<Label class="fill-(--color-desktop)" />
```

### Example 54

```jsx
<Label class="fill-(--color-desktop)" />
```

### Example 55

```json
<script lang="ts">
  import TooltipDemo from "$lib/components/chart-tooltip-demo-item.svelte";
</script>

<div
  class="text-foreground grid aspect-video w-full max-w-md justify-center md:grid-cols-2 [&>div]:relative [&>div]:flex [&>div]:h-[137px] [&>div]:w-[224px] [&>div]:items-center [&>div]:justify-center [&>div]:p-4"
>
  <div>
    <div class="absolute start-[-35px] top-[45px] z-10 text-sm font-medium">
      Label
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 193 40"
      width="50"
      height="12"
      fill="none"
      class="absolute start-[5px] top-[50px] z-10"
    >
      <g clip-path="url(#a)">
        <path
          fill="currentColor"
          d="M173.928 21.13C115.811 44.938 58.751 45.773 0 26.141c4.227-4.386 7.82-2.715 10.567-1.88 21.133 5.64 42.9 6.266 64.457 7.101 31.066 1.253 60.441-5.848 89.183-17.335 1.268-.418 2.325-1.253 4.861-2.924-14.582-2.924-29.165 2.089-41.845-3.76.212-.835.212-1.879.423-2.714 9.51-.627 19.231-1.253 28.742-2.089 9.51-.835 18.808-1.88 28.318-2.506 6.974-.418 9.933 2.924 7.397 9.19-3.17 8.145-7.608 15.664-11.623 23.391-.423.836-1.057 1.88-1.902 2.298-2.325.835-4.65 1.044-7.186 1.67-.422-2.088-1.479-4.386-1.268-6.265.423-2.506 1.902-4.595 3.804-9.19Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h193v40H0z" />
        </clipPath>
      </defs>
    </svg>
    <TooltipDemo
      label="Page Views"
      payload={[
        { name: "Desktop", value: 186, color: "var(--chart-1)" },
        { name: "Mobile", value: 80, color: "var(--chart-2)" }
      ]}
      class="w-[8rem]"
    />
  </div>
  <div class="items-end">
    <div class="absolute start-[122px] top-[0px] z-10 text-sm font-medium">
      Name
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="42"
      fill="none"
      viewBox="0 0 122 148"
      class="absolute start-[85px] top-[10px] z-10 -scale-x-100"
    >
      <g clip-path="url(#ab)">
        <path
          fill="currentColor"
          d="M0 2.65c6.15-4.024 12.299-2.753 17.812-.847a115.56 115.56 0 0 1 21.84 10.59C70.4 32.727 88.849 61.744 96.483 97.54c1.908 9.108 2.544 18.639 3.817 29.017 8.481-4.871 12.934-14.402 21.416-19.909 1.061 4.236-1.06 6.989-2.756 9.319-6.998 9.531-14.207 19.062-21.63 28.382-3.604 4.448-6.36 4.871-10.177 1.059-8.058-7.837-12.935-17.368-14.42-28.382 0-.424.636-1.059 1.485-2.118 9.118 2.33 6.997 13.979 14.843 18.215 3.393-14.614.848-28.593-2.969-42.149-4.029-14.19-9.33-27.746-17.812-39.82-8.27-11.86-18.66-21.392-30.11-30.287C26.93 11.758 14.207 6.039 0 2.65Z"
        />
      </g>
      <defs>
        <clipPath id="ab">
          <path fill="currentColor" d="M0 0h122v148H0z" />
        </clipPath>
      </defs>
    </svg>
    <TooltipDemo
      label="Browser"
      hideLabel
      payload={[
        { name: "Chrome", value: 1286, color: "var(--chart-3)" },
        { name: "Firefox", value: 1000, color: "var(--chart-4)" }
      ]}
      indicator="dashed"
      class="w-[8rem]"
    />
  </div>
  <div class="!hidden md:!flex">
    <TooltipDemo
      label="Page Views"
      payload={[{ name: "Desktop", value: 12486, color: "var(--chart-3)" }]}
      class="w-[9rem]"
      indicator="line"
    />
  </div>
  <div class="!items-start !justify-start">
    <div class="absolute start-[50px] top-[60px] z-10 text-sm font-medium">
      Indicator
    </div>
    <TooltipDemo
      label="Browser"
      hideLabel
      payload={[{ name: "Chrome", value: 1286, color: "var(--chart-1)" }]}
      indicator="dot"
      class="w-[8rem]"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="34"
      fill="none"
      viewBox="0 0 75 175"
      class="absolute start-[30px] top-[38px] z-10 rotate-[-40deg]"
    >
      <g clip-path="url(#abc)">
        <path
          fill="currentColor"
          d="M20.187 175c-4.439-2.109-7.186-2.531-8.032-4.008-3.17-5.484-6.763-10.968-8.454-17.084-5.073-16.242-4.439-32.694-1.057-49.146 5.707-28.053 18.388-52.942 34.24-76.565 1.692-2.531 3.171-5.063 4.862-7.805 0-.21-.211-.632-.634-1.265-4.65 1.265-9.511 2.53-14.161 3.585-2.537.422-5.496.422-8.032-.421-1.48-.422-3.593-2.742-3.593-4.219 0-1.898 1.48-4.218 2.747-5.906 1.057-1.054 2.96-1.265 4.65-1.687C35.406 7.315 48.088 3.729 60.98.776c10.99-2.53 14.584 1.055 13.95 11.812-.634 11.18-.846 22.358-1.268 33.326-.212 3.375-.846 6.96-1.268 10.757-8.878-4.007-8.878-4.007-12.048-38.177C47.03 33.259 38.153 49.289 29.91 65.741 21.667 82.193 16.17 99.49 13.212 117.84c-2.959 18.984.634 36.912 6.975 57.161Z"
        />
      </g>
      <defs>
        <clipPath id="abc">
          <path fill="currentColor" d="M0 0h75v175H0z" />
        </clipPath>
      </defs>
    </svg>
  </div>
</div>
```

### Example 56

```json
<script lang="ts">
  import TooltipDemo from "$lib/components/chart-tooltip-demo-item.svelte";
</script>

<div
  class="text-foreground grid aspect-video w-full max-w-md justify-center md:grid-cols-2 [&>div]:relative [&>div]:flex [&>div]:h-[137px] [&>div]:w-[224px] [&>div]:items-center [&>div]:justify-center [&>div]:p-4"
>
  <div>
    <div class="absolute start-[-35px] top-[45px] z-10 text-sm font-medium">
      Label
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 193 40"
      width="50"
      height="12"
      fill="none"
      class="absolute start-[5px] top-[50px] z-10"
    >
      <g clip-path="url(#a)">
        <path
          fill="currentColor"
          d="M173.928 21.13C115.811 44.938 58.751 45.773 0 26.141c4.227-4.386 7.82-2.715 10.567-1.88 21.133 5.64 42.9 6.266 64.457 7.101 31.066 1.253 60.441-5.848 89.183-17.335 1.268-.418 2.325-1.253 4.861-2.924-14.582-2.924-29.165 2.089-41.845-3.76.212-.835.212-1.879.423-2.714 9.51-.627 19.231-1.253 28.742-2.089 9.51-.835 18.808-1.88 28.318-2.506 6.974-.418 9.933 2.924 7.397 9.19-3.17 8.145-7.608 15.664-11.623 23.391-.423.836-1.057 1.88-1.902 2.298-2.325.835-4.65 1.044-7.186 1.67-.422-2.088-1.479-4.386-1.268-6.265.423-2.506 1.902-4.595 3.804-9.19Z"
        />
      </g>
      <defs>
        <clipPath id="a">
          <path fill="currentColor" d="M0 0h193v40H0z" />
        </clipPath>
      </defs>
    </svg>
    <TooltipDemo
      label="Page Views"
      payload={[
        { name: "Desktop", value: 186, color: "var(--chart-1)" },
        { name: "Mobile", value: 80, color: "var(--chart-2)" }
      ]}
      class="w-[8rem]"
    />
  </div>
  <div class="items-end">
    <div class="absolute start-[122px] top-[0px] z-10 text-sm font-medium">
      Name
    </div>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="42"
      fill="none"
      viewBox="0 0 122 148"
      class="absolute start-[85px] top-[10px] z-10 -scale-x-100"
    >
      <g clip-path="url(#ab)">
        <path
          fill="currentColor"
          d="M0 2.65c6.15-4.024 12.299-2.753 17.812-.847a115.56 115.56 0 0 1 21.84 10.59C70.4 32.727 88.849 61.744 96.483 97.54c1.908 9.108 2.544 18.639 3.817 29.017 8.481-4.871 12.934-14.402 21.416-19.909 1.061 4.236-1.06 6.989-2.756 9.319-6.998 9.531-14.207 19.062-21.63 28.382-3.604 4.448-6.36 4.871-10.177 1.059-8.058-7.837-12.935-17.368-14.42-28.382 0-.424.636-1.059 1.485-2.118 9.118 2.33 6.997 13.979 14.843 18.215 3.393-14.614.848-28.593-2.969-42.149-4.029-14.19-9.33-27.746-17.812-39.82-8.27-11.86-18.66-21.392-30.11-30.287C26.93 11.758 14.207 6.039 0 2.65Z"
        />
      </g>
      <defs>
        <clipPath id="ab">
          <path fill="currentColor" d="M0 0h122v148H0z" />
        </clipPath>
      </defs>
    </svg>
    <TooltipDemo
      label="Browser"
      hideLabel
      payload={[
        { name: "Chrome", value: 1286, color: "var(--chart-3)" },
        { name: "Firefox", value: 1000, color: "var(--chart-4)" }
      ]}
      indicator="dashed"
      class="w-[8rem]"
    />
  </div>
  <div class="!hidden md:!flex">
    <TooltipDemo
      label="Page Views"
      payload={[{ name: "Desktop", value: 12486, color: "var(--chart-3)" }]}
      class="w-[9rem]"
      indicator="line"
    />
  </div>
  <div class="!items-start !justify-start">
    <div class="absolute start-[50px] top-[60px] z-10 text-sm font-medium">
      Indicator
    </div>
    <TooltipDemo
      label="Browser"
      hideLabel
      payload={[{ name: "Chrome", value: 1286, color: "var(--chart-1)" }]}
      indicator="dot"
      class="w-[8rem]"
    />
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="15"
      height="34"
      fill="none"
      viewBox="0 0 75 175"
      class="absolute start-[30px] top-[38px] z-10 rotate-[-40deg]"
    >
      <g clip-path="url(#abc)">
        <path
          fill="currentColor"
          d="M20.187 175c-4.439-2.109-7.186-2.531-8.032-4.008-3.17-5.484-6.763-10.968-8.454-17.084-5.073-16.242-4.439-32.694-1.057-49.146 5.707-28.053 18.388-52.942 34.24-76.565 1.692-2.531 3.171-5.063 4.862-7.805 0-.21-.211-.632-.634-1.265-4.65 1.265-9.511 2.53-14.161 3.585-2.537.422-5.496.422-8.032-.421-1.48-.422-3.593-2.742-3.593-4.219 0-1.898 1.48-4.218 2.747-5.906 1.057-1.054 2.96-1.265 4.65-1.687C35.406 7.315 48.088 3.729 60.98.776c10.99-2.53 14.584 1.055 13.95 11.812-.634 11.18-.846 22.358-1.268 33.326-.212 3.375-.846 6.96-1.268 10.757-8.878-4.007-8.878-4.007-12.048-38.177C47.03 33.259 38.153 49.289 29.91 65.741 21.667 82.193 16.17 99.49 13.212 117.84c-2.959 18.984.634 36.912 6.975 57.161Z"
        />
      </g>
      <defs>
        <clipPath id="abc">
          <path fill="currentColor" d="M0 0h75v175H0z" />
        </clipPath>
      </defs>
    </svg>
  </div>
</div>
```

### Example 57

```jsx
<script lang="ts">
  const chartData = [
    { browser: "chrome", visitors: 187, color: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, color: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Total Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;
</script>

<Chart.Tooltip labelKey="visitors" nameKey="browser" />
```

### Example 58

```jsx
<script lang="ts">
  const chartData = [
    { browser: "chrome", visitors: 187, color: "var(--color-chrome)" },
    { browser: "safari", visitors: 200, color: "var(--color-safari)" },
  ];

  const chartConfig = {
    visitors: {
      label: "Total Visitors",
    },
    chrome: {
      label: "Chrome",
      color: "var(--chart-1)",
    },
    safari: {
      label: "Safari",
      color: "var(--chart-2)",
    },
  } satisfies ChartConfig;
</script>

<Chart.Tooltip labelKey="visitors" nameKey="browser" />
```

## Sections

## Component

## Installation

## Your First Chart

### Start by defining your data

### Define your chart config

### Build your chart

### Adjusting the Axis Ticks

### Add a custom formatter to the x axis

### Add Tooltip

### Add the Chart.Tooltip component to the chart

### Add Legend

### Set the legend prop to true

## Chart Config

## Theming

### CSS Variables

### Define your colors in your css file

### Add the color to your chartConfig

### hex, hsl or oklch

### Using Colors

#### Components

#### Chart Data

#### Tailwind

## Tooltip

### Props

### Colors

### Custom
