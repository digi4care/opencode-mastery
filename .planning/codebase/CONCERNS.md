# Codebase Concerns

**Analysis Date:** 2026-02-18

## Tech Debt

**Duplicated Code in `index_builder.py`:**

- Issue: `load_registry()` function contains duplicate try-except blocks (lines 100-112)
- Files: `src/skill/opencode-mastery/scripts/index_builder.py`
- Impact: Dead code, potential confusion during maintenance
- Fix approach: Remove the duplicate try-except block (lines 107-112)

**Optional Dependency Handling:**

- Issue: `rapidfuzz` is optional but search quality degrades significantly without it
- Files: `src/skill/opencode-mastery/scripts/load_docs.py`
- Impact: Substring matching fallback gives all matches score=80, no fuzzy relevance ranking
- Fix approach: Document dependency clearly, or make rapidfuzz required

**Large Bundled Plugin File:**

- Issue: `skill-creator.js` is 13,196 lines (minified bundle)
- Files: `src/plugin/dist/skill-creator.js`
- Impact: Hard to debug, large install footprint
- Fix approach: Consider source maps or keep source separate

## Test Coverage Gaps

**Untested Python Scripts:**

- What's not tested: `ace-reflector.py`, `memory_cli.py`, `memory-manager.py`, `download-docs.py`
- Files: `src/skill/opencode-mastery/scripts/`
- Risk: CLI commands and memory operations could break unnoticed
- Priority: High

**Tool Examples Tests:**

- What's not tested: Tier 3 advanced tool examples (tests still TODO)
- Files: `src/skill/opencode-mastery/examples/tools/README.md` line 30
- Risk: Example code may not work as documented
- Priority: Medium

**Plugin Code:**

- What's not tested: No TypeScript tests for plugin functionality
- Files: `src/plugin/`
- Risk: Plugin behavior changes could break silently
- Priority: Medium

## Fragile Areas

**Path Detection Logic:**

- Files: `src/skill/opencode-mastery/scripts/load_docs.py`, `index_builder.py`
- Why fragile: Uses INSTALLED_REFERENCES_DIR vs DEV_REFERENCES_DIR based on existence check
- Safe modification: Test both paths before release, document expected behavior
- Test coverage: Partially covered in test-load-docs.py with mocked paths

**ACE Reflector Session Storage Access:**

- Files: `src/skill/opencode-mastery/scripts/ace-reflector.py`
- Why fragile: Depends on OpenCode's internal storage structure (`~/.local/share/opencode/project/*/storage/*.json`)
- Safe modification: Changes to OpenCode storage format will break this
- Test coverage: None - no tests for ace-reflector.py

**Duplicate Detection Algorithm:**

- Files: `src/skill/opencode-mastery/scripts/memory_cli.py` (`_scan_for_duplicates`)
- Why fragile: Uses simple word overlap ratio (0.7 threshold), no semantic similarity
- Safe modification: May produce false positives/negatives on edge cases
- Test coverage: None

## Security Considerations

**Subprocess Usage:**

- Risk: External command execution without explicit input sanitization
- Files: `src/skill/opencode-mastery/scripts/memory_cli.py` lines 223-241, 414-418
- Current mitigation: Uses fixed command arguments (git, sys.executable), no user input to commands
- Recommendations: Document subprocess usage, add explicit command allowlist pattern

**File Operations:**

- Risk: No explicit path traversal validation in file write operations
- Files: `src/skill/opencode-mastery/scripts/memory_cli.py`, `memory-manager.py`
- Current mitigation: Paths derived from Path.cwd() or Path.home(), not user input directly
- Recommendations: Add path validation for any future user-controlled path parameters

**Plugin Input Validation:**

- Risk: Tool inputs must be validated (documented in anti-patterns.md)
- Files: Documented pattern in `docs/project/anti-patterns.md` lines 166-179
- Current mitigation: Zod schemas used for tool input validation
- Recommendations: Ensure all tools follow validated input pattern

## Performance Bottlenecks

**Full File Loading for Indexing:**

- Problem: Loads entire documentation content into memory for index building
- Files: `src/skill/opencode-mastery/scripts/index_builder.py`
- Cause: `doc.read_text()` loads full content, no streaming
- Improvement path: Consider streaming for very large doc collections

**Cache TTL Duration:**

- Problem: 7-day cache may be too long for rapidly changing OpenCode docs
- Files: `src/skill/opencode-mastery/scripts/download-docs.py` line 54
- Cause: `CACHE_DAYS = 7` is hardcoded
- Improvement path: Make configurable via environment variable or config file

## Dependencies at Risk

**rapidfuzz (Optional):**

- Risk: Optional dependency significantly improves search quality
- Impact: Without it, all substring matches get score=80, no relevance ranking
- Migration plan: Consider making required or add fallback scoring algorithm

**python-frontmatter:**

- Risk: Listed in dependency-groups (dev), used in runtime by memory_cli.py
- Impact: ModuleNotFoundError if not installed via `uv sync --group dev`
- Migration plan: Move to main dependencies or document requirement clearly

## Missing Critical Features

**No Test Runner Integration:**

- Problem: Tests run via `bun run test` but no CI integration
- Blocks: Automated quality gates, release validation
- Note: pytest configured but no CI pipeline detected

**No Versioned Documentation:**

- Problem: Downloaded docs always pull from `dev` branch
- Files: `src/skill/opencode-mastery/scripts/download-docs.py` line 21
- Blocks: Pinning to specific OpenCode versions

## Known Bugs

**LSP Import Resolution in Tests:**

- Symptoms: "Import could not be resolved" warnings in test files
- Files: `src/skill/opencode-mastery/scripts/test-load-docs.py`
- Trigger: Dynamic module loading from hyphenated filenames
- Workaround: Run tests from scripts directory with PYTHONPATH set

**Empty Query Matches All:**

- Symptoms: Empty string query returns all results
- Files: `src/skill/opencode-mastery/scripts/load_docs.py` substring fallback
- Trigger: Empty string is substring of everything
- Workaround: Caller must validate query is not empty (main() does this)

## Scaling Limits

**Memory File Growth:**

- Current capacity: No limit on `.memory.md` file size
- Limit: Large memory files slow session bootstrap
- Scaling path: Implement compaction thresholds, archive old entries

**Search Index Size:**

- Current capacity: Entire index loaded into memory
- Limit: Index size grows with documentation size
- Scaling path: Consider lazy loading or database-backed index for large doc sets

---

_Concerns audit: 2026-02-18_
