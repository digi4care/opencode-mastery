# Advanced Tool Example

This tier shows how to organize a small toolset for maintainability.

## Structure

```
advanced-tool/
├── index.ts
├── tools/
│   ├── normalize-text.ts
│   ├── text-stats.ts
│   ├── parse-json.ts
│   └── timestamp.ts
└── utils/
    ├── text.ts
    └── unknown-error.ts
```

## Highlights

- `utils/` contains pure functions (easy to test and reuse)
- `tools/` contains thin handlers that validate inputs and call utilities
- `timestamp.ts` demonstrates a factory-style tool for dependency injection

## Using In A Plugin

```ts
import { toolset } from "<path-to>/advanced-tool";

export default async function myPlugin(context) {
  return {
    tool: toolset,
  };
}
```

## Tests

This example is structured to be testable, but tests are not included yet.

Recommended approach:

- Unit test `utils/` functions directly
- Smoke test tool handlers for `success` / `error` shapes
