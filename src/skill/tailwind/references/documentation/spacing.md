# Tailwind_Docs - Spacing

**Pages:** 4

---

## padding

**URL:** https://tailwindcss.com/docs/padding

**Contents:**
- Examples
  - Basic example
  - Adding padding to one side
  - Adding horizontal padding
  - Adding vertical padding
  - Using logical properties
  - Using a custom value
  - Responsive design
- Customizing your theme

Use p-<number> utilities like p-4 and p-8 to control the padding on all sides of an element:

Use pt-<number>, pr-<number>, pb-<number>, and pl-<number> utilities like pt-6 and pr-4 to control the padding on one side of an element:

Use px-<number> utilities like px-4 and px-8 to control the horizontal padding of an element:

Use py-<number> utilities like py-4 and py-8 to control the vertical padding of an element:

Use ps-<number> or pe-<number> utilities like ps-4 and pe-8 to set the padding-inline-start and padding-inline-end logical properties, which map to either the left or right side based on the text direction:

For more control, you can also use the LTR and RTL modifiers to conditionally apply specific styles depending on the current text direction.

Use utilities like p-[<value>],px-[<value>], and pb-[<value>] to set the padding based on a completely custom value:

For CSS variables, you can also use the p-(<custom-property>) syntax:

This is just a shorthand for p-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a padding utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The p-<number>,px-<number>,py-<number>,ps-<number>,pe-<number>,pt-<number>,pr-<number>,pb-<number>, and pl-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="p-8 ...">p-8</div>
```

Example 2 (jsx):
```jsx
<div class="p-8 ...">p-8</div>
```

Example 3 (jsx):
```jsx
<div class="pt-6 ...">pt-6</div><div class="pr-4 ...">pr-4</div><div class="pb-8 ...">pb-8</div><div class="pl-2 ...">pl-2</div>
```

Example 4 (jsx):
```jsx
<div class="pt-6 ...">pt-6</div><div class="pr-4 ...">pr-4</div><div class="pb-8 ...">pb-8</div><div class="pl-2 ...">pl-2</div>
```

---

## margin

**URL:** https://tailwindcss.com/docs/margin

**Contents:**
- Examples
  - Basic example
  - Adding margin to a single side
  - Adding horizontal margin
  - Adding vertical margin
  - Using negative values
  - Using logical properties
  - Adding space between children
    - Reversing children order
    - Limitations

Use m-<number> utilities like m-4 and m-8 to control the margin on all sides of an element:

Use mt-<number>, mr-<number>, mb-<number>, and ml-<number> utilities like ml-2 and mt-6 to control the margin on one side of an element:

Use mx-<number> utilities like mx-4 and mx-8 to control the horizontal margin of an element:

Use my-<number> utilities like my-4 and my-8 to control the vertical margin of an element:

To use a negative margin value, prefix the class name with a dash to convert it to a negative value:

Use ms-<number> or me-<number> utilities like ms-4 and me-8 to set the margin-inline-start and margin-inline-end logical properties:

Use space-x-<number> or space-y-<number> utilities like space-x-4 and space-y-8 to control the space between elements:

If your elements are in reverse order (using say flex-row-reverse or flex-col-reverse), use the space-x-reverse or space-y-reverse utilities to ensure the space is added to the correct side of each element:

The space utilities are really just a shortcut for adding margin to all-but-the-last-item in a group, and aren't designed to handle complex cases like grids, layouts that wrap, or situations where the children are rendered in a complex custom order rather than their natural DOM order.

For those situations, it's better to use the gap utilities when possible, or add margin to every element with a matching negative margin on the parent.

Additionally, the space utilities are not designed to work together with the divide utilities. For those situations, consider adding margin/padding utilities to the children instead.

Use utilities like m-[<value>],mx-[<value>], and mb-[<value>] to set the margin based on a completely custom value:

For CSS variables, you can also use the m-(<custom-property>) syntax:

This is just a shorthand for m-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a margin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The m-<number>,mx-<number>,my-<number>,ms-<number>,me-<number>,mt-<number>,mr-<number>,mb-<number>, and ml-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="m-8 ...">m-8</div>
```

Example 2 (jsx):
```jsx
<div class="m-8 ...">m-8</div>
```

Example 3 (jsx):
```jsx
<div class="mt-6 ...">mt-6</div><div class="mr-4 ...">mr-4</div><div class="mb-8 ...">mb-8</div><div class="ml-2 ...">ml-2</div>
```

Example 4 (jsx):
```jsx
<div class="mt-6 ...">mt-6</div><div class="mr-4 ...">mr-4</div><div class="mb-8 ...">mb-8</div><div class="ml-2 ...">ml-2</div>
```

---

## scroll-margin

**URL:** https://tailwindcss.com/docs/scroll-margin

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using logical properties
  - Using a custom value
  - Responsive design
- Customizing your theme

Use the scroll-mt-<number>, scroll-mr-<number>, scroll-mb-<number>, and scroll-ml-<number> utilities like scroll-ml-4 and scroll-mt-6 to set the scroll offset around items within a snap container:

Scroll in the grid of images to see the expected behavior

To use a negative scroll margin value, prefix the class name with a dash to convert it to a negative value:

Use the scroll-ms-<number> and scroll-me-<number> utilities to set the scroll-margin-inline-start and scroll-margin-inline-end logical properties, which map to either the left or right side based on the text direction:

Scroll in the grid of images to see the expected behavior

For more control, you can also use the LTR and RTL modifiers to conditionally apply specific styles depending on the current text direction.

Use utilities like scroll-ml-[<value>] and scroll-me-[<value>] to set the scroll margin based on a completely custom value:

For CSS variables, you can also use the scroll-ml-(<custom-property>) syntax:

This is just a shorthand for scroll-ml-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a scroll-margin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The scroll-m-<number>,scroll-mx-<number>,scroll-my-<number>,scroll-ms-<number>,scroll-me-<number>,scroll-mt-<number>,scroll-mr-<number>,scroll-mb-<number>, and scroll-ml-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-01.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-02.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-03.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-04.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-05.jpg"/>  </div></div>
```

Example 2 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-01.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-02.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-03.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-04.jpg"/>  </div>  <div class="snap-start scroll-ml-6 ...">    <img src="/img/vacation-05.jpg"/>  </div></div>
```

Example 3 (jsx):
```jsx
<div class="snap-start -scroll-ml-6 ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="snap-start -scroll-ml-6 ...">  <!-- ... --></div>
```

---

## scroll-padding

**URL:** https://tailwindcss.com/docs/scroll-padding

**Contents:**
- Examples
  - Basic example
  - Using logical properties
  - Using negative values
  - Using a custom value
  - Responsive design
- Customizing your theme

Use the scroll-pt-<number>, scroll-pr-<number>, scroll-pb-<number>, and scroll-pl-<number> utilities like scroll-pl-4 and scroll-pt-6 to set the scroll offset of an element within a snap container:

Scroll in the grid of images to see the expected behavior

Use the scroll-ps-<number> and scroll-pe-<number> utilities to set the scroll-padding-inline-start and scroll-padding-inline-end logical properties, which map to either the left or right side based on the text direction:

Scroll in the grid of images to see the expected behavior

To use a negative scroll padding value, prefix the class name with a dash to convert it to a negative value:

Use utilities like scroll-pl-[<value>] and scroll-pe-[<value>] to set the scroll padding based on a completely custom value:

For CSS variables, you can also use the scroll-pl-(<custom-property>) syntax:

This is just a shorthand for scroll-pl-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a scroll-padding utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The scroll-p-<number>,scroll-px-<number>,scroll-py-<number>,scroll-ps-<number>,scroll-pe-<number>,scroll-pt-<number>,scroll-pr-<number>,scroll-pb-<number>, and scroll-pl-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="snap-x scroll-pl-6 ...">  <div class="snap-start ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-05.jpg" />  </div></div>
```

Example 2 (jsx):
```jsx
<div class="snap-x scroll-pl-6 ...">  <div class="snap-start ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-05.jpg" />  </div></div>
```

Example 3 (jsx):
```jsx
<div dir="ltr">  <div class="snap-x scroll-ps-6 ...">    <!-- ... -->  </div></div><div dir="rtl">  <div class="snap-x scroll-ps-6 ...">    <!-- ... -->  </div></div>
```

Example 4 (jsx):
```jsx
<div dir="ltr">  <div class="snap-x scroll-ps-6 ...">    <!-- ... -->  </div></div><div dir="rtl">  <div class="snap-x scroll-ps-6 ...">    <!-- ... -->  </div></div>
```

---
