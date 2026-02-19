# Agents

Custom agents registered via `opencode-mastery.json`.

## Registered Agents

### Flow Analysis

| Agent               | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `flow-analyzer`     | Framework-agnostic flow completeness analysis |
| `gsd-flow-analyzer` | GSD phase flow analysis                       |

### GSD Framework

| Agent                 | Purpose                     |
| --------------------- | --------------------------- |
| `gsd-verifier`        | Goal-backward verification  |
| `gsd-planner`         | Phase planning              |
| `gsd-executor`        | Execute phase plans         |
| `gsd-codebase-mapper` | Codebase structure analysis |
| `gsd-debugger`        | Scientific debugging        |
| `gsd-roadmapper`      | Project roadmaps            |

### Analysis & Creation

| Agent           | Purpose                          |
| --------------- | -------------------------------- |
| `ace-analyzer`  | Session analysis (ACE framework) |
| `ContextScout`  | Discover context files           |
| `ExternalScout` | Fetch external library docs      |
| `TaskManager`   | Task breakdown & management      |

## Adding New Agents

### Option 1: Via opencode-mastery.json

```json
{
  "agents": {
    "my-agent": {
      "model": "default",
      "temperature": 0.2,
      "tools": ["read", "grep"]
    }
  }
}
```

### Option 2: Via Plugin (for tool-enabled agents)

See [plugins.md](plugins.md) for plugin development.

## Agent Sources

| Source        | Location                |
| ------------- | ----------------------- |
| Custom agents | `opencode-mastery.json` |
| GSD agents    | `oh-my-opencode.json`   |
| Built-in      | Claude Code defaults    |
