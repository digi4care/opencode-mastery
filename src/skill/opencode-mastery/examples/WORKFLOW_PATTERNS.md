# Workflow Patterns

This document explains common workflow patterns used in OpenCode skills. Understanding these patterns helps you design more effective and maintainable skills.

## Table of Contents

1. [Sequential Workflows](#sequential-workflows)
2. [Conditional Workflows](#conditional-workflows)
3. [Parallel Workflows](#parallel-workflows)
4. [Choosing the Right Pattern](#choosing-the-right-pattern)
5. [Combining Patterns](#combining-patterns)

---

## Sequential Workflows

### Definition

Sequential workflows execute steps one after another in a specific order. Each step must complete before the next begins.

### When to Use

- **Initialization → Validation → Execution → Finalization**: Classic lifecycle pattern
- **Data pipelines**: Transform → Process → Output
- **Multi-step operations**: Setup → Configure → Deploy
- **When order matters**: Dependencies between steps

### Pattern Structure

```
Step 1 ──────► Step 2 ──────► Step 3 ──────► Step 4
   │              │              │              │
   │              │              │              │
   ✓ Done       ✓ Done        ✓ Done        ✓ Done
```

### Example: Advanced Example (Tier 3)

Our **advanced example** demonstrates a classic sequential workflow:

```bash
# router.sh - Phase orchestration
./scripts/phase-init.sh      # Step 1: Initialize
./scripts/phase-validate.sh   # Step 2: Validate inputs
./scripts/phase-execute.sh    # Step 3: Execute main task
./scripts/phase-finalize.sh   # Step 4: Cleanup and report
```

**Key characteristics:**

- Each phase is a separate script
- Order is enforced by router.sh
- State is passed between phases via JSON state file
- If any phase fails, workflow stops (no further execution)

### Implementation Pattern

```bash
#!/bin/bash
# Sequential workflow orchestrator

PHASES=(
  "scripts/phase-init.sh"
  "scripts/phase-validate.sh"
  "scripts/phase-execute.sh"
  "scripts/phase-finalize.sh"
)

for phase in "${PHASES[@]}"; do
  echo "Running: $phase"
  if ! bash "$phase"; then
    echo "Failed: $phase"
    exit 1
  fi
done

echo "All phases completed successfully"
```

### Advantages

- ✅ **Predictable**: Easy to understand order
- ✅ **Debuggable**: Clear where failures occur
- ✅ **Simple**: Minimal coordination needed
- ✅ **Safe**: No race conditions

### Disadvantages

- ❌ **Slow**: Total time = sum of all phases
- ❌ **Limited**: No parallelization
- ❌ **Blocker**: Longest phase determines total time

---

## Conditional Workflows

### Definition

Conditional workflows execute different paths based on runtime conditions (flags, configuration, input validation, environment).

### When to Use

- **Feature flags**: Enable/disable functionality
- **Environment-specific**: dev vs staging vs production
- **Input validation**: Different paths based on inputs
- **Error recovery**: Retry logic, fallback paths
- **Configuration-driven**: User-selected behavior

### Pattern Structure

```
         ┌─ Condition A ──► Path A
         │
Check ──┼─ Condition B ──► Path B
         │
         └─ Default ─────► Path C
```

### Example: Advanced Example (Tier 3) - Mode Selection

Our **advanced example** demonstrates conditional behavior based on mode:

```json
// config/workflow-config.json
{
  "mode": "development",
  "modes": {
    "development": {
      "validation_level": "relaxed",
      "logging": "verbose"
    },
    "testing": {
      "validation_level": "strict",
      "logging": "minimal"
    },
    "production": {
      "validation_level": "strict",
      "logging": "error-only"
    }
  }
}
```

```bash
# phase-validate.sh - Conditional validation
MODE=$(jq -r '.mode' "$CONFIG_FILE")
VALIDATION_LEVEL=$(jq -r ".modes.${MODE}.validation_level" "$CONFIG_FILE")

if [[ "$VALIDATION_LEVEL" == "strict" ]]; then
  echo "Performing strict validation..."
  # ... strict checks
elif [[ "$VALIDATION_LEVEL" == "relaxed" ]]; then
  echo "Performing relaxed validation..."
  # ... minimal checks
fi
```

### Implementation Pattern 1: Command-Line Flags

```bash
#!/bin/bash
# Conditional workflow with flags

SKIP_VALIDATION=false
ENABLE_COMPRESSION=false

# Parse flags
while [[ $# -gt 0 ]]; do
  case "$1" in
    --skip-validation)  SKIP_VALIDATION=true  ;;
    --compress)         ENABLE_COMPRESSION=true ;;
    *)                  echo "Unknown flag: $1"; exit 1 ;;
  esac
  shift
done

# Conditional execution
if [[ "$SKIP_VALIDATION" == "true" ]]; then
  echo "Skipping validation..."
else
  echo "Running validation..."
  ./scripts/validate.sh
fi

if [[ "$ENABLE_COMPRESSION" == "true" ]]; then
  echo "Compressing output..."
  ./scripts/compress.sh
fi
```

### Implementation Pattern 2: Configuration-Driven

```bash
#!/bin/bash
# Conditional workflow based on config

CONFIG_FILE="config/workflow.json"
WORKFLOW_TYPE=$(jq -r '.workflow_type' "$CONFIG_FILE")

case "$WORKFLOW_TYPE" in
  "deploy")
    ./scripts/deploy.sh
    ;;
  "update")
    ./scripts/update.sh
    ;;
  "rollback")
    ./scripts/rollback.sh
    ;;
  *)
    echo "Unknown workflow type: $WORKFLOW_TYPE"
    exit 1
    ;;
esac
```

### Implementation Pattern 3: Input Validation

```bash
#!/bin/bash
# Conditional workflow based on inputs

INPUT_FILE="$1"

# Check input type
if [[ -d "$INPUT_FILE" ]]; then
  echo "Processing directory..."
  ./scripts/process-directory.sh "$INPUT_FILE"
elif [[ -f "$INPUT_FILE" ]]; then
  echo "Processing file..."
  ./scripts/process-file.sh "$INPUT_FILE"
else
  echo "Error: Input must be a file or directory"
  exit 1
fi
```

### Advantages

- ✅ **Flexible**: Adapts to conditions
- ✅ **Efficient**: Skip unnecessary work
- ✅ **Powerful**: Complex logic possible
- ✅ **Configurable**: User-controlled behavior

### Disadvantages

- ❌ **Complex**: Multiple code paths to maintain
- ❌ **Testing**: Need to test all branches
- ❌ **Predictability**: Harder to know exact path

---

## Parallel Workflows

### Definition

Parallel workflows execute multiple steps simultaneously, then join results when complete.

### When to Use

- **Independent tasks**: No dependencies between steps
- **I/O-bound operations**: Network requests, file operations
- **Multi-environment**: Deploy to multiple regions simultaneously
- **Batch processing**: Process multiple files/items in parallel
- **Speed optimization**: Reduce total execution time

### Pattern Structure

```
           ┌─► Task 1 ────┐
           │               │
Start ──────┤               ├────► Join
           │               │
           └─► Task 2 ────┘
```

### Example Concept: Multi-Environment Deployment

```bash
#!/bin/bash
# Parallel workflow: Deploy to multiple regions

REGIONS=("us-east-1" "us-west-2" "eu-west-1")
PIDS=()

echo "Starting parallel deployment..."

# Launch all deployments in background
for region in "${REGIONS[@]}"; do
  echo "Deploying to $region..."
  ./scripts/deploy-to-region.sh "$region" &
  PIDS+=($!)
done

# Wait for all deployments
echo "Waiting for all deployments to complete..."
for pid in "${PIDS[@]}"; do
  wait "$pid"
done

echo "All deployments completed successfully"
```

### Implementation Pattern 1: Simple Parallel

```bash
#!/bin/bash
# Execute multiple scripts in parallel

SCRIPTS=(
  "scripts/script1.sh"
  "scripts/script2.sh"
  "scripts/script3.sh"
)

PIDS=()

for script in "${SCRIPTS[@]}"; do
  bash "$script" &
  PIDS+=($!)
done

# Wait for all to complete
for pid in "${PIDS[@]}"; do
  wait "$pid" || { echo "A script failed"; exit 1; }
done

echo "All scripts completed"
```

### Implementation Pattern 2: Job Control

```bash
#!/bin/bash
# Parallel with job control and error handling

MAX_JOBS=3
SCRIPTS=("script1.sh" "script2.sh" "script3.sh" "script4.sh" "script5.sh")
PIDS=()

echo "Running scripts (max $MAX_JOBS parallel)..."

for script in "${SCRIPTS[@]}"; do
  # Limit parallel jobs
  while [[ ${#PIDS[@]} -ge $MAX_JOBS ]]; do
    # Wait for at least one job to finish
    for i in "${!PIDS[@]}"; do
      if ! kill -0 "${PIDS[$i]}" 2>/dev/null; then
        wait "${PIDS[$i]}" || { echo "Job failed"; exit 1; }
        unset PIDS[$i]
      fi
    done
    sleep 0.1
  done

  # Start new job
  bash "scripts/$script" &
  PIDS+=($!)
  echo "Started: $script (PID: ${PIDS[-1]})"
done

# Wait for remaining jobs
for pid in "${PIDS[@]}"; do
  wait "$pid" || { echo "Job failed"; exit 1; }
done

echo "All scripts completed"
```

### Implementation Pattern 3: Parallel with Aggregation

```bash
#!/bin/bash
# Parallel with result aggregation

REGIONS=("us-east-1" "us-west-2" "eu-west-1")
RESULT_FILES=()

echo "Processing regions in parallel..."

for region in "${REGIONS[@]}"; do
  # Each region writes to its own result file
  RESULT_FILE="output/result-${region}.json"
  RESULT_FILES+=("$RESULT_FILE")

  ./scripts/process-region.sh "$region" "$RESULT_FILE" &
done

# Wait for all to complete
wait

# Aggregate results
echo "Aggregating results..."
jq -s '.[]' "${RESULT_FILES[@]}" > output/aggregated-results.json

echo "All regions processed and aggregated"
```

### Advantages

- ✅ **Fast**: Total time = longest task (not sum)
- ✅ **Efficient**: Use all available resources
- ✅ **Scalable**: Add more parallel tasks
- ✅ **I/O-optimized**: Great for network/file operations

### Disadvantages

- ❌ **Complex**: Job management, error handling
- ❌ **Resource-intensive**: Can overload system
- ❌ **Dependencies**: Can't easily share state
- ❌ **Debugging**: Harder to follow execution

---

## Choosing the Right Pattern

Use this decision tree to select the appropriate workflow pattern:

```
Start
 │
 ├─ Are steps independent?
 │  └─ Yes → Consider PARALLEL workflow
 │  └─ No  → Continue
 │
 ├─ Does order matter?
 │  └─ Yes → SEQUENTIAL workflow
 │  └─ No  → Continue
 │
 ├─ Do you need different behavior based on conditions?
 │  └─ Yes → CONDITIONAL workflow
 │  └─ No  → SEQUENTIAL workflow (default)
```

### Pattern Comparison

| Pattern         | Speed    | Complexity | Best For                            | Avoid When              |
| --------------- | -------- | ---------- | ----------------------------------- | ----------------------- |
| **Sequential**  | Slowest  | Simple     | Order-dependent tasks               | Performance critical    |
| **Conditional** | Variable | Medium     | Environment-specific, feature flags | Simple linear flow      |
| **Parallel**    | Fastest  | Complex    | Independent tasks, I/O-bound        | Task dependencies exist |

### Pattern Selection Guide

| Scenario                                        | Pattern     | Reason                     |
| ----------------------------------------------- | ----------- | -------------------------- |
| Setup → Build → Test → Deploy                   | Sequential  | Order is critical          |
| Deploy to 5 regions simultaneously              | Parallel    | Independent, speed matters |
| Enable/disable feature based on config          | Conditional | Runtime decision needed    |
| Validate inputs → If valid, process, else error | Conditional | Error handling             |
| Process 1000 files independently                | Parallel    | Massive speedup possible   |
| Initialize → Validate → Execute → Finalize      | Sequential  | Classic lifecycle          |

---

## Combining Patterns

Real-world workflows often combine multiple patterns:

### Example 1: Sequential + Conditional

```bash
#!/bin/bash
# Initialize (always)
./scripts/init.sh

# Conditional: Skip or run tests
if [[ "$SKIP_TESTS" != "true" ]]; then
  ./scripts/test.sh
fi

# Deploy (always)
./scripts/deploy.sh
```

### Example 2: Sequential + Parallel

```bash
#!/bin/bash
# Initialize
./scripts/init.sh

# Parallel: Run all tests
for test_suite in tests/*; do
  bash "$test_suite" &
done
wait

# Sequential: Deploy
./scripts/deploy.sh
```

### Example 3: All Three Patterns

```bash
#!/bin/bash
# Phase 1: Sequential initialization
./scripts/setup.sh
./scripts/configure.sh

# Phase 2: Parallel execution (conditional based on config)
if [[ "$(jq -r '.parallel_enabled' config.json)" == "true" ]]; then
  for worker in workers/*; do
    bash "$worker" &
  done
  wait
else
  ./scripts/sequential-worker.sh
fi

# Phase 3: Sequential cleanup
./scripts/cleanup.sh
./scripts/report.sh
```

---

## Best Practices

### For Sequential Workflows

1. **Clear phase boundaries**: Each phase should have single responsibility
2. **State passing**: Use files/JSON to pass state between phases
3. **Error handling**: Stop immediately on failure (set -e)
4. **Logging**: Each phase logs its status
5. **Idempotency**: Rerunning should be safe

### For Conditional Workflows

1. **Explicit conditions**: Make conditions obvious in code
2. **Fallback paths**: Always have default behavior
3. **Testing**: Test all branches (edge cases)
4. **Documentation**: Document all possible paths
5. **Validation**: Validate inputs before branching

### For Parallel Workflows

1. **Idempotency**: Each parallel task must be independent
2. **Resource limits**: Control max parallel jobs
3. **Error handling**: Know how to handle partial failures
4. **Output isolation**: Each task writes to its own output file
5. **Aggregation**: Plan how to combine results

### General Best Practices

1. **Fail fast**: Stop workflow immediately on critical errors
2. **Status tracking**: Maintain workflow state (JSON file)
3. **Idempotent**: Rerunning should be safe
4. **Observable**: Log everything
5. **Testable**: Test each component independently

---

## Examples in This Repository

- **Minimal Example (Tier 1)**: N/A (no workflow)
- **Intermediate Example (Tier 2)**: Sequential (5 steps in helper.sh)
- **Advanced Example (Tier 3)**: Sequential + Conditional (mode-based, 4 phases)

See the `examples/` directory for complete, working examples of these patterns.

---

## Further Reading

- **Advanced Example**: `examples/advanced-example/` - Full sequential + conditional workflow
- **Router Pattern**: `examples/advanced-example/router.sh` - Dynamic routing and orchestration
- **Best Practices**: `BEST_PRACTICES.md` - Skill development guidelines
