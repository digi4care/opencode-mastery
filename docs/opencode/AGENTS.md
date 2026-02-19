# Agents

Custom agents registered via `opencode-mastery.json`.

## Registered Agents

### Flow Analysis

| Agent               | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `flow-analyzer`     | Framework-agnostic flow completeness analysis |
| `gsd-flow-analyzer` | GSD phase flow analysis                       |

## Adding New Agents

Add to `opencode-mastery.json`:

```json
{
  "agents": {
    "my-agent": {}
  }
}
```
