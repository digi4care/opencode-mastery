---
name: repo-analysis
description: |
  Analyze GitHub repositories for architecture, patterns, and code quality.
  Use when user asks to analyze, review, or understand a GitHub repository.
license: MIT
compatibility: opencode
metadata:
  author: OpenCode Community
  version: "1.0.0"
---

# Repository Analysis Skill

Analyze GitHub repositories using gh CLI for cloning and local analysis.

## Triggers

Use this skill when the user asks:

- "Analyseer de repo van X" / "Analyze the repo of X"
- "Hoe werkt project Y?" / "How does project Y work?"
- "Wat is de structuur van Z?" / "What's the structure of Z?"
- "Is bibliotheek X geschikt?" / "Is library X suitable?"
- "Bekijk de code van X" / "Review the code of X"
- "Wat vind je van project X?" / "What do you think of project X?"
- Any request mentioning a GitHub repository (owner/repo format)

## When NOT to Use

- **Local codebase analysis** → Use `systematic-debugging` or `test-driven-development` skills
- **Single file review** → Use `read` tool directly, no cloning needed
- **Documentation lookup** → Use `opencode-mastery` skill or `ExternalScout` for library docs
- **Web content analysis** → Use `webfetch` tool for non-GitHub URLs
- **Private repos without access** → Will fail, ask user for access first

## Workflow

### Phase 1: Initial Analysis (repo-analyze tool)

```
1. Call repo-analyze tool with repository name
   - repo: "owner/repo" (required)
   - depth: 1 (default, shallow clone)
   - focus: optional directory to focus on
   - cleanup: false (keep for deeper analysis)

2. Review tool output:
   - Repository structure
   - Languages used
   - Package managers
   - Test frameworks
   - Key files
```

### Phase 2: Deep Dive (based on user intent)

**Architecture Analysis:**

```bash
# Entry points
grep -r "export.*main\|export.*App\|createServer" /tmp/repo/src/

# Dependencies
cat /tmp/repo/package.json | grep -A 50 "dependencies"

# Module structure
find /tmp/repo/src -type d | head -20
```

**Pattern Discovery:**

```bash
# Design patterns
grep -r "Factory\|Singleton\|Observer\|Strategy" /tmp/repo/src/

# Code conventions
grep -r "eslint\|prettier" /tmp/repo/.* 2>/dev/null
cat /tmp/repo/.prettierrc 2>/dev/null
```

**Quality Assessment:**

```bash
# Test coverage indicators
find /tmp/repo -name "*.test.*" -o -name "*.spec.*" | wc -l

# TypeScript strictness
cat /tmp/repo/tsconfig.json | grep "strict"

# Documentation
find /tmp/repo -name "*.md" | head -10
```

**History & Contributors:**

```bash
# Recent activity
cd /tmp/repo && git log --oneline -20

# Top contributors
cd /tmp/repo && git shortlog -sn | head -10

# Commit patterns
cd /tmp/repo && git log --format="%s" -50 | grep -E "^[a-z]+:"
```

### Phase 3: Reporting

Structure your analysis:

```markdown
## Repository Analysis: owner/repo

### Overview

- **Description**: [from tool output]
- **Stars**: [count]
- **Primary Language**: [language]
- **Package Manager**: [manager]

### Architecture

- **Structure**: [key directories and their purposes]
- **Entry Points**: [main files/modules]
- **Patterns Used**: [identified patterns]

### Quality Indicators

- **Tests**: [framework + coverage estimate]
- **Linting/Formatting**: [tools used]
- **TypeScript**: [strictness level]
- **Documentation**: [quality assessment]

### Key Findings

1. [Finding 1]
2. [Finding 2]
3. [Finding 3]

### Recommendations

- [If user asked for recommendations]

### Permalinks

- Key files: https://github.com/owner/repo/blob/[sha]/path
```

## Analysis Types

### Type A: Quick Overview

- Use depth: 1
- Focus on README, package.json, structure
- Time: 2-5 minutes

### Type B: Architecture Deep Dive

- Use depth: 1-3
- Analyze entry points, module structure, patterns
- Time: 10-20 minutes

### Type C: Code Quality Assessment

- Use depth: 1
- Focus on tests, linting, types, docs
- Time: 5-10 minutes

### Type D: Full Analysis

- Use depth: 3-5
- Comprehensive review of all aspects
- Time: 20-30 minutes

## Tips

1. **Always start with repo-analyze tool** - gives you the foundation
2. **Keep cleanup: false** until you're done with deep analysis
3. **Use permalinks** in your report for reference
4. **Focus on what user asked** - don't over-analyze irrelevant parts
5. **Clean up when done** - `rm -rf /tmp/repo-name`

## Annotated Examples

### Example 1: Quick Repository Overview

```markdown
User: "Analyseer de repo van sveltejs/svelte"

# Step 1: Call the tool (ALWAYS start here)

→ repo-analyze({ repo: "sveltejs/svelte", depth: 1, cleanup: false })

# Step 2: Tool returns foundation

← {
"path": "/tmp/svelte",
"languages": ["TypeScript", "JavaScript"],
"packageManager": "pnpm",
"structure": { "packages/": ["svelte", "svelte-motion"], "sites/": 2 }
}

# Step 3: Targeted deep dive (focus on what user might want)

→ ls /tmp/svelte/packages/svelte/src/
→ cat /tmp/svelte/packages/svelte/package.json
→ grep -r "export function" /tmp/svelte/packages/svelte/src/ | head -10

# Step 4: Report with permalinks (use SHA from tool output)

→ Report: "Svelte is a TypeScript monorepo with pnpm..."
→ Permalink: https://github.com/sveltejs/svelte/blob/[sha]/packages/svelte/src/index.ts

# Step 5: Cleanup when analysis complete

→ rm -rf /tmp/svelte
```

### Example 2: Library Evaluation

```markdown
User: "Is zod geschikt voor form validatie?"

# Step 1: Analyze the repo

→ repo-analyze({ repo: "colinhacks/zod", depth: 1 })

# Step 2: Focus on relevant parts

→ cat /tmp/zod/README.md | grep -A 10 "validation"
→ find /tmp/zod/src -name "\*.test.ts" | wc -l # Check test coverage

# Step 3: Answer the specific question

← "Yes, Zod is suitable. It has 500+ tests, TypeScript-first design..."
```

## Anti-patterns

### ❌ Never Clone Without Tool

```bash
# WRONG: Manual clone bypasses tool benefits
gh repo clone owner/repo /tmp/repo

# RIGHT: Use the tool for structured analysis
repo-analyze({ repo: "owner/repo" })
```

### ❌ Don't Over-analyze

```bash
# WRONG: Reading every file
grep -r "." /tmp/repo/src/  # Huge output, slow

# RIGHT: Targeted analysis
grep -r "export.*function" /tmp/repo/src/ | head -20
```

### ❌ Don't Forget Cleanup

```bash
# WRONG: Leaving repos in /tmp
# (fills disk over time)

# RIGHT: Always cleanup
rm -rf /tmp/repo-name
```

### ❌ Don't Use for Local Projects

```bash
# WRONG: Cloning a repo you already have locally
repo-analyze({ repo: "my-org/my-local-project" })

# RIGHT: Analyze local codebase directly
grep -r "pattern" ./src/
```

### ❌ Don't Ignore User Intent

```markdown
# WRONG: Full analysis when user asked a simple question

User: "What language is React written in?"
→ [runs 20-minute full analysis]

# RIGHT: Quick answer

→ repo-analyze({ repo: "facebook/react", depth: 1 })
→ Check languages in output
← "JavaScript and TypeScript"
```

## References

- **Tool**: `src/plugin/repo-analyzer/index.ts` - Implementation
- **Config**: `opencode.config.yaml` → `features.repoAnalyzer` - Settings
- **Related Skills**: `opencode-mastery` (docs), `systematic-debugging` (local analysis)
- **GitHub CLI**: `gh repo clone --help` - Clone options
- **Pattern Source**: [oh-my-opencode librarian agent](https://github.com/code-yeongyu/oh-my-opencode)
