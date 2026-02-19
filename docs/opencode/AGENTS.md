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

Add to `opencode-mastery.json`:

```json
{
  "agents": {
    "my-agent": {}
  }
}
```
