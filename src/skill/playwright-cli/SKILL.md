---
name: playwright-cli
description: Automates browser interactions for web testing, form filling, screenshots, and data extraction. Use when navigating websites, interacting with web pages, filling forms, testing web applications, or extracting information.
license: MIT
compatibility: opencode
metadata:
  author: Microsoft
  version: "1.0"
  source: https://github.com/microsoft/playwright-cli
---

# Browser Automation with Playwright CLI

Automates browser interactions for web testing, form filling, screenshots, and data extraction.

## When to Use

- Web testing and automation
- Form filling and submission
- Screenshot capture
- Data extraction from websites
- Visual debugging of web applications
- End-to-end testing workflows

## Quick Reference

```bash
# Open browser
playwright-cli open

# Navigate
playwright-cli goto https://example.com

# Interact
playwright-cli click e15
playwright-cli type "text"
playwright-cli fill e1 "value"

# Capture
playwright-cli screenshot
playwright-cli snapshot
playwright-cli console

# Network
playwright-cli network

# Close
playwright-cli close
```

## Core Commands

- `open` - Open browser
- `goto` - Navigate to URL
- `click/type/fill` - Interactions
- `snapshot` - Capture DOM state
- `screenshot` - Visual capture
- `console` - Monitor console logs
- `network` - Monitor requests

## Advanced

- `tracing-start/tracing-stop` - Performance tracing
- `video-start/video-stop` - Video recording
- `request-mocking` - API mocking
- `session-management` - Multi-browser sessions

## References

- references/playwright-cli-ref-test-generation.md - Auto-generate tests
- references/playwright-cli-ref-tracing.md - Performance analysis
- references/playwright-cli-ref-video-recording.md - Video capture
- references/playwright-cli-ref-request-mocking.md - API mocking
- references/playwright-cli-ref-session-management.md - Multi-session
- references/playwright-cli-ref-storage-state.md - Cookies/localStorage

## Related Skills

- systematic-debugging (combine for visual debugging)
- test-driven-development (browser-based tests)
