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
echo "  • opencode-mastery - Complete OpenCode knowledge base"
echo "  • meta-agent       - Generate commands, skills, and agents"
echo "  • skill-creator    - Create, audit, and optimize skills"
echo ""
echo "Installing globally (available in all projects)..."
echo ""

INSTALL_DIR="$HOME/.ai_docs/opencode"
MASTERY_SKILL_DIR="$HOME/.config/opencode/skill/opencode-mastery"
META_AGENT_SKILL_DIR="$HOME/.config/opencode/skill/meta-agent"
SKILL_CREATOR_SKILL_DIR="$HOME/.config/opencode/skill/skill-creator"
COMMANDS_DIR="$HOME/.config/opencode/commands"

SCRIPTS_DIR="$INSTALL_DIR/scripts"
MASTERY_SKILL_FILE="$MASTERY_SKILL_DIR/SKILL.md"
META_AGENT_SKILL_FILE="$META_AGENT_SKILL_DIR/SKILL.md"

echo ""
echo "Installing to:"
echo "  Docs/Scripts:   $INSTALL_DIR"
echo "  opencode-mastery: $MASTERY_SKILL_DIR"
echo "  meta-agent:       $META_AGENT_SKILL_DIR"
echo "  skill-creator:    $SKILL_CREATOR_SKILL_DIR"
echo "  commands:         $COMMANDS_DIR"
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
mkdir -p "$MASTERY_SKILL_DIR"
mkdir -p "$META_AGENT_SKILL_DIR"
mkdir -p "$SKILL_CREATOR_SKILL_DIR"
mkdir -p "$SCRIPTS_DIR"
mkdir -p "$COMMANDS_DIR"

echo "📥 Downloading latest version from GitHub..."
TEMP_DIR=$(mktemp -d)
echo "  Downloading to temporary directory: $TEMP_DIR"
if ! curl -fsSL "$REPO_URL/tarball/main" | tar xz --strip=1 -C "$TEMP_DIR"; then
    echo "❌ Failed to download from GitHub"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo ""
echo "📋 Copying scripts to global location..."
if ! cp "$TEMP_DIR/src/skill/opencode-mastery/scripts/"*.py "$SCRIPTS_DIR/"; then
    echo "❌ Failed to copy scripts"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo ""
echo "📋 Copying skill directories (excluding scripts)..."
if ! cp -r "$TEMP_DIR/src/skill/opencode-mastery/"* "$MASTERY_SKILL_DIR/"; then
    echo "❌ Failed to copy opencode-mastery skill directory"
    rm -rf "$TEMP_DIR"
    exit 1
fi
if ! cp -r "$TEMP_DIR/src/skill/meta-agent/"* "$META_AGENT_SKILL_DIR/"; then
    echo "❌ Failed to copy meta-agent skill directory"
    rm -rf "$TEMP_DIR"
    exit 1
fi
if ! cp -r "$TEMP_DIR/src/skill/skill-creator/"* "$SKILL_CREATOR_SKILL_DIR/"; then
    echo "❌ Failed to copy skill-creator skill directory"
    rm -rf "$TEMP_DIR"
    exit 1
fi

echo ""
echo "🗑️  Removing scripts from skill directories (kept globally)..."
rm -rf "$MASTERY_SKILL_DIR/scripts" 2>/dev/null || true
rm -rf "$META_AGENT_SKILL_DIR/scripts" 2>/dev/null || true

echo ""
echo "📋 Copying commands..."
if [ -d "$TEMP_DIR/.opencode/commands" ]; then
    cp -r "$TEMP_DIR/.opencode/commands/"* "$COMMANDS_DIR/" 2>/dev/null || true
    echo "✓ Commands copied to:       $COMMANDS_DIR"
else
    echo "ℹ️  No commands to install"
fi

rm -rf "$TEMP_DIR"

echo "✓ Scripts copied to:         $SCRIPTS_DIR"
echo "✓ opencode-mastery copied to: $MASTERY_SKILL_DIR"
echo "✓ meta-agent copied to:       $META_AGENT_SKILL_DIR"
echo "✓ skill-creator copied to:    $SKILL_CREATOR_SKILL_DIR"

echo ""
echo "📜 Making scripts executable..."
chmod +x "$SCRIPTS_DIR"/*.py

echo ""
echo "📥 Downloading OpenCode documentation..."
python3 "$SCRIPTS_DIR/download-docs.py"

echo ""
echo "🔍 Building search index..."
python3 "$SCRIPTS_DIR/index_builder.py"

echo ""
echo "✅ Installation complete!"
echo ""
echo "Next steps:"
echo "  1. Start OpenCode"
echo "  2. Run: /skill opencode-mastery"
echo "     → Ask anything about OpenCode!"
echo ""
echo "  3. Run: /skill meta-agent"
echo "     → Create commands, skills, and agents!"
echo ""
echo "  4. Run: /skill skill-creator"
echo "     → Create, audit, and optimize skills!"
echo ""
echo "  5. Run: /ace-reflect"
echo "     → Analyze sessions and improve prompts!"
echo ""
echo "📍 Files installed at:"
echo "  - Scripts:          $SCRIPTS_DIR"
echo "  - opencode-mastery: $MASTERY_SKILL_DIR"
echo "  - meta-agent:       $META_AGENT_SKILL_DIR"
echo "  - skill-creator:    $SKILL_CREATOR_SKILL_DIR"
echo "  - Commands:         $COMMANDS_DIR"
echo "  - Docs:             $INSTALL_DIR/docs"
echo "  - Memory:           $INSTALL_DIR/memory"
