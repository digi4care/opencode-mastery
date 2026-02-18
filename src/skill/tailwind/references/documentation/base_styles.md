# Tailwind_Docs - Base Styles

**Pages:** 1

---

## Preflight

**URL:** https://tailwindcss.com/docs/preflight

**Contents:**
- Overview
  - Margins are removed
  - Border styles are reset
  - Headings are unstyled
  - Lists are unstyled
    - Accessibility considerations
  - Images are block-level
  - Images are constrained
    - Elements with a hidden attribute stay hidden
- Extending Preflight

Built on top of modern-normalize, Preflight is a set of base styles for Tailwind projects that are designed to smooth over cross-browser inconsistencies and make it easier for you to work within the constraints of your design system.

When you import tailwindcss into your project, Preflight is automatically injected into the base layer:

While most of the styles in Preflight are meant to go unnoticed—they simply make things behave more like you'd expect them to—some are more opinionated and can be surprising when you first encounter them.

For a complete reference of all the styles applied by Preflight, see the stylesheet.

Preflight removes all of the default margins from all elements including headings, blockquotes, paragraphs, etc:

This makes it harder to accidentally rely on margin values applied by the user-agent stylesheet that are not part of your spacing scale.

In order to make it easy to add a border by simply adding the border class, Tailwind overrides the default border styles for all elements with the following rules:

Since the border class only sets the border-width property, this reset ensures that adding that class always adds a solid 1px border that uses currentColor.

This can cause some unexpected results when integrating certain third-party libraries, like Google maps for example.

When you run into situations like this, you can work around them by overriding the Preflight styles with your own custom CSS:

All heading elements are completely unstyled by default, and have the same font size and weight as normal text:

The reason for this is two-fold:

You can always add default header styles to your project by adding your own base styles.

Ordered and unordered lists are unstyled by default, with no bullets or numbers:

If you'd like to style a list, you can do so using the list-style-type and list-style-position utilities:

You can always add default list styles to your project by adding your own base styles.

Unstyled lists are not announced as lists by VoiceOver. If your content is truly a list but you would like to keep it unstyled, add a "list" role to the element:

Images and other replaced elements (like svg, video, canvas, and others) are display: block by default:

This helps to avoid unexpected alignment issues that you often run into using the browser default of display: inline.

If you ever need to make one of these elements inline instead of block, simply use the inline utility:

Images and videos are constrained to the parent width in a way that preserves their intrinsic aspect ratio:

This prevents them from overflowing their containers and makes them responsive by default. If you ever need to override this behavior, use the max-w-none utility:

This enforces that elements with a hidden attribute stay invisible unless using hidden="until-found". Remove the hidden attribute if you want an element to be visible to the user.

If you'd like to add your own base styles on top of Preflight, add them to the base CSS layer in your CSS using @layer base:

Learn more in the adding base styles documentation.

If you'd like to completely disable Preflight—perhaps because you're integrating Tailwind into an existing project or you'd prefer to define your own base styles—you can do so by importing only the parts of Tailwind that you need.

By default, this is what @import "tailwindcss"; injects:

To disable Preflight, simply omit its import while keeping everything else:

When importing Tailwind CSS' files individually, features like source(), theme(), and prefix() should go on their respective imports.

For example, source detection affects generated utilities, so source(…) should be added to the utilities.css import:

The same goes for important, which also affects utilities:

Similarly, theme(static) and theme(inline) affect the generated theme variables and should be placed on the theme.css import:

Finally, using a prefix with prefix(tw) affects the utilities and variables, so it should go on both imports:

**Examples:**

Example 1 (python):
```python
@layer theme, base, components, utilities;@import "tailwindcss/theme.css" layer(theme);@import "tailwindcss/preflight.css" layer(base);@import "tailwindcss/utilities.css" layer(utilities);
```

Example 2 (python):
```python
@layer theme, base, components, utilities;@import "tailwindcss/theme.css" layer(theme);@import "tailwindcss/preflight.css" layer(base);@import "tailwindcss/utilities.css" layer(utilities);
```

Example 3 (css):
```css
*,::after,::before,::backdrop,::file-selector-button {  margin: 0;  padding: 0;}
```

Example 4 (css):
```css
*,::after,::before,::backdrop,::file-selector-button {  margin: 0;  padding: 0;}
```

---
