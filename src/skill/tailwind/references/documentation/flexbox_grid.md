# Tailwind_Docs - Flexbox Grid

**Pages:** 28

---

## flex-basis

**URL:** https://tailwindcss.com/docs/flex-basis

**Contents:**
- Examples
  - Using the spacing scale
  - Using the container scale
  - Using percentages
  - Using a custom value
  - Responsive design
- Customizing your theme

Use basis-<number> utilities like basis-64 and basis-128 to set the initial size of flex items based on the spacing scale:

Use utilities like basis-xs and basis-sm to set the initial size of flex items based on the container scale:

Use basis-<fraction> utilities like basis-1/2 and basis-2/3 to set the initial size of flex items:

Use the basis-[<value>] syntax to set the basis based on a completely custom value:

For CSS variables, you can also use the basis-(<custom-property>) syntax:

This is just a shorthand for basis-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a flex-basis utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --container-* theme variables to customize the fixed-width basis utilities in your project:

Now the basis-4xs utility can be used in your markup:

The basis-<number> utilities are driven by the --spacing theme variable, which you can also customize:

Learn more about customizing the spacing scale in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex flex-row">  <div class="basis-64">01</div>  <div class="basis-64">02</div>  <div class="basis-128">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex flex-row">  <div class="basis-64">01</div>  <div class="basis-64">02</div>  <div class="basis-128">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex flex-row">  <div class="basis-3xs">01</div>  <div class="basis-2xs">02</div>  <div class="basis-xs">03</div>  <div class="basis-sm">04</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex flex-row">  <div class="basis-3xs">01</div>  <div class="basis-2xs">02</div>  <div class="basis-xs">03</div>  <div class="basis-sm">04</div></div>
```

---

## flex-direction

**URL:** https://tailwindcss.com/docs/flex-direction

**Contents:**
- Examples
  - Row
  - Row reversed
  - Column
  - Column reversed
  - Responsive design

Use flex-row to position flex items horizontally in the same direction as text:

Use flex-row-reverse to position flex items horizontally in the opposite direction:

Use flex-col to position flex items vertically:

Use flex-col-reverse to position flex items vertically in the opposite direction:

Prefix a flex-direction utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex flex-row ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex flex-row ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex flex-row-reverse ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex flex-row-reverse ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

---

## flex-wrap

**URL:** https://tailwindcss.com/docs/flex-wrap

**Contents:**
- Examples
  - Don't wrap
  - Wrap normally
  - Wrap reversed
  - Responsive design

Use flex-nowrap to prevent flex items from wrapping, causing inflexible items to overflow the container if necessary:

Use flex-wrap to allow flex items to wrap:

Use flex-wrap-reverse to wrap flex items in the reverse direction:

Prefix a flex-wrap utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex flex-nowrap">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex flex-nowrap">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex flex-wrap">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex flex-wrap">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

---

## flex

**URL:** https://tailwindcss.com/docs/flex

**Contents:**
- Examples
  - Basic example
  - Initial
  - Auto
  - None
  - Using a custom value
  - Responsive design

Use flex-<number> utilities like flex-1 to allow a flex item to grow and shrink as needed, ignoring its initial size:

Use flex-initial to allow a flex item to shrink but not grow, taking into account its initial size:

Use flex-auto to allow a flex item to grow and shrink, taking into account its initial size:

Use flex-none to prevent a flex item from growing or shrinking:

Use the flex-[<value>] syntax to set the flex shorthand property based on a completely custom value:

For CSS variables, you can also use the flex-(<custom-property>) syntax:

This is just a shorthand for flex-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a flex utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-1 ...">02</div>  <div class="w-32 flex-1 ...">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-1 ...">02</div>  <div class="w-32 flex-1 ...">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-initial ...">02</div>  <div class="w-32 flex-initial ...">03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex">  <div class="w-14 flex-none ...">01</div>  <div class="w-64 flex-initial ...">02</div>  <div class="w-32 flex-initial ...">03</div></div>
```

---

## flex-grow

**URL:** https://tailwindcss.com/docs/flex-grow

**Contents:**
- Examples
  - Allowing items to grow
  - Growing items based on factor
  - Preventing items from growing
  - Using a custom value
  - Responsive design

Use grow to allow a flex item to grow to fill any available space:

Use grow-<number> utilities like grow-3 to make flex items grow proportionally based on their growth factor, allowing them to fill the available space relative to each other:

Use grow-0 to prevent a flex item from growing:

Use the grow-[<value>] syntax to set the flex grow factor based on a completely custom value:

For CSS variables, you can also use the grow-(<custom-property>) syntax:

This is just a shorthand for grow-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a flex-grow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex ...">  <div class="size-14 flex-none ...">01</div>  <div class="size-14 grow ...">02</div>  <div class="size-14 flex-none ...">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex ...">  <div class="size-14 flex-none ...">01</div>  <div class="size-14 grow ...">02</div>  <div class="size-14 flex-none ...">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex ...">  <div class="size-14 grow-3 ...">01</div>  <div class="size-14 grow-7 ...">02</div>  <div class="size-14 grow-3 ...">03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex ...">  <div class="size-14 grow-3 ...">01</div>  <div class="size-14 grow-7 ...">02</div>  <div class="size-14 grow-3 ...">03</div></div>
```

---

## flex-shrink

**URL:** https://tailwindcss.com/docs/flex-shrink

**Contents:**
- Examples
  - Allowing flex items to shrink
  - Preventing items from shrinking
  - Using a custom value
  - Responsive design

Use shrink to allow a flex item to shrink if needed:

Use shrink-0 to prevent a flex item from shrinking:

Use the shrink-[<value>] syntax to set the flex shrink factor based on a completely custom value:

For CSS variables, you can also use the shrink-(<custom-property>) syntax:

This is just a shorthand for shrink-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a flex-shrink utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex ...">  <div class="h-14 w-14 flex-none ...">01</div>  <div class="h-14 w-64 shrink ...">02</div>  <div class="h-14 w-14 flex-none ...">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex ...">  <div class="h-14 w-14 flex-none ...">01</div>  <div class="h-14 w-64 shrink ...">02</div>  <div class="h-14 w-14 flex-none ...">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex ...">  <div class="h-16 flex-1 ...">01</div>  <div class="h-16 w-32 shrink-0 ...">02</div>  <div class="h-16 flex-1 ...">03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex ...">  <div class="h-16 flex-1 ...">01</div>  <div class="h-16 w-32 shrink-0 ...">02</div>  <div class="h-16 flex-1 ...">03</div></div>
```

---

## order

**URL:** https://tailwindcss.com/docs/order

**Contents:**
- Examples
  - Explicitly setting a sort order
  - Ordering items first or last
  - Using negative values
  - Using a custom value
  - Responsive design

Use order-<number> utilities like order-1 and order-3 to render flex and grid items in a different order than they appear in the document:

Use the order-first and order-last utilities to render flex and grid items first or last:

To use a negative order value, prefix the class name with a dash to convert it to a negative value:

Use the order-[<value>] syntax to set the order based on a completely custom value:

For CSS variables, you can also use the order-(<custom-property>) syntax:

This is just a shorthand for order-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an order utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex justify-between ...">  <div class="order-3 ...">01</div>  <div class="order-1 ...">02</div>  <div class="order-2 ...">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex justify-between ...">  <div class="order-3 ...">01</div>  <div class="order-1 ...">02</div>  <div class="order-2 ...">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex justify-between ...">  <div class="order-last ...">01</div>  <div class="...">02</div>  <div class="order-first ...">03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex justify-between ...">  <div class="order-last ...">01</div>  <div class="...">02</div>  <div class="order-first ...">03</div></div>
```

---

## grid-column

**URL:** https://tailwindcss.com/docs/grid-column

**Contents:**
- Examples
  - Spanning columns
  - Starting and ending lines
  - Using a custom value
  - Responsive design

Use col-span-<number> utilities like col-span-2 and col-span-4 to make an element span n columns:

Use col-start-<number> or col-end-<number> utilities like col-start-2 and col-end-3 to make an element start or end at the nth grid line:

These can also be combined with the col-span-<number> utilities to span a specific number of columns.

Use utilities like col-[<value>],col-span-[<value>],col-start-[<value>], and col-end-[<value>] to set the grid column size and location based on a completely custom value:

For CSS variables, you can also use the col-(<custom-property>) syntax:

This is just a shorthand for col-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix grid-column,grid-column-start, and grid-column-end utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4">  <div class="...">01</div>  <div class="...">02</div>  <div class="...">03</div>  <div class="col-span-2 ...">04</div>  <div class="...">05</div>  <div class="...">06</div>  <div class="col-span-2 ...">07</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4">  <div class="...">01</div>  <div class="...">02</div>  <div class="...">03</div>  <div class="col-span-2 ...">04</div>  <div class="...">05</div>  <div class="...">06</div>  <div class="col-span-2 ...">07</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-cols-6 gap-4">  <div class="col-span-4 col-start-2 ...">01</div>  <div class="col-start-1 col-end-3 ...">02</div>  <div class="col-span-2 col-end-7 ...">03</div>  <div class="col-start-1 col-end-7 ...">04</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-cols-6 gap-4">  <div class="col-span-4 col-start-2 ...">01</div>  <div class="col-start-1 col-end-3 ...">02</div>  <div class="col-span-2 col-end-7 ...">03</div>  <div class="col-start-1 col-end-7 ...">04</div></div>
```

---

## grid-template-rows

**URL:** https://tailwindcss.com/docs/grid-template-rows

**Contents:**
- Examples
  - Specifying the grid rows
  - Implementing a subgrid
  - Using a custom value
  - Responsive design

Use grid-rows-<number> utilities like grid-rows-2 and grid-rows-4 to create grids with n equally sized rows:

Use the grid-rows-subgrid utility to adopt the row tracks defined by the item's parent:

Use the grid-rows-[<value>] syntax to set the rows based on a completely custom value:

For CSS variables, you can also use the grid-rows-(<custom-property>) syntax:

This is just a shorthand for grid-rows-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a grid-template-rows utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-4 gap-4">  <div>01</div>  <!-- ... -->  <div>09</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-4 gap-4">  <div>01</div>  <!-- ... -->  <div>09</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-4 gap-4">  <div>01</div>  <!-- ... -->  <div>05</div>  <div class="row-span-3 grid grid-rows-subgrid gap-4">    <div class="row-start-2">06</div>  </div>  <div>07</div>  <!-- ... -->  <div>10</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-4 gap-4">  <div>01</div>  <!-- ... -->  <div>05</div>  <div class="row-span-3 grid grid-rows-subgrid gap-4">    <div class="row-start-2">06</div>  </div>  <div>07</div>  <!-- ... -->  <div>10</div></div>
```

---

## grid-row

**URL:** https://tailwindcss.com/docs/grid-row

**Contents:**
- Examples
  - Spanning rows
  - Starting and ending lines
  - Using a custom value
  - Responsive design

Use row-span-<number> utilities like row-span-2 and row-span-4 to make an element span n rows:

Use row-start-<number> or row-end-<number> utilities like row-start-2 and row-end-3 to make an element start or end at the nth grid line:

These can also be combined with the row-span-<number> utilities to span a specific number of rows.

Use utilities like row-[<value>],row-span-[<value>],row-start-[<value>], and row-end-[<value>] to set the grid row size and location based on a completely custom value:

For CSS variables, you can also use the row-(<custom-property>) syntax:

This is just a shorthand for row-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix grid-row,grid-row-start, and grid-row-end utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-3 gap-4">  <div class="row-span-3 ...">01</div>  <div class="col-span-2 ...">02</div>  <div class="col-span-2 row-span-2 ...">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-3 gap-4">  <div class="row-span-3 ...">01</div>  <div class="col-span-2 ...">02</div>  <div class="col-span-2 row-span-2 ...">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-3 gap-4">  <div class="row-span-2 row-start-2 ...">01</div>  <div class="row-span-2 row-end-3 ...">02</div>  <div class="row-start-1 row-end-4 ...">03</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-flow-col grid-rows-3 gap-4">  <div class="row-span-2 row-start-2 ...">01</div>  <div class="row-span-2 row-end-3 ...">02</div>  <div class="row-start-1 row-end-4 ...">03</div></div>
```

---

## grid-auto-flow

**URL:** https://tailwindcss.com/docs/grid-auto-flow

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like grid-flow-col and grid-flow-row-dense to control how the auto-placement algorithm works for a grid layout:

Prefix a grid-auto-flow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">  <div class="col-span-2">01</div>  <div class="col-span-2">02</div>  <div>03</div>  <div>04</div>  <div>05</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-flow-row-dense grid-cols-3 grid-rows-3 ...">  <div class="col-span-2">01</div>  <div class="col-span-2">02</div>  <div>03</div>  <div>04</div>  <div>05</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-flow-col md:grid-flow-row ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-flow-col md:grid-flow-row ...">  <!-- ... --></div>
```

---

## grid-auto-rows

**URL:** https://tailwindcss.com/docs/grid-auto-rows

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like auto-rows-min and auto-rows-max to control the size of implicitly-created grid rows:

Use the auto-rows-[<value>] syntax to set the size of implicitly-created grid rows based on a completely custom value:

For CSS variables, you can also use the auto-rows-(<custom-property>) syntax:

This is just a shorthand for auto-rows-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a grid-auto-rows utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-flow-row auto-rows-max">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-flow-row auto-rows-max">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<div class="auto-rows-[minmax(0,2fr)] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="auto-rows-[minmax(0,2fr)] ...">  <!-- ... --></div>
```

---

## gap

**URL:** https://tailwindcss.com/docs/gap

**Contents:**
- Examples
  - Basic example
  - Changing row and column gaps independently
  - Using a custom value
  - Responsive design

Use gap-<number> utilities like gap-2 and gap-4 to change the gap between both rows and columns in grid and flexbox layouts:

Use gap-x-<number> or gap-y-<number> utilities like gap-x-8 and gap-y-4 to change the gap between columns and rows independently:

Use utilities like gap-[<value>],gap-x-[<value>], and gap-y-[<value>] to set the gap based on a completely custom value:

For CSS variables, you can also use the gap-(<custom-property>) syntax:

This is just a shorthand for gap-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix gap,column-gap, and row-gap utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-cols-2 gap-4">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-cols-2 gap-4">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-cols-3 gap-x-8 gap-y-4">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-cols-3 gap-x-8 gap-y-4">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

---

## justify-content

**URL:** https://tailwindcss.com/docs/justify-content

**Contents:**
- Examples
  - Start
  - Center
  - End
  - Space between
  - Space around
  - Space evenly
  - Stretch
  - Normal
  - Responsive design

Use the justify-start utility to justify items against the start of the container's main axis:

Use the justify-center or justify-center-safe utilities to justify items along the center of the container's main axis:

Resize the container to see the alignment behavior

When there is not enough space available, the justify-center-safe utility will align items to the start of the container instead of the center.

Use the justify-end or justify-end-safe utilities to justify items against the end of the container's main axis:

Resize the container to see the alignment behavior

When there is not enough space available, the justify-end-safe utility will align items to the start of the container instead of the end.

Use the justify-between utility to justify items along the container's main axis such that there is an equal amount of space between each item:

Use the justify-around utility to justify items along the container's main axis such that there is an equal amount of space on each side of each item:

Use the justify-evenly utility to justify items along the container's main axis such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using justify-around:

Use the justify-stretch utility to allow auto-sized content items to fill the available space along the container's main axis:

Use the justify-normal utility to pack content items in their default position as if no justify-content value was set:

Prefix a justify-content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex justify-start ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex justify-start ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex justify-center ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex justify-center ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

---

## justify-items

**URL:** https://tailwindcss.com/docs/justify-items

**Contents:**
- Examples
  - Start
  - End
  - Center
  - Stretch
  - Responsive design

Use the justify-items-start utility to justify grid items against the start of their inline axis:

Use the justify-items-end or justify-items-end-safe utilities to justify grid items against the end of their inline axis:

Resize the container to see the alignment behavior

justify-items-end-safe

When there is not enough space available, the justify-items-end-safe utility will align items to the start of the container instead of the end.

Use the justify-items-center or justify-items-center-safe utilities to justify grid items against the end of their inline axis:

Resize the container to see the alignment behavior

justify-items-center-safe

When there is not enough space available, the justify-items-center-safe utility will align items to the start of the container instead of the center.

Use the justify-items-stretch utility to stretch items along their inline axis:

Prefix a justify-items utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid justify-items-start ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid justify-items-start ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-flow-col justify-items-end ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-flow-col justify-items-end ...">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

---

## justify-self

**URL:** https://tailwindcss.com/docs/justify-self

**Contents:**
- Examples
  - Auto
  - Start
  - Center
  - End
  - Stretch
  - Responsive design

Use the justify-self-auto utility to align an item based on the value of the grid's justify-items property:

Use the justify-self-start utility to align a grid item to the start of its inline axis:

Use the justify-self-center or justify-self-center-safe utilities to align a grid item along the center of its inline axis:

Resize the container to see the alignment behavior

justify-self-center-safe

When there is not enough space available, the justify-self-center-safe utility will align the item to the start of the container instead of the end.

Use the justify-self-end or justify-self-end-safe utilities to align a grid item to the end of its inline axis:

Resize the container to see the alignment behavior

justify-self-end-safe

When there is not enough space available, the justify-self-end-safe utility will align the item to the start of the container instead of the end.

Use the justify-self-stretch utility to stretch a grid item to fill the grid area on its inline axis:

Prefix a justify-self utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid justify-items-stretch ...">  <!-- ... -->  <div class="justify-self-auto ...">02</div>  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="grid justify-items-stretch ...">  <!-- ... -->  <div class="justify-self-auto ...">02</div>  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="grid justify-items-stretch ...">  <!-- ... -->  <div class="justify-self-start ...">02</div>  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="grid justify-items-stretch ...">  <!-- ... -->  <div class="justify-self-start ...">02</div>  <!-- ... --></div>
```

---

## align-content

**URL:** https://tailwindcss.com/docs/align-content

**Contents:**
- Examples
  - Start
  - Center
  - End
  - Space between
  - Space around
  - Space evenly
  - Stretch
  - Normal
  - Responsive design

Use content-start to pack rows in a container against the start of the cross axis:

Use content-center to pack rows in a container in the center of the cross axis:

Use content-end to pack rows in a container against the end of the cross axis:

Use content-between to distribute rows in a container such that there is an equal amount of space between each line:

Use content-around to distribute rows in a container such that there is an equal amount of space around each line:

Use content-evenly to distribute rows in a container such that there is an equal amount of space around each item, but also accounting for the doubling of space you would normally see between each item when using content-around:

Use content-stretch to allow content items to fill the available space along the container’s cross axis:

Use content-normal to pack content items in their default position as if no align-content value was set:

Prefix an align-content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid h-56 grid-cols-3 content-start gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid h-56 grid-cols-3 content-start gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid h-56 grid-cols-3 content-center gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid h-56 grid-cols-3 content-center gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div></div>
```

---

## align-items

**URL:** https://tailwindcss.com/docs/align-items

**Contents:**
- Examples
  - Stretch
  - Start
  - Center
  - End
  - Baseline
  - Last baseline
  - Responsive design

Use the items-stretch utility to stretch items to fill the container's cross axis:

Use the items-start utility to align items to the start of the container's cross axis:

Use the items-center utility to align items along the center of the container's cross axis:

Use the items-end utility to align items to the end of the container's cross axis:

Use the items-baseline utility to align items along the container's cross axis such that all of their baselines align:

Use the items-baseline-last utility to align items along the container's cross axis such that all of their baselines align with the last baseline in the container:

Working on the future of astronaut recruitment at Space Recruit.

A multidisciplinary designer.

This is useful for ensuring that text items align with each other, even if they have different heights.

Prefix an align-items utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex items-stretch ...">  <div class="py-4">01</div>  <div class="py-12">02</div>  <div class="py-8">03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex items-stretch ...">  <div class="py-4">01</div>  <div class="py-12">02</div>  <div class="py-8">03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex items-start ...">  <div class="py-4">01</div>  <div class="py-12">02</div>  <div class="py-8">03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex items-start ...">  <div class="py-4">01</div>  <div class="py-12">02</div>  <div class="py-8">03</div></div>
```

---

## align-self

**URL:** https://tailwindcss.com/docs/align-self

**Contents:**
- Examples
  - Auto
  - Start
  - Center
  - End
  - Stretch
  - Baseline
  - Last baseline
  - Responsive design

Use the self-auto utility to align an item based on the value of the container's align-items property:

Use the self-start utility to align an item to the start of the container's cross axis, despite the container's align-items value:

Use the self-center utility to align an item along the center of the container's cross axis, despite the container's align-items value:

Use the self-end utility to align an item to the end of the container's cross axis, despite the container's align-items value:

Use the self-stretch utility to stretch an item to fill the container's cross axis, despite the container's align-items value:

Use the self-baseline utility to align an item such that its baseline aligns with the baseline of the flex container's cross axis:

Use the self-baseline-last utility to align an item along the container's cross axis such that its baseline aligns with the last baseline in the container:

Working on the future of astronaut recruitment at Space Recruit.

A multidisciplinary designer.

This is useful for ensuring that text items align with each other, even if they have different heights.

Prefix an align-self utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex items-stretch ...">  <div>01</div>  <div class="self-auto ...">02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="flex items-stretch ...">  <div>01</div>  <div class="self-auto ...">02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex items-stretch ...">  <div>01</div>  <div class="self-start ...">02</div>  <div>03</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex items-stretch ...">  <div>01</div>  <div class="self-start ...">02</div>  <div>03</div></div>
```

---

## place-content

**URL:** https://tailwindcss.com/docs/place-content

**Contents:**
- Examples
  - Center
  - Start
  - End
  - Space between
  - Space around
  - Space evenly
  - Stretch
  - Responsive design

Use place-content-center to pack items in the center of the inline and block axes:

Use place-content-start to pack items against the start of the inline and block axes:

Use place-content-end to pack items against the end of the inline and block axes:

Use place-content-between to distribute grid items along the inline and block axes so that there is an equal amount of space between each row and column on each axis respectively:

Use place-content-around to distribute grid items along the inline and block axes so that there is an equal amount of space around each row and column on each axis respectively:

Use place-content-evenly to distribute grid items such that they are evenly spaced on the inline and block axes:

Use place-content-stretch to stretch grid items along their grid areas on the inline and block axes:

Prefix a place-content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid h-48 grid-cols-2 place-content-center gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid h-48 grid-cols-2 place-content-center gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid h-48 grid-cols-2 place-content-start gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid h-48 grid-cols-2 place-content-start gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div></div>
```

---

## place-items

**URL:** https://tailwindcss.com/docs/place-items

**Contents:**
- Examples
  - Start
  - End
  - Center
  - Stretch
- Responsive design

Use place-items-start to place grid items on the start of their grid areas on both axes:

Use place-items-end to place grid items on the end of their grid areas on both axes:

Use place-items-center to place grid items on the center of their grid areas on both axes:

Use place-items-stretch to stretch items along their grid areas on both axes:

Prefix a place-items utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-cols-3 place-items-start gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-cols-3 place-items-start gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid h-56 grid-cols-3 place-items-end gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid h-56 grid-cols-3 place-items-end gap-4 ...">  <div>01</div>  <div>02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

---

## place-self

**URL:** https://tailwindcss.com/docs/place-self

**Contents:**
- Examples
  - Auto
  - Start
  - Center
  - End
  - Stretch
  - Responsive design

Use place-self-auto to align an item based on the value of the container's place-items property:

Use place-self-start to align an item to the start on both axes:

Use place-self-center to align an item at the center on both axes:

Use place-self-end to align an item to the end on both axes:

Use place-self-stretch to stretch an item on both axes:

Prefix a place-self utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4 ...">  <div>01</div>  <div class="place-self-auto ...">02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4 ...">  <div>01</div>  <div class="place-self-auto ...">02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4 ...">  <div>01</div>  <div class="place-self-start ...">02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4 ...">  <div>01</div>  <div class="place-self-start ...">02</div>  <div>03</div>  <div>04</div>  <div>05</div>  <div>06</div></div>
```

---

## border-radius

**URL:** https://tailwindcss.com/docs/border-radius

**Contents:**
- Examples
  - Basic example
  - Rounding sides separately
  - Rounding corners separately
  - Using logical properties
  - Creating pill buttons
  - Removing the border radius
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like rounded-sm and rounded-md to apply different border radius sizes to an element:

Use utilities like rounded-t-md and rounded-r-lg to only round one side of an element:

Use utilities like rounded-tr-md and rounded-tl-lg utilities to only round one corner of an element:

Use utilities like rounded-s-md and rounded-se-xl to set the border radius using logical properties, which map to the appropriate corners based on the text direction:

Here are all the available border radius logical property utilities and their physical property equivalents in both LTR and RTL modes.

For more control, you can also use the LTR and RTL modifiers to conditionally apply specific styles depending on the current text direction.

Use the rounded-full utility to create pill buttons:

Use the rounded-none utility to remove an existing border radius from an element:

Use the rounded-[<value>] syntax to set the border radius based on a completely custom value:

For CSS variables, you can also use the rounded-(<custom-property>) syntax:

This is just a shorthand for rounded-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a border-radius utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --radius-* theme variables to customize the border radius utilities in your project:

Now the rounded-5xl utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="rounded-sm ..."></div><div class="rounded-md ..."></div><div class="rounded-lg ..."></div><div class="rounded-xl ..."></div>
```

Example 2 (jsx):
```jsx
<div class="rounded-sm ..."></div><div class="rounded-md ..."></div><div class="rounded-lg ..."></div><div class="rounded-xl ..."></div>
```

Example 3 (jsx):
```jsx
<div class="rounded-t-lg ..."></div><div class="rounded-r-lg ..."></div><div class="rounded-b-lg ..."></div><div class="rounded-l-lg ..."></div>
```

Example 4 (jsx):
```jsx
<div class="rounded-t-lg ..."></div><div class="rounded-r-lg ..."></div><div class="rounded-b-lg ..."></div><div class="rounded-l-lg ..."></div>
```

---

## border-width

**URL:** https://tailwindcss.com/docs/border-width

**Contents:**
- Examples
  - Basic example
  - Individual sides
  - Horizontal and vertical sides
  - Using logical properties
  - Between children
    - Reversing children order
  - Using a custom value
  - Responsive design

Use border or border-<number> utilities like border-2 and border-4 to set the border width for all sides of an element:

Use utilities like border-r and border-t-4 to set the border width for one side of an element:

Use utilities like border-x and border-y-4 to set the border width on two sides of an element at the same time:

Use utilities like border-s and border-e-4 to set the border-inline-start-width and border-inline-end-width logical properties, which map to either the left or right border based on the text direction:

Use utilities like divide-x and divide-y-4 to add borders between child elements:

If your elements are in reverse order (using say flex-row-reverse or flex-col-reverse), use the divide-x-reverse or divide-y-reverse utilities to ensure the border is added to the correct side of each element:

Use the border-[<value>] syntax to set the border width based on a completely custom value:

For CSS variables, you can also use the border-(length:<custom-property>) syntax:

This is just a shorthand for border-[length:var(<custom-property>)] that adds the var() function for you automatically.

Prefix a border-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="border border-indigo-600 ..."></div><div class="border-2 border-indigo-600 ..."></div><div class="border-4 border-indigo-600 ..."></div><div class="border-8 border-indigo-600 ..."></div>
```

Example 2 (jsx):
```jsx
<div class="border border-indigo-600 ..."></div><div class="border-2 border-indigo-600 ..."></div><div class="border-4 border-indigo-600 ..."></div><div class="border-8 border-indigo-600 ..."></div>
```

Example 3 (jsx):
```jsx
<div class="border-t-4 border-indigo-500 ..."></div><div class="border-r-4 border-indigo-500 ..."></div><div class="border-b-4 border-indigo-500 ..."></div><div class="border-l-4 border-indigo-500 ..."></div>
```

Example 4 (jsx):
```jsx
<div class="border-t-4 border-indigo-500 ..."></div><div class="border-r-4 border-indigo-500 ..."></div><div class="border-b-4 border-indigo-500 ..."></div><div class="border-l-4 border-indigo-500 ..."></div>
```

---

## border-color

**URL:** https://tailwindcss.com/docs/border-color

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Individual sides
  - Horizontal and vertical sides
  - Using logical properties
  - Divider between children
  - Using a custom value
  - Applying on focus
  - Responsive design

Use utilities like border-rose-500 and border-lime-100 to control the border color of an element:

Use the color opacity modifier to control the opacity of an element's border color:

border-indigo-500/100

Use utilities like border-t-indigo-500 and border-r-lime-100 to set the border color for one side of an element:

Use utilities like border-x-indigo-500 and border-y-lime-100 to set the border color on two sides of an element at the same time:

Use utilities like border-s-indigo-500 and border-e-lime-100 to set the border-inline-start-color and border-inline-end-color logical properties, which map to either the left or right border based on the text direction:

Use utilities like divide-indigo-500 and divide-lime-100 to control the border color between child elements:

Use the border-[<value>] syntax to set the border color based on a completely custom value:

For CSS variables, you can also use the border-(<custom-property>) syntax:

This is just a shorthand for border-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a border-color utility with a variant like focus:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

Prefix a border-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the border-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="border-4 border-indigo-500 ..."></div><div class="border-4 border-purple-500 ..."></div><div class="border-4 border-sky-500 ..."></div>
```

Example 2 (jsx):
```jsx
<div class="border-4 border-indigo-500 ..."></div><div class="border-4 border-purple-500 ..."></div><div class="border-4 border-sky-500 ..."></div>
```

Example 3 (jsx):
```jsx
<div class="border-4 border-indigo-500/100 ..."></div><div class="border-4 border-indigo-500/75 ..."></div><div class="border-4 border-indigo-500/50 ..."></div>
```

Example 4 (jsx):
```jsx
<div class="border-4 border-indigo-500/100 ..."></div><div class="border-4 border-indigo-500/75 ..."></div><div class="border-4 border-indigo-500/50 ..."></div>
```

---

## border-style

**URL:** https://tailwindcss.com/docs/border-style

**Contents:**
- Examples
  - Basic example
  - Removing a border
  - Setting the divider style
  - Responsive design

Use utilities like border-solid and border-dotted to control an element's border style:

Use the border-none utility to remove an existing border from an element:

This is most commonly used to remove a border style that was applied at a smaller breakpoint.

Use utilities like divide-dashed and divide-dotted to control the border style between child elements:

Prefix a border-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="border-2 border-solid ..."></div><div class="border-2 border-dashed ..."></div><div class="border-2 border-dotted ..."></div><div class="border-4 border-double ..."></div>
```

Example 2 (jsx):
```jsx
<div class="border-2 border-solid ..."></div><div class="border-2 border-dashed ..."></div><div class="border-2 border-dotted ..."></div><div class="border-4 border-double ..."></div>
```

Example 3 (jsx):
```jsx
<button class="border-none ...">Save Changes</button>
```

Example 4 (jsx):
```jsx
<button class="border-none ...">Save Changes</button>
```

---

## border-collapse

**URL:** https://tailwindcss.com/docs/border-collapse

**Contents:**
- Examples
  - Collapsing table borders
  - Separating table borders
  - Responsive design

Use the border-collapse utility to combine adjacent cell borders into a single border when possible:

Note that this includes collapsing borders on the top-level <table> tag.

Use the border-separate utility to force each cell to display its own separate borders:

Prefix a border-collapse utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<table class="border-collapse border border-gray-400 ...">  <thead>    <tr>      <th class="border border-gray-300 ...">State</th>      <th class="border border-gray-300 ...">City</th>    </tr>  </thead>  <tbody>    <tr>      <td class="border border-gray-300 ...">Indiana</td>      <td class="border border-gray-300 ...">Indianapolis</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Ohio</td>      <td class="border border-gray-300 ...">Columbus</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Michigan</td>      <td class="border border-gray-300 ...">Detroit</td>    </tr>  </tbody></table>
```

Example 2 (jsx):
```jsx
<table class="border-collapse border border-gray-400 ...">  <thead>    <tr>      <th class="border border-gray-300 ...">State</th>      <th class="border border-gray-300 ...">City</th>    </tr>  </thead>  <tbody>    <tr>      <td class="border border-gray-300 ...">Indiana</td>      <td class="border border-gray-300 ...">Indianapolis</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Ohio</td>      <td class="border border-gray-300 ...">Columbus</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Michigan</td>      <td class="border border-gray-300 ...">Detroit</td>    </tr>  </tbody></table>
```

Example 3 (jsx):
```jsx
<table class="border-separate border border-gray-400 ...">  <thead>    <tr>      <th class="border border-gray-300 ...">State</th>      <th class="border border-gray-300 ...">City</th>    </tr>  </thead>  <tbody>    <tr>      <td class="border border-gray-300 ...">Indiana</td>      <td class="border border-gray-300 ...">Indianapolis</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Ohio</td>      <td class="border border-gray-300 ...">Columbus</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Michigan</td>      <td class="border border-gray-300 ...">Detroit</td>    </tr>  </tbody></table>
```

Example 4 (jsx):
```jsx
<table class="border-separate border border-gray-400 ...">  <thead>    <tr>      <th class="border border-gray-300 ...">State</th>      <th class="border border-gray-300 ...">City</th>    </tr>  </thead>  <tbody>    <tr>      <td class="border border-gray-300 ...">Indiana</td>      <td class="border border-gray-300 ...">Indianapolis</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Ohio</td>      <td class="border border-gray-300 ...">Columbus</td>    </tr>    <tr>      <td class="border border-gray-300 ...">Michigan</td>      <td class="border border-gray-300 ...">Detroit</td>    </tr>  </tbody></table>
```

---

## border-spacing

**URL:** https://tailwindcss.com/docs/border-spacing

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use border-spacing-<number> utilities like border-spacing-2 and border-spacing-x-3 to control the space between the borders of table cells with separate borders:

Use the border-spacing-[<value>] syntax to set the border spacing based on a completely custom value:

For CSS variables, you can also use the border-spacing-(<custom-property>) syntax:

This is just a shorthand for border-spacing-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a border-spacing utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The border-spacing-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<table class="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">  <thead>    <tr>      <th class="border border-gray-300 dark:border-gray-600">State</th>      <th class="border border-gray-300 dark:border-gray-600">City</th>    </tr>  </thead>  <tbody>    <tr>      <td class="border border-gray-300 dark:border-gray-700">Indiana</td>      <td class="border border-gray-300 dark:border-gray-700">Indianapolis</td>    </tr>    <tr>      <td class="border border-gray-300 dark:border-gray-700">Ohio</td>      <td class="border border-gray-300 dark:border-gray-700">Columbus</td>    </tr>    <tr>      <td class="border border-gray-300 dark:border-gray-700">Michigan</td>      <td class="border border-gray-300 dark:border-gray-700">Detroit</td>    </tr>  </tbody></table>
```

Example 2 (jsx):
```jsx
<table class="border-separate border-spacing-2 border border-gray-400 dark:border-gray-500">  <thead>    <tr>      <th class="border border-gray-300 dark:border-gray-600">State</th>      <th class="border border-gray-300 dark:border-gray-600">City</th>    </tr>  </thead>  <tbody>    <tr>      <td class="border border-gray-300 dark:border-gray-700">Indiana</td>      <td class="border border-gray-300 dark:border-gray-700">Indianapolis</td>    </tr>    <tr>      <td class="border border-gray-300 dark:border-gray-700">Ohio</td>      <td class="border border-gray-300 dark:border-gray-700">Columbus</td>    </tr>    <tr>      <td class="border border-gray-300 dark:border-gray-700">Michigan</td>      <td class="border border-gray-300 dark:border-gray-700">Detroit</td>    </tr>  </tbody></table>
```

Example 3 (jsx):
```jsx
<table class="border-spacing-[7px] ...">  <!-- ... --></table>
```

Example 4 (jsx):
```jsx
<table class="border-spacing-[7px] ...">  <!-- ... --></table>
```

---
