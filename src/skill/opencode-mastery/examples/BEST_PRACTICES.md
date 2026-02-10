# Best Practices Guide for OpenCode Skills

This guide provides comprehensive best practices for developing high-quality, maintainable OpenCode skills. Follow these guidelines to create skills that are easy to understand, test, and use.

## Table of Contents

1. [SKILL.md Best Practices](#skillmd-best-practices)
2. [Script Best Practices](#script-best-practices)
3. [Configuration Best Practices](#configuration-best-practices)
4. [Documentation Best Practices](#documentation-best-practices)
5. [Testing Best Practices](#testing-best-practices)
6. [Error Handling Best Practices](#error-handling-best-practices)
7. [Common Pitfalls](#common-pitfalls)
8. [Advanced Patterns](#advanced-patterns)

---

## SKILL.md Best Practices

### 1. Frontmatter Structure

Always include these essential frontmatter fields:

```yaml
---
name: my-skill
description: One-line description of what this skill does
---
```

**Do's:**

- ✅ Keep description concise (one sentence)
- ✅ Use kebab-case for skill names
- ✅ Make description actionable (uses verbs)
- ✅ Add optional fields: version, author, license

**Don'ts:**

- ❌ Don't omit name or description
- ❌ Don't write long descriptions in frontmatter
- ❌ Don't use spaces or underscores in name

### 2. Content Structure

Follow a consistent structure:

```markdown
## What I Do

Brief explanation of skill purpose and scope

## How to Use Me

Step-by-step instructions with examples

## When to Use Me

Ideal use cases and scenarios

## What I Need

Prerequisites, dependencies, requirements

## Limitations

Known constraints and edge cases
```

### 3. Show, Don't Just Tell

Use concrete examples instead of abstract descriptions:

**❌ Bad:**

> You can run commands to accomplish tasks.

**✅ Good:**

> Use the bash tool to execute commands:
>
> ```bash
> /path/to/script.sh --option value
> ```

### 4. Progressive Learning

If demonstrating multiple concepts, organize from simple to complex:

**Tier 1 (Minimal):** Basic concept with 1 file
**Tier 2 (Intermediate):** Add helper script
**Tier 3 (Advanced):** Full workflow with config

### 5. Clear Instructions

Write instructions as if talking to the agent, not the user:

**❌ Bad:**

> The user should run the script with the command...

**✅ Good:**

> Execute the script using the bash tool:
>
> ```bash
> bash /path/to/script.sh
> ```

### 6. Use Formatting Effectively

- **Bold** for emphasis: **Critical step**
- `Code` for paths/files: `config/workflow.json`
- Code blocks for commands: `bash ls -la `
- Lists for steps: 1. Do this, 2. Do that
- Tables for comparison: | Tier | Files | Complexity |

### 7. Cross-References

Link to related documentation:

```markdown
See [Workflow Patterns](WORKFLOW_PATTERNS.md) for more information on workflow design.
```

---

## Script Best Practices

### 1. Shebang and Strict Mode

Always start with strict error handling:

```bash
#!/bin/bash
set -euo pipefail
```

**Explanation:**

- `set -e`: Exit immediately if a command fails
- `set -u`: Treat unset variables as error
- `set -o pipefail`: Return error if any command in pipe fails

### 2. Idempotency

Scripts should be safe to run multiple times:

```bash
#!/bin/bash
# ❌ Bad: Appends on every run
echo "Entry" >> log.txt

# ✅ Good: Checks before appending
if ! grep -q "Entry" log.txt; then
  echo "Entry" >> log.txt
fi

# ✅ Better: Use > for initial write, >> for append
:> log.txt  # Clear file first
echo "Entry" >> log.txt
```

### 3. Self-Contained Paths

Never hardcode paths - make scripts location-independent:

```bash
#!/bin/bash

# ❌ Bad: Hardcoded path
SCRIPT_DIR="/home/user/skills/my-skill"

# ✅ Good: Dynamic path
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
CONFIG_FILE="${SCRIPT_DIR}/../config/config.json"
```

### 4. Exit Codes

Always use appropriate exit codes:

```bash
#!/bin/bash
set -euo pipefail

# Success
exit 0

# Error with message
echo "Error: File not found" >&2
exit 1

# Usage error
echo "Usage: $0 [--option value]" >&2
exit 2
```

### 5. Error Messages

Write error messages to stderr and be descriptive:

```bash
#!/bin/bash

# ❌ Bad
echo "Failed"
exit 1

# ✅ Good
echo "Error: Unable to read config file: $CONFIG_FILE" >&2
echo "Ensure the file exists and is readable." >&2
exit 1
```

### 6. Argument Parsing

Use robust argument parsing:

```bash
#!/bin/bash

# ❌ Bad: No validation
FILE="$1"
./process.sh "$FILE"

# ✅ Good: Validation and defaults
FILE="${1:-default.txt}"
if [[ ! -f "$FILE" ]]; then
  echo "Error: File not found: $FILE" >&2
  exit 1
fi
./process.sh "$FILE"
```

### 7. Long Arguments

Use flags for better usability:

```bash
#!/bin/bash

# ❌ Bad: Positional arguments only
./script.sh input.txt output.txt verbose

# ✅ Good: Named flags
./script.sh --input input.txt --output output.txt --verbose
```

### 8. Help Output

Always include a help message:

```bash
#!/bin/bash

show_help() {
  echo "Usage: $0 [OPTIONS]"
  echo ""
  echo "Options:"
  echo "  --input FILE      Input file path"
  echo "  --output FILE     Output file path"
  echo "  --verbose         Enable verbose output"
  echo "  --help           Show this help message"
}

if [[ "${1:-}" == "--help" ]]; then
  show_help
  exit 0
fi
```

### 9. Colors for Output

Use colors sparingly and appropriately:

```bash
#!/bin/bash

# Define colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Use colors for status messages
echo -e "${GREEN}[SUCCESS]${NC} Task completed"
echo -e "${YELLOW}[WARNING]${NC} This might take a while"
echo -e "${RED}[ERROR]${NC} Something went wrong"
```

### 10. Temp File Handling

Handle temporary files safely:

```bash
#!/bin/bash

# ❌ Bad: Race conditions
echo "data" > /tmp/file.txt
cat /tmp/file.txt

# ✅ Good: Use mktemp
TEMP_FILE=$(mktemp)
echo "data" > "$TEMP_FILE"
cat "$TEMP_FILE"
rm -f "$TEMP_FILE"

# ✅ Better: Trap for cleanup
TEMP_FILE=$(mktemp)
trap 'rm -f "$TEMP_FILE"' EXIT
echo "data" > "$TEMP_FILE"
```

---

## Configuration Best Practices

### 1. JSON Structure

Use consistent, hierarchical JSON:

```json
{
  "version": "1.0.0",
  "settings": {
    "enabled": true,
    "level": "strict"
  },
  "paths": {
    "input": "./input",
    "output": "./output"
  }
}
```

### 2. Configuration Files

Separate config from code:

```bash
# ❌ Bad: Config hardcoded
MODE="production"

# ✅ Good: Read from config
CONFIG_FILE="config/workflow.json"
MODE=$(jq -r '.mode' "$CONFIG_FILE")
```

### 3. Default Values

Always provide defaults:

```json
{
  "mode": "development",
  "validation_level": "relaxed",
  "timeout": 30
}
```

```bash
# In script
MODE=$(jq -r '.mode // "development"' "$CONFIG_FILE")
```

### 4. Environment-Specific Config

Use profiles:

```json
{
  "profiles": {
    "development": {
      "log_level": "debug",
      "skip_validation": true
    },
    "production": {
      "log_level": "error",
      "skip_validation": false
    }
  },
  "current_profile": "development"
}
```

### 5. Configuration Validation

Validate configuration in init phase:

```bash
#!/bin/bash

validate_config() {
  CONFIG_FILE="$1"

  # Check file exists
  if [[ ! -f "$CONFIG_FILE" ]]; then
    echo "Error: Config file not found: $CONFIG_FILE" >&2
    exit 1
  fi

  # Check valid JSON
  if ! jq empty "$CONFIG_FILE" >/dev/null 2>&1; then
    echo "Error: Invalid JSON in config file" >&2
    exit 1
  fi

  # Check required fields
  REQUIRED_FIELDS=("mode" "output_path")
  for field in "${REQUIRED_FIELDS[@]}"; do
    if ! jq -e ".${field}" "$CONFIG_FILE" >/dev/null; then
      echo "Error: Missing required field: $field" >&2
      exit 1
    fi
  done

  echo "Config validated successfully"
}
```

### 6. Comments in JSON

JSON doesn't support comments - use documentation:

```json
{
  // ❌ This won't work
  "timeout": 30
}
```

**Alternative 1: Add metadata**

```json
{
  "_comment": "Timeout in seconds for network requests",
  "timeout": 30
}
```

**Alternative 2: Document in README**

```
Configuration: config/workflow.json

- timeout: Network request timeout in seconds (default: 30)
```

---

## Documentation Best Practices

### 1. Write for Humans

Explain **WHY**, not just **WHAT**:

**❌ Bad:**

> The validate function checks if the file exists.

**✅ Good:**

> The validate function ensures the input file exists before processing to prevent errors during execution.

### 2. Keep Documentation Up to Date

- Document as you code
- Update docs when changing code
- Review docs regularly
- Use version control

### 3. Use Examples

Examples are more powerful than explanations:

````markdown
**Example: Sequential Workflow**

Start the workflow:

```bash
./router.sh
```
````

Expected output:

```
[INIT] Starting initialization...
[VALIDATE] Validating configuration...
[EXECUTE] Running main task...
[FINALIZE] Cleaning up...
```

````

### 4. Structure Your Documentation

```markdown
# Title

## Overview
What is this? Why use it?

## Quick Start
Get up and running in 5 minutes

## Usage
Detailed usage guide

## Configuration
How to configure

## Examples
Real-world examples

## Troubleshooting
Common issues and solutions

## Reference
API reference, parameters
````

### 5. Link Between Documents

Cross-reference related content:

```markdown
For advanced workflow patterns, see [Workflow Patterns](WORKFLOW_PATTERNS.md).

For skill development best practices, see [Best Practices Guide](BEST_PRACTICES.md).
```

### 6. Code Comments

Add comments only for **WHY**, not **WHAT**:

```bash
#!/bin/bash

# ❌ Bad: Obvious code
i=$((i + 1))  # Increment i

# ✅ Good: Explains reasoning
i=$((i + 1))  # Increment counter after successful validation
```

---

## Testing Best Practices

### 1. Testable Design

Write code that's easy to test:

```bash
# ❌ Bad: Hard to test
process_files() {
  for file in /path/to/files/*; do
    # ... complex logic
  done
}

# ✅ Good: Accept input, return output
process_files() {
  local files="$1"
  for file in $files; do
    # ... complex logic
  done
}

# Test it
process_files "test/fixtures/*.txt"
```

### 2. Test Scripts Separately

Create test scripts for each component:

```bash
#!/bin/bash
# test_phase_init.sh

echo "Testing phase-init.sh..."

# Test 1: Creates output directory
./scripts/phase-init.sh
if [[ ! -d "output" ]]; then
  echo "FAIL: Output directory not created"
  exit 1
fi
echo "PASS: Output directory created"

# Test 2: Creates state file
if [[ ! -f "output/workflow-state.json" ]]; then
  echo "FAIL: State file not created"
  exit 1
fi
echo "PASS: State file created"

echo "All tests passed!"
```

### 3. Test Edge Cases

```bash
# Test normal case
./script.sh input.txt

# Test empty input
touch empty.txt
./script.sh empty.txt

# Test missing input (should fail gracefully)
./script.sh non-existent.txt

# Test invalid config
echo '{"invalid": "json"' > invalid.json
./script.sh --config invalid.json
```

### 4. Test Idempotency

```bash
#!/bin/bash
# Test that script can be run multiple times

./router.sh
./router.sh  # Should not fail or duplicate work
./router.sh  # Should still work
```

### 5. Test in Different Modes

```bash
# Test development mode
jq '.mode = "development"' config/workflow.json > config/dev.json
./router.sh --config config/dev.json

# Test production mode
jq '.mode = "production"' config/workflow.json > config/prod.json
./router.sh --config config/prod.json
```

### 6. Test Cleanup

```bash
#!/bin/bash
# Test that script cleans up after itself

./router.sh
echo "Checking for temp files..."

if ls /tmp/*.tmp 2>/dev/null; then
  echo "FAIL: Temp files not cleaned up"
  exit 1
fi
echo "PASS: No temp files remaining"
```

### 7. Automated Testing

Create a test runner:

```bash
#!/bin/bash
# run-all-tests.sh

TESTS=(
  "test_phase_init.sh"
  "test_phase_validate.sh"
  "test_phase_execute.sh"
  "test_phase_finalize.sh"
)

FAILED=0

for test in "${TESTS[@]}"; do
  echo "Running: $test"
  if ! bash "tests/$test"; then
    FAILED=$((FAILED + 1))
  fi
  echo ""
done

if [[ $FAILED -gt 0 ]]; then
  echo "$FAILED test(s) failed"
  exit 1
else
  echo "All tests passed!"
fi
```

---

## Error Handling Best Practices

### 1. Set Strict Mode

Always use strict mode:

```bash
#!/bin/bash
set -euo pipefail
```

This catches many errors automatically.

### 2. Handle Errors Explicitly

```bash
#!/bin/bash

# ❌ Bad: Silent failure
cat "$FILE"

# ✅ Good: Handle failure
if ! cat "$FILE"; then
  echo "Error: Unable to read file: $FILE" >&2
  exit 1
fi
```

### 3. Use Functions for Error Handling

```bash
#!/bin/bash

error_exit() {
  echo "Error: $1" >&2
  exit "${2:-1}"
}

# Usage
error_exit "File not found: $FILE"
error_exit "Invalid configuration" 2
```

### 4. Validate Inputs Early

```bash
#!/bin/bash

validate_inputs() {
  # Check file exists
  if [[ ! -f "$INPUT_FILE" ]]; then
    error_exit "Input file not found: $INPUT_FILE"
  fi

  # Check file is readable
  if [[ ! -r "$INPUT_FILE" ]]; then
    error_exit "Input file is not readable: $INPUT_FILE"
  fi

  # Check file size
  if [[ $(stat -f%z "$INPUT_FILE" 2>/dev/null || stat -c%s "$INPUT_FILE") -eq 0 ]]; then
    error_exit "Input file is empty: $INPUT_FILE"
  fi
}
```

### 5. Graceful Degradation

When possible, provide fallback behavior:

```bash
#!/bin/bash

# Try jq, fallback to grep
if command -v jq >/dev/null; then
  MODE=$(jq -r '.mode' "$CONFIG_FILE")
else
  echo "Warning: jq not found, using grep for parsing" >&2
  MODE=$(grep '"mode"' "$CONFIG_FILE" | cut -d'"' -f4)
fi
```

### 6. Retry Logic

For transient failures:

```bash
#!/bin/bash

retry_command() {
  local max_attempts=3
  local attempt=1

  while [[ $attempt -le $max_attempts ]]; do
    echo "Attempt $attempt of $max_attempts..."

    if "$@"; then
      echo "Success on attempt $attempt"
      return 0
    fi

    attempt=$((attempt + 1))
    sleep 1
  done

  echo "All $max_attempts attempts failed" >&2
  return 1
}

# Usage
retry_command curl -s https://api.example.com
```

### 7. Cleanup on Error

Use trap to clean up on error:

```bash
#!/bin/bash

cleanup() {
  echo "Cleaning up..."
  rm -f "$TEMP_FILE"
  echo "Cleanup complete"
}

trap cleanup EXIT

# If error occurs, cleanup runs automatically
some_command_that_might_fail
```

---

## Common Pitfalls

### 1. Hardcoding Paths

**❌ Problem:**

```bash
SCRIPT_DIR="/home/user/skills/my-skill"
```

**✅ Solution:**

```bash
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
```

### 2. Not Setting Strict Mode

**❌ Problem:**

```bash
#!/bin/bash
# No error handling
```

**✅ Solution:**

```bash
#!/bin/bash
set -euo pipefail
```

### 3. Ignoring Output

**❌ Problem:**

```bash
command_that_might_fail > /dev/null
```

**✅ Solution:**

```bash
command_that_might_fail > /dev/null 2>&1
```

### 4. Not Validating Inputs

**❌ Problem:**

```bash
process_file "$1"  # What if $1 is empty?
```

**✅ Solution:**

```bash
if [[ -z "$1" ]]; then
  error_exit "Input file required"
fi
process_file "$1"
```

### 5. Silent Failures

**❌ Problem:**

```bash
cat "$FILE"  # If fails, continues silently
```

**✅ Solution:**

```bash
if ! cat "$FILE"; then
  error_exit "Unable to read file: $FILE"
fi
```

### 6. Mixing Quotes

**❌ Problem:**

```bash
jq '.field = "value" | '.other = "data"'  # Wrong!
```

**✅ Solution:**

```bash
jq '.field = "value" | .other = "data"'  # Correct
```

### 7. Race Conditions with Temp Files

**❌ Problem:**

```bash
echo "data" > /tmp/myfile.txt
```

**✅ Solution:**

```bash
TEMP_FILE=$(mktemp)
echo "data" > "$TEMP_FILE"
rm -f "$TEMP_FILE"
```

### 8. Not Checking Dependencies

**❌ Problem:**

```bash
jq '.' file.json  # What if jq isn't installed?
```

**✅ Solution:**

```bash
if ! command -v jq >/dev/null; then
  error_exit "jq is required but not installed"
fi
jq '.' file.json
```

---

## Advanced Patterns

### 1. Router Pattern

Central script that routes to appropriate handlers:

```bash
#!/bin/bash
# router.sh

show_help() {
  echo "Usage: $0 <action> [options]"
  echo ""
  echo "Actions:"
  echo "  init       Initialize the system"
  echo "  validate   Validate configuration"
  echo "  execute    Run the main workflow"
  echo "  finalize   Clean up and report"
}

case "${1:-}" in
  init)
    ./scripts/phase-init.sh "${@:2}"
    ;;
  validate)
    ./scripts/phase-validate.sh "${@:2}"
    ;;
  execute)
    ./scripts/phase-execute.sh "${@:2}"
    ;;
  finalize)
    ./scripts/phase-finalize.sh "${@:2}"
    ;;
  *)
    echo "Error: Unknown action: $1" >&2
    show_help
    exit 1
    ;;
esac
```

### 2. State Management

Track workflow state with JSON:

```bash
#!/bin/bash

update_state() {
  local phase="$1"
  local status="$2"

  jq ".phase = \"$phase\" | .status = \"$status\"" \
    "$STATE_FILE" > "${STATE_FILE}.tmp" \
    && mv "${STATE_FILE}.tmp" "$STATE_FILE"
}

# Usage
update_state "execute" "in_progress"
# ... do work
update_state "execute" "completed"
```

### 3. Plugin System

Load external plugins dynamically:

```bash
#!/bin/bash

load_plugins() {
  local plugin_dir="$1"

  for plugin in "$plugin_dir"/*.sh; do
    echo "Loading plugin: $(basename "$plugin")"
    source "$plugin"
  done
}

# Usage
load_plugins "plugins/"
```

### 4. Logging Framework

Structured logging:

```bash
#!/bin/bash

log() {
  local level="$1"
  local message="$2"
  local timestamp=$(date -u +%Y-%m-%dT%H:%M:%SZ)

  case "$level" in
    INFO)  echo -e "\033[0;32m[INFO]\033[0m $message" ;;
    WARN)  echo -e "\033[1;33m[WARN]\033[0m $message" ;;
    ERROR) echo -e "\033[0;31m[ERROR]\033[0m $message" ;;
    DEBUG) [[ "$DEBUG" == "true" ]] && echo -e "\033[0;36m[DEBUG]\033[0m $message" ;;
  esac

  # Also write to log file
  echo "$timestamp [$level] $message" >> "$LOG_FILE"
}

# Usage
log INFO "Starting workflow"
log WARN "This might take a while"
log ERROR "Something went wrong"
```

---

## Checklist

Before publishing a skill, ensure:

- [ ] SKILL.md has proper frontmatter (name, description)
- [ ] All scripts use `set -euo pipefail`
- [ ] No hardcoded paths (use dynamic paths)
- [ ] All scripts have help messages
- [ ] Input validation is implemented
- [ ] Error handling is comprehensive
- [ ] Temporary files are cleaned up
- [ ] Configuration is separated from code
- [ ] Documentation is complete and clear
- [ ] Examples are tested and working
- [ ] Scripts are executable (`chmod +x`)
- [ ] No race conditions with temp files
- [ ] Exit codes are appropriate
- [ ] Logging is informative
- [ ] Edge cases are handled

---

## Examples in This Repository

All best practices demonstrated in our examples:

- **Minimal Example**: Simple SKILL.md with clear instructions
- **Intermediate Example**: Helper script with idempotency and error handling
- **Advanced Example**: Full workflow with router pattern, state management, and config validation

See the `examples/` directory for complete, working examples.

---

## Further Reading

- [Workflow Patterns](WORKFLOW_PATTERNS.md) - Sequential, conditional, and parallel workflows
- [Examples README](README.md) - Tier comparison and getting started guide
- [Advanced Example](advanced-example/) - Full implementation demonstrating all best practices
