# Tailwind_Docs - Core Concepts

**Pages:** 9

---

## Styling with utility classes

**URL:** https://tailwindcss.com/docs/styling-with-utility-classes

**Contents:**
- Overview
  - Why not just use inline styles?
- Thinking in utility classes
  - Styling hover and focus states
  - Media queries and breakpoints
  - Targeting dark mode
  - Using class composition
  - Using arbitrary values
    - How does this even work?
  - Complex selectors

You style things with Tailwind by combining many single-purpose presentational classes (utility classes) directly in your markup:

You have a new message!

For example, in the UI above we've used:

Styling things this way contradicts a lot of traditional best practices, but once you try it you'll quickly notice some really important benefits:

These benefits make a big difference on small projects, but they are even more valuable for teams working on long-running projects at scale.

A common reaction to this approach is wondering, “isn’t this just inline styles?” and in some ways it is — you’re applying styles directly to elements instead of assigning them a class name and then styling that class.

But using utility classes has many important advantages over inline styles, for example:

This component is fully responsive and includes a button with hover and active styles, and is built entirely with utility classes:

To style an element on states like hover or focus, prefix any utility with the state you want to target, for example hover:bg-sky-700:

Hover over this button to see the background color change

These prefixes are called variants in Tailwind, and they only apply the styles from a utility class when the condition for that variant matches.

Here's what the generated CSS looks like for the hover:bg-sky-700 class:

Notice how this class does nothing unless the element is hovered? Its only job is to provide hover styles — nothing else.

This is different from how you'd write traditional CSS, where a single class would usually provide the styles for many states:

You can even stack variants in Tailwind to apply a utility when multiple conditions match, like combining hover: and disabled:

Learn more in the documentation styling elements on hover, focus, and other states.

Just like hover and focus states, you can style elements at different breakpoints by prefixing any utility with the breakpoint where you want that style to apply:

Resize this example to see the layout change

In the example above, the sm: prefix makes sure that grid-cols-3 only triggers at the sm breakpoint and above, which is 40rem out of the box:

Learn more in the responsive design documentation.

Styling an element in dark mode is just a matter of adding the dark: prefix to any utility you want to apply when dark mode is active:

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

Just like with hover states or media queries, the important thing to understand is that a single utility class will never include both the light and dark styles — you style things in dark mode by using multiple classes, one for the light mode styles and another for the dark mode styles.

Learn more in the dark mode documentation.

A lot of the time with Tailwind you'll even use multiple classes to build up the value for a single CSS property, for example adding multiple filters to an element:

Both of these effects rely on the filter property in CSS, so Tailwind uses CSS variables to make it possible to compose these effects together:

The generated CSS above is slightly simplified, but the trick here is that each utility sets a CSS variable just for the effect it's meant to apply. Then the filter property looks at all of these variables, falling back to nothing if the variable hasn't been set.

Tailwind uses this same approach for gradients, shadow colors, transforms, and more.

Many utilities in Tailwind are driven by theme variables, like bg-blue-500, text-xl, and shadow-md, which map to your underlying color palette, type scale, and shadows.

When you need to use a one-off value outside of your theme, use the special square bracket syntax for specifying arbitrary values:

This can be useful for one-off colors outside of your color palette (like the Facebook blue above), but also when you need a complex custom value like a very specific grid:

It's also useful when you need to use CSS features like calc(), even if you are using your theme values:

There's even a syntax for generating completely arbitrary CSS including an arbitrary property name, which can be useful for setting CSS variables:

Learn more in the documentation on using arbitrary values.

Tailwind CSS isn't one big static stylesheet like you might be used to with other CSS frameworks — it generates the CSS needed based on the classes you're actually using when you compile your CSS.

It does this by scanning all of the files in your project looking for any symbol that looks like it could be a class name:

After it's found all of the potential classes, Tailwind generates the CSS for each one and compiles it all into one stylesheet of just the styles you actually need.

Since the CSS is generated based on the class name, Tailwind can recognize classes using arbitrary values like bg-[#316ff6] and generate the necessary CSS, even when the value isn't part of your theme.

Learn more about how this works in detecting classes in source files.

Sometimes you need to style an element under a combination of conditions, for example in dark mode, at a specific breakpoint, when hovered, and when the element has a specific data attribute.

Here's an example of what that looks like with Tailwind:

Tailwind also supports things like group-hover, which let you style an element when a specific parent is hovered:

This group-* syntax works with other variants too, like group-focus, group-active, and many more.

For really complex scenarios (especially when styling HTML you don't control), Tailwind supports arbitrary variants which let you write any selector you want, directly in a class name:

Inline styles are still very useful in Tailwind CSS projects, particularly when a value is coming from a dynamic source like a database or API:

You might also reach for an inline style for very complicated arbitrary values that are difficult to read when formatted as a class name:

Another useful pattern is setting CSS variables based on dynamic sources using inline styles, then referencing those variables with utility classes:

When you build entire projects with just utility classes, you'll inevitably find yourself repeating certain patterns to recreate the same design in different places.

For example, here the utility classes for each avatar image are repeated five separate times:

Don't panic! In practice this isn't the problem you might be worried it is, and the strategies for dealing with it are things you already do every day.

A lot of the time a design element that shows up more than once in the rendered page is only actually authored once because the actual markup is rendered in a loop.

For example, the duplicate avatars at the beginning of this guide would almost certainly be rendered in a loop in a real project:

When elements are rendered in a loop like this, the actual class list is only written once so there's no actual duplication problem to solve.

When duplication is localized to a group of elements in a single file, the easiest way to deal with it is to use multi-cursor editing to quickly select and edit the class list for each element at once:

You'd be surprised at how often this ends up being the best solution. If you can quickly edit all of the duplicated class lists simultaneously, there's no benefit to introducing any additional abstraction.

If you need to reuse some styles across multiple files, the best strategy is to create a component if you're using a front-end framework like React, Svelte, or Vue, or a template partial if you're using a templating language like Blade, ERB, Twig, or Nunjucks.

Now you can use this component in as many places as you like, while still having a single source of truth for the styles so they can easily be updated together in one place.

If you're using a templating language like ERB or Twig instead of something like React or Vue, creating a template partial for something as small as a button can feel like overkill compared to a simple CSS class like btn.

While it's highly recommended that you create proper template partials for more complex components, writing some custom CSS is totally fine when a template partial feels heavy-handed.

Here's what a btn-primary class might look like, using theme variables to keep the design consistent:

Again though, for anything that's more complicated than just a single HTML element, we highly recommend using template partials so the styles and structure can be encapsulated in one place.

When you add two classes that target the same CSS property, the class that appears later in the stylesheet wins. So in this example, the element will receive display: grid even though flex comes last in the actual class attribute:

In general, you should just never add two conflicting classes to the same element — only ever add the one you actually want to take effect:

Using component-based libraries like React or Vue, this often means exposing specific props for styling customizations instead of letting consumers add extra classes from outside of a component, since those styles will often conflict.

When you really need to force a specific utility class to take effect and have no other means of managing the specificity, you can add ! to the end of the class name to make all of the declarations !important:

If you're adding Tailwind to a project that has existing complex CSS with high specificity rules, you can use the important flag when importing Tailwind to mark all utilities as !important:

If your project has class names that conflict with Tailwind CSS utilities, you can prefix all Tailwind-generated classes and CSS variables using the prefix option:

**Examples:**

Example 1 (jsx):
```jsx
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />  <div>    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>  </div></div>
```

Example 2 (jsx):
```jsx
<div class="mx-auto flex max-w-sm items-center gap-x-4 rounded-xl bg-white p-6 shadow-lg outline outline-black/5 dark:bg-slate-800 dark:shadow-none dark:-outline-offset-1 dark:outline-white/10">  <img class="size-12 shrink-0" src="/img/logo.svg" alt="ChitChat Logo" />  <div>    <div class="text-xl font-medium text-black dark:text-white">ChitChat</div>    <p class="text-gray-500 dark:text-gray-400">You have a new message!</p>  </div></div>
```

Example 3 (jsx):
```jsx
<div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">  <img class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="" />  <div class="space-y-2 text-center sm:text-left">    <div class="space-y-0.5">      <p class="text-lg font-semibold text-black">Erin Lindford</p>      <p class="font-medium text-gray-500">Product Engineer</p>    </div>    <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">      Message    </button>  </div></div>
```

Example 4 (jsx):
```jsx
<div class="flex flex-col gap-2 p-8 sm:flex-row sm:items-center sm:gap-6 sm:py-4 ...">  <img class="mx-auto block h-24 rounded-full sm:mx-0 sm:shrink-0" src="/img/erin-lindford.jpg" alt="" />  <div class="space-y-2 text-center sm:text-left">    <div class="space-y-0.5">      <p class="text-lg font-semibold text-black">Erin Lindford</p>      <p class="font-medium text-gray-500">Product Engineer</p>    </div>    <button class="border-purple-200 text-purple-600 hover:border-transparent hover:bg-purple-600 hover:text-white active:bg-purple-700 ...">      Message    </button>  </div></div>
```

---

## Hover, focus, and other states

**URL:** https://tailwindcss.com/docs/hover-focus-and-other-states

**Contents:**
- Pseudo-classes
  - :hover, :focus, and :active
  - :first, :last, :odd, and :even
  - :required and :disabled
  - :has()
    - Styling based on the descendants of a group
    - Styling based on the descendants of a peer
  - :not()
  - Styling based on parent state
    - Differentiating nested groups

Every utility class in Tailwind can be applied conditionally by adding a variant to the beginning of the class name that describes the condition you want to target.

For example, to apply the bg-sky-700 class on hover, use the hover:bg-sky-700 class:

Hover over this button to see the background color change

When writing CSS the traditional way, a single class name would do different things based on the current state:

Traditionally the same class name applies different styles on hover

In Tailwind, rather than adding the styles for a hover state to an existing class, you add another class to the element that only does something on hover:

In Tailwind, separate classes are used for the default state and the hover state

Notice how hover:bg-sky-700 only defines styles for the :hover state? It does nothing by default, but as soon as you hover over an element with that class, the background color will change to sky-700.

This is what we mean when we say a utility class can be applied conditionally — by using variants you can control exactly how your design behaves in different states, without ever leaving your HTML.

Tailwind includes variants for just about everything you'll ever need, including:

These variants can even be stacked to target more specific situations, for example changing the background color in dark mode, at the medium breakpoint, on hover:

In this guide you'll learn about every variant available in the framework, how to use them with your own custom classes, and even how to create your own.

Style elements on hover, focus, and active using the hover, focus, and active variants:

Try interacting with this button to see the hover, focus, and active states

Tailwind also includes variants for other interactive states like :visited, :focus-within, :focus-visible, and more.

See the pseudo-class reference for a complete list of available pseudo-class variants.

Style an element when it is the first-child or last-child using the first and last variants:

kristen.ramos@example.com

floyd.miles@example.com

courtney.henry@example.com

You can also style an element when it's an odd or even child using the odd and even variants:

Use the nth-* and nth-last-* variants to style children based on their position in the list:

You can pass any number you want to these by default, and use arbitrary values for more complex expressions like nth-[2n+1_of_li].

Tailwind also includes variants for other structural pseudo-classes like :only-child, :first-of-type, :empty, and more.

See the pseudo-class reference for a complete list of available pseudo-class variants.

Style form elements in different states using variants like required, invalid, and disabled:

Try making the email address valid to see the styles change

Using variants for this sort of thing can reduce the amount of conditional logic in your templates, letting you use the same set of classes regardless of what state an input is in and letting the browser apply the right styles for you.

Tailwind also includes variants for other form states like :read-only, :indeterminate, :checked, and more.

See the pseudo-class reference for a complete list of available pseudo-class variants.

Use the has-* variant to style an element based on the state or content of its descendants:

You can use has-* with a pseudo-class, like has-[:focus], to style an element based on the state of its descendants. You can also use element selectors, like has-[img] or has-[a], to style an element based on the content of its descendants.

If you need to style an element based on the descendants of a parent element, you can mark the parent with the group class and use the group-has-* variant to style the target element:

Product Designer at planeteria.tech

Just happy to be here.

A multidisciplinary designer, working at the intersection of art and technology. alex-reed.com

Pushing pixels. Slinging divs.

If you need to style an element based on the descendants of a sibling element, you can mark the sibling with the peer class and use the peer-has-* variant to style the target element:

Use the not- variant to style an element when a condition is not true.

It's particularly powerful when combined with other pseudo-class variants, for example combining not-focus: with hover: to only apply hover styles when an element is not focused:

Try focusing on the button and then hovering over it

You can also combine the not- variant with media query variants like forced-colors or supports to only style an element when something about the user's environment is not true:

When you need to style an element based on the state of some parent element, mark the parent with the group class, and use group-* variants like group-hover to style the target element:

Hover over the card to see both text elements change color

Create a new project from a variety of starting templates.

This pattern works with every pseudo-class variant, for example group-focus, group-active, or even group-odd.

When nesting groups, you can style something based on the state of a specific parent group by giving that parent a unique group name using a group/{name} class, and including that name in variants using classes like group-hover/{name}:

Groups can be named however you like and don’t need to be configured in any way — just name your groups directly in your markup and Tailwind will automatically generate the necessary CSS.

You can create one-off group-* variants on the fly by providing your own selector as an arbitrary value between square brackets:

For more control, you can use the & character to mark where .group should end up in the final selector relative to the selector you are passing in:

The in-* variant works similarly to group except you don't need to add group to the parent element:

The in-* variant responds to state changes in any parent, so if you want more fine-grained control you'll need to use group instead.

When you need to style an element based on the state of a sibling element, mark the sibling with the peer class, and use peer-* variants like peer-invalid to style the target element:

Try making the email address valid to see the warning disappear

Please provide a valid email address.

This makes it possible to do all sorts of neat tricks, like floating labels for example without any JS.

This pattern works with every pseudo-class variant, for example peer-focus, peer-required, and peer-disabled.

It's important to note that the peer marker can only be used on previous siblings because of how the subsequent-sibling combinator works in CSS:

Won't work, only previous siblings can be marked as peers

When using multiple peers, you can style something on the state of a specific peer by giving that peer a unique name using a peer/{name} class, and including that name in variants using classes like peer-checked/{name}:

Peers can be named however you like and don’t need to be configured in any way — just name your peers directly in your markup and Tailwind will automatically generate the necessary CSS.

You can create one-off peer-* variants on the fly by providing your own selector as an arbitrary value between square brackets:

For more control, you can use the & character to mark where .peer should end up in the final selector relative to the selector you are passing in:

Style the ::before and ::after pseudo-elements using the before and after variants:

When using these variants, Tailwind will automatically add content: '' by default so you don't have to specify it unless you want a different value:

It's worth noting that you don't really need ::before and ::after pseudo-elements for most things in Tailwind projects — it's usually simpler to just use a real HTML element.

For example, here's the same design from above but using a <span> instead of the ::before pseudo-element, which is a little easier to read and is actually less code:

Save before and after for situations where it's important that the content of the pseudo-element is not actually in the DOM and can't be selected by the user.

Style the placeholder text of any input or textarea using the placeholder variant:

Style the button in file inputs using the file variant:

Style the counters or bullets in lists using the marker variant:

We've designed the marker variant to be inheritable, so although you can use it directly on an <li> element, you can also use it on a parent to avoid repeating yourself.

Style the active text selection using the selection variant:

Try selecting some of this text with your mouse

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

We've designed the selection variant to be inheritable, so you can add it anywhere in the tree and it will be applied to all descendant elements.

This makes it easy to set the selection color to match your brand across your entire site:

Style the first line in a block of content using the first-line variant, and the first letter using the first-letter variant:

Well, let me tell you something, funny boy. Y'know that little stamp, the one that says "New York Public Library"? Well that may not mean anything to you, but that means a lot to me. One whole hell of a lot.

Sure, go ahead, laugh if you want to. I've seen your type before: Flashy, making the scene, flaunting convention. Yeah, I know what you're thinking. What's this guy making such a big stink about old library books? Well, let me give you a hint, junior.

Style the backdrop of a native <dialog> element using the backdrop variant:

If you're using native <dialog> elements in your project, you may also want to read about styling open/closed states using the open variant.

To style an element at a specific breakpoint, use responsive variants like md and lg.

For example, this will render a 3-column grid on mobile, a 4-column grid on medium-width screens, and a 6-column grid on large-width screens:

To style an element based on the width of a parent element instead of the viewport, use variants like @md and @lg:

Check out the Responsive design documentation for an in-depth look at how these features work.

The prefers-color-scheme media query tells you whether the user prefers a light theme or dark theme, and is usually configured at the operating system level.

Use utilities with no variant to target light mode, and use the dark variant to provide overrides for dark mode:

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

Check out the Dark Mode documentation for an in-depth look at how this feature works.

The prefers-reduced-motion media query tells you if the user has requested that you minimize non-essential motion.

Use the motion-reduce variant to conditionally add styles when the user has requested reduced motion:

Try emulating `prefers-reduced-motion: reduce` in your developer tools to hide the spinner

Tailwind also includes a motion-safe variant that only adds styles when the user has not requested reduced motion. This can be useful when using the motion-reduce helper would mean having to "undo" a lot of styles:

The prefers-contrast media query tells you if the user has requested more or less contrast.

Use the contrast-more variant to conditionally add styles when the user has requested more contrast:

Try emulating `prefers-contrast: more` in your developer tools to see the changes

We need this to steal your identity.

Tailwind also includes a contrast-less variant you can use to conditionally add styles when the user has requested less contrast.

The forced-colors media query indicates if the user is using a forced colors mode. These modes override your site's colors with a user defined palette for text, backgrounds, links and buttons.

Use the forced-colors variant to conditionally add styles when the user has enabled a forced color mode:

Try emulating `forced-colors: active` in your developer tools to see the changes

Use the not-forced-colors variant to apply styles based when the user is not using a forced colors mode:

Tailwind also includes a forced color adjust utilities to opt in and out of forced colors.

Use the inverted-colors variant to conditionally add styles when the user has enabled an inverted color scheme:

The pointer media query tells you whether the user has a primary pointing device, like a mouse, and the accuracy of that pointing device.

Use the pointer-fine variant to target an accurate pointing device, like a mouse or trackpad, or the pointer-coarse variant to target a less accurate pointing device, like a touchscreen, which can be useful for providing larger click targets on touch devices:

Try emulating a touch device in your developer tools to see the changes

While pointeronly targets the primary pointing device, any-pointer is used to target any of the pointing devices that might be available. Use the any-pointer-fine and any-pointer-coarse variants to provide different styles if at least one connected pointing device meets the criteria.

You can use pointer-none and any-pointer-none to target the absence of a pointing device.

Use the portrait and landscape variants to conditionally add styles when the viewport is in a specific orientation:

Use the noscript variant to conditionally add styles based on whether the user has scripting, such as JavaScript, enabled:

Use the print variant to conditionally add styles that only apply when the document is being printed:

Use the supports-[...] variant to style things based on whether a certain feature is supported in the user's browser:

Under the hood the supports-[...] variant generates @supports rules and takes anything you’d use with @supports (...) between the square brackets, like a property/value pair, and even expressions using and and or.

For terseness, if you only need to check if a property is supported (and not a specific value), you can just specify the property name:

Use the not-supports-[...] variant to style things based on whether a certain feature is not supported in the user's browser:

You can configure shortcuts for common @supports rules you're using in your project by creating a new variant in the supports-* namespace:

You can then use these custom supports-* variants in your project:

Use the starting variant to set the appearance of an element when it is first rendered in the DOM, or transitions from display: none to visible:

Use the aria-* variant to conditionally style things based on ARIA attributes.

For example, to apply the bg-sky-700 class when the aria-checked attribute is set to true, use the aria-checked:bg-sky-700 class:

By default we've included variants for the most common boolean ARIA attributes:

You can customize which aria-* variants are available by creating a new variant:

If you need to use a one-off aria variant that doesn’t make sense to include in your project, or for more complex ARIA attributes that take specific values, use square brackets to generate a property on the fly using any arbitrary value:

ARIA state variants can also target parent and sibling elements using the group-aria-* and peer-aria-* variants:

Use the data-* variant to conditionally apply styles based on data attributes.

To check if a data attribute exists (and not a specific value), you can just specify the attribute name:

If you need to check for a specific value you may use an arbitrary value:

Alternatively, you can configure shortcuts for common data attributes you're using in your project by creating a new variant in the data-* namespace:

You can then use these custom data-* variants in your project:

Use the rtl and ltr variants to conditionally add styles in right-to-left and left-to-right modes respectively when building multi-directional layouts:

Director of Operations

Remember, these variants are only useful if you are building a site that needs to support both left-to-right and right-to-left layouts. If you're building a site that only needs to support a single direction, you don't need these variants — just apply the styles that make sense for your content.

Use the open variant to conditionally add styles when a <details> or <dialog> element is in an open state:

Try toggling the disclosure to see the styles change

The mug is round. The jar is round. They should call it Roundtine.

This variant also targets the :popover-open pseudo-class for popovers:

The inert variant lets you style elements marked with the inert attribute:

Get notified when someones posts a comment on a post.

Get notified when someones mentions you.

This is useful for adding visual cues that make it clear that sections of content aren't interactive.

While it's generally preferable to put utility classes directly on child elements, you can use the * variant in situations where you need to style direct children that you don’t have control over:

It's important to note that overriding a style with a utility directly on the child itself won't work since children rules are generated after the regular ones and they have the same specificity:

Won't work, children can't override styles given to them by the parent.

Like *, the ** variant can be used to style children of an element. The main difference is that ** will apply styles to all descendants, not just the direct children. This is especially useful when you combine it with another variant for narrowing the thing you're selecting:

Just like arbitrary values let you use custom values with your utility classes, arbitrary variants let you write custom selector variants directly in your HTML.

Arbitrary variants are just format strings that represent the selector, wrapped in square brackets. For example, this arbitrary variant changes the cursor to grabbing when the element has the is-dragging class:

Arbitrary variants can be stacked with built-in variants or with each other, just like the rest of the variants in Tailwind:

If you need spaces in your selector, you can use an underscore. For example, this arbitrary variant selects all p elements within the element where you've added the class:

You can also use at-rules like @media or @supports in arbitrary variants:

With at-rule custom variants the & placeholder isn't necessary, just like when nesting with a preprocessor.

If you find yourself using the same arbitrary variant multiple times in your project, it might be worth creating a custom variant using the @custom-variant directive:

Now you can use the theme-midnight:<utility> variant in your HTML:

Learn more about adding custom variants in the adding custom variants documentation.

A quick reference table of every single variant included in Tailwind by default.

This is a comprehensive list of examples for all the pseudo-class variants included in Tailwind to complement the pseudo-classes documentation at the beginning of this guide.

Style an element when the user hovers over it with the mouse cursor using the hover variant:

Style an element when it has focus using the focus variant:

Style an element when it or one of its descendants has focus using the focus-within variant:

Style an element when it has been focused using the keyboard using the focus-visible variant:

Style an element when it is being pressed using the active variant:

Style a link when it has already been visited using the visited variant:

Style an element if its ID matches the current URL fragment using the target variant:

Style an element if it's the first child using the first variant:

Style an element if it's the last child using the last variant:

Style an element if it's the only child using the only variant:

Style an element if it's an oddly numbered child using the odd variant:

Style an element if it's an evenly numbered child using the even variant:

Style an element if it's the first child of its type using the first-of-type variant:

Style an element if it's the last child of its type using the last-of-type variant:

Style an element if it's the only child of its type using the only-of-type variant:

Style an element at a specific position using the nth variant:

Style an element at a specific position from the end using the nth-last variant:

Style an element at a specific position, of the same type using the nth-of-type variant:

Style an element at a specific position from the end, of the same type using the nth-last-of-type variant:

Style an element if it has no content using the empty variant:

Style an input when it's disabled using the disabled variant:

Style an input when it's enabled using the enabled variant, most helpful when you only want to apply another style when an element is not disabled:

Style a checkbox or radio button when it's checked using the checked variant:

Style a checkbox or radio button in an indeterminate state using the indeterminate variant:

Style an option, checkbox or radio button that was the default value when the page initially loaded using the default variant:

Style an input when it's optional using the optional variant:

Style an input when it's required using the required variant:

Style an input when it's valid using the valid variant:

Style an input when it's invalid using the invalid variant:

Style an input when it's valid and the user has interacted with it, using the user-valid variant:

Style an input when it's invalid and the user has interacted with it, using the user-invalid variant:

Style an input when its value is within a specified range limit using the in-range variant:

Style an input when its value is outside of a specified range limit using the out-of-range variant:

Style an input when the placeholder is shown using the placeholder-shown variant:

Style the content of a <details> element using the details-content variant:

Style an input when it has been autofilled by the browser using the autofill variant:

Style an input when it is read-only using the read-only variant:

**Examples:**

Example 1 (jsx):
```jsx
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

Example 2 (jsx):
```jsx
<button class="bg-sky-500 hover:bg-sky-700 ...">Save changes</button>
```

Example 3 (css):
```css
.btn-primary {  background-color: #0ea5e9;}.btn-primary:hover {  background-color: #0369a1;}
```

Example 4 (css):
```css
.btn-primary {  background-color: #0ea5e9;}.btn-primary:hover {  background-color: #0369a1;}
```

---

## Responsive design

**URL:** https://tailwindcss.com/docs/responsive-design

**Contents:**
- Overview
- Working mobile-first
  - Targeting mobile screens
  - Targeting a breakpoint range
  - Targeting a single breakpoint
- Using custom breakpoints
  - Customizing your theme
  - Removing default breakpoints
  - Using arbitrary values
- Container queries

Every utility class in Tailwind can be applied conditionally at different breakpoints, which makes it a piece of cake to build complex responsive interfaces without ever leaving your HTML.

First, make sure you've added the viewport meta tag to the <head> of your document:

Then to add a utility but only have it take effect at a certain breakpoint, all you need to do is prefix the utility with the breakpoint name, followed by the : character:

There are five breakpoints by default, inspired by common device resolutions:

This works for every utility class in the framework, which means you can change literally anything at a given breakpoint — even things like letter spacing or cursor styles.

Here's a simple example of a marketing page component that uses a stacked layout on small screens, and a side-by-side layout on larger screens:

Here's how the example above works:

We've only used one breakpoint in this example, but you could easily customize this component at other sizes using the sm, lg, xl, or 2xl responsive prefixes as well.

Tailwind uses a mobile-first breakpoint system, similar to what you might be used to in other frameworks like Bootstrap.

What this means is that unprefixed utilities (like uppercase) take effect on all screen sizes, while prefixed utilities (like md:uppercase) only take effect at the specified breakpoint and above.

Where this approach surprises people most often is that to style something for mobile, you need to use the unprefixed version of a utility, not the sm: prefixed version. Don't think of sm: as meaning "on small screens", think of it as "at the small breakpoint".

Don't use sm: to target mobile devices

Use unprefixed utilities to target mobile, and override them at larger breakpoints

For this reason, it's often a good idea to implement the mobile layout for a design first, then layer on any changes that make sense for sm screens, followed by md screens, etc.

By default, styles applied by rules like md:flex will apply at that breakpoint and stay applied at larger breakpoints.

If you'd like to apply a utility only when a specific breakpoint range is active, stack a responsive variant like md with a max-* variant to limit that style to a specific range:

Tailwind generates a corresponding max-* variant for each breakpoint, so out of the box the following variants are available:

To target a single breakpoint, target the range for that breakpoint by stacking a responsive variant like md with the max-* variant for the next breakpoint:

Read about targeting breakpoint ranges to learn more.

Use the --breakpoint-* theme variables to customize your breakpoints:

This updates the 2xl breakpoint to use 100rem instead of the default 96rem, and creates new xs and 3xl breakpoints that can be used in your markup:

Note that it's important to always use the same unit for defining your breakpoints or the generated utilities may be sorted in an unexpected order, causing breakpoint classes to override each other in unexpected ways.

Tailwind uses rem for the default breakpoints, so if you are adding additional breakpoints to the defaults, make sure you use rem as well.

Learn more about customizing your theme in the theme documentation.

To remove a default breakpoint, reset its value to the initial keyword:

You can also reset all of the default breakpoints using --breakpoint-*: initial, then define all of your breakpoints from scratch:

Learn more removing default theme values in the theme documentation.

If you need to use a one-off breakpoint that doesn’t make sense to include in your theme, use the min or max variants to generate a custom breakpoint on the fly using any arbitrary value.

Learn more about arbitrary value support in the arbitrary values documentation.

Container queries are a modern CSS feature that let you style something based on the size of a parent element instead of the size of the entire viewport. They let you build components that are a lot more portable and reusable because they can change based on the actual space available for that component.

Use the @container class to mark an element as a container, then use variants like @sm and @md to style child elements based on the size of the container:

Just like breakpoint variants, container queries are mobile-first in Tailwind CSS and apply at the target container size and up.

Use variants like @max-sm and @max-md to apply a style below a specific container size:

Stack a regular container query variant with a max-width container query variant to target a specific range:

For complex designs that use multiple nested containers, you can name containers using @container/{name} and target specific containers with variants like @sm/{name} and @md/{name}:

This makes it possible to style something based on the size of a distant container, rather than just the nearest container.

Use the --container-* theme variables to customize your container sizes:

This adds a new 8xl container query variant that can be used in your markup:

Learn more about customizing your theme in the theme documentation.

Use variants like @min-[475px] and @max-[960px] for one-off container query sizes you don't want to add to your theme:

Use container query length units like cqw as arbitrary values in other utility classes to reference the container size:

By default, Tailwind includes container sizes ranging from 16rem (256px) to 80rem (1280px):

**Examples:**

Example 1 (jsx):
```jsx
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Example 2 (jsx):
```jsx
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
```

Example 3 (jsx):
```jsx
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens --><img class="w-16 md:w-32 lg:w-48" src="..." />
```

Example 4 (jsx):
```jsx
<!-- Width of 16 by default, 32 on medium screens, and 48 on large screens --><img class="w-16 md:w-32 lg:w-48" src="..." />
```

---

## Dark mode

**URL:** https://tailwindcss.com/docs/dark-mode

**Contents:**
- Overview
- Toggling dark mode manually
  - Using a data attribute
  - With system theme support

Now that dark mode is a first-class feature of many operating systems, it's becoming more and more common to design a dark version of your website to go along with the default design.

To make this as easy as possible, Tailwind includes a dark variant that lets you style your site differently when dark mode is enabled:

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

By default this uses the prefers-color-scheme CSS media feature, but you can also build sites that support toggling dark mode manually by overriding the dark variant.

If you want your dark theme to be driven by a CSS selector instead of the prefers-color-scheme media query, override the dark variant to use your custom selector:

Now instead of dark:* utilities being applied based on prefers-color-scheme, they will be applied whenever the dark class is present earlier in the HTML tree:

How you add the dark class to the html element is up to you, but a common approach is to use a bit of JavaScript that updates the class attribute and syncs that preference to somewhere like localStorage.

To use a data attribute instead of a class to activate dark mode, just override the dark variant with an attribute selector instead:

Now dark mode utilities will be applied whenever the data-theme attribute is set to dark somewhere up the tree:

To build three-way theme toggles that support light mode, dark mode, and your system theme, use a custom dark mode selector and the window.matchMedia() API to detect the system theme and update the html element when needed.

Here's a simple example of how you can support light mode, dark mode, as well as respecting the operating system preference:

Again you can manage this however you like, even storing the preference server-side in a database and rendering the class on the server — it's totally up to you.

**Examples:**

Example 1 (jsx):
```jsx
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">  <div>    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">      <svg class="h-6 w-6 stroke-white" ...>        <!-- ... -->      </svg>    </span>  </div>  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.  </p></div>
```

Example 2 (jsx):
```jsx
<div class="bg-white dark:bg-gray-800 rounded-lg px-6 py-8 ring shadow-xl ring-gray-900/5">  <div>    <span class="inline-flex items-center justify-center rounded-md bg-indigo-500 p-2 shadow-lg">      <svg class="h-6 w-6 stroke-white" ...>        <!-- ... -->      </svg>    </span>  </div>  <h3 class="text-gray-900 dark:text-white mt-5 text-base font-medium tracking-tight ">Writes upside-down</h3>  <p class="text-gray-500 dark:text-gray-400 mt-2 text-sm ">    The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.  </p></div>
```

Example 3 (python):
```python
@import "tailwindcss";@custom-variant dark (&:where(.dark, .dark *));
```

Example 4 (python):
```python
@import "tailwindcss";@custom-variant dark (&:where(.dark, .dark *));
```

---

## Theme variables

**URL:** https://tailwindcss.com/docs/theme

**Contents:**
- Overview
  - What are theme variables?
    - Why @theme instead of :root?
  - Relationship to utility classes
    - Relationship to variants
  - Theme variable namespaces
  - Default theme variables
- Customizing your theme
  - Extending the default theme
  - Overriding the default theme

Tailwind is a framework for building custom designs, and different designs need different typography, colors, shadows, breakpoints, and more.

These low-level design decisions are often called design tokens, and in Tailwind projects you store those values in theme variables.

Theme variables are special CSS variables defined using the @theme directive that influence which utility classes exist in your project.

For example, you can add a new color to your project by defining a theme variable like --color-mint-500:

Now you can use utility classes like bg-mint-500, text-mint-500, or fill-mint-500 in your HTML:

Tailwind also generates regular CSS variables for your theme variables so you can reference your design tokens in arbitrary values or inline styles:

Learn more about how theme variables map to different utility classes in the theme variable namespaces documentation.

Theme variables aren't just CSS variables — they also instruct Tailwind to create new utility classes that you can use in your HTML.

Since they do more than regular CSS variables, Tailwind uses special syntax so that defining theme variables is always explicit. Theme variables are also required to be defined top-level and not nested under other selectors or media queries, and using a special syntax makes it possible to enforce that.

Defining regular CSS variables with :root can still be useful in Tailwind projects when you want to define a variable that isn't meant to be connected to a utility class. Use @theme when you want a design token to map directly to a utility class, and use :root for defining regular CSS variables that shouldn't have corresponding utility classes.

Some utility classes in Tailwind like flex and object-cover are static, and are always the same from project to project. But many others are driven by theme variables, and only exist because of the theme variables you've defined.

For example, theme variables defined in the --font-* namespace determine all of the font-family utilities that exist in a project:

The font-sans, font-serif, and font-mono utilities only exist by default because Tailwind's default theme defines the --font-sans, --font-serif, and --font-mono theme variables.

If another theme variable like --font-poppins were defined, a font-poppins utility class would become available to go with it:

You can name your theme variables whatever you want within these namespaces, and a corresponding utility with the same name will become available to use in your HTML.

Some theme variables are used to define variants rather than utilities. For example theme variables in the --breakpoint-* namespace determine which responsive breakpoint variants exist in your project:

Now you can use the 3xl:* variant to only trigger a utility when the viewport is 120rem or wider:

Learn more about how theme variables map to different utility classes and variants in the theme variable namespaces documentation.

Theme variables are defined in namespaces and each namespace corresponds to one or more utility class or variant APIs.

Defining new theme variables in these namespaces will make new corresponding utilities and variants available in your project:

For a list of all of the default theme variables, see the default theme variable reference.

When you import tailwindcss at the top of your CSS file, it includes a set of default theme variables to get you started.

Here's what you're actually importing when you import tailwindcss:

That theme.css file includes the default color palette, type scale, shadows, fonts, and more:

This is why utilities like bg-red-200, font-serif, and shadow-sm exist out of the box — they're driven by the default theme, not hardcoded into the framework like flex-col or pointer-events-none.

For a list of all of the default theme variables, see the default theme variable reference.

The default theme variables are very general purpose and suitable for building dramatically different designs, but they are still just a starting point. It's very common to customize things like the color palette, fonts, and shadows to build exactly the design you have in mind.

Use @theme to define new theme variables and extend the default theme:

This makes a new font-script utility class available that you can use in your HTML, just like the default font-sans or font-mono utilities:

Learn more about how theme variables map to different utility classes and variants in the theme variable namespaces documentation.

Override a default theme variable value by redefining it within @theme:

Now the sm:* variant will trigger at 30rem instead of the default 40rem viewport size:

To completely override an entire namespace in the default theme, set the entire namespace to initial using the special asterisk syntax:

When you do this, all of the default utilities that use that namespace (like bg-red-500) will be removed, and only your custom values (like bg-midnight) will be available.

Learn more about how theme variables map to different utility classes and variants in the theme variable namespaces documentation.

To completely disable the default theme and use only custom values, set the global theme variable namespace to initial:

Now none of the default utility classes that are driven by theme variables will be available, and you'll only be able to use utility classes matching your custom theme variables like font-body and text-dusk.

Define the @keyframes rules for your --animate-* theme variables within @theme to include them in your generated CSS:

If you want your custom @keyframes rules to always be included even when not adding an --animate-* theme variable, define them outside of @theme instead.

When defining theme variables that reference other variables, use the inline option:

Using the inline option, the utility class will use the theme variable value instead of referencing the actual theme variable:

Without using inline, your utility classes might resolve to unexpected values because of how variables are resolved in CSS.

For example, this text will fall back to sans-serif instead of using Inter like you might expect:

This happens because var(--font-sans) is resolved where --font-sans is defined (on #parent), and --font-inter has no value there since it's not defined until deeper in the tree (on #child).

By default only used CSS variables will be generated in the final CSS output. If you want to always generate all CSS variables, you can use the static theme option:

Since theme variables are defined in CSS, sharing them across projects is just a matter of throwing them into their own CSS file that you can import in each project:

Then you can use @import to include your theme variables in other projects:

You can put shared theme variables like this in their own package in monorepo setups or even publish them to NPM and import them just like any other third-party CSS files.

All of your theme variables are turned into regular CSS variables when you compile your CSS:

This makes it easy to reference all of your design tokens in any of your custom CSS or inline styles.

Use your theme variables to get access to your design tokens when you're writing custom CSS that needs to use the same values:

This is often useful when styling HTML you don't control, like Markdown content coming from a database or API and rendered to HTML.

Using theme variables in arbitrary values can be useful, especially in combination with the calc() function.

In the above example, we're subtracting 1px from the --radius-xl value on a nested inset element to make sure it has a concentric border radius.

Most of the time when you need to reference your theme variables in JS you can just use the CSS variables directly, just like any other CSS value.

For example, the popular Motion library for React lets you animate to and from CSS variable values:

If you need access to a resolved CSS variable value in JS, you can use getComputedStyle to get the value of a theme variable on the document root:

For reference, here's a complete list of the theme variables included by default when you import Tailwind CSS into your project:

**Examples:**

Example 1 (css):
```css
@import "tailwindcss";@theme {  --color-mint-500: oklch(0.72 0.11 178);}
```

Example 2 (css):
```css
@import "tailwindcss";@theme {  --color-mint-500: oklch(0.72 0.11 178);}
```

Example 3 (jsx):
```jsx
<div class="bg-mint-500">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="bg-mint-500">  <!-- ... --></div>
```

---

## Colors

**URL:** https://tailwindcss.com/docs/colors

**Contents:**
- Working with colors
  - Using color utilities
  - Adjusting opacity
  - Targeting dark mode
  - Referencing in CSS
- Customizing your colors
  - Overriding default colors
  - Disabling default colors
  - Using a custom palette
  - Referencing other variables

Tailwind CSS includes a vast, beautiful color palette out of the box, carefully crafted by expert designers and suitable for a wide range of different design styles.

Every color in the default palette includes 11 steps, with 50 being the lightest, and 950 being the darkest:

The entire color palette is available across all color related utilities, including things like background color, border color, fill, caret color, and many more.

Use color utilities like bg-white, border-pink-300, and text-gray-950 to set the different color properties of elements in your design:

Tom Watson mentioned you in Logo redesign

Here's a full list of utilities that use your color palette:

You can adjust the opacity of a color using syntax like bg-black/75, where 75 sets the alpha channel of the color to 75%:

This syntax also supports arbitrary values and the CSS variable shorthand:

Use the dark variant to write classes like dark:bg-gray-800 that only apply a color when dark mode is active:

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.

Learn more about styling for dark mode in the dark mode documentation.

Colors are exposed as CSS variables in the --color-* namespace, so you can reference them in CSS with variables like --color-blue-500 and --color-pink-700:

You can also use these as arbitrary values in utility classes:

To quickly adjust the opacity of a color when referencing it as a variable in CSS, Tailwind includes a special --alpha() function:

Use @theme to add custom colors to your project under the --color-* theme namespace:

Now utilities like bg-midnight, text-tahiti, and fill-bermuda will be available in your project in addition to the default colors.

Learn more about theme variables in the theme variables documentation.

Override any of the default colors by defining new theme variables with the same name:

Disable any default color by setting the theme namespace for that color to initial:

This is especially useful for removing the corresponding CSS variables from your output for colors you don't intend to use.

Use --color-*: initial to completely disable all of the default colors and define your own custom color palette:

Use @theme inline when defining colors that reference other colors:

Learn more in the theme documentation on referencing other variables.

Here's a complete list of the default colors and their values for reference:

This can be useful if you want to reuse any of these scales but under a different name, like redefining --color-gray-* to use the --color-slate-* scale.

**Examples:**

Example 1 (jsx):
```jsx
<div>  <div class="bg-sky-50"></div>  <div class="bg-sky-100"></div>  <div class="bg-sky-200"></div>  <div class="bg-sky-300"></div>  <div class="bg-sky-400"></div>  <div class="bg-sky-500"></div>  <div class="bg-sky-600"></div>  <div class="bg-sky-700"></div>  <div class="bg-sky-800"></div>  <div class="bg-sky-900"></div>  <div class="bg-sky-950"></div></div>
```

Example 2 (jsx):
```jsx
<div>  <div class="bg-sky-50"></div>  <div class="bg-sky-100"></div>  <div class="bg-sky-200"></div>  <div class="bg-sky-300"></div>  <div class="bg-sky-400"></div>  <div class="bg-sky-500"></div>  <div class="bg-sky-600"></div>  <div class="bg-sky-700"></div>  <div class="bg-sky-800"></div>  <div class="bg-sky-900"></div>  <div class="bg-sky-950"></div></div>
```

Example 3 (jsx):
```jsx
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">  <span class="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">    <svg class="size-6 stroke-pink-700 dark:stroke-pink-500"><!-- ... --></svg>  </span>  <div>    <p class="text-gray-700 dark:text-gray-400">      <span class="font-medium text-gray-950 dark:text-white">Tom Watson</span> mentioned you in      <span class="font-medium text-gray-950 dark:text-white">Logo redesign</span>    </p>    <time class="mt-1 block text-gray-500" datetime="9:37">9:37am</time>  </div></div>
```

Example 4 (jsx):
```jsx
<div class="flex items-center gap-4 rounded-lg bg-white p-6 shadow-md outline outline-black/5 dark:bg-gray-800">  <span class="inline-flex shrink-0 rounded-full border border-pink-300 bg-pink-100 p-2 dark:border-pink-300/10 dark:bg-pink-400/10">    <svg class="size-6 stroke-pink-700 dark:stroke-pink-500"><!-- ... --></svg>  </span>  <div>    <p class="text-gray-700 dark:text-gray-400">      <span class="font-medium text-gray-950 dark:text-white">Tom Watson</span> mentioned you in      <span class="font-medium text-gray-950 dark:text-white">Logo redesign</span>    </p>    <time class="mt-1 block text-gray-500" datetime="9:37">9:37am</time>  </div></div>
```

---

## Adding custom styles

**URL:** https://tailwindcss.com/docs/adding-custom-styles

**Contents:**
- Customizing your theme
- Using arbitrary values
  - Arbitrary properties
  - Arbitrary variants
  - Handling whitespace
  - Resolving ambiguities
- Using custom CSS
  - Adding base styles
  - Adding component classes
  - Using variants

Often the biggest challenge when working with a framework is figuring out what you’re supposed to do when there’s something you need that the framework doesn’t handle for you.

Tailwind has been designed from the ground up to be extensible and customizable, so that no matter what you’re building you never feel like you’re fighting the framework.

This guide covers topics like customizing your design tokens, how to break out of those constraints when necessary, adding your own custom CSS, and extending the framework with plugins.

If you want to change things like your color palette, spacing scale, typography scale, or breakpoints, add your customizations using the @theme directive in your CSS:

Learn more about customizing your theme in the theme variables documentation.

While you can usually build the bulk of a well-crafted design using a constrained set of design tokens, once in a while you need to break out of those constraints to get things pixel-perfect.

When you find yourself really needing something like top: 117px to get a background image in just the right spot, use Tailwind's square bracket notation to generate a class on the fly with any arbitrary value:

This is basically like inline styles, with the major benefit that you can combine it with interactive modifiers like hover and responsive modifiers like lg:

This works for everything in the framework, including things like background colors, font sizes, pseudo-element content, and more:

If you're referencing a CSS variable as an arbitrary value, you can use the custom property syntax:

This is just a shorthand for fill-[var(--my-brand-color)] that adds the var() function for you automatically.

If you ever need to use a CSS property that Tailwind doesn't include a utility for out of the box, you can also use square bracket notation to write completely arbitrary CSS:

This is really like inline styles, but again with the benefit that you can use modifiers:

This can be useful for things like CSS variables as well, especially when they need to change under different conditions:

Arbitrary variants are like arbitrary values but for doing on-the-fly selector modification, like you can with built-in pseudo-class variants like hover:{utility} or responsive variants like md:{utility} but using square bracket notation directly in your HTML.

Learn more in the arbitrary variants documentation.

When an arbitrary value needs to contain a space, use an underscore (_) instead and Tailwind will automatically convert it to a space at build-time:

In situations where underscores are common but spaces are invalid, Tailwind will preserve the underscore instead of converting it to a space, for example in URLs:

In the rare case that you actually need to use an underscore but it's ambiguous because a space is valid as well, escape the underscore with a backslash and Tailwind won't convert it to a space:

If you're using something like JSX where the backslash is stripped from the rendered HTML, use String.raw() so the backslash isn't treated as a JavaScript escape character:

Many utilities in Tailwind share a common namespace but map to different CSS properties. For example text-lg and text-black both share the text- namespace, but one is for font-size and the other is for color.

When using arbitrary values, Tailwind can generally handle this ambiguity automatically based on the value you pass in:

Sometimes it really is ambiguous though, for example when using CSS variables:

In these situations, you can "hint" the underlying type to Tailwind by adding a CSS data type before the value:

While Tailwind is designed to handle the bulk of your styling needs, there is nothing stopping you from just writing plain CSS when you need to:

If you just want to set some defaults for the page (like the text color, background color, or font family), the easiest option is just adding some classes to the html or body elements:

This keeps your base styling decisions in your markup alongside all of your other styles, instead of hiding them in a separate file.

If you want to add your own default base styles for specific HTML elements, use the @layer directive to add those styles to Tailwind's base layer:

Use the components layer for any more complicated classes you want to add to your project that you'd still like to be able to override with utility classes.

Traditionally these would be classes like card, btn, badge — that kind of thing.

By defining component classes in the components layer, you can still use utility classes to override them when necessary:

Using Tailwind you probably don't need these types of classes as often as you think. Read our guide on managing duplication for our recommendations.

The components layer is also a good place to put custom styles for any third-party components you're using:

Use the @variant directive to apply a Tailwind variant within custom CSS:

If you need to apply multiple variants at the same time, use nesting:

In addition to using the utilities that ship with Tailwind, you can also add your own custom utilities. This can be useful when there's a CSS feature you'd like to use in your project that Tailwind doesn't include utilities for out of the box.

Use the @utility directive to add a custom utility to your project:

You can now use this utility in your HTML:

It will also work with variants like hover, focus and lg:

Custom utilities are automatically inserted into the utilities layer along with all of the built-in utilities in the framework.

If your custom utility is more complex than a single class name, use nesting to define the utility:

In addition to registering simple utilities with the @utility directive, you can also register functional utilities that accept an argument:

The special --value() function is used to resolve the utility value.

Use the --value(--theme-key-*) syntax to resolve the utility value against a set of theme keys:

This will match utilities like tab-2, tab-4, and tab-github.

To resolve the value as a bare value, use the --value({type}) syntax, where {type} is the data type you want to validate the bare value as:

This will match utilities like tab-1 and tab-76.

Available bare value data types are: number, integer, ratio, and percentage.

To support literal values, use the --value('literal') syntax (notice the quotes):

This will match utilities like tab-inherit, tab-initial, and tab-unset.

To support arbitrary values, use the --value([{type}]) syntax (notice the square brackets) to tell Tailwind which types are supported as an arbitrary value:

This will match utilities like tab-[1] and tab-[76].

Available arbitrary value data types are: absolute-size, angle, bg-size, color, family-name, generic-name, image, integer, length, line-width, number, percentage, position, ratio, relative-size, url, vector, and *.

All three forms of the --value() function can be used within a rule as multiple declarations, and any declarations that fail to resolve will be omitted in the output:

This makes it possible to treat the value differently in each case if necessary, for example translating a bare integer to a percentage:

The --value() function can also take multiple arguments and resolve them left to right if you don't need to treat the return value differently in different cases:

To support negative values, register separate positive and negative utilities into separate declarations:

Modifiers are handled using the --modifier() function which works exactly like the --value() function but operates on a modifier if present:

If a modifier isn't present, any declaration depending on a modifier is just not included in the output.

To handle fractions, we rely on the CSS ratio data type. If this is used with --value(), it's a signal to Tailwind to treat the value and modifier as a single value:

This will match utilities like aspect-square, aspect-3/4, and aspect-[7/9].

In addition to using the variants that ship with Tailwind, you can also add your own custom variants using the @custom-variant directive:

Now you can use the theme-midnight:<utility> variant in your HTML:

You can create variants using the shorthand syntax when nesting isn't required:

When a custom variant has multiple rules, they can be nested within each other:

**Examples:**

Example 1 (css):
```css
@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 120rem;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

Example 2 (css):
```css
@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 120rem;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

Example 3 (jsx):
```jsx
<div class="top-[117px]">  <!-- ... --></div>
```

Example 4 (jsx):
```jsx
<div class="top-[117px]">  <!-- ... --></div>
```

---

## Detecting classes in source files

**URL:** https://tailwindcss.com/docs/detecting-classes-in-source-files

**Contents:**
- Overview
  - How classes are detected
  - Dynamic class names
  - Which files are scanned
- Explicitly registering sources
  - Setting your base path
  - Ignoring specific paths
  - Disabling automatic detection
- Safelisting specific utilities
  - Safelisting variants

Tailwind works by scanning your project for utility classes, then generating all of the necessary CSS based on the classes you've actually used.

This makes sure your CSS is as small as possible, and is also what makes features like arbitrary values possible.

Tailwind treats all of your source files as plain text, and doesn't attempt to actually parse your files as code in any way.

Instead it just looks for any tokens in your file that could be classes based on which characters Tailwind is expecting in class names:

Then it tries to generate the CSS for all of these tokens, throwing away any tokens that don't map to a utility class the framework knows about.

Since Tailwind scans your source files as plain text, it has no way of understanding string concatenation or interpolation in the programming language you're using.

Don't construct class names dynamically

In the example above, the strings text-red-600 and text-green-600 do not exist, so Tailwind will not generate those classes.

Instead, make sure any class names you’re using exist in full:

Always use complete class names

If you're using a component library like React or Vue, this means you shouldn't use props to dynamically construct classes:

Don't use props to build class names dynamically

Instead, map props to complete class names that are statically detectable at build-time:

Always map props to static class names

This has the added benefit of letting you map different prop values to different color shades for example:

As long as you always use complete class names in your code, Tailwind will generate all of your CSS perfectly every time.

Tailwind will scan every file in your project for class names, except in the following cases:

If you need to scan any files that Tailwind is ignoring by default, you can explicitly register those sources.

Use @source to explicitly register source paths relative to the stylesheet:

This is especially useful when you need to scan an external library that is built with Tailwind, since dependencies are usually listed in your .gitignore file and ignored by Tailwind by default.

Tailwind uses the current working directory as its starting point when scanning for class names by default.

To set the base path for source detection explicitly, use the source() function when importing Tailwind in your CSS:

This can be useful when working with monorepos where your build commands run from the root of the monorepo instead of the root of each project.

Use @source not to ignore specific paths, relative to the stylesheet, when scanning for class names:

This is useful when you have large directories in your project that you know don't use Tailwind classes, like legacy components or third-party libraries.

Use source(none) to completely disable automatic source detection if you want to register all of your sources explicitly:

This can be useful in projects that have multiple Tailwind stylesheets where you want to make sure each one only includes the classes each stylesheet needs.

If you need to make sure Tailwind generates certain class names that don’t exist in your content files, use @source inline() to force them to be generated:

You can also use @source inline() to generate classes with variants. For example, to generate the underline class with hover and focus variants, add {hover:,focus:,} to the source input:

The source input is brace expanded, so you can generate multiple classes at once. For example, to generate all the red background colors with hover variants, use a range:

This generates red background colors from 100 to 900 in increments of 100, along with the first and last shades of 50 and 950. It also adds the hover: variant for each of those classes.

Use @source not inline() to prevent specific classes from being generated, even if they are detected in your source files:

This will explicitly exclude the red background utilities, along with their hover and focus variants, from being generated.

**Examples:**

Example 1 (jsx):
```jsx
export function Button({ color, children }) {  const colors = {    black: "bg-black text-white",    blue: "bg-blue-500 text-white",    white: "bg-white text-black",  };  return (    <button className={`${colors[color]} rounded-full px-2 py-1.5 font-sans text-sm/6 font-medium shadow`}>      {children}    </button>  );}
```

Example 2 (jsx):
```jsx
export function Button({ color, children }) {  const colors = {    black: "bg-black text-white",    blue: "bg-blue-500 text-white",    white: "bg-white text-black",  };  return (    <button className={`${colors[color]} rounded-full px-2 py-1.5 font-sans text-sm/6 font-medium shadow`}>      {children}    </button>  );}
```

Example 3 (jsx):
```jsx
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

Example 4 (jsx):
```jsx
<div class="text-{{ error ? 'red' : 'green' }}-600"></div>
```

---

## Functions and directives

**URL:** https://tailwindcss.com/docs/functions-and-directives

**Contents:**
- Directives
  - @import
  - @theme
  - @source
  - @utility
  - @variant
  - @custom-variant
  - @apply
  - @reference
  - Subpath Imports

Directives are custom Tailwind-specific at-rules you can use in your CSS that offer special functionality for Tailwind CSS projects.

Use the @import directive to inline import CSS files, including Tailwind itself:

Use the @theme directive to define your project's custom design tokens, like fonts, colors, and breakpoints:

Learn more about customizing your theme in the theme variables documentation.

Use the @source directive to explicitly specify source files that aren't picked up by Tailwind's automatic content detection:

Learn more about automatic content detection in the detecting classes in source files documentation.

Use the @utility directive to add custom utilities to your project that work with variants like hover, focus and lg:

Learn more about registering custom utilities in the adding custom utilities documentation.

Use the @variant directive to apply a Tailwind variant to styles in your CSS:

Learn more using variants in the using variants documentation.

Use the @custom-variant directive to add a custom variant in your project:

This lets you write utilities theme-midnight:bg-black and theme-midnight:text-white.

Learn more about adding custom variants in the adding custom variants documentation.

Use the @apply directive to inline any existing utility classes into your own custom CSS:

This is useful when you need to write custom CSS (like to override the styles in a third-party library) but still want to work with your design tokens and use the same syntax you’re used to using in your HTML.

If you want to use @apply or @variant in the <style> block of a Vue or Svelte component, or within CSS modules, you will need to import your theme variables, custom utilities, and custom variants to make those values available in that context.

To do this without duplicating any CSS in your output, use the @reference directive to import your main stylesheet for reference without actually including the styles:

If you’re just using the default theme with no customizations (e.g. by using things like @theme, @custom-variant, @plugin, etc…), you can import tailwindcss directly:

When using the CLI, Vite, or PostCSS the directives @import, @reference, @plugin, and @config all support subpath imports which work similarly to bundler and TypeScript path aliases:

Tailwind provides the following build-time functions to make working with colors and the spacing scale easier.

Use the --alpha() function to adjust the opacity of a color:

Use the --spacing() function to generate a spacing value based on your theme:

This can also be useful in arbitrary values, especially in combination with calc():

The following directives and functions exist solely for compatibility with Tailwind CSS v3.x.

The @config and @plugin directives may be used in conjunction with @theme, @utility, and other CSS-driven features. This can be used to incrementally move over your theme, custom configuration, utilities, variants, and presets to CSS. Things defined in CSS will be merged where possible and otherwise take precedence over those defined in configs, presets, and plugins.

Use the @config directive to load a legacy JavaScript-based configuration file:

The corePlugins, safelist, and separator options from the JavaScript-based config are not supported in v4.0. To safelist utilities in v4 use @source inline().

Use the @plugin directive to load a legacy JavaScript-based plugin:

The @plugin directive accepts either a package name or a local path.

Use the theme() function to access your Tailwind theme values using dot notation:

This function is deprecated, and we recommend using CSS theme variables instead.

**Examples:**

Example 1 (python):
```python
@import "tailwindcss";
```

Example 2 (python):
```python
@import "tailwindcss";
```

Example 3 (css):
```css
@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 120rem;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

Example 4 (css):
```css
@theme {  --font-display: "Satoshi", "sans-serif";  --breakpoint-3xl: 120rem;  --color-avocado-100: oklch(0.99 0 0);  --color-avocado-200: oklch(0.98 0.04 113.22);  --color-avocado-300: oklch(0.94 0.11 115.03);  --color-avocado-400: oklch(0.92 0.19 114.08);  --color-avocado-500: oklch(0.84 0.18 117.33);  --color-avocado-600: oklch(0.53 0.12 118.34);  --ease-fluid: cubic-bezier(0.3, 0, 0, 1);  --ease-snappy: cubic-bezier(0.2, 0, 0, 1);  /* ... */}
```

---
