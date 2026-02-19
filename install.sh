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

echo "🚀 OpenCode Mastery Skills Installer"
echo ""
echo "This package includes:"
echo ""
echo "  📚 17 Skills:"
echo "  • opencode-mastery      - Complete OpenCode knowledge base"
echo "  • meta-agent            - Generate commands, skills, and agents"
echo "  • skill-creator         - Create, audit, and optimize skills"
echo "  • test-driven-development - Enforce TDD discipline"
echo "  • systematic-debugging  - Methodical debugging framework"
echo "  • playwright-cli        - Browser automation"
echo "  • frontend-design       - UI/UX for developers"
echo "  • tailwind, shadcn-svelte, svelte, svelte-cli, svelte-kit, svelte-mcp"
echo "  • database-architect, postgresql"
echo ""
echo "  🔌 4 Plugins (TypeScript tools):"
echo "  • opencode-mastery      - Docs + Memory tools"
echo "  • tdd-enforcer          - TDD enforcement tools"
echo "  • debug-assistant       - Debugging tools"
echo "  • flow-analyzer         - Flow analysis tools"
echo ""
echo "  🤖 1 Agent:"
echo "  • ace-analyzer          - Session analysis with ACE framework"
echo ""
echo "  ⚙️  Shared Config:"
echo "  • opencode.config.yaml  - Single source of truth"
echo "  • src/lib/config        - Shared config library"
echo ""
echo "Installing globally (available in all projects)..."
echo ""

# Directories
INSTALL_DIR="$HOME/.ai_docs/opencode"
COMMANDS_DIR_PRIMARY="$HOME/.config/opencode/command"
COMMANDS_DIR_COMPAT="$HOME/.config/opencode/commands"
PLUGIN_DIR="$HOME/.config/opencode/plugin"
SKILLS_DIR="$HOME/.config/opencode/skill"
LIB_DIR="$HOME/.config/opencode/lib"
AGENTS_DIR="$HOME/.config/opencode/agents"

echo "Installing to:"
echo "  Skills:   $SKILLS_DIR"
echo "  Plugins: $PLUGIN_DIR"
echo "  Lib:      $LIB_DIR"
echo "  Agents:   $AGENTS_DIR"
echo "  Commands (primary): $COMMANDS_DIR_PRIMARY"
echo "  Commands (compat):  $COMMANDS_DIR_COMPAT"
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
mkdir -p "$COMMANDS_DIR_PRIMARY"
mkdir -p "$COMMANDS_DIR_COMPAT"
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
echo "📋 Copying skills..."

# All skills
SKILLS=(
    "opencode-mastery"
    "meta-agent"
    "skill-creator"
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
)

for plugin in "${PLUGINS[@]}"; do
    echo "  Copying $plugin..."
    mkdir -p "$PLUGIN_DIR/$plugin"
    cp -r "$TEMP_DIR/src/plugin/$plugin/"* "$PLUGIN_DIR/$plugin/" 2>/dev/null || true
done

echo ""
echo "📋 Copying agents..."

# All agents
AGENTS=(
    "ace-analyzer"
)

for agent in "${AGENTS[@]}"; do
    echo "  Copying $agent..."
    cp "$TEMP_DIR/src/agents/$agent.md" "$AGENTS_DIR/" 2>/dev/null || true
done

echo ""
echo "📋 Copying shared config library..."
cp -r "$TEMP_DIR/src/lib/config/"* "$LIB_DIR/config/" 2>/dev/null || true
echo "✓ Config library copied to: $LIB_DIR/config"

echo ""
echo "📋 Copying commands..."
if [ -d "$TEMP_DIR/src/commands" ]; then
    cp -r "$TEMP_DIR/src/commands/"* "$COMMANDS_DIR_PRIMARY/" 2>/dev/null || true
    cp -r "$TEMP_DIR/src/commands/"* "$COMMANDS_DIR_COMPAT/" 2>/dev/null || true
    echo "✓ Commands copied to: $COMMANDS_DIR_PRIMARY"
    echo "✓ Commands copied to: $COMMANDS_DIR_COMPAT"
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
        echo "ℹ️  Config already exists, skipping (preserving user settings)"
    fi
fi

rm -rf "$TEMP_DIR"

echo ""
echo "✅ Installation complete!"
echo ""
echo "📁 Installed:"
echo "   • 17 skills in $SKILLS_DIR"
echo "   • 4 plugins in $PLUGIN_DIR"
echo "   • 1 agent in $AGENTS_DIR"
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
