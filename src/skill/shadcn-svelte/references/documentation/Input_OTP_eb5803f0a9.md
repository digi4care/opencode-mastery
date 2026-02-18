# Input OTP

**Source**: https://www.shadcn-svelte.com/docs/components/input-otp

## Table of Contents

- [About](#about)
- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [Pattern](#pattern)
  - [Separator](#separator)
  - [Controlled](#controlled)
  - [Form](#form)

## Content

Accessible one-time password component with copy paste functionality.

Input OTP is built on top of Bits UI's PinInput which is inspired by @guilherme_rodz's Input OTP component.

Copy and paste the following code into your project.

Use the pattern prop to define a custom pattern for the OTP input.

You can use the InputOTP.Separator component to add a separator between the groups of cells.

## Code Examples

### Example 1

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 2

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add input-otp
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add input-otp
```

### Example 5

```python
npx shadcn-svelte@latest add input-otp
```

### Example 6

```python
npx shadcn-svelte@latest add input-otp
```

### Example 7

```python
npx shadcn-svelte@latest add input-otp
```

### Example 8

```python
npx shadcn-svelte@latest add input-otp
```

### Example 9

```python
bun x shadcn-svelte@latest add input-otp
```

### Example 10

```python
bun x shadcn-svelte@latest add input-otp
```

### Example 11

```unknown
pnpm i bits-ui -D
```

### Example 12

```unknown
pnpm i bits-ui -D
```

### Example 13

```unknown
npm i bits-ui -D
```

### Example 14

```unknown
npm i bits-ui -D
```

### Example 15

```unknown
yarn install bits-ui -D
```

### Example 16

```unknown
yarn install bits-ui -D
```

### Example 17

```unknown
bun install bits-ui -D
```

### Example 18

```unknown
bun install bits-ui -D
```

### Example 19

```sql
import Root from "./input-otp.svelte";
import Group from "./input-otp-group.svelte";
import Slot from "./input-otp-slot.svelte";
import Separator from "./input-otp-separator.svelte";

export {
  Root,
  Group,
  Slot,
  Separator,
  Root as InputOTP,
  Group as InputOTPGroup,
  Slot as InputOTPSlot,
  Separator as InputOTPSeparator,
};
```

### Example 20

```sql
import Root from "./input-otp.svelte";
import Group from "./input-otp-group.svelte";
import Slot from "./input-otp-slot.svelte";
import Separator from "./input-otp-separator.svelte";

export {
  Root,
  Group,
  Slot,
  Separator,
  Root as InputOTP,
  Group as InputOTPGroup,
  Slot as InputOTPSlot,
  Separator as InputOTPSeparator,
};
```

### Example 21

```jsx
<script lang="ts">import * as InputOTP from "$lib/components/ui/input-otp/index.js";</script>
```

### Example 22

```jsx
<script lang="ts">import * as InputOTP from "$lib/components/ui/input-otp/index.js";</script>
```

### Example 23

```json
<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 24

```json
<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 3) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(3, 6) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 25

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 26

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 27

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <!-- ... -->
</InputOTP.Root>
```

### Example 28

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import { REGEXP_ONLY_DIGITS_AND_CHARS } from "bits-ui";
</script>

<InputOTP.Root maxlength={6} pattern={REGEXP_ONLY_DIGITS_AND_CHARS}>
  <!-- ... -->
</InputOTP.Root>
```

### Example 29

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 2) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(2, 4) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(4, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 30

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={6}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 2) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(2, 4) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(4, 6) as cell (cell)}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 31

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={4}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 2) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(2, 4) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 32

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
</script>

<InputOTP.Root maxlength={4}>
  {#snippet children({ cells })}
    <InputOTP.Group>
      {#each cells.slice(0, 2) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
    <InputOTP.Separator />
    <InputOTP.Group>
      {#each cells.slice(2, 4) as cell}
        <InputOTP.Slot {cell} />
      {/each}
    </InputOTP.Group>
  {/snippet}
</InputOTP.Root>
```

### Example 33

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";

  let value = $state("");
</script>

<div class="space-y-2">
  <InputOTP.Root maxlength={6} bind:value>
    {#snippet children({ cells })}
      <InputOTP.Group>
        {#each cells.slice(0, 6) as cell (cell)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
  <div class="text-center text-sm">
    {value === "" ? "Enter your one-time password." : `You entered: ${value}`}
  </div>
</div>
```

### Example 34

```jsx
<script lang="ts">
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";

  let value = $state("");
</script>

<div class="space-y-2">
  <InputOTP.Root maxlength={6} bind:value>
    {#snippet children({ cells })}
      <InputOTP.Group>
        {#each cells.slice(0, 6) as cell (cell)}
          <InputOTP.Slot {cell} />
        {/each}
      </InputOTP.Group>
    {/snippet}
  </InputOTP.Root>
  <div class="text-center text-sm">
    {value === "" ? "Enter your one-time password." : `You entered: ${value}`}
  </div>
</div>
```

### Example 35

```typescript
<script lang="ts" module>
  import { z } from "zod/v4";
  const formSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be at least 6 characters."
    })
  });
</script>

<script lang="ts">
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import { toast } from "svelte-sonner";
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import * as Form from "$lib/components/ui/form/index.js";

  const form = superForm(defaults(zod4(formSchema)), {
    validators: zod4(formSchema),
    SPA: true,
    onUpdate: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" class="w-2/3 space-y-6" use:enhance>
  <Form.Field {form} name="pin">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>One-Time Password</Form.Label>
        <InputOTP.Root maxlength={6} {...props} bind:value={$formData.pin}>
          {#snippet children({ cells })}
            <InputOTP.Group>
              {#each cells as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
          {/snippet}
        </InputOTP.Root>
      {/snippet}
    </Form.Control>
    <Form.Description
      >Please enter the one-time password sent to your phone.</Form.Description
    >
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
```

### Example 36

```typescript
<script lang="ts" module>
  import { z } from "zod/v4";
  const formSchema = z.object({
    pin: z.string().min(6, {
      message: "Your one-time password must be at least 6 characters."
    })
  });
</script>

<script lang="ts">
  import { defaults, superForm } from "sveltekit-superforms";
  import { zod4 } from "sveltekit-superforms/adapters";
  import { toast } from "svelte-sonner";
  import * as InputOTP from "$lib/components/ui/input-otp/index.js";
  import * as Form from "$lib/components/ui/form/index.js";

  const form = superForm(defaults(zod4(formSchema)), {
    validators: zod4(formSchema),
    SPA: true,
    onUpdate: ({ form: f }) => {
      if (f.valid) {
        toast.success(`You submitted ${JSON.stringify(f.data, null, 2)}`);
      } else {
        toast.error("Please fix the errors in the form.");
      }
    }
  });

  const { form: formData, enhance } = form;
</script>

<form method="POST" class="w-2/3 space-y-6" use:enhance>
  <Form.Field {form} name="pin">
    <Form.Control>
      {#snippet children({ props })}
        <Form.Label>One-Time Password</Form.Label>
        <InputOTP.Root maxlength={6} {...props} bind:value={$formData.pin}>
          {#snippet children({ cells })}
            <InputOTP.Group>
              {#each cells as cell (cell)}
                <InputOTP.Slot {cell} />
              {/each}
            </InputOTP.Group>
          {/snippet}
        </InputOTP.Root>
      {/snippet}
    </Form.Control>
    <Form.Description
      >Please enter the one-time password sent to your phone.</Form.Description
    >
    <Form.FieldErrors />
  </Form.Field>
  <Form.Button>Submit</Form.Button>
</form>
```

## Sections

## About

## Installation

## Usage

## Examples

### Pattern

### Separator

### Controlled

### Form
