#!/usr/bin/env python3
"""
Download OpenCode documentation from GitHub for local caching.

Usage:
    python download-docs.py [--force] [--verbose]

Options:
    --force    Force download even if cache is recent
    --verbose  Show detailed progress
"""

import argparse
import json
import sys
import urllib.request
import urllib.error
from datetime import datetime, timedelta
from pathlib import Path

GITHUB_RAW_BASE = "https://raw.githubusercontent.com/anomalyco/opencode/dev/packages/web/src/content/docs"

DOCS_MAPPING = {
    "skills.mdx": "Agent Skills Documentation",
    "agents.mdx": "Agents Configuration",
    "commands.mdx": "Custom Commands",
    "config.mdx": "Configuration Reference",
    "tools.mdx": "Tools Reference",
    "mcp-servers.mdx": "MCP Servers",
    "lsp.mdx": "LSP Servers Configuration",
    "plugins.mdx": "Plugin Development",
    "sdk.mdx": "SDK Reference",
    "custom-tools.mdx": "Custom Tools",
    "providers.mdx": "Model Providers",
    "troubleshooting.mdx": "Troubleshooting Guide",
    "tui.mdx": "Terminal User Interface",
    "cli.mdx": "Command Line Interface",
    "web.mdx": "Web Interface",
    "ide.mdx": "IDE Integration",
}

CACHE_DAYS = 7


def download_file(url: str, verbose: bool = False) -> str | None:
    try:
        req = urllib.request.Request(
            url, headers={"User-Agent": "opencode-mastery/1.0"}
        )
        with urllib.request.urlopen(req, timeout=30) as response:
            if response.status == 200:
                if verbose:
                    print(f"  ✓ Downloaded: {url}")
                return response.read().decode("utf-8")
            else:
                if verbose:
                    print(f"  ✗ Failed: {url} (HTTP {response.status})")
                return None
    except urllib.error.HTTPError as e:
        if verbose:
            print(f"  ✗ Failed: {url} (HTTP {e.code})")
        return None
    except Exception as e:
        if verbose:
            print(f"  ✗ Error: {url} - {e}")
        return None


def needs_refresh(file_path: Path, force: bool = False) -> bool:
    if not file_path.exists():
        return True

    if force:
        return True

    mtime = file_path.stat().st_mtime
    age_days = (datetime.now().timestamp() - mtime) / 86400

    return age_days > CACHE_DAYS


def download_docs(docs_path: Path, force: bool = False, verbose: bool = False):
    print(f"📥 Downloading OpenCode docs to: {docs_path}")
    print()

    success_count = 0
    fail_count = 0

    for filename, description in DOCS_MAPPING.items():
        output_file = docs_path / filename
        url = f"{GITHUB_RAW_BASE}/{filename}"

        if not needs_refresh(output_file, force):
            if verbose:
                print(f"  ⏭️  Skipping {filename} (cache fresh)")
            success_count += 1
            continue

        content = download_file(url, verbose)

        if content:
            output_file.write_text(content)
            success_count += 1
        else:
            fail_count += 1

    print()
    print(f"✅ Success: {success_count} files")
    if fail_count > 0:
        print(f"❌ Failed: {fail_count} files")
    print()

    metadata = {
        "version": "1.0.0",
        "downloaded": datetime.now().isoformat(),
        "files": list(DOCS_MAPPING.keys()),
        "cache_policy": f"refresh after {CACHE_DAYS} days",
    }

    metadata_file = docs_path / ".metadata.json"
    metadata_file.write_text(json.dumps(metadata, indent=2))
    print(f"📝 Metadata saved to: {metadata_file}")


def main():
    parser = argparse.ArgumentParser(description="Download OpenCode documentation")
    parser.add_argument(
        "--force", action="store_true", help="Force download even if cache is recent"
    )
    parser.add_argument(
        "--verbose", "-v", action="store_true", help="Show detailed progress"
    )

    args = parser.parse_args()

    base_path = Path.home() / ".ai_docs" / "opencode" / "docs"
    base_path.mkdir(parents=True, exist_ok=True)

    try:
        download_docs(base_path, force=args.force, verbose=args.verbose)
        return 0
    except KeyboardInterrupt:
        print("\n\n⚠️  Download interrupted")
        return 130
    except Exception as e:
        print(f"\n❌ Error: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
