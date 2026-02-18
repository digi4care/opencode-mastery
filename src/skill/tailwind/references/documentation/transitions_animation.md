# Tailwind_Docs - Transitions Animation

**Pages:** 6

---

## transition-property

**URL:** https://tailwindcss.com/docs/transition-property

**Contents:**
- Examples
  - Basic example
  - Supporting reduced motion
  - Using a custom value
  - Responsive design

Use utilities like transition and transition-colors to specify which properties should transition when they change:

Hover the button to see the expected behavior

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the motion-safe and motion-reduce variants:

Use the transition-[<value>] syntax to set the transition properties based on a completely custom value:

For CSS variables, you can also use the transition-(<custom-property>) syntax:

This is just a shorthand for transition-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a transition-property utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...">  Save Changes</button>
```

Example 2 (jsx):
```jsx
<button class="bg-blue-500 transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 ...">  Save Changes</button>
```

Example 3 (csharp):
```csharp
<button class="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">  <!-- ... --></button>
```

Example 4 (csharp):
```csharp
<button class="transform transition hover:-translate-y-1 motion-reduce:transition-none motion-reduce:hover:transform-none ...">  <!-- ... --></button>
```

---

## transition-behavior

**URL:** https://tailwindcss.com/docs/transition-behavior

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use the transition-discrete utility to start transitions when changing properties with a discrete set of values, such as elements that change from hidden to block:

Interact with the checkboxes to see the expected behavior

Prefix a transition-behavior utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<label class="peer ...">  <input type="checkbox" checked /></label><button class="hidden transition-all not-peer-has-checked:opacity-0 peer-has-checked:block ...">  I hide</button><label class="peer ...">  <input type="checkbox" checked /></label><button class="hidden transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block ...">  I fade out</button>
```

Example 2 (jsx):
```jsx
<label class="peer ...">  <input type="checkbox" checked /></label><button class="hidden transition-all not-peer-has-checked:opacity-0 peer-has-checked:block ...">  I hide</button><label class="peer ...">  <input type="checkbox" checked /></label><button class="hidden transition-all transition-discrete not-peer-has-checked:opacity-0 peer-has-checked:block ...">  I fade out</button>
```

Example 3 (jsx):
```jsx
<button class="transition-discrete md:transition-normal ...">  <!-- ... --></button>
```

Example 4 (jsx):
```jsx
<button class="transition-discrete md:transition-normal ...">  <!-- ... --></button>
```

---

## transition-duration

**URL:** https://tailwindcss.com/docs/transition-duration

**Contents:**
- Examples
  - Basic example
  - Supporting reduced motion
  - Using a custom value
  - Responsive design

Use utilities like duration-150 and duration-700 to set the transition duration of an element in milliseconds:

Hover each button to see the expected behavior

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the motion-safe and motion-reduce variants:

Use the duration-[<value>] syntax to set the transition duration based on a completely custom value:

For CSS variables, you can also use the duration-(<custom-property>) syntax:

This is just a shorthand for duration-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a transition-duration utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="transition duration-150 ease-in-out ...">Button A</button><button class="transition duration-300 ease-in-out ...">Button B</button><button class="transition duration-700 ease-in-out ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="transition duration-150 ease-in-out ...">Button A</button><button class="transition duration-300 ease-in-out ...">Button B</button><button class="transition duration-700 ease-in-out ...">Button C</button>
```

Example 3 (jsx):
```jsx
<button type="button" class="duration-300 motion-reduce:duration-0 ...">  <!-- ... --></button>
```

Example 4 (jsx):
```jsx
<button type="button" class="duration-300 motion-reduce:duration-0 ...">  <!-- ... --></button>
```

---

## transition-timing-function

**URL:** https://tailwindcss.com/docs/transition-timing-function

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like ease-in and ease-out to control the easing curve of an element's transition:

Hover each button to see the expected behavior

Use the ease-[<value>] syntax to set the transition timing function based on a completely custom value:

For CSS variables, you can also use the ease-(<custom-property>) syntax:

This is just a shorthand for ease-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a transition-timing-function utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --ease-* theme variables to customize the transition timing function utilities in your project:

Now the ease-in-expo utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="duration-300 ease-in ...">Button A</button><button class="duration-300 ease-out ...">Button B</button><button class="duration-300 ease-in-out ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="duration-300 ease-in ...">Button A</button><button class="duration-300 ease-out ...">Button B</button><button class="duration-300 ease-in-out ...">Button C</button>
```

Example 3 (jsx):
```jsx
<button class="ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ...">  <!-- ... --></button>
```

Example 4 (jsx):
```jsx
<button class="ease-[cubic-bezier(0.95,0.05,0.795,0.035)] ...">  <!-- ... --></button>
```

---

## transition-delay

**URL:** https://tailwindcss.com/docs/transition-delay

**Contents:**
- Examples
  - Basic example
  - Supporting reduced motion
  - Using a custom value
  - Responsive design

Use utilities like delay-150 and delay-700 to set the transition delay of an element in milliseconds:

Hover each button to see the expected behavior

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the motion-safe and motion-reduce variants:

Use the delay-[<value>] syntax to set the transition delay based on a completely custom value:

For CSS variables, you can also use the delay-(<custom-property>) syntax:

This is just a shorthand for delay-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a transition-delay utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="transition delay-150 duration-300 ease-in-out ...">Button A</button><button class="transition delay-300 duration-300 ease-in-out ...">Button B</button><button class="transition delay-700 duration-300 ease-in-out ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="transition delay-150 duration-300 ease-in-out ...">Button A</button><button class="transition delay-300 duration-300 ease-in-out ...">Button B</button><button class="transition delay-700 duration-300 ease-in-out ...">Button C</button>
```

Example 3 (jsx):
```jsx
<button type="button" class="delay-300 motion-reduce:delay-0 ...">  <!-- ... --></button>
```

Example 4 (jsx):
```jsx
<button type="button" class="delay-300 motion-reduce:delay-0 ...">  <!-- ... --></button>
```

---

## animation

**URL:** https://tailwindcss.com/docs/animation

**Contents:**
- Examples
  - Adding a spin animation
  - Adding a ping animation
  - Adding a pulse animation
  - Adding a bounce animation
  - Supporting reduced motion
  - Using a custom value
  - Responsive design
- Customizing your theme

Use the animate-spin utility to add a linear spin animation to elements like loading indicators:

Use the animate-ping utility to make an element scale and fade like a radar ping or ripple of water—useful for things like notification badges:

Use the animate-pulse utility to make an element gently fade in and out—useful for things like skeleton loaders:

Use the animate-bounce utility to make an element bounce up and down—useful for things like "scroll down" indicators:

For situations where the user has specified that they prefer reduced motion, you can conditionally apply animations and transitions using the motion-safe and motion-reduce variants:

Use the animate-[<value>] syntax to set the animation based on a completely custom value:

For CSS variables, you can also use the animate-(<custom-property>) syntax:

This is just a shorthand for animate-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an animation utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --animate-* theme variables to customize the animation utilities in your project:

Now the animate-wiggle utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button type="button" class="bg-indigo-500 ..." disabled>  <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">    <!-- ... -->  </svg>  Processing…</button>
```

Example 2 (jsx):
```jsx
<button type="button" class="bg-indigo-500 ..." disabled>  <svg class="mr-3 size-5 animate-spin ..." viewBox="0 0 24 24">    <!-- ... -->  </svg>  Processing…</button>
```

Example 3 (jsx):
```jsx
<span class="relative flex size-3">  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>  <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span></span>
```

Example 4 (jsx):
```jsx
<span class="relative flex size-3">  <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>  <span class="relative inline-flex size-3 rounded-full bg-sky-500"></span></span>
```

---
