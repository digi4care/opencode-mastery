# Transcript Analysis: Memory Plugin Development Session

**Datum:** 2026-02-17
**Sessie:** Memory plugin debugging, structuur fixes, en feature development

---

## Doel van de Sessie

Memory skill testen en fixen, project structuur aligneren met OpenCode design patterns.

---

## Belangrijkste Beslissingen

### 1. Project Structuur (OpenCode Design Patterns)

**FOUT:**

```
.opencode/commands/    ← commands
.opencode/plugin/      ← plugin
```

**CORRECT:**

```
src/
├── skill/             # Skills (SKILL.md)
├── plugin/            # Plugins (TypeScript)
└── commands/          # Commands (.md)
```

**Actie:** Commands en plugin verplaatst naar `src/`, install.sh en uninstall.sh aangepast.

---

### 2. Memory CLI Bugs

**Problemen:**

- `cmd_on` checkte alleen of `.memory.md` bestaat, niet of `enabled: true`
- `cmd_status` had duplicate check: `"enabled: true" or "enabled: true"`
- `cmd_off` gebruikte simpele string replace, geen YAML parsing

**Oplossing:** `python-frontmatter` library voor proper YAML parsing

```python
import frontmatter

post = frontmatter.load(memory_file)
enabled = post.get("memory", {}).get("enabled", False)
```

---

### 3. CRITICAL Rule: Alleen Repo Files Editen

**Toegevoegd aan `.memory.md`:**

> **CRITICAL: Alleen repo bestanden editen** - NOOIT wijzigingen maken in:
>
> - `~/.ai_docs/opencode/` (geïnstalleerde scripts)
> - `~/.config/opencode/` (geïnstalleerde skills/commands)
> - Alleen editen in: `src/`, `.opencode/`, root bestanden
> - Workflow: edit in repo → commit → push → uninstall → install → test

---

### 4. Smart Remember Feature

**Nieuwe flow:**

```
Input < 30 chars
    ↓
1. Context extractie uit git commits + daily logs
    ↓
2. Enriched suggestion tonen
    ↓
3. Quick scan voor duplicaten (fuzzy match ≥70%)
    ↓
4. Gebruiker bevestigt + selecteert categorie
```

**Categorieën:**

- W = WORKFLOW
- C = CONVENTION
- B = BUGFIX
- T = TECHNICAL
- N = NOTE

---

### 5. Uninstall.sh Fix

**Probleem:** Plugin en command files bleven achter na uninstall

**Oplossing:** Toegevoegd aan uninstall.sh:

- Verwijder `~/.config/opencode/plugin/*.ts`
- Verwijder `~/.config/opencode/commands/*.md`
- Verwijder lege directories

---

## Openstaande Vragen

### Automatisch vs Handmatig Memory

**Huidig:**

- `/remember <tekst>` - handmatig
- `/memory compact` - handmatig

**Opties voor automatisering:**

1. **Hook-based** - Automatisch bij sessie-einde
2. **Time-based** - Elke X minuten
3. **Event-based** - Bij commits, tests, etc.

**Vraag:** Wat is "wijs" om automatisch op te slaan?

---

## Memory Plugin Verbeterpunten

### 1. Context Extractie

**Huidig:** Git commits gebruiken voor context enrichment

**Verbetering:** Meer bronnen?

- Recent gewijzigde bestanden
- Test resultaten
- Build errors
- Documentatie wijzigingen

### 2. Duplicate Detection

**Huidig:** Fuzzy match ≥70%

**Verbetering:**

- Semantische similarity (embeddings?)
- Context-aware merging
- Suggesties om te updaten ipv dubbel opslaan

### 3. Memory Categorisatie

**Huidig:** 5 categorieën (W/C/B/T/N)

**Verbetering:**

- Automatische categorie detectie
- Hierarchische categorieën
- Tags/labels systeem

### 4. Memory Query

**Huidig:** `/what do you know about <topic>`

**Verbetering:**

- Betere zoekfunctionaliteit
- Context-aware retrieval
- Gerelateerde memories tonen

---

## Lessons Learned

1. **Test workflow is essentieel:** uninstall → install → test
2. **YAML parsing moet proper:** regex is onbetrouwbaar
3. **Project structuur moet consistent:** volg design patterns
4. **User input validatie:** minimum lengte, context enrichment
5. **Duplicate detection:** voorkom ruis in memory

---

## Volgende Stappen

1. Automatische memory opslag onderzoeken
2. Memory query functionaliteit verbeteren
3. Context extractie uitbreiden
4. Memory visualisatie/debugging tools

---

## Files Gewijzigd

| Bestand                                            | Wijziging                          |
| -------------------------------------------------- | ---------------------------------- |
| `src/skill/opencode-mastery/scripts/memory_cli.py` | python-frontmatter, smart remember |
| `src/commands/*.md`                                | Verplaatst van .opencode/commands/ |
| `src/plugin/*`                                     | Verplaatst van .opencode/plugin/   |
| `install.sh`                                       | Plugin en commands installatie     |
| `uninstall.sh`                                     | Plugin en commands verwijdering    |
| `.memory.md`                                       | CRITICAL rule toegevoegd           |
