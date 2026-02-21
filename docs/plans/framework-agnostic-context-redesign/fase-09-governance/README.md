# Fase 9 - Governance en CI Gates

## Doel

Continu kwaliteitsniveau afdwingen na migratie.

## Kernvragen

- Hoe voorkomen we regressie naar framework-lock-in?
- Welke tests moeten hard failen in CI?

## CI Quality Gates

### Gate 1: Contract Schema Validation

```yaml
# .github/workflows/context-conformance.yml
name: Context Conformance

on: [push, pull_request]

jobs:
  validate-contract:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - name: Validate Context Contract Schema
        run: |
          npm install -g ajv-cli
          ajv validate -s design/context-contract-v1/schema.json \
            -d "analysis/inventory/components.json"

      - name: Check Required Contexts
        run: |
          node scripts/verify-required-contexts.js
```

### Gate 2: Deterministic Generation Test

```yaml
deterministic-test:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    - name: Run Determinism Test
      run: |
        # Draai 3 keer met exact dezelfde input
        for i in 1 2 3; do
          node scripts/generate-context.js > output_$i.txt
        done

        # Vergelijk output
        diff output_1.txt output_2.txt
        diff output_2.txt output_3.txt
```

### Gate 3: Adapter Conformance Tests

```yaml
adapter-conformance:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v4

    - name: Install Dependencies
      run: npm install

    - name: Run Adapter Tests
      run: npm run test:adapters

    - name: Verify All Adapters Pass
      run: |
        node scripts/verify-adapter-compliance.js
```

## Governance Regels

### Architectuur Review

| Change Type               | Review Required               |
| ------------------------- | ----------------------------- |
| Nieuwe context feature    | Architectuurverantwoordelijke |
| Contract schema wijziging | Governance board              |
| Nieuwe adapter            | Peer review + test            |
| Backward compat breuk     | Major version approval        |

### Lock-in Lint Rules

```typescript
// lib/rules/no-hardcoded-paths.ts
export const noHardcodedPaths = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow hardcoded framework paths",
    },
  },
  create(context) {
    return {
      Literal(node) {
        if (isHardcodedPath(node.value)) {
          context.report({
            node,
            message: "Use path resolver API instead of hardcoded paths",
          });
        }
      },
    };
  },
};
```

### Changelog Discipline

Elke contract-versie wijziging vereist:

- `CHANGELOG.md` entry
- Migration guide sectie
- Deprecated feature markering (2 releases)
- Breaking changes sectie

## Operatie

### Incident Template: Drift/Fallback Bug

```markdown
## Incident: Context Drift/Fallback Bug

**Severity**: P1 | P2 | P3
**Date**: YYYY-MM-DD
**Component**:

### Description

[Beschrijf het probleem]

### Root Cause

[Wat veroorzaakte het?]

### Impact

[Wie is getroffen?]

### Fix

[Hoe is het opgelost?]

### Prevention

[Wat doen we om dit te voorkomen?]
```

### Maandelijkse Conformiteitsreview

1. Check nieuwe lock-in patterns in code
2. Review adapter conformance test resultaten
3. Update contract als nodig
4. Archiveer opgeloste issues

## Deliverables

- [ ] `.github/workflows/context-conformance.yml`
- [ ] `governance/context-architecture-rules.md`
- [ ] `governance/release-checklist.md`
- [ ] `governance/incident-template.md`

## Exit Criteria

- [ ] CI blokkeert non-conforme wijzigingen automatisch
- [ ] Team kan nieuwe runtimes toevoegen zonder core wijziging
