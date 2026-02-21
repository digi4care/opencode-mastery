# AGENTS.md - Svelte CLI Skill

**Skill:** Svelte CLI (sv) - Project scaffolding en development toolkit

## Overview

De `sv` CLI voor Svelte projecten: create, add-ons, templates, en development workflows.

## Commands

```bash
# Project aanmaken
bunx sv create my-app
bunx sv create my-app --template skeleton --types ts

# Dependencies
bun install

# Development
bun run dev      # Dev server
bun run build    # Production build
bun run check    # Type checking
bun run lint     # ESLint
bun run format   # Prettier
```

## Templates

| Template   | Use Case          |
| ---------- | ----------------- |
| `skeleton` | Minimale setup    |
| `demo`     | Voorbeeld app     |
| `library`  | Component library |

## Code Style

- **Config files**: `svelte.config.js`, `vite.config.js`
- **TypeScript**: Gebruik `--types ts` flag
- **Linting**: ESLint + Prettier via `--eslint --prettier`

## Anti-Patterns

| Niet doen                        | Wel doen                         |
| -------------------------------- | -------------------------------- |
| Handmatig svelte.config.js maken | CLI gebruiken met flags          |
| `npm` in dit project             | `bun` gebruiken (AGENTS.md root) |
| Oude Svelte 3 syntax             | Svelte 5 runes gebruiken         |

## When to Use

- Nieuw Svelte/SvelteKit project aanmaken
- CLI commando's opzoeken
- Templates en add-ons installeren
- Development workflow setup

## Related Skills

- **svelte** - Core framework
- **svelte-kit** - Full-stack framework

## Resources

- **SKILL.md** → Complete CLI reference
- **Official Docs**: https://kit.svelte.dev/docs
