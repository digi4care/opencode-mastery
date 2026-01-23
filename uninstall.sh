#!/bin/bash
set -e

echo "🗑️  OpenCode Mastery Skill Uninstaller"
echo ""
echo "This will remove only the OpenCode Mastery skill files."
echo "Your downloaded documentation, memory, and cache will NOT be removed."
echo ""

GLOBAL_SKILL="$HOME/.opencode/skills/opencode-mastery"
PROJECT_SKILL="$(pwd)/.opencode/skills/opencode-mastery"
GLOBAL_SCRIPTS="$HOME/.ai_docs/opencode/scripts"
PROJECT_SCRIPTS="$(pwd)/.ai_docs/opencode/scripts"

INSTALL_TYPE=""

if [ -d "$GLOBAL_SKILL" ]; then
    INSTALL_TYPE="global"
elif [ -d "$PROJECT_SKILL" ]; then
    INSTALL_TYPE="project"
else
    echo "❌ No OpenCode Mastery installation found."
    echo ""
    echo "Checked:"
    echo "  - $GLOBAL_SKILL"
    echo "  - $PROJECT_SKILL"
    exit 1
fi

echo "Found installation type: $INSTALL_TYPE"
echo ""

if [ "$INSTALL_TYPE" = "global" ]; then
    echo "This will remove:"
    echo "  - $GLOBAL_SKILL/SKILL.md"
    echo "  - $GLOBAL_SCRIPTS/*.py"
    echo ""
    echo "These will NOT be removed (your data):"
    echo "  - $HOME/.ai_docs/opencode/docs/"
    echo "  - $HOME/.ai_docs/opencode/memory/"
    echo "  - $HOME/.ai_docs/opencode/cache/"
else
    echo "This will remove:"
    echo "  - $PROJECT_SKILL/SKILL.md"
    echo "  - $PROJECT_SCRIPTS/*.py"
    echo ""
    echo "These will NOT be removed (your data):"
    echo "  - $(pwd)/.ai_docs/opencode/docs/"
    echo "  - $(pwd)/.ai_docs/opencode/memory/"
    echo "  - $(pwd)/.ai_docs/opencode/cache/"
fi

echo ""
read -p "Continue uninstall? [y/N] (default: N): " confirm
confirm=${confirm:-N}
if [[ ! "$confirm" =~ ^[Yy]$ ]]; then
    echo "Uninstall cancelled."
    exit 0
fi

echo ""
echo "🗑️  Removing skill files..."

if [ "$INSTALL_TYPE" = "global" ]; then
    if [ -f "$GLOBAL_SKILL/SKILL.md" ]; then
        rm -f "$GLOBAL_SKILL/SKILL.md"
        echo "✓ Removed: $GLOBAL_SKILL/SKILL.md"
    fi

    if [ -d "$GLOBAL_SCRIPTS" ]; then
        rm -f "$GLOBAL_SCRIPTS"/*.py
        echo "✓ Removed scripts from: $GLOBAL_SCRIPTS/"

        rmdir "$GLOBAL_SCRIPTS" 2>/dev/null || true
        rmdir "$GLOBAL_SKILL" 2>/dev/null || true

        if [ -d "$HOME/.ai_docs/opencode" ]; then
            REMAINING=$(find "$HOME/.ai_docs/opencode" -mindepth 1 -maxdepth 1 | wc -l)
            if [ "$REMAINING" -eq 0 ]; then
                echo "ℹ️  $HOME/.ai_docs/opencode is now empty."
                echo "    You can remove it manually: rm -rf $HOME/.ai_docs/opencode"
            fi
        fi
    fi
else
    if [ -f "$PROJECT_SKILL/SKILL.md" ]; then
        rm -f "$PROJECT_SKILL/SKILL.md"
        echo "✓ Removed: $PROJECT_SKILL/SKILL.md"
    fi

    if [ -d "$PROJECT_SCRIPTS" ]; then
        rm -f "$PROJECT_SCRIPTS"/*.py
        echo "✓ Removed scripts from: $PROJECT_SCRIPTS/"

        rmdir "$PROJECT_SCRIPTS" 2>/dev/null || true
        rmdir "$PROJECT_SKILL" 2>/dev/null || true

        if [ -d "$(pwd)/.ai_docs/opencode" ]; then
            REMAINING=$(find "$(pwd)/.ai_docs/opencode" -mindepth 1 -maxdepth 1 | wc -l)
            if [ "$REMAINING" -eq 0 ]; then
                echo "ℹ️  $(pwd)/.ai_docs/opencode is now empty."
                echo "    You can remove it manually: rm -rf $(pwd)/.ai_docs/opencode"
            fi
        fi
    fi
fi

echo ""
echo "Found installation type: $INSTALL_TYPE"
echo ""

if [ "$INSTALL_TYPE" = "global" ]; then
    echo "This will remove:"
    echo "  - $GLOBAL_SKILL/SKILL.md"
    echo "  - $GLOBAL_SCRIPTS/*.py"
    echo ""
    echo "These will NOT be removed (your data):"
    echo "  - $HOME/.ai_docs/opencode/docs/"
    echo "  - $HOME/.ai_docs/opencode/memory/"
    echo "  - $HOME/.ai_docs/opencode/cache/"
else
    echo "This will remove:"
    echo "  - $PROJECT_SKILL/SKILL.md"
    echo "  - $PROJECT_SCRIPTS/*.py"
    echo ""
    echo "These will NOT be removed (your data):"
    echo "  - $(pwd)/.ai_docs/opencode/docs/"
    echo "  - $(pwd)/.ai_docs/opencode/memory/"
    echo "  - $(pwd)/.ai_docs/opencode/cache/"
fi

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
