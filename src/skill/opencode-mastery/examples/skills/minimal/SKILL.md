---
name: minimal-example
description: Demonstrates the absolute basics of an OpenCode skill
---

# Minimal Skill Example

## What I Do

I demonstrate the simplest possible OpenCode skill structure to help you understand the fundamentals.

## Key Concept

**Skills are INSTRUCTIONS, not code.** An OpenCode skill is a Markdown file with frontmatter that provides guidance to the AI assistant. The assistant reads the skill file and follows its instructions.

## Structure

This skill contains only one file:

```
minimal-example/
└── SKILL.md  ← You are here!
```

That's it! No scripts, no configuration, no code. Just instructions in Markdown.

## Frontmatter

Every OpenCode skill starts with YAML frontmatter:

```yaml
---
name: skill-name
description: One-line description
---
```

This frontmatter tells OpenCode:

- **name**: The skill identifier (used in commands)
- **description**: Brief explanation of what the skill does

## How to Use Me

Since this is just a demonstration skill, you can't really "use" me for anything practical. However, you can:

1. **Read this file** to understand skill structure
2. **Copy the frontmatter** as a template for new skills
3. **See the pattern** - skills are instructions, not executable code

## Example: Using the Bash Tool

When an OpenCode skill needs to execute commands, it uses the Bash tool. Here's a simple example:

```bash
echo "Hello from OpenCode skills!"
```

The AI assistant would execute this command and show you the output.

## What This Demonstrates

- ✅ Basic frontmatter structure
- ✅ Skills as instructions (not code)
- ✅ Markdown-based documentation
- ✅ Simple pattern for quick POCs
- ✅ Instant understanding with minimal complexity

## Next Steps

- Try the **intermediate example** to see helper script integration
- Try the **advanced example** to see full workflow orchestration
- Read the **workflow patterns guide** to understand sequential execution

## Learning Objectives

After studying this minimal example, you should understand:

1. What an OpenCode skill file looks like
2. How frontmatter works
3. That skills are instructions, not executable code
4. The simplest possible skill structure

---

**Difficulty**: ⭐ (Absolute beginner)
**Complexity**: Minimal (1 file)
**Learning Curve**: Instant understanding
**Use Case**: Proof of concept, quick reference, educational demo
