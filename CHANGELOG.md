# Changelog

All notable changes to OpenCode Mastery Skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.0.0] - 2026-01-23

### Added
- Initial release of OpenCode Mastery Skill
- **Core Scripts**:
  - `download-docs.py` - Downloads OpenCode documentation from GitHub
  - `index-builder.py` - Builds fuzzy search index with 1633 keywords
  - `memory-manager.py` - Manages session and topic memory
- **Skill Definition**: Complete SKILL.md with lazy-loading, GitHub integration
- **Documentation**: Comprehensive README and inline documentation
- **Installation**: One-command install script for easy deployment

### Features
- Lazy-loaded documentation (16 docs files)
- Fuzzy search with keyword extraction
- Session memory with topic tracking
- Automatic docs refresh (7-day cache policy)
- Source citation for all answers
- Confidence scoring

### Installation
- GitHub repository created: `digi4care/opencode-mastery`
- Quick install: `curl -fsSL https://raw.githubusercontent.com/digi4care/opencode-mastery/main/install.sh | bash`
- Skill location: `~/.opencode/skills/opencode-mastery/SKILL.md`

---

## [Future]

### Planned
- Custom tool plugin for direct docs search
- Automatic session compaction hooks
- GitHub integration for live search
- Version checking and auto-update notifications
- Analytics dashboard for usage patterns
