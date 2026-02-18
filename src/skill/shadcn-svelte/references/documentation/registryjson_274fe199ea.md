# registry.json

**Source**: https://www.shadcn-svelte.com/docs/registry/registry-json

## Table of Contents

- [Definitions](#definitions)
  - [$schema](#$schema)
  - [name](#name)
  - [homepage](#homepage)
  - [items](#items)
  - [aliases](#aliases)
  - [overrideDependencies](#overridedependencies)

## Content

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

## Code Examples

### Example 1

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

### Example 2

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

### Example 3

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json"
}
```

### Example 4

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json"
}
```

### Example 5

```json
{
  "name": "acme"
}
```

### Example 6

```json
{
  "name": "acme"
}
```

### Example 7

```json
{
  "homepage": "https://acme.com"
}
```

### Example 8

```json
{
  "homepage": "https://acme.com"
}
```

### Example 9

```json
{
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

### Example 10

```json
{
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

### Example 11

```jsx
<script lang="ts">
  import {Button} from "@/lib/registry/ui/button/index.js"; import {cn} from "@/lib/utils.js";
</script>
```

### Example 12

```jsx
<script lang="ts">
  import {Button} from "@/lib/registry/ui/button/index.js"; import {cn} from "@/lib/utils.js";
</script>
```

### Example 13

```json
{
  "aliases": {
    "lib": "@/lib", // Matches your internal imports
    "ui": "@/lib/registry/ui", // Matches your internal imports
    "components": "@/lib/registry/components", // Matches your internal imports
    "utils": "@/lib/utils", // Matches your internal imports
    "hooks": "@/lib/hooks" // Matches your internal imports
  }
}
```

### Example 14

```json
{
  "aliases": {
    "lib": "@/lib", // Matches your internal imports
    "ui": "@/lib/registry/ui", // Matches your internal imports
    "components": "@/lib/registry/components", // Matches your internal imports
    "utils": "@/lib/utils", // Matches your internal imports
    "hooks": "@/lib/hooks" // Matches your internal imports
  }
}
```

### Example 15

```json
{
  "aliases": {
    "lib": "$lib/registry/lib", // For internal library code
    "ui": "$lib/registry/ui", // For UI components
    "components": "$lib/registry/components", // For component-specific code
    "utils": "$lib/utils", // For utility functions
    "hooks": "$lib/registry/hooks" // For reactive state and logic (.svelte.js|ts)
  }
}
```

### Example 16

```json
{
  "aliases": {
    "lib": "$lib/registry/lib", // For internal library code
    "ui": "$lib/registry/ui", // For UI components
    "components": "$lib/registry/components", // For component-specific code
    "utils": "$lib/utils", // For utility functions
    "hooks": "$lib/registry/hooks" // For reactive state and logic (.svelte.js|ts)
  }
}
```

### Example 17

```json
// Your registry's package.json
{
  "dependencies": {
    "paneforge": "1.0.0-next.1"
  }
}
```

### Example 18

```json
// Your registry's package.json
{
  "dependencies": {
    "paneforge": "1.0.0-next.1"
  }
}
```

### Example 19

```json
{
  "dependencies": {
    "paneforge": "1.0.0-next.1", // overrideDependencies: []
    "paneforge": "1.0.0-next.5" // overrideDependencies: ["paneforge@next"]
  }
}
```

### Example 20

```json
{
  "dependencies": {
    "paneforge": "1.0.0-next.1", // overrideDependencies: []
    "paneforge": "1.0.0-next.5" // overrideDependencies: ["paneforge@next"]
  }
}
```

## Sections

## Definitions

### $schema

### name

### homepage

### items

### aliases

### overrideDependencies
