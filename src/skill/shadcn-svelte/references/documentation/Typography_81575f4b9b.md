# Typography

**Source**: https://www.shadcn-svelte.com/docs/components/typography

## Table of Contents

- [The King's Plan](#the-king's-plan)
  - [The Joke Tax](#the-joke-tax)
  - [Jokester's Revolt](#jokester's-revolt)
  - [The People's Rebellion](#the-people's-rebellion)
- [h1](#h1)
- [h2](#h2)
- [The People of the Kingdom](#the-people-of-the-kingdom)
- [h3](#h3)
  - [The Joke Tax](#the-joke-tax)
- [h4](#h4)
  - [People stopped telling jokes](#people-stopped-telling-jokes)
- [p](#p)
- [blockquote](#blockquote)
- [table](#table)
- [list](#list)
- [Inline code](#inline-code)
- [Lead](#lead)
- [Large](#large)
- [Small](#small)
- [Muted](#muted)

## Content

Styles for headings, paragraphs, lists...etc

We do not ship any typography styles by default. This page is an example of how you can use utility classes to style your text.

Once upon a time, in a far-off land, there was a very lazy king who spent all day lounging on his throne. One day, his advisors came to him with a problem: the kingdom was running out of money.

The king thought long and hard, and finally came up with a brilliant plan : he would tax the jokes in the kingdom.

The king's subjects were not amused. They grumbled and complained, but the king was firm:

As a result, people stopped telling jokes, and the kingdom fell into a gloom. But there was one person who refused to let the king's foolishness get him down: a court jester named Jokester.

Jokester began sneaking into the castle in the middle of the night and leaving jokes all over the place: under the king's pillow, in his soup, even in the royal toilet. The king was furious, but he couldn't seem to stop Jokester.

And then, one day, the people of the kingdom discovered that the jokes left by Jokester were so funny that they couldn't help but laugh. And once they started laughing, they couldn't stop.

The people of the kingdom, feeling uplifted by the laughter, started to tell jokes and puns again, and soon the entire kingdom was in on the joke.

The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax. Jokester was declared a hero, and the kingdom lived happily ever after.

The moral of the story is: never underestimate the power of a good laugh and always be careful of bad ideas.

The king, seeing how much happier his subjects were, realized the error of his ways and repealed the joke tax.

A modal dialog that interrupts the user with important content and expects a response.

Enter your email address.

## Code Examples

### Example 1

```typescript
<div>
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
    Taxing Laughter: The Joke Tax Chronicles
  </h1>
  <p class="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6">
    Once upon a time, in a far-off land, there was a very lazy king who spent
    all day lounging on his throne. One day, his advisors came to him with a
    problem: the kingdom was running out of money.
  </p>
  <h2
    class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    The King&apos;s Plan
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king thought long and hard, and finally came up with
    <a href="##" class="text-primary font-medium underline underline-offset-4">
      a brilliant plan
    </a>
    : he would tax the jokes in the kingdom.
  </p>
  <blockquote class="mt-6 border-s-2 ps-6 italic">
    &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
    it&apos;s only fair that they should pay for the privilege.&quot;
  </blockquote>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The Joke Tax
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king&apos;s subjects were not amused. They grumbled and complained, but
    the king was firm:
  </p>
  <ul class="my-6 ms-6 list-disc [&>li]:mt-2">
    <li>1st level of puns: 5 gold coins</li>
    <li>2nd level of jokes: 10 gold coins</li>
    <li>3rd level of one-liners : 20 gold coins</li>
  </ul>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    As a result, people stopped telling jokes, and the kingdom fell into a
    gloom. But there was one person who refused to let the king&apos;s
    foolishness get him down: a court jester named Jokester.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    Jokester&apos;s Revolt
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    Jokester began sneaking into the castle in the middle of the night and
    leaving jokes all over the place: under the king&apos;s pillow, in his soup,
    even in the royal toilet. The king was furious, but he couldn&apos;t seem to
    stop Jokester.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    And then, one day, the people of the kingdom discovered that the jokes left
    by Jokester were so funny that they couldn&apos;t help but laugh. And once
    they started laughing, they couldn&apos;t stop.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The People&apos;s Rebellion
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The people of the kingdom, feeling uplifted by the laughter, started to tell
    jokes and puns again, and soon the entire kingdom was in on the joke.
  </p>
  <div class="my-6 w-full overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr class="even:bg-muted m-0 border-t p-0">
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            King&apos;s Treasury
          </th>
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            People&apos;s happiness
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Empty
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Overflowing
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Modest
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Satisfied
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Full
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Ecstatic
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king, seeing how much happier his subjects were, realized the error of
    his ways and repealed the joke tax. Jokester was declared a hero, and the
    kingdom lived happily ever after.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The moral of the story is: never underestimate the power of a good laugh and
    always be careful of bad ideas.
  </p>
</div>
```

### Example 2

```typescript
<div>
  <h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight text-balance">
    Taxing Laughter: The Joke Tax Chronicles
  </h1>
  <p class="text-muted-foreground text-xl leading-7 [&:not(:first-child)]:mt-6">
    Once upon a time, in a far-off land, there was a very lazy king who spent
    all day lounging on his throne. One day, his advisors came to him with a
    problem: the kingdom was running out of money.
  </p>
  <h2
    class="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0"
  >
    The King&apos;s Plan
  </h2>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king thought long and hard, and finally came up with
    <a href="##" class="text-primary font-medium underline underline-offset-4">
      a brilliant plan
    </a>
    : he would tax the jokes in the kingdom.
  </p>
  <blockquote class="mt-6 border-s-2 ps-6 italic">
    &quot;After all,&quot; he said, &quot;everyone enjoys a good joke, so
    it&apos;s only fair that they should pay for the privilege.&quot;
  </blockquote>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The Joke Tax
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king&apos;s subjects were not amused. They grumbled and complained, but
    the king was firm:
  </p>
  <ul class="my-6 ms-6 list-disc [&>li]:mt-2">
    <li>1st level of puns: 5 gold coins</li>
    <li>2nd level of jokes: 10 gold coins</li>
    <li>3rd level of one-liners : 20 gold coins</li>
  </ul>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    As a result, people stopped telling jokes, and the kingdom fell into a
    gloom. But there was one person who refused to let the king&apos;s
    foolishness get him down: a court jester named Jokester.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    Jokester&apos;s Revolt
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    Jokester began sneaking into the castle in the middle of the night and
    leaving jokes all over the place: under the king&apos;s pillow, in his soup,
    even in the royal toilet. The king was furious, but he couldn&apos;t seem to
    stop Jokester.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    And then, one day, the people of the kingdom discovered that the jokes left
    by Jokester were so funny that they couldn&apos;t help but laugh. And once
    they started laughing, they couldn&apos;t stop.
  </p>
  <h3 class="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
    The People&apos;s Rebellion
  </h3>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The people of the kingdom, feeling uplifted by the laughter, started to tell
    jokes and puns again, and soon the entire kingdom was in on the joke.
  </p>
  <div class="my-6 w-full overflow-y-auto">
    <table class="w-full">
      <thead>
        <tr class="even:bg-muted m-0 border-t p-0">
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            King&apos;s Treasury
          </th>
          <th
            class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            People&apos;s happiness
          </th>
        </tr>
      </thead>
      <tbody>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Empty
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Overflowing
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Modest
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Satisfied
          </td>
        </tr>
        <tr class="even:bg-muted m-0 border-t p-0">
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Full
          </td>
          <td
            class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end"
          >
            Ecstatic
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The king, seeing how much happier his subjects were, realized the error of
    his ways and repealed the joke tax. Jokester was declared a hero, and the
    kingdom lived happily ever after.
  </p>
  <p class="leading-7 [&:not(:first-child)]:mt-6">
    The moral of the story is: never underestimate the power of a good laugh and
    always be careful of bad ideas.
  </p>
</div>
```

### Example 3

```jsx
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  Taxing Laughter: The Joke Tax Chronicles
</h1>
```

### Example 4

```jsx
<h1 class="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
  Taxing Laughter: The Joke Tax Chronicles
</h1>
```

### Example 5

```jsx
<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
  The People of the Kingdom
</h2>
```

### Example 6

```jsx
<h2 class="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
  The People of the Kingdom
</h2>
```

### Example 7

```jsx
<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>
```

### Example 8

```jsx
<h3 class="scroll-m-20 text-2xl font-semibold tracking-tight">The Joke Tax</h3>
```

### Example 9

```jsx
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">People stopped telling jokes</h4>
```

### Example 10

```jsx
<h4 class="scroll-m-20 text-xl font-semibold tracking-tight">People stopped telling jokes</h4>
```

### Example 11

```jsx
<p class="leading-7 [&:not(:first-child)]:mt-6">
  The king, seeing how much happier his subjects were, realized the error of his ways and repealed
  the joke tax.
</p>
```

### Example 12

```jsx
<p class="leading-7 [&:not(:first-child)]:mt-6">
  The king, seeing how much happier his subjects were, realized the error of his ways and repealed
  the joke tax.
</p>
```

### Example 13

```jsx
<blockquote class="mt-6 border-s-2 ps-6 italic">
  "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the
  privilege."
</blockquote>
```

### Example 14

```jsx
<blockquote class="mt-6 border-s-2 ps-6 italic">
  "After all," he said, "everyone enjoys a good joke, so it's only fair that they should pay for the
  privilege."
</blockquote>
```

### Example 15

```jsx
<div class="my-6 w-full overflow-y-auto">
  <table class="w-full">
    <thead>
      <tr class="even:bg-muted m-0 border-t p-0">
        <th class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end">
          King's Treasury
        </th>
        <th class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end">
          People's happiness
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-muted m-0 border-t p-0">
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Empty
        </td>
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Overflowing
        </td>
      </tr>
      <tr class="even:bg-muted m-0 border-t p-0">
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Modest
        </td>
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Satisfied
        </td>
      </tr>
      <tr class="even:bg-muted m-0 border-t p-0">
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Full
        </td>
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Ecstatic
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Example 16

```jsx
<div class="my-6 w-full overflow-y-auto">
  <table class="w-full">
    <thead>
      <tr class="even:bg-muted m-0 border-t p-0">
        <th class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end">
          King's Treasury
        </th>
        <th class="border px-4 py-2 text-start font-bold [&[align=center]]:text-center [&[align=right]]:text-end">
          People's happiness
        </th>
      </tr>
    </thead>
    <tbody>
      <tr class="even:bg-muted m-0 border-t p-0">
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Empty
        </td>
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Overflowing
        </td>
      </tr>
      <tr class="even:bg-muted m-0 border-t p-0">
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Modest
        </td>
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Satisfied
        </td>
      </tr>
      <tr class="even:bg-muted m-0 border-t p-0">
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Full
        </td>
        <td class="border px-4 py-2 text-start [&[align=center]]:text-center [&[align=right]]:text-end">
          Ecstatic
        </td>
      </tr>
    </tbody>
  </table>
</div>
```

### Example 17

```jsx
<ul class="my-6 ms-6 list-disc [&>li]:mt-2">
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of one-liners : 20 gold coins</li>
</ul>
```

### Example 18

```jsx
<ul class="my-6 ms-6 list-disc [&>li]:mt-2">
  <li>1st level of puns: 5 gold coins</li>
  <li>2nd level of jokes: 10 gold coins</li>
  <li>3rd level of one-liners : 20 gold coins</li>
</ul>
```

### Example 19

```jsx
<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
  @lucide/svelte
</code>
```

### Example 20

```jsx
<code class="bg-muted relative rounded px-[0.3rem] py-[0.2rem] font-mono text-sm font-semibold">
  @lucide/svelte
</code>
```

### Example 21

```jsx
<p class="text-muted-foreground text-xl">
  A modal dialog that interrupts the user with important content and expects a response.
</p>
```

### Example 22

```jsx
<p class="text-muted-foreground text-xl">
  A modal dialog that interrupts the user with important content and expects a response.
</p>
```

### Example 23

```jsx
<div class="text-lg font-semibold">Are you sure absolutely sure?</div>
```

### Example 24

```jsx
<div class="text-lg font-semibold">Are you sure absolutely sure?</div>
```

### Example 25

```jsx
<small class="text-sm leading-none font-medium">Email address</small>
```

### Example 26

```jsx
<small class="text-sm leading-none font-medium">Email address</small>
```

### Example 27

```jsx
<p class="text-muted-foreground text-sm">Enter your email address.</p>
```

### Example 28

```jsx
<p class="text-muted-foreground text-sm">Enter your email address.</p>
```

## Sections

## The King's Plan

### The Joke Tax

### Jokester's Revolt

### The People's Rebellion

## h1

## h2

## The People of the Kingdom

## h3

### The Joke Tax

## h4

#### People stopped telling jokes

## p

## blockquote

## table

## list

## Inline code

## Lead

## Large

## Small

## Muted
