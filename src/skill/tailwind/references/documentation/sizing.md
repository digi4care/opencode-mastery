# Tailwind_Docs - Sizing

**Pages:** 10

---

## width

**URL:** https://tailwindcss.com/docs/width

**Contents:**
- Examples
  - Basic example
  - Using a percentage
  - Using the container scale
  - Matching the viewport
  - Resetting the width
  - Setting both width and height
  - Using a custom value
  - Responsive design
- Customizing your theme

Use w-<number> utilities like w-24 and w-64 to set an element to a fixed width based on the spacing scale:

Use w-full or w-<fraction> utilities like w-1/2 and w-2/5 to give an element a percentage-based width:

Use utilities like w-sm and w-xl to set an element to a fixed width based on the container scale:

Use the w-screen utility to make an element span the entire width of the viewport:

Alternatively, you can match the width of the large, small or dynamic viewports using the w-lvw, w-svw, and w-dvw utilities.

Use the w-auto utility to remove an element's assigned width under a specific condition, like at a particular breakpoint:

Use utilities like size-px, size-4, and size-full to set both the width and height of an element at the same time:

Use the w-[<value>] syntax to set the width based on a completely custom value:

For CSS variables, you can also use the w-(<custom-property>) syntax:

This is just a shorthand for w-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The w-<number> and size-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="w-96 ...">w-96</div><div class="w-80 ...">w-80</div><div class="w-64 ...">w-64</div><div class="w-48 ...">w-48</div><div class="w-40 ...">w-40</div><div class="w-32 ...">w-32</div><div class="w-24 ...">w-24</div>
```

Example 2 (jsx):
```jsx
<div class="w-96 ...">w-96</div><div class="w-80 ...">w-80</div><div class="w-64 ...">w-64</div><div class="w-48 ...">w-48</div><div class="w-40 ...">w-40</div><div class="w-32 ...">w-32</div><div class="w-24 ...">w-24</div>
```

Example 3 (jsx):
```jsx
<div class="flex ...">  <div class="w-1/2 ...">w-1/2</div>  <div class="w-1/2 ...">w-1/2</div></div><div class="flex ...">  <div class="w-2/5 ...">w-2/5</div>  <div class="w-3/5 ...">w-3/5</div></div><div class="flex ...">  <div class="w-1/3 ...">w-1/3</div>  <div class="w-2/3 ...">w-2/3</div></div><div class="flex ...">  <div class="w-1/4 ...">w-1/4</div>  <div class="w-3/4 ...">w-3/4</div></div><div class="flex ...">  <div class="w-1/5 ...">w-1/5</div>  <div class="w-4/5 ...">w-4/5</div></div><div class="flex ...">  <div class="w-1/6 ...">w-1/6</div>  <div class="w-5/6 ...">w-5/6</div></div><div class="w-full ...">w-full</div>
```

Example 4 (jsx):
```jsx
<div class="flex ...">  <div class="w-1/2 ...">w-1/2</div>  <div class="w-1/2 ...">w-1/2</div></div><div class="flex ...">  <div class="w-2/5 ...">w-2/5</div>  <div class="w-3/5 ...">w-3/5</div></div><div class="flex ...">  <div class="w-1/3 ...">w-1/3</div>  <div class="w-2/3 ...">w-2/3</div></div><div class="flex ...">  <div class="w-1/4 ...">w-1/4</div>  <div class="w-3/4 ...">w-3/4</div></div><div class="flex ...">  <div class="w-1/5 ...">w-1/5</div>  <div class="w-4/5 ...">w-4/5</div></div><div class="flex ...">  <div class="w-1/6 ...">w-1/6</div>  <div class="w-5/6 ...">w-5/6</div></div><div class="w-full ...">w-full</div>
```

---

## min-width

**URL:** https://tailwindcss.com/docs/min-width

**Contents:**
- Examples
  - Basic example
  - Using a percentage
  - Using the container scale
  - Using a custom value
  - Responsive design
- Customizing your theme

Use min-w-<number> utilities like min-w-24 and min-w-64 to set an element to a fixed minimum width based on the spacing scale:

Use min-w-full or min-w-<fraction> utilities like min-w-1/2 and min-w-2/5 to give an element a percentage-based minimum width:

Use utilities like min-w-sm and min-w-xl to set an element to a fixed minimum width based on the container scale:

Use the min-w-[<value>] syntax to set the minimum width based on a completely custom value:

For CSS variables, you can also use the min-w-(<custom-property>) syntax:

This is just a shorthand for min-w-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a min-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The min-w-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="w-20 ...">  <div class="min-w-80 ...">min-w-80</div>  <div class="min-w-64 ...">min-w-64</div>  <div class="min-w-48 ...">min-w-48</div>  <div class="min-w-40 ...">min-w-40</div>  <div class="min-w-32 ...">min-w-32</div>  <div class="min-w-24 ...">min-w-24</div></div>
```

Example 2 (jsx):
```jsx
<div class="w-20 ...">  <div class="min-w-80 ...">min-w-80</div>  <div class="min-w-64 ...">min-w-64</div>  <div class="min-w-48 ...">min-w-48</div>  <div class="min-w-40 ...">min-w-40</div>  <div class="min-w-32 ...">min-w-32</div>  <div class="min-w-24 ...">min-w-24</div></div>
```

Example 3 (jsx):
```jsx
<div class="flex ...">  <div class="min-w-3/4 ...">min-w-3/4</div>  <div class="w-full ...">w-full</div></div>
```

Example 4 (jsx):
```jsx
<div class="flex ...">  <div class="min-w-3/4 ...">min-w-3/4</div>  <div class="w-full ...">w-full</div></div>
```

---

## max-width

**URL:** https://tailwindcss.com/docs/max-width

**Contents:**
- Examples
  - Basic example
  - Using a percentage
  - Using the container scale
  - Using breakpoints container
  - Using a custom value
  - Responsive design
- Customizing your theme

Use max-w-<number> utilities like max-w-24 and max-w-64 to set an element to a fixed maximum width based on the spacing scale:

Resize the example to see the expected behavior

Use max-w-full or max-w-<fraction> utilities like max-w-1/2 and max-w-2/5 to give an element a percentage-based maximum width:

Resize the example to see the expected behavior

Use utilities like max-w-sm and max-w-xl to set an element to a fixed maximum width based on the container scale:

Resize the example to see the expected behavior

Use the container utility to set the maximum width of an element to match the min-width of the current breakpoint. This is useful if you'd prefer to design for a fixed set of screen sizes instead of trying to accommodate a fully fluid viewport:

Note that unlike containers you might have used in other frameworks, Tailwind's container does not center itself automatically and does not have any built-in horizontal padding. Use mx-auto and the px-<number> utilities to add these:

Use the max-w-[<value>] syntax to set the maximum width based on a completely custom value:

For CSS variables, you can also use the max-w-(<custom-property>) syntax:

This is just a shorthand for max-w-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a max-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The max-w-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="w-full max-w-96 ...">max-w-96</div><div class="w-full max-w-80 ...">max-w-80</div><div class="w-full max-w-64 ...">max-w-64</div><div class="w-full max-w-48 ...">max-w-48</div><div class="w-full max-w-40 ...">max-w-40</div><div class="w-full max-w-32 ...">max-w-32</div><div class="w-full max-w-24 ...">max-w-24</div>
```

Example 2 (jsx):
```jsx
<div class="w-full max-w-96 ...">max-w-96</div><div class="w-full max-w-80 ...">max-w-80</div><div class="w-full max-w-64 ...">max-w-64</div><div class="w-full max-w-48 ...">max-w-48</div><div class="w-full max-w-40 ...">max-w-40</div><div class="w-full max-w-32 ...">max-w-32</div><div class="w-full max-w-24 ...">max-w-24</div>
```

Example 3 (jsx):
```jsx
<div class="w-full max-w-9/10 ...">max-w-9/10</div><div class="w-full max-w-3/4 ...">max-w-3/4</div><div class="w-full max-w-1/2 ...">max-w-1/2</div><div class="w-full max-w-1/3 ...">max-w-1/3</div>
```

Example 4 (jsx):
```jsx
<div class="w-full max-w-9/10 ...">max-w-9/10</div><div class="w-full max-w-3/4 ...">max-w-3/4</div><div class="w-full max-w-1/2 ...">max-w-1/2</div><div class="w-full max-w-1/3 ...">max-w-1/3</div>
```

---

## height

**URL:** https://tailwindcss.com/docs/height

**Contents:**
- Examples
  - Basic example
  - Using a percentage
  - Matching viewport
  - Matching dynamic viewport
  - Matching large viewport
  - Matching small viewport
  - Setting both width and height
  - Using a custom value
  - Responsive design

Use h-<number> utilities like h-24 and h-64 to set an element to a fixed height based on the spacing scale:

Use h-full or h-<fraction> utilities like h-1/2 and h-2/5 to give an element a percentage-based height:

Use the h-screen utility to make an element span the entire height of the viewport:

Use the h-dvh utility to make an element span the entire height of the viewport, which changes as the browser UI expands or contracts:

Scroll the viewport to see the viewport height change

Use the h-lvh utility to set an element's height to the largest possible height of the viewport:

Scroll the viewport to see the viewport height change

Use the h-svh utility to set an element's height to the smallest possible height of the viewport:

Scroll the viewport to see the viewport height change

Use utilities like size-px, size-4, and size-full to set both the width and height of an element at the same time:

Use the h-[<value>] syntax to set the height based on a completely custom value:

For CSS variables, you can also use the h-(<custom-property>) syntax:

This is just a shorthand for h-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a height utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The h-<number> and size-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="h-96 ...">h-96</div><div class="h-80 ...">h-80</div><div class="h-64 ...">h-64</div><div class="h-48 ...">h-48</div><div class="h-40 ...">h-40</div><div class="h-32 ...">h-32</div><div class="h-24 ...">h-24</div>
```

Example 2 (jsx):
```jsx
<div class="h-96 ...">h-96</div><div class="h-80 ...">h-80</div><div class="h-64 ...">h-64</div><div class="h-48 ...">h-48</div><div class="h-40 ...">h-40</div><div class="h-32 ...">h-32</div><div class="h-24 ...">h-24</div>
```

Example 3 (jsx):
```jsx
<div class="h-full ...">h-full</div><div class="h-9/10 ...">h-9/10</div><div class="h-3/4 ...">h-3/4</div><div class="h-1/2 ...">h-1/2</div><div class="h-1/3 ...">h-1/3</div>
```

Example 4 (jsx):
```jsx
<div class="h-full ...">h-full</div><div class="h-9/10 ...">h-9/10</div><div class="h-3/4 ...">h-3/4</div><div class="h-1/2 ...">h-1/2</div><div class="h-1/3 ...">h-1/3</div>
```

---

## min-height

**URL:** https://tailwindcss.com/docs/min-height

**Contents:**
- Examples
  - Basic example
  - Using a percentage
  - Using a custom value
  - Responsive design
- Customizing your theme

Use min-h-<number> utilities like min-h-24 and min-h-64 to set an element to a fixed minimum height based on the spacing scale:

Use min-h-full or min-h-<fraction> utilities like min-h-1/2, and min-h-2/5 to give an element a percentage-based minimum height:

Use the min-h-[<value>] syntax to set the minimum height based on a completely custom value:

For CSS variables, you can also use the min-h-(<custom-property>) syntax:

This is just a shorthand for min-h-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a min-height utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The min-h-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="h-20 ...">  <div class="min-h-80 ...">min-h-80</div>  <div class="min-h-64 ...">min-h-64</div>  <div class="min-h-48 ...">min-h-48</div>  <div class="min-h-40 ...">min-h-40</div>  <div class="min-h-32 ...">min-h-32</div>  <div class="min-h-24 ...">min-h-24</div></div>
```

Example 2 (jsx):
```jsx
<div class="h-20 ...">  <div class="min-h-80 ...">min-h-80</div>  <div class="min-h-64 ...">min-h-64</div>  <div class="min-h-48 ...">min-h-48</div>  <div class="min-h-40 ...">min-h-40</div>  <div class="min-h-32 ...">min-h-32</div>  <div class="min-h-24 ...">min-h-24</div></div>
```

Example 3 (jsx):
```jsx
<div class="min-h-full ...">min-h-full</div><div class="min-h-9/10 ...">min-h-9/10</div><div class="min-h-3/4 ...">min-h-3/4</div><div class="min-h-1/2 ...">min-h-1/2</div><div class="min-h-1/3 ...">min-h-1/3</div>
```

Example 4 (jsx):
```jsx
<div class="min-h-full ...">min-h-full</div><div class="min-h-9/10 ...">min-h-9/10</div><div class="min-h-3/4 ...">min-h-3/4</div><div class="min-h-1/2 ...">min-h-1/2</div><div class="min-h-1/3 ...">min-h-1/3</div>
```

---

## max-height

**URL:** https://tailwindcss.com/docs/max-height

**Contents:**
- Examples
  - Basic example
  - Using a percentage
  - Using a custom value
  - Responsive design
- Customizing your theme

Use max-h-<number> utilities like max-h-24 and max-h-64 to set an element to a fixed maximum height based on the spacing scale:

Use max-h-full or max-h-<fraction> utilities like max-h-1/2 and max-h-2/5 to give an element a percentage-based maximum height:

Use the max-h-[<value>] syntax to set the maximum height based on a completely custom value:

For CSS variables, you can also use the max-h-(<custom-property>) syntax:

This is just a shorthand for max-h-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a max-height utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The max-h-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="h-96 ...">  <div class="h-full max-h-80 ...">max-h-80</div>  <div class="h-full max-h-64 ...">max-h-64</div>  <div class="h-full max-h-48 ...">max-h-48</div>  <div class="h-full max-h-40 ...">max-h-40</div>  <div class="h-full max-h-32 ...">max-h-32</div>  <div class="h-full max-h-24 ...">max-h-24</div></div>
```

Example 2 (jsx):
```jsx
<div class="h-96 ...">  <div class="h-full max-h-80 ...">max-h-80</div>  <div class="h-full max-h-64 ...">max-h-64</div>  <div class="h-full max-h-48 ...">max-h-48</div>  <div class="h-full max-h-40 ...">max-h-40</div>  <div class="h-full max-h-32 ...">max-h-32</div>  <div class="h-full max-h-24 ...">max-h-24</div></div>
```

Example 3 (jsx):
```jsx
<div class="h-96 ...">  <div class="h-full max-h-9/10 ...">max-h-9/10</div>  <div class="h-full max-h-3/4 ...">max-h-3/4</div>  <div class="h-full max-h-1/2 ...">max-h-1/2</div>  <div class="h-full max-h-1/4 ...">max-h-1/4</div>  <div class="h-full max-h-full ...">max-h-full</div></div>
```

Example 4 (jsx):
```jsx
<div class="h-96 ...">  <div class="h-full max-h-9/10 ...">max-h-9/10</div>  <div class="h-full max-h-3/4 ...">max-h-3/4</div>  <div class="h-full max-h-1/2 ...">max-h-1/2</div>  <div class="h-full max-h-1/4 ...">max-h-1/4</div>  <div class="h-full max-h-full ...">max-h-full</div></div>
```

---

## line-height

**URL:** https://tailwindcss.com/docs/line-height

**Contents:**
- Examples
  - Basic example
  - Setting independently
  - Removing the leading
  - Using a custom value
  - Responsive design
- Customizing your theme

Use font size utilities like text-sm/6 and text-lg/7 to set the font size and line-height of an element at the same time:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Each font size utility also sets a default line height when one isn't provided. You can learn more about these values and how to customize them in the font-size documentation.

Use leading-<number> utilities like leading-6 and leading-7 to set the line height of an element independent of the font-size:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the leading-none utility to set the line height of an element equal to its font size:

The quick brown fox jumps over the lazy dog.

Use the leading-[<value>] syntax to set the line height based on a completely custom value:

For CSS variables, you can also use the leading-(<custom-property>) syntax:

This is just a shorthand for leading-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a line-height utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

The leading-<number> utilities are driven by the --spacing theme variable, which can be customized in your own theme:

Learn more about customizing the spacing scale in the theme variable documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="text-base/6 ...">So I started to walk into the water...</p><p class="text-base/7 ...">So I started to walk into the water...</p><p class="text-base/8 ...">So I started to walk into the water...</p>
```

Example 2 (jsx):
```jsx
<p class="text-base/6 ...">So I started to walk into the water...</p><p class="text-base/7 ...">So I started to walk into the water...</p><p class="text-base/8 ...">So I started to walk into the water...</p>
```

Example 3 (jsx):
```jsx
<p class="text-sm leading-6">So I started to walk into the water...</p><p class="text-sm leading-7">So I started to walk into the water...</p><p class="text-sm leading-8">So I started to walk into the water...</p>
```

Example 4 (jsx):
```jsx
<p class="text-sm leading-6">So I started to walk into the water...</p><p class="text-sm leading-7">So I started to walk into the water...</p><p class="text-sm leading-8">So I started to walk into the water...</p>
```

---

## outline-width

**URL:** https://tailwindcss.com/docs/outline-width

**Contents:**
- Examples
  - Basic example
  - Applying on focus
  - Using a custom value
  - Responsive design

Use outline or outline-<number> utilities like outline-2 and outline-4 to set the width of an element's outline:

Prefix an outline-width utility with a variant like focus:* to only apply the utility in that state:

Focus the button to see the outline added

Learn more about using variants in the variants documentation.

Use the outline-[<value>] syntax to set the outline width based on a completely custom value:

For CSS variables, you can also use the outline-(length:<custom-property>) syntax:

This is just a shorthand for outline-[length:var(<custom-property>)] that adds the var() function for you automatically.

Prefix an outline-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="outline outline-offset-2 ...">Button A</button><button class="outline-2 outline-offset-2 ...">Button B</button><button class="outline-4 outline-offset-2 ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="outline outline-offset-2 ...">Button A</button><button class="outline-2 outline-offset-2 ...">Button B</button><button class="outline-4 outline-offset-2 ...">Button C</button>
```

Example 3 (jsx):
```jsx
<button class="outline-offset-2 outline-sky-500 focus:outline-2 ...">Save Changes</button>
```

Example 4 (jsx):
```jsx
<button class="outline-offset-2 outline-sky-500 focus:outline-2 ...">Save Changes</button>
```

---

## scale

**URL:** https://tailwindcss.com/docs/scale

**Contents:**
- Examples
  - Basic example
  - Scaling on the x-axis
  - Scaling on the y-axis
  - Using negative values
  - Using a custom value
  - Applying on hover

Use scale-<number> utilities like scale-75 and scale-150 to scale an element by a percentage of its original size:

Use the scale-x-<number> utilities like scale-x-75 and -scale-x-150 to scale an element on the x-axis by a percentage of its original width:

Use the scale-y-<number> utilities like scale-y-75 and scale-y-150 to scale an element on the y-axis by a percentage of its original height:

Use -scale-<number>, -scale-x-<number> or -scale-y-<number> utilities like -scale-x-75 and -scale-125 to mirror and scale down an element by a percentage of its original size:

Use the scale-[<value>] syntax to set the scale based on a completely custom value:

For CSS variables, you can also use the scale-(<custom-property>) syntax:

This is just a shorthand for scale-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a scale utility with a variant like hover:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="scale-75 ..." src="/img/mountains.jpg" /><img class="scale-100 ..." src="/img/mountains.jpg" /><img class="scale-125 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="scale-75 ..." src="/img/mountains.jpg" /><img class="scale-100 ..." src="/img/mountains.jpg" /><img class="scale-125 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="scale-x-75 ..." src="/img/mountains.jpg" /><img class="scale-x-100 ..." src="/img/mountains.jpg" /><img class="scale-x-125 ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="scale-x-75 ..." src="/img/mountains.jpg" /><img class="scale-x-100 ..." src="/img/mountains.jpg" /><img class="scale-x-125 ..." src="/img/mountains.jpg" />
```

---

## stroke-width

**URL:** https://tailwindcss.com/docs/stroke-width

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use stroke-<number> utilities like stroke-1 and stroke-2 to set the stroke width of an SVG:

This can be useful for styling icon sets like Heroicons.

Use the stroke-[<value>] syntax to set the stroke width based on a completely custom value:

For CSS variables, you can also use the stroke-(length:<custom-property>) syntax:

This is just a shorthand for stroke-[length:var(<custom-property>)] that adds the var() function for you automatically.

Prefix a stroke-width utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<svg class="stroke-1 ..."></svg><svg class="stroke-2 ..."></svg>
```

Example 2 (jsx):
```jsx
<svg class="stroke-1 ..."></svg><svg class="stroke-2 ..."></svg>
```

Example 3 (jsx):
```jsx
<div class="stroke-[1.5] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="stroke-[1.5] ...">  <!-- ... --></div>
```

---
