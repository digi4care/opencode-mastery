---
name: systematic-debugging
description: Enforce systematic debugging to find root causes. Always investigate before fixing. Prevents symptom fixes and random changes.
triggers:
  - fix bug
  - debug
  - test failing
  - error
  - unexpected behavior
  - not working
  - investigate
  - why is this broken
  - what's wrong
  - trace this
  - find the cause
negativeTriggers:
  - write test first
  - TDD
  - already investigated
  - clear solution
  - quick fix
  - just try this
  - I know the fix
  - questions about systematic debugging itself
  - explaining debugging concepts
  - debugging educational examples
  - demo or teaching
license: MIT
compatibility: opencode
metadata:
  author: obra/superpowers (adapted)
  version: 1.0.0
---

# Systematic Debugging

## When to Use Me

Use me when:

- fix bug
- debug
- test failing
- error
- unexpected behavior
- not working
- investigate
- why is this broken
- what's wrong
- trace this
- find the cause

Do not use me for:

- write test first
- TDD
- already investigated
- clear solution
- quick fix
- just try this
- I know the fix
- general programming questions
- installation or troubleshooting
- framework-agnostic code help

## Workflow

1. Phase 1: Root Cause Investigation - Read errors, reproduce, check changes, gather evidence, trace data flow
2. Phase 2: Pattern Analysis - Find working examples, compare against references, identify differences
3. Phase 3: Hypothesis and Testing - Form single hypothesis, test minimally, verify before continuing
4. Phase 4: Implementation - Create failing test case, implement single fix for root cause, verify
5. If 3+ fixes failed: STOP and question architecture

## Error Handling

- Quick fix for now: STOP, return to Phase 1
- Multiple changes at once: STOP, require single hypothesis
- Skip the test: STOP, require failing test first
- One more fix attempt (after 2+): STOP, question architecture
- I see the problem: STOP, seeing symptom != understanding root cause
- Pattern says X but I'll adapt: STOP, read reference completely

## Tools

The following tools are available to assist with systematic debugging:

- `wait-for` - Wait for conditions instead of using arbitrary delays
- `find-flaky-tests` - Detect tests that pollute global state
- `trace-root-cause` - Analyze stack traces to identify root cause
- `debug-session` - Track debugging progress through 4 phases

These tools integrate with the systematic-debugging skill to automate error analysis and root cause detection.

## Quick Tests

Should trigger:

- Fix this bug
- Tests are failing
- Getting this error
- Debug why login fails
- Why isn't this working
- Trace this issue

Should not trigger:

- Write a test for this feature
- Refactor this code
- Add documentation
- I already found the root cause
- Just change X and see

Functional:

- Debug a failing test systematically
- Find root cause of error

## References

- `references/workflow-playbook.mdx` - Complete 4-phase debugging process
- `references/root-cause-tracing.mdx` - Trace bugs backward through call stack
- `references/defense-in-depth.mdx` - Multi-layer validation
- `references/condition-based-waiting.mdx` - Wait for conditions, not timing
- `references/visual-web-debugging.mdx` - Visual debugging with Playwright for webapps
- `scripts/find-polluter.sh` - Find tests that pollute global state
- `scripts/condition-based-waiting-example.ts` - TypeScript implementation

## The Iron Law

```
NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST
```

If you haven't completed Phase 1, you cannot propose fixes.

## Red Flags - STOP and Follow Process

- "Quick fix for now, investigate later"
- "Just try changing X and see if it works"
- "Add multiple changes, run tests"
- "Skip the test, I'll manually verify"
- "It's probably X, let me fix that"
- "I don't fully understand but this might work"
- Proposing solutions before tracing data flow
- "One more fix attempt" (when already tried 2+)

**ALL of these mean: STOP. Return to Phase 1.**

## Quick Reference

| Phase                   | Key Activities                        | Success Criteria            |
| ----------------------- | ------------------------------------- | --------------------------- |
| **1. Investigation**    | Read errors, reproduce, check changes | Understand WHAT and WHY     |
| **2. Pattern Analysis** | Find working examples, compare        | Identify differences        |
| **3. Hypothesis**       | Form theory, test minimally           | Confirmed or new hypothesis |
| **4. Implementation**   | Create test, fix, verify              | Bug resolved, tests pass    |
