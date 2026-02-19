# GSD Flow Analyzer - Implementation Proposal

## Overview

**Doel:** Een nieuwe GSD component die plans en implementaties analyseert op **flow completeness** - niet alleen of componenten bestaan, maar of ze samen een werkende flow vormen.

**Type:** Nieuwe Agent + Nieuw Command + Reference Document

---

## Het Probleem

### Wat ging er mis

GSD verification controleert **structurele compleetheid**:

- ✅ Bestaat het bestand?
- ✅ Heeft het de juiste exports?
- ✅ Zijn de imports correct?
- ✅ Zijn key_links gedefinieerd?

Maar verification controleert **NIET**:

- ❌ Werken de componenten samen als flow?
- ❌ Zijn alle conditional branches geïmplementeerd?
- ❌ Zijn preconditions correct?
- ❌ Is data correct doorgegeven tussen stappen?

### Een concreet voorbeeld (Password Reset Flow)

Stel je hebt een Password Reset feature gepland:

```
Gebruiker klikt "Wachtwoord vergeten"
        ↓
POST /api/auth/forgot-password → Email met reset link
        ↓
Gebruiker klikt link → /reset-password?token=xxx
        ↓
POST /api/auth/reset-password → Password gewijzigd
        ↓
Redirect naar /login
```

Je bouwt:

- ✅ `/api/auth/forgot-password` endpoint (bestaat)
- ✅ `/api/auth/reset-password` endpoint (bestaat)
- ✅ `/reset-password` frontend pagina (bestaat)
- ✅ Email template (bestaat)

**MAAR** je vergeet:

- ❌ Login pagina checkt NIET of token valid is voor redirect
- ❌ `/reset-password` pagina vereist dat user AL INGELOGD is (fout precondition!)
- ❌ Email bevat token, maar token wordt niet gevalideerd
- ❌ Na password reset wordt user NIET automatisch uitgelogd

**Resultaat:** Alle componenten bestaan, maar de flow werkt niet.

### De fundamentele gap

| Structural Verification | Flow Verification |
|------------------------|-------------------|
| "Bestaat `/api/auth/reset-password`?" | "Checkt het token voor password te resetten?" |
| "Bestaat `/reset-password` pagina?" | "Werkt de pagina voor niet-ingelogde users?" |
| "Zijn key_links gedefinieerd?" | "Is de conditional logic correct?" |

---

## De Oplossing

### Nieuwe componenten

| Component | Type | Locatie |
|-----------|------|---------|
| `gsd-flow-analyzer` | Agent | `~/.config/opencode/agents/gsd-flow-analyzer.md` |
| `/gsd-analyze-flow` | Command | `~/.config/opencode/commands/gsd-analyze-flow.md` |
| `flow-patterns.md` | Reference | `~/.config/opencode/get-shit-done/references/flow-patterns.md` |

### Wat Flow Analyzer doet

1. **Leest alle PLAN.md files** van een phase
2. **Extraheert intended flows** uit de plan descriptions
3. **Traceert de implementatie** door de codebase
4. **Detecteert gaps:**
   - Missing conditional branches
   - Wrong preconditions
   - Dead ends in flows
   - Missing data flow between steps
   - Unreachable code paths

### Flow Gap Types

| Gap Type | Beschrijving | Voorbeeld |
|----------|-------------|-----------|
| **MISSING_BRANCH** | Een conditional branch ontbreekt | Login checkt niet of user email verified is |
| **WRONG_PRECONDITION** | Precondition is fout | `/reset-password` vereist ingelogde user |
| **DEAD_END** | Flow eindigt zonder afsluiting | Na password reset geen redirect/logout |
| **MISSING_DATA_FLOW** | Data wordt niet doorgegeven | `requires_x` flag niet in response |
| **UNREACHABLE_CODE** | Code kan nooit bereikt worden | 2FA verify zonder login path |

---

## Implementatie Details

### 1. Agent: `gsd-flow-analyzer.md`

**Locatie:** `~/.config/opencode/agents/gsd-flow-analyzer.md`

```markdown
# gsd-flow-analyzer

## Role
Analyseert GSD phase plannen en implementaties op flow completeness.

## Context Loading
1. Load PLANNING.md for project context
2. Load all PLAN.md files from target phase
3. Load SUMMARY.md files from completed plans
4. Load relevant source files mentioned in plans

## Flow Extraction Process

### Step 1: Identify Flow Endpoints
For each plan, extract:
- User-facing entry points (routes, buttons, forms)
- API endpoints
- State transitions
- Conditional branches mentioned in descriptions

### Step 2: Map Flow Steps
Create a flow graph:
- Nodes = Steps in flow (route, API call, state change)
- Edges = Transitions between steps
- Labels = Conditions for transitions

### Step 3: Trace Implementation
For each flow step:
1. Find the actual code file
2. Extract preconditions (what must be true before)
3. Extract postconditions (what becomes true after)
4. Extract conditional branches (if X then Y else Z)
5. Identify data passed to next step

### Step 4: Detect Gaps

**MISSING_BRANCH Detection:**
```

For each conditional mentioned in plan:
  IF code has no implementation of that branch:
    REPORT gap with location and expected behavior

```

**WRONG_PRECONDITION Detection:**
```

For each flow step:
  Extract precondition from code (e.g., "if (!locals.user) redirect")
  Compare with intended flow (e.g., "anonymous user should access")
  IF mismatch:
    REPORT gap with expected vs actual precondition

```

**DEAD_END Detection:**
```

For each flow that starts:
  Trace all paths
  IF any path ends without:
    - User feedback (message, redirect, UI update)
    - State finalization (save, complete)
  THEN REPORT dead end

```

**MISSING_DATA_FLOW Detection:**
```

For each step transition:
  Identify what data step A produces
  Identify what data step B expects
  IF mismatch:
    REPORT missing data flow

```

## Output Format

```markdown
## Flow Analysis Report

### Flows Analyzed
- [Flow name] - [Entry point] → [End point]

### Gaps Found

#### GAP-1: [GAP_TYPE] - [Short description]
- **Location:** [file:line]
- **Expected:** [What should happen]
- **Actual:** [What actually happens]
- **Impact:** [User-visible impact]
- **Fix Hint:** [How to fix]

### Flow Graph
[ASCII or Mermaid diagram of intended flow with gaps marked]
```

## Verification Commands

After analysis, report:

- Total flows analyzed
- Total gaps by type
- Critical gaps (dead ends, wrong preconditions)
- Warnings (missing branches, data flow issues)

```

---

### 2. Command: `/gsd-analyze-flow`

**Locatie:** `~/.config/opencode/commands/gsd-analyze-flow.md`

```markdown
# /gsd-analyze-flow [phase-name]

Analyseert een phase op flow completeness.

## Usage
```

/gsd-analyze-flow 03-authentication
/gsd-analyze-flow 04-2fa-session-management

```

## Process
1. Spawn `gsd-flow-analyzer` agent
2. Load all plans from target phase
3. Analyze each plan's intended flows
4. Trace implementation in codebase
5. Generate gap report

## Output
- Flow Analysis Report (printed to console)
- Optional: Save to `.planning/phases/{phase}/FLOW-ANALYSIS.md`

## When to Use
- After phase planning (before execution)
- After phase execution (before verification)
- When debugging why a flow doesn't work
```

---

### 3. Reference: `flow-patterns.md`

**Locatie:** `~/.config/opencode/get-shit-done/references/flow-patterns.md`

```markdown
# Common Flow Patterns

## Pattern 1: Conditional Login Redirect

**Description:** Login may need to redirect to different pages based on user state.

**Flow:**
```

Login → Check user state
         ↓
    Has condition X? → YES → Redirect to /handle-x
         ↓ NO
    Normal redirect to dashboard

```

**Implementation Checklist:**
- [ ] Backend returns flag for condition X
- [ ] Frontend checks flag
- [ ] Frontend redirects to correct page
- [ ] /handle-x page works for just-logged-in user

**Common Gaps:**
- Backend never returns the flag
- Frontend ignores the flag
- /handle-x page requires fully authenticated session

---

## Pattern 2: Token-Based Flow

**Description:** Flow uses temporary tokens (password reset, email verification, magic link).

**Flow:**
```

Request → Generate token → Send to user
                              ↓
User clicks link → Validate token → Perform action → Invalidate token

```

**Implementation Checklist:**
- [ ] Token is cryptographically secure
- [ ] Token has expiration
- [ ] Token is single-use (invalidated after use)
- [ ] Token validation handles expired/invalid gracefully
- [ ] Action page works for anonymous users with valid token

**Common Gaps:**
- Token not validated before action
- Token not invalidated after use
- Action page requires login (wrong precondition)

---

## Pattern 3: Multi-Step Form

**Description:** User completes action across multiple steps.

**Flow:**
```

Step 1 → Validate → Save draft → Step 2 → Validate → Save draft → Step N → Submit

```

**Implementation Checklist:**
- [ ] Each step validates independently
- [ ] Draft state is preserved between steps
- [ ] User can go back without losing data
- [ ] Final submit validates all steps
- [ ] Error handling returns to correct step

**Common Gaps:**
- Draft not saved between steps
- Back button loses data
- Final validation doesn't re-check earlier steps

---

## Pattern 4: OAuth/External Integration

**Description:** Flow involves external service.

**Flow:**
```

Click "Connect X" → Redirect to X → Authorize → Callback → Exchange code → Create session

```

**Implementation Checklist:**
- [ ] State parameter for CSRF protection
- [ ] Callback handles success and error
- [ ] Code exchange happens server-side
- [ ] Session created only after successful exchange
- [ ] Error states handled gracefully

**Common Gaps:**
- State parameter not validated
- Session created before code exchange
- Error callback not handled

---

## Pattern 5: CRUD with Conditional Actions

**Description:** Create/Read/Update/Delete with conditions.

**Flow:**
```

Create → Check conditions → Is user allowed? → YES → Save → Notify
                                    ↓ NO
                              Return error

```

**Implementation Checklist:**
- [ ] Conditions checked before action
- [ ] Appropriate error message for each condition
- [ ] Side effects (notifications) only after success
- [ ] Audit logging for sensitive actions

**Common Gaps:**
- Conditions checked after action
- Generic error message doesn't explain why
- Notifications sent even if action fails
```

---

### 4. Updates to Existing Agents

#### Update: `gsd-plan-checker.md`

Add to checklist:

```markdown
## Flow Completeness Check

After structural checks, verify:

### Conditional Branches
For each conditional mentioned in plan:
- [ ] Is the condition implemented in code?
- [ ] Is the true branch handled?
- [ ] Is the false branch handled?

### Preconditions
For each route/endpoint:
- [ ] Are preconditions explicitly stated?
- [ ] Do preconditions match the intended flow?
- [ ] Are anonymous users handled correctly?

### Data Flow
For each step transition:
- [ ] Is required data available at each step?
- [ ] Is data correctly passed between steps?
```

#### Update: `gsd-verifier.md`

Add to verification process:

```markdown
## Flow Verification (Optional - Run with --flow flag)

In addition to structural verification, verify flows work:

### Manual Flow Testing
1. Identify critical user flows from plans
2. Test each flow manually in browser
3. Document any gaps between expected and actual behavior

### Automated Flow Detection
1. Parse plan descriptions for flow keywords:
   - "redirect to", "then", "if X then", "after"
2. Extract expected flow steps
3. Verify each step has implementation
4. Flag missing connections
```

---

## Acceptatie Criteria

### Must Have

- [ ] `gsd-flow-analyzer.md` agent exists and is functional
- [ ] `/gsd-analyze-flow` command spawns the agent correctly
- [ ] Agent detects MISSING_BRANCH gaps
- [ ] Agent detects WRONG_PRECONDITION gaps
- [ ] Agent produces readable gap report

### Should Have

- [ ] `flow-patterns.md` reference document
- [ ] Agent detects DEAD_END gaps
- [ ] Agent detects MISSING_DATA_FLOW gaps
- [ ] Integration with `gsd-plan-checker`

### Nice to Have

- [ ] Visual flow graph output (Mermaid)
- [ ] Automatic gap closure plan generation
- [ ] CI integration for flow analysis

---

## Testing

### Test Case 1: Password Reset Flow

Create a broken password reset implementation:

- Token generated but not validated
- Reset page requires login (wrong precondition)
- No redirect after password changed

**Expected:** Agent should detect all three gaps.

### Test Case 2: OAuth Flow

Create a broken OAuth implementation:

- No state parameter
- Session created before code exchange
- Error callback not handled

**Expected:** Agent should detect all three gaps.

### Test Case 3: Complete Flow

Create a correct implementation.

**Expected:** Agent should report no gaps.

---

## Implementation Order

### Phase 1: Core Agent (1-2 hours)

1. Create `gsd-flow-analyzer.md`
2. Implement basic gap detection (MISSING_BRANCH, WRONG_PRECONDITION)
3. Test with simple flows

### Phase 2: Command Integration (30 min)

1. Create `/gsd-analyze-flow` command
2. Wire up agent spawning
3. Test command execution

### Phase 3: Reference Documentation (1 hour)

1. Create `flow-patterns.md`
2. Document common patterns
3. Add pattern detection to agent

### Phase 4: Integration (30 min)

1. Update `gsd-plan-checker.md`
2. Update `gsd-verifier.md`
3. Add --flow flag to verification

---

## Files to Create/Modify

| File | Action | Description |
|------|--------|-------------|
| `~/.config/opencode/agents/gsd-flow-analyzer.md` | CREATE | New agent |
| `~/.config/opencode/commands/gsd-analyze-flow.md` | CREATE | New command |
| `~/.config/opencode/get-shit-done/references/flow-patterns.md` | CREATE | Reference doc |
| `~/.config/opencode/agents/gsd-plan-checker.md` | MODIFY | Add flow checks |
| `~/.config/opencode/agents/gsd-verifier.md` | MODIFY | Add flow verification |

---

## Summary

**Probleem:** GSD verification checkt of componenten bestaan, maar niet of ze samen een werkende flow vormen.

**Oplossing:** Een nieuwe `gsd-flow-analyzer` agent die:

1. Intended flows uit plannen haalt
2. Implementatie traceert door codebase
3. Gaps detecteert (missing branches, wrong preconditions, dead ends)
4. Duidelijk rapport genereert met fix hints

**Resultaat:** Fouten zoals "login redirect niet naar 2FA" worden gedetecteerd VOORDAT ze als "complete" worden gemarkeerd.
