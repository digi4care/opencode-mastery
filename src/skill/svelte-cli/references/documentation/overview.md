# Svelte-Cli_Docs - Overview

**Pages:** 1

---

## Overview

**URL:** llms-txt#overview

**Contents:**

- Usage
- Acknowledgements

The command line interface (CLI), `sv`, is a toolkit for creating and maintaining Svelte applications.

The easiest way to run `sv` is with [`npx`](https://docs.npmjs.com/cli/v8/commands/npx) (or the equivalent command if you're using a different package manager — for example, `pnpx` if you're using [pnpm](https://pnpm.io/)):

If you're inside a project where `sv` is already installed, this will use the local installation, otherwise it will download the latest version and run it without installing it, which is particularly useful for [`sv create`](sv-create).

Thank you to [Christopher Brown](https://github.com/chbrown) who originally owned the `sv` name on npm for graciously allowing it to be used for the Svelte CLI. You can find the original `sv` package at [`@chbrown/sv`](https://www.npmjs.com/package/@chbrown/sv).

**Examples:**

Example 1 (sh):

```sh
npx sv <command> <args>
```

---
