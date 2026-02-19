# Continuation Prompt: OpenCode Mastery Project

## 📊 Current Status (2026-02-19)

### ✅ Completed Today

1. **Added Skills (7 new)**
   - test-driven-development (TDD discipline)
   - systematic-debugging (4-phase debugging)
   - playwright-cli (browser automation)
   - frontend-design (UI/UX for developers)
   - database-architect (database selection)
   - postgresql (PostgreSQL implementation)
   - Total: 16 skills

2. **Created Plugins (4)**
   - opencode-mastery: Docs + Memory tools (TypeScript)
   - tdd-enforcer: TDD enforcement tools
   - debug-assistant: Debugging tools
   - om-session: Session management via SDK client

3. **Shared Config System**
   - `src/lib/config/` - Shared config library
   - `opencode.config.yaml` - Single source of truth
   - All plugins use the same config

4. **Session Manager**
   - Uses OpenCode SDK client (no HTTP/port detection)
   - Tools: session-list, session-read, session-search, session-stats
   - Works with any port, multiple instances

5. **/ace-reflect Command**
   - Updated to orchestrator pattern
   - Starts subagent with clean context

---

## 📋 Still To Do

### 1. ACE Analyzer Subagent (Highest Priority)

**Goal:** The actual analysis "brain" for /ace-reflect

**What's needed:**

```
src/agents/ace-analyzer/
├── AGENT.md              # Agent definition
└── prompts/
    └── analyze.md        # Analysis prompt
```

**The agent must:**

- Receive session data from /ace-reflect
- Apply ACE framework (score 5 dimensions)
- Identify patterns (not individual errors)
- Generate concrete suggestions for skills/commands

**Add config:**

```yaml
# opencode.config.yaml
agents:
  ace-analyzer:
    enabled: true
    model: default
```

### 2. Update Install.sh

**Add:**

- om-session plugin installation
- New plugin count (4 instead of 3)

### 3. Test

```bash
./uninstall.sh --silent
./install.sh -y
# Test session tools
# Test /ace-reflect
```

### 4. Documentation

- Update `AGENTS.md` with om-session plugin
- Update `docs/project/config-system.md` with session feature

---

## 🗂️ Important Files

| File                            | Purpose                |
| ------------------------------- | ---------------------- |
| `opencode.config.yaml`          | Central configuration  |
| `src/lib/config/`               | Shared config library  |
| `src/plugin/om-session/`        | Session manager plugin |
| `src/commands/ace-reflect.md`   | Orchestrator command   |
| `docs/project/config-system.md` | Config documentation   |

---

## 🎯 Start Command for Next Session

```
Read this file: .tmp/NEXT-SESSION-PROMPT.md

It contains exactly what we did and what still needs to be done.

Short summary:
1. Create ACE Analyzer subagent
2. Update install.sh
3. Test everything
4. Update documentation

Start with: "I want to create the ACE Analyzer subagent as described in .tmp/NEXT-SESSION-PROMPT.md"
```

---

## 📝 Config Structure

```yaml
# opencode.config.yaml
version: "1.0"

features:
  memory: { enabled: true, ... }
  docs: { enabled: true, ... }
  tdd: { enabled: true, ... }
  debugging: { enabled: true, ... }
  playwright: { enabled: true, ... }
  session: # NEW
    enabled: true
    ace:
      max_subagent_depth: 2
      auto_apply_suggestions: false
```

---

## 🔌 Plugin Structure

```
src/plugin/
├── opencode-mastery/     # Docs + Memory
├── tdd-enforcer/         # TDD enforcement
├── debug-assistant/      # Debugging tools
└── om-session/           # Session management (SDK client)
```

---

## Git Status

Last commit: `2dc6eb1 - Refactor om-session to use SDK client instead of HTTP`

All changes pushed to GitHub.
