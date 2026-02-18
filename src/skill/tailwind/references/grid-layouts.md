# Grid Layouts

Comprehensive guide to Tailwind CSS grid layouts.

## Basic Grid

```jsx
<div class="grid grid-cols-2 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
</div>

<div class="grid grid-cols-3 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
</div>

<div class="grid grid-cols-4 gap-4">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  <div>Item 4</div>
</div>
```

## Grid with Spans

```jsx
<div class="grid grid-cols-4 gap-4">
  <div class="col-span-1">1 column</div>
  <div class="col-span-2">2 columns (wide)</div>
  <div class="col-span-1">1 column</div>

  <div class="col-span-4 full-width">4 columns (full)</div>
</div>
```

## Grid with Rows

```jsx
<div class="grid grid-cols-3 grid-rows-2 gap-4">
  <div class="col-span-2 row-span-2">Spans 2 rows</div>
  <div>Row 1, Col 3</div>
  <div>Row 2, Col 3</div>
</div>
```

## Responsive Grid

```jsx
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
  <div>Adapts to screen size</div>
</div>
```

## Grid Auto Flow

```jsx
/* Dense packing */
<div class="grid grid-cols-3 grid-flow-dense gap-4">
  <div class="col-span-2 row-span-2">Large</div>
  <div class="col-span-1">Small</div>
  <div class="col-span-1">Small</div>
</div>

/* Auto columns */
<div class="grid auto-cols-min gap-4">
  <div>Auto sized</div>
</div>
```

## Grid Gap

```jsx
<div class="grid grid-cols-2 gap-2">     /* gap-2 (0.5rem) */
<div class="grid grid-cols-2 gap-4">     /* gap-4 (1rem) */
<div class="grid grid-cols-2 gap-6">     /* gap-6 (1.5rem) */
<div class="grid grid-cols-2 gap-x-8 gap-y-4"> /* Different row/col gap */
```
