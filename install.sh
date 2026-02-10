#!/bin/bash
set -e

REPO_URL="https://github.com/digi4care/opencode-mastery"

echo "🚀 OpenCode Mastery + Meta-Agent Skills Installer"
echo ""
echo "This package includes:"
echo "  • opencode-mastery - Complete OpenCode knowledge base"
echo "  • meta-agent      - Generate commands, skills, and agents"
echo ""
echo "Installing globally (available in all projects)..."
echo ""

INSTALL_DIR="$HOME/.ai_docs/opencode"
MASTERY_SKILL_DIR="$HOME/.config/opencode/skill/opencode-mastery"
META_AGENT_SKILL_DIR="$HOME/.config/opencode/skill/meta-agent"

SCRIPTS_DIR="$INSTALL_DIR/scripts"
MASTERY_SKILL_FILE="$MASTERY_SKILL_DIR/SKILL.md"
META_AGENT_SKILL_FILE="$META_AGENT_SKILL_DIR/SKILL.md"

echo ""
echo "Installing to:"
echo "  Docs/Scripts:   $INSTALL_DIR"
echo "  opencode-mastery: $MASTERY_SKILL_DIR"
echo "  meta-agent:      $META_AGENT_SKILL_DIR"
echo ""
read -p "Continue? [Y/n] (default: Y): " confirm
confirm=${confirm:-Y}
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Installation cancelled."
    exit 0
fi

echo ""
echo "📥 Creating directories..."
mkdir -p "$INSTALL_DIR/docs"
mkdir -p "$INSTALL_DIR/memory"
mkdir -p "$INSTALL_DIR/cache/github"
mkdir -p "$MASTERY_SKILL_DIR"
mkdir -p "$META_AGENT_SKILL_DIR"
mkdir -p "$SCRIPTS_DIR"

if [ -f "./src/skill/opencode-mastery/SKILL.md" ] && [ -f "./src/skill/meta-agent/SKILL.md" ]; then
    echo "📋 Copying files from local repo..."
    if ! cp ./src/skill/opencode-mastery/scripts/*.py "$SCRIPTS_DIR/"; then
        echo "❌ Failed to copy scripts"
        exit 1
    fi
    if ! cp ./src/skill/opencode-mastery/SKILL.md "$MASTERY_SKILL_FILE"; then
        echo "❌ Failed to copy opencode-mastery skill file"
        exit 1
    fi
    if ! cp ./src/skill/meta-agent/SKILL.md "$META_AGENT_SKILL_FILE"; then
        echo "❌ Failed to copy meta-agent skill file"
        exit 1
    fi
    echo "✓ Scripts copied to:    $SCRIPTS_DIR"
    echo "✓ opencode-mastery copied to: $MASTERY_SKILL_DIR"
    echo "✓ meta-agent copied to:      $META_AGENT_SKILL_DIR"
else
    echo "📥 Downloading latest version from GitHub..."
    cd "$INSTALL_DIR"
    if ! curl -fsSL "$REPO_URL/tarball/main" | tar xz --strip=1; then
        echo "❌ Failed to download from GitHub"
        exit 1
    fi

    echo ""
    echo "📋 Copying skill files..."
    if ! cp "$INSTALL_DIR/src/skill/opencode-mastery/SKILL.md" "$MASTERY_SKILL_FILE"; then
        echo "❌ Failed to copy opencode-mastery skill file"
        exit 1
    fi
    if ! cp "$INSTALL_DIR/src/skill/meta-agent/SKILL.md" "$META_AGENT_SKILL_FILE"; then
        echo "❌ Failed to copy meta-agent skill file"
        exit 1
    fi
    echo "✓ opencode-mastery copied to: $MASTERY_SKILL_DIR"
    echo "✓ meta-agent copied to:      $META_AGENT_SKILL_DIR"
fi

echo ""
echo "📜 Making scripts executable..."
chmod +x "$SCRIPTS_DIR"/*.py

echo ""
echo "📥 Downloading OpenCode documentation..."
python3 "$SCRIPTS_DIR/download-docs.py"

echo ""
echo "🔍 Building search index..."
python3 "$SCRIPTS_DIR/index-builder.py"

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
echo "📍 Files installed at:"
echo "  - Scripts:           $SCRIPTS_DIR"
echo "  - opencode-mastery:  $MASTERY_SKILL_FILE"
echo "  - meta-agent:         $META_AGENT_SKILL_FILE"
echo "  - Docs:              $INSTALL_DIR/docs"
echo "  - Memory:            $INSTALL_DIR/memory"
