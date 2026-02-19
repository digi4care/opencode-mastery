# Vervolg Prompt: OpenCode Mastery Project

## 📊 Huidige Status (2026-02-19)

### ✅ Voltooid Vandaag

1. **Skills Toegevoegd (7 nieuwe)**
   - test-driven-development (TDD discipline)
   - systematic-debugging (4-fase debugging)
   - playwright-cli (browser automatisering)
   - frontend-design (UI/UX voor developers)
   - database-architect (database selectie)
   - postgresql (PostgreSQL implementatie)
   - Totaal: 16 skills

2. **Plugins Gemaakt (4)**
   - opencode-mastery: Docs + Memory tools (TypeScript)
   - tdd-enforcer: TDD enforcement tools
   - debug-assistant: Debugging tools
   - om-session: Session management via SDK client

3. **Shared Config System**
   - `src/lib/config/` - Gedeelde config library
   - `opencode.config.yaml` - Single source of truth
   - Alle plugins gebruiken dezelfde config

4. **Session Manager**
   - Gebruikt OpenCode SDK client (geen HTTP/poort detectie)
   - Tools: session-list, session-read, session-search, session-stats
   - Werkt met elke poort, meerdere instances

5. **/ace-reflect Command**
   - Geupdate naar orchestrator patroon
   - Start subagent met schone context

---

## 📋 Nog Te Doen

### 1. ACE Analyzer Subagent (Hoogste prioriteit)

**Doel:** De eigenlijke analyse "hersenen" voor /ace-reflect

**Wat nodig is:**
```
src/agents/ace-analyzer/
├── AGENT.md              # Agent definitie
└── prompts/
    └── analyze.md        # Analyse prompt
```

**De agent moet:**
- Sessie data ontvangen van /ace-reflect
- ACE framework toepassen (5 dimensies scoren)
- Patronen identificeren (niet individuele fouten)
- Concrete suggesties genereren voor skills/commands

**Config toevoegen:**
```yaml
# opencode.config.yaml
agents:
  ace-analyzer:
    enabled: true
    model: default
```

### 2. Install.sh Updaten

**Toevoegen:**
- om-session plugin installatie
- Nieuwe plugin count (4 in plaats van 3)

### 3. Testen

```bash
./uninstall.sh --silent
./install.sh -y
# Test session tools
# Test /ace-reflect
```

### 4. Documentatie

- `AGENTS.md` updaten met om-session plugin
- `docs/project/config-system.md` updaten met session feature

---

## 🗂️ Belangrijke Bestanden

| Bestand | Doel |
|---------|------|
| `opencode.config.yaml` | Centrale configuratie |
| `src/lib/config/` | Gedeelde config library |
| `src/plugin/om-session/` | Session manager plugin |
| `src/commands/ace-reflect.md` | Orchestrator command |
| `docs/project/config-system.md` | Config documentatie |

---

## 🎯 Start Commando voor Volgende Sessie

```
Lees dit bestand: .tmp/NEXT-SESSION-PROMPT.md

Daar staat precies wat we gedaan hebben en wat er nog moet gebeuren.

Kort samengevat:
1. Maak ACE Analyzer subagent
2. Update install.sh
3. Test alles
4. Update documentatie

Begin met: "Ik wil de ACE Analyzer subagent maken zoals beschreven in .tmp/NEXT-SESSION-PROMPT.md"
```

---

## 📝 Config Structuur

```yaml
# opencode.config.yaml
version: "1.0"

features:
  memory: { enabled: true, ... }
  docs: { enabled: true, ... }
  tdd: { enabled: true, ... }
  debugging: { enabled: true, ... }
  playwright: { enabled: true, ... }
  session:                    # NIEUW
    enabled: true
    ace:
      max_subagent_depth: 2
      auto_apply_suggestions: false
```

---

## 🔌 Plugin Structuur

```
src/plugin/
├── opencode-mastery/     # Docs + Memory
├── tdd-enforcer/         # TDD enforcement
├── debug-assistant/      # Debugging tools
└── om-session/           # Session management (SDK client)
```

---

## Git Status

Laatste commit: `2dc6eb1 - Refactor om-session to use SDK client instead of HTTP`

Alle wijzigingen zijn gepusht naar GitHub.
