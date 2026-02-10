# OpenCode Mastery Examples

This directory contains progressive OpenCode skill examples that demonstrate different levels of complexity and capability. Each tier builds upon the previous one, showing how to scale from a simple skill to a full workflow orchestration system.

## 📚 Learning Path

Follow the tiers in order to build your understanding:

```
Tier 1 (Minimal) → Tier 2 (Intermediate) → Tier 3 (Advanced)
    ⭐                    ⭐⭐                    ⭐⭐⭐
```

## 🎯 Tiers Overview

| Tier | Example | Complexity | Files | Use Case | Learning Curve |
|------|----------|-------------|--------|-----------|---------------|
| **1** | `minimal-example/` | ⭐ Minimal | 1 (SKILL.md) | Proof of Concept, Quick Demo | 5 minutes |
| **2** | `intermediate-example/` | ⭐⭐ Intermediate | 2 (SKILL.md + script) | Helper Scripts, Multi-Step | 15 minutes |
| **3** | `advanced-example/` | ⭐⭐⭐ Advanced | 7 (SKILL.md + config + 5 scripts) | Full Workflow, Config-Driven | 30+ minutes |

---

## Tier 1: Minimal Example ⭐

**Location**: `minimal-example/`

**What it demonstrates**:
- Basic skill structure (single file)
- Frontmatter metadata
- Simple instruction format
- Skill = Instructions, not code

**Files**:
```
minimal-example/
└── SKILL.md
```

**Key concepts**:
- Skills are Markdown files with YAML frontmatter
- Minimal structure: `name` + `description` in frontmatter
- Content is human-readable instructions
- No executable code in SKILL.md itself

**Use case**: 
- Proof of concept
- Quick demonstration
- Instant understanding of what a skill is

**How to use**:
1. Read `minimal-example/SKILL.md`
2. Understand the frontmatter structure
3. See the instruction format
4. Ready to create your own minimal skill

**Learning objectives**:
- ✅ Understand skill basic structure
- ✅ Learn frontmatter format
- ✅ Grasp that skills are instructions

---

## Tier 2: Intermediate Example ⭐⭐

**Location**: `intermediate-example/`

**What it demonstrates**:
- Helper script integration
- Multi-step workflows
- Console output with timing
- Script execution patterns

**Files**:
```
intermediate-example/
├── SKILL.md
└── helper.sh
```

**Key concepts**:
- Skills can reference helper scripts
- Agent executes scripts via bash tool
- Scripts can be any language (bash, python, etc.)
- Ordered execution with clear phases

**How to use**:
```bash
cd intermediate-example
./helper.sh
```

**Workflow phases**:
1. **Initialization** - Setup environment, validate prerequisites
2. **Processing** - Perform main operations (data transformation, etc.)
3. **Validation** - Verify results, check quality
4. **Output** - Generate results, save files
5. **Finalization** - Cleanup, summary, exit

**Learning objectives**:
- ✅ Integrate helper scripts with skills
- ✅ Implement multi-step workflows
- ✅ Add console output with timing
- ✅ Use ordered execution patterns

---

## Tier 3: Advanced Example ⭐⭐⭐

**Location**: `advanced-example/`

**What it demonstrates**:
- Config-driven behavior
- Workflow orchestration
- State management
- Multiple phase scripts
- Router pattern with arg parsing
- Output file generation with timestamps

**Files**:
```
advanced-example/
├── SKILL.md
├── router.sh
├── config/
│   └── workflow-config.json
└── scripts/
    ├── phase-init.sh
    ├── phase-validate.sh
    ├── phase-execute.sh
    └── phase-finalize.sh
```

**Architecture**:
```
┌─────────────────────────────────────────────┐
│            SKILL.md                       │
│  (Instructions & Documentation)            │
└─────────────────┬───────────────────────┘
                  │
        User calls: ./router.sh
                  │
┌─────────────────▼───────────────────────┐
│         router.sh (Central Router)       │
│  - Parse args (--phase, --dry-run)      │
│  - Load config                          │
│  - Route to appropriate phase script      │
└───────┬─────────────┬───────────────────┘
        │             │
        ▼             ▼
   ┌─────────┐   ┌─────────┐   ┌─────────┐
   │ Init    │→  │Validate │→  │Execute  │→  │Finalize│
   │ phase   │   │ phase   │   │ phase   │   │ phase   │
   └─────────┘   └─────────┘   └─────────┘
        ↓             ↓             ↓
   ┌─────────────────────────────────────┐
   │      workflow-config.json           │
   │  - modes (development, testing)    │
   │  - output configuration             │
   │  - feature flags                   │
   └─────────────────────────────────────┘
```

**How to use**:

Run complete workflow:
```bash
cd advanced-example
./router.sh
```

Run specific phase:
```bash
./router.sh --phase init
./router.sh --phase validate
./router.sh --phase execute
./router.sh --phase finalize
```

Dry run (no execution):
```bash
./router.sh --dry-run
```

**Configuration**:

Edit `config/workflow-config.json`:

```json
{
  "mode": "development",
  "modes": {
    "development": {
      "verbose": true,
      "skip_validation": false
    },
    "testing": {
      "verbose": true,
      "skip_validation": false
    },
    "production": {
      "verbose": false,
      "skip_validation": true
    }
  },
  "output": {
    "path": "./output",
    "compression": false
  },
  "features": {
    "logging": true,
    "metrics": false
  }
}
```

**Output structure**:
```
output/
├── workflow-state.json      # Current state tracking
├── workflow-result-<timestamp>.json  # Execution results
├── workflow-report.txt      # Human-readable summary
└── workflow-output.tar.gz   # Compressed archive (if enabled)
```

**Learning objectives**:
- ✅ Implement config-driven workflows
- ✅ Create router patterns for script orchestration
- ✅ Manage state across phases
- ✅ Parse command-line arguments
- ✅ Generate output files with timestamps
- ✅ Add dry-run modes for testing
- ✅ Implement feature flags
- ✅ Create summary reports

---

## 🔧 Workflow Patterns

See [WORKFLOW_PATTERNS.md](./WORKFLOW_PATTERNS.md) for detailed documentation on:

- **Sequential workflows** - Linear execution (A → B → C)
- **Conditional workflows** - Branching logic (if X then A else B)
- **Parallel workflows** - Concurrent execution (A & B together)

## 📋 Best Practices

See [BEST_PRACTICES.md](./BEST_PRACTICES.md) for comprehensive guidelines on:

- **SKILL.md standards** - Frontmatter, structure, content
- **Script development** - Error handling, logging, validation
- **Configuration** - JSON schemas, validation, defaults
- **Documentation** - README, comments, examples
- **Testing** - Unit tests, integration tests, validation

---

## 🚀 Getting Started

### For Beginners (New to OpenCode)

Start with **Tier 1** to understand the basics:
```bash
cd minimal-example
cat SKILL.md
```

### For Intermediate Users

Move to **Tier 2** to learn script integration:
```bash
cd intermediate-example
cat SKILL.md
./helper.sh
```

### For Advanced Users

Explore **Tier 3** for full workflow orchestration:
```bash
cd advanced-example
cat SKILL.md
cat config/workflow-config.json
./router.sh --dry-run
./router.sh
```

---

## 📊 Comparison Matrix

### Complexity Levels

| Feature | Tier 1 | Tier 2 | Tier 3 |
|---------|---------|---------|---------|
| Frontmatter | ✅ | ✅ | ✅ |
| Helper scripts | ❌ | ✅ | ✅ |
| Multiple phases | ❌ | ✅ (5 steps) | ✅ (4 phases) |
| Configuration | ❌ | ❌ | ✅ (JSON) |
| Router pattern | ❌ | ❌ | ✅ |
| State management | ❌ | ❌ | ✅ |
| Arg parsing | ❌ | ❌ | ✅ |
| Dry-run mode | ❌ | ❌ | ✅ |
| Output files | ❌ | ❌ | ✅ |
| Timestamps | ❌ | ✅ | ✅ |
| Summary report | ❌ | ❌ | ✅ |

### Use Cases

| Scenario | Recommended Tier | Why |
|----------|------------------|-----|
| Quick demo / POC | Tier 1 | Instant understanding, minimal setup |
| Simple automation | Tier 2 | Multi-step execution, clear phases |
| Complex workflows | Tier 3 | Config-driven, orchestration, state management |
| Production deployment | Tier 3 | Robust error handling, dry-run, validation |
| Learning OpenCode | All tiers | Progressive complexity, clear patterns |

---

## 🎓 Learning Resources

### Official OpenCode Docs
- Skills Guide: Learn skill fundamentals
- Agent System: Understand agent-skill interaction
- CLI Reference: Command-line usage

### This Examples Repo
- Tier Examples: Hands-on learning
- Workflow Patterns: Design patterns
- Best Practices: Guidelines and standards

---

## 🔍 Troubleshooting

### Common Issues

**Issue**: Permission denied when running scripts
```bash
chmod +x script-name.sh
```

**Issue**: Config file not found
- Check you're in the correct directory
- Verify `config/` directory exists
- Ensure JSON syntax is valid

**Issue**: Phase fails with error
- Run individual phase: `./router.sh --phase <name>`
- Check logs for error details
- Verify prerequisites are met

---

## 📈 Roadmap

### Completed
- ✅ Tier 1: Minimal example
- ✅ Tier 2: Intermediate example
- ✅ Tier 3: Advanced example
- ✅ Workflow patterns documentation
- ✅ Best practices guide

### Future Enhancements
- ⏳ Tier 4: Interactive personality skill (Movie Personality pattern)
- ⏳ More workflow patterns (fan-out/fan-in, circuit breaker)
- ⏳ Integration with external APIs
- ⏳ Multi-mode workflows (development/staging/production)

---

## 🤝 Contributing

Have ideas for new examples or improvements?

1. Fork the repository
2. Create a new example tier or enhance existing ones
3. Test thoroughly
4. Submit a pull request

**Guidelines**:
- Follow best practices from `BEST_PRACTICES.md`
- Document new patterns in `WORKFLOW_PATTERNS.md`
- Update this README with new examples
- Ensure all scripts are executable

---

## 📄 License

This examples repository is part of OpenCode Mastery and follows the same license terms.

---

## 🙏 Acknowledgments

Inspired by and patterns learned from:
- [Opencode-skills-example](https://github.com/darrenhinde/Opencode-skills-example) by Darren Hinde
- OpenCode community contributions
- Real-world skill implementations

---

**Happy Coding! 🚀**

For questions or issues, please refer to the main OpenCode Mastery documentation or submit an issue.
