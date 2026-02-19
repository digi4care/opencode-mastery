# Flow Patterns Reference

## Conditional Redirect

Flow shape:

1. User action triggers evaluation.
2. Condition is checked.
3. True and false branches both resolve to valid next steps.

Common gaps:

- Missing false branch
- Redirect target requires wrong precondition

## Token-Based Flow

Flow shape:

1. Request action creates token.
2. Token is delivered to user.
3. Follow-up action validates token before state change.
4. Token invalidates after success.

Common gaps:

- Token accepted without validation
- Action page requires login although token should allow anonymous entry

## Multi-Step Form Flow

Flow shape:

1. Step n validates input.
2. Draft state is persisted.
3. Next step consumes preserved state.
4. Final submit validates full aggregate state.

Common gaps:

- Draft state not carried between steps
- Back navigation drops state

## OAuth Callback Flow

Flow shape:

1. Client redirects to provider with state.
2. Callback validates state.
3. Server exchanges code.
4. Session created only after successful exchange.

Common gaps:

- Callback branch for provider error missing
- Session created before code exchange
