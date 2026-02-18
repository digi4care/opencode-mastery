# Tailwind_Docs - Layout

**Pages:** 27

---

## aspect-ratio

**URL:** https://tailwindcss.com/docs/aspect-ratio

**Contents:**
- Examples
  - Basic example
  - Using a video aspect ratio
  - Using a custom value
  - Responsive design
- Customizing your theme

Use aspect-<ratio> utilities like aspect-3/2 to give an element a specific aspect ratio:

Resize the example to see the expected behavior

Use the aspect-video utility to give a video element a 16 / 9 aspect ratio:

Resize the example to see the expected behavior

Use the aspect-[<value>] syntax to set the aspect ratio based on a completely custom value:

For CSS variables, you can also use the aspect-(<custom-property>) syntax:

This is just a shorthand for aspect-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an aspect-ratio utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --aspect-* theme variables to customize the aspect ratio utilities in your project:

Now the aspect-retro utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="aspect-3/2 object-cover ..." src="/img/villas.jpg" />
```

Example 2 (jsx):
```jsx
<img class="aspect-3/2 object-cover ..." src="/img/villas.jpg" />
```

Example 3 (jsx):
```jsx
<iframe class="aspect-video ..." src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
```

Example 4 (jsx):
```jsx
<iframe class="aspect-video ..." src="https://www.youtube.com/embed/dQw4w9WgXcQ"></iframe>
```

---

## columns

**URL:** https://tailwindcss.com/docs/columns

**Contents:**
- Examples
  - Setting by number
  - Setting by width
  - Setting the column gap
  - Using a custom value
  - Responsive design
- Customizing your theme

Use columns-<number> utilities like columns-3 to set the number of columns that should be created for the content within an element:

The column width will automatically adjust to accommodate the specified number of columns.

Use utilities like columns-xs and columns-sm to set the ideal column width for the content within an element:

Resize the example to see the expected behavior

When setting the column width, the number of columns automatically adjusts to ensure they don't get too narrow.

Use the gap-<width> utilities to specify the width between columns:

Learn more about the gap utilities in the gap documentation.

Use the columns-[<value>] syntax to set the columns based on a completely custom value:

For CSS variables, you can also use the columns-(<custom-property>) syntax:

This is just a shorthand for columns-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a columns utility with a breakpoint variant like sm: to only apply the utility at small screen sizes and above:

Resize the example to see the expected behavior

Learn more about using variants in the variants documentation.

Use the --container-* theme variables to customize the fixed-width column utilities in your project:

Now the columns-4xs utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="columns-3 ...">  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />  <img class="aspect-square ..." src="/img/mountains-2.jpg" />  <img class="aspect-square ..." src="/img/mountains-3.jpg" />  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="columns-3 ...">  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />  <img class="aspect-square ..." src="/img/mountains-2.jpg" />  <img class="aspect-square ..." src="/img/mountains-3.jpg" />  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="columns-3xs ...">  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />  <img class="aspect-square ..." src="/img/mountains-2.jpg" />  <img class="aspect-square ..." src="/img/mountains-3.jpg" />  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="columns-3xs ...">  <img class="aspect-3/2 ..." src="/img/mountains-1.jpg" />  <img class="aspect-square ..." src="/img/mountains-2.jpg" />  <img class="aspect-square ..." src="/img/mountains-3.jpg" />  <!-- ... --></div>
```

---

## break-after

**URL:** https://tailwindcss.com/docs/break-after

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like break-after-column and break-after-page to control how a column or page break should behave after an element:

Prefix a break-after utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="columns-2">  <p>Well, let me tell you something, ...</p>  <p class="break-after-column">Sure, go ahead, laugh...</p>  <p>Maybe we can live without...</p>  <p>Look. If you think this is...</p></div>
```

Example 2 (jsx):
```jsx
<div class="columns-2">  <p>Well, let me tell you something, ...</p>  <p class="break-after-column">Sure, go ahead, laugh...</p>  <p>Maybe we can live without...</p>  <p>Look. If you think this is...</p></div>
```

Example 3 (jsx):
```jsx
<div class="break-after-column md:break-after-auto ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="break-after-column md:break-after-auto ...">  <!-- ... --></div>
```

---

## break-before

**URL:** https://tailwindcss.com/docs/break-before

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like break-before-column and break-before-page to control how a column or page break should behave before an element:

Prefix a break-before utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="columns-2">  <p>Well, let me tell you something, ...</p>  <p class="break-before-column">Sure, go ahead, laugh...</p>  <p>Maybe we can live without...</p>  <p>Look. If you think this is...</p></div>
```

Example 2 (jsx):
```jsx
<div class="columns-2">  <p>Well, let me tell you something, ...</p>  <p class="break-before-column">Sure, go ahead, laugh...</p>  <p>Maybe we can live without...</p>  <p>Look. If you think this is...</p></div>
```

Example 3 (jsx):
```jsx
<div class="break-before-column md:break-before-auto ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="break-before-column md:break-before-auto ...">  <!-- ... --></div>
```

---

## break-inside

**URL:** https://tailwindcss.com/docs/break-inside

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like break-inside-column and break-inside-avoid-page to control how a column or page break should behave within an element:

Prefix a break-inside utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="columns-2">  <p>Well, let me tell you something, ...</p>  <p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>  <p>Maybe we can live without...</p>  <p>Look. If you think this is...</p></div>
```

Example 2 (jsx):
```jsx
<div class="columns-2">  <p>Well, let me tell you something, ...</p>  <p class="break-inside-avoid-column">Sure, go ahead, laugh...</p>  <p>Maybe we can live without...</p>  <p>Look. If you think this is...</p></div>
```

Example 3 (jsx):
```jsx
<div class="break-inside-avoid-column md:break-inside-auto ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="break-inside-avoid-column md:break-inside-auto ...">  <!-- ... --></div>
```

---

## box-decoration-break

**URL:** https://tailwindcss.com/docs/box-decoration-break

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the box-decoration-slice and box-decoration-clone utilities to control whether properties like background, border, border-image, box-shadow, clip-path, margin, and padding should be rendered as if the element were one continuous fragment, or distinct blocks:

Prefix a box-decoration-break utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">  Hello<br />World</span><span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">  Hello<br />World</span>
```

Example 2 (jsx):
```jsx
<span class="box-decoration-slice bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">  Hello<br />World</span><span class="box-decoration-clone bg-linear-to-r from-indigo-600 to-pink-500 px-2 text-white ...">  Hello<br />World</span>
```

Example 3 (jsx):
```jsx
<div class="box-decoration-clone md:box-decoration-slice ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="box-decoration-clone md:box-decoration-slice ...">  <!-- ... --></div>
```

---

## box-sizing

**URL:** https://tailwindcss.com/docs/box-sizing

**Contents:**
- Examples
  - Including borders and padding
  - Excluding borders and padding
  - Responsive design

Use the box-border utility to set an element's box-sizing to border-box, telling the browser to include the element's borders and padding when you give it a height or width.

This means a 100px × 100px element with a 2px border and 4px of padding on all sides will be rendered as 100px × 100px, with an internal content area of 88px × 88px:

Tailwind makes this the default for all elements in our preflight base styles.

Use the box-content utility to set an element's box-sizing to content-box, telling the browser to add borders and padding on top of the element's specified width or height.

This means a 100px × 100px element with a 2px border and 4px of padding on all sides will actually be rendered as 112px × 112px, with an internal content area of 100px × 100px:

Prefix a box-sizing utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="box-border size-32 border-4 p-4 ...">  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="box-border size-32 border-4 p-4 ...">  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="box-content size-32 border-4 p-4 ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="box-content size-32 border-4 p-4 ...">  <!-- ... --></div>
```

---

## display

**URL:** https://tailwindcss.com/docs/display

**Contents:**
- Examples
  - Block and Inline
  - Flow Root
  - Flex
  - Inline Flex
  - Grid
  - Inline Grid
  - Contents
  - Table
  - Hidden

Use the inline, inline-block, and block utilities to control the flow of text and elements:

Use the flow-root utility to create a block-level element with its own block formatting context:

Use the flex utility to create a block-level flex container:

Use the inline-flex utility to create an inline flex container that flows with text:

Today I spent most of the day researching ways to take advantage of the fact that bottles can be returned for 10 cents in Michigan, but only 5 cents here. Kramer keeps telling me there is no way to make it work, that he has run the numbers on every possible approach, but I just have to believe there's a way to make it work, there's simply too much opportunity here.

Use the grid utility to create a grid container:

Use the inline-grid utility to create an inline grid container:

Use the contents utility to create a "phantom" container whose children act like direct children of the parent:

Use the table, table-row, table-cell, table-caption, table-column, table-column-group, table-header-group, table-row-group, and table-footer-group utilities to create elements that behave like their respective table elements:

Use the hidden utility to remove an element from the document:

To visually hide an element but keep it in the document, use the visibility property instead.

Use sr-only to hide an element visually without hiding it from screen readers:

Use not-sr-only to undo sr-only, making an element visible to sighted users as well as screen readers:

This can be useful when you want to visually hide something on small screens but show it on larger screens for example.

Prefix a display utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p>  When controlling the flow of text, using the CSS property <span class="inline">display: inline</span> will cause the  text inside the element to wrap normally.</p><p>  While using the property <span class="inline-block">display: inline-block</span> will wrap the element to prevent the  text inside from extending beyond its parent.</p><p>  Lastly, using the property <span class="block">display: block</span> will put the element on its own line and fill its  parent.</p>
```

Example 2 (jsx):
```jsx
<p>  When controlling the flow of text, using the CSS property <span class="inline">display: inline</span> will cause the  text inside the element to wrap normally.</p><p>  While using the property <span class="inline-block">display: inline-block</span> will wrap the element to prevent the  text inside from extending beyond its parent.</p><p>  Lastly, using the property <span class="block">display: block</span> will put the element on its own line and fill its  parent.</p>
```

Example 3 (jsx):
```jsx
<div class="p-4">  <div class="flow-root ...">    <div class="my-4 ...">Well, let me tell you something, ...</div>  </div>  <div class="flow-root ...">    <div class="my-4 ...">Sure, go ahead, laugh if you want...</div>  </div></div>
```

Example 4 (jsx):
```jsx
<div class="p-4">  <div class="flow-root ...">    <div class="my-4 ...">Well, let me tell you something, ...</div>  </div>  <div class="flow-root ...">    <div class="my-4 ...">Sure, go ahead, laugh if you want...</div>  </div></div>
```

---

## float

**URL:** https://tailwindcss.com/docs/float

**Contents:**
- Examples
  - Floating elements to the right
  - Floating elements to the left
  - Using logical properties
  - Disabling a float
  - Responsive design

Use the float-right utility to float an element to the right of its container:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Use the float-left utility to float an element to the left of its container:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Use the float-start and float-end utilities, which use logical properties to map to either the left or right side based on the text direction:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

ربما يمكننا العيش بدون مكتبات، أشخاص مثلي ومثلك. ربما. بالتأكيد، نحن أكبر من أن نغير العالم، ولكن ماذا عن ذلك الطفل الذي يجلس ويفتح كتابًا الآن في أحد فروع المكتبة المحلية ويجد رسومات للتبول والبول على القطة في القبعة والإخوة الصينيون الخمسة؟ ألا يستحق الأفضل؟ ينظر. إذا كنت تعتقد أن الأمر يتعلق بالغرامات المتأخرة والكتب المفقودة، فمن الأفضل أن تفكر مرة أخرى. يتعلق الأمر بحق ذلك الطفل في قراءة كتاب دون أن يتشوه عقله! أو: ربما يثيرك هذا يا سينفيلد؛ ربما هذه هي الطريقة التي تحصل بها على ركلاتك. أنت ورفاقك الطيبين.

Use the float-none utility to reset any floats that are applied to an element:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Prefix a float utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<article>  <img class="float-right ..." src="/img/mountains.jpg" />  <p>Maybe we can live without libraries, people like you and me. ...</p></article>
```

Example 2 (jsx):
```jsx
<article>  <img class="float-right ..." src="/img/mountains.jpg" />  <p>Maybe we can live without libraries, people like you and me. ...</p></article>
```

Example 3 (jsx):
```jsx
<article>  <img class="float-left ..." src="/img/mountains.jpg" />  <p>Maybe we can live without libraries, people like you and me. ...</p></article>
```

Example 4 (jsx):
```jsx
<article>  <img class="float-left ..." src="/img/mountains.jpg" />  <p>Maybe we can live without libraries, people like you and me. ...</p></article>
```

---

## clear

**URL:** https://tailwindcss.com/docs/clear

**Contents:**
- Examples
  - Clearing left
  - Clearing right
  - Clearing all
  - Using logical properties
  - Disabling clears
  - Responsive design

Use the clear-left utility to position an element below any preceding left-floated elements:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Use the clear-right utility to position an element below any preceding right-floated elements:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Use the clear-both utility to position an element below all preceding floated elements:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Use the clear-start and clear-end utilities, which use logical properties to map to either the left or right side based on the text direction:

ربما يمكننا العيش بدون مكتبات، أشخاص مثلي ومثلك. ربما. بالتأكيد، نحن أكبر من أن نغير العالم، ولكن ماذا عن ذلك الطفل الذي يجلس ويفتح كتابًا الآن في أحد فروع المكتبة المحلية ويجد رسومات للتبول والبول على القطة في القبعة والإخوة الصينيون الخمسة؟ ألا يستحق الأفضل؟ ينظر. إذا كنت تعتقد أن الأمر يتعلق بالغرامات المتأخرة والكتب المفقودة، فمن الأفضل أن تفكر مرة أخرى. يتعلق الأمر بحق ذلك الطفل في قراءة كتاب دون أن يتشوه عقله! أو: ربما يثيرك هذا يا سينفيلد؛ ربما هذه هي الطريقة التي تحصل بها على ركلاتك. أنت ورفاقك الطيبين.

Use the clear-none utility to reset any clears that are applied to an element:

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better? Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Prefix a clear utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<article>  <img class="float-left ..." src="/img/snow-mountains.jpg" />  <img class="float-right ..." src="/img/green-mountains.jpg" />  <p class="clear-left ...">Maybe we can live without libraries...</p></article>
```

Example 2 (jsx):
```jsx
<article>  <img class="float-left ..." src="/img/snow-mountains.jpg" />  <img class="float-right ..." src="/img/green-mountains.jpg" />  <p class="clear-left ...">Maybe we can live without libraries...</p></article>
```

Example 3 (jsx):
```jsx
<article>  <img class="float-left ..." src="/img/green-mountains.jpg" />  <img class="float-right ..." src="/img/snow-mountains.jpg" />  <p class="clear-right ...">Maybe we can live without libraries...</p></article>
```

Example 4 (jsx):
```jsx
<article>  <img class="float-left ..." src="/img/green-mountains.jpg" />  <img class="float-right ..." src="/img/snow-mountains.jpg" />  <p class="clear-right ...">Maybe we can live without libraries...</p></article>
```

---

## isolation

**URL:** https://tailwindcss.com/docs/isolation

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the isolate and isolation-auto utilities to control whether an element should explicitly create a new stacking context:

Prefix an isolation utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="isolate ...">  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="isolate ...">  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="isolate md:isolation-auto ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="isolate md:isolation-auto ...">  <!-- ... --></div>
```

---

## object-fit

**URL:** https://tailwindcss.com/docs/object-fit

**Contents:**
- Examples
  - Resizing to cover
  - Containing within
  - Stretching to fit
  - Scaling down
  - Using the original size
  - Responsive design

Use the object-cover utility to resize an element's content to cover its container:

Use the object-contain utility to resize an element's content to stay contained within its container:

Use the object-fill utility to stretch an element's content to fit its container:

Use the object-scale-down utility to display an element's content at its original size but scale it down to fit its container if necessary:

Use the object-none utility to display an element's content at its original size ignoring the container size:

Prefix an object-fit utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="h-48 w-96 object-cover ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="h-48 w-96 object-cover ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="h-48 w-96 object-contain ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="h-48 w-96 object-contain ..." src="/img/mountains.jpg" />
```

---

## object-position

**URL:** https://tailwindcss.com/docs/object-position

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like object-left and object-bottom-right to specify how a replaced element's content should be positioned within its container:

Hover over examples to see the full image

Use the object-[<value>] syntax to set the object position based on a completely custom value:

For CSS variables, you can also use the object-(<custom-property>) syntax:

This is just a shorthand for object-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an object-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="size-24 object-top-left ..." src="/img/mountains.jpg" /><img class="size-24 object-top ..." src="/img/mountains.jpg" /><img class="size-24 object-top-right ..." src="/img/mountains.jpg" /><img class="size-24 object-left ..." src="/img/mountains.jpg" /><img class="size-24 object-center ..." src="/img/mountains.jpg" /><img class="size-24 object-right ..." src="/img/mountains.jpg" /><img class="size-24 object-bottom-left ..." src="/img/mountains.jpg" /><img class="size-24 object-bottom ..." src="/img/mountains.jpg" /><img class="size-24 object-bottom-right ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="size-24 object-top-left ..." src="/img/mountains.jpg" /><img class="size-24 object-top ..." src="/img/mountains.jpg" /><img class="size-24 object-top-right ..." src="/img/mountains.jpg" /><img class="size-24 object-left ..." src="/img/mountains.jpg" /><img class="size-24 object-center ..." src="/img/mountains.jpg" /><img class="size-24 object-right ..." src="/img/mountains.jpg" /><img class="size-24 object-bottom-left ..." src="/img/mountains.jpg" /><img class="size-24 object-bottom ..." src="/img/mountains.jpg" /><img class="size-24 object-bottom-right ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="object-[25%_75%] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="object-[25%_75%] ..." src="/img/mountains.jpg" />
```

---

## overflow

**URL:** https://tailwindcss.com/docs/overflow

**Contents:**
- Examples
  - Showing content that overflows
  - Hiding content that overflows
  - Scrolling if needed
  - Scrolling horizontally if needed
  - Scrolling vertically if needed
  - Scrolling horizontally always
  - Scrolling vertically always
  - Scrolling in all directions
  - Responsive design

Use the overflow-visible utility to prevent content within an element from being clipped:

Note that any content that overflows the bounds of the element will then be visible.

Use the overflow-hidden utility to clip any content within an element that overflows the bounds of that element:

Use the overflow-auto utility to add scrollbars to an element in the event that its content overflows the bounds of that element:

Unlike overflow-scroll, which always shows scrollbars, this utility will only show them if scrolling is necessary.

Use the overflow-x-auto utility to allow horizontal scrolling if needed:

Use the overflow-y-auto utility to allow vertical scrolling if needed:

Use the overflow-x-scroll utility to allow horizontal scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system:

Use the overflow-y-scroll utility to allow vertical scrolling and always show scrollbars unless always-visible scrollbars are disabled by the operating system:

Use the overflow-scroll utility to add scrollbars to an element:

Scroll vertically and horizontally

Unlike overflow-auto, which only shows scrollbars if they are necessary, this utility always shows them. Note that some operating systems (like macOS) hide unnecessary scrollbars regardless of this setting.

Prefix an overflow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="overflow-visible ...">  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="overflow-visible ...">  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="overflow-hidden ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="overflow-hidden ...">  <!-- ... --></div>
```

---

## overscroll-behavior

**URL:** https://tailwindcss.com/docs/overscroll-behavior

**Contents:**
- Examples
  - Preventing parent overscrolling
  - Preventing overscroll bouncing
  - Using the default overscroll behavior
  - Responsive design

Use the overscroll-contain utility to prevent scrolling in the target area from triggering scrolling in the parent element, but preserve "bounce" effects when scrolling past the end of the container in operating systems that support it:

Scroll to see behavior

Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.

Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

Use the overscroll-none utility to prevent scrolling in the target area from triggering scrolling in the parent element, and also prevent "bounce" effects when scrolling past the end of the container:

Scroll to see behavior

Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.

Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

Use the overscroll-auto utility to make it possible for the user to continue scrolling a parent scroll area when they reach the boundary of the primary scroll area:

Scroll to see behavior

Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.

Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

Prefix an overscroll-behavior utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="overscroll-contain ...">Well, let me tell you something, ...</div>
```

Example 2 (jsx):
```jsx
<div class="overscroll-contain ...">Well, let me tell you something, ...</div>
```

Example 3 (jsx):
```jsx
<div class="overscroll-none ...">Well, let me tell you something, ...</div>
```

Example 4 (jsx):
```jsx
<div class="overscroll-none ...">Well, let me tell you something, ...</div>
```

---

## position

**URL:** https://tailwindcss.com/docs/position

**Contents:**
- Examples
  - Statically positioning elements
  - Relatively positioning elements
  - Absolutely positioning elements
  - Fixed positioning elements
  - Sticky positioning elements
  - Responsive design

Use the static utility to position an element according to the normal flow of the document:

With statically positioned elements, any offsets will be ignored and the element will not act as a position reference for absolutely positioned children.

Use the relative utility to position an element according to the normal flow of the document:

With relatively position elements, any offsets are calculated relative to the element's normal position and the element will act as a position reference for absolutely positioned children.

Use the absolute utility to position an element outside of the normal flow of the document, causing neighboring elements to act as if the element doesn't exist:

With static positioning

With absolute positioning

With absolutely positioned elements, any offsets are calculated relative to the nearest parent that has a position other than static, and the element will act as a position reference for other absolutely positioned children.

Use the fixed utility to position an element relative to the browser window:

Scroll this element to see the fixed positioning in action

With fixed positioned elements, any offsets are calculated relative to the viewport and the element will act as a position reference for absolutely positioned children:

Use the sticky utility to position an element as relative until it crosses a specified threshold, then treat it as fixed until its parent is off screen:

Scroll this element to see the sticky positioning in action

With sticky positioned elements, any offsets are calculated relative to the element's normal position and the element will act as a position reference for absolutely positioned children.

Prefix a position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="static ...">  <p>Static parent</p>  <div class="absolute bottom-0 left-0 ...">    <p>Absolute child</p>  </div></div>
```

Example 2 (jsx):
```jsx
<div class="static ...">  <p>Static parent</p>  <div class="absolute bottom-0 left-0 ...">    <p>Absolute child</p>  </div></div>
```

Example 3 (jsx):
```jsx
<div class="relative ...">  <p>Relative parent</p>  <div class="absolute bottom-0 left-0 ...">    <p>Absolute child</p>  </div></div>
```

Example 4 (jsx):
```jsx
<div class="relative ...">  <p>Relative parent</p>  <div class="absolute bottom-0 left-0 ...">    <p>Absolute child</p>  </div></div>
```

---

## top / right / bottom / left

**URL:** https://tailwindcss.com/docs/top-right-bottom-left

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using logical properties
  - Using a custom value
  - Responsive design
- Customizing your theme

Use top-<number>, right-<number>, bottom-<number>, left-<number>, and inset-<number> utilities like top-0 and bottom-4 to set the horizontal or vertical position of a positioned element:

To use a negative top/right/bottom/left value, prefix the class name with a dash to convert it to a negative value:

Use start-<number> or end-<number> utilities like start-0 and end-4 to set the inset-inline-start and inset-inline-end logical properties, which map to either the left or right side based on the text direction:

For more control, you can also use the LTR and RTL modifiers to conditionally apply specific styles depending on the current text direction.

Use utilities like inset-[<value>] and top-[<value>] to set the position based on a completely custom value:

For CSS variables, you can also use the inset-(<custom-property>) syntax:

This is just a shorthand for inset-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix inset,inset-x,inset-y,start,end,top,left,bottom, and right utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The inset-<number>,inset-x-<number>,inset-y-<number>,start-<number>,end-<number>,top-<number>,left-<number>,bottom-<number>, and right-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<!-- Pin to top left corner --><div class="relative size-32 ...">  <div class="absolute top-0 left-0 size-16 ...">01</div></div><!-- Span top edge --><div class="relative size-32 ...">  <div class="absolute inset-x-0 top-0 h-16 ...">02</div></div><!-- Pin to top right corner --><div class="relative size-32 ...">  <div class="absolute top-0 right-0 size-16 ...">03</div></div><!-- Span left edge --><div class="relative size-32 ...">  <div class="absolute inset-y-0 left-0 w-16 ...">04</div></div><!-- Fill entire parent --><div class="relative size-32 ...">  <div class="absolute inset-0 ...">05</div></div><!-- Span right edge --><div class="relative size-32 ...">  <div class="absolute inset-y-0 right-0 w-16 ...">06</div></div><!-- Pin to bottom left corner --><div class="relative size-32 ...">  <div class="absolute bottom-0 left-0 size-16 ...">07</div></div><!-- Span bottom edge --><div class="relative size-32 ...">  <div class="absolute inset-x-0 bottom-0 h-16 ...">08</div></div><!-- Pin to bottom right corner --><div class="relative size-32 ...">  <div class="absolute right-0 bottom-0 size-16 ...">09</div></div>
```

Example 2 (jsx):
```jsx
<!-- Pin to top left corner --><div class="relative size-32 ...">  <div class="absolute top-0 left-0 size-16 ...">01</div></div><!-- Span top edge --><div class="relative size-32 ...">  <div class="absolute inset-x-0 top-0 h-16 ...">02</div></div><!-- Pin to top right corner --><div class="relative size-32 ...">  <div class="absolute top-0 right-0 size-16 ...">03</div></div><!-- Span left edge --><div class="relative size-32 ...">  <div class="absolute inset-y-0 left-0 w-16 ...">04</div></div><!-- Fill entire parent --><div class="relative size-32 ...">  <div class="absolute inset-0 ...">05</div></div><!-- Span right edge --><div class="relative size-32 ...">  <div class="absolute inset-y-0 right-0 w-16 ...">06</div></div><!-- Pin to bottom left corner --><div class="relative size-32 ...">  <div class="absolute bottom-0 left-0 size-16 ...">07</div></div><!-- Span bottom edge --><div class="relative size-32 ...">  <div class="absolute inset-x-0 bottom-0 h-16 ...">08</div></div><!-- Pin to bottom right corner --><div class="relative size-32 ...">  <div class="absolute right-0 bottom-0 size-16 ...">09</div></div>
```

Example 3 (jsx):
```jsx
<div class="relative size-32 ...">  <div class="absolute -top-4 -left-4 size-14 ..."></div></div>
```

Example 4 (jsx):
```jsx
<div class="relative size-32 ...">  <div class="absolute -top-4 -left-4 size-14 ..."></div></div>
```

---

## visibility

**URL:** https://tailwindcss.com/docs/visibility

**Contents:**
- Examples
  - Making elements invisible
  - Collapsing elements
  - Making elements visible
  - Responsive design

Use the invisible utility to hide an element, but still maintain its place in the document, affecting the layout of other elements:

To completely remove an element from the document, use the display property instead.

Use the collapse utility to hide table rows, row groups, columns, and column groups as if they were set to display: none, but without impacting the size of other rows and columns:

This makes it possible to dynamically toggle rows and columns without affecting the table layout.

Use the visible utility to make an element visible:

This is mostly useful for undoing the invisible utility at different screen sizes.

Prefix a visibility utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4">  <div>01</div>  <div class="invisible ...">02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-cols-3 gap-4">  <div>01</div>  <div class="invisible ...">02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<table>  <thead>    <tr>      <th>Invoice #</th>      <th>Client</th>      <th>Amount</th>    </tr>  </thead>  <tbody>    <tr>      <td>#100</td>      <td>Pendant Publishing</td>      <td>$2,000.00</td>    </tr>    <tr class="collapse">      <td>#101</td>      <td>Kruger Industrial Smoothing</td>      <td>$545.00</td>    </tr>    <tr>      <td>#102</td>      <td>J. Peterman</td>      <td>$10,000.25</td>    </tr>  </tbody></table>
```

Example 4 (jsx):
```jsx
<table>  <thead>    <tr>      <th>Invoice #</th>      <th>Client</th>      <th>Amount</th>    </tr>  </thead>  <tbody>    <tr>      <td>#100</td>      <td>Pendant Publishing</td>      <td>$2,000.00</td>    </tr>    <tr class="collapse">      <td>#101</td>      <td>Kruger Industrial Smoothing</td>      <td>$545.00</td>    </tr>    <tr>      <td>#102</td>      <td>J. Peterman</td>      <td>$10,000.25</td>    </tr>  </tbody></table>
```

---

## z-index

**URL:** https://tailwindcss.com/docs/z-index

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using a custom value
  - Responsive design

Use the z-<number> utilities like z-10 and z-50 to control the stack order (or three-dimensional positioning) of an element, regardless of the order it has been displayed:

To use a negative z-index value, prefix the class name with a dash to convert it to a negative value:

Use the z-[<value>] syntax to set the stack order based on a completely custom value:

For CSS variables, you can also use the z-(<custom-property>) syntax:

This is just a shorthand for z-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a z-index utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="z-40 ...">05</div><div class="z-30 ...">04</div><div class="z-20 ...">03</div><div class="z-10 ...">02</div><div class="z-0 ...">01</div>
```

Example 2 (jsx):
```jsx
<div class="z-40 ...">05</div><div class="z-30 ...">04</div><div class="z-20 ...">03</div><div class="z-10 ...">02</div><div class="z-0 ...">01</div>
```

Example 3 (jsx):
```jsx
<div class="...">05</div><div class="...">04</div><div class="-z-10 ...">03</div><div class="...">02</div><div class="...">01</div>
```

Example 4 (jsx):
```jsx
<div class="...">05</div><div class="...">04</div><div class="-z-10 ...">03</div><div class="...">02</div><div class="...">01</div>
```

---

## grid-template-columns

**URL:** https://tailwindcss.com/docs/grid-template-columns

**Contents:**
- Examples
  - Specifying the grid columns
  - Implementing a subgrid
  - Using a custom value
  - Responsive design

Use grid-cols-<number> utilities like grid-cols-2 and grid-cols-4 to create grids with n equally sized columns:

Use the grid-cols-subgrid utility to adopt the column tracks defined by the item's parent:

Use the grid-cols-[<value>] syntax to set the columns based on a completely custom value:

For CSS variables, you can also use the grid-cols-(<custom-property>) syntax:

This is just a shorthand for grid-cols-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a grid-template-columns utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid grid-cols-4 gap-4">  <div>01</div>  <!-- ... -->  <div>09</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid grid-cols-4 gap-4">  <div>01</div>  <!-- ... -->  <div>09</div></div>
```

Example 3 (jsx):
```jsx
<div class="grid grid-cols-4 gap-4">  <div>01</div>  <!-- ... -->  <div>05</div>  <div class="col-span-3 grid grid-cols-subgrid gap-4">    <div class="col-start-2">06</div>  </div></div>
```

Example 4 (jsx):
```jsx
<div class="grid grid-cols-4 gap-4">  <div>01</div>  <!-- ... -->  <div>05</div>  <div class="col-span-3 grid grid-cols-subgrid gap-4">    <div class="col-start-2">06</div>  </div></div>
```

---

## grid-auto-columns

**URL:** https://tailwindcss.com/docs/grid-auto-columns

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like auto-cols-min and auto-cols-max to control the size of implicitly-created grid columns:

Use the auto-cols-[<value>] syntax to set the size of implicitly-created grid columns based on a completely custom value:

For CSS variables, you can also use the auto-cols-(<custom-property>) syntax:

This is just a shorthand for auto-cols-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a grid-auto-columns utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="grid auto-cols-max grid-flow-col">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 2 (jsx):
```jsx
<div class="grid auto-cols-max grid-flow-col">  <div>01</div>  <div>02</div>  <div>03</div></div>
```

Example 3 (jsx):
```jsx
<div class="auto-cols-[minmax(0,2fr)] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="auto-cols-[minmax(0,2fr)] ...">  <!-- ... --></div>
```

---

## list-style-position

**URL:** https://tailwindcss.com/docs/list-style-position

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like list-inside and list-outside to control the position of the markers and text indentation in a list:

Prefix a list-style-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<ul class="list-inside">  <li>5 cups chopped Porcini mushrooms</li>  <!-- ... --></ul><ul class="list-outside">  <li>5 cups chopped Porcini mushrooms</li>  <!-- ... --></ul>
```

Example 2 (jsx):
```jsx
<ul class="list-inside">  <li>5 cups chopped Porcini mushrooms</li>  <!-- ... --></ul><ul class="list-outside">  <li>5 cups chopped Porcini mushrooms</li>  <!-- ... --></ul>
```

Example 3 (jsx):
```jsx
<ul class="list-outside md:list-inside ...">  <!-- ... --></ul>
```

Example 4 (jsx):
```jsx
<ul class="list-outside md:list-inside ...">  <!-- ... --></ul>
```

---

## text-overflow

**URL:** https://tailwindcss.com/docs/text-overflow

**Contents:**
- Examples
  - Truncating text
  - Adding an ellipsis
  - Clipping text
  - Responsive design

Use the truncate utility to prevent text from wrapping and truncate overflowing text with an ellipsis (…) if needed:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

Use the text-ellipsis utility to truncate overflowing text with an ellipsis (…) if needed:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

Use the text-clip utility to truncate the text at the limit of the content area:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

This is the default browser behavior.

Prefix a text-overflow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="truncate">The longest word in any of the major...</p>
```

Example 2 (jsx):
```jsx
<p class="truncate">The longest word in any of the major...</p>
```

Example 3 (jsx):
```jsx
<p class="overflow-hidden text-ellipsis">The longest word in any of the major...</p>
```

Example 4 (jsx):
```jsx
<p class="overflow-hidden text-ellipsis">The longest word in any of the major...</p>
```

---

## overflow-wrap

**URL:** https://tailwindcss.com/docs/overflow-wrap

**Contents:**
- Examples
  - Wrapping mid-word
  - Wrapping anywhere
  - Wrapping normally
  - Responsive design

Use the wrap-break-word utility to allow line breaks between letters in a word if needed:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

The wrap-anywhere utility behaves similarly to wrap-break-word, except that the browser factors in mid-word line breaks when calculating the intrinsic size of the element:

jason.riemenschneider@vandelayindustries.com

jason.riemenschneider@vandelayindustries.com

This is useful for wrapping text inside of flex containers, where you would usually need to set min-width: 0 on the child element to allow it to shrink below its content size.

Use the wrap-normal utility to only allow line breaks at natural wrapping points, like spaces, hyphens, and punctuation:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

Prefix an overflow-wrap utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="wrap-break-word">The longest word in any of the major...</p>
```

Example 2 (jsx):
```jsx
<p class="wrap-break-word">The longest word in any of the major...</p>
```

Example 3 (jsx):
```jsx
<div class="flex max-w-sm">  <img class="size-16 rounded-full" src="/img/profile.jpg" />  <div class="wrap-break-word">    <p class="font-medium">Jay Riemenschneider</p>    <p>jason.riemenschneider@vandelayindustries.com</p>  </div></div><div class="flex max-w-sm">  <img class="size-16 rounded-full" src="/img/profile.jpg" />  <div class="wrap-anywhere">    <p class="font-medium">Jay Riemenschneider</p>    <p>jason.riemenschneider@vandelayindustries.com</p>  </div></div>
```

Example 4 (jsx):
```jsx
<div class="flex max-w-sm">  <img class="size-16 rounded-full" src="/img/profile.jpg" />  <div class="wrap-break-word">    <p class="font-medium">Jay Riemenschneider</p>    <p>jason.riemenschneider@vandelayindustries.com</p>  </div></div><div class="flex max-w-sm">  <img class="size-16 rounded-full" src="/img/profile.jpg" />  <div class="wrap-anywhere">    <p class="font-medium">Jay Riemenschneider</p>    <p>jason.riemenschneider@vandelayindustries.com</p>  </div></div>
```

---

## background-position

**URL:** https://tailwindcss.com/docs/background-position

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like bg-center, bg-right, and bg-top-left to control the position of an element's background image:

Hover over these examples to see the full image

Use the bg-position-[<value>] syntax to set the background position based on a completely custom value:

For CSS variables, you can also use the bg-position-(<custom-property>) syntax:

This is just a shorthand for bg-position-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a background-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-top-left"></div><div class="bg-[url(/img/mountains.jpg)] bg-top"></div><div class="bg-[url(/img/mountains.jpg)] bg-top-right"></div><div class="bg-[url(/img/mountains.jpg)] bg-left"></div><div class="bg-[url(/img/mountains.jpg)] bg-center"></div><div class="bg-[url(/img/mountains.jpg)] bg-right"></div><div class="bg-[url(/img/mountains.jpg)] bg-bottom-left"></div><div class="bg-[url(/img/mountains.jpg)] bg-bottom"></div><div class="bg-[url(/img/mountains.jpg)] bg-bottom-right"></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-top-left"></div><div class="bg-[url(/img/mountains.jpg)] bg-top"></div><div class="bg-[url(/img/mountains.jpg)] bg-top-right"></div><div class="bg-[url(/img/mountains.jpg)] bg-left"></div><div class="bg-[url(/img/mountains.jpg)] bg-center"></div><div class="bg-[url(/img/mountains.jpg)] bg-right"></div><div class="bg-[url(/img/mountains.jpg)] bg-bottom-left"></div><div class="bg-[url(/img/mountains.jpg)] bg-bottom"></div><div class="bg-[url(/img/mountains.jpg)] bg-bottom-right"></div>
```

Example 3 (jsx):
```jsx
<div class="bg-position-[center_top_1rem] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="bg-position-[center_top_1rem] ...">  <!-- ... --></div>
```

---

## mask-position

**URL:** https://tailwindcss.com/docs/mask-position

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like mask-center, mask-right, and mask-left-top to control the position of an element's mask image:

Use the mask-position-[<value>] syntax to set the mask position based on a completely custom value:

For CSS variables, you can also use the mask-position-(<custom-property>) syntax:

This is just a shorthand for mask-position-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a mask-position utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-top-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-top mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-top-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-center mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-bottom-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-bottom mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-bottom-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="mask-top-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-top mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-top-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-center mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-bottom-left mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-bottom mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-bottom-right mask-[url(/img/circle.png)] mask-size-[50%] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="mask-position-[center_top_1rem] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="mask-position-[center_top_1rem] ...">  <!-- ... --></div>
```

---

## backface-visibility

**URL:** https://tailwindcss.com/docs/backface-visibility

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the backface-visible utility to show the backface of an element, like a cube, even when it's rotated away from view:

Prefix a backface-visibility utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="size-20 ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 backface-hidden ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 backface-hidden ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 backface-hidden ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 backface-hidden ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 backface-hidden ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 backface-hidden ...">6</div></div><div class="size-20 ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 backface-visible ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 backface-visible ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 backface-visible ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 backface-visible ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 backface-visible ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 backface-visible ...">6</div></div>
```

Example 2 (jsx):
```jsx
<div class="size-20 ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 backface-hidden ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 backface-hidden ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 backface-hidden ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 backface-hidden ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 backface-hidden ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 backface-hidden ...">6</div></div><div class="size-20 ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 backface-visible ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 backface-visible ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 backface-visible ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 backface-visible ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 backface-visible ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 backface-visible ...">6</div></div>
```

Example 3 (jsx):
```jsx
<div class="backface-visible md:backface-hidden ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backface-visible md:backface-hidden ...">  <!-- ... --></div>
```

---
