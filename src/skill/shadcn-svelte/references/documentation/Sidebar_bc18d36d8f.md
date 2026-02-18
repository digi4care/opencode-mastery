# Sidebar

**Source**: https://www.shadcn-svelte.com/docs/components/sidebar

## Table of Contents

- [Installation](#installation)
- [Structure](#structure)
- [Usage](#usage)
- [Your First Sidebar](#your-first-sidebar)
- [Components](#components)
- [Sidebar.Provider](#sidebar.provider)
  - [Props](#props)
  - [Width](#width)
  - [Keyboard Shortcut](#keyboard-shortcut)
- [Sidebar.Root](#sidebar.root)
  - [Props](#props)
  - [side](#side)
  - [variant](#variant)
  - [collapsible](#collapsible)
- [useSidebar](#usesidebar)
- [Sidebar.Header](#sidebar.header)
- [Sidebar.Footer](#sidebar.footer)
- [Sidebar.Content](#sidebar.content)
- [Sidebar.Group](#sidebar.group)
- [Collapsible Sidebar.Group](#collapsible-sidebar.group)
- [Sidebar.GroupAction](#sidebar.groupaction)
- [Sidebar.Menu](#sidebar.menu)
- [Sidebar.MenuButton](#sidebar.menubutton)
  - [Link or Anchor](#link-or-anchor)
  - [Icon and Label](#icon-and-label)
  - [isActive](#isactive)
- [Sidebar.MenuAction](#sidebar.menuaction)
  - [DropdownMenu](#dropdownmenu)
- [Sidebar.MenuSub](#sidebar.menusub)
- [Collapsible Sidebar.Menu](#collapsible-sidebar.menu)
- [Sidebar.MenuBadge](#sidebar.menubadge)
- [Sidebar.MenuSkeleton](#sidebar.menuskeleton)
- [Sidebar.Separator](#sidebar.separator)
- [Sidebar.Trigger](#sidebar.trigger)
- [Custom Trigger](#custom-trigger)
- [Sidebar.Rail](#sidebar.rail)
- [Controlled Sidebar](#controlled-sidebar)
- [Theming](#theming)
- [Styling](#styling)

## Content

A composable, themeable and customizable sidebar component.

Sidebars are one of the most complex components to build. They are central to any application and often contain a lot of moving parts.

Shad doesn't like building sidebars, so he built 30+ of them with all kinds of configurations. The core components have been extracted into sidebar-\*.svelte files, and you can use them in your own projects.

We now have a solid foundation to build on top of. Composable. Themeable. Customizable.

Browse the Blocks Library.

We'll go over the colors later in the theming section.

Copy and paste the following code into your project.

We'll go over the colors later in the theming section.

A Sidebar component is composed of the following parts:

Let's start with the most basic sidebar. A collapsible sidebar with a menu.

Add a Sidebar.Provider and Sidebar.Trigger at the root of your application.

Create a new sidebar component at src/lib/components/app-sidebar.svelte.

Now, let's add a Sidebar.Menu to the sidebar.

We'll use the Sidebar.Menu component in a Sidebar.Group.

The components in the sidebar-\*.svelte files are built to be composable i.e you build your sidebar by putting the provided components together. They also compose well with other shadcn-svelte components such as DropdownMenu, Collapsible, Dialog, etc.

If you need to change the code in the sidebar-\*.svelte files, you are encouraged to do so. The code is yours. Use the provided components as a starting point to build your own

In the next sections, we'll go over each component and how to use them.

The Sidebar.Provider component is used to provide the sidebar context to the Sidebar component. You should always wrap your application in a Sidebar.Provider component.

If you have a single sidebar in your application, you can use the SIDEBAR_WIDTH and SIDEBAR_WIDTH_MOBILE constants in src/lib/components/ui/sidebar/constants.ts to set the width of the sidebar.

For multiple sidebars in your application, you can use the style prop to set the width of the sidebar.

To set the width of the sidebar, you can use the --sidebar-width and --sidebar-width-mobile CSS variables in the style prop.

This will not only handle the width of the sidebar but also the layout spacing.

The SIDEBAR_KEYBOARD_SHORTCUT variable in src/lib/components/ui/sidebar/constants.ts is used to set the keyboard shortcut used to open and close the sidebar.

To trigger the sidebar, you use the cmd+b keyboard shortcut on Mac and ctrl+b on Windows.

You can change the keyboard shortcut by changing the value of the SIDEBAR_KEYBOARD_SHORTCUT variable.

The main Sidebar component used to render a collapsible sidebar.

Use the side prop to change the side of the sidebar.

Available options are left and right.

Use the variant prop to change the variant of the sidebar.

Available options are sidebar, floating and inset.

Note: If you use the inset variant, remember to wrap your main content in a SidebarInset component.

Use the collapsible prop to make the sidebar collapsible.

Available options are offcanvas, icon and none.

The useSidebar function is used to hook into the sidebar context. It returns a reactive class instance, so it cannot be destructured. Additionally, it must be called during the lifecycle of the component.

Use the Sidebar.Header component to add a sticky header to the sidebar.

The following example adds a <DropdownMenu> to the Sidebar.Header.

Use the Sidebar.Footer component to add a sticky footer to the sidebar.

The following example adds a <DropdownMenu> to the Sidebar.Footer.

The Sidebar.Content component is used to wrap the content of the sidebar. This is where you add your Sidebar.Group components. It is scrollable.

Use the Sidebar.Group component to create a section within the sidebar.

A Sidebar.Group has a Sidebar.GroupLabel, a Sidebar.GroupContent and an optional Sidebar.GroupAction.

To make a Sidebar.Group collapsible, wrap it in a Collapsible.

Note: We wrap the Collapsible.Trigger in a Sidebar.GroupLabel to render a button.

Use the Sidebar.GroupAction component to add an action to a Sidebar.Group.

The Sidebar.Menu component is used for building a menu within a Sidebar.Group.

A Sidebar.Menu is composed of Sidebar.MenuItem, Sidebar.MenuButton, Sidebar.MenuAction, and Sidebar.MenuSub components.

Here's an example of a Sidebar.Menu component rendering a list of projects.

The Sidebar.MenuButton component is used to render a menu button within a Sidebar.Menu.

By default, the Sidebar.MenuButton renders a button, but you can use the child snippet to render a different component such as an <a> tag.

You can render an icon and a truncated label inside the button. Remember to wrap the label in a <span> tag.

Use the isActive prop to mark a menu item as active.

The Sidebar.MenuAction component is used to render a menu action within a Sidebar.Menu.

This button works independently of the Sidebar.MenuButton, i.e. you can have the Sidebar.MenuButton as a clickable link and the Sidebar.MenuAction as a button.

Here's an example of a Sidebar.MenuAction that renders a DropdownMenu.

The Sidebar.MenuSub component is used to render a submenu within a Sidebar.Menu.

Use Sidebar.MenuSubItem and Sidebar.MenuSubButton to render a submenu item.

To make a Sidebar.Menu collapsible, wrap it and the Sidebar.MenuSub components in a Collapsible.

The Sidebar.MenuBadge component is used to render a badge within a Sidebar.MenuItem.

The Sidebar.MenuSkeleton component is used to render a skeleton within a Sidebar.MenuItem. You can use this to show a loading state while waiting for data to load.

The Sidebar.Separator component is used to render a separator within a Sidebar.

Use the Sidebar.Trigger component to render a button that toggles the sidebar.

The Sidebar.Trigger component must be used within a Sidebar.Provider.

To create a custom trigger, you can use the useSidebar hook.

The Sidebar.Rail component is used to render a rail within a Sidebar.Root. This rail can be used to toggle the sidebar.

Use Svelte's Function Binding to control the sidebar state.

We use the following CSS variables to theme the sidebar.

We intentionally use different variables for the sidebar and the rest of the application to make it easy to have a sidebar that is styled differently from the rest of the application. Think a sidebar with a darker shade from the main application.

Here are some tips for styling the sidebar based on different states.

You can find more tips on using states for styling in this Twitter thread.

## Code Examples

### Example 1

```python
pnpm dlx shadcn-svelte@latest add sidebar
```

### Example 2

```python
pnpm dlx shadcn-svelte@latest add sidebar
```

### Example 3

```python
npx shadcn-svelte@latest add sidebar
```

### Example 4

```python
npx shadcn-svelte@latest add sidebar
```

### Example 5

```python
npx shadcn-svelte@latest add sidebar
```

### Example 6

```python
npx shadcn-svelte@latest add sidebar
```

### Example 7

```python
bun x shadcn-svelte@latest add sidebar
```

### Example 8

```python
bun x shadcn-svelte@latest add sidebar
```

### Example 9

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### Example 10

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### Example 11

```javascript
export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
```

### Example 12

```javascript
export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7;
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
```

### Example 13

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### Example 14

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### Example 15

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
```

### Example 16

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
```

### Example 17

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
```

### Example 18

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
</Sidebar.Root>
```

### Example 19

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
```

### Example 20

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
  import AppSidebar from "$lib/components/app-sidebar.svelte";

  let { children } = $props();
</script>

<Sidebar.Provider>
  <AppSidebar />
  <main>
    <Sidebar.Trigger />
    {@render children?.()}
  </main>
</Sidebar.Provider>
```

### Example 21

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root>
  <Sidebar.Content />
</Sidebar.Root>
```

### Example 22

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root>
  <Sidebar.Content />
</Sidebar.Root>
```

### Example 23

```typescript
<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SearchIcon from "@lucide/svelte/icons/search";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  // Menu items.
  const items = [
    {
      title: "Home",
      url: "#",
      icon: HouseIcon,
    },
    {
      title: "Inbox",
      url: "#",
      icon: InboxIcon,
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 24

```typescript
<script lang="ts">
  import CalendarIcon from "@lucide/svelte/icons/calendar";
  import HouseIcon from "@lucide/svelte/icons/house";
  import InboxIcon from "@lucide/svelte/icons/inbox";
  import SearchIcon from "@lucide/svelte/icons/search";
  import SettingsIcon from "@lucide/svelte/icons/settings";
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  // Menu items.
  const items = [
    {
      title: "Home",
      url: "#",
      icon: HouseIcon,
    },
    {
      title: "Inbox",
      url: "#",
      icon: InboxIcon,
    },
    {
      title: "Calendar",
      url: "#",
      icon: CalendarIcon,
    },
    {
      title: "Search",
      url: "#",
      icon: SearchIcon,
    },
    {
      title: "Settings",
      url: "#",
      icon: SettingsIcon,
    },
  ];
</script>

<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each items as item (item.title)}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={item.url} {...props}>
                    <item.icon />
                    <span>{item.title}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 25

```javascript
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
```

### Example 26

```javascript
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
```

### Example 27

```json
<Sidebar.Provider
  style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;"
>
  <Sidebar.Root />
</Sidebar.Provider>
```

### Example 28

```json
<Sidebar.Provider
  style="--sidebar-width: 20rem; --sidebar-width-mobile: 20rem;"
>
  <Sidebar.Root />
</Sidebar.Provider>
```

### Example 29

```javascript
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
```

### Example 30

```javascript
export const SIDEBAR_KEYBOARD_SHORTCUT = "b";
```

### Example 31

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root />
```

### Example 32

```jsx
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";
</script>

<Sidebar.Root />
```

### Example 33

```unknown
<Sidebar.Root side="left | right" />
```

### Example 34

```unknown
<Sidebar.Root side="left | right" />
```

### Example 35

```unknown
<Sidebar.Root variant="sidebar | floating | inset" />
```

### Example 36

```unknown
<Sidebar.Root variant="sidebar | floating | inset" />
```

### Example 37

```typescript
<Sidebar.Provider>
  <Sidebar.Root variant="inset">
    <Sidebar.Inset>
      <main>
        <!-- Your main content -->
      </main>
    </Sidebar.Inset>
  </Sidebar.Root>
</Sidebar.Provider>
```

### Example 38

```typescript
<Sidebar.Provider>
  <Sidebar.Root variant="inset">
    <Sidebar.Inset>
      <main>
        <!-- Your main content -->
      </main>
    </Sidebar.Inset>
  </Sidebar.Root>
</Sidebar.Provider>
```

### Example 39

```rust
<Sidebar.Root collapsible="offcanvas | icon | none" />
```

### Example 40

```rust
<Sidebar.Root collapsible="offcanvas | icon | none" />
```

### Example 41

```jsx
<script lang="ts">
  import {useSidebar} from "$lib/components/ui/sidebar/index.js"; sidebar.state; sidebar.isMobile;
  sidebar.toggle();
</script>
```

### Example 42

```jsx
<script lang="ts">
  import {useSidebar} from "$lib/components/ui/sidebar/index.js"; sidebar.state; sidebar.isMobile;
  sidebar.toggle();
</script>
```

### Example 43

```jsx
<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton {...props}>
                Select Workspace
                <ChevronDown class="ms-auto" />
              </Sidebar.MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)">
            <DropdownMenu.Item>
              <span>Acme Inc</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span>Acme Corp.</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
</Sidebar.Root>
```

### Example 44

```jsx
<Sidebar.Root>
  <Sidebar.Header>
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu.Root>
          <DropdownMenu.Trigger>
            {#snippet child({ props })}
              <Sidebar.MenuButton {...props}>
                Select Workspace
                <ChevronDown class="ms-auto" />
              </Sidebar.MenuButton>
            {/snippet}
          </DropdownMenu.Trigger>
          <DropdownMenu.Content class="w-(--bits-dropdown-menu-anchor-width)">
            <DropdownMenu.Item>
              <span>Acme Inc</span>
            </DropdownMenu.Item>
            <DropdownMenu.Item>
              <span>Acme Corp.</span>
            </DropdownMenu.Item>
          </DropdownMenu.Content>
        </DropdownMenu.Root>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  </Sidebar.Header>
</Sidebar.Root>
```

### Example 45

```jsx
<Sidebar.Provider>
  <Sidebar.Root>
    <Sidebar.Header />
    <Sidebar.Content />
    <Sidebar.Footer>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton
                  {...props}
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  Username
                  <ChevronUp class="ms-auto" />
                </Sidebar.MenuButton>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              side="top"
              class="w-(--bits-dropdown-menu-anchor-width)"
            >
              <DropdownMenu.Item>
                <span>Account</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>Billing</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>Sign out</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Footer>
  </Sidebar.Root>
  <Sidebar.Inset>
    <header class="flex h-12 items-center justify-between px-4">
      <Sidebar.Trigger />
    </header>
  </Sidebar.Inset>
</Sidebar.Provider>
```

### Example 46

```jsx
<Sidebar.Provider>
  <Sidebar.Root>
    <Sidebar.Header />
    <Sidebar.Content />
    <Sidebar.Footer>
      <Sidebar.Menu>
        <Sidebar.MenuItem>
          <DropdownMenu.Root>
            <DropdownMenu.Trigger>
              {#snippet child({ props })}
                <Sidebar.MenuButton
                  {...props}
                  class="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                >
                  Username
                  <ChevronUp class="ms-auto" />
                </Sidebar.MenuButton>
              {/snippet}
            </DropdownMenu.Trigger>
            <DropdownMenu.Content
              side="top"
              class="w-(--bits-dropdown-menu-anchor-width)"
            >
              <DropdownMenu.Item>
                <span>Account</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>Billing</span>
              </DropdownMenu.Item>
              <DropdownMenu.Item>
                <span>Sign out</span>
              </DropdownMenu.Item>
            </DropdownMenu.Content>
          </DropdownMenu.Root>
        </Sidebar.MenuItem>
      </Sidebar.Menu>
    </Sidebar.Footer>
  </Sidebar.Root>
  <Sidebar.Inset>
    <header class="flex h-12 items-center justify-between px-4">
      <Sidebar.Trigger />
    </header>
  </Sidebar.Inset>
</Sidebar.Provider>
```

### Example 47

```unknown
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 48

```unknown
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Group />
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 49

```jsx
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupAction>
        <Plus /> <span class="sr-only">Add Project</span>
      </Sidebar.GroupAction>
      <Sidebar.GroupContent></Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 50

```jsx
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Application</Sidebar.GroupLabel>
      <Sidebar.GroupAction>
        <Plus /> <span class="sr-only">Add Project</span>
      </Sidebar.GroupAction>
      <Sidebar.GroupContent></Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 51

```csharp
<Collapsible.Root open class="group/collapsible">
  <Sidebar.Group>
    <Sidebar.GroupLabel>
      {#snippet child({ props })}
        <Collapsible.Trigger {...props}>
          Help
          <ChevronDown
            class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
          />
        </Collapsible.Trigger>
      {/snippet}
    </Sidebar.GroupLabel>
    <Collapsible.Content>
      <Sidebar.GroupContent />
    </Collapsible.Content>
  </Sidebar.Group>
</Collapsible.Root>
```

### Example 52

```csharp
<Collapsible.Root open class="group/collapsible">
  <Sidebar.Group>
    <Sidebar.GroupLabel>
      {#snippet child({ props })}
        <Collapsible.Trigger {...props}>
          Help
          <ChevronDown
            class="ms-auto transition-transform group-data-[state=open]/collapsible:rotate-180"
          />
        </Collapsible.Trigger>
      {/snippet}
    </Sidebar.GroupLabel>
    <Collapsible.Content>
      <Sidebar.GroupContent />
    </Collapsible.Content>
  </Sidebar.Group>
</Collapsible.Root>
```

### Example 53

```jsx
<Sidebar.Group>
  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
  <Sidebar.GroupAction title="Add Project">
    <Plus /> <span class="sr-only">Add Project</span>
  </Sidebar.GroupAction>
  <Sidebar.GroupContent />
</Sidebar.Group>
```

### Example 54

```jsx
<Sidebar.Group>
  <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
  <Sidebar.GroupAction title="Add Project">
    <Plus /> <span class="sr-only">Add Project</span>
  </Sidebar.GroupAction>
  <Sidebar.GroupContent />
</Sidebar.Group>
```

### Example 55

```typescript
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each projects as project}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={project.url} {...props}>
                    <project.icon />
                    <span>{project.name}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 56

```typescript
<Sidebar.Root>
  <Sidebar.Content>
    <Sidebar.Group>
      <Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>
      <Sidebar.GroupContent>
        <Sidebar.Menu>
          {#each projects as project}
            <Sidebar.MenuItem>
              <Sidebar.MenuButton>
                {#snippet child({ props })}
                  <a href={project.url} {...props}>
                    <project.icon />
                    <span>{project.name}</span>
                  </a>
                {/snippet}
              </Sidebar.MenuButton>
            </Sidebar.MenuItem>
          {/each}
        </Sidebar.Menu>
      </Sidebar.GroupContent>
    </Sidebar.Group>
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 57

```jsx
<Sidebar.MenuButton>
  {#snippet child({ props })}
    <a href="/home" {...props}> Home </a>
  {/snippet}
</Sidebar.MenuButton>
```

### Example 58

```jsx
<Sidebar.MenuButton>
  {#snippet child({ props })}
    <a href="/home" {...props}> Home </a>
  {/snippet}
</Sidebar.MenuButton>
```

### Example 59

```jsx
<Sidebar.MenuButton>
  {#snippet child({ props })}
    <a href="/home" {...props}>
      <House />
      <span>Home</span>
    </a>
  {/snippet}
</Sidebar.MenuButton>
```

### Example 60

```jsx
<Sidebar.MenuButton>
  {#snippet child({ props })}
    <a href="/home" {...props}>
      <House />
      <span>Home</span>
    </a>
  {/snippet}
</Sidebar.MenuButton>
```

### Example 61

```jsx
<Sidebar.MenuButton isActive>
  {#snippet child({ props })}
    <a href="/home" {...props}>
      <House />
      <span>Home</span>
    </a>
  {/snippet}
</Sidebar.MenuButton>
```

### Example 62

```jsx
<Sidebar.MenuButton isActive>
  {#snippet child({ props })}
    <a href="/home" {...props}>
      <House />
      <span>Home</span>
    </a>
  {/snippet}
</Sidebar.MenuButton>
```

### Example 63

```jsx
<Sidebar.MenuItem>
  <Sidebar.MenuButton>
    {#snippet child({ props })}
      <a href="/home" {...props}>
        <House />
        <span>Home</span>
      </a>
    {/snippet}
  </Sidebar.MenuButton>
  <Sidebar.MenuAction>
    <Plus /> <span class="sr-only">Add Project</span>
  </Sidebar.MenuAction>
</Sidebar.MenuItem>
```

### Example 64

```jsx
<Sidebar.MenuItem>
  <Sidebar.MenuButton>
    {#snippet child({ props })}
      <a href="/home" {...props}>
        <House />
        <span>Home</span>
      </a>
    {/snippet}
  </Sidebar.MenuButton>
  <Sidebar.MenuAction>
    <Plus /> <span class="sr-only">Add Project</span>
  </Sidebar.MenuAction>
</Sidebar.MenuItem>
```

### Example 65

```jsx
<Sidebar.MenuItem>
  <Sidebar.MenuButton>
    {#snippet child({ props })}
      <a href="##" {...props}>
        <House />
        <span>Home</span>
      </a>
    {/snippet}
  </Sidebar.MenuButton>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Sidebar.MenuAction {...props}>
          <Ellipsis />
        </Sidebar.MenuAction>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content side="right" align="start">
      <DropdownMenu.Item>
        <span>Edit Project</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <span>Delete Project</span>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Sidebar.MenuItem>
```

### Example 66

```jsx
<Sidebar.MenuItem>
  <Sidebar.MenuButton>
    {#snippet child({ props })}
      <a href="##" {...props}>
        <House />
        <span>Home</span>
      </a>
    {/snippet}
  </Sidebar.MenuButton>
  <DropdownMenu.Root>
    <DropdownMenu.Trigger>
      {#snippet child({ props })}
        <Sidebar.MenuAction {...props}>
          <Ellipsis />
        </Sidebar.MenuAction>
      {/snippet}
    </DropdownMenu.Trigger>
    <DropdownMenu.Content side="right" align="start">
      <DropdownMenu.Item>
        <span>Edit Project</span>
      </DropdownMenu.Item>
      <DropdownMenu.Item>
        <span>Delete Project</span>
      </DropdownMenu.Item>
    </DropdownMenu.Content>
  </DropdownMenu.Root>
</Sidebar.MenuItem>
```

### Example 67

```unknown
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuSub>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton />
    </Sidebar.MenuSubItem>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton />
    </Sidebar.MenuSubItem>
  </Sidebar.MenuSub>
</Sidebar.MenuItem>
```

### Example 68

```unknown
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuSub>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton />
    </Sidebar.MenuSubItem>
    <Sidebar.MenuSubItem>
      <Sidebar.MenuSubButton />
    </Sidebar.MenuSubItem>
  </Sidebar.MenuSub>
</Sidebar.MenuItem>
```

### Example 69

```json
<Sidebar.Menu>
  <Collapsible.Root open class="group/collapsible">
    <Sidebar.MenuItem>
      <Collapsible.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton {...props} />
        {/snippet}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Sidebar.MenuSub>
          <Sidebar.MenuSubItem />
        </Sidebar.MenuSub>
      </Collapsible.Content>
    </Sidebar.MenuItem>
  </Collapsible.Root>
</Sidebar.Menu>
```

### Example 70

```json
<Sidebar.Menu>
  <Collapsible.Root open class="group/collapsible">
    <Sidebar.MenuItem>
      <Collapsible.Trigger>
        {#snippet child({ props })}
          <Sidebar.MenuButton {...props} />
        {/snippet}
      </Collapsible.Trigger>
      <Collapsible.Content>
        <Sidebar.MenuSub>
          <Sidebar.MenuSubItem />
        </Sidebar.MenuSub>
      </Collapsible.Content>
    </Sidebar.MenuItem>
  </Collapsible.Root>
</Sidebar.Menu>
```

### Example 71

```unknown
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuBadge>24</Sidebar.MenuBadge>
</Sidebar.MenuItem>
```

### Example 72

```unknown
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuBadge>24</Sidebar.MenuBadge>
</Sidebar.MenuItem>
```

### Example 73

```json
<Sidebar.Menu>
  {#each Array.from({ length: 5 }) as _, index (index)}
    <Sidebar.MenuItem>
      <Sidebar.MenuSkeleton />
    </Sidebar.MenuItem>
  {/each}
</Sidebar.Menu>
```

### Example 74

```json
<Sidebar.Menu>
  {#each Array.from({ length: 5 }) as _, index (index)}
    <Sidebar.MenuItem>
      <Sidebar.MenuSkeleton />
    </Sidebar.MenuItem>
  {/each}
</Sidebar.Menu>
```

### Example 75

```unknown
<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Separator />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Separator />
    <Sidebar.Group />
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 76

```unknown
<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Separator />
  <Sidebar.Content>
    <Sidebar.Group />
    <Sidebar.Separator />
    <Sidebar.Group />
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 77

```typescript
<Sidebar.Provider>
  <Sidebar.Root />
  <main>
    <Sidebar.Trigger />
  </main>
</Sidebar.Provider>
```

### Example 78

```typescript
<Sidebar.Provider>
  <Sidebar.Root />
  <main>
    <Sidebar.Trigger />
  </main>
</Sidebar.Provider>
```

### Example 79

```jsx
<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  const sidebar = useSidebar();
</script>

<button onclick={() => sidebar.toggle()}>Toggle Sidebar</button>
```

### Example 80

```jsx
<script lang="ts">
  import { useSidebar } from "$lib/components/ui/sidebar/index.js";
  const sidebar = useSidebar();
</script>

<button onclick={() => sidebar.toggle()}>Toggle Sidebar</button>
```

### Example 81

```unknown
<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
  <Sidebar.Rail />
</Sidebar.Root>
```

### Example 82

```unknown
<Sidebar.Root>
  <Sidebar.Header />
  <Sidebar.Content>
    <Sidebar.Group />
  </Sidebar.Content>
  <Sidebar.Footer />
  <Sidebar.Rail />
</Sidebar.Root>
```

### Example 83

```typescript
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  let myOpen = $state(true);
</script>

<Sidebar.Provider bind:open={() => myOpen, (newOpen) => (myOpen = newOpen)}>
  <Sidebar.Root />
</Sidebar.Provider>

<!-- or -->

<Sidebar.Provider bind:open>
  <Sidebar.Root />
</Sidebar.Provider>
```

### Example 84

```typescript
<script lang="ts">
  import * as Sidebar from "$lib/components/ui/sidebar/index.js";

  let myOpen = $state(true);
</script>

<Sidebar.Provider bind:open={() => myOpen, (newOpen) => (myOpen = newOpen)}>
  <Sidebar.Root />
</Sidebar.Provider>

<!-- or -->

<Sidebar.Provider bind:open>
  <Sidebar.Root />
</Sidebar.Provider>
```

### Example 85

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### Example 86

```css
:root {
  --sidebar: oklch(0.985 0 0);
  --sidebar-foreground: oklch(0.145 0 0);
  --sidebar-primary: oklch(0.205 0 0);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.97 0 0);
  --sidebar-accent-foreground: oklch(0.205 0 0);
  --sidebar-border: oklch(0.922 0 0);
  --sidebar-ring: oklch(0.708 0 0);
}

.dark {
  --sidebar: oklch(0.205 0 0);
  --sidebar-foreground: oklch(0.985 0 0);
  --sidebar-primary: oklch(0.488 0.243 264.376);
  --sidebar-primary-foreground: oklch(0.985 0 0);
  --sidebar-accent: oklch(0.269 0 0);
  --sidebar-accent-foreground: oklch(0.985 0 0);
  --sidebar-border: oklch(1 0 0 / 10%);
  --sidebar-ring: oklch(0.439 0 0);
}
```

### Example 87

```unknown
<Sidebar.Root collapsible="icon">
  <Sidebar.Content>
    <Sidebar.Group class="group-data-[collapsible=icon]:hidden" />
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 88

```unknown
<Sidebar.Root collapsible="icon">
  <Sidebar.Content>
    <Sidebar.Group class="group-data-[collapsible=icon]:hidden" />
  </Sidebar.Content>
</Sidebar.Root>
```

### Example 89

```unknown
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuAction
    class="peer-data-[active=true]/menu-button:opacity-100"
  />
</Sidebar.MenuItem>
```

### Example 90

```unknown
<Sidebar.MenuItem>
  <Sidebar.MenuButton />
  <Sidebar.MenuAction
    class="peer-data-[active=true]/menu-button:opacity-100"
  />
</Sidebar.MenuItem>
```

## Sections

## Installation

## Structure

## Usage

## Your First Sidebar

## Components

## Sidebar.Provider

### Props

### Width

### Keyboard Shortcut

## Sidebar.Root

### Props

### side

### variant

### collapsible

## useSidebar

## Sidebar.Header

## Sidebar.Footer

## Sidebar.Content

## Sidebar.Group

## Collapsible Sidebar.Group

## Sidebar.GroupAction

## Sidebar.Menu

## Sidebar.MenuButton

### Link or Anchor

### Icon and Label

### isActive

## Sidebar.MenuAction

### DropdownMenu

## Sidebar.MenuSub

## Collapsible Sidebar.Menu

## Sidebar.MenuBadge

## Sidebar.MenuSkeleton

## Sidebar.Separator

## Sidebar.Trigger

## Custom Trigger

## Sidebar.Rail

## Controlled Sidebar

## Theming

## Styling
