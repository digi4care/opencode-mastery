# Releases

## @sveltejs/kit@2.49.2: @sveltejs/kit@2.49.2

**Published**: 2025-12-08

### Patch Changes

- fix: Stop re-loading already-loaded CSS during server-side route resolution ([#15014](https://github.com/sveltejs/kit/pull/15014))

- fix: posixify the instrumentation file import on Windows ([#14993](https://github.com/sveltejs/kit/pull/14993))

- fix: Correctly handle shared memory when decoding binary form data ([#15028](https://github.com/sveltejs/kit/pull/15028))

## @sveltejs/kit@2.49.1: @sveltejs/kit@2.49.1

**Published**: 2025-12-02

### Patch Changes

- fix: suppress `state_referenced_locally` warnings in `.svelte-kit/generated/root.svelte` ([#15013](https://github.com/sveltejs/kit/pull/15013))

- fix: TypeError when doing response.clone() in page load ([#15005](https://github.com/sveltejs/kit/pull/15005))

## @sveltejs/package@2.5.7: @sveltejs/package@2.5.7

**Published**: 2025-11-26

### Patch Changes

- chore(deps): update dependency chokidar to v5 ([#14986](https://github.com/sveltejs/kit/pull/14986))

## @sveltejs/enhanced-img@0.9.2: @sveltejs/enhanced-img@0.9.2

**Published**: 2025-11-26

### Patch Changes

- chore: remove duplicate caching layer ([#14988](https://github.com/sveltejs/kit/pull/14988))

## @sveltejs/adapter-vercel@6.2.0: @sveltejs/adapter-vercel@6.2.0

**Published**: 2025-11-26

### Minor Changes

- feat: Node 24 support ([#14982](https://github.com/sveltejs/kit/pull/14982))

## @sveltejs/enhanced-img@0.9.1: @sveltejs/enhanced-img@0.9.1

**Published**: 2025-11-24

### Patch Changes

- fix: update vite-imagetools for caching fixes to avoid crashes ([#14976](https://github.com/sveltejs/kit/pull/14976))

## @sveltejs/package@2.5.6: @sveltejs/package@2.5.6

**Published**: 2025-11-20

### Patch Changes

- fix: transform `.ts` extensions to `.js` in import/export statements of Svelte files when using `rewriteRelativeImportExtensions` ([#14936](https://github.com/sveltejs/kit/pull/14936))

## @sveltejs/package@2.5.5: @sveltejs/package@2.5.5

**Published**: 2025-11-20

### Patch Changes

- fix: resolve aliases before transpiling for `rewriteRelativeImportExtensions` ([#14673](https://github.com/sveltejs/kit/pull/14673))

## @sveltejs/kit@2.49.0: @sveltejs/kit@2.49.0

**Published**: 2025-11-20

### Minor Changes

- feat: stream file uploads inside `form` remote functions allowing form data to be accessed before large files finish uploading ([#14775](https://github.com/sveltejs/kit/pull/14775))

## @sveltejs/kit@2.48.8: @sveltejs/kit@2.48.8

**Published**: 2025-11-20

### Patch Changes

- breaking: `invalid` now must be imported from `@sveltejs/kit` ([#14768](https://github.com/sveltejs/kit/pull/14768))

- breaking: remove `submitter` option from experimental form `validate()` method, always provide default submitter ([#14762](https://github.com/sveltejs/kit/pull/14762))
