# Tailwind_Docs - Typography

**Pages:** 33

---

## font-family

**URL:** https://tailwindcss.com/docs/font-family

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like font-sans and font-mono to set the font family of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the font-[<value>] syntax to set the font family based on a completely custom value:

For CSS variables, you can also use the font-(family-name:<custom-property>) syntax:

This is just a shorthand for font-[family-name:var(<custom-property>)] that adds the var() function for you automatically.

Prefix a font-family utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --font-* theme variables to customize the font family utilities in your project:

Now the font-display utility can be used in your markup:

You can also provide default font-feature-settings and font-variation-settings values for a font family:

If needed, use the @font-face at-rule to load custom fonts:

If you're loading a font from a service like Google Fonts, make sure to put the @import at the very top of your CSS file:

Browsers require that @import statements come before any other rules, so URL imports need to be above imports like @import "tailwindcss" which are inlined in the compiled CSS.

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="font-sans ...">The quick brown fox ...</p><p class="font-serif ...">The quick brown fox ...</p><p class="font-mono ...">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="font-sans ...">The quick brown fox ...</p><p class="font-serif ...">The quick brown fox ...</p><p class="font-mono ...">The quick brown fox ...</p>
```

Example 3 (jsx):
```jsx
<p class="font-[Open_Sans] ...">  Lorem ipsum dolor sit amet...</p>
```

Example 4 (jsx):
```jsx
<p class="font-[Open_Sans] ...">  Lorem ipsum dolor sit amet...</p>
```

---

## font-size

**URL:** https://tailwindcss.com/docs/font-size

**Contents:**
- Examples
  - Basic example
  - Setting the line-height
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like text-sm and text-lg to set the font size of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use utilities like text-sm/6 and text-lg/7 to set the font size and line-height of an element at the same time:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the text-[<value>] syntax to set the font size based on a completely custom value:

For CSS variables, you can also use the text-(length:<custom-property>) syntax:

This is just a shorthand for text-[length:var(<custom-property>)] that adds the var() function for you automatically.

Prefix a font-size utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --text-* theme variables to customize the font size utilities in your project:

Now the text-tiny utility can be used in your markup:

You can also provide default line-height, letter-spacing, and font-weight values for a font size:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="text-sm ...">The quick brown fox ...</p><p class="text-base ...">The quick brown fox ...</p><p class="text-lg ...">The quick brown fox ...</p><p class="text-xl ...">The quick brown fox ...</p><p class="text-2xl ...">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="text-sm ...">The quick brown fox ...</p><p class="text-base ...">The quick brown fox ...</p><p class="text-lg ...">The quick brown fox ...</p><p class="text-xl ...">The quick brown fox ...</p><p class="text-2xl ...">The quick brown fox ...</p>
```

Example 3 (jsx):
```jsx
<p class="text-sm/6 ...">So I started to walk into the water...</p><p class="text-sm/7 ...">So I started to walk into the water...</p><p class="text-sm/8 ...">So I started to walk into the water...</p>
```

Example 4 (jsx):
```jsx
<p class="text-sm/6 ...">So I started to walk into the water...</p><p class="text-sm/7 ...">So I started to walk into the water...</p><p class="text-sm/8 ...">So I started to walk into the water...</p>
```

---

## font-smoothing

**URL:** https://tailwindcss.com/docs/font-smoothing

**Contents:**
- Examples
  - Grayscale antialiasing
  - Subpixel antialiasing
  - Responsive design

Use the antialiased utility to render text using grayscale antialiasing:

The quick brown fox jumps over the lazy dog.

Use the subpixel-antialiased utility to render text using subpixel antialiasing:

The quick brown fox jumps over the lazy dog.

Prefix -webkit-font-smoothing and -moz-osx-font-smoothing utilities with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="antialiased ...">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="antialiased ...">The quick brown fox ...</p>
```

Example 3 (jsx):
```jsx
<p class="subpixel-antialiased ...">The quick brown fox ...</p>
```

Example 4 (jsx):
```jsx
<p class="subpixel-antialiased ...">The quick brown fox ...</p>
```

---

## font-style

**URL:** https://tailwindcss.com/docs/font-style

**Contents:**
- Examples
  - Italicizing text
  - Displaying text normally
  - Responsive design

Use the italic utility to make text italic:

The quick brown fox jumps over the lazy dog.

Use the not-italic utility to display text normally:

The quick brown fox jumps over the lazy dog.

Prefix a font-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="italic ...">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="italic ...">The quick brown fox ...</p>
```

Example 3 (jsx):
```jsx
<p class="not-italic ...">The quick brown fox ...</p>
```

Example 4 (jsx):
```jsx
<p class="not-italic ...">The quick brown fox ...</p>
```

---

## font-weight

**URL:** https://tailwindcss.com/docs/font-weight

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like font-thin and font-bold to set the font weight of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the font-[<value>] syntax to set the font weight based on a completely custom value:

For CSS variables, you can also use the font-(weight:<custom-property>) syntax:

This is just a shorthand for font-[weight:var(<custom-property>)] that adds the var() function for you automatically.

Prefix a font-weight utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --font-weight-* theme variables to customize the font weight utilities in your project:

Now the font-extrablack utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="font-light ...">The quick brown fox ...</p><p class="font-normal ...">The quick brown fox ...</p><p class="font-medium ...">The quick brown fox ...</p><p class="font-semibold ...">The quick brown fox ...</p><p class="font-bold ...">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="font-light ...">The quick brown fox ...</p><p class="font-normal ...">The quick brown fox ...</p><p class="font-medium ...">The quick brown fox ...</p><p class="font-semibold ...">The quick brown fox ...</p><p class="font-bold ...">The quick brown fox ...</p>
```

Example 3 (jsx):
```jsx
<p class="font-[1000] ...">  Lorem ipsum dolor sit amet...</p>
```

Example 4 (jsx):
```jsx
<p class="font-[1000] ...">  Lorem ipsum dolor sit amet...</p>
```

---

## font-stretch

**URL:** https://tailwindcss.com/docs/font-stretch

**Contents:**
- Examples
  - Basic example
  - Using percentages
  - Using a custom value
  - Responsive design

Use utilities like font-stretch-condensed and font-stretch-expanded to set the width of a font face:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

This only applies to fonts that have multiple width variations available, otherwise the browser selects the closest match.

Use font-stretch-<percentage> utilities like font-stretch-50% and font-stretch-125% to set the width of a font face using a percentage:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the font-stretch-[<value>] syntax to set the font width based on a completely custom value:

For CSS variables, you can also use the font-stretch-(<custom-property>) syntax:

This is just a shorthand for font-stretch-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a font-stretch utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="font-stretch-extra-condensed">The quick brown fox...</p><p class="font-stretch-condensed">The quick brown fox...</p><p class="font-stretch-normal">The quick brown fox...</p><p class="font-stretch-expanded">The quick brown fox...</p><p class="font-stretch-extra-expanded">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="font-stretch-extra-condensed">The quick brown fox...</p><p class="font-stretch-condensed">The quick brown fox...</p><p class="font-stretch-normal">The quick brown fox...</p><p class="font-stretch-expanded">The quick brown fox...</p><p class="font-stretch-extra-expanded">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="font-stretch-50%">The quick brown fox...</p><p class="font-stretch-100%">The quick brown fox...</p><p class="font-stretch-150%">The quick brown fox...</p>
```

Example 4 (jsx):
```jsx
<p class="font-stretch-50%">The quick brown fox...</p><p class="font-stretch-100%">The quick brown fox...</p><p class="font-stretch-150%">The quick brown fox...</p>
```

---

## font-variant-numeric

**URL:** https://tailwindcss.com/docs/font-variant-numeric

**Contents:**
- Examples
  - Using ordinal glyphs
  - Using slashed zeroes
  - Using lining figures
  - Using oldstyle figures
  - Using proportional figures
  - Using tabular figures
  - Using diagonal fractions
  - Using stacked fractions
  - Stacking multiple utilities

Use the ordinal utility to enable special glyphs for the ordinal markers in fonts that support them:

Use the slashed-zero utility to force a zero with a slash in fonts that support them:

Use the lining-nums utility to use numeric glyphs that are aligned by their baseline in fonts that support them:

Use the oldstyle-nums utility to use numeric glyphs where some numbers have descenders in fonts that support them:

Use the proportional-nums utility to use numeric glyphs that have proportional widths in fonts that support them:

Use the tabular-nums utility to use numeric glyphs that have uniform/tabular widths in fonts that support them:

Use the diagonal-fractions utility to replace numbers separated by a slash with common diagonal fractions in fonts that support them:

Use the stacked-fractions utility to replace numbers separated by a slash with common stacked fractions in fonts that support them:

The font-variant-numeric utilities are composable so you can enable multiple variants by combining them:

Use the normal-nums property to reset numeric font variants:

Prefix a font-variant-numeric utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="ordinal ...">1st</p>
```

Example 2 (jsx):
```jsx
<p class="ordinal ...">1st</p>
```

Example 3 (jsx):
```jsx
<p class="slashed-zero ...">0</p>
```

Example 4 (jsx):
```jsx
<p class="slashed-zero ...">0</p>
```

---

## letter-spacing

**URL:** https://tailwindcss.com/docs/letter-spacing

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like tracking-tight and tracking-wide to set the letter spacing of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Using negative values doesn't make a ton of sense with the named letter spacing scale Tailwind includes out of the box, but if you've customized your scale to use numbers it can be useful:

To use a negative letter spacing value, prefix the class name with a dash to convert it to a negative value:

Use the tracking-[<value>] syntax to set the letter spacing based on a completely custom value:

For CSS variables, you can also use the tracking-(<custom-property>) syntax:

This is just a shorthand for tracking-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a letter-spacing utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --tracking-* theme variables to customize the letter spacing utilities in your project:

Now the tracking-tightest utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="tracking-tight ...">The quick brown fox ...</p><p class="tracking-normal ...">The quick brown fox ...</p><p class="tracking-wide ...">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="tracking-tight ...">The quick brown fox ...</p><p class="tracking-normal ...">The quick brown fox ...</p><p class="tracking-wide ...">The quick brown fox ...</p>
```

Example 3 (css):
```css
@theme {  --tracking-1: 0em;  --tracking-2: 0.025em;  --tracking-3: 0.05em;  --tracking-4: 0.1em;}
```

Example 4 (css):
```css
@theme {  --tracking-1: 0em;  --tracking-2: 0.025em;  --tracking-3: 0.05em;  --tracking-4: 0.1em;}
```

---

## line-clamp

**URL:** https://tailwindcss.com/docs/line-clamp

**Contents:**
- Examples
  - Basic example
  - Undoing line clamping
  - Using a custom value
  - Responsive design

Use line-clamp-<number> utilities like line-clamp-2 and line-clamp-3 to truncate multi-line text after a specific number of lines:

Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur enim.

Use line-clamp-none to undo a previously applied line clamp utility:

Use the line-clamp-[<value>] syntax to set the number of lines based on a completely custom value:

For CSS variables, you can also use the line-clamp-(<custom-property>) syntax:

This is just a shorthand for line-clamp-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a line-clamp utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<article>  <time>Mar 10, 2020</time>  <h2>Boost your conversion rate</h2>  <p class="line-clamp-3">    Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut    sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat    dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt    ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur    enim.  </p>  <div>    <img src="/img/lindsay.jpg" />    Lindsay Walton  </div></article>
```

Example 2 (jsx):
```jsx
<article>  <time>Mar 10, 2020</time>  <h2>Boost your conversion rate</h2>  <p class="line-clamp-3">    Nulla dolor velit adipisicing duis excepteur esse in duis nostrud occaecat mollit incididunt deserunt sunt. Ut ut    sunt laborum ex occaecat eu tempor labore enim adipisicing minim ad. Est in quis eu dolore occaecat excepteur fugiat    dolore nisi aliqua fugiat enim ut cillum. Labore enim duis nostrud eu. Est ut eiusmod consequat irure quis deserunt    ex. Enim laboris dolor magna pariatur. Dolor et ad sint voluptate sunt elit mollit officia ad enim sit consectetur    enim.  </p>  <div>    <img src="/img/lindsay.jpg" />    Lindsay Walton  </div></article>
```

Example 3 (jsx):
```jsx
<p class="line-clamp-3 lg:line-clamp-none">  <!-- ... --></p>
```

Example 4 (jsx):
```jsx
<p class="line-clamp-3 lg:line-clamp-none">  <!-- ... --></p>
```

---

## list-style-image

**URL:** https://tailwindcss.com/docs/list-style-image

**Contents:**
- Examples
  - Basic example
  - Using a CSS variable
  - Removing a marker image
  - Responsive design

Use the list-image-[<value>] syntax to control the marker image for list items:

Use the list-image-(<custom-property>) syntax to control the marker image for list items using a CSS variable:

This is just a shorthand for list-image-[var(<custom-property>)] that adds the var() function for you automatically.

Use the list-image-none utility to remove an existing marker image from list items:

Prefix a list-style-image utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<ul class="list-image-[url(/img/checkmark.png)]">  <li>5 cups chopped Porcini mushrooms</li>  <!-- ... --></ul>
```

Example 2 (jsx):
```jsx
<ul class="list-image-[url(/img/checkmark.png)]">  <li>5 cups chopped Porcini mushrooms</li>  <!-- ... --></ul>
```

Example 3 (jsx):
```jsx
<ul class="list-image-(--my-list-image)">  <!-- ... --></ul>
```

Example 4 (jsx):
```jsx
<ul class="list-image-(--my-list-image)">  <!-- ... --></ul>
```

---

## list-style-type

**URL:** https://tailwindcss.com/docs/list-style-type

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use utilities like list-disc and list-decimal to control the style of the markers in a list:

Use the list-[<value>] syntax to set the marker based on a completely custom value:

For CSS variables, you can also use the list-(<custom-property>) syntax:

This is just a shorthand for list-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a list-style-type utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<ul class="list-disc">  <li>Now this is a story all about how, my life got flipped-turned upside down</li>  <!-- ... --></ul><ol class="list-decimal">  <li>Now this is a story all about how, my life got flipped-turned upside down</li>  <!-- ... --></ol><ul class="list-none">  <li>Now this is a story all about how, my life got flipped-turned upside down</li>  <!-- ... --></ul>
```

Example 2 (jsx):
```jsx
<ul class="list-disc">  <li>Now this is a story all about how, my life got flipped-turned upside down</li>  <!-- ... --></ul><ol class="list-decimal">  <li>Now this is a story all about how, my life got flipped-turned upside down</li>  <!-- ... --></ol><ul class="list-none">  <li>Now this is a story all about how, my life got flipped-turned upside down</li>  <!-- ... --></ul>
```

Example 3 (jsx):
```jsx
<ol class="list-[upper-roman] ...">  <!-- ... --></ol>
```

Example 4 (jsx):
```jsx
<ol class="list-[upper-roman] ...">  <!-- ... --></ol>
```

---

## text-align

**URL:** https://tailwindcss.com/docs/text-align

**Contents:**
- Examples
  - Left aligning text
  - Right aligning text
  - Centering text
  - Justifying text
  - Using logical properties
  - Responsive design

Use the text-left utility to left align the text of an element:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the text-right utility to right align the text of an element:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the text-center utility to center the text of an element:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the text-justify utility to justify the text of an element:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the text-start and text-end utilities, which use logical properties to map to either the left or right side based on the text direction:

بدأتُ أسير نحو الماء. لن أكذب عليكم يا رفاق، كنتُ مرعوبًا. لكنني واصلتُ المسير، وبينما كنتُ أشق طريقي عبر الأمواج، غمرني هدوءٌ غريب. لا أعلم إن كان ذلك تدخّلًا إلهيًا أم صلة قرابة بين جميع الكائنات الحية، لكنني أقول لك يا جيري، في تلك اللحظة، كنتُ عالم أحياء بحرية.

Prefix a text-align utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="text-left">So I started to walk into the water...</p>
```

Example 2 (jsx):
```jsx
<p class="text-left">So I started to walk into the water...</p>
```

Example 3 (jsx):
```jsx
<p class="text-right">So I started to walk into the water...</p>
```

Example 4 (jsx):
```jsx
<p class="text-right">So I started to walk into the water...</p>
```

---

## color

**URL:** https://tailwindcss.com/docs/color

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Using a custom value
  - Applying on hover
  - Responsive design
- Customizing your theme

Use utilities like text-blue-600 and text-sky-400 to control the text color of an element:

The quick brown fox jumps over the lazy dog.

Use the color opacity modifier to control the text color opacity of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the text-[<value>] syntax to set the text color based on a completely custom value:

For CSS variables, you can also use the text-(<custom-property>) syntax:

This is just a shorthand for text-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a color utility with a variant like hover:* to only apply the utility in that state:

Hover over the text to see the expected behavior

Oh I gotta get on that internet, I'm late on everything!

Learn more about using variants in the variants documentation.

Prefix a color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the text-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="text-blue-600/100 dark:text-sky-400/100">The quick brown fox...</p><p class="text-blue-600/75 dark:text-sky-400/75">The quick brown fox...</p><p class="text-blue-600/50 dark:text-sky-400/50">The quick brown fox...</p><p class="text-blue-600/25 dark:text-sky-400/25">The quick brown fox...</p>
```

Example 4 (jsx):
```jsx
<p class="text-blue-600/100 dark:text-sky-400/100">The quick brown fox...</p><p class="text-blue-600/75 dark:text-sky-400/75">The quick brown fox...</p><p class="text-blue-600/50 dark:text-sky-400/50">The quick brown fox...</p><p class="text-blue-600/25 dark:text-sky-400/25">The quick brown fox...</p>
```

---

## text-decoration-line

**URL:** https://tailwindcss.com/docs/text-decoration-line

**Contents:**
- Examples
  - Underling text
  - Adding an overline to text
  - Adding a line through text
  - Removing a line from text
  - Applying on hover
  - Responsive design

Use the underline utility to add an underline to the text of an element:

The quick brown fox jumps over the lazy dog.

Use the overline utility to add an overline to the text of an element:

The quick brown fox jumps over the lazy dog.

Use the line-through utility to add a line through the text of an element:

The quick brown fox jumps over the lazy dog.

Use the no-underline utility to remove a line from the text of an element:

The quick brown fox jumps over the lazy dog.

Prefix a text-decoration-line utility with a variant like hover:* to only apply the utility in that state:

Hover over the text to see the expected behavior

Learn more about using variants in the variants documentation.

Prefix a text-decoration-line utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="underline">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="underline">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="overline">The quick brown fox...</p>
```

Example 4 (jsx):
```jsx
<p class="overline">The quick brown fox...</p>
```

---

## text-decoration-color

**URL:** https://tailwindcss.com/docs/text-decoration-color

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Using a custom value
  - Applying on hover
  - Responsive design
- Customizing your theme

Use utilities like decoration-sky-500 and decoration-pink-500 to change the text decoration color of an element:

I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc. Outside of work, I like to watch pod-racing and have light-saber fights.

Use the color opacity modifier to control the text decoration color opacity of an element:

I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings at My Company, Inc. Outside of work, I like to watch pod-racing and have light-saber fights.

Use the decoration-[<value>] syntax to set the text decoration color based on a completely custom value:

For CSS variables, you can also use the decoration-(<custom-property>) syntax:

This is just a shorthand for decoration-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a text-decoration-color utility with a variant like hover:* to only apply the utility in that state:

Hover over the text to see the expected behavior

Learn more about using variants in the variants documentation.

Prefix a text-decoration-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the decoration-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p>  I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings  at <a class="underline decoration-sky-500">My Company, Inc</a>. Outside  of work, I like to <a class="underline decoration-pink-500">watch pod-racing</a>  and have <a class="underline decoration-indigo-500">light-saber</a> fights.</p>
```

Example 2 (jsx):
```jsx
<p>  I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings  at <a class="underline decoration-sky-500">My Company, Inc</a>. Outside  of work, I like to <a class="underline decoration-pink-500">watch pod-racing</a>  and have <a class="underline decoration-indigo-500">light-saber</a> fights.</p>
```

Example 3 (jsx):
```jsx
<p>  I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings  at <a class="underline decoration-sky-500/30">My Company, Inc</a>. Outside  of work, I like to <a class="underline decoration-pink-500/30">watch pod-racing</a>  and have <a class="underline decoration-indigo-500/30">light-saber</a> fights.</p>
```

Example 4 (jsx):
```jsx
<p>  I’m Derek, an astro-engineer based in Tattooine. I like to build X-Wings  at <a class="underline decoration-sky-500/30">My Company, Inc</a>. Outside  of work, I like to <a class="underline decoration-pink-500/30">watch pod-racing</a>  and have <a class="underline decoration-indigo-500/30">light-saber</a> fights.</p>
```

---

## text-decoration-style

**URL:** https://tailwindcss.com/docs/text-decoration-style

**Contents:**
- Examples
  - Basic example
  - Responsive design

Use utilities like decoration-dotted and decoration-dashed to change the text decoration style of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Prefix a text-decoration-style utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="underline decoration-solid">The quick brown fox...</p><p class="underline decoration-double">The quick brown fox...</p><p class="underline decoration-dotted">The quick brown fox...</p><p class="underline decoration-dashed">The quick brown fox...</p><p class="underline decoration-wavy">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="underline decoration-solid">The quick brown fox...</p><p class="underline decoration-double">The quick brown fox...</p><p class="underline decoration-dotted">The quick brown fox...</p><p class="underline decoration-dashed">The quick brown fox...</p><p class="underline decoration-wavy">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="underline md:decoration-dashed ...">  Lorem ipsum dolor sit amet...</p>
```

Example 4 (jsx):
```jsx
<p class="underline md:decoration-dashed ...">  Lorem ipsum dolor sit amet...</p>
```

---

## text-decoration-thickness

**URL:** https://tailwindcss.com/docs/text-decoration-thickness

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use decoration-<number> utilities like decoration-2 and decoration-4 to change the text decoration thickness of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the decoration-[<value>] syntax to set the text decoration thickness based on a completely custom value:

For CSS variables, you can also use the decoration-(length:<custom-property>) syntax:

This is just a shorthand for decoration-[length:var(<custom-property>)] that adds the var() function for you automatically.

Prefix a text-decoration-thickness utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="underline decoration-1">The quick brown fox...</p><p class="underline decoration-2">The quick brown fox...</p><p class="underline decoration-4">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="underline decoration-1">The quick brown fox...</p><p class="underline decoration-2">The quick brown fox...</p><p class="underline decoration-4">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="decoration-[0.25rem] ...">  Lorem ipsum dolor sit amet...</p>
```

Example 4 (jsx):
```jsx
<p class="decoration-[0.25rem] ...">  Lorem ipsum dolor sit amet...</p>
```

---

## text-underline-offset

**URL:** https://tailwindcss.com/docs/text-underline-offset

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design

Use underline-offset-<number> utilities like underline-offset-2 and underline-offset-4 to change the offset of a text underline:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the underline-offset-[<value>] syntax to set the text underline offset based on a completely custom value:

For CSS variables, you can also use the underline-offset-(<custom-property>) syntax:

This is just a shorthand for underline-offset-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a text-underline-offset utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="underline underline-offset-1">The quick brown fox...</p><p class="underline underline-offset-2">The quick brown fox...</p><p class="underline underline-offset-4">The quick brown fox...</p><p class="underline underline-offset-8">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="underline underline-offset-1">The quick brown fox...</p><p class="underline underline-offset-2">The quick brown fox...</p><p class="underline underline-offset-4">The quick brown fox...</p><p class="underline underline-offset-8">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="underline-offset-[3px] ...">  Lorem ipsum dolor sit amet...</p>
```

Example 4 (jsx):
```jsx
<p class="underline-offset-[3px] ...">  Lorem ipsum dolor sit amet...</p>
```

---

## text-transform

**URL:** https://tailwindcss.com/docs/text-transform

**Contents:**
- Examples
  - Uppercasing text
  - Lowercasing text
  - Capitalizing text
  - Resetting text casing
  - Responsive design

Use the uppercase utility to uppercase the text of an element:

The quick brown fox jumps over the lazy dog.

Use the lowercase utility to lowercase the text of an element:

The quick brown fox jumps over the lazy dog.

Use the capitalize utility to capitalize text of an element:

The quick brown fox jumps over the lazy dog.

Use the normal-case utility to preserve the original text casing of an element—typically used to reset capitalization at different breakpoints:

The quick brown fox jumps over the lazy dog.

Prefix a text-transform utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="uppercase">The quick brown fox ...</p>
```

Example 2 (jsx):
```jsx
<p class="uppercase">The quick brown fox ...</p>
```

Example 3 (jsx):
```jsx
<p class="lowercase">The quick brown fox ...</p>
```

Example 4 (jsx):
```jsx
<p class="lowercase">The quick brown fox ...</p>
```

---

## text-wrap

**URL:** https://tailwindcss.com/docs/text-wrap

**Contents:**
- Examples
  - Allowing text to wrap
  - Preventing text from wrapping
  - Balanced text wrapping
  - Pretty text wrapping
  - Responsive design

Use the text-wrap utility to wrap overflowing text onto multiple lines at logical points in the text:

New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.

Use the text-nowrap utility to prevent text from wrapping, allowing it to overflow if necessary:

New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.

Use the text-balance utility to distribute the text evenly across each line:

New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.

For performance reasons browsers limit text balancing to blocks that are ~6 lines or less, making it best suited for headings.

Use the text-pretty utility to prefer better text wrapping and layout at the expense of speed. Behavior varies across browsers but often involves approaches like preventing orphans (a single word on its own line) at the end of a text block:

New Yorkers are facing the winter chill with less warmth this year as the city's most revered soup stand unexpectedly shutters, following a series of events that have left the community puzzled.

Prefix a text-wrap utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<article class="text-wrap">  <h3>Beloved Manhattan soup stand closes</h3>  <p>New Yorkers are facing the winter chill...</p></article>
```

Example 2 (jsx):
```jsx
<article class="text-wrap">  <h3>Beloved Manhattan soup stand closes</h3>  <p>New Yorkers are facing the winter chill...</p></article>
```

Example 3 (jsx):
```jsx
<article class="text-nowrap">  <h3>Beloved Manhattan soup stand closes</h3>  <p>New Yorkers are facing the winter chill...</p></article>
```

Example 4 (jsx):
```jsx
<article class="text-nowrap">  <h3>Beloved Manhattan soup stand closes</h3>  <p>New Yorkers are facing the winter chill...</p></article>
```

---

## text-indent

**URL:** https://tailwindcss.com/docs/text-indent

**Contents:**
- Examples
  - Basic example
  - Using negative values
  - Using a custom value
  - Responsive design

Use indent-<number> utilities like indent-2 and indent-8 to set the amount of empty space (indentation) that's shown before text in a block:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

To use a negative text indent value, prefix the class name with a dash to convert it to a negative value:

So I started to walk into the water. I won't lie to you boys, I was terrified. But I pressed on, and as I made my way past the breakers a strange calm came over me. I don't know if it was divine intervention or the kinship of all living things but I tell you Jerry at that moment, I was a marine biologist.

Use the indent-[<value>] syntax to set the text indentation based on a completely custom value:

For CSS variables, you can also use the indent-(<custom-property>) syntax:

This is just a shorthand for indent-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a text-indent utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="indent-8">So I started to walk into the water...</p>
```

Example 2 (jsx):
```jsx
<p class="indent-8">So I started to walk into the water...</p>
```

Example 3 (jsx):
```jsx
<p class="-indent-8">So I started to walk into the water...</p>
```

Example 4 (jsx):
```jsx
<p class="-indent-8">So I started to walk into the water...</p>
```

---

## vertical-align

**URL:** https://tailwindcss.com/docs/vertical-align

**Contents:**
- Examples
  - Aligning to baseline
  - Aligning to top
  - Aligning to middle
  - Aligning to bottom
  - Aligning to parent top
  - Aligning to parent bottom
  - Using a custom value
  - Responsive design

Use the align-baseline utility to align the baseline of an element with the baseline of its parent:

Use the align-top utility to align the top of an element and its descendants with the top of the entire line:

Use the align-middle utility to align the middle of an element with the baseline plus half the x-height of the parent:

Use the align-bottom utility to align the bottom of an element and its descendants with the bottom of the entire line:

Use the align-text-top utility to align the top of an element with the top of the parent element's font:

Use the align-text-bottom utility to align the bottom of an element with the bottom of the parent element's font:

Use the align-[<value>] syntax to set the vertical alignment based on a completely custom value:

For CSS variables, you can also use the align-(<custom-property>) syntax:

This is just a shorthand for align-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a vertical-align utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<span class="inline-block align-baseline">The quick brown fox...</span>
```

Example 2 (jsx):
```jsx
<span class="inline-block align-baseline">The quick brown fox...</span>
```

Example 3 (jsx):
```jsx
<span class="inline-block align-top">The quick brown fox...</span>
```

Example 4 (jsx):
```jsx
<span class="inline-block align-top">The quick brown fox...</span>
```

---

## white-space

**URL:** https://tailwindcss.com/docs/white-space

**Contents:**
- Examples
  - Normal
  - No Wrap
  - Pre
  - Pre Line
  - Pre Wrap
  - Break Spaces
  - Responsive design

Use the whitespace-normal utility to cause text to wrap normally within an element. Newlines and spaces will be collapsed:

Hey everyone! It’s almost 2022 and we still don’t know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

Use the whitespace-nowrap utility to prevent text from wrapping within an element. Newlines and spaces will be collapsed:

Hey everyone! It’s almost 2022 and we still don’t know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

Use the whitespace-pre utility to preserve newlines and spaces within an element. Text will not be wrapped:

Hey everyone! It’s almost 2022 and we still don’t know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

Use the whitespace-pre-line utility to preserve newlines but not spaces within an element. Text will be wrapped normally:

Hey everyone! It’s almost 2022 and we still don’t know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

Use the whitespace-pre-wrap utility to preserve newlines and spaces within an element. Text will be wrapped normally:

Hey everyone! It’s almost 2022 and we still don’t know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

Use the whitespace-break-spaces utility to preserve newlines and spaces within an element. White space at the end of lines will not hang, but will wrap to the next line:

Hey everyone! It’s almost 2022 and we still don’t know if there are aliens living among us, or do we? Maybe the person writing this is an alien. You will never know.

Prefix a white-space utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="whitespace-normal">Hey everyone!It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.You will never know.</p>
```

Example 2 (jsx):
```jsx
<p class="whitespace-normal">Hey everyone!It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.You will never know.</p>
```

Example 3 (jsx):
```jsx
<p class="overflow-auto whitespace-nowrap">Hey everyone!It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.You will never know.</p>
```

Example 4 (jsx):
```jsx
<p class="overflow-auto whitespace-nowrap">Hey everyone!It's almost 2022       and we still don't know if there             are aliens living among us, or do we? Maybe the person writing this is an alien.You will never know.</p>
```

---

## word-break

**URL:** https://tailwindcss.com/docs/word-break

**Contents:**
- Examples
  - Normal
  - Break All
  - Break Keep
  - Responsive design

Use the break-normal utility to only add line breaks at normal word break points:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

Use the break-all utility to add line breaks whenever necessary, without trying to preserve whole words:

The longest word in any of the major English language dictionaries is pneumonoultramicroscopicsilicovolcanoconiosis, a word that refers to a lung disease contracted from the inhalation of very fine silica particles, specifically from a volcano; medically, it is the same as silicosis.

Use the break-keep utility to prevent line breaks from being applied to Chinese/Japanese/Korean (CJK) text:

抗衡不屈不挠 (kànghéng bùqū bùnáo) 这是一个长词，意思是不畏强暴，奋勇抗争，坚定不移，永不放弃。这个词通常用来描述那些在面对困难和挑战时坚持自己信念的人， 他们克服一切困难，不屈不挠地追求自己的目标。无论遇到多大的挑战，他们都能够坚持到底，不放弃，最终获得胜利。

For non-CJK text the break-keep utility has the same behavior as the break-normal utility.

Prefix a word-break utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="break-normal">The longest word in any of the major...</p>
```

Example 2 (jsx):
```jsx
<p class="break-normal">The longest word in any of the major...</p>
```

Example 3 (jsx):
```jsx
<p class="break-all">The longest word in any of the major...</p>
```

Example 4 (jsx):
```jsx
<p class="break-all">The longest word in any of the major...</p>
```

---

## hyphens

**URL:** https://tailwindcss.com/docs/hyphens

**Contents:**
- Examples
  - Preventing hyphenation
  - Manual hyphenation
  - Automatic hyphenation
  - Responsive design

Use the hyphens-none utility to prevent words from being hyphenated even if the line break suggestion &shy; is used:

Officially recognized by the Duden dictionary as the longest word in German, Kraftfahrzeug­haftpflichtversicherung is a 36 letter word for motor vehicle liability insurance.

Use the hyphens-manual utility to only set hyphenation points where the line break suggestion &shy; is used:

Officially recognized by the Duden dictionary as the longest word in German, Kraftfahrzeug­haftpflichtversicherung is a 36 letter word for motor vehicle liability insurance.

This is the default browser behavior.

Use the hyphens-auto utility to allow the browser to automatically choose hyphenation points based on the language:

Officially recognized by the Duden dictionary as the longest word in German, Kraftfahrzeughaftpflichtversicherung is a 36 letter word for motor vehicle liability insurance.

The line break suggestion &shy; will be preferred over automatic hyphenation points.

Prefix a hyphens utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="hyphens-none">  ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...</p>
```

Example 2 (jsx):
```jsx
<p class="hyphens-none">  ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...</p>
```

Example 3 (jsx):
```jsx
<p class="hyphens-manual">  ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...</p>
```

Example 4 (jsx):
```jsx
<p class="hyphens-manual">  ... Kraftfahrzeug&shy;haftpflichtversicherung is a ...</p>
```

---

## content

**URL:** https://tailwindcss.com/docs/content

**Contents:**
- Examples
  - Basic example
  - Referencing an attribute value
  - Using spaces and underscores
  - Using a CSS variable
  - Responsive design

Use the content-[<value>] syntax, along with the before and after variants, to set the contents of the ::before and ::after pseudo-elements:

Use the content-[attr(<name>)] syntax to reference a value stored in an attribute using the attr() CSS function:

Since whitespace denotes the end of a class in HTML, replace any spaces in an arbitrary value with an underscore:

If you need to include an actual underscore, you can do this by escaping it with a backslash:

Use the content-(<custom-property>) syntax to control the contents of the ::before and ::after pseudo-elements using a CSS variable:

This is just a shorthand for content-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a content utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p>Higher resolution means more than just a better-quality image. With aRetina 6K display, <a class="text-blue-600 after:content-['_↗']" href="...">Pro Display XDR</a> gives you nearly 40 percent more screen real estate thana 5K display.</p>
```

Example 2 (jsx):
```jsx
<p>Higher resolution means more than just a better-quality image. With aRetina 6K display, <a class="text-blue-600 after:content-['_↗']" href="...">Pro Display XDR</a> gives you nearly 40 percent more screen real estate thana 5K display.</p>
```

Example 3 (jsx):
```jsx
<p before="Hello World" class="before:content-[attr(before)] ...">  <!-- ... --></p>
```

Example 4 (jsx):
```jsx
<p before="Hello World" class="before:content-[attr(before)] ...">  <!-- ... --></p>
```

---

## background-color

**URL:** https://tailwindcss.com/docs/background-color

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Using a custom value
  - Applying on hover
  - Responsive design
- Customizing your theme

Use utilities like bg-white, bg-indigo-500 and bg-transparent to control the background color of an element:

Use the color opacity modifier to control the opacity of an element's background color:

Use the bg-[<value>] syntax to set the background color based on a completely custom value:

For CSS variables, you can also use the bg-(<custom-property>) syntax:

This is just a shorthand for bg-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a background-color utility with a variant like hover:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

Prefix a background-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the bg-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="bg-blue-500 ...">Button A</button><button class="bg-cyan-500 ...">Button B</button><button class="bg-pink-500 ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="bg-blue-500 ...">Button A</button><button class="bg-cyan-500 ...">Button B</button><button class="bg-pink-500 ...">Button C</button>
```

Example 3 (jsx):
```jsx
<button class="bg-sky-500/100 ..."></button><button class="bg-sky-500/75 ..."></button><button class="bg-sky-500/50 ..."></button>
```

Example 4 (jsx):
```jsx
<button class="bg-sky-500/100 ..."></button><button class="bg-sky-500/75 ..."></button><button class="bg-sky-500/50 ..."></button>
```

---

## outline-color

**URL:** https://tailwindcss.com/docs/outline-color

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like outline-rose-500 and outline-lime-100 to control the color of an element's outline:

Use the color opacity modifier to control the opacity of an element's outline color:

Use the outline-[<value>] syntax to set the outline color based on a completely custom value:

For CSS variables, you can also use the outline-(<custom-property>) syntax:

This is just a shorthand for outline-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an outline-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the outline-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<button class="outline-2 outline-offset-2 outline-blue-500 ...">Button A</button><button class="outline-2 outline-offset-2 outline-cyan-500 ...">Button B</button><button class="outline-2 outline-offset-2 outline-pink-500 ...">Button C</button>
```

Example 2 (jsx):
```jsx
<button class="outline-2 outline-offset-2 outline-blue-500 ...">Button A</button><button class="outline-2 outline-offset-2 outline-cyan-500 ...">Button B</button><button class="outline-2 outline-offset-2 outline-pink-500 ...">Button C</button>
```

Example 3 (jsx):
```jsx
<button class="outline-2 outline-blue-500/100 ...">Button A</button><button class="outline-2 outline-blue-500/75 ...">Button B</button><button class="outline-2 outline-blue-500/50 ...">Button C</button>
```

Example 4 (jsx):
```jsx
<button class="outline-2 outline-blue-500/100 ...">Button A</button><button class="outline-2 outline-blue-500/75 ...">Button B</button><button class="outline-2 outline-blue-500/50 ...">Button C</button>
```

---

## accent-color

**URL:** https://tailwindcss.com/docs/accent-color

**Contents:**
- Examples
  - Setting the accent color
  - Changing the opacity
  - Using a custom value
  - Applying on hover
  - Responsive design
- Customizing your theme

Use utilities like accent-rose-500 and accent-lime-600 to change the accent color of an element:

This is helpful for styling elements like checkboxes and radio groups by overriding the browser's default color.

Use the color opacity modifier to control the opacity of an element's accent color:

Setting the accent color opacity has limited browser-support and only works in Firefox at this time.

Use the accent-[<value>] syntax to set the accent color based on a completely custom value:

For CSS variables, you can also use the accent-(<custom-property>) syntax:

This is just a shorthand for accent-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix an accent-color utility with a variant like hover:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

Prefix an accent-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the accent-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<label>  <input type="checkbox" checked />  Browser default</label><label>  <input class="accent-pink-500" type="checkbox" checked />  Customized</label>
```

Example 2 (jsx):
```jsx
<label>  <input type="checkbox" checked />  Browser default</label><label>  <input class="accent-pink-500" type="checkbox" checked />  Customized</label>
```

Example 3 (jsx):
```jsx
<input class="accent-purple-500/25" type="checkbox" checked /><input class="accent-purple-500/75" type="checkbox" checked />
```

Example 4 (jsx):
```jsx
<input class="accent-purple-500/25" type="checkbox" checked /><input class="accent-purple-500/75" type="checkbox" checked />
```

---

## caret-color

**URL:** https://tailwindcss.com/docs/caret-color

**Contents:**
- Examples
  - Basic example
  - Using a custom value
  - Responsive design
- Customizing your theme

Use utilities like caret-rose-500 and caret-lime-600 to change the color of the text input cursor:

Focus the textarea to see the new caret color

Use the caret-[<value>] syntax to set the caret color based on a completely custom value:

For CSS variables, you can also use the caret-(<custom-property>) syntax:

This is just a shorthand for caret-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a caret-color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the caret-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<textarea class="caret-pink-500 ..."></textarea>
```

Example 2 (jsx):
```jsx
<textarea class="caret-pink-500 ..."></textarea>
```

Example 3 (jsx):
```jsx
<textarea class="caret-[#50d71e] ..."></textarea>
```

Example 4 (jsx):
```jsx
<textarea class="caret-[#50d71e] ..."></textarea>
```

---

## color-scheme

**URL:** https://tailwindcss.com/docs/color-scheme

**Contents:**
- Examples
  - Basic example
  - Applying in dark mode

Use utilities like scheme-light and scheme-light-dark to control how element should be rendered:

Try switching your system color scheme to see the difference

Prefix a color-scheme utility with a variant like dark:* to only apply the utility in that state:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<div class="scheme-light ...">  <input type="date" /></div><div class="scheme-dark ...">  <input type="date" /></div><div class="scheme-light-dark ...">  <input type="date" /></div>
```

Example 2 (jsx):
```jsx
<div class="scheme-light ...">  <input type="date" /></div><div class="scheme-dark ...">  <input type="date" /></div><div class="scheme-light-dark ...">  <input type="date" /></div>
```

Example 3 (jsx):
```jsx
<html class="scheme-light dark:scheme-dark ...">  <!-- ... --></html>
```

Example 4 (jsx):
```jsx
<html class="scheme-light dark:scheme-dark ...">  <!-- ... --></html>
```

---

## forced-color-adjust

**URL:** https://tailwindcss.com/docs/forced-color-adjust

**Contents:**
- Examples
  - Opting out of forced colors
  - Restoring forced colors
  - Responsive design

Use the forced-color-adjust-none utility to opt an element out of the colors enforced by forced colors mode. This is useful in situations where enforcing a limited color palette will degrade usability.

Try emulating `forced-colors: active` in your developer tools to see the changes

You can also use the forced colors variant to conditionally add styles when the user has enabled a forced color mode.

Use the forced-color-adjust-auto utility to make an element adhere to colors enforced by forced colors mode:

This can be useful if you want to undo the forced-color-adjust-none utility, for example on a larger screen size.

Prefix a forced-color-adjust utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

**Examples:**

Example 1 (jsx):
```jsx
<form>  <img src="/img/shirt.jpg" />  <div>    <h3>Basic Tee</h3>    <h3>$35</h3>    <fieldset>      <legend class="sr-only">Choose a color</legend>      <div class="forced-color-adjust-none ...">        <label>          <input class="sr-only" type="radio" name="color-choice" value="White" />          <span class="sr-only">White</span>          <span class="size-6 rounded-full border border-black/10 bg-white"></span>        </label>        <!-- ... -->      </div>    </fieldset>  </div></form>
```

Example 2 (jsx):
```jsx
<form>  <img src="/img/shirt.jpg" />  <div>    <h3>Basic Tee</h3>    <h3>$35</h3>    <fieldset>      <legend class="sr-only">Choose a color</legend>      <div class="forced-color-adjust-none ...">        <label>          <input class="sr-only" type="radio" name="color-choice" value="White" />          <span class="sr-only">White</span>          <span class="size-6 rounded-full border border-black/10 bg-white"></span>        </label>        <!-- ... -->      </div>    </fieldset>  </div></form>
```

Example 3 (jsx):
```jsx
<form>  <fieldset class="forced-color-adjust-none lg:forced-color-adjust-auto ...">    <legend>Choose a color:</legend>    <select class="hidden lg:block">      <option value="White">White</option>      <option value="Gray">Gray</option>      <option value="Black">Black</option>    </select>    <div class="lg:hidden">      <label>        <input class="sr-only" type="radio" name="color-choice" value="White" />        <!-- ... -->      </label>      <!-- ... -->    </div>  </fieldset></form>
```

Example 4 (jsx):
```jsx
<form>  <fieldset class="forced-color-adjust-none lg:forced-color-adjust-auto ...">    <legend>Choose a color:</legend>    <select class="hidden lg:block">      <option value="White">White</option>      <option value="Gray">Gray</option>      <option value="Black">Black</option>    </select>    <div class="lg:hidden">      <label>        <input class="sr-only" type="radio" name="color-choice" value="White" />        <!-- ... -->      </label>      <!-- ... -->    </div>  </fieldset></form>
```

---

## color

**URL:** https://tailwindcss.com/docs/text-color

**Contents:**
- Examples
  - Basic example
  - Changing the opacity
  - Using a custom value
  - Applying on hover
  - Responsive design
- Customizing your theme

Use utilities like text-blue-600 and text-sky-400 to control the text color of an element:

The quick brown fox jumps over the lazy dog.

Use the color opacity modifier to control the text color opacity of an element:

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

The quick brown fox jumps over the lazy dog.

Use the text-[<value>] syntax to set the text color based on a completely custom value:

For CSS variables, you can also use the text-(<custom-property>) syntax:

This is just a shorthand for text-[var(<custom-property>)] that adds the var() function for you automatically.

Prefix a color utility with a variant like hover:* to only apply the utility in that state:

Hover over the text to see the expected behavior

Oh I gotta get on that internet, I'm late on everything!

Learn more about using variants in the variants documentation.

Prefix a color utility with a breakpoint variant like md: to only apply the utility at medium screen sizes and above:

Learn more about using variants in the variants documentation.

Use the --color-* theme variables to customize the color utilities in your project:

Now the text-regal-blue utility can be used in your markup:

Learn more about customizing your theme in the theme documentation.

**Examples:**

Example 1 (jsx):
```jsx
<p class="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
```

Example 2 (jsx):
```jsx
<p class="text-blue-600 dark:text-sky-400">The quick brown fox...</p>
```

Example 3 (jsx):
```jsx
<p class="text-blue-600/100 dark:text-sky-400/100">The quick brown fox...</p><p class="text-blue-600/75 dark:text-sky-400/75">The quick brown fox...</p><p class="text-blue-600/50 dark:text-sky-400/50">The quick brown fox...</p><p class="text-blue-600/25 dark:text-sky-400/25">The quick brown fox...</p>
```

Example 4 (jsx):
```jsx
<p class="text-blue-600/100 dark:text-sky-400/100">The quick brown fox...</p><p class="text-blue-600/75 dark:text-sky-400/75">The quick brown fox...</p><p class="text-blue-600/50 dark:text-sky-400/50">The quick brown fox...</p><p class="text-blue-600/25 dark:text-sky-400/25">The quick brown fox...</p>
```

---
