# Minimal Tool Example

This tier shows the smallest useful tool:

- One Zod schema
- One handler
- Predictable return shape

## Files

- `index.ts` - exports `echoText`

## How To Use In A Plugin

In your plugin's `index.ts`:

```ts
import { echoText } from "<path-to>/minimal-tool";

export default async function myPlugin(context) {
  return {
    tool: [echoText],
  };
}
```

Tip: See `../../plugins/intermediate-plugin/index.ts` for a complete "tools in a plugin" example.

## Expected Output

`echoText({ text: "hello", uppercase: true })` returns:

```json
{
  "success": true,
  "data": { "echoed": "HELLO" },
  "metadata": { "length": 5, "uppercaseApplied": true }
}
```
