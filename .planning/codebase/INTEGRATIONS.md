# External Integrations

**Analysis Date:** 2026-02-18

## APIs & External Services

**GitHub Raw Content:**

- Used for: Downloading OpenCode documentation
- Endpoint: `https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/web/src/content/docs/`
- Client: Python `urllib.request` (no external SDK)
- Auth: None (public repository)
- Files: `src/skill/opencode-mastery/scripts/download-docs.py`

**No other external APIs detected** - This is a self-contained knowledge base system.

## Data Storage

**Databases:**

- None - No database connections (PostgreSQL, MySQL, MongoDB, SQLite, Redis)

**File Storage:**

- Local filesystem only
  - Global docs: `~/.ai_docs/opencode/docs/` - Cached OpenCode documentation
  - Global memory: `~/.ai_docs/opencode/memory/` - Session memory and indexes
  - Project memory: `.memory/` and `.memory.md` - Per-project context
  - GitHub cache: `~/.ai_docs/opencode/cache/github/` - API response cache

**Caching:**

- 7-day TTL for downloaded docs (`CACHE_DAYS = 7` in `download-docs.py`)
- File-based index at `~/.ai_docs/opencode/memory/index.json`

## Authentication & Identity

**Auth Provider:**

- None - Local-only tool, no authentication required

**Implementation:**

- N/A - No user accounts or sessions

## Monitoring & Observability

**Error Tracking:**

- None - Console output only

**Logs:**

- Console logging via `print()` statements
- Verbose flag (`-v`, `--verbose`) for detailed output
- No structured logging framework

## CI/CD & Deployment

**Hosting:**

- Local installation only via `./install.sh`
- GitHub repository: `https://github.com/digi4care/opencode-mastery`

**CI Pipeline:**

- None detected - No `.github/workflows/` directory

**Installation Flow:**

1. Download from GitHub via `curl | tar`
2. Copy scripts to `~/.ai_docs/opencode/scripts/`
3. Copy skills to `~/.config/opencode/skill/*/`
4. Copy commands to `~/.config/opencode/commands/`
5. Copy plugin to `~/.config/opencode/plugin/`

## Environment Configuration

**Required env vars:**

- None - All configuration via files and paths

**Secrets location:**

- None required - No API keys or credentials

## Webhooks & Callbacks

**Incoming:**

- None - No webhook endpoints

**Outgoing:**

- None - No outbound webhooks

## Event Hooks (Internal)

**OpenCode Plugin Hooks:**
These are internal event handlers, not external webhooks:

| Hook                              | File                                                       | Purpose                         |
| --------------------------------- | ---------------------------------------------------------- | ------------------------------- |
| `session.created`                 | `src/skill/opencode-memory/src/hooks/memory-bootstrap.ts`  | Load memory at session start    |
| `experimental.session.compacting` | `src/skill/opencode-memory/src/hooks/memory-compaction.ts` | Flush session to daily log      |
| `session.deleted`                 | `src/skill/opencode-memory/src/hooks/memory-snapshot.ts`   | Create snapshot before deletion |
| `tool.execute.before`             | `src/skill/opencode-memory/src/hooks/memory-intent.ts`     | Detect memory-related intent    |

---

_Integration audit: 2026-02-18_
