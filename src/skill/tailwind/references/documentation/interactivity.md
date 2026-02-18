# Tailwind_Docs - Interactivity

**Pages:** 12

---

## appearance

**URL:** https://tailwindcss.com/docs/appearance

**Contents:**
- Examples
  - Removing default appearance
  - Restoring default appearance
  - Responsive design

Use appearance-none to reset any browser specific styling on an element:

This utility is often used when creating custom form components.

Use appearance-auto to restore the default browser specific styling on an element:

Try emulating `forced-colors: active` in your developer tools to see the difference

This is useful for reverting to the standard browser controls in certain accessibility modes.

Prefix an appearance utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<select>  <option>Yes</option>  <option>No</option>  <option>Maybe</option></select><div class="grid">  <select class="col-start-1 row-start-1 appearance-none bg-gray-50 dark:bg-gray-800 ...">    <option>Yes</option>    <option>No</option>    <option>Maybe</option>  </select>  <svg class="pointer-events-none col-start-1 row-start-1 ...">    <!-- ... -->  </svg></div>
```

Example 2 (jsx):
```jsx
<select>  <option>Yes</option>  <option>No</option>  <option>Maybe</option></select><div class="grid">  <select class="col-start-1 row-start-1 appearance-none bg-gray-50 dark:bg-gray-800 ...">    <option>Yes</option>    <option>No</option>    <option>Maybe</option>  </select>  <svg class="pointer-events-none col-start-1 row-start-1 ...">    <!-- ... -->  </svg></div>
```

Example 3 (jsx):
```jsx
<label>  <div>    <input type="checkbox" class="appearance-none forced-colors:appearance-auto ..." />    <svg class="invisible peer-checked:visible forced-colors:hidden ...">      <!-- ... -->    </svg>  </div>  Falls back to default appearance</label><label>  <div>    <input type="checkbox" class="appearance-none ..." />    <svg class="invisible peer-checked:visible ...">      <!-- ... -->    </svg>  </div>  Keeps custom appearance</label>
```

Example 4 (jsx):
```jsx
<label>  <div>    <input type="checkbox" class="appearance-none forced-colors:appearance-auto ..." />    <svg class="invisible peer-checked:visible forced-colors:hidden ...">      <!-- ... -->    </svg>  </div>  Falls back to default appearance</label><label>  <div>    <input type="checkbox" class="appearance-none ..." />    <svg class="invisible peer-checked:visible ...">      <!-- ... -->    </svg>  </div>  Keeps custom appearance</label>
```

---

## cursor

**URL:** https://tailwindcss.com/docs/cursor

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like cursor-pointer and cursor-grab to control which cursor is displayed when hovering over an element:

Hover over each button to see the cursor change

Use the cursor-[<value>] syntax to set the cursor based on a completely custom value:

For CSS variables, you can also use the cursor-(<custom-property>) syntax:

This is just a shorthand for cursor-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a cursor utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="cursor-pointer ...">Submit</button><button class="cursor-progress ...">Saving...</button><button class="cursor-not-allowed ..." disabled>Confirm</button>
```

Example 2 (jsx):
```jsx
<button class="cursor-pointer ...">Submit</button><button class="cursor-progress ...">Saving...</button><button class="cursor-not-allowed ..." disabled>Confirm</button>
```

Example 3 (jsx):
```jsx
<button class="cursor-[url(hand.cur),_pointer] ...">  <!-- ... --></button>
```

Example 4 (jsx):
```jsx
<button class="cursor-[url(hand.cur),_pointer] ...">  <!-- ... --></button>
```

---

## field-sizing

**URL:** https://tailwindcss.com/docs/field-sizing

**Contents:**
- Examples
  - Sizing based on content
  - Using a fixed size
  - Responsive design

Use the field-sizing-content utility to allow a form control to adjust it's size based on the content:

Type in the input below to see the size change

Use the field-sizing-fixed utility to make a form control use a fixed size:

Type in the input below to see the size remain the same

Prefix a field-sizing utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<textarea class="field-sizing-content ..." rows="2">  Latex Salesman, Vanderlay Industries</textarea>
```

Example 2 (jsx):
```jsx
<textarea class="field-sizing-content ..." rows="2">  Latex Salesman, Vanderlay Industries</textarea>
```

Example 3 (jsx):
```jsx
<textarea class="field-sizing-fixed w-80 ..." rows="2">  Latex Salesman, Vanderlay Industries</textarea>
```

Example 4 (jsx):
```jsx
<textarea class="field-sizing-fixed w-80 ..." rows="2">  Latex Salesman, Vanderlay Industries</textarea>
```

---

## pointer-events

**URL:** https://tailwindcss.com/docs/pointer-events

**Contents:**
- Examples
  - Ignoring pointer events
  - Restoring pointer events

Use the pointer-events-none utility to make an element ignore pointer events, like :hover and click events:

Click the search icons to see the expected behavior

The pointer events will still trigger on child elements and pass-through to elements that are "beneath" the target.

Use the pointer-events-auto utility to revert to the default browser behavior for pointer events:

**Examples:**

Example 1 (jsx):
```jsx
<div class="relative ...">  <div class="pointer-events-auto absolute ...">    <svg class="absolute h-5 w-5 text-gray-400">      <!-- ... -->    </svg>  </div>  <input type="text" placeholder="Search" class="..." /></div><div class="relative ...">  <div class="pointer-events-none absolute ...">    <svg class="absolute h-5 w-5 text-gray-400">      <!-- ... -->    </svg>  </div>  <input type="text" placeholder="Search" class="..." /></div>
```

Example 2 (jsx):
```jsx
<div class="relative ...">  <div class="pointer-events-auto absolute ...">    <svg class="absolute h-5 w-5 text-gray-400">      <!-- ... -->    </svg>  </div>  <input type="text" placeholder="Search" class="..." /></div><div class="relative ...">  <div class="pointer-events-none absolute ...">    <svg class="absolute h-5 w-5 text-gray-400">      <!-- ... -->    </svg>  </div>  <input type="text" placeholder="Search" class="..." /></div>
```

Example 3 (jsx):
```jsx
<div class="pointer-events-none md:pointer-events-auto ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="pointer-events-none md:pointer-events-auto ...">  <!-- ... --></div>
```

---

## resize

**URL:** https://tailwindcss.com/docs/resize

**Contents:**
- Examples
  - Resizing in all directions
  - Resizing vertically
  - Resizing horizontally
  - Prevent resizing
  - Responsive design

Use resize to make an element horizontally and vertically resizable:

Drag the textarea handle in the demo to see the expected behavior

Use resize-y to make an element vertically resizable:

Drag the textarea handle in the demo to see the expected behavior

Use resize-x to make an element horizontally resizable:

Drag the textarea handle in the demo to see the expected behavior

Use resize-none to prevent an element from being resizable:

Notice that the textarea handle is gone

Prefix a resize utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<textarea class="resize rounded-md ..."></textarea>
```

Example 2 (jsx):
```jsx
<textarea class="resize rounded-md ..."></textarea>
```

Example 3 (jsx):
```jsx
<textarea class="resize-y rounded-md ..."></textarea>
```

Example 4 (jsx):
```jsx
<textarea class="resize-y rounded-md ..."></textarea>
```

---

## scroll-behavior

**URL:** https://tailwindcss.com/docs/scroll-behavior

**Contents:**
- Examples
  - Using smooth scrolling
  - Using normal scrolling

Use the scroll-smooth utility to enable smooth scrolling within an element:

Setting the scroll-behavior only affects scroll events that are triggered by the browser.

Use the scroll-auto utility to revert to the default browser behavior for scrolling:

**Examples:**

Example 1 (jsx):
```jsx
<html class="scroll-smooth">  <!-- ... --></html>
```

Example 2 (jsx):
```jsx
<html class="scroll-smooth">  <!-- ... --></html>
```

Example 3 (jsx):
```jsx
<html class="scroll-smooth md:scroll-auto">  <!-- ... --></html>
```

Example 4 (jsx):
```jsx
<html class="scroll-smooth md:scroll-auto">  <!-- ... --></html>
```

---

## scroll-snap-align

**URL:** https://tailwindcss.com/docs/scroll-snap-align

**Contents:**
- Examples
  - Snapping to the center
  - Snapping to the start
  - Snapping to the end
  - Responsive design

Use the snap-center utility to snap an element to its center when being scrolled inside a snap container:

Scroll in the grid of images to see the expected behavior

Use the snap-start utility to snap an element to its start when being scrolled inside a snap container:

Scroll in the grid of images to see the expected behavior

Use the snap-end utility to snap an element to its end when being scrolled inside a snap container:

Scroll in the grid of images to see the expected behavior

Prefix a scroll-snap-align utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-center ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 2 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-center ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 3 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-start ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 4 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-start ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-start ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

---

## scroll-snap-stop

**URL:** https://tailwindcss.com/docs/scroll-snap-stop

**Contents:**
- Examples
  - Forcing snap position stops
  - Skipping snap position stops
  - Responsive design

Use the snap-always utility together with the snap-mandatory utility to force a snap container to always stop on an element before the user can continue scrolling to the next item:

Scroll in the grid of images to see the expected behavior

Use the snap-normal utility to allow a snap container to skip past possible scroll snap positions:

Scroll in the grid of images to see the expected behavior

Prefix a scroll-snap-stop utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="snap-x snap-mandatory ...">  <div class="snap-center snap-always ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 2 (jsx):
```jsx
<div class="snap-x snap-mandatory ...">  <div class="snap-center snap-always ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center snap-always ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 3 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-center snap-normal ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 4 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-center snap-normal ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center snap-normal ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

---

## scroll-snap-type

**URL:** https://tailwindcss.com/docs/scroll-snap-type

**Contents:**
- Examples
  - Horizontal scroll snapping
  - Mandatory scroll snapping
  - Proximity scroll snapping
  - Responsive design

Use the snap-x utility to enable horizontal scroll snapping within an element:

Scroll in the grid of images to see the expected behavior

For scroll snapping to work, you need to also set the scroll snap alignment on the children.

Use the snap-mandatory utility to force a snap container to always come to rest on a snap point:

Scroll in the grid of images to see the expected behavior

Use the snap-proximity utility to make a snap container come to rest on snap points that are close in proximity:

Scroll in the grid of images to see the expected behavior

Prefix a scroll-snap-type utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-center ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 2 (jsx):
```jsx
<div class="snap-x ...">  <div class="snap-center ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 3 (jsx):
```jsx
<div class="snap-x snap-mandatory ...">  <div class="snap-center ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

Example 4 (jsx):
```jsx
<div class="snap-x snap-mandatory ...">  <div class="snap-center ...">    <img src="/img/vacation-01.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-02.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-03.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-04.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-05.jpg" />  </div>  <div class="snap-center ...">    <img src="/img/vacation-06.jpg" />  </div></div>
```

---

## touch-action

**URL:** https://tailwindcss.com/docs/touch-action

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like touch-pan-y and touch-pinch-zoom to control how an element can be scrolled (panned) and zoomed (pinched) on touchscreens:

Try panning these images on a touchscreen

Prefix a touch-action utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="h-48 w-full touch-auto overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div><div class="h-48 w-full touch-none overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div><div class="h-48 w-full touch-pan-x overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div><div class="h-48 w-full touch-pan-y overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div>
```

Example 2 (jsx):
```jsx
<div class="h-48 w-full touch-auto overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div><div class="h-48 w-full touch-none overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div><div class="h-48 w-full touch-pan-x overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div><div class="h-48 w-full touch-pan-y overflow-auto ...">  <img class="h-auto w-[150%] max-w-none" src="..." /></div>
```

Example 3 (jsx):
```jsx
<div class="touch-pan-x md:touch-auto ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="touch-pan-x md:touch-auto ...">  <!-- ... --></div>
```

---

## user-select

**URL:** https://tailwindcss.com/docs/user-select

**Contents:**
- Examples
  - Disabling text selection
  - Allowing text selection
  - Selecting all text in one click
  - Using auto select behavior
  - Responsive design

Use the select-none utility to prevent selecting text in an element and its children:

Try selecting the text to see the expected behavior

Use the select-text utility to allow selecting text in an element and its children:

Try selecting the text to see the expected behavior

Use the select-all utility to automatically select all the text in an element when a user clicks:

Try clicking the text to see the expected behavior

Use the select-auto utility to use the default browser behavior for selecting text:

Try selecting the text to see the expected behavior

Prefix an user-select utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="select-none ...">The quick brown fox jumps over the lazy dog.</div>
```

Example 2 (jsx):
```jsx
<div class="select-none ...">The quick brown fox jumps over the lazy dog.</div>
```

Example 3 (jsx):
```jsx
<div class="select-text ...">The quick brown fox jumps over the lazy dog.</div>
```

Example 4 (jsx):
```jsx
<div class="select-text ...">The quick brown fox jumps over the lazy dog.</div>
```

---

## will-change

**URL:** https://tailwindcss.com/docs/will-change

**Contents:**
- Examples
  - Optimizing with will change
  - Using a custom value

Use the will-change-scroll, will-change-contents and will-change-transform utilities to optimize an element that's expected to change in the near future by instructing the browser to prepare the necessary animation before it actually begins:

It's recommended that you apply these utilities just before an element changes, and then remove it shortly after it finishes using will-change-auto.

The will-change property is intended to be used as a last resort when dealing with known performance problems. Avoid using these utilities too much, or simply in anticipation of performance issues, as it could actually cause the page to be less performant.

Use the will-change-[<value>] syntax to set the will-change property based on a completely custom value:

For CSS variables, you can also use the will-change-(<custom-property>) syntax:

This is just a shorthand for will-change-[var(<custom-property>)] that adds the var() function for you automatically.

**Examples:**

Example 1 (jsx):
```jsx
<div class="overflow-auto will-change-scroll">  <!-- ... --></div>
```

Example 2 (jsx):
```jsx
<div class="overflow-auto will-change-scroll">  <!-- ... --></div>
```

Example 3 (jsx):
```jsx
<div class="will-change-[top,left] ...">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="will-change-[top,left] ...">  <!-- ... --></div>
```

---
