---
name: repo-analysis
description: |
  Analyze GitHub repositories for architecture, patterns, and code quality.
  Use when user asks to analyze, review, or understand a GitHub repository.
---

# Repository Analysis Skill

Analyze GitHub repositories using gh CLI for cloning and local analysis.

## When to Use

- User asks to analyze a repository: "Analyseer de repo van X"
- User wants to understand a codebase: "Hoe werkt project Y?"
- User wants architecture insights: "Wat is de structuur van Z?"
- User needs to evaluate a library: "Is bibliotheek X geschikt?"

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

## Example Usage

```
User: "Analyseer de repo van vercel/next.js"

1. Call repo-analyze({ repo: "vercel/next.js", depth: 1, cleanup: false })
2. Review output: monorepo with turbo, TypeScript, React
3. Deep dive:
   - ls /tmp/next.js/packages/
   - cat /tmp/next.js/packages/next/package.json
   - grep -r "export.*function" /tmp/next.js/packages/next/src/ | head -20
4. Report findings with permalinks
5. Clean up: rm -rf /tmp/next.js
```
