# Tailwind_Docs - Backgrounds

**Pages:** 6

---

## background-attachment

**URL:** https://tailwindcss.com/docs/background-attachment

**Contents:**
- Examples
  - Fixing the background image
  - Scrolling with the container
  - Scrolling with the viewport
  - Responsive design

Use the bg-fixed utility to fix the background image relative to the viewport:

Scroll the content to see the background image fixed in place

Maybe we can live without libraries, people like you and me. Maybe. Sure, we're too old to change the world, but what about that kid, sitting down, opening a book, right now, in a branch at the local library and finding drawings of pee-pees and wee-wees on the Cat in the Hat and the Five Chinese Brothers? Doesn't HE deserve better?

Look. If you think this is about overdue fines and missing books, you'd better think again. This is about that kid's right to read a book without getting his mind warped! Or: maybe that turns you on, Seinfeld; maybe that's how y'get your kicks. You and your good-time buddies.

Use the bg-local utility to scroll the background image with the container and the viewport:

Scroll the content to see the background image scroll with the container

Because the mail never stops. It just keeps coming and coming and coming, there's never a let-up. It's relentless. Every day it piles up more and more and more. And you gotta get it out but the more you get it out the more it keeps coming in. And then the barcode reader breaks and it's Publisher's Clearing House day.

Use the bg-scroll utility to scroll the background image with the viewport, but not with the container:

Scroll the content to see the background image fixed in the container

Because the mail never stops. It just keeps coming and coming and coming, there's never a let-up. It's relentless. Every day it piles up more and more and more. And you gotta get it out but the more you get it out the more it keeps coming in. And then the barcode reader breaks and it's Publisher's Clearing House day.

Prefix a background-attachment utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-fixed ...">  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-fixed ...">  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-local ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-local ...">  <!-- ... --></div>
```

---

## background-clip

**URL:** https://tailwindcss.com/docs/background-clip

**Contents:**
- Examples
  - Basic example
  - Cropping to text
  - Responsive design

Use the bg-clip-border, bg-clip-padding, and bg-clip-content utilities to control the bounding box of an element's background:

Use the bg-clip-text utility to crop an element's background to match the shape of the text:

Prefix a background-clip utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="border-4 bg-indigo-500 bg-clip-border p-3"></div><div class="border-4 bg-indigo-500 bg-clip-padding p-3"></div><div class="border-4 bg-indigo-500 bg-clip-content p-3"></div>
```

Example 2 (jsx):
```jsx
<div class="border-4 bg-indigo-500 bg-clip-border p-3"></div><div class="border-4 bg-indigo-500 bg-clip-padding p-3"></div><div class="border-4 bg-indigo-500 bg-clip-content p-3"></div>
```

Example 3 (jsx):
```jsx
<p class="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent ...">  Hello world</p>
```

Example 4 (jsx):
```jsx
<p class="bg-linear-to-r from-pink-500 to-violet-500 bg-clip-text text-5xl font-extrabold text-transparent ...">  Hello world</p>
```

---

## background-image

**URL:** https://tailwindcss.com/docs/background-image

**Contents:**
- Examples
  - Basic example
  - Adding a linear gradient
  - Adding a radial gradient
  - Adding a conic gradient
  - Setting gradient color stops
  - Setting gradient stop positions
  - Changing interpolation mode
  - Removing background images
  - Using a custom value

Use the bg-[<value>] syntax to set the background image of an element:

Use utilities like bg-linear-to-r and bg-linear-<angle> with the color stop utilities to add a linear gradient to an element:

Use the bg-radial and bg-radial-[<position>] utilities with the color stop utilities to add a radial gradient to an element:

Use the bg-conic and bg-conic-<angle> utilities with the color stop utilities to add a conic gradient to an element:

Use utilities like from-indigo-500, via-purple-500, and to-pink-500 to set the colors of the gradient stops:

Use utilities like from-10%, via-30%, and to-90% to set more precise positions for the gradient color stops:

Use the interpolation modifier to control the interpolation mode of a gradient:

By default gradients are interpolated in the oklab color space.

Use the bg-none utility to remove an existing background image from an element:

Use utilities like bg-linear-[<value>] and from-[<value>] to set the gradient based on a completely custom value:

For CSS variables, you can also use the bg-linear-(<custom-property>) syntax:

This is just a shorthand for bg-linear-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a background-image utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now utilities like from-regal-blue,via-regal-blue, and to-regal-blue can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="h-14 bg-linear-to-r from-cyan-500 to-blue-500"></div><div class="h-14 bg-linear-to-t from-sky-500 to-indigo-500"></div><div class="h-14 bg-linear-to-bl from-violet-500 to-fuchsia-500"></div><div class="h-14 bg-linear-65 from-purple-500 to-pink-500"></div>
```

Example 4 (jsx):
```jsx
<div class="h-14 bg-linear-to-r from-cyan-500 to-blue-500"></div><div class="h-14 bg-linear-to-t from-sky-500 to-indigo-500"></div><div class="h-14 bg-linear-to-bl from-violet-500 to-fuchsia-500"></div><div class="h-14 bg-linear-65 from-purple-500 to-pink-500"></div>
```

---

## background-origin

**URL:** https://tailwindcss.com/docs/background-origin

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the bg-origin-border, bg-origin-padding, and bg-origin-content utilities to control where an element's background is rendered:

Prefix a background-origin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-border p-3 ..."></div><div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-padding p-3 ..."></div><div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-content p-3 ..."></div>
```

Example 2 (jsx):
```jsx
<div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-border p-3 ..."></div><div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-padding p-3 ..."></div><div class="border-4 bg-[url(/img/mountains.jpg)] bg-origin-content p-3 ..."></div>
```

Example 3 (jsx):
```jsx
<div class="bg-origin-border md:bg-origin-padding ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="bg-origin-border md:bg-origin-padding ...">  <!-- ... --></div>
```

---

## background-repeat

**URL:** https://tailwindcss.com/docs/background-repeat

**Contents:**
- Examples
  - Basic example
  - Repeating horizontally
  - Repeating vertically
  - Preventing clipping
  - Preventing clipping and gaps
  - Disabling repeating
  - Responsive design

Use the bg-repeat utility to repeat the background image both vertically and horizontally:

Use the bg-repeat-x utility to only repeat the background image horizontally:

Use the bg-repeat-y utility to only repeat the background image vertically:

Use the bg-repeat-space utility to repeat the background image without clipping:

Use the bg-repeat-round utility to repeat the background image without clipping, stretching if needed to avoid gaps:

Use the bg-no-repeat utility to prevent a background image from repeating:

Prefix a background-repeat utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat ..."></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat ..."></div>
```

Example 3 (jsx):
```jsx
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-x ..."></div>
```

Example 4 (jsx):
```jsx
<div class="bg-[url(/img/clouds.svg)] bg-center bg-repeat-x ..."></div>
```

---

## background-size

**URL:** https://tailwindcss.com/docs/background-size

**Contents:**
- Examples
  - Filling the container
  - Filling without cropping
  - Using the default size
  - Using a custom value
  - Responsive design

Use the bg-cover utility to scale the background image until it fills the background layer, cropping the image if needed:

Use the bg-contain utility to scale the background image to the outer edges without cropping or stretching:

Use the bg-auto utility to display the background image at its default size:

Use the bg-size-[<value>] syntax to set the background size based on a completely custom value:

For CSS variables, you can also use the bg-size-(<custom-property>) syntax:

This is just a shorthand for bg-size-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a background-size utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-cover bg-center"></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-cover bg-center"></div>
```

Example 3 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-contain bg-center"></div>
```

Example 4 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] bg-contain bg-center"></div>
```

---
