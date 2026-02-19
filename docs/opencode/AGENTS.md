# Agents

Custom agents from this repository, registered via `opencode-mastery.json`.

## Registered Agents

### Flow Analysis

| Agent               | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `flow-analyzer`     | Framework-agnostic flow completeness analysis |
| `gsd-flow-analyzer` | GSD phase flow analysis                       |

### Session Analysis

| Agent          | Purpose               |
| -------------- | --------------------- |
| `ace-analyzer` | Session introspection |

## Adding New Agents

### 1. Register Agent

Add to `opencode-mastery.json`:

```json
{
  "agents": {
    "my-agent": {}
  }
}
```

### 2. Create Agent File

Create a new Markdown file in `src/agents/{agent-name}.md` with frontmatter:

```yaml
---
# OpenCode Agent Configuration
id: my-agent
name: My Agent
description: "Brief description of what this agent does."
category: analysis # analysis | utility | devops | testing | etc.
type: subagent # subagent | orchestrator
version: 1.0.0
author: opencode # or your name/org
mode: subagent # subagent | standalone
temperature: 0.2 # 0.0 - 1.0 (lower = more deterministic)

# Optional: Specific model (provider/model format)
# Omit this field to use OpenCode's global default model
# model: anthropic/claude-sonnet-4

# Tools Configuration (optional)
tools:
  read: true
  write: false
  edit: false
  bash: false
  # Add specific tools as needed

# Permission Restrictions (optional)
permission:
  edit: deny
  bash: deny
---
```

### 3. Frontmatter Reference

| Field         | Required | Description         | Example                             |
| ------------- | -------- | ------------------- | ----------------------------------- |
| `id`          | ✅       | Unique identifier   | `my-agent`                          |
| `name`        | ✅       | Display name        | `My Agent`                          |
| `description` | ✅       | What the agent does | `"Analyzes code quality"`           |
| `category`    | ✅       | Functional category | `analysis`, `utility`, `testing`    |
| `type`        | ✅       | Agent type          | `subagent`, `orchestrator`          |
| `version`     | ✅       | Semantic version    | `1.0.0`                             |
| `author`      | ✅       | Creator name/org    | `opencode`, `your-org`              |
| `mode`        | ✅       | Execution mode      | `subagent`, `standalone`            |
| `temperature` | ✅       | Response creativity | `0.2` (precise) to `1.0` (creative) |
| `tools`       | ❌       | Tool permissions    | See below                           |
| `permission`  | ❌       | Action restrictions | `edit: deny`, `bash: deny`          |

#### Temperature Guidelines

| Use Case         | Temperature | Reason                               |
| ---------------- | ----------- | ------------------------------------ |
| Analysis tasks   | `0.1 - 0.3` | Consistent, deterministic results    |
| Code generation  | `0.2 - 0.4` | Balanced creativity with correctness |
| Creative writing | `0.7 - 1.0` | More varied, creative outputs        |
| Decision making  | `0.2 - 0.3` | Reliable, reproducible decisions     |

#### Tool Configuration

```yaml
tools:
  # Core file operations
  read: true # File reading (usually enabled)
  write: false # File writing (enable cautiously)
  edit: false # File editing (enable cautiously)
  bash: false # Shell commands (enable cautiously)

  # Search & discovery
  glob: true # File pattern matching
  grep: true # Content searching


  # Specialized tools (add as needed)
  # tool-name: true
```

#### Permission Restrictions

```yaml
permission:
  edit: deny # Prevent file modifications
  bash: deny # Prevent shell command execution
  write: deny # Prevent file creation
```

Use permissions to create "read-only" or "analysis-only" agents that cannot modify the codebase.
