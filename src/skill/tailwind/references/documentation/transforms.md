# Tailwind_Docs - Transforms

**Pages:** 8

---

## perspective

**URL:** https://tailwindcss.com/docs/perspective

**Contents:**
- Examples
  - Basic example
  - Removing a perspective
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like perspective-normal and perspective-distant to control how close or how far away the z-plane is from the screen:

This is like moving a camera closer to or further away from an object.

Use the perspective-none utility to remove a perspective transform from an element:

Use the perspective-[<value>] syntax to set the perspective based on a completely custom value:

For CSS variables, you can also use the perspective-(<custom-property>) syntax:

This is just a shorthand for perspective-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a perspective utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --perspective-* theme variables to customize the perspective utilities in your project:

Now the perspective-remote utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="size-20 perspective-dramatic ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div><div class="size-20 perspective-normal ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div>
```

Example 2 (jsx):
```jsx
<div class="size-20 perspective-dramatic ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div><div class="size-20 perspective-normal ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div>
```

Example 3 (jsx):
```jsx
<div class="perspective-none ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="perspective-none ...">  <!-- ... --></div>
```

---

## perspective-origin

**URL:** https://tailwindcss.com/docs/perspective-origin

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like perspective-origin-top and perspective-origin-bottom-left to control where the vanishing point of a perspective is located:

perspective-origin-top-left

perspective-origin-bottom-right

Use the perspective-origin-[<value>] syntax to set the perspective origin based on a completely custom value:

For CSS variables, you can also use the perspective-origin-(<custom-property>) syntax:

This is just a shorthand for perspective-origin-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a perspective-origin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="size-20 perspective-near perspective-origin-top-left ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div><div class="size-20 perspective-near perspective-origin-bottom-right …">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div>
```

Example 2 (jsx):
```jsx
<div class="size-20 perspective-near perspective-origin-top-left ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div><div class="size-20 perspective-near perspective-origin-bottom-right …">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div>
```

Example 3 (jsx):
```jsx
<div class="perspective-origin-[200%_150%] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="perspective-origin-[200%_150%] ...">  <!-- ... --></div>
```

---

## rotate

**URL:** https://tailwindcss.com/docs/rotate

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Rotating in 3D space
  - Using a custom value
  - Responsive design

Use rotate-<number> utilities like rotate-45 and rotate-90 to rotate an element by degrees:

Use -rotate-<number> utilities like -rotate-45 and -rotate-90 to rotate an element counterclockwise by degrees:

Use rotate-x-<number>, rotate-y-<number>, and rotate-z-<number> utilities like rotate-x-50, -rotate-y-30, and rotate-z-45 together to rotate an element in 3D space:

Use the rotate-[<value>] syntax to set the rotation based on a completely custom value:

For CSS variables, you can also use the rotate-(<custom-property>) syntax:

This is just a shorthand for rotate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a rotate utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="rotate-45 ..." src="/img/mountains.jpg" /><img class="rotate-90 ..." src="/img/mountains.jpg" /><img class="rotate-210 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="rotate-45 ..." src="/img/mountains.jpg" /><img class="rotate-90 ..." src="/img/mountains.jpg" /><img class="rotate-210 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="-rotate-45 ..." src="/img/mountains.jpg" /><img class="-rotate-90 ..." src="/img/mountains.jpg" /><img class="-rotate-210 ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="-rotate-45 ..." src="/img/mountains.jpg" /><img class="-rotate-90 ..." src="/img/mountains.jpg" /><img class="-rotate-210 ..." src="/img/mountains.jpg" />
```

---

## skew

**URL:** https://tailwindcss.com/docs/skew

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Skewing on the x-axis
  - Skewing on the y-axis
  - Using a custom value
  - Responsive design

Use skew-<number> utilities like skew-4 and skew-10 to skew an element on both axes:

Use -skew-<number> utilities like -skew-4 and -skew-10 to skew an element on both axes:

Use skew-x-<number> utilities like skew-x-4 and -skew-x-10 to skew an element on the x-axis:

Use skew-y-<number> utilities like skew-y-4 and -skew-y-10 to skew an element on the y-axis:

Use the skew-[<value>] syntax to set the skew based on a completely custom value:

For CSS variables, you can also use the skew-(<custom-property>) syntax:

This is just a shorthand for skew-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix skewX() and skewY() utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="skew-3 ..." src="/img/mountains.jpg" /><img class="skew-6 ..." src="/img/mountains.jpg" /><img class="skew-12 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="skew-3 ..." src="/img/mountains.jpg" /><img class="skew-6 ..." src="/img/mountains.jpg" /><img class="skew-12 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="-skew-3 ..." src="/img/mountains.jpg" /><img class="-skew-6 ..." src="/img/mountains.jpg" /><img class="-skew-12 ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="-skew-3 ..." src="/img/mountains.jpg" /><img class="-skew-6 ..." src="/img/mountains.jpg" /><img class="-skew-12 ..." src="/img/mountains.jpg" />
```

---

## transform

**URL:** https://tailwindcss.com/docs/transform

**Contents:**
- Examples
  - Hardware acceleration
  - Removing transforms
  - Using a custom value

If your transition performs better when rendered by the GPU instead of the CPU, you can force hardware acceleration by adding the transform-gpu utility:

Use the transform-cpu utility to force things back to the CPU if you need to undo this conditionally.

Use the transform-none utility to remove all of the transforms on an element at once:

Use the transform-[<value>] syntax to set the transform based on a completely custom value:

For CSS variables, you can also use the transform-(<custom-property>) syntax:

This is just a shorthand for transform-[var(<custom-property>)] that adds the var() function for you automatically.

**Examples:**

Example 1 (csharp):
```csharp
<div class="scale-150 transform-gpu">  <!-- ... --></div>
```

Example 2 (csharp):
```csharp
<div class="scale-150 transform-gpu">  <!-- ... --></div>
```

Example 3 (csharp):
```csharp
<div class="skew-y-3 md:transform-none">  <!-- ... --></div>
```

Example 4 (csharp):
```csharp
<div class="skew-y-3 md:transform-none">  <!-- ... --></div>
```

---

## transform-origin

**URL:** https://tailwindcss.com/docs/transform-origin

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like origin-top and origin-bottom-left to set an element's transform origin:

Use the origin-[<value>] syntax to set the transform origin based on a completely custom value:

For CSS variables, you can also use the origin-(<custom-property>) syntax:

This is just a shorthand for origin-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a transform-origin utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="origin-center rotate-45 ..." src="/img/mountains.jpg" /><img class="origin-top-left rotate-12 ..." src="/img/mountains.jpg" /><img class="origin-bottom -rotate-12 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="origin-center rotate-45 ..." src="/img/mountains.jpg" /><img class="origin-top-left rotate-12 ..." src="/img/mountains.jpg" /><img class="origin-bottom -rotate-12 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="origin-[33%_75%] ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="origin-[33%_75%] ..." src="/img/mountains.jpg" />
```

---

## transform-style

**URL:** https://tailwindcss.com/docs/transform-style

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use transform-3d to position children in 3D space:

Without this, any children will only be transformed in 2D space and not in 3D space.

Prefix a transform-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (csharp):
```csharp
<div class="size-20 transform-flat ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div><div class="size-20 transform-3d ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div>
```

Example 2 (csharp):
```csharp
<div class="size-20 transform-flat ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div><div class="size-20 transform-3d ...">  <div class="translate-z-12 rotate-x-0 bg-sky-300/75 ...">1</div>  <div class="-translate-z-12 rotate-y-18 bg-sky-300/75 ...">2</div>  <div class="translate-x-12 rotate-y-90 bg-sky-300/75 ...">3</div>  <div class="-translate-x-12 -rotate-y-90 bg-sky-300/75 ...">4</div>  <div class="-translate-y-12 rotate-x-90 bg-sky-300/75 ...">5</div>  <div class="translate-y-12 -rotate-x-90 bg-sky-300/75 ...">6</div></div>
```

Example 3 (csharp):
```csharp
<div class="transform-3d md:transform-flat ...">  <!-- ... --></div>
```

Example 4 (csharp):
```csharp
<div class="transform-3d md:transform-flat ...">  <!-- ... --></div>
```

---

## translate

**URL:** https://tailwindcss.com/docs/translate

**Contents:**
- Examples
  - Using the spacing scale
  - Using a percentage
  - Translating on the x-axis
  - Translating on the y-axis
  - Translating on the z-axis
  - Using a custom value
  - Responsive design

Use translate-<number> utilities like translate-2 and -translate-4 to translate an element on both axes based on the spacing scale:

Use translate-<fraction> utilities like translate-1/4 and -translate-full to translate an element on both axes by a percentage of the element's size:

Use translate-x-<number> or translate-x-<fraction> utilities like translate-x-4 and translate-x-1/4 to translate an element on the x-axis:

Use translate-y-<number> or translate-y-<fraction> utilities like translate-y-6 and translate-y-1/3 to translate an element on the y-axis:

Use translate-z-<number> utilities like translate-z-6 and -translate-z-12 to translate an element on the z-axis:

Note that the translate-z-<number> utilities require the transform-3d utility to be applied to the parent element.

Use the translate-[<value>] syntax to set the translation based on a completely custom value:

For CSS variables, you can also use the translate-(<custom-property>) syntax:

This is just a shorthand for translate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a translate utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<img class="-translate-6 ..." src="/img/mountains.jpg" /><img class="translate-2 ..." src="/img/mountains.jpg" /><img class="translate-8 ..." src="/img/mountains.jpg" />
```

Example 2 (jsx):
```jsx
<img class="-translate-6 ..." src="/img/mountains.jpg" /><img class="translate-2 ..." src="/img/mountains.jpg" /><img class="translate-8 ..." src="/img/mountains.jpg" />
```

Example 3 (jsx):
```jsx
<img class="-translate-1/4 ..." src="/img/mountains.jpg" /><img class="translate-1/6 ..." src="/img/mountains.jpg" /><img class="translate-1/2 ..." src="/img/mountains.jpg" />
```

Example 4 (jsx):
```jsx
<img class="-translate-1/4 ..." src="/img/mountains.jpg" /><img class="translate-1/6 ..." src="/img/mountains.jpg" /><img class="translate-1/2 ..." src="/img/mountains.jpg" />
```

---
