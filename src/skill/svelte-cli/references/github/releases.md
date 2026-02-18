# Releases

## sv@0.11.0: sv@0.11.0

**Published**: 2025-12-21

### Minor Changes

- feat(cloudflare): able to fully setup cloudflare adapter for workers/pages ([#851](https://github.com/sveltejs/cli/pull/851))

## sv@0.10.8: sv@0.10.8

**Published**: 2025-12-12

### Patch Changes

- fix(paraglide): git ignore cache of inlang project ([#844](https://github.com/sveltejs/cli/pull/844))

- fix(paraglide): multi language when prerendering is now working by default ([#844](https://github.com/sveltejs/cli/pull/844))

- fix(prettier): `prettier-plugin-tailwindcss` plugin is now last in the list ([#845](https://github.com/sveltejs/cli/pull/845))

## sv@0.10.7: sv@0.10.7

**Published**: 2025-12-05

### Patch Changes

- fix(add): storybook is back to using `@latest` version ([#833](https://github.com/sveltejs/cli/pull/833))

## sv@0.10.6: sv@0.10.6

**Published**: 2025-11-30

### Patch Changes

- fix(cli): files will be formatted after create ([#827](https://github.com/sveltejs/cli/pull/827))

## sv@0.10.5: sv@0.10.5

**Published**: 2025-11-26

### Patch Changes

- fix(cli): reload workspace before executing each addon ([#823](https://github.com/sveltejs/cli/pull/823))

- chore(create): remove `esModuleInterop` from library template ([#822](https://github.com/sveltejs/cli/pull/822))

- fix(create): correctly detect executing package manager ([#823](https://github.com/sveltejs/cli/pull/823))

## sv@0.10.4: sv@0.10.4

**Published**: 2025-11-24

### Patch Changes

- fix(cli): `dependencyVersion` is now properly populated during `sv create` ([#819](https://github.com/sveltejs/cli/pull/819))

## sv@0.10.3: sv@0.10.3

**Published**: 2025-11-23

### Patch Changes

- fix(cli): fix `svelte.config.js` detection during create ([#817](https://github.com/sveltejs/cli/pull/817))

- fix(cli): `kit` projects were detected incorrectly ([#810](https://github.com/sveltejs/cli/pull/810))

## sv@0.9.15: sv@0.9.15

**Published**: 2025-11-21

### Patch Changes

- fix(tailwind): update vscode setting `files.associations` to `tailwindcss` ([#796](https://github.com/sveltejs/cli/pull/796))

- feat(cli): add `--no-dir-check` option to `sv create`. With this flag, even if the folder is not empty, no prompt will be shown ([#785](https://github.com/sveltejs/cli/pull/785))

- feat(mcp): include an `AGENTS.md` or similar when using the `mcp` addon ([#777](https://github.com/sveltejs/cli/pull/777))

- feat(vitest): when `add vitest`

## sv@0.10.2: sv@0.10.2

**Published**: 2025-11-21

### Patch Changes

- fix(cli): printed args now also display path used during directory prompt ([#805](https://github.com/sveltejs/cli/pull/805))

- fix(mcp): use consistent wording for setup question ([#806](https://github.com/sveltejs/cli/pull/806))

## sv@0.10.1: sv@0.10.1

**Published**: 2025-11-21

### Patch Changes

- fix(cli): avoid printing duplicated `--no-install` flag ([#803](https://github.com/sveltejs/cli/pull/803))
