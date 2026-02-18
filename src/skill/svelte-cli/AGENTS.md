# AGENTS.md - Svelte CLI Skill

**Skill:** Svelte CLI (sv) - Project scaffolding en development toolkit

## Overview

De `sv` CLI voor Svelte projecten: create, add-ons, templates, en development workflows.

## Commands

```bash
# Project aanmaken
npm create svelte@latest my-app
npm create svelte@latest my-app -- --template skeleton --types ts

# Development
npm run dev      # Dev server
npm run build    # Production build
npm run check    # Type checking
npm run lint     # ESLint
npm run format   # Prettier
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
