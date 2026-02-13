# ACE - Agentic Context Engineering

ACE is een framework waarbij AI-systemen hun eigen context kunnen verbeteren. In plaats van één perfecte prompt te schrijven, bouw je een **evoluerend playbook** dat continu wordt aangescherpt op basis van echte execution-feedback.

## Kernconcept

```
Traditional:  Schrijf perfecte prompt → hoop dat het werkt
ACE:          Start met goede prompt → analyseer resultaten → verbeter iteratief
```

### Problemen die ACE oplost

| Probleem             | Symptoom                             | ACE Oplossing                        |
| -------------------- | ------------------------------------ | ------------------------------------ |
| **Brevity bias**     | AI antwoordt te kort, mist details   | Reflection detecteert onvolledigheid |
| **Context collapse** | Kwaliteit daalt bij lange gesprekken | Curation behoudt belangrijke context |
| **Stale prompts**    | Prompts verouderen, niet aangepast   | Version control met rollback         |
| **No feedback loop** | Geen lering van fouten               | Evidence-based improvements          |

## Workflow

```
┌─────────────────────────────────────────────────────────────┐
│                    ACE Workflow                              │
├─────────────────────────────────────────────────────────────┤
│                                                              │
│   Generation          Reflection          Curation           │
│   ──────────          ──────────          ─────────          │
│   AI executes         Analyze session     Human reviews      │
│   instructions        for friction        suggestions        │
│        │                    │                   │            │
│        ▼                    ▼                   ▼            │
│   [Session logs]  →   [Findings]     →   [Approved changes] │
│                           │                   │              │
│                           ▼                   ▼              │
│                      [Rubric scores]    [Updated prompts]    │
│                                              │               │
│                                              ▼               │
│                                        [Version history]     │
│                                                              │
└─────────────────────────────────────────────────────────────┘
```

### 1. Generation

AI voert instructies uit met huidige prompts.

```
User: "Create a REST API"
AI: [Uses current SKILL.md] → Produces output
Session: Logged for analysis
```

### 2. Reflection

Analyseer sessie(s) op problemen en verbeterpunten.

```
Analyze:
- Was user satisfied?
- Were there corrections/retries?
- Was output complete?
- Was efficiency optimal?
```

### 3. Curation

Menselijke goedkeuring van voorgestelde wijzigingen.

```
Proposed change:
  In SKILL.md, add: "Always include error handling examples"

Human: Approve / Reject / Edit
```

## Evaluatie Rubric

| Criterium        | Gewicht | Score 1-5                 | Trigger voor suggestie |
| ---------------- | ------- | ------------------------- | ---------------------- |
| **Completeness** | 20%     | 1=Onvolledig, 5=Volledig  | < 3 = suggestie        |
| **Accuracy**     | 25%     | 1=Fout, 5=Correct         | < 3 = verplicht        |
| **Efficiency**   | 20%     | 1=Inefficiënt, 5=Optimaal | < 2 = suggestie        |
| **Tone**         | 15%     | 1=Verkeerd, 5=Passend     | < 2 = suggestie        |
| **Clarity**      | 20%     | 1=Verwarrend, 5=Duidelijk | < 3 = suggestie        |

### Score Interpretatie

| Totaal        | Actie              |
| ------------- | ------------------ |
| **< 3.0**     | Verplicht voorstel |
| **3.0 - 4.0** | Optioneel voorstel |
| **> 4.0**     | Alleen loggen      |

## Patterns

### Success Patterns

#### Separate Judge Pattern

Gebruik aparte agent voor evaluatie, niet dezelfde als execution.

```
❌ BAD: Executor evalueert eigen werk
✅ GOOD: Dedicated judge agent evalueert
```

#### Evidence-Based Changes

Elke wijziging moet ondersteund worden door specifieke interacties.

```
❌ BAD: "Make responses shorter"
✅ GOOD: "Reduce intro length because user said 'te langdradig' in msg 7"
```

#### Cooldown Period

Wacht tussen wijzigingen om patronen te observeren.

```
Rule: Minimaal 3 vergelijkbare problemen voordat prompt wordt aangepast
```

#### Version History

Alle versies bewaren met rollback capability.

```
skill-v1.0.md
skill-v1.1.md  (rollback possible)
skill-v1.2.md
```

### Anti-Patterns

#### Nice Judge

Beoordelaar is te mild, scoort alles hoog.

```
Problem: Judge gives 5/5 on everything
Result: No improvements ever made
Fix: Calibrate with human reviews
```

#### Reactive Only

Alleen reageren op problemen, niet proactief.

```
Problem: Wait for failures before improving
Result: Repeated failures before fix
Fix: Proactive analysis of borderline cases
```

#### Auto-Apply

Automatisch wijzigingen toepassen zonder human approval.

```
Problem: No human oversight
Result: Bad changes compound
Fix: ALWAYS require human approval
```

#### Single Signal

Op basis van één probleem direct wijzigen.

```
Problem: One complaint = immediate change
Result: Overfitting to edge cases
Fix: Require multiple signals before change
```

## Two-Source System

ACE gebruikt twee bronnen voor context:

### Offline Context (System Prompts)

- SKILL.md files
- Agent definitions
- Command files

```
Changes: Require human approval
Frequency: Weekly or on significant patterns
```

### Online Context (Memory)

- Session-specific reminders
- Temporary adjustments
- Conversation tracking

```
Changes: Automatic during session
Frequency: Real-time
Lifetime: Session duration
```

## Implementation

### /ace-reflect Command

```bash
/ace-reflect              # Analyseer huidige sessie
/ace-reflect --help       # Toon help
/ace-reflect skill:naam   # Focus op specifieke skill
/ace-reflect agent:naam   # Focus op specifieke agent
/ace-reflect all          # Analyseer alle sessies
```

### Output Format

```markdown
## ACE Reflection Report

**Analyzed**: 3 sessions, 47 interactions
**Scope**: skill:opencode-mastery
**Date**: 2025-02-13

### Scores

| Criterium    | Score     | Notes               |
| ------------ | --------- | ------------------- |
| Completeness | 4/5       | Good coverage       |
| Accuracy     | 3/5       | One error corrected |
| Efficiency   | 2/5       | Too verbose         |
| Tone         | 4/5       | Appropriate         |
| Clarity      | 3/5       | Some confusion      |
| **Total**    | **16/25** |                     |

### Findings

1. **Issue**: Overly verbose responses
   - Evidence: User said "te langdradig" (msg 7)
   - Score: Efficiency 2/5

2. **Issue**: Missing error handling examples
   - Evidence: User asked for clarification (msg 12)
   - Score: Completeness 4/5

### Suggestions

1. **Target**: src/skill/opencode-mastery/SKILL.md
   **Change**: Add "Keep responses concise, offer deep-dive on request"
   **Reason**: User indicated preference for brevity

2. **Target**: src/skill/opencode-mastery/SKILL.md
   **Change**: Add error handling section with examples
   **Reason**: Missing in current version, user needed clarification

### Decision

- [x] Suggestions for review (score 15-19)
- [ ] No changes needed
- [ ] Changes recommended immediately
```

## Decision Matrix

| Scenario                 | Action              |
| ------------------------ | ------------------- |
| Score ≥ 4.0 + no pattern | Log only            |
| Score 3.0-4.0 + pattern  | Optional suggestion |
| Score < 3.0              | Required suggestion |
| Accuracy < 3             | Immediate attention |
| 3+ similar complaints    | Priority fix        |
| Single complaint         | Monitor             |

## Best Practices

1. **Start Simple** - Begin met basis prompts, verbeter iteratief
2. **Measure First** - Meet voordat je wijzigt
3. **Human Approval** - Altijd menselijke goedkeuring
4. **Version Control** - Alle wijzigingen met rollback
5. **Evidence-Based** - Onderbouw elke wijziging
6. **Cooldown** - Niet te snel wijzigen
7. **Separate Judge** - Aparte agent voor evaluatie

## Referenties

- Framework: `references/ace-framework.mdx`
- Rubric: `references/ace-rubric.mdx`
- Patterns: `references/ace-patterns.mdx`
- Command: `.opencode/commands/ace-reflect.md`
