# shadcn-svelte

**Source**: https://www.shadcn-svelte.com/docs/cli

## Table of Contents

- [init](#init)
- [add](#add)
- [registry build](#registry-build)
- [Outgoing Requests](#outgoing-requests)
  - [Proxy](#proxy)

## Content

Use the shadcn-svelte CLI to add components to your project.

Use the init command to initialize dependencies for a new project.

The init command installs dependencies, adds the cn util, and creates CSS variables for the project.

You will be asked a few questions to configure components.json:

Use the add command to add components and dependencies to your project.

Use the registry build command to generate the registry JSON files.

This command reads the registry.json file and generates the registry JSON files into the static/r directory.

This enables the use of a proxy when sending out requests to fetch from the shadcn-svelte registry. If the HTTP_PROXY or http_proxy environment variables have been set, the request library underneath will respect the proxy settings.

## Code Examples

### Example 1

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 2

```python
pnpm dlx shadcn-svelte@latest init
```

### Example 3

```python
npx shadcn-svelte@latest init
```

### Example 4

```python
npx shadcn-svelte@latest init
```

### Example 5

```python
npx shadcn-svelte@latest init
```

### Example 6

```python
npx shadcn-svelte@latest init
```

### Example 7

```python
bun x shadcn-svelte@latest init
```

### Example 8

```python
bun x shadcn-svelte@latest init
```

### Example 9

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 10

```python
Which base color would you like to use? › Slate
Where is your global CSS file? (this file will be overwritten) › src/routes/layout.css
Configure the import alias for lib: › $lib
Configure the import alias for components: › $lib/components
Configure the import alias for utils: › $lib/utils
Configure the import alias for hooks: › $lib/hooks
Configure the import alias for ui: › $lib/components/ui
```

### Example 11

```yaml
Usage: shadcn-svelte init [options]

initialize your project and install dependencies

Options:
  -c, --cwd <path>           the working directory (default: the current directory)
  -o, --overwrite            overwrite existing files (default: false)
  --no-deps                  disable adding & installing dependencies
  --skip-preflight           ignore preflight checks and continue (default: false)
  --base-color <name>        the base color for the components (choices: "slate", "gray", "zinc",
                             "neutral", "stone")
  --css <path>               path to the global CSS file
  --components-alias <path>  import alias for components
  --lib-alias <path>         import alias for lib
  --utils-alias <path>       import alias for utils
  --hooks-alias <path>       import alias for hooks
  --ui-alias <path>          import alias for ui
  --proxy <proxy>            fetch items from registry using a proxy
  -h, --help                 display help for command
```

### Example 12

```yaml
Usage: shadcn-svelte init [options]

initialize your project and install dependencies

Options:
  -c, --cwd <path>           the working directory (default: the current directory)
  -o, --overwrite            overwrite existing files (default: false)
  --no-deps                  disable adding & installing dependencies
  --skip-preflight           ignore preflight checks and continue (default: false)
  --base-color <name>        the base color for the components (choices: "slate", "gray", "zinc",
                             "neutral", "stone")
  --css <path>               path to the global CSS file
  --components-alias <path>  import alias for components
  --lib-alias <path>         import alias for lib
  --utils-alias <path>       import alias for utils
  --hooks-alias <path>       import alias for hooks
  --ui-alias <path>          import alias for ui
  --proxy <proxy>            fetch items from registry using a proxy
  -h, --help                 display help for command
```

### Example 13

```python
pnpm dlx shadcn-svelte@latest add [component]
```

### Example 14

```python
pnpm dlx shadcn-svelte@latest add [component]
```

### Example 15

```python
npx shadcn-svelte@latest add [component]
```

### Example 16

```python
npx shadcn-svelte@latest add [component]
```

### Example 17

```python
npx shadcn-svelte@latest add [component]
```

### Example 18

```python
npx shadcn-svelte@latest add [component]
```

### Example 19

```python
bun x shadcn-svelte@latest add [component]
```

### Example 20

```python
bun x shadcn-svelte@latest add [component]
```

### Example 21

```yaml
Usage: shadcn-svelte add [options] [components...]

add components to your project

Arguments:
  components         the components to add or a url to the component

Options:
  -c, --cwd <path>   the working directory (default: the current directory)
  --no-deps         skips adding & installing package dependencies
  --skip-preflight  ignore preflight checks and continue (default: false)
  -a, --all         install all components to your project (default: false)
  -y, --yes         skip confirmation prompt (default: false)
  -o, --overwrite   overwrite existing files (default: false)
  --proxy <proxy>   fetch components from registry using a proxy
  -h, --help        display help for command
```

### Example 22

```yaml
Usage: shadcn-svelte add [options] [components...]

add components to your project

Arguments:
  components         the components to add or a url to the component

Options:
  -c, --cwd <path>   the working directory (default: the current directory)
  --no-deps         skips adding & installing package dependencies
  --skip-preflight  ignore preflight checks and continue (default: false)
  -a, --all         install all components to your project (default: false)
  -y, --yes         skip confirmation prompt (default: false)
  -o, --overwrite   overwrite existing files (default: false)
  --proxy <proxy>   fetch components from registry using a proxy
  -h, --help        display help for command
```

### Example 23

```python
pnpm dlx shadcn-svelte@latest registry build [registry.json]
```

### Example 24

```python
pnpm dlx shadcn-svelte@latest registry build [registry.json]
```

### Example 25

```python
npx shadcn-svelte@latest registry build [registry.json]
```

### Example 26

```python
npx shadcn-svelte@latest registry build [registry.json]
```

### Example 27

```python
npx shadcn-svelte@latest registry build [registry.json]
```

### Example 28

```python
npx shadcn-svelte@latest registry build [registry.json]
```

### Example 29

```python
bun x shadcn-svelte@latest registry build [registry.json]
```

### Example 30

```python
bun x shadcn-svelte@latest registry build [registry.json]
```

### Example 31

```yaml
Usage: shadcn-svelte registry build [options] [registry]

build components for a shadcn-svelte registry

Arguments:
  registry             path to registry.json file (default: ./registry.json)

Options:
  -c, --cwd <path>     the working directory (default: the current directory)
  -o, --output <path>  destination directory for json files (default: ./static/r)
  -h, --help           display help for command
```

### Example 32

```yaml
Usage: shadcn-svelte registry build [options] [registry]

build components for a shadcn-svelte registry

Arguments:
  registry             path to registry.json file (default: ./registry.json)

Options:
  -c, --cwd <path>     the working directory (default: the current directory)
  -o, --output <path>  destination directory for json files (default: ./static/r)
  -h, --help           display help for command
```

### Example 33

```python
HTTP_PROXY="<proxy-url>" npx shadcn-svelte@latest init
```

### Example 34

```python
HTTP_PROXY="<proxy-url>" npx shadcn-svelte@latest init
```

## Sections

## init

## add

## registry build

## Outgoing Requests

### Proxy
