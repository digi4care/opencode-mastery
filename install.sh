#!/bin/bash
set -e

REPO_URL="https://github.com/digi4care/opencode-mastery"
INSTALL_DIR="$HOME/.ai_docs/opencode"
SKILL_DIR="$HOME/.opencode/skills/opencode-mastery"
SCRIPTS_DIR="$INSTALL_DIR/scripts"
SKILL_FILE="$SKILL_DIR/SKILL.md"

echo "🚀 Installing OpenCode Mastery Skill..."
echo ""

mkdir -p "$INSTALL_DIR"
mkdir -p "$SKILL_DIR"
mkdir -p "$SCRIPTS_DIR"

echo "📥 Downloading latest version from GitHub..."
cd "$INSTALL_DIR"
curl -fsSL "$REPO_URL/tarball/main" | tar xz --strip=1

echo ""
echo "📋 Copying skill file..."
cp "$INSTALL_DIR/src/skill/SKILL.md" "$SKILL_FILE"

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
