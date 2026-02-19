#!/bin/bash
set -e

# Parse arguments
AUTO_CONFIRM=false
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -y|--yes) AUTO_CONFIRM=true ;;
        -h|--help) echo "Usage: ./install.sh [-y|--yes]"; exit 0 ;;
        *) echo "Unknown parameter: $1"; exit 1 ;;
    esac
    shift
done

REPO_URL="https://github.com/digi4care/opencode-mastery"

echo "🚀 OpenCode Mastery Installer"
echo ""
echo "This package includes:"
echo ""
echo "  📚 18 Skills:"
echo "  • opencode-mastery      - Complete OpenCode knowledge base"
echo "  • meta-agent            - Generate commands, skills, and agents"
echo "  • skill-creator         - Create, audit, and optimize skills"
echo "  • repo-analysis         - Analyze GitHub repositories"
echo "  • test-driven-development - Enforce TDD discipline"
echo "  • systematic-debugging  - Methodical debugging framework"
echo "  • playwright-cli        - Browser automation"
echo "  • frontend-design       - UI/UX for developers"
echo "  • tailwind, shadcn-svelte, svelte, svelte-cli, svelte-kit, svelte-mcp"
echo "  • database-architect, postgresql, flow-analysis, opencode-memory"
echo ""
echo "  🔌 6 Plugins: session, debugging, TDD, flow, repo, memory (modular architecture)"
echo ""
echo "  ⚙️  Features: Modular architecture with centralized tool registry"
echo "  • database-architect, postgresql"
echo ""
echo "  🔌 5 Plugins (TypeScript tools):"
echo "  • opencode-mastery      - Docs + Memory tools"
echo "  • tdd-enforcer          - TDD enforcement tools"
echo "  • debug-assistant       - Debugging tools"
echo "  • flow-analyzer         - Flow analysis tools"
echo "  • repo-analyzer         - GitHub repository analysis"
echo ""
echo "  🤖 Agents:"
echo "  • Installed from src/agents/*.md"
echo ""
echo "  ⚙️  Shared Config:"
echo "  • opencode.config.yaml  - Single source of truth"
echo "  • src/lib/config        - Shared config library"
echo ""
echo "Installing globally (available in all projects)..."
echo ""

# Directories
INSTALL_DIR="$HOME/.ai_docs/opencode"
COMMANDS_DIR="$HOME/.config/opencode/commands"
PLUGIN_DIR="$HOME/.config/opencode/plugin"
SKILLS_DIR="$HOME/.config/opencode/skill"
LIB_DIR="$HOME/.config/opencode/lib"
AGENTS_DIR="$HOME/.config/opencode/agents"

echo "Installing to:"
echo "  Skills:   $SKILLS_DIR"
echo "  Plugins: $PLUGIN_DIR"
echo "  Lib:      $LIB_DIR"
echo "  Agents:   $AGENTS_DIR"
echo "  Commands: $COMMANDS_DIR"
echo "  Docs:     $INSTALL_DIR/docs"
echo ""

# Skip confirmation if -y flag provided
if [ "$AUTO_CONFIRM" = true ]; then
    echo "Running in non-interactive mode (-y flag)"
else
    read -p "Continue? [Y/n] (default: Y): " confirm
    confirm=${confirm:-Y}
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Installation cancelled."
        exit 0
    fi
fi

echo ""
echo "📥 Creating directories..."
mkdir -p "$INSTALL_DIR/docs"
mkdir -p "$INSTALL_DIR/memory"
mkdir -p "$INSTALL_DIR/cache/github"
mkdir -p "$COMMANDS_DIR"
mkdir -p "$PLUGIN_DIR"
mkdir -p "$LIB_DIR/config"
mkdir -p "$AGENTS_DIR"

echo "📥 Downloading latest version from GitHub..."
TEMP_DIR=$(mktemp -d)
echo "  Downloading to temporary directory: $TEMP_DIR"
if ! curl -fsSL "$REPO_URL/tarball/main" | tar xz --strip=1 -C "$TEMP_DIR"; then
    echo "❌ Failed to download from GitHub"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo ""
echo "📦 Installing dependencies for plugin build..."
PLUGINS_CAN_BUILD=false
if command -v bun &> /dev/null && [ -f "$TEMP_DIR/package.json" ]; then
    cd "$TEMP_DIR"
    echo "  Running: bun install --ignore-scripts"
    if timeout 60 bun install --ignore-scripts; then
        echo "  ✓ Dependencies installed"
        PLUGINS_CAN_BUILD=true
    else
        echo "  ⚠️  Failed to install dependencies (or timed out), plugins will use TypeScript source"
    fi
else
    echo "  ⚠️  bun not found or package.json missing, plugins will use TypeScript source"
fi

echo ""
echo "📋 Copying skills..."

# All skills
SKILLS=(
    "opencode-mastery"
    "meta-agent"
    "skill-creator"
    "repo-analysis"
    "flow-analysis"
    "opencode-memory"
    "test-driven-development"
    "systematic-debugging"
    "playwright-cli"
    "frontend-design"
    "tailwind"
    "shadcn-svelte"
    "svelte"
    "svelte-cli"
    "svelte-kit"
    "svelte-mcp"
    "database-architect"
    "postgresql"
)

for skill in "${SKILLS[@]}"; do
    echo "  Copying $skill..."
    mkdir -p "$SKILLS_DIR/$skill"
    cp -r "$TEMP_DIR/src/skill/$skill/"* "$SKILLS_DIR/$skill/" 2>/dev/null || true
done

echo ""
echo "📋 Copying plugins..."

# All plugins
PLUGINS=(
    "opencode-mastery"
    "tdd-enforcer"
    "debug-assistant"
    "flow-analyzer"
    "om-session"
    "repo-analyzer"
    "skill-creator"
)

for plugin in "${PLUGINS[@]}"; do
    echo "  Copying $plugin..."
    mkdir -p "$PLUGIN_DIR/$plugin"
    cp -r "$TEMP_DIR/src/plugin/$plugin/"* "$PLUGIN_DIR/$plugin/" 2>/dev/null || true
done

echo ""
echo "🔨 Building TypeScript plugins..."
if [ "$PLUGINS_CAN_BUILD" = true ]; then
    # Copy deploy script and run it
    cp "$TEMP_DIR/scripts/deploy.ts" "$TEMP_DIR/deploy.ts" 2>/dev/null || true
    cd "$TEMP_DIR"
    bun run deploy.ts 2>/dev/null || echo "  ⚠️  Build failed, plugins will use TypeScript source"
fi

echo ""
echo "📋 Copying agents..."

if [ -d "$TEMP_DIR/src/agents" ]; then
    cp -r "$TEMP_DIR/src/agents/"*.md "$AGENTS_DIR/" 2>/dev/null || true
    AGENT_COUNT=$(ls -1 "$TEMP_DIR/src/agents/"*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "✓ Agents copied to: $AGENTS_DIR ($AGENT_COUNT files)"
else
    echo "ℹ️  No agents to install"
fi

echo ""
echo "📋 Copying shared config library..."
cp -r "$TEMP_DIR/src/lib/config/"* "$LIB_DIR/config/" 2>/dev/null || true
echo "✓ Config library copied to: $LIB_DIR/config"

echo ""
echo "📋 Copying commands..."
if [ -d "$TEMP_DIR/src/commands" ]; then
    cp -r "$TEMP_DIR/src/commands/"* "$COMMANDS_DIR/" 2>/dev/null || true
    COMMAND_COUNT=$(ls -1 "$TEMP_DIR/src/commands/"*.md 2>/dev/null | wc -l | tr -d ' ')
    echo "✓ Commands copied to: $COMMANDS_DIR ($COMMAND_COUNT files)"
else
    echo "ℹ️  No commands to install"
fi

echo ""
echo "📋 Copying default config..."
if [ -f "$TEMP_DIR/opencode.config.yaml" ]; then
    # Only copy if doesn't exist (don't overwrite user config)
    if [ ! -f "$HOME/.config/opencode/opencode.config.yaml" ]; then
        cp "$TEMP_DIR/opencode.config.yaml" "$HOME/.config/opencode/"
        echo "✓ Default config copied to: $HOME/.config/opencode/opencode.config.yaml"
    else
        echo "ℹ️  opencode.config.yaml already exists, skipping (preserving user settings)"
    fi
fi

# Protect user JSON config files - never overwrite
echo "📋 Protecting user config files..."
USER_JSON_CONFIGS=("opencode.json" "opencode-mastery.json" "oh-my-opencode.json")
for config in "${USER_JSON_CONFIGS[@]}"; do
    if [ -f "$HOME/.config/opencode/$config" ]; then
        echo "   ✓ $config preserved (user config)"
    fi
done

rm -rf "$TEMP_DIR"

echo ""
echo "✅ Installation complete!"
echo ""
echo "📁 Installed:"
echo "   • 18 skills in $SKILLS_DIR"
echo "   • 6 plugins in $PLUGIN_DIR"
echo "   • agents in $AGENTS_DIR"
echo "   • commands in $COMMANDS_DIR"
echo "   • Shared config in $LIB_DIR/config"
echo ""
echo "🚀 Quick Start:"
echo "   /skill opencode-mastery         - OpenCode documentation"
echo "   /skill test-driven-development  - TDD enforcement"
echo "   /skill systematic-debugging     - Debug methodically"
echo "   /skill frontend-design          - UI/UX guidelines"
echo ""
echo "⚙️  Config: $HOME/.config/opencode/opencode.config.yaml"
echo "   Edit this file to enable/disable features"
echo ""
