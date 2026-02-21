---
name: test-driven-development
description: Enforce Test-Driven Development discipline. Write failing test first, then minimal code, then refactor. Use when writing production code or implementing features. Do not use for debugging, documentation, or configuration tasks.
license: MIT
compatibility: opencode
metadata:
  author: obra/superpowers (adapted)
  version: 1.0.0
---

# Test Driven Development

## When to Use Me

Use me when:

- write production code
- add feature
- implement
- TDD
- new function
- create endpoint
- add method
- implement this
- write code for

Do not use me for:

- debug
- investigate
- analyze error
- refactor without changing behavior
- documentation
- configuration
- setup
- explore
- spike
- general programming questions
- installation or troubleshooting
- framework-agnostic code help
- bug investigation (use systematic-debugging first)

## Workflow

1. Identify behavior to implement
2. Write failing test (RED) - one behavior, clear name, real code
3. Verify test fails correctly - MANDATORY, never skip
4. Write minimal code to pass (GREEN) - simplest possible
5. Verify all tests pass - MANDATORY, check other tests too
6. Refactor while staying green (REFACTOR) - clean up only
7. Repeat for next behavior

## Error Handling

- Code written before test exists: STOP, request deletion, restart with test
- Test passes immediately: Verify test tests the right thing, not existing behavior
- Multiple behaviors in one test: Ask to split into separate tests
- Refactoring with failing tests: STOP, require green tests first
- I'll test after: STOP, TDD requires test first - no exceptions
- Keeping code as reference: STOP, delete means delete

## Tools

The following tools are available to enforce TDD:

- `check-test-exists` - Verify test file exists before writing implementation
- `validate-tdd-cycle` - Check if TDD cycle was followed via git history
- `analyze-git-order` - Analyze commit order to verify test-first approach

Use these tools to validate TDD compliance automatically.

## Quick Tests

Should trigger:

- Create a new API endpoint
- Add user authentication
- Implement a new endpoint with tests first
- Implement payment processing
- Write a login function

Should not trigger:

- Debug this error
- Investigate why tests fail
- Refactor this function (no behavior change)
- Update the documentation
- Configure the server

Functional:

- Write test before implementing login feature
- Follow TDD for new endpoint

## References

- `references/workflow-playbook.mdx` - RED-GREEN-REFACTOR cycle details
- `references/anti-patterns.mdx` - Testing anti-patterns to avoid

## The Iron Law

```
NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST
```

Write code before the test? Delete it. Start over.

## Verification Checklist

Before marking work complete:

- [ ] Every new function/method has a test
- [ ] Watched each test fail before implementing
- [ ] Each test failed for expected reason
- [ ] Wrote minimal code to pass each test
- [ ] All tests pass
- [ ] No errors or warnings in output
- [ ] Edge cases covered
