# Svelte CLI Overview

## Command Syntax

```
sv [command] [options]
```

## Available Commands

### create

Scaffold a new Svelte project.

```bash
sv create my-app
sv create my-app --template minimal
sv create my-app --template demo
sv create my-app --types ts
sv create my-app --types js
sv create my-app --no-add-ons
```

### add

Add packages to your project.

```bash
sv add eslint
sv add mdsvex
sv add drizzle-orm
sv add lucia
sv add mcp
```

### remove

Remove packages from your project.

```bash
sv remove eslint
sv remove mdsvex
```

### sync

Sync TypeScript types.

```bash
sv sync
```

### migrate

Run migrations.

```bash
sv migrate latest
sv migrate 2024-01-01
```

## Options

| Option      | Description  |
| ----------- | ------------ |
| `--help`    | Show help    |
| `--version` | Show version |
