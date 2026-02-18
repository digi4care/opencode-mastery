# Tailwind_Docs - Getting Started

**Pages:** 30

---

## Get started with Tailwind CSS

**URL:** https://tailwindcss.com/docs/installation

**Contents:**
  - Installing Tailwind CSS as a Vite plugin

Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS.

---

## Editor setup

**URL:** https://tailwindcss.com/docs/editor-setup

**Contents:**
- Syntax support
- Cursor
- Zed
- IntelliSense for VS Code
- Class sorting with Prettier
- JetBrains IDEs

Tailwind CSS uses custom CSS syntax like @theme, @variant, and @source, and in some editors this can trigger warnings or errors where these rules aren't recognized.

If you're using VS Code, our official Tailwind CSS IntelliSense plugin includes a dedicated Tailwind CSS language mode that has support for all of the custom at-rules and functions Tailwind uses.

In some cases, you may need to disable native CSS linting/validations if your editor is very strict about the syntax it expects in your CSS files.

Cursor is an AI-native code editor with features like context-aware autocomplete and built-in coding agents. Since it supports VS Code extensions, all of the Tailwind CSS tooling you're already familiar with works out of the box – including our official Tailwind CSS IntelliSense extension and the Prettier plugin for class sorting.

Check out and download Cursor.

Zed is a fast, modern code editor, designed from the ground-up for cutting-edge development workflows, including agentic editing with AI. It has built-in support for Tailwind CSS autocompletions, linting, and hover previews, without the need to install and configure a separate extension. It also integrates tightly with Prettier, so our official Prettier plugin works seamlessly with Zed when installed.

Check out Zed and learn more about how it works with Tailwind CSS.

The official Tailwind CSS IntelliSense extension for Visual Studio Code enhances the Tailwind development experience by providing users with advanced features such as autocomplete, syntax highlighting, and linting.

Check out the project on GitHub to learn more, or add it to Visual Studio Code to get started now.

We maintain an official Prettier plugin for Tailwind CSS that automatically sorts your classes following our recommended class order.

It works seamlessly with custom Tailwind configurations, and because it’s just a Prettier plugin, it works anywhere Prettier works — including every popular editor and IDE, and of course on the command line.

Check out the plugin on GitHub to learn more and get started.

JetBrains IDEs like WebStorm, PhpStorm, and others include support for intelligent Tailwind CSS completions in your HTML.

Learn more about Tailwind CSS support in JetBrains IDEs →

**Examples:**

Example 1 (jsx):
```jsx
<!-- Before --><button class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button><!-- After --><button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
```

Example 2 (jsx):
```jsx
<!-- Before --><button class="text-white px-4 sm:px-8 py-2 sm:py-3 bg-sky-700 hover:bg-sky-800">Submit</button><!-- After --><button class="bg-sky-700 px-4 py-2 text-white hover:bg-sky-800 sm:px-8 sm:py-3">Submit</button>
```

---

## Compatibility

**URL:** https://tailwindcss.com/docs/compatibility

**Contents:**
- Browser support
- Sass, Less, and Stylus
  - Build-time imports
  - Variables
  - Nesting
  - Loops
  - Color and math functions
- CSS modules
  - Scoping concerns
  - Performance

Tailwind CSS v4.0 is designed for and tested on modern browsers, and the core functionality of the framework specifically depends on these browser versions:

Tailwind also includes support for many bleeding-edge platform features like field-sizing: content, @starting-style, and text-wrap: balance that have limited browser support. It's up to you if you want to use these modern features in your projects — if the browsers you're targeting don't support them, simply don't use those utilities and variants.

If you're unsure about the support for a modern platform feature, the Can I use database is a great resource.

Tailwind CSS v4.0 is a full-featured CSS build tool designed for a specific workflow, and is not designed to be used with CSS preprocessors like Sass, Less, or Stylus.

Think of Tailwind CSS itself as your preprocessor — you shouldn't use Tailwind with Sass for the same reason you wouldn't use Sass with Stylus.

Since Tailwind is designed for modern browsers, you actually don't need a preprocessor for things like nesting or variables, and Tailwind itself will do things like bundle your imports and add vendor prefixes.

Tailwind will automatically bundle other CSS files you include with @import, without the need for a separate preprocessing tool.

In this example, the typography.css file will be bundled into your compiled CSS for you by Tailwind, without any other tooling like Sass or postcss-import.

All modern browsers support native CSS variables without the need for any sort of preprocessor:

Tailwind relies on CSS variables heavily internally, so if you can use Tailwind in your project, you can use native CSS variables.

Under the hood Tailwind uses Lightning CSS to process nested CSS like this:

Tailwind flattens that nested CSS for you so it can be understood by all modern browsers:

Native CSS nesting support is also very good these days, so you don't really need a preprocessor for nesting even if you aren't using Tailwind.

In Tailwind, the sorts of classes you may have used loops for in the past (like col-span-1, col-span-2, etc.) are generated for you on-demand by Tailwind whenever you use them instead of having to be predefined.

On top of that, when you're building things with Tailwind CSS, you do the vast majority of your styling in your HTML, not in CSS files. Since you're not writing tons of CSS in the first place, you just don't need features like loops that are designed for programmatically generating lots of custom CSS rules.

When using preprocessors like Sass or Less, you may have used functions like darken or lighten to adjust colors.

When using Tailwind, the recommended workflow is to use a predefined color palette that includes light and dark shades of each color, like the expertly designed default color palette included with the framework.

You can also use modern CSS features like color-mix() to adjust colors at run-time directly in the browser. This even lets you adjust colors defined using CSS variables or the currentcolor keyword, which isn't possible with preprocessors.

Similarly, browsers support math functions like min(), max(), and round() natively now, so there's no need to rely on a preprocessor for these features anymore either.

Tailwind is compatible with CSS modules and can co-exist with them if you are introducing Tailwind into a project that already uses them, but we don't recommend using CSS modules and Tailwind together if you can avoid it.

CSS modules are designed to solve scoping problems that just don't exist when composing utility classes in your HTML instead of writing custom CSS.

Styles are naturally scoped with Tailwind because each utility class always does the same thing, no matter where it's used — there's no risk that adding a utility class to one part of your UI creates some unexpected side effect somewhere else.

When using CSS modules, build tools like Vite, Parcel, and Turbopack process each CSS module separately. That means if you have 50 CSS modules in a project, Tailwind needs to run 50 separate times, which leads to much slower build times and a worse developer experience.

Since CSS modules are each processed separately, they have no @theme unless you import one.

This means features like @apply won't work the way you expect unless you explicitly import your global styles as reference:

Import your global styles as reference to make sure your theme variables are defined

Alternatively, you can also just use CSS variables instead of @apply which has the added benefit of letting Tailwind skip processing those files and will improve your build performance:

Vue, Svelte, and Astro support <style> blocks in component files that behave very much like CSS modules, which means they are each processed by your build tooling totally separately and have all of the same drawbacks.

If you're using Tailwind with these tools, we recommend avoiding <style> blocks in your components and just styling things with utility classes directly in your markup, the way Tailwind is meant to be used.

If you do use <style> blocks, make sure to import your global styles as reference if you want features like @apply to work as expected:

Import your global styles as reference to make sure your theme variables are defined

Or just use your globally defined CSS variables instead of features like @apply, which don't require Tailwind to process your component CSS at all:

**Examples:**

Example 1 (python):
```python
@import "tailwindcss";@import "./typography.css";
```

Example 2 (python):
```python
@import "tailwindcss";@import "./typography.css";
```

Example 3 (css):
```css
.typography {  font-size: var(--text-base);  color: var(--color-gray-700);}
```

Example 4 (css):
```css
.typography {  font-size: var(--text-base);  color: var(--color-gray-700);}
```

---

## Upgrade guide

**URL:** https://tailwindcss.com/docs/upgrade-guide

**Contents:**
- Using the upgrade tool
- Upgrading manually
  - Using PostCSS
  - Using Vite
  - Using Tailwind CLI
- Changes from v3
  - Browser requirements
  - Removed @tailwind directives
  - Removed deprecated utilities
  - Renamed utilities

Tailwind CSS v4.0 is a new major version of the framework, so while we've worked really hard to minimize breaking changes, some updates are necessary. This guide outlines all the steps required to upgrade your projects from v3 to v4.

Tailwind CSS v4.0 is designed for Safari 16.4+, Chrome 111+, and Firefox 128+. If you need to support older browsers, stick with v3.4 until your browser support requirements change.

If you'd like to upgrade a project from v3 to v4, you can use our upgrade tool to do the vast majority of the heavy lifting for you:

For most projects, the upgrade tool will automate the entire migration process including updating your dependencies, migrating your configuration file to CSS, and handling any changes to your template files.

The upgrade tool requires Node.js 20 or higher, so ensure your environment is updated before running it.

We recommend running the upgrade tool in a new branch, then carefully reviewing the diff and testing your project in the browser to make sure all of the changes look correct. You may need to tweak a few things by hand in complex projects, but the tool will save you a ton of time either way.

It's also a good idea to go over all of the breaking changes in v4 and get a good understanding of what's changed, in case there are other things you need to update in your project that the upgrade tool doesn't catch.

In v3, the tailwindcss package was a PostCSS plugin, but in v4 the PostCSS plugin lives in a dedicated @tailwindcss/postcss package.

Additionally, in v4 imports and vendor prefixing is now handled for you automatically, so you can remove postcss-import and autoprefixer if they are in your project:

If you're using Vite, we recommend migrating from the PostCSS plugin to our new dedicated Vite plugin for improved performance and the best developer experience:

In v4, Tailwind CLI lives in a dedicated @tailwindcss/cli package. Update any of your build commands to use the new package instead:

Here's a comprehensive list of all the breaking changes in Tailwind CSS v4.0.

Our upgrade tool will handle most of these changes for you automatically, so we highly recommend using it if you can.

Tailwind CSS v4.0 is designed for modern browsers and targets Safari 16.4, Chrome 111, and Firefox 128. We depend on modern CSS features like @property and color-mix() for core framework features, and Tailwind CSS v4.0 will not work in older browsers.

If you need to support older browsers, we recommend sticking with v3.4 for now. We're actively exploring a compatibility mode to help people upgrade sooner that we hope to share more news on in the future.

In v4 you import Tailwind using a regular CSS @import statement, not using the @tailwind directives you used in v3:

We've removed any utilities that were deprecated in v3 and have been undocumented for several years. Here's a list of what's been removed along with the modern alternative:

We've renamed the following utilities in v4 to make them more consistent and predictable:

We've renamed the default shadow, radius and blur scales to make sure every utility has a named value. The "bare" versions still work for backward compatibility, but the <utility>-sm utilities will look different unless updated to their respective <utility>-xs versions.

To update your project for these changes, replace all the v3 utilities with their v4 versions:

The outline utility now sets outline-width: 1px by default to be more consistent with border and ring utilities. Furthermore all outline-<number> utilities default outline-style to solid, omitting the need to combine them with outline:

The outline-none utility previously didn't actually set outline-style: none, and instead set an invisible outline that would still show up in forced colors mode for accessibility reasons.

To make this more clear we've renamed this utility to outline-hidden and added a new outline-none utility that actually sets outline-style: none.

To update your project for this change, replace any usage of outline-none with outline-hidden:

In v3, the ring utility added a 3px ring. We've changed this in v4 to be 1px to make it consistent with borders and outlines.

To update your project for this change, replace any usage of ring with ring-3:

We've changed the selector used by the space-x-* and space-y-* utilities to address serious performance issues on large pages:

You might see changes in your project if you were ever using these utilities with inline elements, or if you were adding other margins to child elements to tweak their spacing.

If this change causes any issues in your project, we recommend migrating to a flex or grid layout and using gap instead:

We've changed the selector used by the divide-x-* and divide-y-* utilities to address serious performance issues on large pages:

You might see changes in your project if you were ever using these utilities with inline elements, if you were adding other margins/padding to child elements to tweak their spacing, or adjusting the borders of specific child elements.

In v3, overriding part of a gradient with a variant would "reset" the entire gradient, so in this example the to-* color would be transparent in dark mode instead of yellow:

In v4, these values are preserved which is more consistent with how other utilities in Tailwind work.

This means you may need to explicitly use via-none if you want to "unset" a three-stop gradient back to a two-stop gradient in a specific state:

In v3, the container utility had several configuration options like center and padding that no longer exist in v4.

To customize the container utility in v4, extend it using the @utility directive:

In v3, the border-* and divide-* utilities used your configured gray-200 color by default. We've changed this to currentColor in v4 to make Tailwind less opinionated and match browser defaults.

To update your project for this change, make sure you specify a color anywhere you're using a border-* or divide-* utility:

Alternatively, add these base styles to your project to preserve the v3 behavior:

We've changed the width of the ring utility from 3px to 1px and changed the default color from blue-500 to currentColor to make things more consistent the border-*, divide-*, and outline-* utilities.

To update your project for these changes, replace any use of ring with ring-3:

Then make sure to add ring-blue-500 anywhere you were depending on the default ring color:

Alternatively, add these theme variables to your CSS to preserve the v3 behavior:

Note though that these variables are only supported for compatibility reasons, and are not considered idiomatic usage of Tailwind CSS v4.0.

We've made a couple small changes to the base styles in Preflight in v4:

In v3, placeholder text used your configured gray-400 color by default. We've simplified this in v4 to just use the current text color at 50% opacity.

You probably won't even notice this change (it might even make your project look better), but if you want to preserve the v3 behavior, add this CSS to your project:

Buttons now use cursor: default instead of cursor: pointer to match the default browser behavior.

If you'd like to continue using cursor: pointer by default, add these base styles to your CSS:

Preflight now resets margins on <dialog> elements to be consistent with how other elements are reset.

If you still want dialogs to be centered by default, add this CSS to your project:

Display classes like block or flex no longer take priority over the hidden attribute on an element. Remove the hidden attribute if you want an element to be visible to the user. Note that this does not apply to hidden="until-found".

Prefixes now look like variants and are always at the beginning of the class name:

When using a prefix, you should still configure your theme variables as if you aren't using a prefix:

The generated CSS variables will include a prefix to avoid conflicts with any existing variables in your project:

In v3 you could mark a utility as important by placing an ! at the beginning of the utility name (but after any variants). In v4 you should place the ! at the very end of the class name instead:

The old way is still supported for compatibility but is deprecated.

In v3, any custom classes you defined within @layer utilities or @layer components would get picked up by Tailwind as a true utility class and would automatically work with variants like hover, focus, or lg with the difference being that @layer components would always come first in the generated stylesheet.

In v4 we are using native cascade layers and no longer hijacking the @layer at-rule, so we've introduced the @utility API as a replacement:

Custom utilities are now also sorted based on the amount of properties they define. This means that component utilities like this .btn can be overwritten by other Tailwind utilities without additional configuration:

Learn more about registering custom utilities in the adding custom utilities documentation.

In v3, stacked variants were applied from right to left, but in v4 we've updated them to apply left to right to look more like CSS syntax.

To update your project for this change, reverse the order of any order-sensitive stacked variants in your project:

You likely have very few of these if any—the direct child variant (*) and any typography plugin variants (prose-headings) are the most likely ones you might be using, and even then it's only if you've stacked them with other variants.

In v3 you were able to use CSS variables as arbitrary values without var(), but recent updates to CSS mean that this can often be ambiguous, so we've changed the syntax for this in v4 to use parentheses instead of square brackets.

To update your project for this change, replace usage of the old variable shorthand syntax with the new variable shorthand syntax:

Commas were previously replaced with spaces in the grid-cols-*, grid-rows-*, and object-* utilities inside arbitrary values. This special behavior existed in Tailwind CSS v3 for compatibility with v2. This compatibility no longer exists in v4.0 and underscores must be used to represent spaces.

To update your project for this change, replace usage of commas that were intended to be spaces with underscores:

In v4 we've updated the hover variant to only apply when the primary input device supports hover:

This can create problems if you've built your site in a way that depends on touch devices triggering hover on tap. If this is an issue for you, you can override the hover variant with your own variant that uses the old implementation:

Generally though we recommend treating hover functionality as an enhancement, and not depending on it for your site to work since touch devices don't truly have the ability to hover.

The transition and transition-colors utilities now include the outline-color property.

This means if you were adding an outline with a custom color on focus, you will see the color transition from the default color. To avoid this, make sure you set the outline color unconditionally, or explicitly set it for both states:

The rotate-*, scale-*, and translate-* utilities are now based on the individual rotate, scale, and translate properties in CSS. Normally this shouldn't affect the behavior but there's a couple of cases to look out for:

You previously would've been able to "reset" your rotate, scale, and translate utilities via transform-none. This no longer works and you will need to reset the individual properties instead:

If you customize the list of transitioned properties and include transform (e.g. by writing transition-[opacity,transform]) then these utilities will no longer transition. To fix this, include the individual properties in the list. For example, if you want to transition changes when using opacity-* and scale-* utilities you should use transition-[opacity,scale] instead.

In v3 there was a corePlugins option you could use to completely disable certain utilities in the framework. This is no longer supported in v4.

Since v4 includes CSS variables for all of your theme values, we recommend using those variables instead of the theme() function whenever possible:

For cases where you still need to use the theme() function (like in media queries where CSS variables aren't supported), you should use the CSS variable name instead of the old dot notation:

JavaScript config files are still supported for backward compatibility, but they are no longer detected automatically in v4.

If you still need to use a JavaScript config file, you can load it explicitly using the @config directive:

The corePlugins, safelist, and separator options from the JavaScript-based config are not supported in v4.0. To safelist utilities in v4 use @source inline().

In v3 we exported a resolveConfig function that you could use to turn your JavaScript-based config into a flat object that you could use in your other JavaScript.

We've removed this in v4 in hopes that people can use the CSS variables we generate directly instead, which is much simpler and will significantly reduce your bundle size.

For example, the popular Motion library for React lets you animate to and from CSS variable values:

If you need access to a resolved CSS variable value in JS, you can use getComputedStyle to get the value of a theme variable on the document root:

In v4, stylesheets that are bundled separately from your main CSS file (e.g. CSS modules files, <style> blocks in Vue, Svelte, or Astro, etc.) do not have access to theme variables, custom utilities, and custom variants defined in other files.

To make these definitions available in these contexts, use @reference to import them without duplicating any CSS in your bundle:

Alternatively, you can use your CSS theme variables directly instead of using @apply at all, which will also improve performance since Tailwind won't need to process these styles:

You can find more documentation on using Tailwind with CSS modules.

Tailwind CSS v4.0 is not designed to be used with CSS preprocessors like Sass, Less, or Stylus. Think of Tailwind CSS itself as your preprocessor — you shouldn't use Tailwind with Sass for the same reason you wouldn't use Sass with Stylus. Because of this it is not possible to use Sass, Less, or Stylus for your stylesheets or <style> blocks in Vue, Svelte, Astro, etc.

Learn more in the compatibility documentation.

**Examples:**

Example 1 (python):
```python
$ npx @tailwindcss/upgrade
```

Example 2 (python):
```python
$ npx @tailwindcss/upgrade
```

Example 3 (vue):
```vue
export default {  plugins: {    "postcss-import": {},    tailwindcss: {},    autoprefixer: {},    "@tailwindcss/postcss": {},  },};
```

Example 4 (vue):
```vue
export default {  plugins: {    "postcss-import": {},    tailwindcss: {},    autoprefixer: {},    "@tailwindcss/postcss": {},  },};
```

---

## Get started with Tailwind CSS

**URL:** https://tailwindcss.com/docs/installation/using-vite

**Contents:**
  - Installing Tailwind CSS as a Vite plugin

Installing Tailwind CSS as a Vite plugin is the most seamless way to integrate it with frameworks like Laravel, SvelteKit, React Router, Nuxt, and SolidJS.

---

## Get started with Tailwind CSS

**URL:** https://tailwindcss.com/docs/installation/using-postcss

**Contents:**
  - Installing Tailwind CSS as a PostCSS plugin

Installing Tailwind CSS as a PostCSS plugin is the most seamless way to integrate it with frameworks like Next.js and Angular.

---

## Get started with Tailwind CSS

**URL:** https://tailwindcss.com/docs/installation/tailwind-cli

**Contents:**
  - Installing Tailwind CLI

The simplest and fastest way to get up and running with Tailwind CSS from scratch is with the Tailwind CLI tool. The CLI is also available as a standalone executable if you want to use it without installing Node.js.

---

## Get started with Tailwind CSS

**URL:** https://tailwindcss.com/docs/installation/framework-guides

**Contents:**
  - Framework Guides

Framework-specific guides that cover our recommended approach to installing Tailwind CSS in a number of popular environments.

---

## Get started with Tailwind CSS

**URL:** https://tailwindcss.com/docs/installation/play-cdn

**Contents:**
  - Using Play CDN

Use the Play CDN to try Tailwind right in the browser without any build step. The Play CDN is designed for development purposes only, and is not intended for production.

---

## Install Tailwind CSS with Next.js

**URL:** https://tailwindcss.com/docs/installation/framework-guides/nextjs

Start by creating a new Next.js project if you don’t have one set up already. The most common approach is to use Create Next App.

---

## Install Tailwind CSS with Laravel

**URL:** https://tailwindcss.com/docs/installation/framework-guides/laravel/vite

Start by creating a new Laravel project if you don’t have one set up already. The most common approach is to use the Laravel installer.

---

## Install Tailwind CSS with Nuxt

**URL:** https://tailwindcss.com/docs/installation/framework-guides/nuxt

Start by creating a new Nuxt project if you don’t have one set up already. The most common approach is to use Create Nuxt.

---

## Install Tailwind CSS with SolidJS

**URL:** https://tailwindcss.com/docs/installation/framework-guides/solidjs

Start by creating a new SolidJS project if you don't have one set up already. The most common approach is to use the SolidJS Vite template.

---

## Install Tailwind CSS with SvelteKit

**URL:** https://tailwindcss.com/docs/installation/framework-guides/sveltekit

Start by creating a new SvelteKit project if you don't have one set up already. The most common approach is outlined in the SvelteKit documentation.

---

## Install Tailwind CSS with Gatsby

**URL:** https://tailwindcss.com/docs/installation/framework-guides/gatsby

Start by creating a new Gatsby project if you don’t have one set up already. The most common approach is to use Gatsby CLI.

---

## Install Tailwind CSS with Angular

**URL:** https://tailwindcss.com/docs/installation/framework-guides/angular

Start by creating a new Angular project if you don’t have one set up already. The most common approach is to use Angular CLI.

---

## Install Tailwind CSS with Ruby on Rails

**URL:** https://tailwindcss.com/docs/installation/framework-guides/ruby-on-rails

Start by creating a new Rails project if you don't have one set up already. The most common approach is to use the Rails Command Line.

---

## Install Tailwind CSS with React Router

**URL:** https://tailwindcss.com/docs/installation/framework-guides/react-router

Start by creating a new React Router project if you don’t have one set up already. The most common approach is to use Create React Router.

---

## Install Tailwind CSS with TanStack Start

**URL:** https://tailwindcss.com/docs/installation/framework-guides/tanstack-start

Start by creating a new TanStack Start project if you don’t have one set up already. The most common approach is to use Create Start App.

---

## Install Tailwind CSS with Phoenix

**URL:** https://tailwindcss.com/docs/installation/framework-guides/phoenix

Start by creating a new Phoenix project if you don't have one set up already. You can follow their installation guide to get up and running.

---

## Install Tailwind CSS with Parcel

**URL:** https://tailwindcss.com/docs/installation/framework-guides/parcel

Start by creating a new Parcel project if you don’t have one set up already. The most common approach is to add Parcel as a dev-dependency to your project as outlined in their getting started guide.

---

## Install Tailwind CSS with Symfony

**URL:** https://tailwindcss.com/docs/installation/framework-guides/symfony

Start by creating a new Symfony project if you don’t have one set up already. The most common approach is to use the Symfony Installer.

---

## Install Tailwind CSS with Meteor

**URL:** https://tailwindcss.com/docs/installation/framework-guides/meteor

Start by creating a new Meteor project if you don't have one set up already. The most common approach is to use the Meteor CLI.

---

## Install Tailwind CSS with AdonisJS

**URL:** https://tailwindcss.com/docs/installation/framework-guides/adonisjs

Start by creating a new AdonisJS project if you don’t have one set up already. The most common approach is to use Create AdonisJS.

---

## Install Tailwind CSS with Ember.js

**URL:** https://tailwindcss.com/docs/installation/framework-guides/emberjs

Start by creating a new Ember.js project if you don't have one set up already. The most common approach is to use Ember CLI.

---

## Install Tailwind CSS with Astro

**URL:** https://tailwindcss.com/docs/installation/framework-guides/astro

Start by creating a new Astro project if you don't have one set up already. The most common approach is to use create astro.

---

## Install Tailwind CSS with Qwik

**URL:** https://tailwindcss.com/docs/installation/framework-guides/qwik

Start by creating a new Qwik project if you don't have one set up already. The most common approach is to use Create Qwik.

---

## Install Tailwind CSS with Rspack

**URL:** https://tailwindcss.com/docs/installation/framework-guides/rspack/react

Start by creating a new Rspack project if you don’t have one set up already. The most common approach is to use Rspack CLI.

---

## Install Tailwind CSS with Laravel

**URL:** https://tailwindcss.com/docs/installation/framework-guides/laravel/mix

Install @tailwindcss/postcss and its peer dependencies via npm.

---

## Install Tailwind CSS with Rspack

**URL:** https://tailwindcss.com/docs/installation/framework-guides/rspack/vue

Start by creating a new Rspack project if you don’t have one set up already. The most common approach is to use Rspack CLI.

---
