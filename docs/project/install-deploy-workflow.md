# Install, Deploy, and Uninstall Workflow

This document explains how installation and plugin builds work for both users and developers.

## Quick Summary

- `install.sh`: download + copy + dependency bootstrap + best-effort plugin build
- `bun run deploy`: authoritative plugin build step (project root)
- `uninstall.sh`: remove managed installed artifacts

## User Workflow

## Option A: Direct from GitHub

```bash
curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/install.sh | bash -s -- --yes
```

## Option B: Clone and install

```bash
git clone https://github.com/digi4care/opencode-mastery.git
cd opencode-mastery
./install.sh -y
```

If you cloned locally and want deterministic plugin JS artifacts, run:

```bash
bun run deploy
```

## Developer Workflow

```bash
# Rebuild plugin JavaScript artifacts
bun run deploy

# Remove installed managed files
./uninstall.sh --silent
```

`bun run deploy` compiles plugin `index.ts` files from `src/plugin/*` to:

`~/.config/opencode/plugin/<plugin>/index.js`

## Internal Install Behavior

`install.sh` performs these steps:

1. Download repository tarball from GitHub into a temp directory
2. Run `bun install --ignore-scripts` in the temp directory
3. Copy skills, plugins, agents, shared config, and commands to `~/.config/opencode/`
4. Attempt plugin build in temp dir via `bun run scripts/deploy.ts`
5. Run `bun install --ignore-scripts` inside `~/.config/opencode`

If step 4 fails, installation still completes and plugins fall back to TypeScript source.
Developers should run `bun run deploy` after clone/changes to guarantee compiled JS artifacts.

## Troubleshooting

## Plugin build fails during install

- Confirm Bun is installed (`bun --version`)
- Run from project root:

```bash
bun install --ignore-scripts
bun run deploy
```

## Validate installation

Check these paths:

- `~/.config/opencode/commands/`
- `~/.config/opencode/skill/`
- `~/.config/opencode/plugin/`

For plugin build output, verify:

- `~/.config/opencode/plugin/<plugin>/index.js`

## Remove installation

```bash
./uninstall.sh --silent
```
