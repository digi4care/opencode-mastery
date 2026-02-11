# Intermediate Tool Example

This tier shows how to group a few related tools and share pure helper logic.

## Tools

- `normalizeText` - Normalizes text using a small set of options
- `textStats` - Returns basic counts (chars/words/lines)

## Files

- `index.ts` - exports both tools

## Recommended Pattern

- Keep parsing/validation at the boundary (Zod schema)
- Put logic in small pure functions (easy to test and reuse)
- Return stable, structured output (`data` + optional `metadata`)

## Using In A Plugin

```ts
import { normalizeText, textStats } from "<path-to>/intermediate-tool";

export default async function myPlugin(context) {
  return {
    tool: [normalizeText, textStats],
  };
}
```
