# registry-item.json

**Source**: https://www.shadcn-svelte.com/docs/registry/registry-item-json

## Table of Contents

- [Definitions](#definitions)
  - [$schema](#$schema)
  - [name](#name)
  - [title](#title)
  - [description](#description)
  - [type](#type)
  - [author](#author)
  - [dependencies](#dependencies)
  - [registryDependencies](#registrydependencies)
    - [shadcn-svelte Registry Item](#shadcn-svelte-registry-item)
    - [Remote URL](#remote-url)
    - [Local alias (when building with the CLI)](#local-alias-when-building-with-the-cli)
    - [Relative Path](#relative-path)
  - [files](#files)
    - [path](#path)
    - [type](#type)
    - [target](#target)
  - [cssVars](#cssvars)
  - [css](#css)
  - [docs](#docs)
  - [categories](#categories)
  - [meta](#meta)

## Content

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

## Code Examples

### Example 1

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

### Example 2

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

### Example 3

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json"
}
```

### Example 4

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry-item.json"
}
```

### Example 5

```json
{
  "name": "hello-world"
}
```

### Example 6

```json
{
  "name": "hello-world"
}
```

### Example 7

```json
{
  "title": "Hello World"
}
```

### Example 8

```json
{
  "title": "Hello World"
}
```

### Example 9

```json
{
  "description": "A simple hello world component."
}
```

### Example 10

```json
{
  "description": "A simple hello world component."
}
```

### Example 11

```json
{
  "type": "registry:block"
}
```

### Example 12

```json
{
  "type": "registry:block"
}
```

### Example 13

```json
{
  "author": "John Doe <john@doe.com>"
}
```

### Example 14

```json
{
  "author": "John Doe <john@doe.com>"
}
```

### Example 15

```json
{
  "dependencies": ["bits-ui", "zod", "@lucide/svelte", "name@1.0.2"]
}
```

### Example 16

```json
{
  "dependencies": ["bits-ui", "zod", "@lucide/svelte", "name@1.0.2"]
}
```

### Example 17

```json
{
  "registryDependencies": ["button", "input", "select"]
}
```

### Example 18

```json
{
  "registryDependencies": ["button", "input", "select"]
}
```

### Example 19

```json
{
  "registryDependencies": ["https://example.com/r/hello-world.json"]
}
```

### Example 20

```json
{
  "registryDependencies": ["https://example.com/r/hello-world.json"]
}
```

### Example 21

```json
{
  "items": [
    {
      "name": "hello-world",
      "registryDependencies": ["local:stepper"]
    }
  ]
}
```

### Example 22

```json
{
  "items": [
    {
      "name": "hello-world",
      "registryDependencies": ["local:stepper"]
    }
  ]
}
```

### Example 23

```json
{
  "registryDependencies": ["./stepper.json"]
}
```

### Example 24

```json
{
  "registryDependencies": ["./stepper.json"]
}
```

### Example 25

```json
{
  "registryDependencies": ["./stepper.json"]
}
```

### Example 26

```json
{
  "registryDependencies": ["./stepper.json"]
}
```

### Example 27

```json
{
  "files": [
    {
      "path": "registry/hello-world/page.svelte",
      "type": "registry:page",
      "target": "src/routes/hello/+page.svelte"
    },
    {
      "path": "registry/hello-world/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/use-hello-world.svelte.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/hello-world/.env",
      "type": "registry:file",
      "target": ".env"
    }
  ]
}
```

### Example 28

```json
{
  "files": [
    {
      "path": "registry/hello-world/page.svelte",
      "type": "registry:page",
      "target": "src/routes/hello/+page.svelte"
    },
    {
      "path": "registry/hello-world/hello-world.svelte",
      "type": "registry:component"
    },
    {
      "path": "registry/hello-world/use-hello-world.svelte.ts",
      "type": "registry:hook"
    },
    {
      "path": "registry/hello-world/.env",
      "type": "registry:file",
      "target": ".env"
    }
  ]
}
```

### Example 29

```json
{
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%",
      "radius": "0.5rem"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

### Example 30

```json
{
  "cssVars": {
    "theme": {
      "font-heading": "Poppins, sans-serif"
    },
    "light": {
      "brand": "20 14.3% 4.1%",
      "radius": "0.5rem"
    },
    "dark": {
      "brand": "20 14.3% 4.1%"
    }
  }
}
```

### Example 31

```json
{
  "css": {
    "@layer base": {
      "body": {
        "font-size": "var(--text-base)",
        "line-height": "1.5"
      }
    },
    "@layer components": {
      "button": {
        "background-color": "var(--color-primary)",
        "color": "var(--color-white)"
      }
    },
    "@utility text-magic": {
      "font-size": "var(--text-base)",
      "line-height": "1.5"
    },
    "@keyframes wiggle": {
      "0%, 100%": {
        "transform": "rotate(-3deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      }
    }
  }
}
```

### Example 32

```json
{
  "css": {
    "@layer base": {
      "body": {
        "font-size": "var(--text-base)",
        "line-height": "1.5"
      }
    },
    "@layer components": {
      "button": {
        "background-color": "var(--color-primary)",
        "color": "var(--color-white)"
      }
    },
    "@utility text-magic": {
      "font-size": "var(--text-base)",
      "line-height": "1.5"
    },
    "@keyframes wiggle": {
      "0%, 100%": {
        "transform": "rotate(-3deg)"
      },
      "50%": {
        "transform": "rotate(3deg)"
      }
    }
  }
}
```

### Example 33

```json
{
  "docs": "Remember to add the FOO_BAR environment variable to your .env file."
}
```

### Example 34

```json
{
  "docs": "Remember to add the FOO_BAR environment variable to your .env file."
}
```

### Example 35

```json
{
  "categories": ["sidebar", "dashboard"]
}
```

### Example 36

```json
{
  "categories": ["sidebar", "dashboard"]
}
```

### Example 37

```json
{
  "meta": { "foo": "bar" }
}
```

### Example 38

```json
{
  "meta": { "foo": "bar" }
}
```

## Sections

## Definitions

### $schema

### name

### title

### description

### type

### author

### dependencies

### registryDependencies

#### shadcn-svelte Registry Item

#### Remote URL

#### Local alias (when building with the CLI)

#### Relative Path

### files

#### path

#### type

#### target

### cssVars

### css

### docs

### categories

### meta
