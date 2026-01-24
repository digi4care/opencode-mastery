# Standards System Spec (v1 Defaults, KISS)

## Purpose

Provide a simple, project-local standards system that can generate, inject, enforce, and validate best practices. Standards are lazy-loaded and context-matched to prevent overload while ensuring correct documentation and version-specific guidance.

## v1 Defaults (Confirmed)

- Strictness default: advisory (warn, do not block)
- Scope vocabulary: skill, agent, command, subagent, code, docs
- Triggers vocabulary: create, edit, generate, validate
- Docs references: local repo paths (e.g., docs/opencode/skills.md)
- Validate checks: simple DSL keywords (see Validate DSL section)
- Failure behavior: report violations, no auto-fix in v1
- Standards location: standards/ only (project-local)
- Tooling: plugin hooks for enforce/validate, plus standalone command
- MVP standards: opencode, project, python, svelte5

## Directory Structure (KISS)

standards/
  _index.md
  opencode.md
  python.md
  project.md
  svelte5.md

Notes:
- One standard per file, fixed section order.
- _index.md is optional and informational only.

## Standards File Format

Each standards file must follow this structure:

# <Standard Title>

Scope: skill, agent, command, subagent, code, docs
Triggers: create, edit, generate, validate
Docs:
- <doc-path or doc-id>
- <doc-path or doc-id>

Rules:
- <Rule 1>
- <Rule 2>

Validate:
- <Check 1>
- <Check 2>

## Resolver (Minimal Logic)

Inputs:
- kind: skill | agent | command | subagent | code | docs
- action: create | edit | generate | validate

Match rule:
- Scope contains kind
- Triggers contains action

Output:
- List of matching standards files
- Extracted Docs, Rules, Validate sections

## Enforce Flow (Pre-Hook)

Hook: tool.execute.before

Steps:
1. Resolve standards for the task context
2. Load Docs section and summarize relevant docs
3. Inject Rules section into the prompt
4. If no standards match, warn (advisory)

Output:
- Prompt injection with concise rules + doc summaries

## Validate Flow (Post-Hook)

Hook: tool.execute.after

Steps:
1. Resolve the same standards
2. Run Validate checks (DSL)
3. Output pass/fail, violations, and suggestions

Failure behavior:
- Advisory by default: warn and suggest fixes
- No auto-fix in v1

## Commands (Standalone)

Command: /standards

Subcommands:
- /standards discover <path>
- /standards inject <kind> <action>
- /standards validate <path>

## Generator Components

- Agent: standards-generator
  - Analyze representative files
  - Extract consistent patterns
  - Write standards in the required format

- Skill: standards-discovery
  - Repeatable discovery workflow
  - Ensures rule-first, concise standards

## Plugin Integration (OpenCode)

Because frontmatter does not support hooks, enforcement and validation must be implemented as a plugin:

- tool.execute.before -> enforce
- tool.execute.after -> validate

Frontmatter may include optional metadata for the plugin to prioritize specific standards, but the plugin must not rely on it.

## Validate DSL (v1)

Minimal, string-based checks:

- frontmatter_exists
- path_contains:<value>
- forbid_pattern:<regex>
- require_pattern:<regex>

Examples:
- path_contains:skill/
- forbid_pattern:onMount\(

## MVP Standards (v1)

- standards/opencode.md
- standards/project.md
- standards/python.md
- standards/svelte5.md

## Non-Goals (v1)

- No profiles or multi-project inheritance
- No index.yml or merge complexity
- No auto-fix

## Build Order

1. Create standards templates and MVP standards files
2. Implement resolver parser
3. Build /standards command
4. Add plugin hooks for enforce/validate
5. Run a single-task validation (RLM or Svelte5)
