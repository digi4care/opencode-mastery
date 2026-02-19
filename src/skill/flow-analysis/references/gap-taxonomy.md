# Gap Taxonomy

## MISSING_BRANCH

Definition: A conditional step has fewer implemented branches than intended.

Evidence signals:

- Condition exists but only one transition is wired.
- Plan/spec references alternate path not present in implementation.

Default severity: `medium`

## WRONG_PRECONDITION

Definition: Runtime access or state preconditions conflict with intended flow.

Evidence signals:

- Intended `anonymous_allowed`, actual `auth_required`.
- Intended authenticated-only step, actual anonymous-only enforcement.

Default severity: `critical`

## DEAD_END

Definition: A path terminates unexpectedly without explicit exit, state finalization, or user feedback.

Evidence signals:

- Node has zero outgoing transitions and is not an exit.

Default severity: `critical`

## MISSING_DATA_FLOW

Definition: Required transition data is not passed from source step to destination step.

Evidence signals:

- Edge declares required keys absent in traced provided data.

Default severity: `high`

## UNREACHABLE_CODE

Definition: Nodes are never reachable from declared entry points.

Evidence signals:

- Graph traversal from entry points cannot visit node.

Default severity: `high`
