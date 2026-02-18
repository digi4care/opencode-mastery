# Field

**Source**: https://www.shadcn-svelte.com/docs/components/field

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Anatomy](#anatomy)
- [Examples](#examples)
  - [Input](#input)
  - [Textarea](#textarea)
  - [Select](#select)
  - [Slider](#slider)
  - [Fieldset](#fieldset)
  - [Checkbox](#checkbox)
  - [Radio](#radio)
  - [Switch](#switch)
  - [Choice Card](#choice-card)
  - [Field Group](#field-group)
  - [Responsive Layout](#responsive-layout)
- [Validation and Errors](#validation-and-errors)
- [Accessibility](#accessibility)

## Content

Combine labels, controls, and help text to compose accessible form fields and grouped inputs.

All transactions are secure and encrypted

Enter your 16-digit number.

The billing address associated with your payment method

Copy and paste the following code into your project.

The Field family is designed for composing accessible forms. A typical field is structured as follows:

Choose a unique username for your account.

Must be at least 8 characters long.

Share your thoughts about our service.

Select your department or area of work.

Set your budget range ($200 - 800).

We need your address to deliver your order.

Select the items you want to show on the desktop.

Your Desktop & Documents folders are being synced with iCloud Drive. You can access them from other devices.

Yearly and lifetime plans offer significant savings.

Enable multi-factor authentication. If you do not have a two-factor device, you can use a one-time code sent to your email.

Wrap Field components inside FieldLabel to create selectable field groups. This works with RadioItem, Checkbox and Switch components.

Select the compute environment for your cluster.

Run GPU workloads on a K8s configured cluster.

Access a VM configured cluster to run GPU workloads.

Stack Field components with Field.Group. Add Field.Separator to divide them.

Get notified when ChatGPT responds to requests that take time, like research or image generation.

Get notified when tasks you've created have updates. Manage tasks

Fill in your profile information.

Provide your full name for identification

You can write your message here. Keep it short, preferably under 100 characters.

## Code Examples

### Example 1

```typescript
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";

  let month = $state<string>();
  let year = $state<string>();
</script>

<div class="w-full max-w-md">
  <form>
    <Field.Group>
      <Field.Set>
        <Field.Legend>Payment Method</Field.Legend>
        <Field.Description
          >All transactions are secure and encrypted</Field.Description
        >
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-card-name-43j"
              >Name on Card</Field.Label
            >
            <Input
              id="checkout-7j9-card-name-43j"
              placeholder="John Doe"
              required
            />
          </Field.Field>
          <div class="grid grid-cols-3 gap-4">
            <Field.Field class="col-span-2">
              <Field.Label for="checkout-7j9-card-number-uw1">
                Card Number
              </Field.Label>
              <Input
                id="checkout-7j9-card-number-uw1"
                placeholder="1234 5678 9012 3456"
                required
              />
              <Field.Description>Enter your 16-digit number.</Field.Description>
            </Field.Field>
            <Field.Field class="col-span-1">
              <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
              <Input id="checkout-7j9-cvv" placeholder="123" required />
            </Field.Field>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-month-ts6">Month</Field.Label>
              <Select.Root type="single" bind:value={month}>
                <Select.Trigger id="checkout-7j9-exp-month-ts6">
                  <span>
                    {month || "MM"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="01">01</Select.Item>
                  <Select.Item value="02">02</Select.Item>
                  <Select.Item value="03">03</Select.Item>
                  <Select.Item value="04">04</Select.Item>
                  <Select.Item value="05">05</Select.Item>
                  <Select.Item value="06">06</Select.Item>
                  <Select.Item value="07">07</Select.Item>
                  <Select.Item value="08">08</Select.Item>
                  <Select.Item value="09">09</Select.Item>
                  <Select.Item value="10">10</Select.Item>
                  <Select.Item value="11">11</Select.Item>
                  <Select.Item value="12">12</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
              <Select.Root type="single" bind:value={year}>
                <Select.Trigger id="checkout-7j9-exp-year-f59">
                  <span>
                    {year || "YYYY"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="2024">2024</Select.Item>
                  <Select.Item value="2025">2025</Select.Item>
                  <Select.Item value="2026">2026</Select.Item>
                  <Select.Item value="2027">2027</Select.Item>
                  <Select.Item value="2028">2028</Select.Item>
                  <Select.Item value="2029">2029</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
          </div>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Legend>Billing Address</Field.Legend>
        <Field.Description>
          The billing address associated with your payment method
        </Field.Description>
        <Field.Group>
          <Field.Field orientation="horizontal">
            <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
            <Field.Label
              for="checkout-7j9-same-as-shipping-wgm"
              class="font-normal"
            >
              Same as shipping address
            </Field.Label>
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-optional-comments"
              >Comments</Field.Label
            >
            <Textarea
              id="checkout-7j9-optional-comments"
              placeholder="Add any additional comments"
              class="resize-none"
            />
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline" type="button">Cancel</Button>
      </Field.Field>
    </Field.Group>
  </form>
</div>
```

### Example 2

```typescript
<script lang="ts">
  import { Button } from "$lib/components/ui/button/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import * as Select from "$lib/components/ui/select/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";

  let month = $state<string>();
  let year = $state<string>();
</script>

<div class="w-full max-w-md">
  <form>
    <Field.Group>
      <Field.Set>
        <Field.Legend>Payment Method</Field.Legend>
        <Field.Description
          >All transactions are secure and encrypted</Field.Description
        >
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-card-name-43j"
              >Name on Card</Field.Label
            >
            <Input
              id="checkout-7j9-card-name-43j"
              placeholder="John Doe"
              required
            />
          </Field.Field>
          <div class="grid grid-cols-3 gap-4">
            <Field.Field class="col-span-2">
              <Field.Label for="checkout-7j9-card-number-uw1">
                Card Number
              </Field.Label>
              <Input
                id="checkout-7j9-card-number-uw1"
                placeholder="1234 5678 9012 3456"
                required
              />
              <Field.Description>Enter your 16-digit number.</Field.Description>
            </Field.Field>
            <Field.Field class="col-span-1">
              <Field.Label for="checkout-7j9-cvv">CVV</Field.Label>
              <Input id="checkout-7j9-cvv" placeholder="123" required />
            </Field.Field>
          </div>
          <div class="grid grid-cols-2 gap-4">
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-month-ts6">Month</Field.Label>
              <Select.Root type="single" bind:value={month}>
                <Select.Trigger id="checkout-7j9-exp-month-ts6">
                  <span>
                    {month || "MM"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="01">01</Select.Item>
                  <Select.Item value="02">02</Select.Item>
                  <Select.Item value="03">03</Select.Item>
                  <Select.Item value="04">04</Select.Item>
                  <Select.Item value="05">05</Select.Item>
                  <Select.Item value="06">06</Select.Item>
                  <Select.Item value="07">07</Select.Item>
                  <Select.Item value="08">08</Select.Item>
                  <Select.Item value="09">09</Select.Item>
                  <Select.Item value="10">10</Select.Item>
                  <Select.Item value="11">11</Select.Item>
                  <Select.Item value="12">12</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
            <Field.Field>
              <Field.Label for="checkout-7j9-exp-year-f59">Year</Field.Label>
              <Select.Root type="single" bind:value={year}>
                <Select.Trigger id="checkout-7j9-exp-year-f59">
                  <span>
                    {year || "YYYY"}
                  </span>
                </Select.Trigger>
                <Select.Content>
                  <Select.Item value="2024">2024</Select.Item>
                  <Select.Item value="2025">2025</Select.Item>
                  <Select.Item value="2026">2026</Select.Item>
                  <Select.Item value="2027">2027</Select.Item>
                  <Select.Item value="2028">2028</Select.Item>
                  <Select.Item value="2029">2029</Select.Item>
                </Select.Content>
              </Select.Root>
            </Field.Field>
          </div>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Legend>Billing Address</Field.Legend>
        <Field.Description>
          The billing address associated with your payment method
        </Field.Description>
        <Field.Group>
          <Field.Field orientation="horizontal">
            <Checkbox id="checkout-7j9-same-as-shipping-wgm" checked={true} />
            <Field.Label
              for="checkout-7j9-same-as-shipping-wgm"
              class="font-normal"
            >
              Same as shipping address
            </Field.Label>
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Separator />
      <Field.Set>
        <Field.Group>
          <Field.Field>
            <Field.Label for="checkout-7j9-optional-comments"
              >Comments</Field.Label
            >
            <Textarea
              id="checkout-7j9-optional-comments"
              placeholder="Add any additional comments"
              class="resize-none"
            />
          </Field.Field>
        </Field.Group>
      </Field.Set>
      <Field.Field orientation="horizontal">
        <Button type="submit">Submit</Button>
        <Button variant="outline" type="button">Cancel</Button>
      </Field.Field>
    </Field.Group>
  </form>
</div>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add field
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add field
```

### Example 5

```python
npx shadcn-svelte@latest add field
```

### Example 6

```python
npx shadcn-svelte@latest add field
```

### Example 7

```python
npx shadcn-svelte@latest add field
```

### Example 8

```python
npx shadcn-svelte@latest add field
```

### Example 9

```python
bun x shadcn-svelte@latest add field
```

### Example 10

```python
bun x shadcn-svelte@latest add field
```

### Example 11

```html
<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="field-content"
  class={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
  {...restProps}
>
  {@render children?.()}
</div>
```

### Example 12

```html
<script lang="ts">
  import { cn, type WithElementRef } from "$lib/utils.js";
  import type { HTMLAttributes } from "svelte/elements";

  let {
    ref = $bindable(null),
    class: className,
    children,
    ...restProps
  }: WithElementRef<HTMLAttributes<HTMLDivElement>> = $props();
</script>

<div
  bind:this={ref}
  data-slot="field-content"
  class={cn("group/field-content flex flex-1 flex-col gap-1.5 leading-snug", className)}
  {...restProps}
>
  {@render children?.()}
</div>
```

### Example 13

```jsx
<script lang="ts">import * as Field from "$lib/components/ui/field/index.js";</script>
```

### Example 14

```jsx
<script lang="ts">import * as Field from "$lib/components/ui/field/index.js";</script>
```

### Example 15

```jsx
<Field.Set>
  <Field.Legend>Profile</Field.Legend>
  <Field.Description>This appears on invoices and emails.</Field.Description>
  <Field.Group>
    <Field.Field>
      <Field.Label for="name">Full name</Field.Label>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <Field.Description>This appears on invoices and emails.</Field.Description>
    </Field.Field>
    <Field.Field>
      <Field.Label for="username">Username</Field.Label>
      <Input id="username" autoComplete="off" aria-invalid />
      <Field.Error>Choose another username.</Field.Error>
    </Field.Field>
    <Field.Field orientation="horizontal">
      <Switch id="newsletter" />
      <Field.Label for="newsletter">Subscribe to the newsletter</Field.Label>
    </Field.Field>
  </Field.Group>
</Field.Set>
```

### Example 16

```jsx
<Field.Set>
  <Field.Legend>Profile</Field.Legend>
  <Field.Description>This appears on invoices and emails.</Field.Description>
  <Field.Group>
    <Field.Field>
      <Field.Label for="name">Full name</Field.Label>
      <Input id="name" autoComplete="off" placeholder="Evil Rabbit" />
      <Field.Description>This appears on invoices and emails.</Field.Description>
    </Field.Field>
    <Field.Field>
      <Field.Label for="username">Username</Field.Label>
      <Input id="username" autoComplete="off" aria-invalid />
      <Field.Error>Choose another username.</Field.Error>
    </Field.Field>
    <Field.Field orientation="horizontal">
      <Switch id="newsletter" />
      <Field.Label for="newsletter">Subscribe to the newsletter</Field.Label>
    </Field.Field>
  </Field.Group>
</Field.Set>
```

### Example 17

```php
<Field.Field>
  <Field.Label for="input-id">Label</Field.Label>
  <!-- Input, Select, Switch, etc. -->
  <Field.Description>Optional helper text.</Field.Description>
  <Field.Error>Validation message.</Field.Error>
</Field.Field>
```

### Example 18

```php
<Field.Field>
  <Field.Label for="input-id">Label</Field.Label>
  <!-- Input, Select, Switch, etc. -->
  <Field.Description>Optional helper text.</Field.Description>
  <Field.Error>Validation message.</Field.Error>
</Field.Field>
```

### Example 19

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Set>
    <Field.Group>
      <Field.Field>
        <Field.Label for="username">Username</Field.Label>
        <Input id="username" type="text" placeholder="Max Leiter" />
        <Field.Description
          >Choose a unique username for your account.</Field.Description
        >
      </Field.Field>
      <Field.Field>
        <Field.Label for="password">Password</Field.Label>
        <Field.Description
          >Must be at least 8 characters long.</Field.Description
        >
        <Input id="password" type="password" placeholder="••••••••" />
      </Field.Field>
    </Field.Group>
  </Field.Set>
</div>
```

### Example 20

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Set>
    <Field.Group>
      <Field.Field>
        <Field.Label for="username">Username</Field.Label>
        <Input id="username" type="text" placeholder="Max Leiter" />
        <Field.Description
          >Choose a unique username for your account.</Field.Description
        >
      </Field.Field>
      <Field.Field>
        <Field.Label for="password">Password</Field.Label>
        <Field.Description
          >Must be at least 8 characters long.</Field.Description
        >
        <Input id="password" type="password" placeholder="••••••••" />
      </Field.Field>
    </Field.Group>
  </Field.Set>
</div>
```

### Example 21

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Set>
    <Field.Group>
      <Field.Field>
        <Field.Label for="feedback">Feedback</Field.Label>
        <Textarea
          id="feedback"
          placeholder="Your feedback helps us improve..."
          rows={4}
        />
        <Field.Description
          >Share your thoughts about our service.</Field.Description
        >
      </Field.Field>
    </Field.Group>
  </Field.Set>
</div>
```

### Example 22

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Set>
    <Field.Group>
      <Field.Field>
        <Field.Label for="feedback">Feedback</Field.Label>
        <Textarea
          id="feedback"
          placeholder="Your feedback helps us improve..."
          rows={4}
        />
        <Field.Description
          >Share your thoughts about our service.</Field.Description
        >
      </Field.Field>
    </Field.Group>
  </Field.Set>
</div>
```

### Example 23

```typescript
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  let department = $state<string>();

  const departments = [
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "support", label: "Customer Support" },
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance" },
    { value: "operations", label: "Operations" }
  ];

  const departmentLabel = $derived(
    departments.find((d) => d.value === department)?.label ??
      "Choose department"
  );
</script>

<div class="w-full max-w-md">
  <Field.Field>
    <Field.Label for="department">Department</Field.Label>
    <Select.Root type="single" bind:value={department}>
      <Select.Trigger id="department">
        {departmentLabel}
      </Select.Trigger>
      <Select.Content>
        {#each departments as department (department.value)}
          <Select.Item {...department} />
        {/each}
      </Select.Content>
    </Select.Root>
    <Field.Description
      >Select your department or area of work.</Field.Description
    >
  </Field.Field>
</div>
```

### Example 24

```typescript
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import * as Select from "$lib/components/ui/select/index.js";

  let department = $state<string>();

  const departments = [
    { value: "engineering", label: "Engineering" },
    { value: "design", label: "Design" },
    { value: "marketing", label: "Marketing" },
    { value: "sales", label: "Sales" },
    { value: "support", label: "Customer Support" },
    { value: "hr", label: "Human Resources" },
    { value: "finance", label: "Finance" },
    { value: "operations", label: "Operations" }
  ];

  const departmentLabel = $derived(
    departments.find((d) => d.value === department)?.label ??
      "Choose department"
  );
</script>

<div class="w-full max-w-md">
  <Field.Field>
    <Field.Label for="department">Department</Field.Label>
    <Select.Root type="single" bind:value={department}>
      <Select.Trigger id="department">
        {departmentLabel}
      </Select.Trigger>
      <Select.Content>
        {#each departments as department (department.value)}
          <Select.Item {...department} />
        {/each}
      </Select.Content>
    </Select.Root>
    <Field.Description
      >Select your department or area of work.</Field.Description
    >
  </Field.Field>
</div>
```

### Example 25

```html
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";

  let value = $state([200, 800]);
</script>

<div class="w-full max-w-md">
  <Field.Field>
    <Field.Label>Price Range</Field.Label>
    <Field.Description>
      Set your budget range ($<span class="font-medium tabular-nums">{value[0]}</span>
      -
      <span class="font-medium tabular-nums">{value[1]}</span>).
    </Field.Description>
    <Slider
      type="multiple"
      bind:value
      max="{1000}"
      min="{0}"
      step="{10}"
      class="mt-2 w-full"
      aria-label="Price Range"
    />
  </Field.Field>
</div>
```

### Example 26

```html
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Slider } from "$lib/components/ui/slider/index.js";

  let value = $state([200, 800]);
</script>

<div class="w-full max-w-md">
  <Field.Field>
    <Field.Label>Price Range</Field.Label>
    <Field.Description>
      Set your budget range ($<span class="font-medium tabular-nums">{value[0]}</span>
      -
      <span class="font-medium tabular-nums">{value[1]}</span>).
    </Field.Description>
    <Slider
      type="multiple"
      bind:value
      max="{1000}"
      min="{0}"
      step="{10}"
      class="mt-2 w-full"
      aria-label="Price Range"
    />
  </Field.Field>
</div>
```

### Example 27

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="w-full max-w-md space-y-6">
  <Field.Set>
    <Field.Legend>Address Information</Field.Legend>
    <Field.Description
      >We need your address to deliver your order.</Field.Description
    >
    <Field.Group>
      <Field.Field>
        <Field.Label for="street">Street Address</Field.Label>
        <Input id="street" type="text" placeholder="123 Main St" />
      </Field.Field>
      <div class="grid grid-cols-2 gap-4">
        <Field.Field>
          <Field.Label for="city">City</Field.Label>
          <Input id="city" type="text" placeholder="New York" />
        </Field.Field>
        <Field.Field>
          <Field.Label for="zip">Postal Code</Field.Label>
          <Input id="zip" type="text" placeholder="90502" />
        </Field.Field>
      </div>
    </Field.Group>
  </Field.Set>
</div>
```

### Example 28

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
</script>

<div class="w-full max-w-md space-y-6">
  <Field.Set>
    <Field.Legend>Address Information</Field.Legend>
    <Field.Description
      >We need your address to deliver your order.</Field.Description
    >
    <Field.Group>
      <Field.Field>
        <Field.Label for="street">Street Address</Field.Label>
        <Input id="street" type="text" placeholder="123 Main St" />
      </Field.Field>
      <div class="grid grid-cols-2 gap-4">
        <Field.Field>
          <Field.Label for="city">City</Field.Label>
          <Input id="city" type="text" placeholder="New York" />
        </Field.Field>
        <Field.Field>
          <Field.Label for="zip">Postal Code</Field.Label>
          <Input id="zip" type="text" placeholder="90502" />
        </Field.Field>
      </div>
    </Field.Group>
  </Field.Set>
</div>
```

### Example 29

```sql
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Group>
    <Field.Set>
      <Field.Legend variant="label"
        >Show these items on the desktop</Field.Legend
      >
      <Field.Description
        >Select the items you want to show on the desktop.</Field.Description
      >
      <Field.Group class="gap-3">
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-hard-disks-ljj" checked />
          <Field.Label for="finder-pref-9k2-hard-disks-ljj" class="font-normal">
            Hard disks
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-external-disks-1yg" />
          <Field.Label
            for="finder-pref-9k2-external-disks-1yg"
            class="font-normal"
          >
            External disks
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
          <Field.Label for="finder-pref-9k2-cds-dvds-fzt" class="font-normal">
            CDs, DVDs, and iPods
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
          <Field.Label
            for="finder-pref-9k2-connected-servers-6l2"
            class="font-normal"
          >
            Connected servers
          </Field.Label>
        </Field.Field>
      </Field.Group>
    </Field.Set>
    <Field.Separator />
    <Field.Field orientation="horizontal">
      <Checkbox id="finder-pref-9k2-sync-folders-nep" checked />
      <Field.Content>
        <Field.Label for="finder-pref-9k2-sync-folders-nep">
          Sync Desktop & Documents folders
        </Field.Label>
        <Field.Description>
          Your Desktop & Documents folders are being synced with iCloud Drive.
          You can access them from other devices.
        </Field.Description>
      </Field.Content>
    </Field.Field>
  </Field.Group>
</div>
```

### Example 30

```sql
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Group>
    <Field.Set>
      <Field.Legend variant="label"
        >Show these items on the desktop</Field.Legend
      >
      <Field.Description
        >Select the items you want to show on the desktop.</Field.Description
      >
      <Field.Group class="gap-3">
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-hard-disks-ljj" checked />
          <Field.Label for="finder-pref-9k2-hard-disks-ljj" class="font-normal">
            Hard disks
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-external-disks-1yg" />
          <Field.Label
            for="finder-pref-9k2-external-disks-1yg"
            class="font-normal"
          >
            External disks
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-cds-dvds-fzt" />
          <Field.Label for="finder-pref-9k2-cds-dvds-fzt" class="font-normal">
            CDs, DVDs, and iPods
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="finder-pref-9k2-connected-servers-6l2" />
          <Field.Label
            for="finder-pref-9k2-connected-servers-6l2"
            class="font-normal"
          >
            Connected servers
          </Field.Label>
        </Field.Field>
      </Field.Group>
    </Field.Set>
    <Field.Separator />
    <Field.Field orientation="horizontal">
      <Checkbox id="finder-pref-9k2-sync-folders-nep" checked />
      <Field.Content>
        <Field.Label for="finder-pref-9k2-sync-folders-nep">
          Sync Desktop & Documents folders
        </Field.Label>
        <Field.Description>
          Your Desktop & Documents folders are being synced with iCloud Drive.
          You can access them from other devices.
        </Field.Description>
      </Field.Content>
    </Field.Field>
  </Field.Group>
</div>
```

### Example 31

```typescript
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";

  let plan = $state("monthly");
</script>

<div class="w-full max-w-md">
  <Field.Set>
    <Field.Label>Subscription Plan</Field.Label>
    <Field.Description
      >Yearly and lifetime plans offer significant savings.</Field.Description
    >
    <RadioGroup.Root bind:value={plan}>
      <Field.Field orientation="horizontal">
        <RadioGroup.Item value="monthly" id="plan-monthly" />
        <Field.Label for="plan-monthly" class="font-normal">
          Monthly ($9.99/month)
        </Field.Label>
      </Field.Field>
      <Field.Field orientation="horizontal">
        <RadioGroup.Item value="yearly" id="plan-yearly" />
        <Field.Label for="plan-yearly" class="font-normal">
          Yearly ($99.99/year)
        </Field.Label>
      </Field.Field>
      <Field.Field orientation="horizontal">
        <RadioGroup.Item value="lifetime" id="plan-lifetime" />
        <Field.Label for="plan-lifetime" class="font-normal">
          Lifetime ($299.99)
        </Field.Label>
      </Field.Field>
    </RadioGroup.Root>
  </Field.Set>
</div>
```

### Example 32

```typescript
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";

  let plan = $state("monthly");
</script>

<div class="w-full max-w-md">
  <Field.Set>
    <Field.Label>Subscription Plan</Field.Label>
    <Field.Description
      >Yearly and lifetime plans offer significant savings.</Field.Description
    >
    <RadioGroup.Root bind:value={plan}>
      <Field.Field orientation="horizontal">
        <RadioGroup.Item value="monthly" id="plan-monthly" />
        <Field.Label for="plan-monthly" class="font-normal">
          Monthly ($9.99/month)
        </Field.Label>
      </Field.Field>
      <Field.Field orientation="horizontal">
        <RadioGroup.Item value="yearly" id="plan-yearly" />
        <Field.Label for="plan-yearly" class="font-normal">
          Yearly ($99.99/year)
        </Field.Label>
      </Field.Field>
      <Field.Field orientation="horizontal">
        <RadioGroup.Item value="lifetime" id="plan-lifetime" />
        <Field.Label for="plan-lifetime" class="font-normal">
          Lifetime ($299.99)
        </Field.Label>
      </Field.Field>
    </RadioGroup.Root>
  </Field.Set>
</div>
```

### Example 33

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Field orientation="horizontal">
    <Field.Content>
      <Field.Label for="2fa">Multi-factor authentication</Field.Label>
      <Field.Description>
        Enable multi-factor authentication. If you do not have a two-factor
        device, you can use a one-time code sent to your email.
      </Field.Description>
    </Field.Content>
    <Switch id="2fa" />
  </Field.Field>
</div>
```

### Example 34

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Switch } from "$lib/components/ui/switch/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Field orientation="horizontal">
    <Field.Content>
      <Field.Label for="2fa">Multi-factor authentication</Field.Label>
      <Field.Description>
        Enable multi-factor authentication. If you do not have a two-factor
        device, you can use a one-time code sent to your email.
      </Field.Description>
    </Field.Content>
    <Switch id="2fa" />
  </Field.Field>
</div>
```

### Example 35

```sql
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";

  let computeEnvironment = $state("kubernetes");
</script>

<div class="w-full max-w-md">
  <Field.Group>
    <Field.Set>
      <Field.Label for="compute-environment-p8w"
        >Compute Environment</Field.Label
      >
      <Field.Description
        >Select the compute environment for your cluster.</Field.Description
      >
      <RadioGroup.Root bind:value={computeEnvironment}>
        <Field.Label for="kubernetes-r2h">
          <Field.Field orientation="horizontal">
            <Field.Content>
              <Field.Title>Kubernetes</Field.Title>
              <Field.Description>
                Run GPU workloads on a K8s configured cluster.
              </Field.Description>
            </Field.Content>
            <RadioGroup.Item value="kubernetes" id="kubernetes-r2h" />
          </Field.Field>
        </Field.Label>
        <Field.Label for="vm-z4k">
          <Field.Field orientation="horizontal">
            <Field.Content>
              <Field.Title>Virtual Machine</Field.Title>
              <Field.Description>
                Access a VM configured cluster to run GPU workloads.
              </Field.Description>
            </Field.Content>
            <RadioGroup.Item value="vm" id="vm-z4k" />
          </Field.Field>
        </Field.Label>
      </RadioGroup.Root>
    </Field.Set>
  </Field.Group>
</div>
```

### Example 36

```sql
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import * as RadioGroup from "$lib/components/ui/radio-group/index.js";

  let computeEnvironment = $state("kubernetes");
</script>

<div class="w-full max-w-md">
  <Field.Group>
    <Field.Set>
      <Field.Label for="compute-environment-p8w"
        >Compute Environment</Field.Label
      >
      <Field.Description
        >Select the compute environment for your cluster.</Field.Description
      >
      <RadioGroup.Root bind:value={computeEnvironment}>
        <Field.Label for="kubernetes-r2h">
          <Field.Field orientation="horizontal">
            <Field.Content>
              <Field.Title>Kubernetes</Field.Title>
              <Field.Description>
                Run GPU workloads on a K8s configured cluster.
              </Field.Description>
            </Field.Content>
            <RadioGroup.Item value="kubernetes" id="kubernetes-r2h" />
          </Field.Field>
        </Field.Label>
        <Field.Label for="vm-z4k">
          <Field.Field orientation="horizontal">
            <Field.Content>
              <Field.Title>Virtual Machine</Field.Title>
              <Field.Description>
                Access a VM configured cluster to run GPU workloads.
              </Field.Description>
            </Field.Content>
            <RadioGroup.Item value="vm" id="vm-z4k" />
          </Field.Field>
        </Field.Label>
      </RadioGroup.Root>
    </Field.Set>
  </Field.Group>
</div>
```

### Example 37

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Group>
    <Field.Set>
      <Field.Label>Responses</Field.Label>
      <Field.Description>
        Get notified when ChatGPT responds to requests that take time, like
        research or image generation.
      </Field.Description>
      <Field.Group data-slot="checkbox-group">
        <Field.Field orientation="horizontal">
          <Checkbox id="push" checked disabled />
          <Field.Label for="push" class="font-normal"
            >Push notifications</Field.Label
          >
        </Field.Field>
      </Field.Group>
    </Field.Set>
    <Field.Separator />
    <Field.Set>
      <Field.Label>Tasks</Field.Label>
      <Field.Description>
        Get notified when tasks you've created have updates.
        <a href="#/">Manage tasks</a>
      </Field.Description>
      <Field.Group data-slot="checkbox-group">
        <Field.Field orientation="horizontal">
          <Checkbox id="push-tasks" />
          <Field.Label for="push-tasks" class="font-normal">
            Push notifications
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="email-tasks" />
          <Field.Label for="email-tasks" class="font-normal">
            Email notifications
          </Field.Label>
        </Field.Field>
      </Field.Group>
    </Field.Set>
  </Field.Group>
</div>
```

### Example 38

```jsx
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Checkbox } from "$lib/components/ui/checkbox/index.js";
</script>

<div class="w-full max-w-md">
  <Field.Group>
    <Field.Set>
      <Field.Label>Responses</Field.Label>
      <Field.Description>
        Get notified when ChatGPT responds to requests that take time, like
        research or image generation.
      </Field.Description>
      <Field.Group data-slot="checkbox-group">
        <Field.Field orientation="horizontal">
          <Checkbox id="push" checked disabled />
          <Field.Label for="push" class="font-normal"
            >Push notifications</Field.Label
          >
        </Field.Field>
      </Field.Group>
    </Field.Set>
    <Field.Separator />
    <Field.Set>
      <Field.Label>Tasks</Field.Label>
      <Field.Description>
        Get notified when tasks you've created have updates.
        <a href="#/">Manage tasks</a>
      </Field.Description>
      <Field.Group data-slot="checkbox-group">
        <Field.Field orientation="horizontal">
          <Checkbox id="push-tasks" />
          <Field.Label for="push-tasks" class="font-normal">
            Push notifications
          </Field.Label>
        </Field.Field>
        <Field.Field orientation="horizontal">
          <Checkbox id="email-tasks" />
          <Field.Label for="email-tasks" class="font-normal">
            Email notifications
          </Field.Label>
        </Field.Field>
      </Field.Group>
    </Field.Set>
  </Field.Group>
</div>
```

### Example 39

```typescript
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<div class="w-full max-w-4xl">
  <form>
    <Field.Set>
      <Field.Legend>Profile</Field.Legend>
      <Field.Description>Fill in your profile information.</Field.Description>
      <Field.Separator />
      <Field.Group>
        <Field.Field orientation="responsive">
          <Field.Content>
            <Field.Label for="name">Name</Field.Label>
            <Field.Description>
              Provide your full name for identification
            </Field.Description>
          </Field.Content>
          <Input id="name" placeholder="Evil Rabbit" required />
        </Field.Field>
        <Field.Separator />
        <Field.Field orientation="responsive">
          <Field.Content>
            <Field.Label for="message">Message</Field.Label>
            <Field.Description>
              You can write your message here. Keep it short, preferably under
              100 characters.
            </Field.Description>
          </Field.Content>
          <Textarea
            id="message"
            placeholder="Hello, world!"
            required
            class="min-h-[100px] resize-none sm:min-w-[300px]"
          />
        </Field.Field>
        <Field.Separator />
        <Field.Field orientation="responsive">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </Field.Field>
      </Field.Group>
    </Field.Set>
  </form>
</div>
```

### Example 40

```typescript
<script lang="ts">
  import * as Field from "$lib/components/ui/field/index.js";
  import { Button } from "$lib/components/ui/button/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Textarea } from "$lib/components/ui/textarea/index.js";
</script>

<div class="w-full max-w-4xl">
  <form>
    <Field.Set>
      <Field.Legend>Profile</Field.Legend>
      <Field.Description>Fill in your profile information.</Field.Description>
      <Field.Separator />
      <Field.Group>
        <Field.Field orientation="responsive">
          <Field.Content>
            <Field.Label for="name">Name</Field.Label>
            <Field.Description>
              Provide your full name for identification
            </Field.Description>
          </Field.Content>
          <Input id="name" placeholder="Evil Rabbit" required />
        </Field.Field>
        <Field.Separator />
        <Field.Field orientation="responsive">
          <Field.Content>
            <Field.Label for="message">Message</Field.Label>
            <Field.Description>
              You can write your message here. Keep it short, preferably under
              100 characters.
            </Field.Description>
          </Field.Content>
          <Textarea
            id="message"
            placeholder="Hello, world!"
            required
            class="min-h-[100px] resize-none sm:min-w-[300px]"
          />
        </Field.Field>
        <Field.Separator />
        <Field.Field orientation="responsive">
          <Button type="submit">Submit</Button>
          <Button type="button" variant="outline">Cancel</Button>
        </Field.Field>
      </Field.Group>
    </Field.Set>
  </form>
</div>
```

### Example 41

```jsx
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" type="email" aria-invalid />
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Field>
```

### Example 42

```jsx
<Field.Field data-invalid>
  <Field.Label for="email">Email</Field.Label>
  <Input id="email" type="email" aria-invalid />
  <Field.Error>Enter a valid email address.</Field.Error>
</Field.Field>
```

## Sections

## Installation

## Usage

## Anatomy

## Examples

### Input

### Textarea

### Select

### Slider

### Fieldset

### Checkbox

### Radio

### Switch

### Choice Card

### Field Group

### Responsive Layout

## Validation and Errors

## Accessibility
