# Svelte_Docs - Testing

**Pages:** 1

---

## Testing

**URL:** llms-txt#testing

**Contents:**

- Unit and component tests with Vitest
  - Using runes inside your test files
  - Component testing
- Component tests with Storybook
- End-to-end tests with Playwright

Testing helps you write and maintain your code and guard against regressions. Testing frameworks help you with that, allowing you to describe assertions or expectations about how your code should behave. Svelte is unopinionated about which testing framework you use — you can write unit tests, integration tests, and end-to-end tests using solutions like [Vitest](https://vitest.dev/), [Jasmine](https://jasmine.github.io/), [Cypress](https://www.cypress.io/) and [Playwright](https://playwright.dev/).

## Unit and component tests with Vitest

Unit tests allow you to test small isolated parts of your code. Integration tests allow you to test parts of your application to see if they work together. If you're using Vite (including via SvelteKit), we recommend using [Vitest](https://vitest.dev/). You can use the Svelte CLI to [setup Vitest](/docs/cli/vitest) either during project creation or later on.

To setup Vitest manually, first install it:

Then adjust your `vite.config.js`:

<!-- prettier-ignore -->
> [!NOTE] If loading the browser version of all your packages is undesirable, because (for example) you also test backend libraries, [you may need to resort to an alias configuration](https://github.com/testing-library/svelte-testing-library/issues/222#issuecomment-1909993331)

You can now write unit tests for code inside your `.js/.ts` files:

### Using runes inside your test files

Since Vitest processes your test files the same way as your source files, you can use runes inside your tests as long as the filename includes `.svelte`:

If the code being tested uses effects, you need to wrap the test inside `$effect.root`:

### Component testing

It is possible to test your components in isolation, which allows you to render them in a browser (real or simulated), simulate behavior, and make assertions, without spinning up your whole app.

> [!NOTE] Before writing component tests, think about whether you actually need to test the component, or if it's more about the logic _inside_ the component. If so, consider extracting out that logic to test it in isolation, without the overhead of a component.

To get started, install jsdom (a library that shims DOM APIs):

Then adjust your `vite.config.js`:

After that, you can create a test file in which you import the component to test, interact with it programmatically and write expectations about the results:

While the process is very straightforward, it is also low level and somewhat brittle, as the precise structure of your component may change frequently. Tools like [@testing-library/svelte](https://testing-library.com/docs/svelte-testing-library/intro/) can help streamline your tests. The above test could be rewritten like this:

When writing component tests that involve two-way bindings, context or snippet props, it's best to create a wrapper component for your specific test and interact with that. `@testing-library/svelte` contains some [examples](https://testing-library.com/docs/svelte-testing-library/example).

## Component tests with Storybook

[Storybook](https://storybook.js.org) is a tool for developing and documenting UI components, and it can also be used to test your components. They're run with Vitest's browser mode, which renders your components in a real browser for the most realistic testing environment.

To get started, first install Storybook ([using Svelte's CLI](/docs/cli/storybook)) in your project via `npx sv add storybook` and choose the recommended configuration that includes testing features. If you're already using Storybook, and for more information on Storybook's testing capabilities, follow the [Storybook testing docs](https://storybook.js.org/docs/writing-tests?renderer=svelte) to get started.

You can create stories for component variations and test interactions with the [play function](https://storybook.js.org/docs/writing-tests/interaction-testing?renderer=svelte#writing-interaction-tests), which allows you to simulate behavior and make assertions using the Testing Library and Vitest APIs. Here's an example of two stories that can be tested, one that renders an empty LoginForm component and one that simulates a user filling out the form:

## End-to-end tests with Playwright

E2E (short for 'end to end') tests allow you to test your full application through the eyes of the user. This section uses [Playwright](https://playwright.dev/) as an example, but you can also use other solutions like [Cypress](https://www.cypress.io/) or [NightwatchJS](https://nightwatchjs.org/).

You can use the Svelte CLI to [setup Playwright](/docs/cli/playwright) either during project creation or later on. You can also [set it up with `npm init playwright`](https://playwright.dev/docs/intro). Additionally, you may also want to install an IDE plugin such as [the VS Code extension](https://playwright.dev/docs/getting-started-vscode) to be able to execute tests from inside your IDE.

If you've run `npm init playwright` or are not using Vite, you may need to adjust the Playwright config to tell Playwright what to do before running the tests — mainly starting your application at a certain port. For example:

You can now start writing tests. These are totally unaware of Svelte as a framework, so you mainly interact with the DOM and write assertions.

**Examples:**

Example 1 (sh):

```sh
npm install -D vitest
```

Example 2 (js):

```js
/// file: vite.config.js
import { defineConfig } from +++'vitest/config'+++;

export default defineConfig({
	// ...
	// Tell Vitest to use the `browser` entry points in `package.json` files, even though it's running in Node
	resolve: process.env.VITEST
		? {
				conditions: ['browser']
			}
		: undefined
});
```

Example 3 (js):

```js
/// file: multiplier.svelte.test.js
import { flushSync } from "svelte";
import { expect, test } from "vitest";
import { multiplier } from "./multiplier.svelte.js";

test("Multiplier", () => {
  let double = multiplier(0, 2);

  expect(double.value).toEqual(0);

  double.set(5);

  expect(double.value).toEqual(10);
});
```

Example 4 (js):

```js
/// file: multiplier.svelte.js
/**
 * @param {number} initial
 * @param {number} k
 */
export function multiplier(initial, k) {
  let count = $state(initial);

  return {
    get value() {
      return count * k;
    },
    /** @param {number} c */
    set: c => {
      count = c;
    },
  };
}
```

---
