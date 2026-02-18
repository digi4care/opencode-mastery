# Installation

**Source**: https://www.shadcn-svelte.com/docs/installation

## Table of Contents

- [Guides](#guides)
- [Imports](#imports)
- [VSCode extension](#vscode-extension)
- [JetBrains IDEs extension](#jetbrains-ides-extension)

## Content

How to install dependencies and structure your app.

Unlike the original shadcn/ui for React, where the full components can exist in a single file, components in this port are split into multiple files. This is because Svelte doesn't support defining multiple components in a single file, so utilizing the CLI to add components will be the optimal approach.

The CLI will create a folder for each component, which will sometimes just contain a single Svelte file, and in other times, multiple files. Within each folder, there will be an index.ts file that exports the component(s), so you can import them from a single file.

For example, the Accordion component is split into four .svelte files:

They can then be imported from the accordion/index.ts file like so:

Regardless of the import approach you take, the components will be tree-shaken by Rollup, so you don't have to worry about unused components being bundled into your app.

Install the shadcn-svelte VSCode extension by @selemondev in Visual Studio Code to easily add Shadcn Svelte components to your project.

This extension offers a range of features:

Install the shadcn/ui Components Manager JetBrains extension by @WarningImHack3r in any JetBrains IDE (IntelliJ IDEA, WebStorm...) to easily manage shadcn components within your project.

This extension offers a range of features, including:

## Code Examples

### Example 1

```sql
import * as Accordion from '$lib/components/ui/accordion"
// or
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "$lib/components/ui/accordion"
```

### Example 2

```sql
import * as Accordion from '$lib/components/ui/accordion"
// or
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from "$lib/components/ui/accordion"
```

## Sections

## Guides

## Imports

## VSCode extension

## JetBrains IDEs extension
