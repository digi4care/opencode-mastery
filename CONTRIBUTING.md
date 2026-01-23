# Contributing to OpenCode Mastery Skill

Thank you for your interest in contributing! This document provides guidelines for contributing to the OpenCode Mastery Skill.

## Getting Started

### Prerequisites

- Python 3.x installed
- Git installed and configured
- GitHub account with forked repository
- (Optional) OpenCode installed for testing

### Development Setup

1. **Fork the repository**
   ```bash
   # Fork https://github.com/digi4care/opencode-mastery
   ```

2. **Clone your fork**
   ```bash
   git clone https://github.com/YOUR_USERNAME/opencode-mastery.git
   cd opencode-mastery
   ```

3. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

4. **Install locally (for testing)**
    ```bash
    # Create directories
    mkdir -p ~/.ai_docs/opencode
    mkdir -p ~/.config/opencode/skill/opencode-mastery
    mkdir -p ~/.config/opencode/skill/meta-agent

    # Copy skill files
    cp src/skill/opencode-mastery/SKILL.md ~/.config/opencode/skill/opencode-mastery/SKILL.md
    cp src/skill/meta-agent/SKILL.md ~/.config/opencode/skill/meta-agent/SKILL.md

    # Download docs
    python3 src/scripts/download-docs.py

    # Build index
    python3 src/scripts/index-builder.py
    ```

## Types of Contributions

### Bug Reports

If you find a bug:
1. Check existing [issues](https://github.com/digi4care/opencode-mastery/issues)
2. If not reported, create a new issue with:
   - Clear title
   - Steps to reproduce
   - Expected vs actual behavior
   - Environment details (OS, Python version)
   - Relevant logs or error messages

### Feature Requests

For new features:
1. Check if already requested in [issues](https://github.com/digi4care/opencode-mastery/issues)
2. Create a new issue with:
   - Clear title
   - Problem statement
   - Proposed solution
   - Alternative approaches considered
   - Use cases

### Documentation

Improvements to documentation are welcome:
- Fix typos
- Clarify ambiguous sections
- Add examples
- Translate to other languages

### Code Contributions

#### Script Changes

When modifying scripts (`src/scripts/*.py`):
- Follow PEP 8 style guidelines
- Add type hints for function signatures
- Include docstrings for public functions
- Update CHANGELOG.md for breaking changes
- Test locally before committing

Example:
```python
def search_index(query: str, index: dict | None = None) -> list[dict]:
    """Search for query in the index.

    Args:
        query: Search keywords
        index: Index to search (defaults to loading from file)

    Returns:
        List of matching results
    """
    # Implementation
```

#### Skill Changes

When modifying the skill (`src/skill/SKILL.md`):
- Keep frontmatter valid (YAML format)
- Maintain clear section structure
- Update examples if logic changes
- Test in OpenCode to verify behavior

## Pull Request Process

### Before Submitting

1. **Update documentation**
   - Add your changes to CHANGELOG.md
   - Update README.md if API changes
   - Add inline comments for complex logic

2. **Test locally**
   ```bash
   # Test scripts
   python3 src/scripts/download-docs.py --force
   python3 src/scripts/index-builder.py --rebuild
   python3 src/scripts/memory-manager.py --search "test"

   # Test skill
   # Start OpenCode and invoke skill
   # Verify new functionality works
   ```

3. **Commit changes**
   ```bash
   git add .
   git commit -m "feat: add your feature description"
   ```

### Commit Message Format

Use conventional commits:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes
- `refactor:` - Code refactoring
- `test:` - Test additions
- `chore:` - Maintenance tasks

Examples:
```
feat: add GitHub search integration
fix: handle missing index.json gracefully
docs: update installation instructions
```

### Submitting PR

1. Push your branch:
   ```bash
   git push origin feature/your-feature-name
   ```

2. Create Pull Request:
   - Clear title with conventional commit prefix
   - Description with:
     - What changed
     - Why it's needed
     - How to test
   - Reference related issues (e.g., "Fixes #123")

### PR Review Process

1. Automated checks (CI) must pass
2. Maintainer review
3. Feedback and iteration
4. Approval and merge

## Coding Standards

### Python Scripts

- Use type hints for function signatures
- Follow PEP 8 style
- Prefer pathlib over os.path
- Use f-strings for string formatting
- Keep functions under 50 lines if possible
- Handle errors gracefully

### Markdown Files

- Use proper YAML frontmatter for SKILL.md
- Use clear headings with ## markers
- Include code examples in code blocks
- Use markdown links for references

### Testing

Add test cases for:
- New features
- Bug fixes
- Edge cases

Current testing approach:
- Manual testing with OpenCode
- Script execution with various arguments
- Skill invocation in TUI

Future: Add automated test suite

## Release Process

Releases are managed by maintainers:
1. Version number updated in package.json
2. CHANGELOG.md updated with release notes
3. Git tag created: `git tag v1.0.0`
4. Tag pushed: `git push origin v1.0.0`

## Community Guidelines

### Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Assume good intentions

### Getting Help

- Check existing [issues](https://github.com/digi4care/opencode-mastery/issues)
- Review [documentation](https://github.com/digi4care/opencode-mastery#readme)
- Ask questions in issues with "question" label
- Join OpenCode Discord for community support

## Recognition

All contributors are recognized in:
- Contributors list in README
- Release notes in CHANGELOG.md
- GitHub contributor graphs

Thank you for contributing to OpenCode Mastery! 🚀
