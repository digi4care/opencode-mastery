# Shadcn-Svelte_Docs - Migration

**Pages:** 3

---

## Svelte 5

**URL:** https://www.shadcn-svelte.com/docs/migration/svelte-5

**Contents:**

- Svelte 5
- Svelte 4 to Svelte 5
- Prerequisites
- Update Configs
  - Update components.json
  - Update tailwind.config.js
  - Update utils.ts
- Upgrade Components
  - Alias Dependencies (optional)
  - Update Dependencies

How to migrate from Svelte 4 and Tailwind 3 to Svelte 5.

Note: With Svelte 5 comes significant changes to this project, along with the headless UI library used bits-ui. This guide is specifically focused on migrating the shadcn-svelte portions and does not cover the migration of bits-ui. See Bits UI's migration guide for more information.

This first guide will take your project from Svelte 4 with Tailwind 3 to Svelte 5 and Tailwind 3.

Once you've completed this guide and you're comfortable everything is working, you can move on to the next guide to migrate to Tailwind 4.

The components.json, utils, and the global CSS file have changed for Svelte 5.

Add the registry to the root object, and add hooks, ui, and lib keys under aliases.

Add tailwindcss-animate.

Add the tailwindcss-animate plugin, sidebar colors, and animations config.

Note: You may not want to do this step until after you've updated your components, as some components may rely on the now removed flyAndScale function.

utils.ts now only exports the cn function and a few utility types.

If you plan to slowly migrate components, it's recommended to alias the old versions of the major dependencies, like bits-ui, in your package.json file so that you can use both versions of the library in your project while you migrate.

You'll then want to replace all the imports used in your project to bits-ui-old.

You can do the same for any of the other dependencies that you're using in your project.

The following dependencies have been updated to support Svelte 5:

You can update your dependencies by running the following command:

Now you're ready to begin updating your components to their new versions. The CLI doesn't actually update your components, it simply replaces them with the new versions, so be sure to commit your changes before running the CLI.

Now you can run the add command to start migrating your components.

Review the diff to see what was updated and make any necessary adjustments. Rinse and repeat for each component you want to migrate.

Once you've updated all your components, you can remove the old dependencies from your package.json file.

cmdk-sv has been replaced with Bits UI's Command component.

svelte-headless-table has been replaced with @tanstack/table-core.

svelte-radix has been replaced with @lucide/svelte.

lucide-svelte has been replaced with @lucide/svelte.

Once you've completed this guide and you're comfortable everything is working as expected, you can move on to the Tailwind 4 Guide.

**Examples:**

Example 1 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils",
+   "ui": "$lib/components/ui",
+   "hooks": "$lib/hooks",
+   "lib": "$lib"
  },
  "typescript": true,
+ "registry": "https://shadcn-svelte.com/registry"
}
```

Example 2 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema.json",
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css",
    "baseColor": "slate"
  },
  "aliases": {
    "components": "$lib/components",
    "utils": "$lib/utils",
+   "ui": "$lib/components/ui",
+   "hooks": "$lib/hooks",
+   "lib": "$lib"
  },
  "typescript": true,
+ "registry": "https://shadcn-svelte.com/registry"
}
```

Example 3 (unknown):

```unknown
pnpm i tailwindcss-animate
```

Example 4 (unknown):

```unknown
pnpm i tailwindcss-animate
```

---

## Tailwind v4

**URL:** https://www.shadcn-svelte.com/docs/migration/tailwind-v4

**Contents:**

- Tailwind v4
- What's New
- See it Live
- Try It Out
- Upgrade Your Project
  - 1. Follow the Tailwind v4 Upgrade Guide
  - 2. Replace PostCSS with Vite
    - Delete postcss.config.js
    - Uninstall @tailwindcss/postcss
    - Install @tailwindcss/vite

How to use shadcn-svelte with Tailwind v4 and Svelte 5.

This documentation site is now running Tailwind v4. If you're looking for the old Tailwind v3 docs, you can find them here: https://tw3.shadcn-svelte.com.

Note: this is non-breaking. Your existing apps with Tailwind v3 will continue to work. When you add new components, they'll still be in Tailwind v3 with the style configured in components.json until you upgrade. Only new projects start with Tailwind v4.

This documentation site is now using Tailwind v4 and Svelte 5, but for a more complete example, checkout the demo site here: https://v4.shadcn-svelte.com.

If you find any bugs, please us know on GitHub.

You can start using Tailwind v4 and Svelte 5 today using the @latest CLI. See the specific install docs

Note: This guide assumes you are coming from a Svelte 5 and Tailwind 3 project. If you are coming from a Svelte 4 project, you should first follow the Svelte 4 and Tailwind 3 to Svelte 5 guide.

Important: Before upgrading, please read the Tailwind v4 Compatibility Docs and make sure your project is ready for the upgrade. Tailwind v4 uses bleeding-edge browser features and is designed for modern browsers.

One of the major advantages of using shadcn-svelte is that the code you end up with is exactly what you'd write yourself. There are no hidden abstractions.

This means when a dependency has a new release, you can just follow the official upgrade paths.

Here's how to upgrade your existing projects:

The upgrade script will automatically migrate your project to the latest PostCSS configuration of Tailwind v4, but the Tailwind team recommends using Vite instead, so we'll use that instead.

Start your dev server and verify that all your styles are working as expected.

The codemod will update your app.css file to look something like this, where it's defining the colors as CSS variables and importing your existing tailwind.config.ts file:

In the following steps, we'll update this to completely remove the tailwind.config.ts and adopt the CSS-based config.

We've deprecated tailwindcss-animate in favor of tw-animate-css, which has support for Tailwind v4.

We override the styles applied here so this is just dead code.

We'll move the CSS variables to the :root and .dark selectors, wrap the colors values in hsl(), and set up an @theme inline directive to replace our Tailwind v3 config.

Once complete, your app.css file should look something like this (the color values will differ depending on your theme):

Restart your dev server and verify that all your styles are working as expected.

Once you've verified that your styles are working as expected, you can remove the tailwind.config.ts file.

The new size-_ utility (added in Tailwind v3.4), is now fully supported by tailwind-merge. You can replace w-_ h-_ with the new size-_ utility:

If you're planning on adding additional components in the future or plan to update your existing components to the latest versions, you'll need to update your utils.ts file.

Previously, we were depending on bits-ui for some simple type helpers that required you to have bits-ui installed, regardless if you were using components that depend on it.

These helpers have been moved into the utils.ts file:

And then you can incrementally replace these imports in your existing components:

The dark mode colors have been revisited and updated to be more accessible, as you can see in these docs as well as the v4.shadcn-svelte.com demo site.

You can update your components to use the new dark mode colors by re-adding your components using the CLI1.

The CLI will overwrite your existing components. It's recommended to commit the changes you've made to your components before running the CLI.

Update the dark mode colors in your app.css file to the new OKLCH values. See the Base Colors reference for a list of colors.

Review and re-apply any changes you've made to your components using the git diffs.

Updating your components will overwrite your existing components. ↩

**Examples:**

Example 1 (vue):

```vue
- export default { - plugins: { - '@tailwindcss/postcss': {}, - } - };
```

Example 2 (vue):

```vue
- export default { - plugins: { - '@tailwindcss/postcss': {}, - } - };
```

Example 3 (python):

```python
pnpm remove @tailwindcss/postcss
```

Example 4 (python):

```python
pnpm remove @tailwindcss/postcss
```

---

## Migration

**URL:** https://www.shadcn-svelte.com/docs/migration

**Contents:**

- Migration

Learn how to update your project to the latest version of shadcn-svelte.

The latest version of shadcn-svelte expects you to be using Svelte v5 and Tailwind v4. The following guides will help you update your project to the latest version.

---
