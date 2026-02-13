---
name: advanced-skill
description: Full workflow orchestration with config-driven routing and phase-based execution
---

# Advanced Workflow Example

This example demonstrates a complete workflow orchestration system with:

- **Config-driven behavior** - JSON configuration controls workflow behavior
- **Dynamic routing** - Router script parses arguments and delegates to appropriate phase scripts
- **Phase-based execution** - Four distinct phases: Init → Validate → Execute → Finalize
- **Validation layer** - Input validation before execution
- **Modular design** - Each phase is a separate script

## 🎯 What This Demonstrates

This is a **Tier 3** advanced example showing:

1. How to structure a multi-script workflow
2. How to use configuration files to control behavior
3. How to implement a router that delegates to specialized scripts
4. How to create phase-based execution patterns
5. How to add validation and error handling

## 📁 File Structure

```
skills/advanced/
├── SKILL.md                    # This file
├── config/
│   └── workflow-config.json   # Configuration for workflow
├── router.sh                   # Main router (parsing, validation, delegation)
└── scripts/
    ├── phase-init.sh           # Phase 1: Initialization
    ├── phase-validate.sh       # Phase 2: Validation
    ├── phase-execute.sh        # Phase 3: Execution
    └── phase-finalize.sh       # Phase 4: Finalization
```

## 🚀 How to Use

### Basic Usage

Run the complete workflow:

```bash
./router.sh
```

### With Specific Phases

Run specific phases only:

```bash
./router.sh --phase init
./router.sh --phase execute
```

### With Configuration Override

Override default configuration:

```bash
./router.sh --mode production --verbose
```

### Interactive Mode

Run with interactive prompts:

```bash
./router.sh --interactive
```

## 🏗️ Architecture

### 1. Router Script (`router.sh`)

**Purpose**: Central orchestration point

**Responsibilities**:

- Parse command-line arguments
- Load configuration from JSON
- Validate input parameters
- Determine which phase(s) to execute
- Delegate execution to phase scripts
- Handle errors and provide feedback

**Pattern**: Router pattern with validation and delegation

### 2. Configuration File (`config/workflow-config.json`)

**Purpose**: Control workflow behavior without code changes

**Key Settings**:

- Default mode (development, staging, production)
- Verbose logging toggle
- Phase timeouts
- Output paths
- Error handling strategy

**Pattern**: Configuration-driven behavior

### 3. Phase Scripts (`scripts/phase-*.sh`)

**Purpose**: Execute specific workflow phases

**Four Phases**:

| Phase | Script              | Purpose                                   |
| ----- | ------------------- | ----------------------------------------- |
| 1     | `phase-init.sh`     | Initialize environment, load dependencies |
| 2     | `phase-validate.sh` | Validate inputs, check prerequisites      |
| 3     | `phase-execute.sh`  | Execute main business logic               |
| 4     | `phase-finalize.sh` | Cleanup, generate reports, save results   |

**Pattern**: Single Responsibility - each phase does one thing

## 🔄 Workflow Patterns

### Sequential Pattern

This example uses **sequential execution**:

```
Init → Validate → Execute → Finalize
```

Each phase completes before the next starts. If any phase fails, the workflow stops.

### Conditional Phases

The router can skip phases based on configuration:

```bash
# Skip validation in quick mode
./router.sh --mode quick
```

### Parallel Execution (Future Extension)

Phase scripts can be modified to run in parallel:

```bash
# Run init and validate in parallel
./router.sh --parallel
```

## 🔍 Key Concepts

### 1. Argument Parsing

The router uses POSIX-compliant argument parsing:

```bash
while [[ $# -gt 0 ]]; do
  case $1 in
    --phase)
      PHASE="$2"
      shift 2
      ;;
    --mode)
      MODE="$2"
      shift 2
      ;;
    *)
      echo "Unknown option: $1"
      exit 1
      ;;
  esac
done
```

### 2. JSON Configuration

The router reads configuration using `jq`:

```bash
MODE=$(jq -r '.mode' config/workflow-config.json)
VERBOSE=$(jq -r '.verbose' config/workflow-config.json)
```

### 3. Phase Delegation

The router delegates to phase scripts:

```bash
case $PHASE in
  init)
    bash scripts/phase-init.sh
    ;;
  validate)
    bash scripts/phase-validate.sh
    ;;
  *)
    bash scripts/phase-*.sh
    ;;
esac
```

### 4. Error Handling

Each phase returns exit codes:

```bash
# In router.sh
bash scripts/phase-validate.sh
if [[ $? -ne 0 ]]; then
  echo "Validation failed"
  exit 1
fi
```

## 📝 Configuration Reference

### `workflow-config.json`

```json
{
  "mode": "development",
  "verbose": false,
  "phases": {
    "timeout": 300,
    "parallel": false
  },
  "output": {
    "path": "./output",
    "format": "json"
  }
}
```

**Fields**:

- `mode`: Execution mode (development|staging|production)
- `verbose`: Enable detailed logging
- `phases.timeout`: Maximum seconds per phase
- `phases.parallel`: Run phases in parallel
- `output.path`: Directory for output files
- `output.format`: Output format (json|yaml|csv)

## 🎓 Learning Objectives

After studying this example, you should understand:

1. **Workflow Orchestration**
   - How to design multi-step workflows
   - How to structure phase-based execution
   - How to handle phase dependencies

2. **Configuration Management**
   - How to use JSON config files
   - How to parse configuration in shell scripts
   - How to override config with CLI args

3. **Router Pattern**
   - How to implement a central router
   - How to parse and validate arguments
   - How to delegate to specialized scripts

4. **Modular Design**
   - How to split workflows into phases
   - How to maintain single responsibility
   - How to make scripts reusable

5. **Error Handling**
   - How to propagate errors across phases
   - How to implement validation layers
   - How to provide user-friendly error messages

## 🔧 Customization

### Adding New Phases

1. Create new script: `scripts/phase-custom.sh`
2. Add to router.sh case statement
3. Update configuration if needed

### Changing Phase Order

Modify the router script to change execution order:

```bash
# Current: init → validate → execute → finalize
# Custom: validate → init → execute → finalize
```

### Adding Interactive Prompts

Use `read` for interactive input:

```bash
read -p "Enter your name: " NAME
echo "Hello, $NAME!"
```

## 📚 Next Steps

After mastering this advanced example, explore:

- **Workflow Patterns** - Learn sequential, conditional, parallel patterns
- **Best Practices** - Skill development guidelines
- **Interactive Skills** - Build personality-driven workflows

## 💡 Real-World Use Cases

This pattern works well for:

1. **CI/CD Pipelines** - Build → Test → Deploy → Notify
2. **Data Processing** - Extract → Transform → Load → Archive
3. **Software Release** - Version → Tag → Build → Publish
4. **System Maintenance** - Backup → Verify → Cleanup → Report

## ⚠️ Common Pitfalls

1. **Skipping validation** - Always validate before executing
2. **Ignoring exit codes** - Check $? after each phase
3. **Hardcoding paths** - Use config or environment variables
4. **Missing error handling** - Catch and report errors clearly
5. **No cleanup** - Ensure finalize runs even on failure

---

## Summary

This advanced example demonstrates a **complete, production-ready workflow orchestration system** with:

✅ Config-driven behavior
✅ Dynamic routing
✅ Phase-based execution
✅ Validation layer
✅ Modular design
✅ Error handling

Use this as a template for building your own complex workflows in OpenCode skills.
