# Fase 8 - Migratieplan en Compatibiliteit

## Doel

Overstappen zonder gebruikers of bestaande flows te breken.

## Kernvragen

- Hoe migreren we veilig van legacy layout naar canonical model?
- Welke periode is nodig voor dual support?

## Migratie Strategie

### Fase A: Alpha (Opt-in)

```
Tijd: Maand 1-2
Status: Optioneel

- Canonical output naast legacy output
- Feature flag: ENABLE_CANONICAL_OUTPUT=false (default)
- Foutje? Toggle terug naar legacy
- Monitoring: anonieme usage stats
```

### Fase B: Beta (Default met Fallback)

```
Tijd: Maand 3-4
Status: Default aan, fallback mogelijk

- Canonical output default
- Fallback naar legacy als canonical faalt
- Feature flag: ENABLE_CANONICAL_OUTPUT=true (default)
- Documentatie: migratie guide
```

### Fase C: GA (Canonical Default)

```
Tijd: Maand 5-6
Status: Canonical default, legacy deprecated

- Legacy output uitgefaseerd
- Feature flag: ENABLE_CANONICAL_OUTPUT=true (locked)
- Soft deprecation warning in logs
- Houd 1 release backward compat
```

## Dual Output Mode

```typescript
class DualOutputManager {
  private legacyAdapter: LegacyAdapter;
  private canonicalAdapter: CanonicalAdapter;
  private featureFlags: FeatureFlags;

  async generateContext(task: Task): Promise<ContextOutput> {
    // Altijd legacy voor backward compat
    const legacy = await this.legacyAdapter.generate(task);

    // Alleen canonical als enabled
    if (this.featureFlags.canonicalOutputEnabled) {
      try {
        const canonical = await this.canonicalAdapter.generate(task);
        return this.mergeOutputs(legacy, canonical);
      } catch (error) {
        // Fallback naar legacy bij fout
        console.warn("Canonical failed, using legacy:", error);
        return legacy;
      }
    }

    return legacy;
  }
}
```

## Migratie Checker: Structurele Equivalentie

```typescript
function checkStructuralEquivalence(
  legacy: ContextOutput,
  canonical: ContextOutput,
): EquivalenceResult {
  const issues: string[] = [];

  // Vergelijk directories
  const legacyDirs = getDirectories(legacy);
  const canonicalDirs = getDirectories(canonical);

  if (!arraysEqual(legacyDirs, canonicalDirs)) {
    issues.push("Directory structure mismatch");
  }

  // Vergelijk bestandsnamen
  const legacyFiles = getFilenames(legacy);
  const canonicalFiles = getFilenames(canonical);

  if (!arraysEqual(legacyFiles, canonicalFiles)) {
    issues.push("File list mismatch");
  }

  return {
    equivalent: issues.length === 0,
    issues,
  };
}
```

## Migratie Checker: Semantische Equivalentie

```typescript
function checkSemanticEquivalence(
  legacy: ContextOutput,
  canonical: ContextOutput,
): EquivalenceResult {
  const issues: string[] = [];

  // Vergelijk belangrijke content
  for (const key of REQUIRED_CONTEXT_KEYS) {
    const legacyContent = getContent(legacy, key);
    const canonicalContent = getContent(canonical, key);

    if (!deepEqual(legacyContent, canonicalContent)) {
      issues.push(`Content mismatch for: ${key}`);
    }
  }

  return {
    equivalent: issues.length === 0,
    issues,
  };
}
```

## Compatibiliteitsmatrix

| Legacy Feature       | Canonical Vervanger | Status   | Migration Effort |
| -------------------- | ------------------- | -------- | ---------------- |
| `.opencode/context/` | Canonical contract  | ✅ Ready | Laag             |
| `~/.config/opencode` | Adapter-managed     | ✅ Ready | Medium           |
| Hardcoded paths      | Path resolver API   | ✅ Ready | Medium           |
| bun-only deploy      | bun + npm fallback  | 🔄 WIP   | Hoog             |

## Deliverables

- [ ] `migration/plan.md`
- [ ] `migration/checkers/structure.spec.ts`
- [ ] `migration/checkers/semantic.spec.ts`
- [ ] `migration/compat-matrix.md`

## Exit Criteria

- [ ] Geen blocker issues in dual-run pilot
- [ ] Duidelijke deprecationdatum en rollbackpad
