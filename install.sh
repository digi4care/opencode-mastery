#!/bin/bash
set -e

REPO_URL="https://github.com/digi4care/opencode-mastery"

echo "🚀 OpenCode Mastery Skill Installer"
echo ""
echo "Where would you like to install this skill?"
echo "  1) Global (~/) - Available in all projects"
echo "  2) Project    (.opencode/) - Only in current project"
echo ""
read -p "Select installation type [1/2] (default: 1): " install_type
install_type=${install_type:-1}

if [ "$install_type" = "2" ]; then
    INSTALL_DIR="$(pwd)/.ai_docs/opencode"
    SKILL_DIR="$(pwd)/.opencode/skills/opencode-mastery"
else
    INSTALL_DIR="$HOME/.ai_docs/opencode"
    SKILL_DIR="$HOME/.opencode/skills/opencode-mastery"
fi

SCRIPTS_DIR="$INSTALL_DIR/scripts"
SKILL_FILE="$SKILL_DIR/SKILL.md"

echo ""
echo "Installing to:"
echo "  Docs/Scripts: $INSTALL_DIR"
echo "  Skill file:   $SKILL_DIR"
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
mkdir -p "$SKILL_DIR"
mkdir -p "$SCRIPTS_DIR"

if [ -f "./src/skill/SKILL.md" ]; then
    echo "📋 Copying files from local repo..."
    if ! cp ./src/scripts/*.py "$SCRIPTS_DIR/"; then
        echo "❌ Failed to copy scripts"
        exit 1
    fi
    if ! cp ./src/skill/SKILL.md "$SKILL_FILE"; then
        echo "❌ Failed to copy skill file"
        exit 1
    fi
    echo "✓ Scripts copied to: $SCRIPTS_DIR"
    echo "✓ Skill file copied to: $SKILL_FILE"
else
    echo "📥 Downloading latest version from GitHub..."
    cd "$INSTALL_DIR"
    if ! curl -fsSL "$REPO_URL/tarball/main" | tar xz --strip=1; then
        echo "❌ Failed to download from GitHub"
        exit 1
    fi

    echo ""
    echo "📋 Copying skill file..."
    if ! cp "$INSTALL_DIR/src/skill/SKILL.md" "$SKILL_FILE"; then
        echo "❌ Failed to copy skill file"
        exit 1
    fi
    echo "✓ Skill file copied to: $SKILL_FILE"
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
echo "  3. Ask anything about OpenCode!"
echo ""
echo "📍 Files installed at:"
echo "  - Scripts: $SCRIPTS_DIR"
echo "  - Skill:   $SKILL_FILE"
echo "  - Docs:    $INSTALL_DIR/docs"
echo "  - Memory:   $INSTALL_DIR/memory"

if [ "$install_type" = "2" ]; then
    echo ""
    echo "📝 Note: This skill is installed in the current project directory."
    echo "    It will only be available when working in this project."
fi
