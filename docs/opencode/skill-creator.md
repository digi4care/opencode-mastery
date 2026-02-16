# Skill Creator Plugin

De Skill Creator plugin helpt je om skills te plannen, te auditen, te maken en te optimaliseren volgens de best practices (triggering, compacte SKILL.md, references, en expliciete error handling).

## Wat doet het?

- **Plan**: maakt een gestructureerd skill-plan (read-only)
- **Audit**: controleert een SKILL.md op best‑practice signalen
- **Create**: scaffold een nieuwe skill (SKILL.md + references) met dry‑run
- **Optimize**: past een bestaande skill aan met gestructureerde updates

## Locaties

- Plugin: `.opencode/plugin/skill-creator.ts`
- Commands: `.opencode/commands/skill-creator-*.md`

## Quick Start (Commands)

```
/skill-creator-plan <request>
/skill-creator-audit <path-to-SKILL.md>
/skill-creator-create <request>
/skill-creator-optimize <skill-dir>
```

Dry‑run is standaard; gebruik `--confirm` om echt te schrijven.

## Tools (API)

Tool-namen:

- `skill-creator-plan`
- `skill-creator-audit`
- `skill-creator-create`
- `skill-creator-optimize`

### Belangrijke velden

- `request` (verplicht voor plan/create)
- `triggers` en `negativeTriggers` (voor correcte triggering)
- `workflow` en `errorHandling` (stap‑voor‑stap)
- `tests` (should‑trigger / should‑not‑trigger / functional)
- `references` (bestandsnamen worden `.mdx`)
- `dryRun` (default `true`) en `confirm` (default `false`)

## Voorbeeld Workflow (Create)

1. Maak plan:

```
/skill-creator-plan Review API logs for error spikes
```

2. Vul ontbrekende velden aan (triggers, workflow, error handling).

3. Preview:

```
/skill-creator-create Review API logs for error spikes
```

4. Pas toe:

```
/skill-creator-create Review API logs for error spikes --confirm
```

## Voorbeeld Workflow (Optimize)

1. Dry‑run update:

```
/skill-creator-optimize src/skill/meta-agent
```

2. Bevestigen:

```
/skill-creator-optimize src/skill/meta-agent --confirm
```

## Veiligheidsregels

- Schrijven gebeurt alleen bij `--confirm`.
- Absolute paden zijn geblokkeerd; alles blijft binnen de repo.
- Bij bestaande bestanden is overwrite optioneel.

## Verwachte Output

- Lijst met geplande bestanden en acties (create/update).
- Vermelding van ontbrekende inputvelden.
- Duidelijke dry‑run status.
