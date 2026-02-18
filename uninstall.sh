#!/bin/bash
set -e

echo "🗑️  OpenCode Mastery Skills Uninstaller"
echo ""
echo "This will remove all 16 skill directories."
echo "Your downloaded documentation, memory, and cache will NOT be removed."
echo ""

# Skill directories
SKILLS_DIR="$HOME/.config/opencode/skill"
GLOBAL_MASTERY="$SKILLS_DIR/opencode-mastery"
GLOBAL_META="$SKILLS_DIR/meta-agent"
GLOBAL_SKILL_CREATOR="$SKILLS_DIR/skill-creator"
GLOBAL_MEMORY="$SKILLS_DIR/opencode-memory"
GLOBAL_TDD="$SKILLS_DIR/test-driven-development"
GLOBAL_DEBUG="$SKILLS_DIR/systematic-debugging"
GLOBAL_PLAYWRIGHT="$SKILLS_DIR/playwright-cli"
GLOBAL_FRONTEND="$SKILLS_DIR/frontend-design"
GLOBAL_TAILWIND="$SKILLS_DIR/tailwind"
GLOBAL_SHADCN="$SKILLS_DIR/shadcn-svelte"
GLOBAL_SVELTE="$SKILLS_DIR/svelte"
GLOBAL_SVELTE_CLI="$SKILLS_DIR/svelte-cli"
GLOBAL_SVELTE_KIT="$SKILLS_DIR/svelte-kit"
GLOBAL_SVELTE_MCP="$SKILLS_DIR/svelte-mcp"
GLOBAL_DB_ARCHITECT="$SKILLS_DIR/database-architect"
GLOBAL_POSTGRESQL="$SKILLS_DIR/postgresql"

GLOBAL_PLUGIN="$HOME/.config/opencode/plugin"
GLOBAL_COMMANDS="$HOME/.config/opencode/commands"
GLOBAL_SCRIPTS="$HOME/.ai_docs/opencode/scripts"

# All skill directories
ALL_SKILLS=(
    "$GLOBAL_MASTERY"
    "$GLOBAL_META"
    "$GLOBAL_SKILL_CREATOR"
    "$GLOBAL_MEMORY"
    "$GLOBAL_TDD"
    "$GLOBAL_DEBUG"
    "$GLOBAL_PLAYWRIGHT"
    "$GLOBAL_FRONTEND"
    "$GLOBAL_TAILWIND"
    "$GLOBAL_SHADCN"
    "$GLOBAL_SVELTE"
    "$GLOBAL_SVELTE_CLI"
    "$GLOBAL_SVELTE_KIT"
    "$GLOBAL_SVELTE_MCP"
    "$GLOBAL_DB_ARCHITECT"
    "$GLOBAL_POSTGRESQL"
)

SKILL_NAMES=(
    "opencode-mastery"
    "meta-agent"
    "skill-creator"
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

# Check if any of our files exist
FOUND=false
for skill in "${ALL_SKILLS[@]}"; do
    [ -d "$skill" ] && FOUND=true
done
[ -d "$GLOBAL_SCRIPTS" ] && FOUND=true

if [ "$FOUND" = false ]; then
    echo "❌ No OpenCode Mastery installation found."
    echo ""
    echo "Checked for skills in: $SKILLS_DIR"
    exit 1
fi

echo "Found global installation"
echo ""
echo "Skills to remove:"
for i in "${!ALL_SKILLS[@]}"; do
    if [ -d "${ALL_SKILLS[$i]}" ]; then
        echo "  ✓ ${SKILL_NAMES[$i]}"
    fi
done
echo ""
echo "These will NOT be removed (your data):"
echo "  - $HOME/.ai_docs/opencode/docs/"
echo "  - $HOME/.ai_docs/opencode/memory/"
echo "  - $HOME/.ai_docs/opencode/cache/"
echo ""

if [ "$1" = "--silent" ] || [ "$1" = "-s" ]; then
    echo "🗑️  Proceeding with uninstall (silent mode)..."
else
    read -p "Continue uninstall? [y/N] (default: N): " confirm
    if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
        echo "Uninstall cancelled."
        exit 0
    fi
    echo "🗑️  Proceeding with uninstall..."
fi

echo ""
echo "Removing skill files..."

for i in "${!ALL_SKILLS[@]}"; do
    skill_dir="${ALL_SKILLS[$i]}"
    skill_name="${SKILL_NAMES[$i]}"
    if [ -d "$skill_dir" ]; then
        rm -rf "$skill_dir"
        echo "Removed: $skill_name"
    fi
done

echo ""
echo "Removing plugin directory..."
rm -rf "$GLOBAL_PLUGIN" 2>/dev/null && echo "Removed: $GLOBAL_PLUGIN/" || echo "Plugin directory not found"

echo ""
echo "Removing commands directory..."
rm -rf "$GLOBAL_COMMANDS" 2>/dev/null && echo "Removed: $GLOBAL_COMMANDS/" || echo "Commands directory not found"

if [ -d "$GLOBAL_SCRIPTS" ]; then
    rm -rf "$GLOBAL_SCRIPTS"
    echo "Removed: $GLOBAL_SCRIPTS/"
fi

# Remove skills dir if empty
rmdir "$SKILLS_DIR" 2>/dev/null && echo "Removed empty: $SKILLS_DIR/" || true

if [ -d "$HOME/.ai_docs/opencode" ]; then
    REMAINING=$(find "$HOME/.ai_docs/opencode" -mindepth 1 -maxdepth 1 | wc -l)
    if [ "$REMAINING" -eq 0 ]; then
        echo ""
        echo "ℹ️  $HOME/.ai_docs/opencode is now empty."
        echo "    You can remove it manually: rm -rf $HOME/.ai_docs/opencode"
    fi
fi

echo ""
echo "✅ Uninstall complete!"
echo ""
echo "To completely remove all data (docs, memory, cache), run:"
echo "  rm -rf $HOME/.ai_docs/opencode"
