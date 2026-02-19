#!/bin/bash
set -e

echo "🗑️  OpenCode Mastery Skills Uninstaller"
echo ""
echo "This will remove installed skills, plugins, commands, agents, and shared config library."
echo "Your downloaded documentation, memory, and cache will NOT be removed."
echo ""

# All directories to remove
SKILLS_DIR="$HOME/.config/opencode/skill"
PLUGIN_DIR="$HOME/.config/opencode/plugin"
COMMANDS_DIR="$HOME/.config/opencode/commands"
COMMANDS_DIR_COMPAT="$HOME/.config/opencode/command"
AGENTS_DIR="$HOME/.config/opencode/agents"
LIB_DIR="$HOME/.config/opencode/lib"
SCRIPTS_DIR="$HOME/.ai_docs/opencode/scripts"

# Commands installed by this package
COMMAND_FILES=(
    "ace-reflect.md"
    "memory.md"
    "skill-creator-audit.md"
    "skill-creator-create.md"
    "skill-creator-optimize.md"
    "skill-creator-plan.md"
    "flow-analyze.md"
    "gsd-analyze-flow.md"
)

# Agents installed by this package
AGENT_FILES=(
    "ace-analyzer.md"
    "flow-analyzer.md"
    "gsd-flow-analyzer.md"
)

# All skills to remove
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
    "repo-analysis"
)

# All plugins to remove
PLUGINS=(
    "opencode-mastery"
    "tdd-enforcer"
    "debug-assistant"
    "flow-analyzer"
    "om-session"
    "repo-analyzer"
)

# Check if any files exist
FOUND=false

for skill in "${SKILLS[@]}"; do
    [ -d "$SKILLS_DIR/$skill" ] && FOUND=true
done

for plugin in "${PLUGINS[@]}"; do
    [ -d "$PLUGIN_DIR/$plugin" ] && FOUND=true
done

[ -d "$LIB_DIR/config" ] && FOUND=true
[ -d "$SCRIPTS_DIR" ] && FOUND=true

for command in "${COMMAND_FILES[@]}"; do
    [ -f "$COMMANDS_DIR/$command" ] && FOUND=true
    [ -f "$COMMANDS_DIR_COMPAT/$command" ] && FOUND=true
done

for agent_file in "${AGENT_FILES[@]}"; do
    [ -f "$AGENTS_DIR/$agent_file" ] && FOUND=true
done

if [ "$FOUND" = false ]; then
    echo "❌ No OpenCode installation found."
    echo ""
    echo "Checked:"
    echo "  - $SKILLS_DIR/*"
    echo "  - $PLUGIN_DIR/*"
    echo "  - $LIB_DIR/config"
    echo "  - $COMMANDS_DIR/*"
    echo "  - $COMMANDS_DIR_COMPAT/*"
    echo "  - $AGENTS_DIR/*"
    echo "  - $SCRIPTS_DIR"
    exit 1
fi

echo "Found global installation"
echo ""
echo "This will remove:"
echo "  - $SKILLS_DIR/ (${#SKILLS[@]} skills)"
echo "  - $PLUGIN_DIR/ (${#PLUGINS[@]} plugins)"
echo "  - $LIB_DIR/config (shared config library)"
echo "  - command files in $COMMANDS_DIR/"
echo "  - command files in $COMMANDS_DIR_COMPAT/"
echo "  - agent files in $AGENTS_DIR/"
echo "  - $SCRIPTS_DIR/"
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
echo "Removing skills..."
for skill in "${SKILLS[@]}"; do
    if [ -d "$SKILLS_DIR/$skill" ]; then
        rm -rf "$SKILLS_DIR/$skill"
        echo "  Removed: $skill"
    fi
done

echo ""
echo "Removing plugins..."
for plugin in "${PLUGINS[@]}"; do
    if [ -d "$PLUGIN_DIR/$plugin" ]; then
        rm -rf "$PLUGIN_DIR/$plugin"
        echo "  Removed: $plugin"
    fi
done

echo ""
echo "Removing shared config library..."
if [ -d "$LIB_DIR/config" ]; then
    rm -rf "$LIB_DIR/config"
    echo "  Removed: $LIB_DIR/config"
fi
rmdir "$LIB_DIR" 2>/dev/null || true

echo ""
echo "Removing commands..."
for command in "${COMMAND_FILES[@]}"; do
    if [ -f "$COMMANDS_DIR/$command" ]; then
        rm -f "$COMMANDS_DIR/$command"
        echo "  Removed: $COMMANDS_DIR/$command"
    fi

    if [ -f "$COMMANDS_DIR_COMPAT/$command" ]; then
        rm -f "$COMMANDS_DIR_COMPAT/$command"
        echo "  Removed: $COMMANDS_DIR_COMPAT/$command"
    fi
done

echo ""
echo "Removing agents..."
for agent_file in "${AGENT_FILES[@]}"; do
    if [ -f "$AGENTS_DIR/$agent_file" ]; then
        rm -f "$AGENTS_DIR/$agent_file"
        echo "  Removed: $AGENTS_DIR/$agent_file"
    fi
done

echo ""
echo "Removing scripts..."
if [ -d "$SCRIPTS_DIR" ]; then
    rm -rf "$SCRIPTS_DIR"
    echo "  Removed: $SCRIPTS_DIR"
fi

# Cleanup empty directories
rmdir "$PLUGIN_DIR" 2>/dev/null && echo "  Removed empty: $PLUGIN_DIR" || true
rmdir "$SKILLS_DIR" 2>/dev/null && echo "  Removed empty: $SKILLS_DIR" || true

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
