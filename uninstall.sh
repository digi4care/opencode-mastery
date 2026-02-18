#!/bin/bash
set -e

echo "🗑️  OpenCode Mastery Skills Uninstaller"
echo ""
echo "This will remove opencode-mastery, meta-agent, skill-creator, opencode-memory,"
echo "test-driven-development, and systematic-debugging skill files."
echo "Your downloaded documentation, memory, and cache will NOT be removed."
echo ""

GLOBAL_MASTERY="$HOME/.config/opencode/skill/opencode-mastery"
GLOBAL_META="$HOME/.config/opencode/skill/meta-agent"
GLOBAL_SKILL_CREATOR="$HOME/.config/opencode/skill/skill-creator"
GLOBAL_MEMORY="$HOME/.config/opencode/skill/opencode-memory"
GLOBAL_TDD="$HOME/.config/opencode/skill/test-driven-development"
GLOBAL_DEBUG="$HOME/.config/opencode/skill/systematic-debugging"
GLOBAL_PLUGIN="$HOME/.config/opencode/plugin"
GLOBAL_COMMANDS="$HOME/.config/opencode/commands"
GLOBAL_SCRIPTS="$HOME/.ai_docs/opencode/scripts"

# Files we installed (to remove individually)
PLUGIN_FILES=("skill-creator.ts" "notify.ts")
COMMAND_FILES=("memory.md" "ace-reflect.md" "skill-creator-plan.md" "skill-creator-create.md" "skill-creator-optimize.md" "skill-creator-audit.md")

# Check if any of our files exist
FOUND=false
for skill in "$GLOBAL_MASTERY" "$GLOBAL_META" "$GLOBAL_SKILL_CREATOR" "$GLOBAL_MEMORY" "$GLOBAL_TDD" "$GLOBAL_DEBUG"; do
    [ -d "$skill" ] && FOUND=true
done
for plugin in "${PLUGIN_FILES[@]}"; do
    [ -f "$GLOBAL_PLUGIN/$plugin" ] && FOUND=true
done
for cmd in "${COMMAND_FILES[@]}"; do
    [ -f "$GLOBAL_COMMANDS/$cmd" ] && FOUND=true
done
[ -d "$GLOBAL_SCRIPTS" ] && FOUND=true

if [ "$FOUND" = false ]; then
    echo "❌ No OpenCode installation found."
    echo ""
echo "Checked:"
echo "  - $GLOBAL_MASTERY"
echo "  - $GLOBAL_META"
echo "  - $GLOBAL_SKILL_CREATOR"
echo "  - $GLOBAL_MEMORY"
echo "  - $GLOBAL_TDD"
echo "  - $GLOBAL_DEBUG"
echo "  - $GLOBAL_PLUGIN/{skill-creator.ts,notify.ts}"
echo "  - $GLOBAL_COMMANDS/{memory.md,ace-reflect.md,skill-creator-*.md}"
echo "  - $GLOBAL_SCRIPTS/*.py"
    exit 1
fi

echo "Found global installation"
echo ""
echo "This will remove:"
echo "  - $GLOBAL_MASTERY/ (skill directory)"
echo "  - $GLOBAL_META/ (skill directory)"
echo "  - $GLOBAL_SKILL_CREATOR/ (skill directory)"
echo "  - $GLOBAL_MEMORY/ (skill directory)"
echo "  - $GLOBAL_TDD/ (skill directory)"
echo "  - $GLOBAL_DEBUG/ (skill directory)"
echo "  - $GLOBAL_PLUGIN/ (plugin directory)"
echo "  - $GLOBAL_SCRIPTS/*.py (scripts)"
echo ""
echo "These will NOT be removed (your data):"
echo "  - $HOME/.ai_docs/opencode/docs/"
echo "  - $HOME/.ai_docs/opencode/memory/"
echo "  - $HOME/.ai_docs/opencode/cache/"
echo ""

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

if [ -d "$GLOBAL_MASTERY" ]; then
    rm -rf "$GLOBAL_MASTERY"
    echo "Removed: $GLOBAL_MASTERY/"
fi

if [ -d "$GLOBAL_META" ]; then
    rm -rf "$GLOBAL_META"
    echo "Removed: $GLOBAL_META/"
fi

if [ -d "$GLOBAL_SKILL_CREATOR" ]; then
    rm -rf "$GLOBAL_SKILL_CREATOR"
    echo "Removed: $GLOBAL_SKILL_CREATOR/"
fi

if [ -d "$GLOBAL_MEMORY" ]; then
    rm -rf "$GLOBAL_MEMORY"
    echo "Removed: $GLOBAL_MEMORY/"
fi

if [ -d "$GLOBAL_TDD" ]; then
    rm -rf "$GLOBAL_TDD"
    echo "Removed: $GLOBAL_TDD/"
fi

if [ -d "$GLOBAL_DEBUG" ]; then
    rm -rf "$GLOBAL_DEBUG"
    echo "Removed: $GLOBAL_DEBUG/"
fi

echo ""
echo "Removing plugin files..."
for plugin in "${PLUGIN_FILES[@]}"; do
    if [ -f "$GLOBAL_PLUGIN/$plugin" ]; then
        rm -f "$GLOBAL_PLUGIN/$plugin"
        echo "Removed: $GLOBAL_PLUGIN/$plugin"
    fi
done
# Remove plugin dir if empty
rmdir "$GLOBAL_PLUGIN" 2>/dev/null && echo "Removed empty: $GLOBAL_PLUGIN/" || true

echo ""
echo "Removing command files..."
for cmd in "${COMMAND_FILES[@]}"; do
    if [ -f "$GLOBAL_COMMANDS/$cmd" ]; then
        rm -f "$GLOBAL_COMMANDS/$cmd"
        echo "Removed: $GLOBAL_COMMANDS/$cmd"
    fi
done
# Remove commands dir if empty
rmdir "$GLOBAL_COMMANDS" 2>/dev/null && echo "Removed empty: $GLOBAL_COMMANDS/" || true

if [ -d "$GLOBAL_SCRIPTS" ]; then
    rm -f "$GLOBAL_SCRIPTS"/*.py
    echo "Removed scripts from: $GLOBAL_SCRIPTS/"

    rmdir "$GLOBAL_SCRIPTS" 2>/dev/null || true

    if [ -d "$HOME/.ai_docs/opencode" ]; then
        REMAINING=$(find "$HOME/.ai_docs/opencode" -mindepth 1 -maxdepth 1 | wc -l)
        if [ "$REMAINING" -eq 0 ]; then
            echo ""
            echo "ℹ️  $HOME/.ai_docs/opencode is now empty."
            echo "    You can remove it manually: rm -rf $HOME/.ai_docs/opencode"
        fi
    fi
fi

echo ""
echo "Uninstall complete!"
echo ""
echo "To completely remove all data (docs, memory, cache), run:"
echo "  rm -rf $HOME/.ai_docs/opencode"
