# Native Select

**Source**: https://www.shadcn-svelte.com/docs/components/native-select

## Table of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Examples](#examples)
  - [With Groups](#with-groups)
  - [Disabled State](#disabled-state)
  - [Invalid State](#invalid-state)
- [Native Select vs Select](#native-select-vs-select)
- [Accessibility](#accessibility)
- [API Reference](#api-reference)
  - [NativeSelect.Root](#nativeselect.root)
  - [NativeSelect.Option](#nativeselect.option)
  - [NativeSelect.OptGroup](#nativeselect.optgroup)

## Content

A styled native HTML select element with consistent design system integration.

For a styled select component, see the Select component.

Copy and paste the following code into your project.

Organize options using NativeSelect.OptGroup for better categorization.

Disable individual options or the entire select component.

Show validation errors with the aria-invalid attribute and error styling.

The NativeSelect component provides native HTML select functionality with consistent styling that matches your design system.

The main select component that wraps the native HTML select element.

All other props are passed through to the underlying <select> element.

Represents an individual option within the select.

All other props are passed through to the underlying <option> element.

Groups related options together for better organization.

All other props are passed through to the underlying <optgroup> element.

## Code Examples

### Example 1

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select status</NativeSelect.Option>
  <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
  <NativeSelect.Option value="in-progress">In Progress</NativeSelect.Option>
  <NativeSelect.Option value="done">Done</NativeSelect.Option>
  <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 2

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select status</NativeSelect.Option>
  <NativeSelect.Option value="todo">Todo</NativeSelect.Option>
  <NativeSelect.Option value="in-progress">In Progress</NativeSelect.Option>
  <NativeSelect.Option value="done">Done</NativeSelect.Option>
  <NativeSelect.Option value="cancelled">Cancelled</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 3

```python
pnpm dlx shadcn-svelte@latest add native-select
```

### Example 4

```python
pnpm dlx shadcn-svelte@latest add native-select
```

### Example 5

```python
npx shadcn-svelte@latest add native-select
```

### Example 6

```python
npx shadcn-svelte@latest add native-select
```

### Example 7

```python
npx shadcn-svelte@latest add native-select
```

### Example 8

```python
npx shadcn-svelte@latest add native-select
```

### Example 9

```python
bun x shadcn-svelte@latest add native-select
```

### Example 10

```python
bun x shadcn-svelte@latest add native-select
```

### Example 11

```sql
import Root from "./native-select.svelte";
import Option from "./native-select-option.svelte";
import OptGroup from "./native-select-opt-group.svelte";

export {
  Root,
  Option,
  OptGroup,
  Root as NativeSelect,
  Option as NativeSelectOption,
  OptGroup as NativeSelectOptGroup,
};
```

### Example 12

```sql
import Root from "./native-select.svelte";
import Option from "./native-select-option.svelte";
import OptGroup from "./native-select-opt-group.svelte";

export {
  Root,
  Option,
  OptGroup,
  Root as NativeSelect,
  Option as NativeSelectOption,
  OptGroup as NativeSelectOptGroup,
};
```

### Example 13

```jsx
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>
```

### Example 14

```jsx
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>
```

### Example 15

```sql
<NativeSelect.Root>
  <NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
  <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  <NativeSelect.Option value="grapes" disabled>Grapes</NativeSelect.Option>
  <NativeSelect.Option value="pineapple">Pineapple</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 16

```sql
<NativeSelect.Root>
  <NativeSelect.Option value="">Select a fruit</NativeSelect.Option>
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
  <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  <NativeSelect.Option value="grapes" disabled>Grapes</NativeSelect.Option>
  <NativeSelect.Option value="pineapple">Pineapple</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 17

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select department</NativeSelect.Option>
  <NativeSelect.OptGroup label="Engineering">
    <NativeSelect.Option value="frontend">Frontend</NativeSelect.Option>
    <NativeSelect.Option value="backend">Backend</NativeSelect.Option>
    <NativeSelect.Option value="devops">DevOps</NativeSelect.Option>
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Sales">
    <NativeSelect.Option value="sales-rep">Sales Rep</NativeSelect.Option>
    <NativeSelect.Option value="account-manager"
      >Account Manager</NativeSelect.Option
    >
    <NativeSelect.Option value="sales-director"
      >Sales Director</NativeSelect.Option
    >
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Operations">
    <NativeSelect.Option value="support">Customer Support</NativeSelect.Option>
    <NativeSelect.Option value="product-manager"
      >Product Manager</NativeSelect.Option
    >
    <NativeSelect.Option value="ops-manager"
      >Operations Manager</NativeSelect.Option
    >
  </NativeSelect.OptGroup>
</NativeSelect.Root>
```

### Example 18

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root>
  <NativeSelect.Option value="">Select department</NativeSelect.Option>
  <NativeSelect.OptGroup label="Engineering">
    <NativeSelect.Option value="frontend">Frontend</NativeSelect.Option>
    <NativeSelect.Option value="backend">Backend</NativeSelect.Option>
    <NativeSelect.Option value="devops">DevOps</NativeSelect.Option>
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Sales">
    <NativeSelect.Option value="sales-rep">Sales Rep</NativeSelect.Option>
    <NativeSelect.Option value="account-manager"
      >Account Manager</NativeSelect.Option
    >
    <NativeSelect.Option value="sales-director"
      >Sales Director</NativeSelect.Option
    >
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Operations">
    <NativeSelect.Option value="support">Customer Support</NativeSelect.Option>
    <NativeSelect.Option value="product-manager"
      >Product Manager</NativeSelect.Option
    >
    <NativeSelect.Option value="ops-manager"
      >Operations Manager</NativeSelect.Option
    >
  </NativeSelect.OptGroup>
</NativeSelect.Root>
```

### Example 19

```sql
<NativeSelect.Root>
  <NativeSelect.Option value="">Select a food</NativeSelect.Option>
  <NativeSelect.OptGroup label="Fruits">
    <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
    <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
    <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Vegetables">
    <NativeSelect.Option value="carrot">Carrot</NativeSelect.Option>
    <NativeSelect.Option value="broccoli">Broccoli</NativeSelect.Option>
    <NativeSelect.Option value="spinach">Spinach</NativeSelect.Option>
  </NativeSelect.OptGroup>
</NativeSelect.Root>
```

### Example 20

```sql
<NativeSelect.Root>
  <NativeSelect.Option value="">Select a food</NativeSelect.Option>
  <NativeSelect.OptGroup label="Fruits">
    <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
    <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
    <NativeSelect.Option value="blueberry">Blueberry</NativeSelect.Option>
  </NativeSelect.OptGroup>
  <NativeSelect.OptGroup label="Vegetables">
    <NativeSelect.Option value="carrot">Carrot</NativeSelect.Option>
    <NativeSelect.Option value="broccoli">Broccoli</NativeSelect.Option>
    <NativeSelect.Option value="spinach">Spinach</NativeSelect.Option>
  </NativeSelect.OptGroup>
</NativeSelect.Root>
```

### Example 21

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root disabled>
  <NativeSelect.Option value="">Select priority</NativeSelect.Option>
  <NativeSelect.Option value="low">Low</NativeSelect.Option>
  <NativeSelect.Option value="medium">Medium</NativeSelect.Option>
  <NativeSelect.Option value="high">High</NativeSelect.Option>
  <NativeSelect.Option value="critical">Critical</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 22

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root disabled>
  <NativeSelect.Option value="">Select priority</NativeSelect.Option>
  <NativeSelect.Option value="low">Low</NativeSelect.Option>
  <NativeSelect.Option value="medium">Medium</NativeSelect.Option>
  <NativeSelect.Option value="high">High</NativeSelect.Option>
  <NativeSelect.Option value="critical">Critical</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 23

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root aria-invalid="true">
  <NativeSelect.Option value="">Select role</NativeSelect.Option>
  <NativeSelect.Option value="admin">Admin</NativeSelect.Option>
  <NativeSelect.Option value="editor">Editor</NativeSelect.Option>
  <NativeSelect.Option value="viewer">Viewer</NativeSelect.Option>
  <NativeSelect.Option value="guest">Guest</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 24

```sql
<script lang="ts">
  import * as NativeSelect from "$lib/components/ui/native-select/index.js";
</script>

<NativeSelect.Root aria-invalid="true">
  <NativeSelect.Option value="">Select role</NativeSelect.Option>
  <NativeSelect.Option value="admin">Admin</NativeSelect.Option>
  <NativeSelect.Option value="editor">Editor</NativeSelect.Option>
  <NativeSelect.Option value="viewer">Viewer</NativeSelect.Option>
  <NativeSelect.Option value="guest">Guest</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 25

```sql
<NativeSelect.Root aria-invalid="true">
  <NativeSelect.Option value="">Select a country</NativeSelect.Option>
  <NativeSelect.Option value="us">United States</NativeSelect.Option>
  <NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
  <NativeSelect.Option value="ca">Canada</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 26

```sql
<NativeSelect.Root aria-invalid="true">
  <NativeSelect.Option value="">Select a country</NativeSelect.Option>
  <NativeSelect.Option value="us">United States</NativeSelect.Option>
  <NativeSelect.Option value="uk">United Kingdom</NativeSelect.Option>
  <NativeSelect.Option value="ca">Canada</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 27

```unknown
<NativeSelect.Root aria-label="Choose your preferred language">
  <NativeSelect.Option value="en">English</NativeSelect.Option>
  <NativeSelect.Option value="es">Spanish</NativeSelect.Option>
  <NativeSelect.Option value="fr">French</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 28

```unknown
<NativeSelect.Root aria-label="Choose your preferred language">
  <NativeSelect.Option value="en">English</NativeSelect.Option>
  <NativeSelect.Option value="es">Spanish</NativeSelect.Option>
  <NativeSelect.Option value="fr">French</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 29

```unknown
<NativeSelect.Root>
  <NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
  <NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 30

```unknown
<NativeSelect.Root>
  <NativeSelect.Option value="option1">Option 1</NativeSelect.Option>
  <NativeSelect.Option value="option2">Option 2</NativeSelect.Option>
</NativeSelect.Root>
```

### Example 31

```unknown
<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
<NativeSelect.Option value="banana" disabled>Banana</NativeSelect.Option>
```

### Example 32

```unknown
<NativeSelect.Option value="apple">Apple</NativeSelect.Option>
<NativeSelect.Option value="banana" disabled>Banana</NativeSelect.Option>
```

### Example 33

```unknown
<NativeSelect.OptGroup label="Fruits">
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
</NativeSelect.OptGroup>
```

### Example 34

```unknown
<NativeSelect.OptGroup label="Fruits">
  <NativeSelect.Option value="apple">Apple</NativeSelect.Option>
  <NativeSelect.Option value="banana">Banana</NativeSelect.Option>
</NativeSelect.OptGroup>
```

## Sections

## Installation

## Usage

## Examples

### With Groups

### Disabled State

### Invalid State

## Native Select vs Select

## Accessibility

## API Reference

### NativeSelect.Root

### NativeSelect.Option

### NativeSelect.OptGroup
