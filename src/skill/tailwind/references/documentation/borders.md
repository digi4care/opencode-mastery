# Tailwind_Docs - Borders

**Pages:** 2

---

## outline-style

**URL:** https://tailwindcss.com/docs/outline-style

**Contents:**
- Examples
  - Basic example
  - Hiding an outline
  - Removing outlines
  - Responsive design

Use utilities like outline-solid and outline-dashed to set the style of an element's outline:

Use the outline-hidden utility to hide the default browser outline on focused elements, while still preserving the outline in forced colors mode:

Try emulating `forced-colors: active` in your developer tools to see the behavior

It is highly recommended to apply your own focus styling for accessibility when using this utility.

Use the outline-none utility to completely remove the default browser outline on focused elements:

It is highly recommended to apply your own focus styling for accessibility when using this utility.

Prefix an outline-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="outline-2 outline-offset-2 outline-solid ...">Button A</button><button class="outline-2 outline-offset-2 outline-dashed ...">Button B</button><button class="outline-2 outline-offset-2 outline-dotted ...">Button C</button><button class="outline-3 outline-offset-2 outline-double ...">Button D</button>
```

Example 2 (jsx):
```jsx
<button class="outline-2 outline-offset-2 outline-solid ...">Button A</button><button class="outline-2 outline-offset-2 outline-dashed ...">Button B</button><button class="outline-2 outline-offset-2 outline-dotted ...">Button C</button><button class="outline-3 outline-offset-2 outline-double ...">Button D</button>
```

Example 3 (jsx):
```jsx
<input class="focus:border-indigo-600 focus:outline-hidden ..." type="text" />
```

Example 4 (jsx):
```jsx
<input class="focus:border-indigo-600 focus:outline-hidden ..." type="text" />
```

---

## outline-offset

**URL:** https://tailwindcss.com/docs/outline-offset

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like outline-offset-2 and outline-offset-4 to change the offset of an element's outline:

Use the outline-offset-[<value>] syntax to set the outline offset based on a completely custom value:

For CSS variables, you can also use the outline-offset-(<custom-property>) syntax:

This is just a shorthand for outline-offset-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an outline-offset utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="outline-2 outline-offset-0 ...">Button A</button><button class="outline-2 outline-offset-2 ...">Button B</button><button class="outline-2 outline-offset-4 ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="outline-2 outline-offset-0 ...">Button A</button><button class="outline-2 outline-offset-2 ...">Button B</button><button class="outline-2 outline-offset-4 ...">Button C</button>
```

Example 3 (jsx):
```jsx
<div class="outline-offset-[2vw] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="outline-offset-[2vw] ...">  <!-- ... --></div>
```

---
