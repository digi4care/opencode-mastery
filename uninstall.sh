#!/bin/bash
set -e

echo "🗑️  OpenCode Mastery + Meta-Agent Skills Uninstaller"
echo ""
echo "This will remove opencode-mastery and meta-agent skill files."
echo "Your downloaded documentation, memory, and cache will NOT be removed."
echo ""

GLOBAL_MASTERY="$HOME/.config/opencode/skill/opencode-mastery"
GLOBAL_META="$HOME/.config/opencode/skill/meta-agent"
GLOBAL_SCRIPTS="$HOME/.ai_docs/opencode/scripts"

if [ ! -d "$GLOBAL_MASTERY" ] && [ ! -d "$GLOBAL_META" ]; then
    echo "❌ No OpenCode installation found."
    echo ""
    echo "Checked:"
    echo "  - $GLOBAL_MASTERY"
    echo "  - $GLOBAL_META"
    exit 1
fi

echo "Found global installation"
echo ""
echo "This will remove:"
echo "  - $GLOBAL_MASTERY/ (skill directory)"
echo "  - $GLOBAL_META/ (skill directory)"
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
