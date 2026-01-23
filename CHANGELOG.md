# Changelog

All notable changes to OpenCode Mastery Skill will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [1.2.0] - 2026-01-23

### Added
- Meta-agent skill for generating OpenCode commands, skills, and agents
- Meta-agent uses opencode-mastery skill for accurate documentation
- Component templates for commands, skills, and agents

### Fixed
- Global skill installation path uses `.opencode/skill/` (singular) to match system requirements
- OpenCode now correctly discovers and loads skills from `.opencode/skill/`
- Meta-agent skill structure matches opencode-mastery skill structure
- Updated all documentation (README, CHANGELOG) with correct `.opencode/skill/` paths

### Changed
- `install.sh`: Installs to `~/.config/opencode/skill/` (singular, not skills/)
- `uninstall.sh`: Checks and removes from `~/.config/opencode/skill/` (singular)
- Meta-agent template generates skills to `.opencode/skill/` (singular) directory

## [1.1.0] - 2026-01-23

### Added
- Interactive installation mode selection (global vs project)
- Project-local installation option at `.opencode/skills/`
- Automatic local file detection when installing from repo
- Installation confirmation prompt with preview of paths
- `uninstall.sh` script that removes only skill files, not user data
- Uninstall section in README.md with instructions for safe removal

### Changed
- `install.sh` now prompts for installation scope
- Enhanced error handling in `install.sh` with explicit error messages
- Updated documentation for both global and project installation modes
- Scripts now install to `.ai_docs/opencode/scripts/` (was `src/scripts/`)

### Fixed
- Scripts directory not being populated correctly in local installation
- Missing directory structure creation in project installation mode
- Silent failures in file copy operations now show explicit errors
- Uninstall: changed `--yes` to `--silent` flag for non-interactive mode

### Documentation
- Added installation mode comparison in README.md
- Updated all path references to support both global and project installs
- Updated SKILL.md with dual-mode command examples
- Added troubleshooting section with both installation modes
- Added complete removal instructions

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
- Skill location: `~/.config/opencode/skills/opencode-mastery/SKILL.md`

---

## [Future]

### Planned
- Custom tool plugin for direct docs search
- Automatic session compaction hooks
- GitHub integration for live search
- Version checking and auto-update notifications
- Analytics dashboard for usage patterns
