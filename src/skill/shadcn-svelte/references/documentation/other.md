# Shadcn-Svelte_Docs - Other

**Pages:** 70

---

## Introduction

**URL:** https://www.shadcn-svelte.com/docs

**Contents:**

- Introduction
- Open Code
- Composition
- Distribution
- Beautiful Defaults
- AI-Ready

Re-usable components built with Bits UI and Tailwind CSS.

An unofficial, community-led Svelte port of shadcn/ui. We are not affiliated with shadcn, but we did get his blessing before creating a Svelte version of his work. This project was born out of the need for a similar project for the Svelte ecosystem.

This is not a component library. It is how you build your component library.

You know how most traditional component libraries work: you install a package from NPM, import the components, and use them in your app.

This approach works well until you need to customize a component to fit your design system or require one that isn’t included in the library. Often, you end up wrapping library components, writing workarounds to override styles, or mixing components from different libraries with incompatible APIs.

This is what shadcn-svelte aims to solve. It is built around the following principles:

shadcn-svelte hands you the actual component code. You have full control to customize and extend the components to your needs. This means:

In a typical library, if you need to change a button’s behavior, you have to override styles or wrap the component. With shadcn-svelte, you simply edit the button code directly.

shadcn-svelte follows a headless component architecture. This means the core of your app can receive fixes by updating your dependencies, for instance, bits-ui or paneforge.

The topmost layer, i.e., the one closest to your design system, is not coupled with the implementation of the library. It stays open for modification.

Every component in shadcn-svelte shares a common, composable interface. If a component does not exist, we bring it in, make it composable, and adjust its style to match and work with the rest of the design system.

A shared, composable interface means it's predictable for both your team and LLMs. You are not learning different APIs for every new component. Even for third-party ones.

shadcn-svelte is also a code distribution system. It defines a schema for components and a CLI to distribute them.

You can use the schema to distribute your components to other projects or have AI generate completely new components based on existing schema.

shadcn-svelte comes with a large collection of components that have carefully chosen default styles. They are designed to look good on their own and to work well together as a consistent system:

The design of shadcn-svelte makes it easy for AI tools to work with your code. Its open code and consistent API allow AI models to read, understand, and even generate new components.

An AI model can learn how your components work and suggest improvements or even create new components that integrate with your existing design.

---

## Components

**URL:** https://www.shadcn-svelte.com/docs/components

**Contents:**

- Components

Here you can find all the components available in the library. We are working on adding more components.

---

## Changelog

**URL:** https://www.shadcn-svelte.com/docs/changelog

**Contents:**

- Changelog
- October 2025 - New Components
- June 2025
  - New Calendar Components
- May 2025
  - Tailwind v4 Support
  - Charts
  - Custom Registry Support
- March 2024
  - Introducing Blocks

Latest updates and announcements.

For this round of components, I looked at what we build every day, the boring stuff we rebuild over and over, and made reusable abstractions you can actually use.

We've completely overhauled the Calendar and RangeCalendar components to support dropdowns for the month and year selectors, and have added 30+ Calendar blocks to help you get started building your own calendar components.

Check out the Calendar docs page and the Calendar Blocks page for more.

Tailwind v4 support has officially landed. You can see a full demo of the refreshed styles that come with it here: https://v4.shadcn-svelte.com.

This release includes several key changes, all outlined in the Tailwind v4 migration guide. If you're still using Svelte v5 with Tailwind v3, your project and the CLI will continue to work as expected until you're ready to upgrade.

Charts have been added as a preview component to the project. See the Charts page for examples.

If you're running Svelte v5 and Tailwind v4 you can add them to your project via the CLI.

We've added support for custom/remote registries - This means you can publish your own components and share them with the community via the shadcn-svelte CLI.

See the Registry documentation for more information.

Blocks are ready-made components that you can use to build your apps. They are fully responsive, accessible, and composable, meaning they are built using the same principles as the rest of the components in shadcn-svelte.

v0 only supports React at the moment, so you can't customize them like you can the original from shadcn/ui. However, if having support for Svelte interests you, I'm sure the v0 team would love to hear about it. :)

We've added a new component to the project, Breadcrumb.

We've added a new component to the project, Scroll Area, which is built on top of the Scroll Area component from Bits UI.

It supports both vertical and horizontal scrolling, and is designed to provide a consistent experience across all browsers and platforms.

We've added a new component to the project, Resizable, which is built on top of PaneForge. PaneForge is still in an early stage, so be sure to raise any issues you find with the library on the PaneForge GitHub.

After some feedback about dev server performance, we've updated the way we import icons. With this change, we've decided to move away from the unmaintained radix-icons-svelte package to svelte-radix for the new-york style.

Instead of importing icons like so:

We now import them directly:

With deep imports, we're preventing Vite from optimizing the entire icon collections, and instead only optimizing the icons that are actually used in your project. From what we've seen, this has a massive impact on dev server performance. Enjoy! 🚀

Formsnap has been completely rewritten to be more flexible, easier to use, and less opinionated. This means we've had to make some changes to the way we use it in shadcn-svelte, but once you get the hang of it, you'll find it's much more powerful and less restrictive than the previous iteration.

Since the changes are so significant, there isn't a direct migration path from the old version to the new version. You'll need to update your components to use the new API, as well as ensure you're using the latest version of formsnap and sveltekit-superforms.

All of the Form components have been updated to use the new API, and you can see live examples of them on the Forms Examples page.

Visit the Formsnap documentation (which has also been updated) to learn more about the new API and how its used.

We've added four new components to the project, Carousel, Drawer, Sonner, & Pagination.

We've added a new component to the project, Carousel.

The Drawer is built on top of vaul-svelte and is a port of vaul, originally created by Emil Kowalski for React.

The Sonner component is provided by svelte-sonner, which is a Svelte port of Sonner, originally created by Emil Kowalski for React.

Pagination leverages the Pagination component from Bits UI.

We've added three new components to the project, Calendar, Range Calendar, & Date Picker.

We've added a new component to the library, Toggle Group.

We've added two new components to the library, Command & Combobox. We've also made some updates to the <Form.Label /> component that you'll want to be aware of.

Command is a component that allows you to create a command palette. It's built on top of cmdk-sv, which is a Svelte port of cmdk. The library is still in its infancy, but we're excited to see where it goes. If you notice any issues, please open an issue with the library.

Be sure to check out the Command docs for more information.

Combobox is a combination of the <Command /> & <Popover /> components. It allows you to create a searchable dropdown menu.

Be sure to check out the Combobox docs for more information.

Since we had to make some internal changes to formsnap to fix outstanding issues, there is a slight modification we have to make to the <Form.Label /> component. The ids returned from getFormField() is now a store, so we need to prefix it with $ when we use it.

Formsnap introduced a new component <Form.Control /> which wraps non-traditional form elements. This allows us to ensure the components are accessible, and work well with the rest of the form components. You'll need to define & export that control in your form/index.ts file.

**Examples:**

Example 1 (sql):

```sql
import { Check } from "@lucide/svelte";
```

Example 2 (sql):

```sql
import { Check } from "@lucide/svelte";
```

Example 3 (python):

```python
import Check from "@lucide/svelte/icons/check";
```

Example 4 (python):

```python
import Check from "@lucide/svelte/icons/check";
```

---

## components.json

**URL:** https://www.shadcn-svelte.com/docs/components-json

**Contents:**

- components.json
- $schema
- tailwind
  - tailwind.css
  - tailwind.baseColor
- aliases
  - aliases.lib
  - aliases.utils
  - aliases.components
  - aliases.ui

Configuration for your project.

The components.json file holds configuration for your project.

We use it to understand how your project is set up and how to generate components customized for your project.

Note: The components.json file is optional and only required if you're using the CLI to add components to your project. If you're using the copy and paste method, you don't need this file.

You can create a components.json file in your project by running the following command:

See the CLI section for more information.

You can see the JSON Schema for components.json here.

Configuration to help the CLI understand how Tailwind CSS is set up in your project.

See the installation section for how to set up Tailwind CSS.

Path to the CSS file that imports Tailwind CSS into your project.

This is used to generate the default color palette for your components. This cannot be changed after initialization.

The CLI uses these values and the alias config from your svelte.config.js file to place generated components in the correct location.

Path aliases have to be set up in your svelte.config.js file.

Import alias for your library, which is typically where you store your components, utils, hooks, etc.

Import alias for your utility functions.

Import alias for your components.

Import alias for your UI components.

Import alias for your hooks, which in Svelte 5 are reactive functions/classes whose files typically end in .svelte.ts or .svelte.js.

Typescript can be enabled or disabled.

You can also specify a path to your own custom Typescript config file if it has a different name from tsconfig.json or jsconfig.json, or if it is located in a different directory:

The registry URL tells the CLI where to fetch the shadcn-svelte components/registry from. You can pin this to a specific preview release or your own fork of the registry.

**Examples:**

Example 1 (python):

```python
pnpm dlx shadcn-svelte@latest init
```

Example 2 (python):

```python
pnpm dlx shadcn-svelte@latest init
```

Example 3 (python):

```python
npx shadcn-svelte@latest init
```

Example 4 (python):

```python
npx shadcn-svelte@latest init
```

---

## Theming

**URL:** https://www.shadcn-svelte.com/docs/theming

**Contents:**

- Theming
- Convention
- List of variables
- Adding new colors
- Other color formats
- Base Colors
  - Neutral
  - Stone
  - Zinc
  - Gray

Use CSS Variables to customize the look and feel of your application.

We use CSS variables for styling. This allows you to easily change the colors of components without having to update class names.

We use a simple background and foreground convention for colors. The background variable is used for the background color of the component and the foreground variable is used for the text color.

The background suffix is omitted when the variable is used for the background color of the component.

Given the following CSS variables:

The background color of the following component will be var(--primary) and the foreground color will be var(--primary-foreground).

Here's the list of variables available for customization:

To add new colors, you need to add them to your CSS file.

You can now use the warning utility class in your components.

See the Tailwind CSS documentation for more information on using colors in Tailwind CSS.

For reference, here's a list of the base colors that are available.

**Examples:**

Example 1 (unknown):

```unknown
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

Example 2 (unknown):

```unknown
--primary: oklch(0.205 0 0);
--primary-foreground: oklch(0.985 0 0);
```

Example 3 (jsx):

```jsx
<div class="bg-primary text-primary-foreground">Hello</div>
```

Example 4 (jsx):

```jsx
<div class="bg-primary text-primary-foreground">Hello</div>
```

---

## shadcn-svelte

**URL:** https://www.shadcn-svelte.com/docs/cli

**Contents:**

- shadcn-svelte
- init
- add
- registry build
- Outgoing Requests
  - Proxy

Use the shadcn-svelte CLI to add components to your project.

Use the init command to initialize dependencies for a new project.

The init command installs dependencies, adds the cn util, and creates CSS variables for the project.

You will be asked a few questions to configure components.json:

Use the add command to add components and dependencies to your project.

Use the registry build command to generate the registry JSON files.

This command reads the registry.json file and generates the registry JSON files into the static/r directory.

This enables the use of a proxy when sending out requests to fetch from the shadcn-svelte registry. If the HTTP_PROXY or http_proxy environment variables have been set, the request library underneath will respect the proxy settings.

**Examples:**

Example 1 (python):

```python
pnpm dlx shadcn-svelte@latest init
```

Example 2 (python):

```python
pnpm dlx shadcn-svelte@latest init
```

Example 3 (python):

```python
npx shadcn-svelte@latest init
```

Example 4 (python):

```python
npx shadcn-svelte@latest init
```

---

## JavaScript

**URL:** https://www.shadcn-svelte.com/docs/javascript

**Contents:**

- JavaScript

How to use shadcn-svelte with JavaScript.

This project and the components are written in TypeScript. We recommend using TypeScript for your project as well.

However, we provide a JavaScript version of the components as well. The JavaScript version is only available via the CLI.

To opt-out of TypeScript, you can use the typescript flag in your components.json file.

To configure import aliases, create a jsconfig.json file:

**Examples:**

Example 1 (json):

```json
{
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components",
    "hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
  },
  "registry": "https://shadcn-svelte.com/registry"
}
```

Example 2 (json):

```json
{
  "style": "default",
  "tailwind": {
    "css": "src/routes/layout.css"
  },
  "typescript": false,
  "aliases": {
    "utils": "$lib/utils",
    "components": "$lib/components",
    "hooks": "$lib/hooks",
    "ui": "$lib/components/ui"
  },
  "registry": "https://shadcn-svelte.com/registry"
}
```

Example 3 (json):

```json
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

Example 4 (json):

```json
{
  "compilerOptions": {
    "paths": {
      "$lib/*": ["./src/lib/*"]
    }
  }
}
```

---

## Figma

**URL:** https://www.shadcn-svelte.com/docs/figma

**Contents:**

- Figma
- Grab a copy

Every component recreated in Figma. With customizable props, typography and icons.

The Figma UI Kit is open sourced by Pietro Schirano.

https://www.figma.com/community/file/1203061493325953101

---

## Legacy Docs

**URL:** https://www.shadcn-svelte.com/docs/legacy

**Contents:**

- Legacy Docs

View the legacy docs for shadcn-svelte and Tailwind v3.

You're looking at the docs for Svelte 5 + Tailwind v4.

If you're looking for older docs, you can find them below.

---

## Accordion

**URL:** https://www.shadcn-svelte.com/docs/components/accordion

**Contents:**

- Accordion
- Installation
- Usage

A vertically stacked set of interactive headings that each reveal a section of content.

Our flagship product combines cutting-edge technology with sleek design. Built with premium materials, it offers unparalleled performance and reliability.

Key features include advanced processing capabilities, and an intuitive user interface designed for both beginners and experts.

We offer worldwide shipping through trusted courier partners. Standard delivery takes 3-5 business days, while express shipping ensures delivery within 1-2 business days.

All orders are carefully packaged and fully insured. Track your shipment in real-time through our dedicated tracking portal.

We stand behind our products with a comprehensive 30-day return policy. If you're not completely satisfied, simply return the item in its original condition.

Our hassle-free return process includes free return shipping and full refunds processed within 48 hours of receiving the returned item.

Copy and paste the following code into your project.

**Examples:**

Example 1 (tsx):

```tsx
<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Product Information</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        Our flagship product combines cutting-edge technology with sleek design.
        Built with premium materials, it offers unparalleled performance and
        reliability.
      </p>
      <p>
        Key features include advanced processing capabilities, and an intuitive
        user interface designed for both beginners and experts.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Shipping Details</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We offer worldwide shipping through trusted courier partners. Standard
        delivery takes 3-5 business days, while express shipping ensures
        delivery within 1-2 business days.
      </p>
      <p>
        All orders are carefully packaged and fully insured. Track your shipment
        in real-time through our dedicated tracking portal.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Return Policy</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We stand behind our products with a comprehensive 30-day return policy.
        If you&apos;re not completely satisfied, simply return the item in its
        original condition.
      </p>
      <p>
        Our hassle-free return process includes free return shipping and full
        refunds processed within 48 hours of receiving the returned item.
      </p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

Example 2 (tsx):

```tsx
<script lang="ts">
  import * as Accordion from "$lib/components/ui/accordion/index.js";
</script>

<Accordion.Root type="single" class="w-full sm:max-w-[70%]" value="item-1">
  <Accordion.Item value="item-1">
    <Accordion.Trigger>Product Information</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        Our flagship product combines cutting-edge technology with sleek design.
        Built with premium materials, it offers unparalleled performance and
        reliability.
      </p>
      <p>
        Key features include advanced processing capabilities, and an intuitive
        user interface designed for both beginners and experts.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-2">
    <Accordion.Trigger>Shipping Details</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We offer worldwide shipping through trusted courier partners. Standard
        delivery takes 3-5 business days, while express shipping ensures
        delivery within 1-2 business days.
      </p>
      <p>
        All orders are carefully packaged and fully insured. Track your shipment
        in real-time through our dedicated tracking portal.
      </p>
    </Accordion.Content>
  </Accordion.Item>
  <Accordion.Item value="item-3">
    <Accordion.Trigger>Return Policy</Accordion.Trigger>
    <Accordion.Content class="flex flex-col gap-4 text-balance">
      <p>
        We stand behind our products with a comprehensive 30-day return policy.
        If you&apos;re not completely satisfied, simply return the item in its
        original condition.
      </p>
      <p>
        Our hassle-free return process includes free return shipping and full
        refunds processed within 48 hours of receiving the returned item.
      </p>
    </Accordion.Content>
  </Accordion.Item>
</Accordion.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add accordion
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add accordion
```

---

## Alert Dialog

**URL:** https://www.shadcn-svelte.com/docs/components/alert-dialog

**Contents:**

- Alert Dialog
- Installation
- Usage

A modal dialog that interrupts the user with important content and expects a response.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
    Show Dialog
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<AlertDialog.Root>
  <AlertDialog.Trigger class={buttonVariants({ variant: "outline" })}>
    Show Dialog
  </AlertDialog.Trigger>
  <AlertDialog.Content>
    <AlertDialog.Header>
      <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
      <AlertDialog.Description>
        This action cannot be undone. This will permanently delete your account
        and remove your data from our servers.
      </AlertDialog.Description>
    </AlertDialog.Header>
    <AlertDialog.Footer>
      <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
      <AlertDialog.Action>Continue</AlertDialog.Action>
    </AlertDialog.Footer>
  </AlertDialog.Content>
</AlertDialog.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add alert-dialog
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add alert-dialog
```

---

## Alert

**URL:** https://www.shadcn-svelte.com/docs/components/alert

**Contents:**

- Alert
- Installation
- Usage

Displays a callout for user attention.

Please verify your billing information and try again.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Alert from "$lib/components/ui/alert/index.js";
  import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
  import PopcornIcon from "@lucide/svelte/icons/popcorn";
</script>

<div class="grid w-full max-w-xl items-start gap-4">
  <Alert.Root>
    <CheckCircle2Icon />
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description
      >This is an alert with icon, title and description.</Alert.Description
    >
  </Alert.Root>
  <Alert.Root>
    <PopcornIcon />
    <Alert.Title
      >This Alert has a title and an icon. No description.</Alert.Title
    >
  </Alert.Root>
  <Alert.Root variant="destructive">
    <AlertCircleIcon />
    <Alert.Title>Unable to process your payment.</Alert.Title>
    <Alert.Description>
      <p>Please verify your billing information and try again.</p>
      <ul class="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </Alert.Description>
  </Alert.Root>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Alert from "$lib/components/ui/alert/index.js";
  import CheckCircle2Icon from "@lucide/svelte/icons/check-circle-2";
  import AlertCircleIcon from "@lucide/svelte/icons/alert-circle";
  import PopcornIcon from "@lucide/svelte/icons/popcorn";
</script>

<div class="grid w-full max-w-xl items-start gap-4">
  <Alert.Root>
    <CheckCircle2Icon />
    <Alert.Title>Success! Your changes have been saved</Alert.Title>
    <Alert.Description
      >This is an alert with icon, title and description.</Alert.Description
    >
  </Alert.Root>
  <Alert.Root>
    <PopcornIcon />
    <Alert.Title
      >This Alert has a title and an icon. No description.</Alert.Title
    >
  </Alert.Root>
  <Alert.Root variant="destructive">
    <AlertCircleIcon />
    <Alert.Title>Unable to process your payment.</Alert.Title>
    <Alert.Description>
      <p>Please verify your billing information and try again.</p>
      <ul class="list-inside list-disc text-sm">
        <li>Check your card details</li>
        <li>Ensure sufficient funds</li>
        <li>Verify billing address</li>
      </ul>
    </Alert.Description>
  </Alert.Root>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add alert
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add alert
```

---

## Aspect Ratio

**URL:** https://www.shadcn-svelte.com/docs/components/aspect-ratio

**Contents:**

- Aspect Ratio
- Installation
- Usage

Displays content within a desired ratio.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
</script>

<AspectRatio ratio={16 / 9} class="bg-muted rounded-lg">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Gray by Drew Beamer"
    class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
  />
</AspectRatio>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { AspectRatio } from "$lib/components/ui/aspect-ratio/index.js";
</script>

<AspectRatio ratio={16 / 9} class="bg-muted rounded-lg">
  <img
    src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
    alt="Gray by Drew Beamer"
    class="h-full w-full rounded-lg object-cover dark:brightness-[0.2] dark:grayscale"
  />
</AspectRatio>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add aspect-ratio
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add aspect-ratio
```

---

## Avatar

**URL:** https://www.shadcn-svelte.com/docs/components/avatar

**Contents:**

- Avatar
- Installation
- Usage

An image element with a fallback for representing the user.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<div class="flex flex-row flex-wrap items-center gap-12">
  <Avatar.Root>
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
  <Avatar.Root class="rounded-lg">
    <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
    <Avatar.Fallback>ER</Avatar.Fallback>
  </Avatar.Root>
  <div
    class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
  >
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
      <Avatar.Fallback>LR</Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar.Root>
  </div>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Avatar from "$lib/components/ui/avatar/index.js";
</script>

<div class="flex flex-row flex-wrap items-center gap-12">
  <Avatar.Root>
    <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
    <Avatar.Fallback>CN</Avatar.Fallback>
  </Avatar.Root>
  <Avatar.Root class="rounded-lg">
    <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
    <Avatar.Fallback>ER</Avatar.Fallback>
  </Avatar.Root>
  <div
    class="*:data-[slot=avatar]:ring-background flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:grayscale"
  >
    <Avatar.Root>
      <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" />
      <Avatar.Fallback>CN</Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/leerob.png" alt="@leerob" />
      <Avatar.Fallback>LR</Avatar.Fallback>
    </Avatar.Root>
    <Avatar.Root>
      <Avatar.Image src="https://github.com/evilrabbit.png" alt="@evilrabbit" />
      <Avatar.Fallback>ER</Avatar.Fallback>
    </Avatar.Root>
  </div>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add avatar
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add avatar
```

---

## Badge

**URL:** https://www.shadcn-svelte.com/docs/components/badge

**Contents:**

- Badge
- Installation
- Usage
  - Link

Displays a badge or a component that looks like a badge.

Copy and paste the following code into your project.

You can use the badgeVariants helper to create a link that looks like a badge.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
</script>

<div class="flex flex-col items-center gap-2">
  <div class="flex w-full flex-wrap gap-2">
    <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
  <div class="flex w-full flex-wrap gap-2">
    <Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
      <BadgeCheckIcon />
      Verified
    </Badge>
    <Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge
    >
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="destructive"
    >
      99
    </Badge>
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="outline"
    >
      20+
    </Badge>
  </div>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Badge } from "$lib/components/ui/badge/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
</script>

<div class="flex flex-col items-center gap-2">
  <div class="flex w-full flex-wrap gap-2">
    <Badge>Badge</Badge>
    <Badge variant="secondary">Secondary</Badge>
    <Badge variant="destructive">Destructive</Badge>
    <Badge variant="outline">Outline</Badge>
  </div>
  <div class="flex w-full flex-wrap gap-2">
    <Badge variant="secondary" class="bg-blue-500 text-white dark:bg-blue-600">
      <BadgeCheckIcon />
      Verified
    </Badge>
    <Badge class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums">8</Badge
    >
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="destructive"
    >
      99
    </Badge>
    <Badge
      class="h-5 min-w-5 rounded-full px-1 font-mono tabular-nums"
      variant="outline"
    >
      20+
    </Badge>
  </div>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add badge
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add badge
```

---

## Breadcrumb

**URL:** https://www.shadcn-svelte.com/docs/components/breadcrumb

**Contents:**

- Breadcrumb
- Installation
- Usage
- Examples
  - Custom separator
  - Dropdown
  - Collapsed
  - Link component
  - Responsive

Displays the path to the current resource using a hierarchy of links.

Copy and paste the following code into your project.

Use a custom component in the <slot> of <Breadcrumb.Separator /> to create a custom separator.

You can compose <Breadcrumb.Item /> with a <DropdownMenu /> to create a dropdown in the breadcrumb.

We provide a <Breadcrumb.Ellipsis /> component to show a collapsed state when the breadcrumb is too long.

To use a custom link component from your routing library, you can use the asChild prop on <Breadcrumb.Link />.

Here's an example of a responsive breadcrumb that composes <Breadcrumb.Item /> with <Breadcrumb.Ellipsis />, <DropdownMenu />, and <Drawer />.

It displays a dropdown on desktop and a drawer on mobile.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          <Breadcrumb.Ellipsis class="size-4" />
          <span class="sr-only">Toggle menu</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item>Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>Themes</DropdownMenu.Item>
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Breadcrumb from "$lib/components/ui/breadcrumb/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
</script>

<Breadcrumb.Root>
  <Breadcrumb.List>
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/">Home</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger class="flex items-center gap-1">
          <Breadcrumb.Ellipsis class="size-4" />
          <span class="sr-only">Toggle menu</span>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content align="start">
          <DropdownMenu.Item>Documentation</DropdownMenu.Item>
          <DropdownMenu.Item>Themes</DropdownMenu.Item>
          <DropdownMenu.Item>GitHub</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Link href="/docs/components">Components</Breadcrumb.Link>
    </Breadcrumb.Item>
    <Breadcrumb.Separator />
    <Breadcrumb.Item>
      <Breadcrumb.Page>Breadcrumb</Breadcrumb.Page>
    </Breadcrumb.Item>
  </Breadcrumb.List>
</Breadcrumb.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add breadcrumb
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add breadcrumb
```

---

## Button Group

**URL:** https://www.shadcn-svelte.com/docs/components/button-group

**Contents:**

- Button Group
- Installation
- Usage
- Accessibility
- ButtonGroup vs ToggleGroup
- Examples
  - Orientation
  - Size
  - Nested
  - Separator

A container that groups related buttons together with consistent styling.

Copy and paste the following code into your project.

Set the orientation prop to change the button group layout.

Control the size of buttons using the size prop on individual buttons.

Nest ButtonGroup components to create button groups with spacing.

The ButtonGroupSeparator component visually divides buttons within a group.

Buttons with variant outline do not need a separator since they have a border. For other variants, a separator is recommended to improve the visual hierarchy.

Create a split button group by adding two buttons separated by a ButtonGroupSeparator.

Wrap an Input component with buttons.

Wrap an InputGroup component to create complex input layouts.

Create a split button group with a DropdownMenu component.

Pair with a Select component.

Use with a Popover component.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import Archive from "@lucide/svelte/icons/archive";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import CalendarPlus from "@lucide/svelte/icons/calendar-plus";
  import Clock from "@lucide/svelte/icons/clock";
  import ListFilter from "@lucide/svelte/icons/list-filter";
  import MailCheck from "@lucide/svelte/icons/mail-check";
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
  import Tag from "@lucide/svelte/icons/tag";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let label = $state("personal");
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root class="hidden sm:flex">
    <Button variant="outline" size="icon-sm" aria-label="Go Back">
      <ArrowLeft />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Archive</Button>
    <Button size="sm" variant="outline">Report</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Snooze</Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="icon-sm"
            aria-label="More Options"
          >
            <MoreHorizontal />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" class="w-52">
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <MailCheck />
            Mark as Read
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Archive />
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Clock />
            Snooze
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CalendarPlus />
            Add to Calendar
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListFilter />
            Add to List
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Tag />
              Label As...
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.RadioGroup bind:value={label}>
                <DropdownMenu.RadioItem value="personal">
                  Personal
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="work"
                  >Work</DropdownMenu.RadioItem
                >
                <DropdownMenu.RadioItem value="other"
                  >Other</DropdownMenu.RadioItem
                >
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item class="text-destructive focus:text-destructive">
            <Trash2 />
            Trash
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import Archive from "@lucide/svelte/icons/archive";
  import ArrowLeft from "@lucide/svelte/icons/arrow-left";
  import CalendarPlus from "@lucide/svelte/icons/calendar-plus";
  import Clock from "@lucide/svelte/icons/clock";
  import ListFilter from "@lucide/svelte/icons/list-filter";
  import MailCheck from "@lucide/svelte/icons/mail-check";
  import MoreHorizontal from "@lucide/svelte/icons/more-horizontal";
  import Tag from "@lucide/svelte/icons/tag";
  import Trash2 from "@lucide/svelte/icons/trash-2";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as ButtonGroup from "$lib/components/ui/button-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";

  let label = $state("personal");
</script>

<ButtonGroup.Root>
  <ButtonGroup.Root class="hidden sm:flex">
    <Button variant="outline" size="icon-sm" aria-label="Go Back">
      <ArrowLeft />
    </Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Archive</Button>
    <Button size="sm" variant="outline">Report</Button>
  </ButtonGroup.Root>
  <ButtonGroup.Root>
    <Button size="sm" variant="outline">Snooze</Button>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button
            {...props}
            variant="outline"
            size="icon-sm"
            aria-label="More Options"
          >
            <MoreHorizontal />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end" class="w-52">
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <MailCheck />
            Mark as Read
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <Archive />
            Archive
          </DropdownMenu.Item>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item>
            <Clock />
            Snooze
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <CalendarPlus />
            Add to Calendar
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <ListFilter />
            Add to List
          </DropdownMenu.Item>
          <DropdownMenu.Sub>
            <DropdownMenu.SubTrigger>
              <Tag />
              Label As...
            </DropdownMenu.SubTrigger>
            <DropdownMenu.SubContent>
              <DropdownMenu.RadioGroup bind:value={label}>
                <DropdownMenu.RadioItem value="personal">
                  Personal
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="work"
                  >Work</DropdownMenu.RadioItem
                >
                <DropdownMenu.RadioItem value="other"
                  >Other</DropdownMenu.RadioItem
                >
              </DropdownMenu.RadioGroup>
            </DropdownMenu.SubContent>
          </DropdownMenu.Sub>
        </DropdownMenu.Group>
        <DropdownMenu.Separator />
        <DropdownMenu.Group>
          <DropdownMenu.Item class="text-destructive focus:text-destructive">
            <Trash2 />
            Trash
          </DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </ButtonGroup.Root>
</ButtonGroup.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add button-group
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add button-group
```

---

## Button

**URL:** https://www.shadcn-svelte.com/docs/components/button

**Contents:**

- Button
- Installation
- Usage
- Examples
  - Size
  - Default
  - Outline
  - Secondary
  - Ghost
  - Destructive

Displays a button or a component that looks like a button.

Updated: We have updated the button component to add new sizes: icon-sm and icon-lg. See the changelog for more details. Follow the instructions to update your project.

Copy and paste the following code into your project.

The spacing between the icon and the text is automatically adjusted based on the size of the button. You do not need any margin on the icon.

Use the rounded-full class to make the button rounded.

To create a button group, use the ButtonGroup component. See the Button Group documentation for more details.

You can convert the <button> into an <a> element by simply passing an href as a prop.

Alternatively, you can use the buttonVariants helper to create a link that looks like a button.

We have added two new sizes to the button component: icon-sm and icon-lg. These sizes are used to create icon buttons. To add them, edit button.tsx and add the following code under size in buttonVariants:

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex flex-wrap items-center gap-2 md:flex-row">
  <Button variant="outline">Button</Button>
  <Button variant="outline" size="icon" aria-label="Submit">
    <ArrowUpIcon />
  </Button>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<div class="flex flex-wrap items-center gap-2 md:flex-row">
  <Button variant="outline">Button</Button>
  <Button variant="outline" size="icon" aria-label="Submit">
    <ArrowUpIcon />
  </Button>
</div>
```

Example 3 (jsx):

```jsx
<Button variant="outline">Button</Button>
<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUpIcon />
</Button>
```

Example 4 (jsx):

```jsx
<Button variant="outline">Button</Button>
<Button variant="outline" size="icon" aria-label="Submit">
  <ArrowUpIcon />
</Button>
```

---

## Calendar

**URL:** https://www.shadcn-svelte.com/docs/components/calendar

**Contents:**

- Calendar
- Blocks
- Installation
- About
- Date Picker
- Examples
  - Range Calendar
  - Month and Year Selector
  - Date of Birth Picker
  - Date and Time Picker

A calendar component that allows users to select dates.

We have built a collection of 30+ calendar blocks that you can use to build your own calendar components.

See call calendar blocks in the Blocks Library page.

Install bits-ui and @internationalized/date:

Copy and paste the following code into your project.

The <Calendar /> component is built on top of the Bits UI Calendar component, which uses the @internationalized/date package to handle dates.

If you're looking for a range calendar, check out the Range Calendar component.

You can use the <Calendar /> component to build a date picker. See the Date Picker page for more information.

This component uses the chrono-node library to parse natural language dates.

You can upgrade to the latest version of the <Calendar /> component by running the following command:

When you're prompted to overwrite the existing files, select Yes. If you have made any changes to the Calendar component, you will need to merge your changes with the new version.

After upgrading the Calendar component, you can add the new blocks with the following:

This will add the latest version of the calendar blocks.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = today(getLocalTimeZone());
</script>

<Calendar
  type="single"
  bind:value
  class="rounded-md border shadow-sm"
  captionLayout="dropdown"
/>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { Calendar } from "$lib/components/ui/calendar/index.js";

  let value = today(getLocalTimeZone());
</script>

<Calendar
  type="single"
  bind:value
  class="rounded-md border shadow-sm"
  captionLayout="dropdown"
/>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add calendar
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add calendar
```

---

## Card

**URL:** https://www.shadcn-svelte.com/docs/components/card

**Contents:**

- Card
- Installation
- Usage
- Examples

Displays a card with header, content, and footer.

Enter your email below to login to your account

Copy and paste the following code into your project.

Enter your email below to login to your account

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
</script>

<Card.Root class="-my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>Login to your account</Card.Title>
    <Card.Description
      >Enter your email below to login to your account</Card.Description
    >
    <Card.Action>
      <Button variant="link">Sign Up</Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="flex flex-col gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a
              href="##"
              class="ms-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button type="submit" class="w-full">Login</Button>
    <Button variant="outline" class="w-full">Login with Google</Button>
  </Card.Footer>
</Card.Root>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
</script>

<Card.Root class="-my-4 w-full max-w-sm">
  <Card.Header>
    <Card.Title>Login to your account</Card.Title>
    <Card.Description
      >Enter your email below to login to your account</Card.Description
    >
    <Card.Action>
      <Button variant="link">Sign Up</Button>
    </Card.Action>
  </Card.Header>
  <Card.Content>
    <form>
      <div class="flex flex-col gap-6">
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div class="grid gap-2">
          <div class="flex items-center">
            <Label for="password">Password</Label>
            <a
              href="##"
              class="ms-auto inline-block text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          <Input id="password" type="password" required />
        </div>
      </div>
    </form>
  </Card.Content>
  <Card.Footer class="flex-col gap-2">
    <Button type="submit" class="w-full">Login</Button>
    <Button variant="outline" class="w-full">Login with Google</Button>
  </Card.Footer>
</Card.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add card
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add card
```

---

## Carousel

**URL:** https://www.shadcn-svelte.com/docs/components/carousel

**Contents:**

- Carousel
- About
- Installation
- Usage
- Examples
  - Sizes
  - Spacing
  - Orientation
- Options
- API

A carousel with motion and swipe built using Embla.

The carousel component is built using the Embla Carousel library.

Install embla-carousel-svelte:

Copy and paste the following code into your project.

To set the size of the items, you can use the basis utility class on the <Carousel.Item />.

To set the spacing between the items, we use a ps-[VALUE] utility on the <Carousel.Item /> and a negative -ms-[VALUE] on the <Carousel.Content />.

Use the orientation prop to set the orientation of the carousel.

You can pass options to the carousel using the opts prop. See the Embla Carousel docs for more information.

Use reactive state and the setApi callback to get an instance of the carousel API.

You can listen to events using the api instance from bind:api.

You can use the plugins prop to add plugins to the carousel.

See the Embla Carousel docs for more information on using plugins.

**Examples:**

Example 1 (html):

```html
<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<Carousel.Root class="w-full max-w-xs">
  <Carousel.Content>
    {#each Array(5), i}
    <Carousel.Item>
      <div class="p-1">
        <Card.Root>
          <Card.Content class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">{i + 1}</span>
          </Card.Content>
        </Card.Root>
      </div>
    </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
```

Example 2 (html):

```html
<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";
  import * as Carousel from "$lib/components/ui/carousel/index.js";
</script>

<Carousel.Root class="w-full max-w-xs">
  <Carousel.Content>
    {#each Array(5), i}
    <Carousel.Item>
      <div class="p-1">
        <Card.Root>
          <Card.Content class="flex aspect-square items-center justify-center p-6">
            <span class="text-4xl font-semibold">{i + 1}</span>
          </Card.Content>
        </Card.Root>
      </div>
    </Carousel.Item>
    {/each}
  </Carousel.Content>
  <Carousel.Previous />
  <Carousel.Next />
</Carousel.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add carousel
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add carousel
```

---

## Chart

**URL:** https://www.shadcn-svelte.com/docs/components/chart

**Contents:**

- Chart
- Component
- Installation
- Your First Chart
  - Start by defining your data
  - Define your chart config
  - Build your chart
  - Adjusting the Axis Ticks
  - Add a custom formatter to the x axis
  - Add Tooltip

Beautiful charts. Built using LayerChart. Copy and paste into your apps.

Important: LayerChart v2 is still in pre-release and is actively evolving. Only use if you're comfortable with potential breaking changes before stable v2.

Your feedback will be invaluable in shaping the release and features. Current development status can be tracked here.

Showing total visitors for the last 3 months

Introducing Charts. A collection of chart components that you can copy and paste into your apps.

Charts are designed to look great out of the box. They work well with other components are are fully customizable to fit your project.

Browse the Charts Library

We use LayerChart under the hood.

We designed the Chart component with composition in mind. You build your charts using LayerChart components and only bring in custom components, such as ChartTooltip, when and where you need it

We do not wrap LayerChart. This means you're not locked into an abstraction. When a new LayerChart version is released, you can follow the official upgrade path to upgrade your charts.

The components are yours.

Add the following colors to your CSS file

Copy and paste the following code into your project.

Let's build your first chart. We'll build a bar chart with an axis, grid, tooltip, and legend.

The following data represents the number of desktop and mobile users for each month.

Note: Your data can be in any shape. You are not limited to the shape of the data below. Use the dataKey prop to map your data to the chart.

The chart config holds configuration for the chart. This is where you place human-readable strings, such as labels, icons, and color tokens for theming.

You can now build your chart using LayerChart components. We're using the BarChart component in this example, which is one of LayerChart's "Simplified Charts".

These components handle a lot of the common chart scaffolding for you, while allowing you to customize them to your liking.

We now have a group-stacked bar chart with an x axis and a grid.

Our bar chart is currently displaying the full month name for each tick on the x axis. Let's shorten it to just the first three letters.

The props prop is how you can pass custom props to the various components that make up the chart. Here we're passing a custom formatter to the x axis.

So far we've only used the BarChart component from LayerChart. They look great out of the box thanks to some customizations in the chart component.

To add a tooltip, we'll use the custom Chart.Tooltip component from chart.

We'll replace the tooltip={false} prop with the tooltip snippet where we'll place the Chart.Tooltip component.

The legend prop is used to show a legend for the chart. We are working with LayerChart to add a payload similar to the tooltip so we can more easily create a custom legend.

Done. You've built your first chart! What's next?

The chart config is where you define the labels, icons and colors for a chart.

It is intentionally decoupled from chart data.

This allows you to share config and color tokens between charts. It can also works independently for cases where your data or color tokens live remotely or in a different format.

Charts has built-in support for theming. You can use css variables (recommended) or color values in any color format, such as hex, hsl, or oklch.

You can also define your colors directly in the chart config. Use the color format you prefer.

To use the theme colors in your chart, reference the colors using the format var(--color-KEY).

A chart tooltip contains a label, name, indicator and value. You can use a combination of these to customize your tooltip.

You can turn on/off any of these using the hideLabel, hideIndicator props and customize the indicator style using the indicator prop.

Use labelKey and nameKey to use a custom key for the tooltip label and name.

Chart comes with the <Chart.Tooltip> component. You can use this component to add custom tooltips to your chart.

Use the following props to customize the tooltip.

Colors are automatically referenced from the chart config.

To use a custom key for tooltip label and names, use the labelKey and nameKey props.

This will use Total Visitors for label and Chrome and Safari for the tooltip names.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { BarChart } from "layerchart";

  const data = [
    // ...
  ];
</script>

<Chart.Container>
  <BarChart {data} x="date" y="value">
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Chart from "$lib/components/ui/chart/index.js";
  import { BarChart } from "layerchart";

  const data = [
    // ...
  ];
</script>

<Chart.Container>
  <BarChart {data} x="date" y="value">
    {#snippet tooltip()}
      <Chart.Tooltip />
    {/snippet}
  </BarChart>
</Chart.Container>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add chart
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add chart
```

---

## Checkbox

**URL:** https://www.shadcn-svelte.com/docs/components/checkbox

**Contents:**

- Checkbox
- Installation
- Usage

A control that allows the user to toggle between checked and not checked.

By clicking this checkbox, you agree to the terms and conditions.

You can enable or disable notifications at any time.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center gap-3">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="terms-2" checked />
    <div class="grid gap-2">
      <Label for="terms-2">Accept terms and conditions</Label>
      <p class="text-muted-foreground text-sm">
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="toggle" disabled />
    <Label for="toggle">Enable notifications</Label>
  </div>
  <Label
    class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
  >
    <Checkbox
      id="toggle-2"
      checked
      class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
    />
    <div class="grid gap-1.5 font-normal">
      <p class="text-sm leading-none font-medium">Enable notifications</p>
      <p class="text-muted-foreground text-sm">
        You can enable or disable notifications at any time.
      </p>
    </div>
  </Label>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="flex flex-col gap-6">
  <div class="flex items-center gap-3">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="terms-2" checked />
    <div class="grid gap-2">
      <Label for="terms-2">Accept terms and conditions</Label>
      <p class="text-muted-foreground text-sm">
        By clicking this checkbox, you agree to the terms and conditions.
      </p>
    </div>
  </div>
  <div class="flex items-start gap-3">
    <Checkbox id="toggle" disabled />
    <Label for="toggle">Enable notifications</Label>
  </div>
  <Label
    class="hover:bg-accent/50 flex items-start gap-3 rounded-lg border p-3 has-[[aria-checked=true]]:border-blue-600 has-[[aria-checked=true]]:bg-blue-50 dark:has-[[aria-checked=true]]:border-blue-900 dark:has-[[aria-checked=true]]:bg-blue-950"
  >
    <Checkbox
      id="toggle-2"
      checked
      class="data-[state=checked]:border-blue-600 data-[state=checked]:bg-blue-600 data-[state=checked]:text-white dark:data-[state=checked]:border-blue-700 dark:data-[state=checked]:bg-blue-700"
    />
    <div class="grid gap-1.5 font-normal">
      <p class="text-sm leading-none font-medium">Enable notifications</p>
      <p class="text-muted-foreground text-sm">
        You can enable or disable notifications at any time.
      </p>
    </div>
  </Label>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add checkbox
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add checkbox
```

---

## Collapsible

**URL:** https://www.shadcn-svelte.com/docs/components/collapsible

**Contents:**

- Collapsible
  - @huntabyte starred 3 repositories
- Installation
- Usage

An interactive component which expands/collapses a panel.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<Collapsible.Root class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
    <Collapsible.Trigger
      class={buttonVariants({ variant: "ghost", size: "sm", class: "w-9 p-0" })}
    >
      <ChevronsUpDownIcon />
      <span class="sr-only">Toggle</span>
    </Collapsible.Trigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">
    @huntabyte/bits-ui
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @melt-ui/melt-ui
    </div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @sveltejs/svelte
    </div>
  </Collapsible.Content>
</Collapsible.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import * as Collapsible from "$lib/components/ui/collapsible/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
</script>

<Collapsible.Root class="w-[350px] space-y-2">
  <div class="flex items-center justify-between space-x-4 px-4">
    <h4 class="text-sm font-semibold">@huntabyte starred 3 repositories</h4>
    <Collapsible.Trigger
      class={buttonVariants({ variant: "ghost", size: "sm", class: "w-9 p-0" })}
    >
      <ChevronsUpDownIcon />
      <span class="sr-only">Toggle</span>
    </Collapsible.Trigger>
  </div>
  <div class="rounded-md border px-4 py-3 font-mono text-sm">
    @huntabyte/bits-ui
  </div>
  <Collapsible.Content class="space-y-2">
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @melt-ui/melt-ui
    </div>
    <div class="rounded-md border px-4 py-3 font-mono text-sm">
      @sveltejs/svelte
    </div>
  </Collapsible.Content>
</Collapsible.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add collapsible
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add collapsible
```

---

## Combobox

**URL:** https://www.shadcn-svelte.com/docs/components/combobox

**Contents:**

- Combobox
- Installation
- Usage
- Examples
  - Combobox
  - Popover
  - Dropdown menu
  - Responsive

Autocomplete input and command palette with a list of suggestions.

The Combobox is built using a composition of the <Popover /> and the <Command /> components.

See installation instructions for the Popover and the Command components.

feature Create a new project

You can create a responsive combobox by using the <Popover /> on desktop and the <Drawer /> components on mobile.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit"
    },
    {
      value: "next.js",
      label: "Next.js"
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js"
    },
    {
      value: "remix",
      label: "Remix"
    },
    {
      value: "astro",
      label: "Astro"
    }
  ];

  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-[200px] justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a framework..."}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No framework found.</Command.Empty>
        <Command.Group value="frameworks">
          {#each frameworks as framework (framework.value)}
            <Command.Item
              value={framework.value}
              onSelect={() => {
                value = framework.value;
                closeAndFocusTrigger();
              }}
            >
              <CheckIcon
                class={cn(value !== framework.value && "text-transparent")}
              />
              {framework.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit"
    },
    {
      value: "next.js",
      label: "Next.js"
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js"
    },
    {
      value: "remix",
      label: "Remix"
    },
    {
      value: "astro",
      label: "Astro"
    }
  ];

  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        {...props}
        variant="outline"
        class="w-[200px] justify-between"
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a framework..."}
        <ChevronsUpDownIcon class="opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No framework found.</Command.Empty>
        <Command.Group value="frameworks">
          {#each frameworks as framework (framework.value)}
            <Command.Item
              value={framework.value}
              onSelect={() => {
                value = framework.value;
                closeAndFocusTrigger();
              }}
            >
              <CheckIcon
                class={cn(value !== framework.value && "text-transparent")}
              />
              {framework.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

Example 3 (typescript):

```typescript
<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-[200px] justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a framework..."}
        <ChevronsUpDownIcon class="ms-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No framework found.</Command.Empty>
        <Command.Group>
          {#each frameworks as framework}
            <Command.Item
              value={framework.value}
              onSelect={() => {
                value = framework.value;
                closeAndFocusTrigger();
              }}
            >
              <CheckIcon
                class={cn(
                  "me-2 size-4",
                  value !== framework.value && "text-transparent"
                )}
              />
              {framework.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

Example 4 (typescript):

```typescript
<script lang="ts">
  import CheckIcon from "@lucide/svelte/icons/check";
  import ChevronsUpDownIcon from "@lucide/svelte/icons/chevrons-up-down";
  import { tick } from "svelte";
  import * as Command from "$lib/components/ui/command/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { cn } from "$lib/utils.js";

  const frameworks = [
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ];

  let open = $state(false);
  let value = $state("");
  let triggerRef = $state<HTMLButtonElement>(null!);

  const selectedValue = $derived(
    frameworks.find((f) => f.value === value)?.label
  );

  // We want to refocus the trigger button when the user selects
  // an item from the list so users can continue navigating the
  // rest of the form with the keyboard.
  function closeAndFocusTrigger() {
    open = false;
    tick().then(() => {
      triggerRef.focus();
    });
  }
</script>

<Popover.Root bind:open>
  <Popover.Trigger bind:ref={triggerRef}>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class="w-[200px] justify-between"
        {...props}
        role="combobox"
        aria-expanded={open}
      >
        {selectedValue || "Select a framework..."}
        <ChevronsUpDownIcon class="ms-2 size-4 shrink-0 opacity-50" />
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-[200px] p-0">
    <Command.Root>
      <Command.Input placeholder="Search framework..." />
      <Command.List>
        <Command.Empty>No framework found.</Command.Empty>
        <Command.Group>
          {#each frameworks as framework}
            <Command.Item
              value={framework.value}
              onSelect={() => {
                value = framework.value;
                closeAndFocusTrigger();
              }}
            >
              <CheckIcon
                class={cn(
                  "me-2 size-4",
                  value !== framework.value && "text-transparent"
                )}
              />
              {framework.label}
            </Command.Item>
          {/each}
        </Command.Group>
      </Command.List>
    </Command.Root>
  </Popover.Content>
</Popover.Root>
```

---

## Command

**URL:** https://www.shadcn-svelte.com/docs/components/command

**Contents:**

- Command
- Installation
- Usage
- Examples
  - Dialog
  - Combobox
- Changelog
  - 2024-10-30 Classes for icons

Fast, composable, unstyled command menu for Svelte.

Copy and paste the following code into your project.

To show the command menu in a dialog, use the <Command.Dialog /> component instead of <Command.Root />. It accepts props for both the <Dialog.Root /> and <Command.Root /> components.

You can use the <Command /> component as a combobox. See the Combobox page for more information.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import CalculatorIcon from "@lucide/svelte/icons/calculator";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import CreditCardIcon from "@lucide/svelte/icons/credit-card";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import SmileIcon from "@lucide/svelte/icons/smile";
  import UserIcon from "@lucide/svelte/icons/user";
  import * as Command from "$lib/components/ui/command/index.js";
</script>

<Command.Root class="rounded-lg border shadow-md md:min-w-[450px]">
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>
        <CalendarIcon />
        <span>Calendar</span>
      </Command.Item>
      <Command.Item>
        <SmileIcon />
        <span>Search Emoji</span>
      </Command.Item>
      <Command.Item disabled>
        <CalculatorIcon />
        <span>Calculator</span>
      </Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>
        <UserIcon />
        <span>Profile</span>
        <Command.Shortcut>⌘P</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <CreditCardIcon />
        <span>Billing</span>
        <Command.Shortcut>⌘B</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <SettingsIcon />
        <span>Settings</span>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import CalculatorIcon from "@lucide/svelte/icons/calculator";
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import CreditCardIcon from "@lucide/svelte/icons/credit-card";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import SmileIcon from "@lucide/svelte/icons/smile";
  import UserIcon from "@lucide/svelte/icons/user";
  import * as Command from "$lib/components/ui/command/index.js";
</script>

<Command.Root class="rounded-lg border shadow-md md:min-w-[450px]">
  <Command.Input placeholder="Type a command or search..." />
  <Command.List>
    <Command.Empty>No results found.</Command.Empty>
    <Command.Group heading="Suggestions">
      <Command.Item>
        <CalendarIcon />
        <span>Calendar</span>
      </Command.Item>
      <Command.Item>
        <SmileIcon />
        <span>Search Emoji</span>
      </Command.Item>
      <Command.Item disabled>
        <CalculatorIcon />
        <span>Calculator</span>
      </Command.Item>
    </Command.Group>
    <Command.Separator />
    <Command.Group heading="Settings">
      <Command.Item>
        <UserIcon />
        <span>Profile</span>
        <Command.Shortcut>⌘P</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <CreditCardIcon />
        <span>Billing</span>
        <Command.Shortcut>⌘B</Command.Shortcut>
      </Command.Item>
      <Command.Item>
        <SettingsIcon />
        <span>Settings</span>
        <Command.Shortcut>⌘S</Command.Shortcut>
      </Command.Item>
    </Command.Group>
  </Command.List>
</Command.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add command
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add command
```

---

## Context Menu

**URL:** https://www.shadcn-svelte.com/docs/components/context-menu

**Contents:**

- Context Menu
- Installation
- Usage

Displays a menu to the user — such as a set of actions or functions — triggered by right click.

Copy and paste the following code into your project.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  let showBookmarks = $state(false);
  let showFullURLs = $state(true);

  let value = $state("pedro");
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger
    class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
  >
    Right click here
  </ContextMenu.Trigger>
  <ContextMenu.Content class="w-52">
    <ContextMenu.Item inset>
      Back
      <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset disabled>
      Forward
      <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset>
      Reload
      <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
      <ContextMenu.SubContent class="w-48">
        <ContextMenu.Item>
          Save Page As...
          <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
        <ContextMenu.Item>Name Window...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Developer Tools</ContextMenu.Item>
      </ContextMenu.SubContent>
    </ContextMenu.Sub>
    <ContextMenu.Separator />
    <ContextMenu.CheckboxItem bind:checked={showBookmarks}>
      Show Bookmarks
    </ContextMenu.CheckboxItem>
    <ContextMenu.CheckboxItem bind:checked={showFullURLs}>
      Show Full URLs
    </ContextMenu.CheckboxItem>
    <ContextMenu.Separator />
    <ContextMenu.RadioGroup bind:value>
      <ContextMenu.Group>
        <ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
        <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem
        >
        <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
      </ContextMenu.Group>
    </ContextMenu.RadioGroup>
  </ContextMenu.Content>
</ContextMenu.Root>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import * as ContextMenu from "$lib/components/ui/context-menu/index.js";

  let showBookmarks = $state(false);
  let showFullURLs = $state(true);

  let value = $state("pedro");
</script>

<ContextMenu.Root>
  <ContextMenu.Trigger
    class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm"
  >
    Right click here
  </ContextMenu.Trigger>
  <ContextMenu.Content class="w-52">
    <ContextMenu.Item inset>
      Back
      <ContextMenu.Shortcut>⌘[</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset disabled>
      Forward
      <ContextMenu.Shortcut>⌘]</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Item inset>
      Reload
      <ContextMenu.Shortcut>⌘R</ContextMenu.Shortcut>
    </ContextMenu.Item>
    <ContextMenu.Sub>
      <ContextMenu.SubTrigger inset>More Tools</ContextMenu.SubTrigger>
      <ContextMenu.SubContent class="w-48">
        <ContextMenu.Item>
          Save Page As...
          <ContextMenu.Shortcut>⇧⌘S</ContextMenu.Shortcut>
        </ContextMenu.Item>
        <ContextMenu.Item>Create Shortcut...</ContextMenu.Item>
        <ContextMenu.Item>Name Window...</ContextMenu.Item>
        <ContextMenu.Separator />
        <ContextMenu.Item>Developer Tools</ContextMenu.Item>
      </ContextMenu.SubContent>
    </ContextMenu.Sub>
    <ContextMenu.Separator />
    <ContextMenu.CheckboxItem bind:checked={showBookmarks}>
      Show Bookmarks
    </ContextMenu.CheckboxItem>
    <ContextMenu.CheckboxItem bind:checked={showFullURLs}>
      Show Full URLs
    </ContextMenu.CheckboxItem>
    <ContextMenu.Separator />
    <ContextMenu.RadioGroup bind:value>
      <ContextMenu.Group>
        <ContextMenu.GroupHeading inset>People</ContextMenu.GroupHeading>
        <ContextMenu.RadioItem value="pedro">Pedro Duarte</ContextMenu.RadioItem
        >
        <ContextMenu.RadioItem value="colm">Colm Tuite</ContextMenu.RadioItem>
      </ContextMenu.Group>
    </ContextMenu.RadioGroup>
  </ContextMenu.Content>
</ContextMenu.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add context-menu
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add context-menu
```

---

## Data Table

**URL:** https://www.shadcn-svelte.com/docs/components/data-table

**Contents:**

- Data Table
- Introduction
- Table of Contents
- Installation
- Prerequisites
- Project Structure
- Basic Table
  - Column Definitions
  - <DataTable /> Component
  - Render the table

Powerful table and datagrids built using TanStack Table.

Data tables are difficult to componentize because of the wide variety of features they support, and the uniqueness of every data set.

So instead of trying to create a one-size-fits-all solution, we've created a guide to help you build your own data tables.

We'll start with the basic <Table /> component, and work our way up to a fully-featured data table.

Tip: If you find yourself using the same table in multiple places, you can always extract it into a reusable component.

This guide will show you how to use TanStack Table and the <Table /> component to build your own custom data table. We'll cover the following topics:

We're going to build a table to show recent payments. Here's what our data looks like:

Start by creating a route where your data table will live (we'll call ours payments), along with the following files:

Let's start by building a basic table.

First, we'll define our columns.

Note: Columns are where you define the core of what your table will look like. They define the data that will be displayed, how it will be formatted, sorted and filtered.

Next, we'll create a <DataTable /> component to render our table.

Tip: If you find yourself using <DataTable /> in multiple places, this is the component you could make reusable by extracting it to components/ui/data-table.svelte.

<DataTable columns={columns} data={data} />

Finally, we'll render our table in our page component.

Let's format the amount cell to display the dollar amount. We'll also align the cell to the right.

Update the header and cell definitions for amount as follows:

We're using the createRawSnippet function to create a Svelte Snippet for rendering simple HTML elements that don't require full lifecycle and state capabilities like a component. We then use the renderSnippet helper function to render the snippet.

You can use the same approach to format other cells and headers.

Let's add row actions to our table. We'll use the <DropdownMenu /> and the <Button /> components for this, so you have install them if not done already:

We'll start by defining the actions menu in our data-table-actions.svelte component.

Now that we've defined the <DataTableActions /> component, let's update our actions column definition to use it.

You can access the row data using row.original in the cell function. Use this to handle actions for your row eg. use the id to make a DELETE call to your API.

Next, we'll add pagination to our table.

This will automatically paginate your rows into pages of 10. See the pagination docs for more information on customizing page size and implementing manual pagination.

We can add pagination controls to our table using the <Button /> component and the table.previousPage(), table.nextPage() API methods.

See Reusable Components section for a more advanced pagination component.

Let's make the email column sortable.

We'll start by creating a component to render a sortable email header button.

We can now update the email header cell to add sorting controls.

This will automatically sort the table (asc and desc) when the user toggles on the header cell.

Let's add a search input to filter emails in our table.

Filtering is now enabled for the email column. You can add filters to other columns as well. See the filtering docs for more information on customizing filters.

Adding column visibility is fairly simple using @tanstack/table-core visibility API.

This adds a dropdown menu that you can use to toggle column visibility.

Next, we're going to add row selection to our table.

We'll start by defining the checkbox component in our data-table-checkbox.svelte component.

Now that we have a new component, we can add a select column definition to render a checkbox.

This adds a checkbox to each row and a checkbox in the header to select all rows.

You can show the number of selected rows using the table.getFilteredSelectedRowModel() API.

Check out the Tasks example to learn about creating reusable components for your data tables.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import {
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
  } from "@tanstack/table-core";
  import { createRawSnippet } from "svelte";
  import DataTableCheckbox from "./data-table/data-table-checkbox.svelte";
  import DataTableEmailButton from "./data-table/data-table-email-button.svelte";
  import DataTableActions from "./data-table/data-table-actions.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import {
    FlexRender,
    createSvelteTable,
    renderComponent,
    renderSnippet
  } from "$lib/components/ui/data-table/index.js";

  type Payment = {
    id: string;
    amount: number;
    status: "Pending" | "Processing" | "Success" | "Failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "Success",
      email: "ken99@yahoo.com"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "Success",
      email: "Abe45@gmail.com"
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "Processing",
      email: "Monserrat44@gmail.com"
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "Success",
      email: "Silas22@gmail.com"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "Failed",
      email: "carmella@hotmail.com"
    }
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all"
        }),
      cell: ({ row }) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          "aria-label": "Select row"
        }),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusSnippet = createRawSnippet<[{ status: string }]>(
          (getStatus) => {
            const { status } = getStatus();
            return {
              render: () => `<div class="capitalize">${status}</div>`
            };
          }
        );
        return renderSnippet(statusSnippet, {
          status: row.original.status
        });
      }
    },
    {
      accessorKey: "email",
      header: ({ column }) =>
        renderComponent(DataTableEmailButton, {
          onclick: column.getToggleSortingHandler()
        }),
      cell: ({ row }) => {
        const emailSnippet = createRawSnippet<[{ email: string }]>(
          (getEmail) => {
            const { email } = getEmail();
            return {
              render: () => `<div class="lowercase">${email}</div>`
            };
          }
        );

        return renderSnippet(emailSnippet, {
          email: row.original.email
        });
      }
    },
    {
      accessorKey: "amount",
      header: () => {
        const amountHeaderSnippet = createRawSnippet(() => {
          return {
            render: () => `<div class="text-end">Amount</div>`
          };
        });
        return renderSnippet(amountHeaderSnippet);
      },
      cell: ({ row }) => {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });

        const amountCellSnippet = createRawSnippet<[{ amount: number }]>(
          (getAmount) => {
            const { amount } = getAmount();
            const formatted = formatter.format(amount);
            return {
              render: () =>
                `<div class="text-end font-medium">${formatted}</div>`
            };
          }
        );
        return renderSnippet(amountCellSnippet, {
          amount: row.original.amount
        });
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(DataTableActions, { id: row.original.id })
    }
  ];

  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let rowSelection = $state<RowSelectionState>({});
  let columnVisibility = $state<VisibilityState>({});

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    state: {
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get rowSelection() {
        return rowSelection;
      },
      get columnFilters() {
        return columnFilters;
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    }
  });
</script>

<div class="-mb-8 w-full">
  <div class="flex items-center py-4">
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      oninput={(e) =>
        table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
      onchange={(e) => {
        table.getColumn("email")?.setFilterValue(e.currentTarget.value);
      }}
      class="max-w-sm"
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" class="ms-auto">
            Columns <ChevronDownIcon class="ms-2 size-4" />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#each table
          .getAllColumns()
          .filter((col) => col.getCanHide()) as column (column)}
          <DropdownMenu.CheckboxItem
            class="capitalize"
            bind:checked={
              () => column.getIsVisible(), (v) => column.toggleVisibility(!!v)
            }
          >
            {column.id}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head class="[&:has([role=checkbox])]:ps-3">
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row data-state={row.getIsSelected() && "selected"}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell class="[&:has([role=checkbox])]:ps-3">
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-2 pt-4">
    <div class="text-muted-foreground flex-1 text-sm">
      {table.getFilteredSelectedRowModel().rows.length} of
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div class="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
</div>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import {
    type ColumnDef,
    type ColumnFiltersState,
    type PaginationState,
    type RowSelectionState,
    type SortingState,
    type VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel
  } from "@tanstack/table-core";
  import { createRawSnippet } from "svelte";
  import DataTableCheckbox from "./data-table/data-table-checkbox.svelte";
  import DataTableEmailButton from "./data-table/data-table-email-button.svelte";
  import DataTableActions from "./data-table/data-table-actions.svelte";
  import * as Table from "$lib/components/ui/table/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import {
    FlexRender,
    createSvelteTable,
    renderComponent,
    renderSnippet
  } from "$lib/components/ui/data-table/index.js";

  type Payment = {
    id: string;
    amount: number;
    status: "Pending" | "Processing" | "Success" | "Failed";
    email: string;
  };

  const data: Payment[] = [
    {
      id: "m5gr84i9",
      amount: 316,
      status: "Success",
      email: "ken99@yahoo.com"
    },
    {
      id: "3u1reuv4",
      amount: 242,
      status: "Success",
      email: "Abe45@gmail.com"
    },
    {
      id: "derv1ws0",
      amount: 837,
      status: "Processing",
      email: "Monserrat44@gmail.com"
    },
    {
      id: "5kma53ae",
      amount: 874,
      status: "Success",
      email: "Silas22@gmail.com"
    },
    {
      id: "bhqecj4p",
      amount: 721,
      status: "Failed",
      email: "carmella@hotmail.com"
    }
  ];

  const columns: ColumnDef<Payment>[] = [
    {
      id: "select",
      header: ({ table }) =>
        renderComponent(DataTableCheckbox, {
          checked: table.getIsAllPageRowsSelected(),
          indeterminate:
            table.getIsSomePageRowsSelected() &&
            !table.getIsAllPageRowsSelected(),
          onCheckedChange: (value) => table.toggleAllPageRowsSelected(!!value),
          "aria-label": "Select all"
        }),
      cell: ({ row }) =>
        renderComponent(DataTableCheckbox, {
          checked: row.getIsSelected(),
          onCheckedChange: (value) => row.toggleSelected(!!value),
          "aria-label": "Select row"
        }),
      enableSorting: false,
      enableHiding: false
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const statusSnippet = createRawSnippet<[{ status: string }]>(
          (getStatus) => {
            const { status } = getStatus();
            return {
              render: () => `<div class="capitalize">${status}</div>`
            };
          }
        );
        return renderSnippet(statusSnippet, {
          status: row.original.status
        });
      }
    },
    {
      accessorKey: "email",
      header: ({ column }) =>
        renderComponent(DataTableEmailButton, {
          onclick: column.getToggleSortingHandler()
        }),
      cell: ({ row }) => {
        const emailSnippet = createRawSnippet<[{ email: string }]>(
          (getEmail) => {
            const { email } = getEmail();
            return {
              render: () => `<div class="lowercase">${email}</div>`
            };
          }
        );

        return renderSnippet(emailSnippet, {
          email: row.original.email
        });
      }
    },
    {
      accessorKey: "amount",
      header: () => {
        const amountHeaderSnippet = createRawSnippet(() => {
          return {
            render: () => `<div class="text-end">Amount</div>`
          };
        });
        return renderSnippet(amountHeaderSnippet);
      },
      cell: ({ row }) => {
        const formatter = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD"
        });

        const amountCellSnippet = createRawSnippet<[{ amount: number }]>(
          (getAmount) => {
            const { amount } = getAmount();
            const formatted = formatter.format(amount);
            return {
              render: () =>
                `<div class="text-end font-medium">${formatted}</div>`
            };
          }
        );
        return renderSnippet(amountCellSnippet, {
          amount: row.original.amount
        });
      }
    },
    {
      id: "actions",
      enableHiding: false,
      cell: ({ row }) =>
        renderComponent(DataTableActions, { id: row.original.id })
    }
  ];

  let pagination = $state<PaginationState>({ pageIndex: 0, pageSize: 10 });
  let sorting = $state<SortingState>([]);
  let columnFilters = $state<ColumnFiltersState>([]);
  let rowSelection = $state<RowSelectionState>({});
  let columnVisibility = $state<VisibilityState>({});

  const table = createSvelteTable({
    get data() {
      return data;
    },
    columns,
    state: {
      get pagination() {
        return pagination;
      },
      get sorting() {
        return sorting;
      },
      get columnVisibility() {
        return columnVisibility;
      },
      get rowSelection() {
        return rowSelection;
      },
      get columnFilters() {
        return columnFilters;
      }
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onPaginationChange: (updater) => {
      if (typeof updater === "function") {
        pagination = updater(pagination);
      } else {
        pagination = updater;
      }
    },
    onSortingChange: (updater) => {
      if (typeof updater === "function") {
        sorting = updater(sorting);
      } else {
        sorting = updater;
      }
    },
    onColumnFiltersChange: (updater) => {
      if (typeof updater === "function") {
        columnFilters = updater(columnFilters);
      } else {
        columnFilters = updater;
      }
    },
    onColumnVisibilityChange: (updater) => {
      if (typeof updater === "function") {
        columnVisibility = updater(columnVisibility);
      } else {
        columnVisibility = updater;
      }
    },
    onRowSelectionChange: (updater) => {
      if (typeof updater === "function") {
        rowSelection = updater(rowSelection);
      } else {
        rowSelection = updater;
      }
    }
  });
</script>

<div class="-mb-8 w-full">
  <div class="flex items-center py-4">
    <Input
      placeholder="Filter emails..."
      value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
      oninput={(e) =>
        table.getColumn("email")?.setFilterValue(e.currentTarget.value)}
      onchange={(e) => {
        table.getColumn("email")?.setFilterValue(e.currentTarget.value);
      }}
      class="max-w-sm"
    />
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        {#snippet child({ props })}
          <Button {...props} variant="outline" class="ms-auto">
            Columns <ChevronDownIcon class="ms-2 size-4" />
          </Button>
        {/snippet}
      </DropdownMenu.Trigger>
      <DropdownMenu.Content align="end">
        {#each table
          .getAllColumns()
          .filter((col) => col.getCanHide()) as column (column)}
          <DropdownMenu.CheckboxItem
            class="capitalize"
            bind:checked={
              () => column.getIsVisible(), (v) => column.toggleVisibility(!!v)
            }
          >
            {column.id}
          </DropdownMenu.CheckboxItem>
        {/each}
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
  <div class="rounded-md border">
    <Table.Root>
      <Table.Header>
        {#each table.getHeaderGroups() as headerGroup (headerGroup.id)}
          <Table.Row>
            {#each headerGroup.headers as header (header.id)}
              <Table.Head class="[&:has([role=checkbox])]:ps-3">
                {#if !header.isPlaceholder}
                  <FlexRender
                    content={header.column.columnDef.header}
                    context={header.getContext()}
                  />
                {/if}
              </Table.Head>
            {/each}
          </Table.Row>
        {/each}
      </Table.Header>
      <Table.Body>
        {#each table.getRowModel().rows as row (row.id)}
          <Table.Row data-state={row.getIsSelected() && "selected"}>
            {#each row.getVisibleCells() as cell (cell.id)}
              <Table.Cell class="[&:has([role=checkbox])]:ps-3">
                <FlexRender
                  content={cell.column.columnDef.cell}
                  context={cell.getContext()}
                />
              </Table.Cell>
            {/each}
          </Table.Row>
        {:else}
          <Table.Row>
            <Table.Cell colspan={columns.length} class="h-24 text-center">
              No results.
            </Table.Cell>
          </Table.Row>
        {/each}
      </Table.Body>
    </Table.Root>
  </div>
  <div class="flex items-center justify-end space-x-2 pt-4">
    <div class="text-muted-foreground flex-1 text-sm">
      {table.getFilteredSelectedRowModel().rows.length} of
      {table.getFilteredRowModel().rows.length} row(s) selected.
    </div>
    <div class="space-x-2">
      <Button
        variant="outline"
        size="sm"
        onclick={() => table.previousPage()}
        disabled={!table.getCanPreviousPage()}
      >
        Previous
      </Button>
      <Button
        variant="outline"
        size="sm"
        onclick={() => table.nextPage()}
        disabled={!table.getCanNextPage()}
      >
        Next
      </Button>
    </div>
  </div>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add table data-table
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add table data-table
```

---

## Date Picker

**URL:** https://www.shadcn-svelte.com/docs/components/date-picker

**Contents:**

- Date Picker
- Installation
- Usage
- Examples
  - Date of Birth Picker
  - Picker with Input
  - Date and Time Picker
  - Natural Language Picker

A date picker component with range and presets.

The Date Picker is built using a composition of the <Popover /> and either the <Calendar /> or <RangeCalendar /> components.

See installations instructions for the Popover, Calendar, and Range Calendar components.

This component uses the chrono-node library to parse natural language dates.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import {
    getLocalTimeZone,
    today,
    type CalendarDate
  } from "@internationalized/date";

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Date of birth</Label>
  <Popover.Root bind:open>
    <Popover.Trigger id="{id}-date">
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          class="w-48 justify-between font-normal"
        >
          {value
            ? value.toDate(getLocalTimeZone()).toLocaleDateString()
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto overflow-hidden p-0" align="start">
      <Calendar
        type="single"
        bind:value
        captionLayout="dropdown"
        onValueChange={() => {
          open = false;
        }}
        maxValue={today(getLocalTimeZone())}
      />
    </Popover.Content>
  </Popover.Root>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import Calendar from "$lib/components/ui/calendar/calendar.svelte";
  import * as Popover from "$lib/components/ui/popover/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import ChevronDownIcon from "@lucide/svelte/icons/chevron-down";
  import {
    getLocalTimeZone,
    today,
    type CalendarDate
  } from "@internationalized/date";

  const id = $props.id();

  let open = $state(false);
  let value = $state<CalendarDate | undefined>();
</script>

<div class="flex flex-col gap-3">
  <Label for="{id}-date" class="px-1">Date of birth</Label>
  <Popover.Root bind:open>
    <Popover.Trigger id="{id}-date">
      {#snippet child({ props })}
        <Button
          {...props}
          variant="outline"
          class="w-48 justify-between font-normal"
        >
          {value
            ? value.toDate(getLocalTimeZone()).toLocaleDateString()
            : "Select date"}
          <ChevronDownIcon />
        </Button>
      {/snippet}
    </Popover.Trigger>
    <Popover.Content class="w-auto overflow-hidden p-0" align="start">
      <Calendar
        type="single"
        bind:value
        captionLayout="dropdown"
        onValueChange={() => {
          open = false;
        }}
        maxValue={today(getLocalTimeZone())}
      />
    </Popover.Content>
  </Popover.Root>
</div>
```

Example 3 (sql):

```sql
<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value = $state<DateValue>();
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-start font-normal",
          !value && "text-muted-foreground"
        )}
        {...props}
      >
        <CalendarIcon class="me-2 size-4" />
        {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value type="single" initialFocus captionLayout="dropdown" />
  </Popover.Content>
</Popover.Root>
```

Example 4 (sql):

```sql
<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import {
    type DateValue,
    DateFormatter,
    getLocalTimeZone,
  } from "@internationalized/date";
  import { cn } from "$lib/utils.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Calendar } from "$lib/components/ui/calendar/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";

  const df = new DateFormatter("en-US", {
    dateStyle: "long",
  });

  let value = $state<DateValue>();
</script>

<Popover.Root>
  <Popover.Trigger>
    {#snippet child({ props })}
      <Button
        variant="outline"
        class={cn(
          "w-[280px] justify-start text-start font-normal",
          !value && "text-muted-foreground"
        )}
        {...props}
      >
        <CalendarIcon class="me-2 size-4" />
        {value ? df.format(value.toDate(getLocalTimeZone())) : "Select a date"}
      </Button>
    {/snippet}
  </Popover.Trigger>
  <Popover.Content class="w-auto p-0">
    <Calendar bind:value type="single" initialFocus captionLayout="dropdown" />
  </Popover.Content>
</Popover.Root>
```

---

## Dialog

**URL:** https://www.shadcn-svelte.com/docs/components/dialog

**Contents:**

- Dialog
- Installation
- Usage
- Examples
  - Custom close button

A window overlaid on either the primary window or another dialog window, rendering the content underneath inert.

Copy and paste the following code into your project.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
      >Open Dialog</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you&apos;re done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4">
        <div class="grid gap-3">
          <Label for="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Dialog.Close
        >
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Dialog.Root>
  <form>
    <Dialog.Trigger class={buttonVariants({ variant: "outline" })}
      >Open Dialog</Dialog.Trigger
    >
    <Dialog.Content class="sm:max-w-[425px]">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you&apos;re done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4">
        <div class="grid gap-3">
          <Label for="name-1">Name</Label>
          <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
        </div>
        <div class="grid gap-3">
          <Label for="username-1">Username</Label>
          <Input id="username-1" name="username" defaultValue="@peduarte" />
        </div>
      </div>
      <Dialog.Footer>
        <Dialog.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Dialog.Close
        >
        <Button type="submit">Save changes</Button>
      </Dialog.Footer>
    </Dialog.Content>
  </form>
</Dialog.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add dialog
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add dialog
```

---

## Drawer

**URL:** https://www.shadcn-svelte.com/docs/components/drawer

**Contents:**

- Drawer
- About
- Installation
- Usage
- Examples
  - Responsive Dialog

A drawer component for Svelte.

Drawer is built on top of Vaul Svelte, which is a Svelte port of Vaul by Emil Kowalski.

Copy and paste the following code into your project.

You can combine the Dialog and Drawer components to create a responsive dialog. This renders a Dialog on desktop and a Drawer on mobile.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import MinusIcon from "@lucide/svelte/icons/minus";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { BarChart, type ChartContextValue } from "layerchart";
  import { scaleBand } from "d3-scale";
  import { cubicInOut } from "svelte/easing";

  const data = [
    {
      goal: 400
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 239
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 349
    }
  ];

  let goal = $state(350);

  function handleClick(adjustment: number) {
    goal = Math.max(200, Math.min(400, goal + adjustment));
  }

  let context = $state<ChartContextValue>();
</script>

<Drawer.Root>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}
    >Open Drawer</Drawer.Trigger
  >
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Move Goal</Drawer.Title>
        <Drawer.Description>Set your daily activity goal.</Drawer.Description>
      </Drawer.Header>
      <div class="p-4 pb-0">
        <div class="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(-10)}
            disabled={goal <= 200}
          >
            <MinusIcon />
            <span class="sr-only">Decrease</span>
          </Button>
          <div class="flex-1 text-center">
            <div class="text-7xl font-bold tracking-tighter">
              {goal}
            </div>
            <div class="text-muted-foreground text-[0.70rem] uppercase">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(10)}
            disabled={goal >= 400}
          >
            <PlusIcon />
            <span class="sr-only">Increase</span>
          </Button>
        </div>
        <div class="mt-3 h-[120px]">
          <div class="h-full w-full">
            <BarChart
              bind:context
              data={data.map((d, i) => ({ goal: d.goal, index: i }))}
              y="goal"
              x="index"
              xScale={scaleBand().padding(0.25)}
              axis={false}
              tooltip={false}
              props={{
                bars: {
                  stroke: "none",
                  rounded: "all",
                  radius: 4,
                  // use the height of the chart to animate the bars
                  initialY: context?.height,
                  initialHeight: 0,
                  motion: {
                    x: { type: "tween", duration: 500, easing: cubicInOut },
                    width: { type: "tween", duration: 500, easing: cubicInOut },
                    height: {
                      type: "tween",
                      duration: 500,
                      easing: cubicInOut
                    },
                    y: { type: "tween", duration: 500, easing: cubicInOut }
                  },
                  fill: "var(--color-foreground)",
                  fillOpacity: 0.9
                },
                highlight: { area: { fill: "none" } }
              }}
            />
          </div>
        </div>
      </div>
      <Drawer.Footer>
        <Button>Submit</Button>
        <Drawer.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import MinusIcon from "@lucide/svelte/icons/minus";
  import PlusIcon from "@lucide/svelte/icons/plus";
  import * as Drawer from "$lib/components/ui/drawer/index.js";
  import { Button, buttonVariants } from "$lib/components/ui/button/index.js";
  import { BarChart, type ChartContextValue } from "layerchart";
  import { scaleBand } from "d3-scale";
  import { cubicInOut } from "svelte/easing";

  const data = [
    {
      goal: 400
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 239
    },
    {
      goal: 300
    },
    {
      goal: 200
    },
    {
      goal: 278
    },
    {
      goal: 189
    },
    {
      goal: 349
    }
  ];

  let goal = $state(350);

  function handleClick(adjustment: number) {
    goal = Math.max(200, Math.min(400, goal + adjustment));
  }

  let context = $state<ChartContextValue>();
</script>

<Drawer.Root>
  <Drawer.Trigger class={buttonVariants({ variant: "outline" })}
    >Open Drawer</Drawer.Trigger
  >
  <Drawer.Content>
    <div class="mx-auto w-full max-w-sm">
      <Drawer.Header>
        <Drawer.Title>Move Goal</Drawer.Title>
        <Drawer.Description>Set your daily activity goal.</Drawer.Description>
      </Drawer.Header>
      <div class="p-4 pb-0">
        <div class="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(-10)}
            disabled={goal <= 200}
          >
            <MinusIcon />
            <span class="sr-only">Decrease</span>
          </Button>
          <div class="flex-1 text-center">
            <div class="text-7xl font-bold tracking-tighter">
              {goal}
            </div>
            <div class="text-muted-foreground text-[0.70rem] uppercase">
              Calories/day
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            class="size-8 shrink-0 rounded-full"
            onclick={() => handleClick(10)}
            disabled={goal >= 400}
          >
            <PlusIcon />
            <span class="sr-only">Increase</span>
          </Button>
        </div>
        <div class="mt-3 h-[120px]">
          <div class="h-full w-full">
            <BarChart
              bind:context
              data={data.map((d, i) => ({ goal: d.goal, index: i }))}
              y="goal"
              x="index"
              xScale={scaleBand().padding(0.25)}
              axis={false}
              tooltip={false}
              props={{
                bars: {
                  stroke: "none",
                  rounded: "all",
                  radius: 4,
                  // use the height of the chart to animate the bars
                  initialY: context?.height,
                  initialHeight: 0,
                  motion: {
                    x: { type: "tween", duration: 500, easing: cubicInOut },
                    width: { type: "tween", duration: 500, easing: cubicInOut },
                    height: {
                      type: "tween",
                      duration: 500,
                      easing: cubicInOut
                    },
                    y: { type: "tween", duration: 500, easing: cubicInOut }
                  },
                  fill: "var(--color-foreground)",
                  fillOpacity: 0.9
                },
                highlight: { area: { fill: "none" } }
              }}
            />
          </div>
        </div>
      </div>
      <Drawer.Footer>
        <Button>Submit</Button>
        <Drawer.Close class={buttonVariants({ variant: "outline" })}
          >Cancel</Drawer.Close
        >
      </Drawer.Footer>
    </div>
  </Drawer.Content>
</Drawer.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add drawer
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add drawer
```

---

## Dropdown Menu

**URL:** https://www.shadcn-svelte.com/docs/components/dropdown-menu

**Contents:**

- Dropdown Menu
- Installation
- Usage
- Examples
  - Checkboxes
  - Radio Group
  - Dialog
- Changelog
  - 2024-10-30 Classes for DropdownMenu.SubTrigger

Displays a menu to the user — such as a set of actions or functions — triggered by a button.

Copy and paste the following code into your project.

This example shows how to open a dialog from a dropdown menu.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        Profile
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Billing
        <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Settings
        <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Keyboard shortcuts
        <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Email</DropdownMenu.Item>
          <DropdownMenu.Item>Message</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>
        New Team
        <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Support</DropdownMenu.Item>
    <DropdownMenu.Item disabled>API</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      Log out
      <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger>
    {#snippet child({ props })}
      <Button {...props} variant="outline">Open</Button>
    {/snippet}
  </DropdownMenu.Trigger>
  <DropdownMenu.Content class="w-56" align="start">
    <DropdownMenu.Label>My Account</DropdownMenu.Label>
    <DropdownMenu.Group>
      <DropdownMenu.Item>
        Profile
        <DropdownMenu.Shortcut>⇧⌘P</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Billing
        <DropdownMenu.Shortcut>⌘B</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Settings
        <DropdownMenu.Shortcut>⌘S</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        Keyboard shortcuts
        <DropdownMenu.Shortcut>⌘K</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Group>
      <DropdownMenu.Item>Team</DropdownMenu.Item>
      <DropdownMenu.Sub>
        <DropdownMenu.SubTrigger>Invite users</DropdownMenu.SubTrigger>
        <DropdownMenu.SubContent>
          <DropdownMenu.Item>Email</DropdownMenu.Item>
          <DropdownMenu.Item>Message</DropdownMenu.Item>
          <DropdownMenu.Separator />
          <DropdownMenu.Item>More...</DropdownMenu.Item>
        </DropdownMenu.SubContent>
      </DropdownMenu.Sub>
      <DropdownMenu.Item>
        New Team
        <DropdownMenu.Shortcut>⌘+T</DropdownMenu.Shortcut>
      </DropdownMenu.Item>
    </DropdownMenu.Group>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>GitHub</DropdownMenu.Item>
    <DropdownMenu.Item>Support</DropdownMenu.Item>
    <DropdownMenu.Item disabled>API</DropdownMenu.Item>
    <DropdownMenu.Separator />
    <DropdownMenu.Item>
      Log out
      <DropdownMenu.Shortcut>⇧⌘Q</DropdownMenu.Shortcut>
    </DropdownMenu.Item>
  </DropdownMenu.Content>
</DropdownMenu.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add dropdown-menu
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add dropdown-menu
```

---

## Empty

**URL:** https://www.shadcn-svelte.com/docs/components/empty

**Contents:**

- Empty
- Installation
- Usage
- Examples
  - Outline
  - Background
  - Avatar
  - Avatar Group
  - InputGroup

Use the Empty component to display a empty state.

Copy and paste the following code into your project.

Use the border utility class to create a outline empty state.

Use the bg-_ and bg-gradient-_ utilities to add a background to the empty state.

Use the EmptyMedia component to display an avatar in the empty state.

Use the EmptyMedia component to display an avatar group in the empty state.

You can add an InputGroup component to the EmptyContent component.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import FolderCodeIcon from "@tabler/icons-svelte/icons/folder-code";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
</script>

<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon">
      <FolderCodeIcon />
    </Empty.Media>
    <Empty.Title>No Projects Yet</Empty.Title>
    <Empty.Description>
      You haven't created any projects yet. Get started by creating your first
      project.
    </Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <div class="flex gap-2">
      <Button>Create Project</Button>
      <Button variant="outline">Import Project</Button>
    </div>
  </Empty.Content>
  <Button variant="link" class="text-muted-foreground" size="sm">
    <a href="#/">
      Learn More <ArrowUpRightIcon class="inline" />
    </a>
  </Button>
</Empty.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Empty from "$lib/components/ui/empty/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import FolderCodeIcon from "@tabler/icons-svelte/icons/folder-code";
  import ArrowUpRightIcon from "@lucide/svelte/icons/arrow-up-right";
</script>

<Empty.Root>
  <Empty.Header>
    <Empty.Media variant="icon">
      <FolderCodeIcon />
    </Empty.Media>
    <Empty.Title>No Projects Yet</Empty.Title>
    <Empty.Description>
      You haven't created any projects yet. Get started by creating your first
      project.
    </Empty.Description>
  </Empty.Header>
  <Empty.Content>
    <div class="flex gap-2">
      <Button>Create Project</Button>
      <Button variant="outline">Import Project</Button>
    </div>
  </Empty.Content>
  <Button variant="link" class="text-muted-foreground" size="sm">
    <a href="#/">
      Learn More <ArrowUpRightIcon class="inline" />
    </a>
  </Button>
</Empty.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add empty
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add empty
```

---

## Field

**URL:** https://www.shadcn-svelte.com/docs/components/field

**Contents:**

- Field
- Installation
- Usage
- Anatomy
- Examples
  - Input
  - Textarea
  - Select
  - Slider
  - Fieldset

Combine labels, controls, and help text to compose accessible form fields and grouped inputs.

All transactions are secure and encrypted

Enter your 16-digit number.

The billing address associated with your payment method

Copy and paste the following code into your project.

The Field family is designed for composing accessible forms. A typical field is structured as follows:

Choose a unique username for your account.

Must be at least 8 characters long.

Share your thoughts about our service.

Select your department or area of work.

Set your budget range ($200 - 800).

We need your address to deliver your order.

Select the items you want to show on the desktop.

Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.

Yearly and lifetime plans offer significant savings.

Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent to your email.

Wrap Field components inside FieldLabel to create selectable field groups. This works with RadioItem, Checkbox and Switch components.

Select the compute environment for your cluster.

Run GPU workloads on a K8s configured cluster.

Access a VM configured cluster to run GPU workloads.

Stack Field components with Field.Group. Add Field.Separator to divide them.

Get notified when ChatGPT responds to requests that take time, like research or image generation.

Get notified when tasks you've created have updates. Manage tasks

Fill in your profile information.

Provide your full name for identification

You can write your message here. Keep it short, preferably under 100 characters.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";

  let month = $state<string>();
  let year = $state<string>();
</script>

<div class="w-full max-w-md">
  <form>
    <Field.Group>
      <Field.Set>
        <Field.Legend>Payment Method</Field.Legend>
        <Field.Description
          >All transactions are secure and encrypted</Field.Description
        >
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-card-name-43j"
              >Name on Card</Field.Label
            >
            <Input
              id="checkout-7j9-card-name-43j"
              placeholder="John Doe"
              required
            />
          </Field.Field>
          <div class="grid grid-cols-3 gap-4">
            <Field.Field class="col-span-2">
              <Field.Label for="checkout-7j9-card-number-uw1">
                Card Number
              </Field.Label>
              <Input
                id="checkout-7j9-card-number-uw1"
                placeholder="1234 5678 9012 3456"
                required
              />
              <Field.Description>Enter your 16-digit number.</Field.Description>
            </Field.Field>
            <Field.Field class="col-span-1">
              <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
              <Input id="checkout-7j9-cvv" placeholder="123" required />
            </Field.Field>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-month-ts6">Month</Field.Label>
              <Select.Root type="single" bind:value={month}>
                <Select.Trigger id="checkout-7j9-exp-month-ts6">
                  <span>
                    {month || "MM"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="01">01</Select.Item>
                  <Select.Item value="02">02</Select.Item>
                  <Select.Item value="03">03</Select.Item>
                  <Select.Item value="04">04</Select.Item>
                  <Select.Item value="05">05</Select.Item>
                  <Select.Item value="06">06</Select.Item>
                  <Select.Item value="07">07</Select.Item>
                  <Select.Item value="08">08</Select.Item>
                  <Select.Item value="09">09</Select.Item>
                  <Select.Item value="10">10</Select.Item>
                  <Select.Item value="11">11</Select.Item>
                  <Select.Item value="12">12</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
              <Select.Root type="single" bind:value={year}>
                <Select.Trigger id="checkout-7j9-exp-year-f59">
                  <span>
                    {year || "YYYY"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="2024">2024</Select.Item>
                  <Select.Item value="2025">2025</Select.Item>
                  <Select.Item value="2026">2026</Select.Item>
                  <Select.Item value="2027">2027</Select.Item>
                  <Select.Item value="2028">2028</Select.Item>
                  <Select.Item value="2029">2029</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
          </div>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Legend>Billing Address</Field.Legend>
        <Field.Description>
          The billing address associated with your payment method
        </Field.Description>
        <Field.Group>
          <Field.Field orientation="horizontal">
            <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
            <Field.Label
              for="checkout-7j9-same-as-shipping-wgm"
              class="font-normal"
            >
              Same as shipping address
            </Field.Label>
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-optional-comments"
              >Comments</Field.Label
            >
            <Textarea
              id="checkout-7j9-optional-comments"
              placeholder="Add any additional comments"
              class="resize-none"
            />
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline" type="button">Cancel</Button>
      </Field.Field>
    </Field.Group>
  </form>
</div>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";

  let month = $state<string>();
  let year = $state<string>();
</script>

<div class="w-full max-w-md">
  <form>
    <Field.Group>
      <Field.Set>
        <Field.Legend>Payment Method</Field.Legend>
        <Field.Description
          >All transactions are secure and encrypted</Field.Description
        >
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-card-name-43j"
              >Name on Card</Field.Label
            >
            <Input
              id="checkout-7j9-card-name-43j"
              placeholder="John Doe"
              required
            />
          </Field.Field>
          <div class="grid grid-cols-3 gap-4">
            <Field.Field class="col-span-2">
              <Field.Label for="checkout-7j9-card-number-uw1">
                Card Number
              </Field.Label>
              <Input
                id="checkout-7j9-card-number-uw1"
                placeholder="1234 5678 9012 3456"
                required
              />
              <Field.Description>Enter your 16-digit number.</Field.Description>
            </Field.Field>
            <Field.Field class="col-span-1">
              <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
              <Input id="checkout-7j9-cvv" placeholder="123" required />
            </Field.Field>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-month-ts6">Month</Field.Label>
              <Select.Root type="single" bind:value={month}>
                <Select.Trigger id="checkout-7j9-exp-month-ts6">
                  <span>
                    {month || "MM"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="01">01</Select.Item>
                  <Select.Item value="02">02</Select.Item>
                  <Select.Item value="03">03</Select.Item>
                  <Select.Item value="04">04</Select.Item>
                  <Select.Item value="05">05</Select.Item>
                  <Select.Item value="06">06</Select.Item>
                  <Select.Item value="07">07</Select.Item>
                  <Select.Item value="08">08</Select.Item>
                  <Select.Item value="09">09</Select.Item>
                  <Select.Item value="10">10</Select.Item>
                  <Select.Item value="11">11</Select.Item>
                  <Select.Item value="12">12</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
              <Select.Root type="single" bind:value={year}>
                <Select.Trigger id="checkout-7j9-exp-year-f59">
                  <span>
                    {year || "YYYY"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="2024">2024</Select.Item>
                  <Select.Item value="2025">2025</Select.Item>
                  <Select.Item value="2026">2026</Select.Item>
                  <Select.Item value="2027">2027</Select.Item>
                  <Select.Item value="2028">2028</Select.Item>
                  <Select.Item value="2029">2029</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
          </div>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Legend>Billing Address</Field.Legend>
        <Field.Description>
          The billing address associated with your payment method
        </Field.Description>
        <Field.Group>
          <Field.Field orientation="horizontal">
            <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
            <Field.Label
              for="checkout-7j9-same-as-shipping-wgm"
              class="font-normal"
            >
              Same as shipping address
            </Field.Label>
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-optional-comments"
              >Comments</Field.Label
            >
            <Textarea
              id="checkout-7j9-optional-comments"
              placeholder="Add any additional comments"
              class="resize-none"
            />
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline" type="button">Cancel</Button>
      </Field.Field>
    </Field.Group>
  </form>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add field
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add field
```

---

## Formsnap

**URL:** https://www.shadcn-svelte.com/docs/components/form

**Contents:**

- Formsnap
- Features
- Anatomy
- Example
- Installation
- Usage
  - Create a form schema
  - Setup the load function
  - Create form component
  - Use the component

Building forms with Formsnap, Superforms, & Zod.

The Form component is an abstraction over the formsnap & sveltekit-superforms libraries. Going forward, we recommend using the <Field /> component to build forms.

Forms are tricky. They are one of the most common things you'll build in a web application, but also one of the most complex.

Well-designed HTML forms are:

In this guide, we will take a look at building forms with formsnap, sveltekit-superforms and zod.

The Form components offered by shadcn-svelte are wrappers around formsnap & sveltekit-superforms which provide a few things:

If you aren't familiar with Superforms & Formsnap, you should check out their documentation first, as this guide assumes you have a basic understanding of how they work together.

Define the shape of your form using a Zod schema. You can read more about using Zod in the Zod documentation. We're going to define it in a file called schema.ts in the same directory as our page component, but you can put it anywhere you like.

For this example, we'll be passing the form returned from the load function as a prop to this component. To ensure it's typed properly, we'll use the SuperValidated type from sveltekit-superforms, and pass in the type of our form schema.

The name, id, and all accessibility attributes are applied to the input by spreading the attrs object from the Form.Control component. The Form.Label will automatically be associated with the input using the for attribute, so you don't have to worry about that.

We'll pass the form from the data returned from the load function to the form component we created above.

That's it. You now have a fully accessible form that is type-safe and has client & server side validation.

Be sure to check out the Formsnap and Superforms documentation for more information on how to use them.

See the following links for more examples on how to use the other Form components:

**Examples:**

Example 1 (typescript):

```typescript
<form>
  <Form.Field>
    <Form.Control>
      <Form.Label />
      <!-- Any Form input component -->
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
</form>
```

Example 2 (typescript):

```typescript
<form>
  <Form.Field>
    <Form.Control>
      <Form.Label />
      <!-- Any Form input component -->
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
</form>
```

Example 3 (jsx):

```jsx
<form method="POST" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
</form>
```

Example 4 (jsx):

```jsx
<form method="POST" use:enhance>
  <Form.Field {form} name="email">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>Email</Form.Label>
        <Input {...props} bind:value={$formData.email} />
      {/snippet}
    </Form.Control>
    <Form.Description />
    <Form.FieldErrors />
  </Form.Field>
</form>
```

---

## Hover Card

**URL:** https://www.shadcn-svelte.com/docs/components/hover-card

**Contents:**

- Hover Card
- Installation
- Usage

For sighted users to preview content available behind a link.

Copy and paste the following code into your project.

**Examples:**

Example 1 (html):

```html
<script lang="ts">
  import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as HoverCard from "$lib/components/ui/hover-card/index.js";
</script>

<HoverCard.Root>
  <HoverCard.Trigger
    href="https://github.com/sveltejs"
    target="_blank"
    rel="noreferrer noopener"
    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
  >
    @sveltejs
  </HoverCard.Trigger>
  <HoverCard.Content class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/sveltejs.png" />
        <Avatar.Fallback>SK</Avatar.Fallback>
      </Avatar.Root>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">@sveltejs</h4>
        <p class="text-sm">Cybernetically enhanced web apps.</p>
        <div class="flex items-center pt-2">
          <CalendarDaysIcon class="me-2 size-4 opacity-70" />
          <span class="text-muted-foreground text-xs"> Joined September 2022 </span>
        </div>
      </div>
    </div>
  </HoverCard.Content>
</HoverCard.Root>
```

Example 2 (html):

```html
<script lang="ts">
  import CalendarDaysIcon from "@lucide/svelte/icons/calendar-days";
  import * as Avatar from "$lib/components/ui/avatar/index.js";
  import * as HoverCard from "$lib/components/ui/hover-card/index.js";
</script>

<HoverCard.Root>
  <HoverCard.Trigger
    href="https://github.com/sveltejs"
    target="_blank"
    rel="noreferrer noopener"
    class="rounded-sm underline-offset-4 hover:underline focus-visible:outline-2 focus-visible:outline-offset-8 focus-visible:outline-black"
  >
    @sveltejs
  </HoverCard.Trigger>
  <HoverCard.Content class="w-80">
    <div class="flex justify-between space-x-4">
      <Avatar.Root>
        <Avatar.Image src="https://github.com/sveltejs.png" />
        <Avatar.Fallback>SK</Avatar.Fallback>
      </Avatar.Root>
      <div class="space-y-1">
        <h4 class="text-sm font-semibold">@sveltejs</h4>
        <p class="text-sm">Cybernetically enhanced web apps.</p>
        <div class="flex items-center pt-2">
          <CalendarDaysIcon class="me-2 size-4 opacity-70" />
          <span class="text-muted-foreground text-xs"> Joined September 2022 </span>
        </div>
      </div>
    </div>
  </HoverCard.Content>
</HoverCard.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add hover-card
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add hover-card
```

---

## Input Group

**URL:** https://www.shadcn-svelte.com/docs/components/input-group

**Contents:**

- Input Group
- Installation
- Usage
- Examples
  - Icon
  - Text
  - Button
  - Tooltip
  - Textarea
  - Spinner

Display additional information or actions to an input or textarea.

Install @lucide/svelte:

Copy and paste the following code into your project.

Display additional text information alongside inputs.

Add buttons to perform actions within the input group.

Add tooltips to provide additional context or help.

Input groups also work with textarea components. Use block-start or block-end for alignment.

Show loading indicators while processing input.

Add labels within input groups to improve accessibility.

Pair input groups with dropdown menus for complex interactions.

Wrap input groups with button groups to create prefixes and suffixes.

Add the data-slot="input-group-control" attribute to your custom input for automatic behavior and focus state handling.

No style is applied to the custom input. Apply your own styles using the class prop.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import IconCheck from "@tabler/icons-svelte/icons/check";
  import IconInfoCircle from "@tabler/icons-svelte/icons/info-circle";
  import IconPlus from "@tabler/icons-svelte/icons/plus";

  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
</script>

<div class="grid w-full max-w-sm gap-6">
  <InputGroup.Root>
    <InputGroup.Input placeholder="Search..." />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Input placeholder="example.com" class="!ps-1" />
    <InputGroup.Addon>
      <InputGroup.Text>https://</InputGroup.Text>
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <InputGroup.Button {...props} class="rounded-full" size="icon-xs">
              <IconInfoCircle />
            </InputGroup.Button>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content>This is content in a tooltip.</Tooltip.Content>
      </Tooltip.Root>
    </InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Textarea placeholder="Ask, Search or Chat..." />
    <InputGroup.Addon align="block-end">
      <InputGroup.Button variant="outline" class="rounded-full" size="icon-xs">
        <IconPlus />
      </InputGroup.Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <InputGroup.Button {...props} variant="ghost"
              >Auto</InputGroup.Button
            >
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="top"
          align="start"
          class="[--radius:0.95rem]"
        >
          <DropdownMenu.Item>Auto</DropdownMenu.Item>
          <DropdownMenu.Item>Agent</DropdownMenu.Item>
          <DropdownMenu.Item>Manual</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <InputGroup.Text class="ms-auto">52% used</InputGroup.Text>
      <Separator orientation="vertical" class="!h-4" />
      <InputGroup.Button
        variant="default"
        class="rounded-full"
        size="icon-xs"
        disabled
      >
        <ArrowUpIcon />
        <span class="sr-only">Send</span>
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Input placeholder="@shadcn" />
    <InputGroup.Addon align="inline-end">
      <div
        class="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full"
      >
        <IconCheck class="size-3" />
      </div>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import IconCheck from "@tabler/icons-svelte/icons/check";
  import IconInfoCircle from "@tabler/icons-svelte/icons/info-circle";
  import IconPlus from "@tabler/icons-svelte/icons/plus";

  import * as InputGroup from "$lib/components/ui/input-group/index.js";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";
  import SearchIcon from "@lucide/svelte/icons/search";
  import ArrowUpIcon from "@lucide/svelte/icons/arrow-up";
</script>

<div class="grid w-full max-w-sm gap-6">
  <InputGroup.Root>
    <InputGroup.Input placeholder="Search..." />
    <InputGroup.Addon>
      <SearchIcon />
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">12 results</InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Input placeholder="example.com" class="!ps-1" />
    <InputGroup.Addon>
      <InputGroup.Text>https://</InputGroup.Text>
    </InputGroup.Addon>
    <InputGroup.Addon align="inline-end">
      <Tooltip.Root>
        <Tooltip.Trigger>
          {#snippet child({ props })}
            <InputGroup.Button {...props} class="rounded-full" size="icon-xs">
              <IconInfoCircle />
            </InputGroup.Button>
          {/snippet}
        </Tooltip.Trigger>
        <Tooltip.Content>This is content in a tooltip.</Tooltip.Content>
      </Tooltip.Root>
    </InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Textarea placeholder="Ask, Search or Chat..." />
    <InputGroup.Addon align="block-end">
      <InputGroup.Button variant="outline" class="rounded-full" size="icon-xs">
        <IconPlus />
      </InputGroup.Button>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger>
          {#snippet child({ props })}
            <InputGroup.Button {...props} variant="ghost"
              >Auto</InputGroup.Button
            >
          {/snippet}
        </DropdownMenu.Trigger>
        <DropdownMenu.Content
          side="top"
          align="start"
          class="[--radius:0.95rem]"
        >
          <DropdownMenu.Item>Auto</DropdownMenu.Item>
          <DropdownMenu.Item>Agent</DropdownMenu.Item>
          <DropdownMenu.Item>Manual</DropdownMenu.Item>
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <InputGroup.Text class="ms-auto">52% used</InputGroup.Text>
      <Separator orientation="vertical" class="!h-4" />
      <InputGroup.Button
        variant="default"
        class="rounded-full"
        size="icon-xs"
        disabled
      >
        <ArrowUpIcon />
        <span class="sr-only">Send</span>
      </InputGroup.Button>
    </InputGroup.Addon>
  </InputGroup.Root>
  <InputGroup.Root>
    <InputGroup.Input placeholder="@shadcn" />
    <InputGroup.Addon align="inline-end">
      <div
        class="bg-primary text-primary-foreground flex size-4 items-center justify-center rounded-full"
      >
        <IconCheck class="size-3" />
      </div>
    </InputGroup.Addon>
  </InputGroup.Root>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add input-group
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add input-group
```

---

## Input OTP

**URL:** https://www.shadcn-svelte.com/docs/components/input-otp

**Contents:**

- Input OTP
- About
- Installation
- Usage
- Examples
  - Pattern
  - Separator
  - Controlled
  - Form

Accessible one-time password component with copy paste functionality.

Input OTP is built on top of Bits UI's PinInput which is inspired by @guilherme_rodz's Input OTP component.

Copy and paste the following code into your project.

Use the pattern prop to define a custom pattern for the OTP input.

You can use the InputOTP.Separator component to add a separator between the groups of cells.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add input-otp
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add input-otp
```

---

## Input

**URL:** https://www.shadcn-svelte.com/docs/components/input

**Contents:**

- Input
- Installation
- Usage
- Examples
  - Default
  - File
  - Disabled
  - With Label
  - With Button

Displays a form input field or a component that looks like an input field.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<Input type="email" placeholder="Email" class="max-w-xs" />
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<Input type="email" placeholder="Email" class="max-w-xs" />
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add input
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add input
```

---

## Item

**URL:** https://www.shadcn-svelte.com/docs/components/item

**Contents:**

- Item
- Installation
- Usage
- Item vs Field
- Examples
  - Variants
  - Size
  - Icon
  - Avatar
  - Image

A versatile component that you can use to display any content.

The Item component is a straightforward flex container that can house nearly any type of content. Use it to display a title, description, and actions. Group it with the ItemGroup component to create a list of items.

You can pretty much achieve the same result with the div element and some classes, but I've built this so many times that I decided to create a component for it. Now I use it all the time.

A simple item with title and description.

Copy and paste the following code into your project.

Use Field if you need to display a form input such as a checkbox, input, radio, or select.

If you only need to display content such as a title, description, and actions, use Item.

Standard styling with subtle background and borders.

Outlined style with clear borders and transparent background.

Subdued appearance with muted colors for secondary content.

The Item component has different sizes for different use cases. For example, you can use the sm size for a compact item or the default size for a standard item.

A simple item with title and description.

New login detected from unknown device.

Last seen 5 months ago

Invite your team to collaborate on this project.

evilrabbit@vercel.com

Everyday tasks and UI generation.

Advanced thinking or reasoning.

Open Source model for everyone.

To render an item as a link, use the the child snippet. The hover and focus states will be applied to the anchor element.

Learn how to get started with our components.

Opens in a new tab with security attributes.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
</script>

<div class="flex w-full max-w-md flex-col gap-6">
  <Item.Root variant="outline">
    <Item.Content>
      <Item.Title>Basic Item</Item.Title>
      <Item.Description
        >A simple item with title and description.</Item.Description
      >
    </Item.Content>
    <Item.Actions>
      <Button variant="outline" size="sm">Action</Button>
    </Item.Actions>
  </Item.Root>
  <Item.Root variant="outline" size="sm">
    {#snippet child({ props })}
      <a href="#/" {...props}>
        <Item.Media>
          <BadgeCheckIcon class="size-5" />
        </Item.Media>
        <Item.Content>
          <Item.Title>Your profile has been verified.</Item.Title>
        </Item.Content>
        <Item.Actions>
          <ChevronRightIcon class="size-4" />
        </Item.Actions>
      </a>
    {/snippet}
  </Item.Root>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Item from "$lib/components/ui/item/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import BadgeCheckIcon from "@lucide/svelte/icons/badge-check";
  import ChevronRightIcon from "@lucide/svelte/icons/chevron-right";
</script>

<div class="flex w-full max-w-md flex-col gap-6">
  <Item.Root variant="outline">
    <Item.Content>
      <Item.Title>Basic Item</Item.Title>
      <Item.Description
        >A simple item with title and description.</Item.Description
      >
    </Item.Content>
    <Item.Actions>
      <Button variant="outline" size="sm">Action</Button>
    </Item.Actions>
  </Item.Root>
  <Item.Root variant="outline" size="sm">
    {#snippet child({ props })}
      <a href="#/" {...props}>
        <Item.Media>
          <BadgeCheckIcon class="size-5" />
        </Item.Media>
        <Item.Content>
          <Item.Title>Your profile has been verified.</Item.Title>
        </Item.Content>
        <Item.Actions>
          <ChevronRightIcon class="size-4" />
        </Item.Actions>
      </a>
    {/snippet}
  </Item.Root>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add item
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add item
```

---

## Kbd

**URL:** https://www.shadcn-svelte.com/docs/components/kbd

**Contents:**

- Kbd
- Installation
- Usage
- Examples
  - Group
  - Button
  - Tooltip
  - Input Group

Used to display textual user input from keyboard.

Copy and paste the following code into your project.

Use the Kbd.Group component to group keyboard keys together.

Use Ctrl + B Ctrl + K to open the command palette

Use the Kbd.Root component inside a Button component to display a keyboard key inside a button.

You can use the Kbd.Root component inside a Tooltip component to display a tooltip with a keyboard key.

You can use the Kbd.Root component inside a InputGroup.Addon component to display a keyboard key inside an input group.

**Examples:**

Example 1 (html):

```html
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <Kbd.Group>
    <Kbd.Root>⌘</Kbd.Root>
    <Kbd.Root>⇧</Kbd.Root>
    <Kbd.Root>⌥</Kbd.Root>
    <Kbd.Root>⌃</Kbd.Root>
  </Kbd.Group>
  <Kbd.Group>
    <Kbd.Root>Ctrl</Kbd.Root>
    <span>+</span>
    <Kbd.Root>B</Kbd.Root>
  </Kbd.Group>
</div>
```

Example 2 (html):

```html
<script lang="ts">
  import * as Kbd from "$lib/components/ui/kbd/index.js";
</script>

<div class="flex flex-col items-center gap-4">
  <Kbd.Group>
    <Kbd.Root>⌘</Kbd.Root>
    <Kbd.Root>⇧</Kbd.Root>
    <Kbd.Root>⌥</Kbd.Root>
    <Kbd.Root>⌃</Kbd.Root>
  </Kbd.Group>
  <Kbd.Group>
    <Kbd.Root>Ctrl</Kbd.Root>
    <span>+</span>
    <Kbd.Root>B</Kbd.Root>
  </Kbd.Group>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add kbd
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add kbd
```

---

## Label

**URL:** https://www.shadcn-svelte.com/docs/components/label

**Contents:**

- Label
- Installation
- Usage

Renders an accessible label associated with controls.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div>
  <div class="flex items-center space-x-2">
    <Checkbox id="terms" />
    <Label for="terms">Accept terms and conditions</Label>
  </div>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add label
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add label
```

---

## Menubar

**URL:** https://www.shadcn-svelte.com/docs/components/menubar

**Contents:**

- Menubar
- Installation
- Usage

A visually persistent menu common in desktop applications that provides quick access to a consistent set of commands.

Copy and paste the following code into your project.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar/index.js";

  let bookmarks = $state(false);
  let fullUrls = $state(true);
  let profileRadioValue = $state("benoit");
</script>

<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Incognito Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Share</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Email link</Menubar.Item>
          <Menubar.Item>Messages</Menubar.Item>
          <Menubar.Item>Notes</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>
        Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Find</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Search the web</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Find...</Menubar.Item>
          <Menubar.Item>Find Next</Menubar.Item>
          <Menubar.Item>Find Previous</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>Cut</Menubar.Item>
      <Menubar.Item>Copy</Menubar.Item>
      <Menubar.Item>Paste</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.CheckboxItem bind:checked={bookmarks}
        >Always Show Bookmarks Bar</Menubar.CheckboxItem
      >
      <Menubar.CheckboxItem bind:checked={fullUrls}>
        Always Show Full URLs
      </Menubar.CheckboxItem>
      <Menubar.Separator />
      <Menubar.Item inset>
        Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item inset>
        Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Hide Sidebar</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Profiles</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup bind:value={profileRadioValue}>
        <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
        <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
        <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
      </Menubar.RadioGroup>
      <Menubar.Separator />
      <Menubar.Item inset>Edit...</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Add Profile...</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import * as Menubar from "$lib/components/ui/menubar/index.js";

  let bookmarks = $state(false);
  let fullUrls = $state(true);
  let profileRadioValue = $state("benoit");
</script>

<Menubar.Root>
  <Menubar.Menu>
    <Menubar.Trigger>File</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        New Tab <Menubar.Shortcut>⌘T</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        New Window <Menubar.Shortcut>⌘N</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>New Incognito Window</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Share</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Email link</Menubar.Item>
          <Menubar.Item>Messages</Menubar.Item>
          <Menubar.Item>Notes</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>
        Print... <Menubar.Shortcut>⌘P</Menubar.Shortcut>
      </Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Edit</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.Item>
        Undo <Menubar.Shortcut>⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item>
        Redo <Menubar.Shortcut>⇧⌘Z</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Sub>
        <Menubar.SubTrigger>Find</Menubar.SubTrigger>
        <Menubar.SubContent>
          <Menubar.Item>Search the web</Menubar.Item>
          <Menubar.Separator />
          <Menubar.Item>Find...</Menubar.Item>
          <Menubar.Item>Find Next</Menubar.Item>
          <Menubar.Item>Find Previous</Menubar.Item>
        </Menubar.SubContent>
      </Menubar.Sub>
      <Menubar.Separator />
      <Menubar.Item>Cut</Menubar.Item>
      <Menubar.Item>Copy</Menubar.Item>
      <Menubar.Item>Paste</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>View</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.CheckboxItem bind:checked={bookmarks}
        >Always Show Bookmarks Bar</Menubar.CheckboxItem
      >
      <Menubar.CheckboxItem bind:checked={fullUrls}>
        Always Show Full URLs
      </Menubar.CheckboxItem>
      <Menubar.Separator />
      <Menubar.Item inset>
        Reload <Menubar.Shortcut>⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Item inset>
        Force Reload <Menubar.Shortcut>⇧⌘R</Menubar.Shortcut>
      </Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Toggle Fullscreen</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Hide Sidebar</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
  <Menubar.Menu>
    <Menubar.Trigger>Profiles</Menubar.Trigger>
    <Menubar.Content>
      <Menubar.RadioGroup bind:value={profileRadioValue}>
        <Menubar.RadioItem value="andy">Andy</Menubar.RadioItem>
        <Menubar.RadioItem value="benoit">Benoit</Menubar.RadioItem>
        <Menubar.RadioItem value="Luis">Luis</Menubar.RadioItem>
      </Menubar.RadioGroup>
      <Menubar.Separator />
      <Menubar.Item inset>Edit...</Menubar.Item>
      <Menubar.Separator />
      <Menubar.Item inset>Add Profile...</Menubar.Item>
    </Menubar.Content>
  </Menubar.Menu>
</Menubar.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add menubar
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add menubar
```

---

## Native Select

**URL:** https://www.shadcn-svelte.com/docs/components/native-select

**Contents:**

- Native Select
- Installation
- Usage
- Examples
  - With Groups
  - Disabled State
  - Invalid State
- Native Select vs Select
- Accessibility
- API Reference

A styled native HTML select element with consistent design system integration.

For a styled select component, see the Select component.

Copy and paste the following code into your project.

Organize options using NativeSelect.OptGroup for better categorization.

Disable individual options or the entire select component.

Show validation errors with the aria-invalid attribute and error styling.

The NativeSelect component provides native HTML select functionality with consistent styling that matches your design system.

The main select component that wraps the native HTML select element.

All other props are passed through to the underlying <select> element.

Represents an individual option within the select.

All other props are passed through to the underlying <option> element.

Groups related options together for better organization.

All other props are passed through to the underlying <optgroup> element.

**Examples:**

Example 1 (sql):

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select status</NativeSelect.Option>
  <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
  <NativeSelect.Option value="in-progress">In Progress</NativeSelect.Option>
  <NativeSelect.Option value="done">Done</NativeSelect.Option>
  <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
</NativeSelect.Root>
```

Example 2 (sql):

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select status</NativeSelect.Option>
  <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
  <NativeSelect.Option value="in-progress">In Progress</NativeSelect.Option>
  <NativeSelect.Option value="done">Done</NativeSelect.Option>
  <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
</NativeSelect.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add native-select
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add native-select
```

---

## Navigation Menu

**URL:** https://www.shadcn-svelte.com/docs/components/navigation-menu

**Contents:**

- Navigation Menu
- Installation
- Usage

A collection of links for navigating websites.

Copy and paste the following code into your project.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { cn } from "$lib/utils.js";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import CircleHelpIcon from "@lucide/svelte/icons/circle-help";
  import CircleIcon from "@lucide/svelte/icons/circle";
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";

  import { IsMobile } from "$lib/components/hooks/is-mobile.svelte.js";

  const isMobile = new IsMobile();

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/components/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response."
    },
    {
      title: "Hover Card",
      href: "/docs/components/hover-card",
      description:
        "For sighted users to preview content available behind a link."
    },
    {
      title: "Progress",
      href: "/docs/components/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
    },
    {
      title: "Scroll-area",
      href: "/docs/components/scroll-area",
      description: "Visually or semantically separates content."
    },
    {
      title: "Tabs",
      href: "/docs/components/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time."
    },
    {
      title: "Tooltip",
      href: "/docs/components/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    }
  ];

  type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    href: string;
    content: string;
  };
</script>

{#snippet ListItem({
  title,
  content,
  href,
  class: className,
  ...restProps
}: ListItemProps)}
  <li>
    <NavigationMenu.Link>
      {#snippet child()}
        <a
          {href}
          class={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className
          )}
          {...restProps}
        >
          <div class="text-sm leading-none font-medium">{title}</div>
          <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {content}
          </p>
        </a>
      {/snippet}
    </NavigationMenu.Link>
  </li>
{/snippet}

<NavigationMenu.Root viewport={isMobile.current}>
  <NavigationMenu.List class="flex-wrap">
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Home</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul
          class="grid gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
        >
          <li class="row-span-3">
            <NavigationMenu.Link
              class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6"
            >
              {#snippet child({ props })}
                <a {...props} href="/">
                  <div class="mt-4 mb-2 text-lg font-medium">shadcn-svelte</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </a>
              {/snippet}
            </NavigationMenu.Link>
          </li>
          {@render ListItem({
            href: "/docs",
            title: "Introduction",
            content:
              "Re-usable components built using Bits UI and Tailwind CSS."
          })}
          {@render ListItem({
            href: "/docs/installation",
            title: "Installation",
            content: "How to install dependencies and structure your app."
          })}
          {@render ListItem({
            href: "/docs/components/typography",
            title: "Typography",
            content: "Styles for headings, paragraphs, lists...etc"
          })}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul
          class="grid w-[300px] gap-2 p-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
        >
          {#each components as component, i (i)}
            {@render ListItem({
              href: component.href,
              title: component.title,
              content: component.description
            })}
          {/each}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item>
      <NavigationMenu.Link>
        {#snippet child()}
          <a href="/docs" class={navigationMenuTriggerStyle()}>Docs</a>
        {/snippet}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item class="hidden md:block">
      <NavigationMenu.Trigger>List</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[300px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="##">
              <div class="font-medium">Components</div>
              <div class="text-muted-foreground">
                Browse all components in the library.
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="##">
              <div class="font-medium">Documentation</div>
              <div class="text-muted-foreground">
                Learn how to use the library.
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="##">
              <div class="font-medium">Blog</div>
              <div class="text-muted-foreground">
                Read our latest blog posts.
              </div>
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item class="hidden md:block">
      <NavigationMenu.Trigger>Simple</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[200px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="##">Components</NavigationMenu.Link>
            <NavigationMenu.Link href="##">Documentation</NavigationMenu.Link>
            <NavigationMenu.Link href="##">Blocks</NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item class="hidden md:block">
      <NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>

      <NavigationMenu.Content>
        <ul class="grid w-[200px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="##" class="flex-row items-center gap-2">
              <CircleHelpIcon />
              Backlog
            </NavigationMenu.Link>

            <NavigationMenu.Link href="##" class="flex-row items-center gap-2">
              <CircleIcon />
              To Do
            </NavigationMenu.Link>

            <NavigationMenu.Link href="##" class="flex-row items-center gap-2">
              <CircleCheckIcon />
              Done
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import * as NavigationMenu from "$lib/components/ui/navigation-menu/index.js";
  import { cn } from "$lib/utils.js";
  import { navigationMenuTriggerStyle } from "$lib/components/ui/navigation-menu/navigation-menu-trigger.svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import CircleHelpIcon from "@lucide/svelte/icons/circle-help";
  import CircleIcon from "@lucide/svelte/icons/circle";
  import CircleCheckIcon from "@lucide/svelte/icons/circle-check";

  import { IsMobile } from "$lib/components/hooks/is-mobile.svelte.js";

  const isMobile = new IsMobile();

  const components: { title: string; href: string; description: string }[] = [
    {
      title: "Alert Dialog",
      href: "/docs/components/alert-dialog",
      description:
        "A modal dialog that interrupts the user with important content and expects a response."
    },
    {
      title: "Hover Card",
      href: "/docs/components/hover-card",
      description:
        "For sighted users to preview content available behind a link."
    },
    {
      title: "Progress",
      href: "/docs/components/progress",
      description:
        "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar."
    },
    {
      title: "Scroll-area",
      href: "/docs/components/scroll-area",
      description: "Visually or semantically separates content."
    },
    {
      title: "Tabs",
      href: "/docs/components/tabs",
      description:
        "A set of layered sections of content—known as tab panels—that are displayed one at a time."
    },
    {
      title: "Tooltip",
      href: "/docs/components/tooltip",
      description:
        "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it."
    }
  ];

  type ListItemProps = HTMLAttributes<HTMLAnchorElement> & {
    title: string;
    href: string;
    content: string;
  };
</script>

{#snippet ListItem({
  title,
  content,
  href,
  class: className,
  ...restProps
}: ListItemProps)}
  <li>
    <NavigationMenu.Link>
      {#snippet child()}
        <a
          {href}
          class={cn(
            "hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground block space-y-1 rounded-md p-3 leading-none no-underline transition-colors outline-none select-none",
            className
          )}
          {...restProps}
        >
          <div class="text-sm leading-none font-medium">{title}</div>
          <p class="text-muted-foreground line-clamp-2 text-sm leading-snug">
            {content}
          </p>
        </a>
      {/snippet}
    </NavigationMenu.Link>
  </li>
{/snippet}

<NavigationMenu.Root viewport={isMobile.current}>
  <NavigationMenu.List class="flex-wrap">
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Home</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul
          class="grid gap-2 p-2 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]"
        >
          <li class="row-span-3">
            <NavigationMenu.Link
              class="from-muted/50 to-muted flex h-full w-full flex-col justify-end rounded-md bg-linear-to-b p-4 no-underline outline-hidden select-none focus:shadow-md md:p-6"
            >
              {#snippet child({ props })}
                <a {...props} href="/">
                  <div class="mt-4 mb-2 text-lg font-medium">shadcn-svelte</div>
                  <p class="text-muted-foreground text-sm leading-tight">
                    Beautifully designed components built with Tailwind CSS.
                  </p>
                </a>
              {/snippet}
            </NavigationMenu.Link>
          </li>
          {@render ListItem({
            href: "/docs",
            title: "Introduction",
            content:
              "Re-usable components built using Bits UI and Tailwind CSS."
          })}
          {@render ListItem({
            href: "/docs/installation",
            title: "Installation",
            content: "How to install dependencies and structure your app."
          })}
          {@render ListItem({
            href: "/docs/components/typography",
            title: "Typography",
            content: "Styles for headings, paragraphs, lists...etc"
          })}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item>
      <NavigationMenu.Trigger>Components</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul
          class="grid w-[300px] gap-2 p-2 sm:w-[400px] md:w-[500px] md:grid-cols-2 lg:w-[600px]"
        >
          {#each components as component, i (i)}
            {@render ListItem({
              href: component.href,
              title: component.title,
              content: component.description
            })}
          {/each}
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>

    <NavigationMenu.Item>
      <NavigationMenu.Link>
        {#snippet child()}
          <a href="/docs" class={navigationMenuTriggerStyle()}>Docs</a>
        {/snippet}
      </NavigationMenu.Link>
    </NavigationMenu.Item>
    <NavigationMenu.Item class="hidden md:block">
      <NavigationMenu.Trigger>List</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[300px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="##">
              <div class="font-medium">Components</div>
              <div class="text-muted-foreground">
                Browse all components in the library.
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="##">
              <div class="font-medium">Documentation</div>
              <div class="text-muted-foreground">
                Learn how to use the library.
              </div>
            </NavigationMenu.Link>
            <NavigationMenu.Link href="##">
              <div class="font-medium">Blog</div>
              <div class="text-muted-foreground">
                Read our latest blog posts.
              </div>
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item class="hidden md:block">
      <NavigationMenu.Trigger>Simple</NavigationMenu.Trigger>
      <NavigationMenu.Content>
        <ul class="grid w-[200px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="##">Components</NavigationMenu.Link>
            <NavigationMenu.Link href="##">Documentation</NavigationMenu.Link>
            <NavigationMenu.Link href="##">Blocks</NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
    <NavigationMenu.Item class="hidden md:block">
      <NavigationMenu.Trigger>With Icon</NavigationMenu.Trigger>

      <NavigationMenu.Content>
        <ul class="grid w-[200px] gap-4 p-2">
          <li>
            <NavigationMenu.Link href="##" class="flex-row items-center gap-2">
              <CircleHelpIcon />
              Backlog
            </NavigationMenu.Link>

            <NavigationMenu.Link href="##" class="flex-row items-center gap-2">
              <CircleIcon />
              To Do
            </NavigationMenu.Link>

            <NavigationMenu.Link href="##" class="flex-row items-center gap-2">
              <CircleCheckIcon />
              Done
            </NavigationMenu.Link>
          </li>
        </ul>
      </NavigationMenu.Content>
    </NavigationMenu.Item>
  </NavigationMenu.List>
</NavigationMenu.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add navigation-menu
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add navigation-menu
```

---

## Pagination

**URL:** https://www.shadcn-svelte.com/docs/components/pagination

**Contents:**

- Pagination
- Installation
- Usage

Pagination with page navigation, next and previous links.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination/index.js";
</script>

<Pagination.Root count={30} page={2}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Pagination from "$lib/components/ui/pagination/index.js";
</script>

<Pagination.Root count={30} page={2}>
  {#snippet children({ pages, currentPage })}
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.Previous />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link {page} isActive={currentPage === page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.Ellipsis />
      </Pagination.Item>
      <Pagination.Item>
        <Pagination.Next />
      </Pagination.Item>
    </Pagination.Content>
  {/snippet}
</Pagination.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add pagination
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add pagination
```

---

## Popover

**URL:** https://www.shadcn-svelte.com/docs/components/popover

**Contents:**

- Popover
- Installation
- Usage

Displays rich content in a portal, triggered by a button.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>

<Popover.Root>
  <Popover.Trigger class={buttonVariants({ variant: "outline" })}
    >Open popover</Popover.Trigger
  >
  <Popover.Content class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="leading-none font-medium">Dimensions</h4>
        <p class="text-muted-foreground text-sm">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxWidth">Max. width</Label>
          <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">Height</Label>
          <Input id="height" value="25px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxHeight">Max. height</Label>
          <Input id="maxHeight" value="none" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
  import * as Popover from "$lib/components/ui/popover/index.js";
</script>

<Popover.Root>
  <Popover.Trigger class={buttonVariants({ variant: "outline" })}
    >Open popover</Popover.Trigger
  >
  <Popover.Content class="w-80">
    <div class="grid gap-4">
      <div class="space-y-2">
        <h4 class="leading-none font-medium">Dimensions</h4>
        <p class="text-muted-foreground text-sm">
          Set the dimensions for the layer.
        </p>
      </div>
      <div class="grid gap-2">
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="width">Width</Label>
          <Input id="width" value="100%" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxWidth">Max. width</Label>
          <Input id="maxWidth" value="300px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="height">Height</Label>
          <Input id="height" value="25px" class="col-span-2 h-8" />
        </div>
        <div class="grid grid-cols-3 items-center gap-4">
          <Label for="maxHeight">Max. height</Label>
          <Input id="maxHeight" value="none" class="col-span-2 h-8" />
        </div>
      </div>
    </div>
  </Popover.Content>
</Popover.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add popover
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add popover
```

---

## Progress

**URL:** https://www.shadcn-svelte.com/docs/components/progress

**Contents:**

- Progress
- Installation
- Usage

Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.

Copy and paste the following code into your project.

**Examples:**

Example 1 (javascript):

```javascript
<script lang="ts">
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress/index.js";

  let value = $state(13);

  onMount(() => {
    const timer = setTimeout(() => (value = 66), 500);
    return () => clearTimeout(timer);
  });
</script>

<Progress {value} max={100} class="w-[60%]" />
```

Example 2 (javascript):

```javascript
<script lang="ts">
  import { onMount } from "svelte";
  import { Progress } from "$lib/components/ui/progress/index.js";

  let value = $state(13);

  onMount(() => {
    const timer = setTimeout(() => (value = 66), 500);
    return () => clearTimeout(timer);
  });
</script>

<Progress {value} max={100} class="w-[60%]" />
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add progress
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add progress
```

---

## Radio Group

**URL:** https://www.shadcn-svelte.com/docs/components/radio-group

**Contents:**

- Radio Group
- Installation
- Usage

A set of checkable buttons—known as radio buttons—where no more than one of the buttons can be checked at a time.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<RadioGroup.Root value="comfortable">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="default" id="r1" />
    <Label for="r1">Default</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="comfortable" id="r2" />
    <Label for="r2">Comfortable</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="compact" id="r3" />
    <Label for="r3">Compact</Label>
  </div>
</RadioGroup.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<RadioGroup.Root value="comfortable">
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="default" id="r1" />
    <Label for="r1">Default</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="comfortable" id="r2" />
    <Label for="r2">Comfortable</Label>
  </div>
  <div class="flex items-center space-x-2">
    <RadioGroup.Item value="compact" id="r3" />
    <Label for="r3">Compact</Label>
  </div>
</RadioGroup.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add radio-group
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add radio-group
```

---

## Range Calendar

**URL:** https://www.shadcn-svelte.com/docs/components/range-calendar

**Contents:**

- Range Calendar
- About
- Blocks
- Installation

A calendar component that allows users to select a range of dates.

The <RangeCalendar /> component is built on top of the Bits Range Calendar component, which uses the @internationalized/date package to handle dates.

You can see the RangeCalendar component in action in the 30+ Calendar Blocks we've built.

Install bits-ui and @internationalized/date:

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";

  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });

  let value = $state({
    start,
    end
  });
</script>

<RangeCalendar bind:value class="rounded-md border" />
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { getLocalTimeZone, today } from "@internationalized/date";
  import { RangeCalendar } from "$lib/components/ui/range-calendar/index.js";

  const start = today(getLocalTimeZone());
  const end = start.add({ days: 7 });

  let value = $state({
    start,
    end
  });
</script>

<RangeCalendar bind:value class="rounded-md border" />
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add range-calendar
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add range-calendar
```

---

## Resizable

**URL:** https://www.shadcn-svelte.com/docs/components/resizable

**Contents:**

- Resizable
- About
- Installation
- Usage
- Examples
  - Vertical
  - Handle

Accessible resizable panel groups and layouts with keyboard support.

The Resizable component is built on top of PaneForge by Huntabyte. Visit the PaneForge documentation for all the available props and abilities of the Resizable component.

Copy and paste the following code into your project.

Use the direction prop to set the direction of the resizable panels.

You can set or hide the handle by using the withHandle prop on the ResizableHandle component.

**Examples:**

Example 1 (html):

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" class="max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{50}">
    <div class="flex h-[200px] items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize="{50}">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize="{25}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane defaultSize="{75}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

Example 2 (html):

```html
<script lang="ts">
  import * as Resizable from "$lib/components/ui/resizable/index.js";
</script>

<Resizable.PaneGroup direction="horizontal" class="max-w-md rounded-lg border">
  <Resizable.Pane defaultSize="{50}">
    <div class="flex h-[200px] items-center justify-center p-6">
      <span class="font-semibold">One</span>
    </div>
  </Resizable.Pane>
  <Resizable.Handle />
  <Resizable.Pane defaultSize="{50}">
    <Resizable.PaneGroup direction="vertical">
      <Resizable.Pane defaultSize="{25}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Two</span>
        </div>
      </Resizable.Pane>
      <Resizable.Handle />
      <Resizable.Pane defaultSize="{75}">
        <div class="flex h-full items-center justify-center p-6">
          <span class="font-semibold">Three</span>
        </div>
      </Resizable.Pane>
    </Resizable.PaneGroup>
  </Resizable.Pane>
</Resizable.PaneGroup>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add resizable
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add resizable
```

---

## Scroll Area

**URL:** https://www.shadcn-svelte.com/docs/components/scroll-area

**Contents:**

- Scroll Area
  - Tags
- Installation
- Usage
- Examples
  - Horizontal Scrolling

Augments native scroll functionality for custom, cross-browser styling.

Copy and paste the following code into your project.

Set the orientation prop to "horizontal" to enable horizontal scrolling.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
</script>

<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
    {#each tags as tag (tag)}
      <div class="text-sm">
        {tag}
      </div>
      <Separator class="my-2" />
    {/each}
  </div>
</ScrollArea>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { ScrollArea } from "$lib/components/ui/scroll-area/index.js";
  import { Separator } from "$lib/components/ui/separator/index.js";

  const tags = Array.from({ length: 50 }).map(
    (_, i, a) => `v1.2.0-beta.${a.length - i}`
  );
</script>

<ScrollArea class="h-72 w-48 rounded-md border">
  <div class="p-4">
    <h4 class="mb-4 text-sm leading-none font-medium">Tags</h4>
    {#each tags as tag (tag)}
      <div class="text-sm">
        {tag}
      </div>
      <Separator class="my-2" />
    {/each}
  </div>
</ScrollArea>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add scroll-area
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add scroll-area
```

---

## Select

**URL:** https://www.shadcn-svelte.com/docs/components/select

**Contents:**

- Select
- Installation
- Usage
- Examples
  - Scrollable

Displays a list of options for the user to pick from—triggered by a button.

Copy and paste the following code into your project.

**Examples:**

Example 1 (sql):

```sql
<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" }
  ];

  let value = $state("");

  const triggerContent = $derived(
    fruits.find((f) => f.value === value)?.label ?? "Select a fruit"
  );
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
  <Select.Trigger class="w-[180px]">
    {triggerContent}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Fruits</Select.Label>
      {#each fruits as fruit (fruit.value)}
        <Select.Item
          value={fruit.value}
          label={fruit.label}
          disabled={fruit.value === "grapes"}
        >
          {fruit.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
```

Example 2 (sql):

```sql
<script lang="ts">
  import * as Select from "$lib/components/ui/select/index.js";

  const fruits = [
    { value: "apple", label: "Apple" },
    { value: "banana", label: "Banana" },
    { value: "blueberry", label: "Blueberry" },
    { value: "grapes", label: "Grapes" },
    { value: "pineapple", label: "Pineapple" }
  ];

  let value = $state("");

  const triggerContent = $derived(
    fruits.find((f) => f.value === value)?.label ?? "Select a fruit"
  );
</script>

<Select.Root type="single" name="favoriteFruit" bind:value>
  <Select.Trigger class="w-[180px]">
    {triggerContent}
  </Select.Trigger>
  <Select.Content>
    <Select.Group>
      <Select.Label>Fruits</Select.Label>
      {#each fruits as fruit (fruit.value)}
        <Select.Item
          value={fruit.value}
          label={fruit.label}
          disabled={fruit.value === "grapes"}
        >
          {fruit.label}
        </Select.Item>
      {/each}
    </Select.Group>
  </Select.Content>
</Select.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add select
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add select
```

---

## Separator

**URL:** https://www.shadcn-svelte.com/docs/components/separator

**Contents:**

- Separator
  - Bits UI Primitives
- Installation
- Usage

Visually or semantically separates content.

An open-source UI component library.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Separator } from "$lib/components/ui/separator/index.js";
</script>

<div>
  <div class="space-y-1">
    <h4 class="text-sm leading-none font-medium">Bits UI Primitives</h4>
    <p class="text-muted-foreground text-sm">
      An open-source UI component library.
    </p>
  </div>
  <Separator class="my-4" />
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Separator } from "$lib/components/ui/separator/index.js";
</script>

<div>
  <div class="space-y-1">
    <h4 class="text-sm leading-none font-medium">Bits UI Primitives</h4>
    <p class="text-muted-foreground text-sm">
      An open-source UI component library.
    </p>
  </div>
  <Separator class="my-4" />
  <div class="flex h-5 items-center space-x-4 text-sm">
    <div>Blog</div>
    <Separator orientation="vertical" />
    <div>Docs</div>
    <Separator orientation="vertical" />
    <div>Source</div>
  </div>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add separator
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add separator
```

---

## Sheet

**URL:** https://www.shadcn-svelte.com/docs/components/sheet

**Contents:**

- Sheet
- Installation
- Usage
- Examples
  - Side
  - Size

Extends the Dialog component to display content that complements the main content of the screen.

Copy and paste the following code into your project.

Pass the side property to <Sheet.Content /> to indicate the edge of the screen where the component will appear. The values can be top, right, bottom or left.

You can adjust the size of the sheet using CSS classes:

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Sheet.Root>
  <Sheet.Trigger class={buttonVariants({ variant: "outline" })}
    >Open</Sheet.Trigger
  >
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit profile</Sheet.Title>
      <Sheet.Description>
        Make changes to your profile here. Click save when you're done.
      </Sheet.Description>
    </Sheet.Header>
    <div class="grid flex-1 auto-rows-min gap-6 px-4">
      <div class="grid gap-3">
        <Label for="name" class="text-end">Name</Label>
        <Input id="name" value="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="username" class="text-end">Username</Label>
        <Input id="username" value="@peduarte" />
      </div>
    </div>
    <Sheet.Footer>
      <Button type="submit">Save changes</Button>
      <Sheet.Close class={buttonVariants({ variant: "outline" })}
        >Close</Sheet.Close
      >
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { buttonVariants } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<Sheet.Root>
  <Sheet.Trigger class={buttonVariants({ variant: "outline" })}
    >Open</Sheet.Trigger
  >
  <Sheet.Content side="right">
    <Sheet.Header>
      <Sheet.Title>Edit profile</Sheet.Title>
      <Sheet.Description>
        Make changes to your profile here. Click save when you're done.
      </Sheet.Description>
    </Sheet.Header>
    <div class="grid flex-1 auto-rows-min gap-6 px-4">
      <div class="grid gap-3">
        <Label for="name" class="text-end">Name</Label>
        <Input id="name" value="Pedro Duarte" />
      </div>
      <div class="grid gap-3">
        <Label for="username" class="text-end">Username</Label>
        <Input id="username" value="@peduarte" />
      </div>
    </div>
    <Sheet.Footer>
      <Button type="submit">Save changes</Button>
      <Sheet.Close class={buttonVariants({ variant: "outline" })}
        >Close</Sheet.Close
      >
    </Sheet.Footer>
  </Sheet.Content>
</Sheet.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add sheet
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add sheet
```

---

## Sidebar

**URL:** https://www.shadcn-svelte.com/docs/components/sidebar

**Contents:**

- Sidebar
- Installation
- Structure
- Usage
- Your First Sidebar
- Components
- Sidebar.Provider
  - Props
  - Width
  - Keyboard Shortcut

A composable, themeable and customizable sidebar component.

Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts.

Shad doesn't like building sidebars, so he built 30+ of them with all kinds of configurations. The core components have been extracted into sidebar-\*.svelte files, and you can use them in your own projects.

We now have a solid foundation to build on top of. Composable. Themeable. Customizable.

Browse the Blocks Library.

We'll go over the colors later in the theming section.

Copy and paste the following code into your project.

We'll go over the colors later in the theming section.

A Sidebar component is composed of the following parts:

Let's start with the most basic sidebar. A collapsible sidebar with a menu.

Add a Sidebar.Provider and Sidebar.Trigger at the root of your application.

Create a new sidebar component at src/lib/components/app-sidebar.svelte.

Now, let's add a Sidebar.Menu to the sidebar.

We'll use the Sidebar.Menu component in a Sidebar.Group.

The components in the sidebar-\*.svelte files are built to be composable i.e you build your sidebar by putting the provided components together. They also compose well with other shadcn-svelte components such as DropdownMenu, Collapsible, Dialog, etc.

If you need to change the code in the sidebar-\*.svelte files, you are encouraged to do so. The code is yours. Use the provided components as a starting point to build your own

In the next sections, we'll go over each component and how to use them.

The Sidebar.Provider component is used to provide the sidebar context to the Sidebar component. You should always wrap your application in a Sidebar.Provider component.

If you have a single sidebar in your application, you can use the SIDEBAR_WIDTH and SIDEBAR_WIDTH_MOBILE constants in src/lib/components/ui/sidebar/constants.ts to set the width of the sidebar.

For multiple sidebars in your application, you can use the style prop to set the width of the sidebar.

To set the width of the sidebar, you can use the --sidebar-width and --sidebar-width-mobile CSS variables in the style prop.

This will not only handle the width of the sidebar but also the layout spacing.

The SIDEBAR_KEYBOARD_SHORTCUT variable in src/lib/components/ui/sidebar/constants.ts is used to set the keyboard shortcut used to open and close the sidebar.

To trigger the sidebar, you use the cmd+b keyboard shortcut on Mac and ctrl+b on Windows.

You can change the keyboard shortcut by changing the value of the SIDEBAR_KEYBOARD_SHORTCUT variable.

The main Sidebar component used to render a collapsible sidebar.

Use the side prop to change the side of the sidebar.

Available options are left and right.

Use the variant prop to change the variant of the sidebar.

Available options are sidebar, floating and inset.

Note: If you use the inset variant, remember to wrap your main content in a SidebarInset component.

Use the collapsible prop to make the sidebar collapsible.

Available options are offcanvas, icon and none.

The useSidebar function is used to hook into the sidebar context. It returns a reactive class instance, so it cannot be destructured. Additionally, it must be called during the lifecycle of the component.

Use the Sidebar.Header component to add a sticky header to the sidebar.

The following example adds a <DropdownMenu> to the Sidebar.Header.

Use the Sidebar.Footer component to add a sticky footer to the sidebar.

The following example adds a <DropdownMenu> to the Sidebar.Footer.

The Sidebar.Content component is used to wrap the content of the sidebar. This is where you add your Sidebar.Group components. It is scrollable.

Use the Sidebar.Group component to create a section within the sidebar.

A Sidebar.Group has a Sidebar.GroupLabel, a Sidebar.GroupContent and an optional Sidebar.GroupAction.

To make a Sidebar.Group collapsible, wrap it in a Collapsible.

Note: We wrap the Collapsible.Trigger in a Sidebar.GroupLabel to render a button.

Use the Sidebar.GroupAction component to add an action to a Sidebar.Group.

The Sidebar.Menu component is used for building a menu within a Sidebar.Group.

A Sidebar.Menu is composed of Sidebar.MenuItem, Sidebar.MenuButton, Sidebar.MenuAction, and Sidebar.MenuSub components.

Here's an example of a Sidebar.Menu component rendering a list of projects.

The Sidebar.MenuButton component is used to render a menu button within a Sidebar.Menu.

By default, the Sidebar.MenuButton renders a button, but you can use the child snippet to render a different component such as an <a> tag.

You can render an icon and a truncated label inside the button. Remember to wrap the label in a <span> tag.

Use the isActive prop to mark a menu item as active.

The Sidebar.MenuAction component is used to render a menu action within a Sidebar.Menu.

This button works independently of the Sidebar.MenuButton, i.e. you can have the Sidebar.MenuButton as a clickable link and the Sidebar.MenuAction as a button.

Here's an example of a Sidebar.MenuAction that renders a DropdownMenu.

The Sidebar.MenuSub component is used to render a submenu within a Sidebar.Menu.

Use Sidebar.MenuSubItem and Sidebar.MenuSubButton to render a submenu item.

To make a Sidebar.Menu collapsible, wrap it and the Sidebar.MenuSub components in a Collapsible.

The Sidebar.MenuBadge component is used to render a badge within a Sidebar.MenuItem.

The Sidebar.MenuSkeleton component is used to render a skeleton within a Sidebar.MenuItem. You can use this to show a loading state while waiting for data to load.

The Sidebar.Separator component is used to render a separator within a Sidebar.

Use the Sidebar.Trigger component to render a button that toggles the sidebar.

The Sidebar.Trigger component must be used within a Sidebar.Provider.

To create a custom trigger, you can use the useSidebar hook.

The Sidebar.Rail component is used to render a rail within a Sidebar.Root. This rail can be used to toggle the sidebar.

Use Svelte's Function Binding to control the sidebar state.

We use the following CSS variables to theme the sidebar.

We intentionally use different variables for the sidebar and the rest of the application to make it easy to have a sidebar that is styled differently from the rest of the application. Think a sidebar with a darker shade from the main application.

Here are some tips for styling the sidebar based on different states.

You can find more tips on using states for styling in this Twitter thread.

**Examples:**

Example 1 (python):

```python
pnpm dlx shadcn-svelte@latest add sidebar
```

Example 2 (python):

```python
pnpm dlx shadcn-svelte@latest add sidebar
```

Example 3 (python):

```python
npx shadcn-svelte@latest add sidebar
```

Example 4 (python):

```python
npx shadcn-svelte@latest add sidebar
```

---

## Skeleton

**URL:** https://www.shadcn-svelte.com/docs/components/skeleton

**Contents:**

- Skeleton
- Installation
- Usage
- Examples
- Card

Use to show a placeholder while content is loading.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
</script>

<div class="flex items-center space-x-4">
  <Skeleton class="size-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Skeleton } from "$lib/components/ui/skeleton/index.js";
</script>

<div class="flex items-center space-x-4">
  <Skeleton class="size-12 rounded-full" />
  <div class="space-y-2">
    <Skeleton class="h-4 w-[250px]" />
    <Skeleton class="h-4 w-[200px]" />
  </div>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add skeleton
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add skeleton
```

---

## Slider

**URL:** https://www.shadcn-svelte.com/docs/components/slider

**Contents:**

- Slider
- Installation
- Usage

An input where the user selects a value from within a given range.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Slider } from "$lib/components/ui/slider/index.js";

  let value = $state(50);
</script>

<Slider type="single" bind:value max={100} step={1} class="max-w-[70%]" />
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Slider } from "$lib/components/ui/slider/index.js";

  let value = $state(50);
</script>

<Slider type="single" bind:value max={100} step={1} class="max-w-[70%]" />
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add slider
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add slider
```

---

## Sonner

**URL:** https://www.shadcn-svelte.com/docs/components/sonner

**Contents:**

- Sonner
- About
- Installation
- Usage
- Examples
- Changelog
  - 2025-12 Icons

An opinionated toast component for Svelte.

The Sonner component is provided by svelte-sonner, which is a Svelte port of Sonner, originally created by Emil Kowalski for React.

By default, Sonner will use the user's system preferences to determine whether to show the light or dark theme. To get around this, you can either pass in a custom theme prop to the component, or simply use mode-watcher which you can hardcode to dark or light mode should you wish.

You can learn more about setting up Dark Mode support here.

If you wish to opt out of Dark Mode support, you can uninstall mode-watcher and remove the theme prop from the component after installing via CLI, or manually install the component and don't include mode-watcher

Install svelte-sonner:

Copy and paste the following code into your project.

We've updated the Sonner component to use icons from lucide. Update your sonner.svelte file to use the new icons.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button
  variant="outline"
  onclick={() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.info("Undo")
      }
    })}
>
  Show Toast
</Button>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button
  variant="outline"
  onclick={() =>
    toast("Event has been created", {
      description: "Sunday, December 03, 2023 at 9:00 AM",
      action: {
        label: "Undo",
        onClick: () => console.info("Undo")
      }
    })}
>
  Show Toast
</Button>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add sonner
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add sonner
```

---

## Spinner

**URL:** https://www.shadcn-svelte.com/docs/components/spinner

**Contents:**

- Spinner
- Installation
- Usage
- Customization
- Examples
  - Size
  - Color
  - Button
  - Badge
  - Input Group

An indicator that can be used to show a loading state.

Install @lucide/svelte:

Copy and paste the following code into your project.

You can replace the default spinner icon with any other icon by editing the Spinner component.

Use the size-\* utility class to change the size of the spinner.

Use the text-\* utility class to change the color of the spinner.

Add a spinner to a button to indicate a loading state. The <Button /> will handle the spacing between the spinner and the text.

You can also use a spinner inside a badge.

Input Group can have spinners inside <InputGroup.Addon>.

Use the spinner inside <Item.Media> to indicate a loading state.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
</script>

<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="muted">
    <Item.Media>
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title class="line-clamp-1">Processing payment...</Item.Title>
    </Item.Content>
    <Item.Content class="flex-none justify-end">
      <span class="text-sm tabular-nums">$100.00</span>
    </Item.Content>
  </Item.Root>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Spinner } from "$lib/components/ui/spinner/index.js";
  import * as Item from "$lib/components/ui/item/index.js";
</script>

<div class="flex w-full max-w-xs flex-col gap-4 [--radius:1rem]">
  <Item.Root variant="muted">
    <Item.Media>
      <Spinner />
    </Item.Media>
    <Item.Content>
      <Item.Title class="line-clamp-1">Processing payment...</Item.Title>
    </Item.Content>
    <Item.Content class="flex-none justify-end">
      <span class="text-sm tabular-nums">$100.00</span>
    </Item.Content>
  </Item.Root>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add spinner
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add spinner
```

---

## Switch

**URL:** https://www.shadcn-svelte.com/docs/components/switch

**Contents:**

- Switch
- Installation
- Usage

A control that allows the user to toggle between checked and not checked.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
</script>

<div class="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label for="airplane-mode">Airplane Mode</Label>
</div>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
</script>

<div class="flex items-center space-x-2">
  <Switch id="airplane-mode" />
  <Label for="airplane-mode">Airplane Mode</Label>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add switch
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add switch
```

---

## Table

**URL:** https://www.shadcn-svelte.com/docs/components/table

**Contents:**

- Table
- Installation
- Usage
- Data Table

A responsive table component.

Copy and paste the following code into your project.

You can use the <Table /> component to build more complex data tables. Combine it with @tanstack/table to create tables with sorting, filtering and pagination.

See the Data Table documentation for more information.

You can also see an example of a data table in the Tasks demo.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card"
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal"
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer"
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card"
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal"
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer"
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card"
    }
  ];
</script>

<Table.Root>
  <Table.Caption>A list of your recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Invoice</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Method</Table.Head>
      <Table.Head class="text-end">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each invoices as invoice (invoice)}
      <Table.Row>
        <Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
        <Table.Cell>{invoice.paymentStatus}</Table.Cell>
        <Table.Cell>{invoice.paymentMethod}</Table.Cell>
        <Table.Cell class="text-end">{invoice.totalAmount}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colspan={3}>Total</Table.Cell>
      <Table.Cell class="text-end">$2,500.00</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as Table from "$lib/components/ui/table/index.js";

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card"
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal"
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer"
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card"
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal"
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer"
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card"
    }
  ];
</script>

<Table.Root>
  <Table.Caption>A list of your recent invoices.</Table.Caption>
  <Table.Header>
    <Table.Row>
      <Table.Head class="w-[100px]">Invoice</Table.Head>
      <Table.Head>Status</Table.Head>
      <Table.Head>Method</Table.Head>
      <Table.Head class="text-end">Amount</Table.Head>
    </Table.Row>
  </Table.Header>
  <Table.Body>
    {#each invoices as invoice (invoice)}
      <Table.Row>
        <Table.Cell class="font-medium">{invoice.invoice}</Table.Cell>
        <Table.Cell>{invoice.paymentStatus}</Table.Cell>
        <Table.Cell>{invoice.paymentMethod}</Table.Cell>
        <Table.Cell class="text-end">{invoice.totalAmount}</Table.Cell>
      </Table.Row>
    {/each}
  </Table.Body>
  <Table.Footer>
    <Table.Row>
      <Table.Cell colspan={3}>Total</Table.Cell>
      <Table.Cell class="text-end">$2,500.00</Table.Cell>
    </Table.Row>
  </Table.Footer>
</Table.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add table
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add table
```

---

## Tabs

**URL:** https://www.shadcn-svelte.com/docs/components/tabs

**Contents:**

- Tabs
- Installation
- Usage

A set of layered sections of content—known as tab panels—that are displayed one at a time.

Make changes to your account here. Click save when you're done.

Change your password here. After saving, you'll be logged out.

Copy and paste the following code into your project.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="-mb-4 flex w-full max-w-sm flex-col gap-6">
  <Tabs.Root value="account">
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      <Card.Root>
        <Card.Header>
          <Card.Title>Account</Card.Title>
          <Card.Description>
            Make changes to your account here. Click save when you&apos;re done.
          </Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-name">Name</Label>
            <Input id="tabs-demo-name" value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-username">Username</Label>
            <Input id="tabs-demo-username" value="@peduarte" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button>Save changes</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="password">
      <Card.Root>
        <Card.Header>
          <Card.Title>Password</Card.Title>
          <Card.Description>
            Change your password here. After saving, you&apos;ll be logged out.
          </Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-current">Current password</Label>
            <Input id="tabs-demo-current" type="password" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-new">New password</Label>
            <Input id="tabs-demo-new" type="password" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button>Save password</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import * as Tabs from "$lib/components/ui/tabs/index.js";
  import * as Card from "$lib/components/ui/card/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Label } from "$lib/components/ui/label/index.js";
</script>

<div class="-mb-4 flex w-full max-w-sm flex-col gap-6">
  <Tabs.Root value="account">
    <Tabs.List>
      <Tabs.Trigger value="account">Account</Tabs.Trigger>
      <Tabs.Trigger value="password">Password</Tabs.Trigger>
    </Tabs.List>
    <Tabs.Content value="account">
      <Card.Root>
        <Card.Header>
          <Card.Title>Account</Card.Title>
          <Card.Description>
            Make changes to your account here. Click save when you&apos;re done.
          </Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-name">Name</Label>
            <Input id="tabs-demo-name" value="Pedro Duarte" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-username">Username</Label>
            <Input id="tabs-demo-username" value="@peduarte" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button>Save changes</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
    <Tabs.Content value="password">
      <Card.Root>
        <Card.Header>
          <Card.Title>Password</Card.Title>
          <Card.Description>
            Change your password here. After saving, you&apos;ll be logged out.
          </Card.Description>
        </Card.Header>
        <Card.Content class="grid gap-6">
          <div class="grid gap-3">
            <Label for="tabs-demo-current">Current password</Label>
            <Input id="tabs-demo-current" type="password" />
          </div>
          <div class="grid gap-3">
            <Label for="tabs-demo-new">New password</Label>
            <Input id="tabs-demo-new" type="password" />
          </div>
        </Card.Content>
        <Card.Footer>
          <Button>Save password</Button>
        </Card.Footer>
      </Card.Root>
    </Tabs.Content>
  </Tabs.Root>
</div>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add tabs
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add tabs
```

---

## Textarea

**URL:** https://www.shadcn-svelte.com/docs/components/textarea

**Contents:**

- Textarea
- Installation
- Usage
- Examples
  - Default
  - Disabled
  - With Label
  - With Text
  - With Button

Displays a form textarea or a component that looks like a textarea.

Copy and paste the following code into your project.

Your message will be copied to the support team.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<Textarea placeholder="Type your message here." />
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<Textarea placeholder="Type your message here." />
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add textarea
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add textarea
```

---

## Toggle Group

**URL:** https://www.shadcn-svelte.com/docs/components/toggle-group

**Contents:**

- Toggle Group
- Installation
- Usage
- Examples
  - Outline
  - Single
  - Small
  - Large
  - Disabled
  - Spacing

A set of two-state buttons that can be toggled on or off.

Copy and paste the following code into your project.

Use spacing={2} to add spacing between toggle group items.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
  <ToggleGroup.Item
    value="star"
    aria-label="Toggle star"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
  >
    <StarIcon />
    Star
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="heart"
    aria-label="Toggle heart"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
  >
    <HeartIcon />
    Heart
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="bookmark"
    aria-label="Toggle bookmark"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
  >
    <BookmarkIcon />
    Bookmark
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import * as ToggleGroup from "$lib/components/ui/toggle-group/index.js";
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import HeartIcon from "@lucide/svelte/icons/heart";
  import StarIcon from "@lucide/svelte/icons/star";
</script>

<ToggleGroup.Root type="multiple" variant="outline" spacing={2} size="sm">
  <ToggleGroup.Item
    value="star"
    aria-label="Toggle star"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-yellow-500 data-[state=on]:*:[svg]:stroke-yellow-500"
  >
    <StarIcon />
    Star
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="heart"
    aria-label="Toggle heart"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-red-500 data-[state=on]:*:[svg]:stroke-red-500"
  >
    <HeartIcon />
    Heart
  </ToggleGroup.Item>
  <ToggleGroup.Item
    value="bookmark"
    aria-label="Toggle bookmark"
    class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
  >
    <BookmarkIcon />
    Bookmark
  </ToggleGroup.Item>
</ToggleGroup.Root>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add toggle-group
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add toggle-group
```

---

## Toggle

**URL:** https://www.shadcn-svelte.com/docs/components/toggle

**Contents:**

- Toggle
- Installation
- Usage
- Examples
  - Default
  - Outline
  - With Text
  - Small
  - Large
  - Disabled

A two-state button that can be either on or off.

Copy and paste the following code into your project.

**Examples:**

Example 1 (jsx):

```jsx
<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>
```

Example 2 (jsx):

```jsx
<script lang="ts">
  import BookmarkIcon from "@lucide/svelte/icons/bookmark";
  import { Toggle } from "$lib/components/ui/toggle/index.js";
</script>

<Toggle
  aria-label="Toggle bookmark"
  size="sm"
  variant="outline"
  class="data-[state=on]:bg-transparent data-[state=on]:*:[svg]:fill-blue-500 data-[state=on]:*:[svg]:stroke-blue-500"
>
  <BookmarkIcon />
  Bookmark
</Toggle>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add toggle
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add toggle
```

---

## Tooltip

**URL:** https://www.shadcn-svelte.com/docs/components/tooltip

**Contents:**

- Tooltip
- Installation
- Usage
  - Nested Providers
- Changelog
  - 2025-12 Update tooltip colors

A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.

Copy and paste the following code into your project.

The Tooltip.Provider component should be placed once in your root layout, wrapping all content that will contain tooltips. This ensures that only one tooltip within the provider can be open at a time.

Then use tooltips anywhere in your app:

You can nest providers to create groups with different settings. Tooltips use the closest ancestor provider. This is useful when you want instant tooltips in specific areas:

We've updated the tooltip colors to use the foreground color for the background and the background color for the foreground.

Replace bg-primary text-primary-foreground with bg-foreground text-background for <Tooltip.Content />.

**Examples:**

Example 1 (typescript):

```typescript
<script lang="ts">
  import { buttonVariants } from "../ui/button/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger class={buttonVariants({ variant: "outline" })}
      >Hover</Tooltip.Trigger
    >
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
```

Example 2 (typescript):

```typescript
<script lang="ts">
  import { buttonVariants } from "../ui/button/index.js";
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";
</script>

<Tooltip.Provider>
  <Tooltip.Root>
    <Tooltip.Trigger class={buttonVariants({ variant: "outline" })}
      >Hover</Tooltip.Trigger
    >
    <Tooltip.Content>
      <p>Add to library</p>
    </Tooltip.Content>
  </Tooltip.Root>
</Tooltip.Provider>
```

Example 3 (python):

```python
pnpm dlx shadcn-svelte@latest add tooltip
```

Example 4 (python):

```python
pnpm dlx shadcn-svelte@latest add tooltip
```

---

## Typography

**URL:** https://www.shadcn-svelte.com/docs/components/typography

**Contents:**

- Typography
- Taxing Laughter: The Joke Tax Chronicles
- The King's Plan
  - The Joke Tax
  - Jokester's Revolt
  - The People's Rebellion
- h1
- Taxing Laughter: The Joke Tax Chronicles
- h2
- The People of the Kingdom

Styles for headings, paragraphs, lists...etc

We do not ship any typography styles by default. This page is an example of how you can use utility classes to style your text.

Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.

The king thought long and hard, and finally came up with a brilliant plan : he would tax the jokes in the kingdom.

The king's subjects were not amused. They grumbled and complained, but the king was firm:

As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.

Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.

And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.

The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.

The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.

The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.

The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.

A modal dialog that interrupts the user with important content and expects a response.

Enter your email address.

**Examples:**

Example 1 (typescript):

```typescript
<div>
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
    Taxing Laughter: The Joke Tax Chronicles
  </h1>
  <p class="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6">
    Once upon a time, in a far-off land, there was a very lazy king who spent
    all day lounging on his throne. One day, his advisors came to him with a
    problem: the kingdom was running out of money.
  </p>
  <h2
    class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    The King&apos;s Plan
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king thought long and hard, and finally came up with
    <a href="##" class="text-primary font-medium underline underline-offset-4">
      a brilliant plan
    </a>
    : he would tax the jokes in the kingdom.
  </p>
  <blockquote class="mt-6 border-s-2 ps-6 italic">
    &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
    it&apos;s only fair that they should pay for the privilege.&quot;
  </blockquote>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The Joke Tax
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king&apos;s subjects were not amused. They grumbled and complained, but
    the king was firm:
  </p>
  <ul class="my-6 ms-6 list-disc [&>li]:mt-2">
    <li>1st level of puns: 5 gold coins</li>
    <li>2nd level of jokes: 10 gold coins</li>
    <li>3rd level of one-liners : 20 gold coins</li>
  </ul>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    As a result, people stopped telling jokes, and the kingdom fell into a
    gloom. But there was one person who refused to let the king&apos;s
    foolishness get him down: a court jester named Jokester.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    Jokester&apos;s Revolt
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    Jokester began sneaking into the castle in the middle of the night and
    leaving jokes all over the place: under the king&apos;s pillow, in his soup,
    even in the royal toilet. The king was furious, but he couldn&apos;t seem to
    stop Jokester.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    And then, one day, the people of the kingdom discovered that the jokes left
    by Jokester were so funny that they couldn&apos;t help but laugh. And once
    they started laughing, they couldn&apos;t stop.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The People&apos;s Rebellion
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The people of the kingdom, feeling uplifted by the laughter, started to tell
    jokes and puns again, and soon the entire kingdom was in on the joke.
  </p>
  <div class="my-6 w-full overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr class="even:bg-muted m-0 border-t p-0">
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            King&apos;s Treasury
          </th>
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            People&apos;s happiness
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Empty
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Overflowing
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Modest
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Satisfied
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Full
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Ecstatic
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king, seeing how much happier his subjects were, realized the error of
    his ways and repealed the joke tax. Jokester was declared a hero, and the
    kingdom lived happily ever after.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The moral of the story is: never underestimate the power of a good laugh and
    always be careful of bad ideas.
  </p>
</div>
```

Example 2 (typescript):

```typescript
<div>
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
    Taxing Laughter: The Joke Tax Chronicles
  </h1>
  <p class="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6">
    Once upon a time, in a far-off land, there was a very lazy king who spent
    all day lounging on his throne. One day, his advisors came to him with a
    problem: the kingdom was running out of money.
  </p>
  <h2
    class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    The King&apos;s Plan
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king thought long and hard, and finally came up with
    <a href="##" class="text-primary font-medium underline underline-offset-4">
      a brilliant plan
    </a>
    : he would tax the jokes in the kingdom.
  </p>
  <blockquote class="mt-6 border-s-2 ps-6 italic">
    &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
    it&apos;s only fair that they should pay for the privilege.&quot;
  </blockquote>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The Joke Tax
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king&apos;s subjects were not amused. They grumbled and complained, but
    the king was firm:
  </p>
  <ul class="my-6 ms-6 list-disc [&>li]:mt-2">
    <li>1st level of puns: 5 gold coins</li>
    <li>2nd level of jokes: 10 gold coins</li>
    <li>3rd level of one-liners : 20 gold coins</li>
  </ul>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    As a result, people stopped telling jokes, and the kingdom fell into a
    gloom. But there was one person who refused to let the king&apos;s
    foolishness get him down: a court jester named Jokester.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    Jokester&apos;s Revolt
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    Jokester began sneaking into the castle in the middle of the night and
    leaving jokes all over the place: under the king&apos;s pillow, in his soup,
    even in the royal toilet. The king was furious, but he couldn&apos;t seem to
    stop Jokester.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    And then, one day, the people of the kingdom discovered that the jokes left
    by Jokester were so funny that they couldn&apos;t help but laugh. And once
    they started laughing, they couldn&apos;t stop.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The People&apos;s Rebellion
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The people of the kingdom, feeling uplifted by the laughter, started to tell
    jokes and puns again, and soon the entire kingdom was in on the joke.
  </p>
  <div class="my-6 w-full overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr class="even:bg-muted m-0 border-t p-0">
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            King&apos;s Treasury
          </th>
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            People&apos;s happiness
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Empty
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Overflowing
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Modest
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Satisfied
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Full
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Ecstatic
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king, seeing how much happier his subjects were, realized the error of
    his ways and repealed the joke tax. Jokester was declared a hero, and the
    kingdom lived happily ever after.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The moral of the story is: never underestimate the power of a good laugh and
    always be careful of bad ideas.
  </p>
</div>
```

Example 3 (jsx):

```jsx
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  Taxing Laughter: The Joke Tax Chronicles
</h1>
```

Example 4 (jsx):

```jsx
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  Taxing Laughter: The Joke Tax Chronicles
</h1>
```

---

## Svelte

**URL:** https://www.shadcn-svelte.com/docs/dark-mode/svelte

**Contents:**

- Svelte
- Install mode-watcher
- Add the ModeWatcher component
- Add a mode toggle

Adding dark mode to your Svelte site.

Start by installing mode-watcher:

Import the ModeWatcher component and use it in your root layout:

Place a mode toggle on your site to toggle between light and dark mode.

**Examples:**

Example 1 (unknown):

```unknown
pnpm i mode-watcher
```

Example 2 (unknown):

```unknown
pnpm i mode-watcher
```

Example 3 (unknown):

```unknown
npm i mode-watcher
```

Example 4 (unknown):

```unknown
npm i mode-watcher
```

---

## Astro

**URL:** https://www.shadcn-svelte.com/docs/dark-mode/astro

**Contents:**

- Astro
- Usage
  - Create an inline theme script
  - Install mode-watcher
  - Add the ModeWatcher component
  - Create a mode toggle
    - Light switch
    - Dropdown menu
  - Add mode toggle to page

Adding dark mode to your Astro site.

Just like in regular Svelte, we use the class strategy from Tailwind CSS to support dark mode toggling. See the Tailwind CSS documentation for more information.

How you add the dark class to the html element is up to you. In this guide, we'll take a look at enabling dark mode toggling with mode-watcher.

This script will, in part, keep and track the dark mode value in localStorage and prevent FUOC.

Import the ModeWatcher component and use it in your page with the client:load directive:

Create a mode toggle on your site to toggle between light and dark mode:

Add the mode toggle to the page (also with the client:load directive):

**Examples:**

Example 1 (html):

```html
---
import "../styles/global.css";
---

<script is:inline>
  const isBrowser = typeof localStorage !== 'undefined';
  const getThemePreference = () => {
    if (isBrowser && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  };
  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (isBrowser) {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

Example 2 (html):

```html
---
import "../styles/global.css";
---

<script is:inline>
  const isBrowser = typeof localStorage !== 'undefined';
  const getThemePreference = () => {
    if (isBrowser && localStorage.getItem('theme')) {
      return localStorage.getItem('theme');
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark' : 'light';
  };
  const isDark = getThemePreference() === 'dark';
  document.documentElement.classList[isDark ? 'add' : 'remove']('dark');

  if (isBrowser) {
    const observer = new MutationObserver(() => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    });
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class']
    });
  }
</script>

<html lang="en">
	<body>
      <h1>Astro</h1>
	</body>
</html>
</script>
```

Example 3 (python):

```python
pnpm i mode-watcher@0.5.1
```

Example 4 (python):

```python
pnpm i mode-watcher@0.5.1
```

---
