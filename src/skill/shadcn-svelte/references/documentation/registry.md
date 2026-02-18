# Shadcn-Svelte_Docs - Registry

**Pages:** 6

---

## Registry

**URL:** https://www.shadcn-svelte.com/docs/registry

**Contents:**

- Registry
- Requirements

Run your own component registry.

Note: This feature is currently experimental. Help us improve it by testing it out and sending feedback. If you have any questions, please reach out to us.

You can use the shadcn-svelte CLI to create your own component registry. Creating your own registry allows you to distribute your own custom components, hooks, pages, and other files to any Svelte project.

Registry items are automatically compatible with the shadcn-svelte CLI.

You are free to design and host your custom registry as you see fit. The only requirement is that your registry items must be valid JSON files that conform to the registry-item schema specification.

If you'd like to see an example of a registry, we have a template project for you to use as a starting point.

You can clone it using degit

**Examples:**

Example 1 (unknown):

```unknown
pnpm dlx degit huntabyte/shadcn-svelte/registry-template#next-tailwind-4
```

Example 2 (unknown):

```unknown
pnpm dlx degit huntabyte/shadcn-svelte/registry-template#next-tailwind-4
```

Example 3 (unknown):

```unknown
npx degit huntabyte/shadcn-svelte/registry-template#next-tailwind-4
```

Example 4 (unknown):

```unknown
npx degit huntabyte/shadcn-svelte/registry-template#next-tailwind-4
```

---

## Getting Started

**URL:** https://www.shadcn-svelte.com/docs/registry/getting-started

**Contents:**

- Getting Started
- registry.json
  - Add a registry.json file
- Add a registry item
  - Create your component
  - Add your component to the registry
- Build your registry
  - Install the shadcn-svelte CLI
  - Add a build script
  - Run the build script

Learn how to get setup and run your own component registry.

This guide will walk you through the process of setting up your own component registry.

It assumes you already have a project with components and would like to turn it into a registry.

If you're starting a new registry project, you can use the registry template as a starting point. It's already configured for you.

The registry.json file is only required if you're using the shadcn-svelte CLI to build your registry.

If you're using a different build system, you can skip this step as long as your build system produces valid JSON files that conform to the registry-item schema specification.

Create a registry.json file in the root of your project.

This registry.json file must conform to the registry schema specification.

Add your first component. Here's an example of a simple <HelloWorld /> component:

Note: This example places the component in the registry/ directory. You can place it anywhere in your project as long as you set the correct path in the registry.json file and you follow the registry/[NAME] directory structure.

Important: If you're placing your component in a custom directory, make sure it can be detected by Tailwind CSS.

To add your component to the registry, you need to add your component definition to registry.json.

You define your registry item by adding a name, type, title, description and files.

For every file you add, you must specify the path and type of the file. The path is the relative path to the file from the root of your project. The type is the type of the file.

You can read more about the registry item schema and file types in the registry item schema docs.

Add a registry:build script to your package.json file.

Run the build script to generate the registry JSON files.

Note: By default, the build script will generate the registry JSON files in static/r e.g static/r/hello-world.json.

You can change the output directory by passing the --output option. See the shadcn-svelte registry build command for more information.

You can serve your registry by running the dev server.

Your files will now be served at http://localhost:5173/r/[NAME].json eg. http://localhost:5173/r/hello-world.json.

To make your registry available to other developers, you can publish it by deploying your project to a public URL.

The shadcn-svelte CLI does not offer a built-in way to add auth to your registry. We recommend handling authorization on your registry server.

A common simple approach is to use a token query parameter to authenticate requests to your registry. e.g. http://localhost:5173/r/hello-world.json?token=[SECURE_TOKEN_HERE].

Use the secure token to authenticate requests and return a 401 Unauthorized response if the token is invalid. The shadcn-svelte CLI will handle the 401 response and display a message to the user.

Note: Make sure to encrypt and expire tokens.

Here are some guidelines to follow when building components for a registry.

To install a registry item using the shadcn-svelte CLI, use the add command followed by the URL of the registry item.

**Examples:**

Example 1 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

Example 2 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    // ...
  ]
}
```

Example 3 (jsx):

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Hello World</Button>
```

Example 4 (jsx):

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Hello World</Button>
```

---

## FAQ

**URL:** https://www.shadcn-svelte.com/docs/registry/faq

**Contents:**

- FAQ
- Frequently asked questions
  - What does a complex component look like?
  - How do I add a new Tailwind color?
  - How do I add or override a Tailwind theme variable?

Frequently asked questions about running a registry.

Here's an example of a complex component that installs a page, two components, a hook, a format-date utils and a config file.

To add a new color you need to add it to cssVars under light and dark keys.

The CLI will update the project CSS file. Once updated, the new colors will be available to be used as utility classes: bg-brand and text-brand-accent.

To add or override a theme variable you add it to cssVars.theme under the key you want to add or override.

**Examples:**

Example 1 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/hello-world/page.svelte",
      "type": "registry:page",
      "target": "src/routes/hello/+page.svelte"
    },
    {
      "path": "registry/hello-world/components/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/components/formatted-message.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/hooks/use-hello.svelte.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/hello-world/lib/format-date.ts",
      "type": "registry:utils"
    },
    {
      "path": "registry/hello-world/hello.config.ts",
      "type": "registry:file",
      "target": "hello.config.ts"
    }
  ]
}
```

Example 2 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    {
      "path": "registry/hello-world/page.svelte",
      "type": "registry:page",
      "target": "src/routes/hello/+page.svelte"
    },
    {
      "path": "registry/hello-world/components/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/components/formatted-message.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/hooks/use-hello.svelte.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/hello-world/lib/format-date.ts",
      "type": "registry:utils"
    },
    {
      "path": "registry/hello-world/hello.config.ts",
      "type": "registry:file",
      "target": "hello.config.ts"
    }
  ]
}
```

Example 3 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    },
    "dark": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    }
  }
}
```

Example 4 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A complex hello world component",
  "files": [
    // ...
  ],
  "cssVars": {
    "light": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    },
    "dark": {
      "brand-background": "20 14.3% 4.1%",
      "brand-accent": "20 14.3% 4.1%"
    }
  }
}
```

---

## Examples

**URL:** https://www.shadcn-svelte.com/docs/registry/examples

**Contents:**

- Examples
- registry:style
  - Custom style that extends shadcn-svelte
  - Custom style from scratch
- registry:theme
  - Custom theme
  - Custom colors
- registry:block
  - Custom block
  - Install a block and override primitives

Examples of registry items: styles, components, css vars, etc.

The following registry item is a custom style that extends shadcn/ui. On npx shadcn-svelte@latest init, it will:

The following registry item is a custom style that doesn't extend shadcn-svelte. See the extends: none field.

It can be used to create a new style from scratch i.e. custom components, css vars, dependencies, etc.

On npx shadcn-svelte@latest add, the following will:

The following style will init using shadcn-svelte defaults and then add a custom brand color.

This blocks installs the login-01 block from the shadcn-svelte registry.

You can install a block from the shadcn-svelte registry and override the primitives using your custom ones.

On npx shadcn-svelte@latest add, the following will:

Add custom theme variables to the theme object.

Note: you need to define both @keyframes in css and theme in cssVars to use animations.

**Examples:**

Example 1 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "example-style",
  "type": "registry:style",
  "dependencies": ["phosphor-svelte"],
  "registryDependencies": ["login-01", "calendar", "https://example.com/r/editor.json"],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "brand": "oklch(0.145 0 0)"
    },
    "dark": {
      "brand": "oklch(0.145 0 0)"
    }
  }
}
```

Example 2 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "example-style",
  "type": "registry:style",
  "dependencies": ["phosphor-svelte"],
  "registryDependencies": ["login-01", "calendar", "https://example.com/r/editor.json"],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif"
    },
    "light": {
      "brand": "oklch(0.145 0 0)"
    },
    "dark": {
      "brand": "oklch(0.145 0 0)"
    }
  }
}
```

Example 3 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "extends": "none",
  "name": "new-style",
  "type": "registry:style",
  "dependencies": ["tailwind-merge", "clsx"],
  "registryDependencies": [
    "utils",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json",
    "https://example.com/r/select.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif",
    }
    "light": {
      "main": "#88aaee",
      "bg": "#dfe5f2",
      "border": "#000",
      "text": "#000",
      "ring": "#000",
    },
    "dark": {
      "main": "#88aaee",
      "bg": "#272933",
      "border": "#000",
      "text": "#e6e6e6",
      "ring": "#fff",
    }
  }
}
```

Example 4 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "extends": "none",
  "name": "new-style",
  "type": "registry:style",
  "dependencies": ["tailwind-merge", "clsx"],
  "registryDependencies": [
    "utils",
    "https://example.com/r/button.json",
    "https://example.com/r/input.json",
    "https://example.com/r/label.json",
    "https://example.com/r/select.json"
  ],
  "cssVars": {
    "theme": {
      "font-sans": "Inter, sans-serif",
    }
    "light": {
      "main": "#88aaee",
      "bg": "#dfe5f2",
      "border": "#000",
      "text": "#000",
      "ring": "#000",
    },
    "dark": {
      "main": "#88aaee",
      "bg": "#272933",
      "border": "#000",
      "text": "#e6e6e6",
      "ring": "#fff",
    }
  }
}
```

---

## registry.json

**URL:** https://www.shadcn-svelte.com/docs/registry/registry-json

**Contents:**

- registry.json
- Definitions
  - $schema
  - name
  - homepage
  - items
  - aliases
  - overrideDependencies

Schema for running your own component registry.

The registry.json schema is used to define your custom component registry.

You can see the JSON Schema for registry.json here.

The $schema property is used to specify the schema for the registry.json file.

The name property is used to specify the name of your registry. This is used for data attributes and other metadata.

The homepage of your registry. This is used for data attributes and other metadata.

The items in your registry. Each item must implement the registry-item schema specification.

See the registry-item schema documentation for more information.

aliases define how your registry's internal import paths will be transformed when users install your components. These should match how you import components within your registry code.

For example, if your registry's component has:

Then your registry.json should have matching aliases:

When users install your component, these paths will be transformed according to their components.json configuration. The aliases you define here are the "source" paths that will be replaced.

Default aliases (if you don't specify any):

overrideDependencies lets you force specific version ranges for dependencies, overriding what shadcn-svelte registry build detects in your package.json.

Warning: Overriding dependencies can lead to version conflicts if not carefully managed. This option should be used sparingly.

Example transformation:

When the user installs your component, the latest @next version will be used instead of 1.0.0-next.1

**Examples:**

Example 1 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "shadcn-svelte",
  "homepage": "https://shadcn-svelte.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "src/lib/registry/blocks/hello-world/hello-world.svelte",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Example 2 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "shadcn-svelte",
  "homepage": "https://shadcn-svelte.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "src/lib/registry/blocks/hello-world/hello-world.svelte",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

Example 3 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json"
}
```

Example 4 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json"
}
```

---

## registry-item.json

**URL:** https://www.shadcn-svelte.com/docs/registry/registry-item-json

**Contents:**

- registry-item.json
- Definitions
  - $schema
  - name
  - title
  - description
  - type
  - author
  - dependencies
  - registryDependencies

Specification for registry items.

The registry-item.json schema is used to define your custom registry items.

You can see the JSON Schema for registry-item.json here.

The $schema property is used to specify the schema for the registry-item.json file.

The name of the item. This is used to identify the item in the registry. It should be unique for your registry.

A human-readable title for your registry item. Keep it short and descriptive.

A description of your registry item. This can be longer and more detailed than the title.

The type property is used to specify the type of your registry item. This is used to determine the type and target path of the item when resolved for a project.

The following types are supported:

The author property is used to specify the author of the registry item.

It can be unique to the registry item or the same as the author of the registry.

The dependencies property is used to specify the dependencies of your registry item. This is for npm packages.

Use @version to specify the version of your registry item.

Defines other registry items that this item depends on.

Each entry may be one of the following:

The name of a shadcn-svelte registry item (e.g., 'button', 'input', 'select'), which will resolve to that item in the shadcn-svelte registry.

A full URL to a custom registry item (e.g. https://example.com/r/hello-world.json)

If you're defining the item in registry.json and using the CLI to build the registry, you can use a name prefixed with local: (e.g. local:stepper) to reference an item in the current registry. The CLI will convert this to a relative path (e.g. ./stepper.json) in the output registry-item.json file.

Which the CLI will convert to the following in the output registry-item.json file:

If you're not using the CLI and defining the item directly in its registry-item.json file, you can specify a relative path, which is relative to the current item, to reference another item in the registry (e.g. ./stepper.json).

The files property is used to specify the files of your registry item. Each file has a path, type and target (optional) property.

The target property is required for registry:page and registry:file types.

The path property is used to specify the path to the file in your registry. This path is used by the build script to parse, transform and build the registry JSON payload.

The type property is used to specify the type of the file. See the type section for more information.

The target property is used to indicate where the file should be placed in a project. This is optional and only required for registry:page and registry:file types.

By default, the shadcn-svelte cli will read a project's components.json file to determine the target path. For some files, such as routes or config you can specify the target path manually.

Use ~ to refer to the root of the project e.g ~/foo.config.js.

Use to define CSS variables for your registry item.

Use css to add new rules to the project's CSS file eg. @layer base, @layer components, @utility, @keyframes, etc.

Use docs to show custom documentation or message when installing your registry item via the CLI.

Use categories to organize your registry item.

Use meta to add additional metadata to your registry item. You can add any key/value pair that you want to be available to the registry item.

**Examples:**

Example 1 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A simple hello world component.",
  "files": [
    {
      "path": "registry/hello-world/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/use-hello-world.svelte.ts",
      "type": "registry:hook"
    }
  ],
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

Example 2 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json",
  "name": "hello-world",
  "title": "Hello World",
  "type": "registry:block",
  "description": "A simple hello world component.",
  "files": [
    {
      "path": "registry/hello-world/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/use-hello-world.svelte.ts",
      "type": "registry:hook"
    }
  ],
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

Example 3 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json"
}
```

Example 4 (json):

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json"
}
```

---
