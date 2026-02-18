# Getting Started

**Source**: https://www.shadcn-svelte.com/docs/registry/getting-started

## Table of Contents

- [registry.json](#registry.json)
  - [Add a registry.json file](#add-a-registry.json-file)
- [Add a registry item](#add-a-registry-item)
  - [Create your component](#create-your-component)
  - [Add your component to the registry](#add-your-component-to-the-registry)
- [Build your registry](#build-your-registry)
  - [Install the shadcn-svelte CLI](#install-the-shadcn-svelte-cli)
  - [Add a build script](#add-a-build-script)
  - [Run the build script](#run-the-build-script)
- [Serve your registry](#serve-your-registry)
- [Publish your registry](#publish-your-registry)
- [Adding Auth](#adding-auth)
- [Guidelines](#guidelines)
- [Install using the CLI](#install-using-the-cli)

## Content

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

## Code Examples

### Example 1

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

### Example 2

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

### Example 3

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Hello World</Button>
```

### Example 4

```jsx
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
</script>

<Button>Hello World</Button>
```

### Example 5

```unknown
registry
└── hello-world
    └── hello-world.svelte
```

### Example 6

```unknown
registry
└── hello-world
    └── hello-world.svelte
```

### Example 7

```python
@source "./registry/@acmecorp/ui-lib";
```

### Example 8

```python
@source "./registry/@acmecorp/ui-lib";
```

### Example 9

```json
{
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "./src/lib/hello-world/hello-world.svelte",
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
  "$schema": "https://shadcn-svelte.com/schema/registry.json",
  "name": "acme",
  "homepage": "https://acme.com",
  "items": [
    {
      "name": "hello-world",
      "type": "registry:block",
      "title": "Hello World",
      "description": "A simple hello world component.",
      "files": [
        {
          "path": "./src/lib/hello-world/hello-world.svelte",
          "type": "registry:component"
        }
      ]
    }
  ]
}
```

### Example 11

```python
pnpm i shadcn-svelte@latest
```

### Example 12

```python
pnpm i shadcn-svelte@latest
```

### Example 13

```python
npm i shadcn-svelte@latest
```

### Example 14

```python
npm i shadcn-svelte@latest
```

### Example 15

```python
yarn install shadcn-svelte@latest
```

### Example 16

```python
yarn install shadcn-svelte@latest
```

### Example 17

```python
bun install shadcn-svelte@latest
```

### Example 18

```python
bun install shadcn-svelte@latest
```

### Example 19

```json
{
  "scripts": {
    "registry:build": "pnpm shadcn-svelte registry build"
  }
}
```

### Example 20

```json
{
  "scripts": {
    "registry:build": "pnpm shadcn-svelte registry build"
  }
}
```

### Example 21

```unknown
pnpm run registry:build
```

### Example 22

```unknown
pnpm run registry:build
```

### Example 23

```unknown
npm run registry:build
```

### Example 24

```unknown
npm run registry:build
```

### Example 25

```unknown
yarn run registry:build
```

### Example 26

```unknown
yarn run registry:build
```

### Example 27

```unknown
bun run registry:build
```

### Example 28

```unknown
bun run registry:build
```

### Example 29

```unknown
pnpm run dev
```

### Example 30

```unknown
pnpm run dev
```

### Example 31

```unknown
npm run dev
```

### Example 32

```unknown
npm run dev
```

### Example 33

```unknown
yarn run dev
```

### Example 34

```unknown
yarn run dev
```

### Example 35

```unknown
bun run dev
```

### Example 36

```unknown
bun run dev
```

### Example 37

```python
pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 38

```python
pnpm dlx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 39

```python
npx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 40

```python
npx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 41

```python
npx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 42

```python
npx shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 43

```python
bun x shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

### Example 44

```python
bun x shadcn-svelte@latest add http://localhost:5173/r/hello-world.json
```

## Sections

## registry.json

### Add a registry.json file

## Add a registry item

### Create your component

### Add your component to the registry

## Build your registry

### Install the shadcn-svelte CLI

### Add a build script

### Run the build script

## Serve your registry

## Publish your registry

## Adding Auth

## Guidelines

## Install using the CLI
