# Anti-Patterns

Dit document bevat alle anti-patterns die je MOET vermijden in dit project.

## Directory Naming

### ❌ NEVER: `skills/` (plural)

```
# FOUT
~/.config/opencode/skills/
.opencode/skills/

# GOED
~/.config/opencode/skill/
.opencode/skill/
```

**Reden**: Op dit systeem werkt alleen `skill/` (singular). Dit is een systeem-specifieke configuratie.

### Debug Tips

Als `skills/` vs `skill/` problemen geeft:

```bash
# Check OpenCode version
opencode --version

# Check config
cat ~/.config/opencode/opencode.json

# Compare with official repo
```

## Path Hardcoding

### ❌ NEVER: Hardcode paths

```python
# FOUT
DOCS_PATH = "/home/user/.ai_docs/opencode/docs"

# GOED
from pathlib import Path
DOCS_PATH = Path.home() / ".ai_docs" / "opencode" / "docs"
```

**Reden**: Werkt niet op andere systemen of met verschillende gebruikers.

## Cache Validation

### ❌ NEVER: Skip cache TTL check

```python
# FOUT
def download_docs():
    # Always download, no cache check
    fetch_from_github()

# GOED
def download_docs():
    if cache_is_fresh(max_age_days=7):
        return load_from_cache()
    return fetch_from_github()
```

**Reden**: Onnodige GitHub API calls, rate limiting risk.

## SKILL.md Updates

### ❌ NEVER: Modify SKILL.md without updating metadata

```yaml
# FOUT - versie niet bijgewerkt
metadata:
  version: 1.0.0  # Oude versie na wijzigingen

# GOED
metadata:
  version: 1.1.0  # Bijgewerkt na wijzigingen
  refresh: weekly
```

**Reden**: Versie tracking is essentieel voor debugging en updates.

## Package.json Scripts

### ❌ NEVER: Add scripts without updating package.json

```bash
# FOUT - script bestaat maar niet in package.json
./scripts/new-script.py

# GOED
# 1. Add to package.json scripts section
# 2. Run via npm run
bun run new-script
```

**Reden**: Scripts moeten vindbaar en uitvoerbaar zijn via standaard interface.

## Package Manager Mixing

### ❌ NEVER: Use pnpm or npm

```bash
# FOUT
pnpm install
npm run dev

# GOED
bun install
bun run dev
```

**Reden**: Project gebruikt Bun als package manager. Mengen leidt tot conflicten.

## Documentation Anti-Patterns

### ❌ NEVER: Duplicate content across files

```
# FOUT
examples/README.md bevat zelfde info als SKILL.md
PLUGIN_OVERVIEW.md bevat zelfde info als PLUGIN_ARCHITECTURE.md

# GOED
Elke file heeft unieke, specifieke content
Gebruik verwijzingen in plaats van duplicatie
```

### ❌ NEVER: Outdated examples

````markdown
# FOUT

```bash
# Voorbeeld dat niet meer werkt
python scripts/old-script.py
```
````

# GOED

```bash
# Werkend voorbeeld
uv run src/skill/opencode-mastery/scripts/download-docs.py
```

````

## Plugin Anti-Patterns

### ❌ NEVER: Assume plugin directory

```python
# FOUT - harde aanname
PLUGIN_DIR = ".opencode/plugins/"

# GOED - check beide
PLUGIN_DIRS = [".opencode/plugin/", ".opencode/plugins/"]
````

### ❌ NEVER: Unvalidated tool inputs

```typescript
// FOUT
export const myTool = tool(z.object({ path: z.string() }), async (args) => {
  // Geen pad validatie!
  return readFile(args.path);
});

// GOED
export const myTool = tool(z.object({ path: z.string() }), async (args) => {
  // Valideer pad (geen .. traversal)
  const safePath = validatePath(args.path);
  return readFile(safePath);
});
```

## Shell Command Anti-Patterns

### ❌ NEVER: Unsanitized shell commands

```typescript
// FOUT
await $`rm -rf ${userInput}`;

// GOED
const safeInput = sanitizePath(userInput);
await $`rm -rf ${safeInput}`;
```

### ❌ NEVER: Missing error handling in scripts

```bash
# FOUT
#!/bin/bash
rm -rf output/
mkdir output/

# GOED
#!/bin/bash
set -euo pipefail
trap 'echo "Error on line $LINENO"' ERR
rm -rf output/
mkdir -p output/
```

## Summary Checklist

| Anti-Pattern               | Correct Pattern             |
| -------------------------- | --------------------------- |
| `skills/` (plural)         | `skill/` (singular)         |
| Hardcoded paths            | `Path.home()`               |
| Skip cache check           | 7-day TTL validation        |
| Version not updated        | Bump version on change      |
| Script not in package.json | Add to scripts section      |
| pnpm/npm                   | Bun                         |
| Duplicate docs             | Unique content + references |
| Outdated examples          | Test all examples           |
| Assume plugin dir          | Check both variants         |
| Unvalidated inputs         | Zod + path validation       |
| Raw shell commands         | Sanitize all inputs         |
| No error handling          | `set -euo pipefail` + trap  |
