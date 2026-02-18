# Releases

## v4.1.18: v4.1.18

**Published**: 2025-12-11

### Fixed

- Ensure validation of `source(…)` happens relative to the file it is in ([#19274](https://github.com/tailwindlabs/tailwindcss/pull/19274))
- Include filename and line numbers in CSS parse errors ([#19282](https://github.com/tailwindlabs/tailwindcss/pull/19282))
- Skip comments in Ruby files when checking for class names ([#19243](https://github.com/tailwindlabs/tailwindcss/pull/19243))
- Skip over arbitrary property utilities with a top-level `!` in the value ([#19243](https://g

## v3.4.19: v3.4.19

**Published**: 2025-12-10

### Fixed

- Don’t break `sibling-*()` functions when used inside `calc(…)` ([#19335](https://github.com/tailwindlabs/tailwindcss/pull/19335))


## v4.1.17: v4.1.17

**Published**: 2025-11-06

### Fixed

- Substitute `@variant` inside legacy JS APIs ([#19263](https://github.com/tailwindlabs/tailwindcss/pull/19263))
- Prevent occasional crash on Windows when loaded into a worker thread ([#19242](https://github.com/tailwindlabs/tailwindcss/pull/19242))


## v4.1.16: v4.1.16

**Published**: 2025-10-23

### Fixed

- Discard candidates with an empty data type ([#19172](https://github.com/tailwindlabs/tailwindcss/pull/19172))
- Fix canonicalization of arbitrary variants with attribute selectors ([#19176](https://github.com/tailwindlabs/tailwindcss/pull/19176))
- Fix invalid colors due to nested `&` ([#19184](https://github.com/tailwindlabs/tailwindcss/pull/19184))
- Improve canonicalization for `& > :pseudo` and `& :pseudo` arbitrary variants ([#19178](https://github.com/tailwindlabs/tailwin

## v4.1.15: v4.1.15

**Published**: 2025-10-20

### Fixed

- Fix Safari devtools rendering issue due to `color-mix` fallback ([#19069](https://github.com/tailwindlabs/tailwindcss/pull/19069))
- Suppress Lightning CSS warnings about `:deep`, `:slotted`, and `:global` ([#19094](https://github.com/tailwindlabs/tailwindcss/pull/19094))
- Fix resolving theme keys when starting with the name of another theme key in JS configs and plugins ([#19097](https://github.com/tailwindlabs/tailwindcss/pull/19097))
- Allow named groups in combination with

## v4.1.14: v4.1.14

**Published**: 2025-10-01

### Fixed

- Handle `'` syntax in ClojureScript when extracting classes ([#18888](https://github.com/tailwindlabs/tailwindcss/pull/18888))
- Handle `@variant` inside `@custom-variant` ([#18885](https://github.com/tailwindlabs/tailwindcss/pull/18885))
- Merge suggestions when using `@utility` ([#18900](https://github.com/tailwindlabs/tailwindcss/pull/18900))
- Ensure that file system watchers created when using the CLI are always cleaned up ([#18905](https://github.com/tailwindlabs/tailwindc

## v3.4.18: v3.4.18

**Published**: 2025-10-01

### Fixed

- Improve support for raw `supports-[…]` queries in arbitrary values ([#13605](https://github.com/tailwindlabs/tailwindcss/pull/13605))
- Fix `require.cache` error when loaded through a TypeScript file in Node 22.18+ ([#18665](https://github.com/tailwindlabs/tailwindcss/pull/18665))
- Support `import.meta.resolve(…)` in configs for new enough Node.js versions ([#18938](https://github.com/tailwindlabs/tailwindcss/pull/18938))
- Allow using newer versions of `postcss-load-config` f

## v4.1.13: v4.1.13

**Published**: 2025-09-04

### Changed

- Drop warning from browser build ([#18731](https://github.com/tailwindlabs/tailwindcss/issues/18731))
- Drop exact duplicate declarations when emitting CSS ([#18809](https://github.com/tailwindlabs/tailwindcss/issues/18809))

### Fixed

- Don't transition `visibility` when using `transition` ([#18795](https://github.com/tailwindlabs/tailwindcss/pull/18795))
- Discard matched variants with unknown named values ([#18799](https://github.com/tailwindlabs/tailwindcss/pull/18799)

## v4.1.12: v4.1.12

**Published**: 2025-08-14

### Fixed

- Don't consider the global important state in `@apply` ([#18404](https://github.com/tailwindlabs/tailwindcss/pull/18404))
- Add missing suggestions for `flex-<number>` utilities ([#18642](https://github.com/tailwindlabs/tailwindcss/pull/18642))
- Fix trailing `)` from interfering with extraction in Clojure keywords ([#18345](https://github.com/tailwindlabs/tailwindcss/pull/18345))
- Detect classes inside Elixir charlist, word list, and string sigils ([#18432](https://github.com/

## v4.1.11: v4.1.11

**Published**: 2025-06-26

### Fixed

- Add heuristic to skip candidate migrations inside `emit(…)` ([#18330](https://github.com/tailwindlabs/tailwindcss/pull/18330))
- Extract candidates with variants in Clojure/ClojureScript keywords ([#18338](https://github.com/tailwindlabs/tailwindcss/pull/18338))
- Document `--watch=always` in the CLI's usage ([#18337](https://github.com/tailwindlabs/tailwindcss/pull/18337))
- Add support for Vite 7 to `@tailwindcss/vite` ([#18384](https://github.com/tailwindlabs/tailwindcss/pul

