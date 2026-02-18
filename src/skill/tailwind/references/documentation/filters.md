# Tailwind_Docs - Filters

**Pages:** 19

---

## filter

**URL:** https://tailwindcss.com/docs/filter

**Contents:**
- Examples
  - Basic example
  - Removing filters
  - Using a custom value
  - Applying on hover
  - Responsive design

Use utilities like blur-xs and grayscale to apply filters to an element:

You can combine the following filter utilities: blur, brightness, contrast, drop-shadow, grayscale, hue-rotate, invert, saturate, and sepia.

Use the filter-none utility to remove all of the filters applied to an element:

Use the filter-[<value>] syntax to set the filter based on a completely custom value:

For CSS variables, you can also use the filter-(<custom-property>) syntax:

This is just a shorthand for filter-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter utility with a variant like hover:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

Prefix a filter utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="blur-xs" src="/img/mountains.jpg" /><img class="grayscale" src="/img/mountains.jpg" /><img class="blur-xs grayscale" src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="blur-xs" src="/img/mountains.jpg" /><img class="grayscale" src="/img/mountains.jpg" /><img class="blur-xs grayscale" src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="blur-md brightness-150 invert md:filter-none" src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="blur-md brightness-150 invert md:filter-none" src="/img/mountains.jpg" />
```

---

## filter: blur()

**URL:** https://tailwindcss.com/docs/filter-blur

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like blur-sm and blur-lg to blur an element:

Use the blur-[<value>] syntax to set the blur based on a completely custom value:

For CSS variables, you can also use the blur-(<custom-property>) syntax:

This is just a shorthand for blur-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: blur() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --blur-* theme variables to customize the blur utilities in your project:

Now the blur-2xs utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="blur-none" src="/img/mountains.jpg" /><img class="blur-sm" src="/img/mountains.jpg" /><img class="blur-lg" src="/img/mountains.jpg" /><img class="blur-2xl" src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="blur-none" src="/img/mountains.jpg" /><img class="blur-sm" src="/img/mountains.jpg" /><img class="blur-lg" src="/img/mountains.jpg" /><img class="blur-2xl" src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="blur-[2px] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="blur-[2px] ..." src="/img/mountains.jpg" />
```

---

## filter: brightness()

**URL:** https://tailwindcss.com/docs/filter-brightness

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like brightness-50 and brightness-100 to control an element's brightness:

Use the brightness-[<value>] syntax to set the brightness based on a completely custom value:

For CSS variables, you can also use the brightness-(<custom-property>) syntax:

This is just a shorthand for brightness-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: brightness() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="brightness-50 ..." src="/img/mountains.jpg" /><img class="brightness-100 ..." src="/img/mountains.jpg" /><img class="brightness-125 ..." src="/img/mountains.jpg" /><img class="brightness-200 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="brightness-50 ..." src="/img/mountains.jpg" /><img class="brightness-100 ..." src="/img/mountains.jpg" /><img class="brightness-125 ..." src="/img/mountains.jpg" /><img class="brightness-200 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="brightness-[1.75] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="brightness-[1.75] ..." src="/img/mountains.jpg" />
```

---

## filter: contrast()

**URL:** https://tailwindcss.com/docs/filter-contrast

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like contrast-50 and contrast-100 to control an element's contrast:

Use the contrast-[<value>] syntax to set the contrast based on a completely custom value:

For CSS variables, you can also use the contrast-(<custom-property>) syntax:

This is just a shorthand for contrast-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: contrast() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="contrast-50 ..." src="/img/mountains.jpg" /><img class="contrast-100 ..." src="/img/mountains.jpg" /><img class="contrast-125 ..." src="/img/mountains.jpg" /><img class="contrast-200 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="contrast-50 ..." src="/img/mountains.jpg" /><img class="contrast-100 ..." src="/img/mountains.jpg" /><img class="contrast-125 ..." src="/img/mountains.jpg" /><img class="contrast-200 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="contrast-[.25] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="contrast-[.25] ..." src="/img/mountains.jpg" />
```

---

## filter: drop-shadow()

**URL:** https://tailwindcss.com/docs/filter-drop-shadow

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Setting the shadow color
  - Removing a drop shadow
  - Using a custom value
  - Responsive design
- Customizing your theme
  - Customizing drop shadows
  - Customizing shadow colors

Use utilities like drop-shadow-sm and drop-shadow-xl to add a drop shadow to an element:

This is useful for applying shadows to irregular shapes, like text and SVG elements. For applying shadows to regular elements, you probably want to use box shadow instead.

Use the opacity modifier to adjust the opacity of the drop shadow:

The default drop shadow opacities are quite low (15% or less), so increasing the opacity (to like 50%) will make the drop shadows more pronounced.

Use utilities like drop-shadow-indigo-500 and drop-shadow-cyan-500/50 to change the color of a drop shadow:

drop-shadow-cyan-500/50

drop-shadow-indigo-500/50

By default colored shadows have an opacity of 100% but you can adjust this using the opacity modifier.

Use the drop-shadow-none utility to remove an existing drop shadow from an element:

Use the drop-shadow-[<value>] syntax to set the drop shadow based on a completely custom value:

For CSS variables, you can also use the drop-shadow-(<custom-property>) syntax:

This is just a shorthand for drop-shadow-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: drop-shadow() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --drop-shadow-* theme variables to customize the drop shadow utilities in your project:

Now the drop-shadow-3xl utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the drop-shadow-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<svg class="drop-shadow-md ...">  <!-- ... --></svg><svg class="drop-shadow-lg ...">  <!-- ... --></svg><svg class="drop-shadow-xl ...">  <!-- ... --></svg>
```

Example 2 (jsx):
```jsx
<svg class="drop-shadow-md ...">  <!-- ... --></svg><svg class="drop-shadow-lg ...">  <!-- ... --></svg><svg class="drop-shadow-xl ...">  <!-- ... --></svg>
```

Example 3 (jsx):
```jsx
<svg class="fill-white drop-shadow-xl ...">...</svg><svg class="fill-white drop-shadow-xl/25 ...">...</svg><svg class="fill-white drop-shadow-xl/50 ...">...</svg>
```

Example 4 (jsx):
```jsx
<svg class="fill-white drop-shadow-xl ...">...</svg><svg class="fill-white drop-shadow-xl/25 ...">...</svg><svg class="fill-white drop-shadow-xl/50 ...">...</svg>
```

---

## filter: grayscale()

**URL:** https://tailwindcss.com/docs/filter-grayscale

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like grayscale and grayscale-75 to control the amount of grayscale effect applied to an element:

Use the grayscale-[<value>] syntax to set the grayscale based on a completely custom value:

For CSS variables, you can also use the grayscale-(<custom-property>) syntax:

This is just a shorthand for grayscale-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: grayscale() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="grayscale-0 ..." src="/img/mountains.jpg" /><img class="grayscale-25 ..." src="/img/mountains.jpg" /><img class="grayscale-50 ..." src="/img/mountains.jpg" /><img class="grayscale ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="grayscale-0 ..." src="/img/mountains.jpg" /><img class="grayscale-25 ..." src="/img/mountains.jpg" /><img class="grayscale-50 ..." src="/img/mountains.jpg" /><img class="grayscale ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="grayscale-[0.5] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="grayscale-[0.5] ..." src="/img/mountains.jpg" />
```

---

## filter: hue-rotate()

**URL:** https://tailwindcss.com/docs/filter-hue-rotate

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using a custom value
  - Responsive design

Use utilities like hue-rotate-90 and hue-rotate-180 to rotate the hue of an element by degrees:

Use utilities like -hue-rotate-15 and -hue-rotate-45 to set a negative hue rotate value:

Use the hue-rotate-[<value>] syntax to set the hue rotation based on a completely custom value:

For CSS variables, you can also use the hue-rotate-(<custom-property>) syntax:

This is just a shorthand for hue-rotate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: hue-rotate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="hue-rotate-15" src="/img/mountains.jpg" /><img class="hue-rotate-90" src="/img/mountains.jpg" /><img class="hue-rotate-180" src="/img/mountains.jpg" /><img class="hue-rotate-270" src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="hue-rotate-15" src="/img/mountains.jpg" /><img class="hue-rotate-90" src="/img/mountains.jpg" /><img class="hue-rotate-180" src="/img/mountains.jpg" /><img class="hue-rotate-270" src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="-hue-rotate-15" src="/img/mountains.jpg" /><img class="-hue-rotate-45" src="/img/mountains.jpg" /><img class="-hue-rotate-90" src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="-hue-rotate-15" src="/img/mountains.jpg" /><img class="-hue-rotate-45" src="/img/mountains.jpg" /><img class="-hue-rotate-90" src="/img/mountains.jpg" />
```

---

## filter: invert()

**URL:** https://tailwindcss.com/docs/filter-invert

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like invert and invert-20 to control the color inversion of an element:

Use the invert-[<value>] syntax to set the color inversion based on a completely custom value:

For CSS variables, you can also use the invert-(<custom-property>) syntax:

This is just a shorthand for invert-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: invert() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="invert-0" src="/img/mountains.jpg" /><img class="invert-20" src="/img/mountains.jpg" /><img class="invert" src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="invert-0" src="/img/mountains.jpg" /><img class="invert-20" src="/img/mountains.jpg" /><img class="invert" src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="invert-[.25] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="invert-[.25] ..." src="/img/mountains.jpg" />
```

---

## filter: saturate()

**URL:** https://tailwindcss.com/docs/filter-saturate

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like saturate-50 and saturate-100 to control an element's saturation:

Use the saturate-[<value>] syntax to set the saturation based on a completely custom value:

For CSS variables, you can also use the saturate-(<custom-property>) syntax:

This is just a shorthand for saturate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: saturate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="saturate-50 ..." src="/img/mountains.jpg" /><img class="saturate-100 ..." src="/img/mountains.jpg" /><img class="saturate-150 ..." src="/img/mountains.jpg" /><img class="saturate-200 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="saturate-50 ..." src="/img/mountains.jpg" /><img class="saturate-100 ..." src="/img/mountains.jpg" /><img class="saturate-150 ..." src="/img/mountains.jpg" /><img class="saturate-200 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="saturate-[.25] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="saturate-[.25] ..." src="/img/mountains.jpg" />
```

---

## filter: sepia()

**URL:** https://tailwindcss.com/docs/filter-sepia

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like sepia and sepia-50 to control the sepia effect applied to an element:

Use the sepia-[<value>] syntax to set the sepia amount based on a completely custom value:

For CSS variables, you can also use the sepia-(<custom-property>) syntax:

This is just a shorthand for sepia-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a filter: sepia() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="sepia-0" src="/img/mountains.jpg" /><img class="sepia-50" src="/img/mountains.jpg" /><img class="sepia" src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="sepia-0" src="/img/mountains.jpg" /><img class="sepia-50" src="/img/mountains.jpg" /><img class="sepia" src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="sepia-[.25] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="sepia-[.25] ..." src="/img/mountains.jpg" />
```

---

## backdrop-filter

**URL:** https://tailwindcss.com/docs/backdrop-filter

**Contents:**
- Examples
  - Basic example
  - Removing filters
  - Using a custom value
  - Applying on hover
  - Responsive design

Use utilities like backdrop-blur-xs and backdrop-grayscale to apply filters to an element's backdrop:

You can combine the following backdrop filter utilities: blur, brightness, contrast, grayscale, hue-rotate, invert, opacity, saturate, and sepia.

Use the backdrop-filter-none utility to remove all of the backdrop filters applied to an element:

Use the backdrop-filter-[<value>] syntax to set the backdrop filter based on a completely custom value:

For CSS variables, you can also use the backdrop-filter-(<custom-property>) syntax:

This is just a shorthand for backdrop-filter-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter utility with a variant like hover:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

Prefix a backdrop-filter utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] ...">  <div class="backdrop-blur-xs ..."></div></div><div class="bg-[url(/img/mountains.jpg)] ...">  <div class="backdrop-grayscale ..."></div></div><div class="bg-[url(/img/mountains.jpg)] ...">  <div class="backdrop-blur-xs backdrop-grayscale ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)] ...">  <div class="backdrop-blur-xs ..."></div></div><div class="bg-[url(/img/mountains.jpg)] ...">  <div class="backdrop-grayscale ..."></div></div><div class="bg-[url(/img/mountains.jpg)] ...">  <div class="backdrop-blur-xs backdrop-grayscale ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none"></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-blur-md backdrop-brightness-150 md:backdrop-filter-none"></div>
```

---

## backdrop-filter: blur()

**URL:** https://tailwindcss.com/docs/backdrop-filter-blur

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like backdrop-blur-sm and backdrop-blur-lg to control an element’s backdrop blur:

Use the backdrop-blur-[<value>] syntax to set the backdrop blur based on a completely custom value:

For CSS variables, you can also use the backdrop-blur-(<custom-property>) syntax:

This is just a shorthand for backdrop-blur-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: blur() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --blur-* theme variables to customize the backdrop blur utilities in your project:

Now the backdrop-blur-2xs utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-blur-none ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-blur-sm ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-blur-md ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-blur-none ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-blur-sm ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-blur-md ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-blur-[2px] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-blur-[2px] ...">  <!-- ... --></div>
```

---

## backdrop-filter: brightness()

**URL:** https://tailwindcss.com/docs/backdrop-filter-brightness

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-brightness-50 and backdrop-brightness-100 to control an element's backdrop brightness:

backdrop-brightness-50

backdrop-brightness-150

Use the backdrop-brightness-[<value>] syntax to set the backdrop brightness based on a completely custom value:

For CSS variables, you can also use the backdrop-brightness-(<custom-property>) syntax:

This is just a shorthand for backdrop-brightness-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: brightness() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-brightness-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-brightness-150 ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-brightness-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-brightness-150 ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-brightness-[1.75] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-brightness-[1.75] ...">  <!-- ... --></div>
```

---

## backdrop-filter: contrast()

**URL:** https://tailwindcss.com/docs/backdrop-filter-contrast

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-contrast-50 and backdrop-contrast-100 to control an element's backdrop contrast:

backdrop-contrast-200

Use the backdrop-contrast-[<value>] syntax to set the backdrop contrast based on a completely custom value:

For CSS variables, you can also use the backdrop-contrast-(<custom-property>) syntax:

This is just a shorthand for backdrop-contrast-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: contrast() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-contrast-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-contrast-200 ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-contrast-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-contrast-200 ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-contrast-[.25] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-contrast-[.25] ...">  <!-- ... --></div>
```

---

## backdrop-filter: grayscale()

**URL:** https://tailwindcss.com/docs/backdrop-filter-grayscale

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-grayscale-50 and backdrop-grayscale to control the grayscale effect applied to an element's backdrop:

backdrop-grayscale-50

Use the backdrop-grayscale-[<value>] syntax to set the backdrop grayscale based on a completely custom value:

For CSS variables, you can also use the backdrop-grayscale-(<custom-property>) syntax:

This is just a shorthand for backdrop-grayscale-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: grayscale() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-grayscale-0 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-grayscale-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-grayscale-200 ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-grayscale-0 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-grayscale-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-grayscale-200 ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-grayscale-[0.5] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-grayscale-[0.5] ...">  <!-- ... --></div>
```

---

## backdrop-filter: hue-rotate()

**URL:** https://tailwindcss.com/docs/backdrop-filter-hue-rotate

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using a custom value
  - Responsive design

Use utilities like backdrop-hue-rotate-90 and backdrop-hue-rotate-180 to rotate the hue of an element's backdrop:

backdrop-hue-rotate-90

backdrop-hue-rotate-180

backdrop-hue-rotate-270

Use utilities like -backdrop-hue-rotate-90 and -backdrop-hue-rotate-180 to set a negative backdrop hue rotation value:

-backdrop-hue-rotate-15

-backdrop-hue-rotate-45

-backdrop-hue-rotate-90

Use the backdrop-hue-rotate-[<value>] syntax to set the backdrop hue rotation based on a completely custom value:

For CSS variables, you can also use the backdrop-hue-rotate-(<custom-property>) syntax:

This is just a shorthand for backdrop-hue-rotate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: hue-rotate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-hue-rotate-90 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-hue-rotate-180 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-hue-rotate-270 ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-hue-rotate-90 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-hue-rotate-180 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-hue-rotate-270 ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 -backdrop-hue-rotate-15 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 -backdrop-hue-rotate-45 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 -backdrop-hue-rotate-90 ..."></div></div>
```

Example 4 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 -backdrop-hue-rotate-15 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 -backdrop-hue-rotate-45 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 -backdrop-hue-rotate-90 ..."></div></div>
```

---

## backdrop-filter: invert()

**URL:** https://tailwindcss.com/docs/backdrop-filter-invert

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-invert and backdrop-invert-65 to control the color inversion of an element's backdrop:

Use the backdrop-invert-[<value>] syntax to set the backdrop inversion based on a completely custom value:

For CSS variables, you can also use the backdrop-invert-(<custom-property>) syntax:

This is just a shorthand for backdrop-invert-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: invert() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert-0 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert-65 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert-0 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert-65 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-invert ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-invert-[.25] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-invert-[.25] ...">  <!-- ... --></div>
```

---

## backdrop-filter: saturate()

**URL:** https://tailwindcss.com/docs/backdrop-filter-saturate

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-saturate-50 and backdrop-saturate-100 utilities to control the saturation of an element's backdrop:

backdrop-saturate-125

backdrop-saturate-200

Use the backdrop-saturate-[<value>] syntax to set the backdrop saturation based on a completely custom value:

For CSS variables, you can also use the backdrop-saturate-(<custom-property>) syntax:

This is just a shorthand for backdrop-saturate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: saturate() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-saturate-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-saturate-125 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-saturate-200 ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-saturate-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-saturate-125 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-saturate-200 ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-saturate-[.25] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-saturate-[.25] ...">  <!-- ... --></div>
```

---

## backdrop-filter: sepia()

**URL:** https://tailwindcss.com/docs/backdrop-filter-sepia

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like backdrop-sepia and backdrop-sepia-50 to control the sepia effect applied to an element's backdrop:

Use the backdrop-sepia-[<value>] syntax to set the backdrop sepia based on a completely custom value:

For CSS variables, you can also use the backdrop-sepia-(<custom-property>) syntax:

This is just a shorthand for backdrop-sepia-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a backdrop-filter: sepia() utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-sepia-0 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-sepia-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-sepia ..."></div></div>
```

Example 2 (jsx):
```jsx
<div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-sepia-0 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-sepia-50 ..."></div></div><div class="bg-[url(/img/mountains.jpg)]">  <div class="bg-white/30 backdrop-sepia ..."></div></div>
```

Example 3 (jsx):
```jsx
<div class="backdrop-sepia-[.25] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="backdrop-sepia-[.25] ...">  <!-- ... --></div>
```

---
