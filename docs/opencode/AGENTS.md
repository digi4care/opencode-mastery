# Agents

Custom agents registered via `opencode-mastery.json`.

## Registered Agents

### Flow Analysis

| Agent               | Purpose                                       |
| ------------------- | --------------------------------------------- |
| `flow-analyzer`     | Framework-agnostic flow completeness analysis |
| `gsd-flow-analyzer` | GSD phase flow analysis                       |

> **Note:** Other agents (gsd-\*, ace-analyzer, etc.) come from `oh-my-opencode.json` - not part of this repo.

## Adding New Agents

Add to `opencode-mastery.json`:

```json
{
  "agents": {
    "my-agent": {}
  }
}
```

## Agent Sources

| Source         | Location                |
| -------------- | ----------------------- |
| This repo      | `opencode-mastery.json` |
| oh-my-opencode | `oh-my-opencode.json`   |
