# Tailwind_Docs - Effects

**Pages:** 14

---

## box-shadow

**URL:** https://tailwindcss.com/docs/box-shadow

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Setting the shadow color
  - Adding an inset shadow
  - Setting the inset shadow color
  - Adding a ring
  - Setting the ring color
  - Adding an inset ring
  - Setting the inset ring color

Use utilities like shadow-sm and shadow-lg to apply different sized outer box shadows to an element:

Use the opacity modifier to adjust the opacity of the box shadow:

The default box shadow opacities are quite low (25% or less), so increasing the opacity (to like 50%) will make the box shadows more pronounced.

Use utilities like shadow-indigo-500 and shadow-cyan-500/50 to change the color of a box shadow:

By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

Use utilities like inset-shadow-xs and inset-shadow-sm to apply an inset box shadow to an element:

You can adjust the opacity of an inset shadow using the opacity modifier, like inset-shadow-sm/50. The default inset shadow opacities are quite low (5%), so increasing the opacity (to like 50%) will make the inset shadows more pronounced.

Use utilities like inset-shadow-indigo-500 and inset-shadow-cyan-500/50 to change the color of an inset box shadow:

inset-shadow-indigo-500

inset-shadow-indigo-500/50

By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

Use ring or ring-<number> utilities like ring-2 and ring-4 to apply a solid box-shadow to an element:

By default rings match the currentColor of the element they are applied to.

Use utilities like ring-indigo-500 and ring-cyan-500/50 to change the color of a ring:

By default rings have an opacity of 100% but you can adjust this using the opacity modifier.

Use inset-ring or inset-ring-<number> utilities like inset-ring-2 and inset-ring-4 to apply a solid inset box-shadow to an element:

By default inset rings match the currentColor of the element they are applied to.

Use utilities like inset-ring-indigo-500 and inset-ring-cyan-500/50 to change the color of an inset ring:

inset-ring-blue-500/50

By default inset rings have an opacity of 100% but you can adjust this using the opacity modifier.

Use the shadow-none, inset-shadow-none,ring-0, and inset-ring-0 utilities to remove an existing box shadow from an element:

Use utilities like shadow-[<value>],inset-shadow-[<value>],ring-[<value>], and inset-ring-[<value>] to set the box shadow based on a completely custom value:

For CSS variables, you can also use the shadow-(<custom-property>) syntax:

This is just a shorthand for shadow-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a box-shadow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --shadow-* theme variables to customize the box shadow utilities in your project:

Now the shadow-3xl utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

Use the --inset-shadow-* theme variables to customize the inset box shadow utilities in your project:

Now the inset-shadow-md utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now utilities like shadow-regal-blue,inset-shadow-regal-blue,ring-regal-blue, and inset-ring-regal-blue can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="shadow-md ..."></div><div class="shadow-lg ..."></div><div class="shadow-xl ..."></div>
```

Example 2 (jsx):
```jsx
<div class="shadow-md ..."></div><div class="shadow-lg ..."></div><div class="shadow-xl ..."></div>
```

Example 3 (jsx):
```jsx
<div class="shadow-xl ..."></div><div class="shadow-xl/20 ..."></div><div class="shadow-xl/30 ..."></div>
```

Example 4 (jsx):
```jsx
<div class="shadow-xl ..."></div><div class="shadow-xl/20 ..."></div><div class="shadow-xl/30 ..."></div>
```

---

## text-shadow

**URL:** https://tailwindcss.com/docs/text-shadow

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Setting the shadow color
  - Removing a text shadow
  - Using a custom value
  - Responsive design
- Customizing your theme
  - Customizing text shadows
  - Customizing shadow colors

Use utilities like text-shadow-sm and shadow-lg to apply different sized text shadows to a text element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the opacity modifier to adjust the opacity of the text shadow:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The default text shadow opacities are quite low (20% or less), so increasing the opacity (to like 50%) will make the text shadows more pronounced.

Use utilities like text-shadow-indigo-500 and text-shadow-cyan-500/50 to change the color of a text shadow:

By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

Use the text-shadow-none utility to remove an existing text shadow from an element:

Use the text-shadow-[<value>] syntax to set the text shadow based on a completely custom value:

For CSS variables, you can also use the text-shadow-(<custom-property>) syntax:

This is just a shorthand for text-shadow-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a text-shadow utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --text-shadow-* theme variables to customize the text shadow utilities in your project:

Now the text-shadow-xl utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the text-shadow-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="text-shadow-2xs ...">The quick brown fox...</p><p class="text-shadow-xs ...">The quick brown fox...</p><p class="text-shadow-sm ...">The quick brown fox...</p><p class="text-shadow-md ...">The quick brown fox...</p><p class="text-shadow-lg ...">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="text-shadow-2xs ...">The quick brown fox...</p><p class="text-shadow-xs ...">The quick brown fox...</p><p class="text-shadow-sm ...">The quick brown fox...</p><p class="text-shadow-md ...">The quick brown fox...</p><p class="text-shadow-lg ...">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="text-shadow-lg ...">The quick brown fox...</p><p class="text-shadow-lg/20 ...">The quick brown fox...</p><p class="text-shadow-lg/30 ...">The quick brown fox...</p>
```

Example 4 (jsx):
```jsx
<p class="text-shadow-lg ...">The quick brown fox...</p><p class="text-shadow-lg/20 ...">The quick brown fox...</p><p class="text-shadow-lg/30 ...">The quick brown fox...</p>
```

---

## opacity

**URL:** https://tailwindcss.com/docs/opacity

**Contents:**
- Examples
  - Basic example
  - Applying conditionally
  - Using a custom value
  - Responsive design

Use opacity-<number> utilities like opacity-25 and opacity-100 to set the opacity of an element:

Prefix an opacity utility with a variant like disabled:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

Use the opacity-[<value>] syntax to set the opacity based on a completely custom value:

For CSS variables, you can also use the opacity-(<custom-property>) syntax:

This is just a shorthand for opacity-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an opacity utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="bg-indigo-500 opacity-100 ..."></button><button class="bg-indigo-500 opacity-75 ..."></button><button class="bg-indigo-500 opacity-50 ..."></button><button class="bg-indigo-500 opacity-25 ..."></button>
```

Example 2 (jsx):
```jsx
<button class="bg-indigo-500 opacity-100 ..."></button><button class="bg-indigo-500 opacity-75 ..."></button><button class="bg-indigo-500 opacity-50 ..."></button><button class="bg-indigo-500 opacity-25 ..."></button>
```

Example 3 (jsx):
```jsx
<input class="opacity-100 disabled:opacity-75 ..." type="text" />
```

Example 4 (jsx):
```jsx
<input class="opacity-100 disabled:opacity-75 ..." type="text" />
```

---

## mix-blend-mode

**URL:** https://tailwindcss.com/docs/mix-blend-mode

**Contents:**
- Examples
  - Basic example
  - Isolating blending
  - Responsive design

Use utilities like mix-blend-overlay and mix-blend-soft-light to control how an element's content and background is blended with other content in the same stacking context:

Use the isolate utility on the parent element to create a new stacking context and prevent blending with content behind it:

Prefix a mix-blend-mode utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="flex justify-center -space-x-14">  <div class="bg-blue-500 mix-blend-multiply ..."></div>  <div class="bg-pink-500 mix-blend-multiply ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="flex justify-center -space-x-14">  <div class="bg-blue-500 mix-blend-multiply ..."></div>  <div class="bg-pink-500 mix-blend-multiply ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="isolate flex justify-center -space-x-14">  <div class="bg-yellow-500 mix-blend-multiply ..."></div>  <div class="bg-green-500 mix-blend-multiply ..."></div></div><div class="flex justify-center -space-x-14">  <div class="bg-yellow-500 mix-blend-multiply ..."></div>  <div class="bg-green-500 mix-blend-multiply ..."></div></div>
```

Example 4 (jsx):
```jsx
<div class="isolate flex justify-center -space-x-14">  <div class="bg-yellow-500 mix-blend-multiply ..."></div>  <div class="bg-green-500 mix-blend-multiply ..."></div></div><div class="flex justify-center -space-x-14">  <div class="bg-yellow-500 mix-blend-multiply ..."></div>  <div class="bg-green-500 mix-blend-multiply ..."></div></div>
```

---

## background-blend-mode

**URL:** https://tailwindcss.com/docs/background-blend-mode

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like bg-blend-difference and bg-blend-saturation to control how the background image and color of an element are blended:

Prefix a background-blend-mode utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-multiply ..."></div><div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-soft-light ..."></div><div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-overlay ..."></div>
```

Example 2 (jsx):
```jsx
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-multiply ..."></div><div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-soft-light ..."></div><div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-overlay ..."></div>
```

Example 3 (jsx):
```jsx
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-lighten md:bg-blend-darken ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="bg-blue-500 bg-[url(/img/mountains.jpg)] bg-blend-lighten md:bg-blend-darken ...">  <!-- ... --></div>
```

---

## mask-clip

**URL:** https://tailwindcss.com/docs/mask-clip

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like mask-clip-border, mask-clip-padding, and mask-clip-content to control the bounding box of an element's mask:

Prefix a mask-clip utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-clip-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-clip-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-clip-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="mask-clip-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-clip-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-clip-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="mask-clip-border md:mask-clip-padding ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="mask-clip-border md:mask-clip-padding ...">  <!-- ... --></div>
```

---

## mask-composite

**URL:** https://tailwindcss.com/docs/mask-composite

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like mask-add and mask-intersect to control how an element's masks are combined together:

Prefix a mask-composite utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-add mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div><div class="mask-subtract mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div><div class="mask-intersect mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div><div class="mask-exclude mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
```

Example 2 (jsx):
```jsx
<div class="mask-add mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div><div class="mask-subtract mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div><div class="mask-intersect mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div><div class="mask-exclude mask-[url(/img/circle.png),url(/img/circle.png)] mask-[position:30%_50%,70%_50%] bg-[url(/img/mountains.jpg)]"></div>
```

Example 3 (jsx):
```jsx
<div class="mask-add md:mask-subtract ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="mask-add md:mask-subtract ...">  <!-- ... --></div>
```

---

## mask-image

**URL:** https://tailwindcss.com/docs/mask-image

**Contents:**
- Examples
  - Using an image mask
  - Masking edges
  - Adding an angled linear mask
  - Adding a radial mask
    - Setting the radial position
    - Setting the radial size
  - Adding a conic mask
  - Combining masks
  - Removing mask images

Use the mask-[<value>] syntax to set the mask image of an element:

Use utilities like mask-b-from-<value> and mask-t-to-<value> to add a linear gradient mask to a single side of an element:

mask-l-from-50% mask-l-to-90%

mask-b-from-20% mask-b-to-80%

Additionally, use utilities like mask-x-from-70% and mask-y-to-90% to apply a mask to two sides of an element at the same time:

mask-x-from-70% mask-x-to-90%

mask-y-from-70% mask-y-to-90%

By default, linear gradient masks transition from black to transparent, but you can customize the gradient colors using the mask-<side>-from-<color> and mask-<side>-to-<color> utilities.

Use utilities like mask-linear-<angle>, mask-linear-from-20, and mask-linear-to-40 to add a custom linear gradient mask to an element:

Use the mask-radial-from-<value> and mask-radial-to-<value> utilities to add a radial gradient mask to an element:

Built for power users

Work faster than ever with our keyboard shortcuts

By default, radial gradient masks transition from black to transparent, but you can customize the gradient colors using the mask-radial-from-<color> and mask-radial-to-<color> utilities.

Use utilities like mask-radial-at-bottom-left and mask-radial-at-[35%_35%] to set the position of the center of the radial gradient mask:

mask-radial-at-top-left

mask-radial-at-top-right

mask-radial-at-center

mask-radial-at-bottom-left

mask-radial-at-bottom

mask-radial-at-bottom-right

This is different from mask-position which sets the position of the mask image itself, not the radial gradient.

Use utilities like mask-radial-closest-corner and mask-radial-farthest-side to set the size of the radial gradient mask:

mask-radial-closest-side

mask-radial-closest-corner

mask-radial-farthest-side

mask-radial-farthest-corner

When setting a custom radial gradient size, the units you can use depend on the <ending-shape> of the gradient which is set to ellipse by default.

With mask-circle, you can only use a single fixed length, like mask-radial-[5rem]. Whereas with mask-ellipse, you can specify each axis as a fixed length or percentage, like mask-radial-[40%_80%].

Use the mask-conic-from-<value>, mask-conic-to-<value> and mask-conic-<angle> utilities to add a conic gradient mask to an element:

0.48 GB out of 2 GB remaining

By default, conic gradient masks transition from black to transparent, but you can customize the gradient colors using the mask-conic-from-<color> and mask-conic-to-<color> utilities.

Gradient mask utilities, like mask-radial-from-<value>, mask-conic-to-<value>, and mask-l-from-<value> can be combined to create more complex gradient masks:

This behavior relies on the fact that Tailwind sets the mask-composite property to intersect by default. Changing this property will affect how the gradient masks are combined.

Use the mask-none utility to remove an existing mask image from an element:

Use utilities like mask-linear-[<value>] and mask-radial-[<value>] to set the mask image based on a completely custom value:

For CSS variables, you can also use the mask-linear-(<custom-property>) syntax:

This is just a shorthand for mask-linear-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a mask-image utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now utilities like mask-radial-from-regal-blue,mask-conic-to-regal-blue, and mask-b-from-regal-blue can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ...">  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ...">  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="mask-t-from-50% bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-r-from-30% bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-l-from-50% mask-l-to-90% bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-b-from-20% mask-b-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 4 (jsx):
```jsx
<div class="mask-t-from-50% bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-r-from-30% bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-l-from-50% mask-l-to-90% bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-b-from-20% mask-b-to-80% bg-[url(/img/mountains.jpg)] ..."></div>
```

---

## mask-mode

**URL:** https://tailwindcss.com/docs/mask-mode

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the mask-alpha, mask-luminance and mask-match utilities to control the mode of an element's mask:

When using mask-luminance the luminance value of the mask determines visibility, so sticking with grayscale colors will produce the most predictable results. With mask-alpha, the opacity of the mask determines the visibility of the masked element.

Prefix a mask-mode utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-luminance mask-r-from-white mask-r-from-50% mask-r-to-black bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="mask-alpha mask-r-from-black mask-r-from-50% mask-r-to-transparent bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-luminance mask-r-from-white mask-r-from-50% mask-r-to-black bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="mask-alpha md:mask-luminance ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="mask-alpha md:mask-luminance ...">  <!-- ... --></div>
```

---

## mask-origin

**URL:** https://tailwindcss.com/docs/mask-origin

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like mask-origin-border, mask-origin-padding, and mask-origin-content to control where an element's mask is rendered:

Prefix a mask-origin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-origin-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-origin-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-origin-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="mask-origin-border border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-origin-padding border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div><div class="mask-origin-content border-3 p-1.5 mask-[url(/img/circle.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="mask-origin-border md:mask-origin-padding ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="mask-origin-border md:mask-origin-padding ...">  <!-- ... --></div>
```

---

## mask-repeat

**URL:** https://tailwindcss.com/docs/mask-repeat

**Contents:**
- Examples
  - Basic example
  - Repeating horizontally
  - Repeating vertically
  - Preventing clipping
  - Preventing clipping and gaps
  - Disabling repeating
  - Responsive design

Use the mask-repeat utility to repeat the mask image both vertically and horizontally:

Use the mask-repeat-x utility to only repeat the mask image horizontally:

Use the mask-repeat-y utility to only repeat the mask image vertically:

Use the mask-repeat-space utility to repeat the mask image without clipping:

Use the mask-repeat-round utility to repeat the mask image without clipping, stretching if needed to avoid gaps:

Use the mask-no-repeat utility to prevent a mask image from repeating:

Prefix a mask-repeat utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-repeat mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="mask-repeat mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="mask-repeat-x mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)]..."></div>
```

Example 4 (jsx):
```jsx
<div class="mask-repeat-x mask-[url(/img/circle.png)] mask-size-[50px_50px] bg-[url(/img/mountains.jpg)]..."></div>
```

---

## mask-size

**URL:** https://tailwindcss.com/docs/mask-size

**Contents:**
- Examples
  - Filling the container
  - Filling without cropping
  - Using the default size
  - Using a custom value
  - Responsive design

Use the mask-cover utility to scale the mask image until it fills the mask layer, cropping the image if needed:

Use the mask-contain utility to scale the mask image to the outer edges without cropping or stretching:

Use the mask-auto utility to display the mask image at its default size:

Use the mask-size-[<value>] syntax to set the mask image size based on a completely custom value:

For CSS variables, you can also use the mask-size-(<custom-property>) syntax:

This is just a shorthand for mask-size-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a mask-size utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="mask-cover mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 2 (jsx):
```jsx
<div class="mask-cover mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 3 (jsx):
```jsx
<div class="mask-contain mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

Example 4 (jsx):
```jsx
<div class="mask-contain mask-[url(/img/scribble.png)] bg-[url(/img/mountains.jpg)] ..."></div>
```

---

## mask-type

**URL:** https://tailwindcss.com/docs/mask-type

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the mask-type-alpha and mask-type-luminance utilities to control the type of an SVG mask:

When using mask-type-luminance the luminance value of the SVG mask determines visibility, so sticking with grayscale colors will produce the most predictable results. With mask-alpha, the opacity of the SVG mask determines the visibility of the masked element.

Prefix a mask-type utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<svg>  <mask id="blob1" class="mask-type-alpha fill-gray-700/70">    <path d="..."></path>  </mask>  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob1)" /></svg><svg>  <mask id="blob2" class="mask-type-luminance fill-gray-700/70">    <path d="..."></path>  </mask>  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob2)" /></svg>
```

Example 2 (jsx):
```jsx
<svg>  <mask id="blob1" class="mask-type-alpha fill-gray-700/70">    <path d="..."></path>  </mask>  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob1)" /></svg><svg>  <mask id="blob2" class="mask-type-luminance fill-gray-700/70">    <path d="..."></path>  </mask>  <image href="/img/mountains.jpg" height="100%" width="100%" mask="url(#blob2)" /></svg>
```

Example 3 (jsx):
```jsx
<mask class="mask-type-alpha md:mask-type-luminance ...">  <!-- ... --></mask>
```

Example 4 (jsx):
```jsx
<mask class="mask-type-alpha md:mask-type-luminance ...">  <!-- ... --></mask>
```

---

## backdrop-filter: opacity()

**URL:** https://tailwindcss.com/docs/backdrop-filter-opacity

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-opacity-50 and backdrop-opacity-75 to control the opacity of all the backdrop filters applied to an element:

Use the backdrop-opacity-[<value>] syntax to set the backdrop filter opacity based on a completely custom value:

For CSS variables, you can also use the backdrop-opacity-(<custom-property>) syntax:

This is just a shorthand for backdrop-opacity-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: opacity() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert backdrop-opacity-10 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert backdrop-opacity-60 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert backdrop-opacity-95 ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert backdrop-opacity-10 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert backdrop-opacity-60 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert backdrop-opacity-95 ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-opacity-[.15] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-opacity-[.15] ...">  <!-- ... --></div>
```

---
