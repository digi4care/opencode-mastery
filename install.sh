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
echo "This package includes 16 skills:"
echo ""
echo "  Core Skills:"
echo "  • opencode-mastery      - Complete OpenCode knowledge base"
echo "  • meta-agent            - Generate commands, skills, and agents"
echo "  • skill-creator         - Create, audit, and optimize skills"
echo "  • opencode-memory       - Memory plugin with tools and hooks"
echo ""
echo "  Development Skills:"
echo "  • test-driven-development - Enforce TDD discipline"
echo "  • systematic-debugging  - Methodical debugging framework"
echo "  • playwright-cli        - Browser automation and visual testing"
echo ""
echo "  Frontend Skills:"
echo "  • frontend-design       - UI/UX guidelines for developers"
echo "  • tailwind              - Tailwind CSS v4 styling"
echo "  • shadcn-svelte         - shadcn-svelte component library"
echo ""
echo "  Svelte Skills:"
echo "  • svelte                - Svelte 5 core knowledge"
echo "  • svelte-cli            - Svelte CLI commands"
echo "  • svelte-kit            - Full-stack SvelteKit"
echo "  • svelte-mcp            - Svelte MCP server"
echo ""
echo "  Database Skills:"
echo "  • database-architect    - Database design patterns"
echo "  • postgresql            - PostgreSQL table design"
echo ""
echo "Installing globally (available in all projects)..."
echo ""

# Directories
INSTALL_DIR="$HOME/.ai_docs/opencode"
SCRIPTS_DIR="$INSTALL_DIR/scripts"
COMMANDS_DIR="$HOME/.config/opencode/commands"
PLUGIN_DIR="$HOME/.config/opencode/plugin"

# Skill directories
SKILLS_DIR="$HOME/.config/opencode/skill"
MASTERY_SKILL_DIR="$SKILLS_DIR/opencode-mastery"
META_AGENT_SKILL_DIR="$SKILLS_DIR/meta-agent"
SKILL_CREATOR_SKILL_DIR="$SKILLS_DIR/skill-creator"
MEMORY_SKILL_DIR="$SKILLS_DIR/opencode-memory"
TDD_SKILL_DIR="$SKILLS_DIR/test-driven-development"
DEBUG_SKILL_DIR="$SKILLS_DIR/systematic-debugging"
PLAYWRIGHT_SKILL_DIR="$SKILLS_DIR/playwright-cli"
FRONTEND_SKILL_DIR="$SKILLS_DIR/frontend-design"
TAILWIND_SKILL_DIR="$SKILLS_DIR/tailwind"
SHADCN_SKILL_DIR="$SKILLS_DIR/shadcn-svelte"
SVELTE_SKILL_DIR="$SKILLS_DIR/svelte"
SVELTE_CLI_SKILL_DIR="$SKILLS_DIR/svelte-cli"
SVELTE_KIT_SKILL_DIR="$SKILLS_DIR/svelte-kit"
SVELTE_MCP_SKILL_DIR="$SKILLS_DIR/svelte-mcp"
DB_ARCHITECT_SKILL_DIR="$SKILLS_DIR/database-architect"
POSTGRESQL_SKILL_DIR="$SKILLS_DIR/postgresql"

echo "Installing to:"
echo "  Docs/Scripts:             $INSTALL_DIR"
echo "  Skills:                   $SKILLS_DIR"
echo "  Plugin:                   $PLUGIN_DIR"
echo "  Commands:                 $COMMANDS_DIR"
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
mkdir -p "$SCRIPTS_DIR"
mkdir -p "$COMMANDS_DIR"
mkdir -p "$PLUGIN_DIR"

# Create all skill directories
for skill_dir in "$MASTERY_SKILL_DIR" "$META_AGENT_SKILL_DIR" "$SKILL_CREATOR_SKILL_DIR" \
                 "$MEMORY_SKILL_DIR" "$TDD_SKILL_DIR" "$DEBUG_SKILL_DIR" "$PLAYWRIGHT_SKILL_DIR" \
                 "$FRONTEND_SKILL_DIR" "$TAILWIND_SKILL_DIR" "$SHADCN_SKILL_DIR" \
                 "$SVELTE_SKILL_DIR" "$SVELTE_CLI_SKILL_DIR" "$SVELTE_KIT_SKILL_DIR" \
                 "$SVELTE_MCP_SKILL_DIR" "$DB_ARCHITECT_SKILL_DIR" "$POSTGRESQL_SKILL_DIR"; do
    mkdir -p "$skill_dir"
done

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
echo "📋 Copying skill directories..."

# Copy all skills
copy_skill() {
    local skill_name=$1
    local target_dir=$2
    echo "  Copying $skill_name..."
    if ! cp -r "$TEMP_DIR/src/skill/$skill_name/"* "$target_dir/"; then
        echo "❌ Failed to copy $skill_name skill directory"
        rm -rf "$TEMP_DIR"
        exit 1
    fi
}

copy_skill "opencode-mastery" "$MASTERY_SKILL_DIR"
copy_skill "meta-agent" "$META_AGENT_SKILL_DIR"
copy_skill "skill-creator" "$SKILL_CREATOR_SKILL_DIR"
copy_skill "opencode-memory" "$MEMORY_SKILL_DIR"
copy_skill "test-driven-development" "$TDD_SKILL_DIR"
copy_skill "systematic-debugging" "$DEBUG_SKILL_DIR"
copy_skill "playwright-cli" "$PLAYWRIGHT_SKILL_DIR"
copy_skill "frontend-design" "$FRONTEND_SKILL_DIR"
copy_skill "tailwind" "$TAILWIND_SKILL_DIR"
copy_skill "shadcn-svelte" "$SHADCN_SKILL_DIR"
copy_skill "svelte" "$SVELTE_SKILL_DIR"
copy_skill "svelte-cli" "$SVELTE_CLI_SKILL_DIR"
copy_skill "svelte-kit" "$SVELTE_KIT_SKILL_DIR"
copy_skill "svelte-mcp" "$SVELTE_MCP_SKILL_DIR"
copy_skill "database-architect" "$DB_ARCHITECT_SKILL_DIR"
copy_skill "postgresql" "$POSTGRESQL_SKILL_DIR"

echo ""
echo "🗑️  Removing scripts from skill directories (kept globally)..."
for skill_dir in "$MASTERY_SKILL_DIR" "$META_AGENT_SKILL_DIR" "$SKILL_CREATOR_SKILL_DIR" \
                 "$MEMORY_SKILL_DIR" "$TDD_SKILL_DIR" "$DEBUG_SKILL_DIR" "$PLAYWRIGHT_SKILL_DIR" \
                 "$FRONTEND_SKILL_DIR" "$TAILWIND_SKILL_DIR" "$SHADCN_SKILL_DIR" \
                 "$SVELTE_SKILL_DIR" "$SVELTE_CLI_SKILL_DIR" "$SVELTE_KIT_SKILL_DIR" \
                 "$SVELTE_MCP_SKILL_DIR" "$DB_ARCHITECT_SKILL_DIR" "$POSTGRESQL_SKILL_DIR"; do
    rm -rf "$skill_dir/scripts" 2>/dev/null || true
done

echo ""
echo "📋 Copying commands..."
if [ -d "$TEMP_DIR/src/commands" ]; then
    cp -r "$TEMP_DIR/src/commands/"* "$COMMANDS_DIR/" 2>/dev/null || true
    echo "✓ Commands copied to:       $COMMANDS_DIR"
else
    echo "ℹ️  No commands to install"
fi

echo ""
echo "📋 Copying plugins..."
if [ -d "$TEMP_DIR/.opencode/plugin" ]; then
    cp -r "$TEMP_DIR/.opencode/plugin/"* "$PLUGIN_DIR/" 2>/dev/null || true
    echo "✓ Plugins copied to:        $PLUGIN_DIR"
else
    echo "ℹ️  No plugins to install"
fi

rm -rf "$TEMP_DIR"

echo ""
echo "✓ Scripts copied to:              $SCRIPTS_DIR"
echo "✓ 16 skills copied to:            $SKILLS_DIR"

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
echo "Quick Start:"
echo "  /skill opencode-mastery     - Ask anything about OpenCode"
echo "  /skill test-driven-development - Enforce TDD automatically"
echo "  /skill systematic-debugging - Debug methodically"
echo "  /skill frontend-design      - UI/UX for developers"
echo ""
echo "All Skills:"
echo "  /skill opencode-mastery     /skill meta-agent"
echo "  /skill skill-creator        /skill opencode-memory"
echo "  /skill test-driven-development /skill systematic-debugging"
echo "  /skill playwright-cli       /skill frontend-design"
echo "  /skill tailwind             /skill shadcn-svelte"
echo "  /skill svelte               /skill svelte-cli"
echo "  /skill svelte-kit           /skill svelte-mcp"
echo "  /skill database-architect   /skill postgresql"
echo ""
echo "📍 Files installed at:"
echo "  - Scripts:                 $SCRIPTS_DIR"
echo "  - Skills:                  $SKILLS_DIR"
echo "  - Plugin:                  $PLUGIN_DIR"
echo "  - Commands:                $COMMANDS_DIR"
echo "  - Docs:                    $INSTALL_DIR/docs"
echo "  - Memory:                  $INSTALL_DIR/memory"
