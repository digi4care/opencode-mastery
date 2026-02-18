# Tailwind_Docs - Svg

**Pages:** 2

---

## fill

**URL:** https://tailwindcss.com/docs/fill

**Contents:**
- Examples
  - Basic example
  - Using the current color
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like fill-indigo-500 and fill-lime-600 to change the fill color of an SVG:

This can be useful for styling icon sets like Heroicons.

Use the fill-current utility to set the fill color to the current text color:

Hover over the button to see the fill color change

Use the fill-[<value>] syntax to set the fill color based on a completely custom value:

For CSS variables, you can also use the fill-(<custom-property>) syntax:

This is just a shorthand for fill-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a fill utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the fill-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<svg class="fill-blue-500 ...">  <!-- ... --></svg>
```

Example 2 (jsx):
```jsx
<svg class="fill-blue-500 ...">  <!-- ... --></svg>
```

Example 3 (jsx):
```jsx
<button class="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white ...">  <svg class="size-5 fill-current ...">    <!-- ... -->  </svg>  Check for updates</button>
```

Example 4 (jsx):
```jsx
<button class="bg-white text-indigo-600 hover:bg-indigo-600 hover:text-white ...">  <svg class="size-5 fill-current ...">    <!-- ... -->  </svg>  Check for updates</button>
```

---

## stroke

**URL:** https://tailwindcss.com/docs/stroke

**Contents:**
- Examples
  - Basic example
  - Using the current color
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like stroke-indigo-500 and stroke-lime-600 to change the stroke color of an SVG:

This can be useful for styling icon sets like Heroicons.

Use the stroke-current utility to set the stroke color to the current text color:

Hover over the button to see the stroke color change

Use the stroke-[<value>] syntax to set the stroke color based on a completely custom value:

For CSS variables, you can also use the stroke-(<custom-property>) syntax:

This is just a shorthand for stroke-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a stroke utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the stroke-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<svg class="stroke-cyan-500 ...">  <!-- ... --></svg>
```

Example 2 (jsx):
```jsx
<svg class="stroke-cyan-500 ...">  <!-- ... --></svg>
```

Example 3 (jsx):
```jsx
<button class="bg-white text-pink-600 hover:bg-pink-600 hover:text-white ...">  <svg class="size-5 stroke-current ..." fill="none">    <!-- ... -->  </svg>  Download file</button>
```

Example 4 (jsx):
```jsx
<button class="bg-white text-pink-600 hover:bg-pink-600 hover:text-white ...">  <svg class="size-5 stroke-current ..." fill="none">    <!-- ... -->  </svg>  Download file</button>
```

---
