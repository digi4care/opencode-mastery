#!/usr/bin/env bun
/**
 * Deploy script - Compile TypeScript plugins
 * 
 * Usage:
 *   bun run deploy           # Build all plugins
 *   bun run deploy --watch   # Watch mode
 *   bun run deploy --help    # Show help
 */

import { $ } from "bun";
import { existsSync, readdirSync } from "fs";
import { join } from "path";

const PLUGIN_DIR = join(process.env.HOME || "", ".config/opencode/plugin");
const SRC_DIR = join(import.meta.dir, "..", "src/plugin");

const PLUGINS = [
  "tdd-enforcer",
  "debug-assistant",
  "flow-analyzer",
  "om-session",
  "repo-analyzer",
  "skill-creator",
  "gsd-validation-runtime",
  "opencode-mastery",
];

// External dependencies that shouldn't be bundled
const EXTERNALS = [
  "@opencode-ai/plugin",
  "@node-llama-cpp/mac-arm64-metal",
  "@node-llama-cpp/mac-x64",
  "@node-llama-cpp/win-x64",
  "@node-llama-cpp/win-x64-cuda",
  "@node-llama-cpp/win-x64-cuda-ext",
  "@node-llama-cpp/win-x64-vulkan",
  "@node-llama-cpp/win-arm64",
];

interface Args {
  help: boolean;
  watch: boolean;
  verbose: boolean;
}

function parseArgs(): Args {
  return {
    help: process.argv.includes("--help") || process.argv.includes("-h"),
    watch: process.argv.includes("--watch") || process.argv.includes("-w"),
    verbose: process.argv.includes("--verbose") || process.argv.includes("-v"),
  };
}

function showHelp(): void {
  console.log(`
🔨 OpenCode Mastery - Deploy Script

Usage:
  bun run deploy [options]

Options:
  -h, --help     Show this help
  -w, --watch    Watch for changes and rebuild
  -v, --verbose  Show detailed output

Description:
  Compiles TypeScript plugins to JavaScript.
  Plugins are built to: ~/.config/opencode/plugin/<name>/
`);
}

async function buildPlugin(pluginName: string, verbose: boolean): Promise<boolean> {
  const srcPath = join(SRC_DIR, pluginName, "index.ts");
  const outDir = join(PLUGIN_DIR, pluginName);
  
  if (!existsSync(srcPath)) {
    if (verbose) console.log(`  ⚠️  No index.ts found for ${pluginName}`);
    return false;
  }

  try {
    const externalsFlags = EXTERNALS.map(e => `--external=${e}`);
    const cmd = $`bun build ${srcPath} --outdir=${outDir} --target=bun --sourcemap=external ${externalsFlags}`.quiet();
    await cmd;
    console.log(`  ✓ ${pluginName}`);
    return true;
  } catch (error) {
    console.log(`  ❌ Failed to build ${pluginName}: ${error}`);
    return false;
  }
}

async function buildAll(verbose: boolean): Promise<void> {
  console.log("🔨 Building TypeScript plugins...\n");

  let success = 0;
  let failed = 0;

  for (const plugin of PLUGINS) {
    const result = await buildPlugin(plugin, verbose);
    if (result) {
      success++;
    } else {
      failed++;
    }
  }

  console.log(`\n✓ Build complete: ${success} succeeded, ${failed} failed`);
}

async function watchMode(verbose: boolean): Promise<void> {
  console.log("👁️  Watching for changes...\n");
  console.log("Press Ctrl+C to stop\n");

  // Initial build
  await buildAll(verbose);

  // Watch for changes
  for (const plugin of PLUGINS) {
    const srcPath = join(PLUGIN_DIR, plugin, "index.ts");
    if (existsSync(srcPath)) {
      console.log(`  Watching: ${plugin}`);
    }
  }

  // Simple watch using fs.watch
  const { watch } = await import("fs");
  
  for (const plugin of PLUGINS) {
    const pluginDir = join(PLUGIN_DIR, plugin);
    if (existsSync(pluginDir)) {
      watch(pluginDir, { recursive: true }, async (event, filename) => {
        if (filename?.endsWith(".ts")) {
          console.log(`\n📝 ${plugin}/${filename} changed, rebuilding...`);
          await buildPlugin(plugin, verbose);
        }
      });
    }
  }

  // Keep process alive
  await new Promise(() => {});
}

async function main(): Promise<void> {
  const args = parseArgs();

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  if (!existsSync(SRC_DIR)) {
    console.error(`❌ Source directory not found: ${SRC_DIR}`);
    console.error("   Run this script from the opencode-mastery project root.");
    process.exit(1);
  }

  if (args.watch) {
    await watchMode(args.verbose);
  } else {
    await buildAll(args.verbose);
  }
}

main().catch(console.error);
