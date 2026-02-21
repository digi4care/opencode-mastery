import { constants as fsConstants, type Stats } from "node:fs";
import { access, mkdtemp, readdir, readFile, rm, stat } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import type { Plugin, PluginContext } from "@opencode-ai/plugin";
import { z } from "zod";

import { isFeatureEnabled } from "../../lib/config";

export const REPO_ANALYZE_TOOL_NAME = "repo-analyze";

const REPO_PATTERN = /^[A-Za-z0-9_.-]+\/[A-Za-z0-9_.-]+$/;

const repoAnalyzeSchema = z.object({
  repo: z
    .string()
    .regex(
      REPO_PATTERN,
      "Repository must match owner/repo with only letters, numbers, underscore, dot, or dash"
    )
    .describe("GitHub repository in format 'owner/repo' (e.g., 'vercel/next.js')"),
  depth: z
    .number()
    .min(1)
    .max(100)
    .optional()
    .default(1)
    .describe("Git clone depth (1 = shallow, faster)"),
  focus: z
    .string()
    .optional()
    .refine(
      (value) => !value || normalizeFocusPath(value) !== null,
      "Focus path must be a safe relative path"
    )
    .describe("Focus analysis on specific directory (e.g., 'src/', 'packages/core/')"),
  cleanup: z
    .boolean()
    .optional()
    .default(true)
    .describe("Remove cloned repo after analysis (default: true)"),
});

// Repository analyzer plugin for GitHub repositories
const Plugin$1: Plugin = async (context: PluginContext) => {
  if (!isFeatureEnabled("repoAnalyzer")) {
    return { tool: [] };
  }

  const repoAnalyzeTool = context
    .tool(repoAnalyzeSchema, async ({ repo, depth = 1, focus, cleanup = true }) => {
      const safeRepo = repo.trim();
      const safeFocus = focus ? normalizeFocusPath(focus) : null;

      if (!REPO_PATTERN.test(safeRepo)) {
        return {
          success: false,
          error:
            "Invalid repository format. Expected owner/repo with only letters, numbers, underscore, dot, or dash.",
        };
      }

      if (focus && !safeFocus) {
        return {
          success: false,
          error: "Invalid focus path. Use a safe relative path without traversal.",
        };
      }

      const ghCheck = await runCommand("gh", ["--version"]);
      if (!ghCheck.success) {
        return {
          success: false,
          error: "GitHub CLI (gh) not found. Install: brew install gh",
        };
      }

      const cloneBase = await mkdtemp(path.join(tmpdir(), "repo-analyze-"));
      const repoName = safeRepo.split("/")[1] || "repo";
      const clonePath = path.join(cloneBase, repoName);

      try {
        const cloneResult = await runCommand("gh", [
          "repo",
          "clone",
          safeRepo,
          clonePath,
          "--",
          "--depth",
          String(depth),
        ]);

        if (!cloneResult.success) {
          return {
            success: false,
            error: `Failed to clone repository: ${cloneResult.stderr}`,
          };
        }

        const repoInfoResult = await runCommand("gh", [
          "repo",
          "view",
          safeRepo,
          "--json",
          "description,languages,stargazerCount,defaultBranchRef",
        ]);

        let repoInfo: Record<string, unknown> = {};
        if (repoInfoResult.success) {
          try {
            repoInfo = JSON.parse(repoInfoResult.stdout);
          } catch {
            // Ignore parse errors
          }
        }

        const shaResult = await runCommand("git", ["rev-parse", "HEAD"], {
          cwd: clonePath,
        });
        const sha = shaResult.success ? shaResult.stdout.trim() : "unknown";

        const structure = await analyzeStructure(clonePath, safeFocus || undefined);
        const packageManagers = await detectPackageManagers(clonePath);
        const testFrameworks = await detectTestFrameworks(clonePath);
        const keyFiles = await findKeyFiles(clonePath);

        const result = {
          success: true,
          repo: safeRepo,
          clonePath,
          sha,
          permalinkBase: `https://github.com/${safeRepo}/blob/${sha}`,
          info: {
            description: (repoInfo.description as string) || "",
            stars: (repoInfo.stargazerCount as number) || 0,
            defaultBranch:
              ((repoInfo.defaultBranchRef as Record<string, string>)?.name) || "main",
          },
          languages: ((repoInfo.languages as Array<{ name: string }>)?.map((l) => l.name)) || [],
          structure,
          packageManagers,
          testFrameworks,
          keyFiles,
          analysisPath: safeFocus ? path.join(clonePath, safeFocus) : clonePath,
        };

        if (cleanup) {
          await safeRemove(cloneBase);
          return { ...result, clonePath: "(cleaned up)" };
        }

        return result;
      } catch (error) {
        if (cleanup) {
          await safeRemove(cloneBase);
        }

        return {
          success: false,
          error: `Analysis failed: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
    })
    .describe(
      "Clone and analyze a GitHub repository. Returns structure, languages, package managers, test frameworks, and key files. " +
        "The cloned repo is available in a temp directory for further analysis with grep/read tools. " +
        "Example: repo-analyze({ repo: 'vercel/next.js', depth: 1 })"
    );

  return { tool: [repoAnalyzeTool] };
};

export default Plugin$1;

interface CommandResult {
  success: boolean;
  stdout: string;
  stderr: string;
}

interface StructureInfo {
  directories: Record<string, number>;
  totalFiles: number;
  topLevelFiles: string[];
  focus?: { path: string; files: number; directories: Record<string, number> };
}

async function runCommand(
  command: string,
  args: string[],
  options?: { cwd?: string }
): Promise<CommandResult> {
  try {
    const process = Bun.spawn([command, ...args], {
      cwd: options?.cwd,
      shell: false,
      stdout: "pipe",
      stderr: "pipe",
    });

    const stdout = await new Response(process.stdout).text();
    const stderr = await new Response(process.stderr).text();
    const exitCode = await process.exited;

    return {
      success: exitCode === 0,
      stdout: stdout.trim(),
      stderr: stderr.trim(),
    };
  } catch (error) {
    return {
      success: false,
      stdout: "",
      stderr: error instanceof Error ? error.message : String(error),
    };
  }
}

async function pathExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath, fsConstants.F_OK);
    return true;
  } catch {
    return false;
  }
}

async function safeRemove(filePath: string): Promise<void> {
  try {
    await rm(filePath, { recursive: true, force: true });
  } catch {
    // Ignore cleanup errors
  }
}

function normalizeFocusPath(input: string): string | null {
  const trimmed = input.trim();
  if (!trimmed || trimmed.includes("\0")) {
    return null;
  }

  const normalized = path.posix.normalize(trimmed.replaceAll("\\", "/"));
  const cleaned = normalized.replace(/^\.\//, "").replace(/\/+$/, "");

  if (!cleaned || cleaned === "." || cleaned === "..") {
    return null;
  }

  if (cleaned.startsWith("/") || cleaned.startsWith("../") || cleaned.includes("/../")) {
    return null;
  }

  return cleaned;
}

function isPathInside(rootPath: string, targetPath: string): boolean {
  const relative = path.relative(rootPath, targetPath);
  return relative === "" || (!relative.startsWith("..") && !path.isAbsolute(relative));
}

async function countFilesRecursive(dirPath: string): Promise<number> {
  let total = 0;

  const entries = await readdir(dirPath, { withFileTypes: true });
  for (const entry of entries) {
    const entryPath = path.join(dirPath, entry.name);
    if (entry.isDirectory()) {
      total += await countFilesRecursive(entryPath);
    } else if (entry.isFile()) {
      total += 1;
    }
  }

  return total;
}

async function analyzeStructure(basePath: string, focus?: string): Promise<StructureInfo> {
  const result: StructureInfo = {
    directories: {},
    totalFiles: 0,
    topLevelFiles: [],
  };

  let entries: Awaited<ReturnType<typeof readdir>> = [];
  try {
    entries = await readdir(basePath, { withFileTypes: true });
  } catch {
    return result;
  }

  for (const entry of entries) {
    const entryPath = path.join(basePath, entry.name);
    if (entry.isDirectory()) {
      const count = await countFilesRecursive(entryPath);
      result.directories[entry.name] = count;
      result.totalFiles += count;
    } else {
      result.topLevelFiles.push(entry.name);
      if (entry.isFile()) {
        result.totalFiles += 1;
      }
    }
  }

  if (!focus) {
    return result;
  }

  const focusPath = path.resolve(basePath, focus);
  if (!isPathInside(basePath, focusPath)) {
    return result;
  }

  let focusStat: Stats;
  try {
    focusStat = await stat(focusPath);
  } catch {
    return result;
  }

  if (!focusStat.isDirectory()) {
    return result;
  }

  const focusInfo: StructureInfo["focus"] = {
    path: focus,
    files: 0,
    directories: {},
  };

  const focusEntries = await readdir(focusPath, { withFileTypes: true });
  for (const entry of focusEntries) {
    const entryPath = path.join(focusPath, entry.name);
    if (entry.isDirectory()) {
      const count = await countFilesRecursive(entryPath);
      focusInfo.directories[entry.name] = count;
      focusInfo.files += count;
    } else if (entry.isFile()) {
      focusInfo.files += 1;
    }
  }

  result.focus = focusInfo;
  return result;
}

async function detectPackageManagers(basePath: string): Promise<string[]> {
  const managers: string[] = [];

  const checks = [
    { file: "bun.lockb", name: "bun" },
    { file: "pnpm-lock.yaml", name: "pnpm" },
    { file: "yarn.lock", name: "yarn" },
    { file: "package-lock.json", name: "npm" },
    { file: "Cargo.lock", name: "cargo" },
    { file: "go.mod", name: "go" },
    { file: "uv.lock", name: "uv" },
    { file: "poetry.lock", name: "poetry" },
    { file: "requirements.txt", name: "pip" },
    { file: "Gemfile.lock", name: "bundler" },
    { file: "composer.lock", name: "composer" },
  ];

  for (const check of checks) {
    if (await pathExists(path.join(basePath, check.file))) {
      managers.push(check.name);
    }
  }

  return managers;
}

async function detectTestFrameworks(basePath: string): Promise<string[]> {
  const frameworks: string[] = [];
  const packageJsonPath = path.join(basePath, "package.json");

  if (await pathExists(packageJsonPath)) {
    try {
      const pkgContent = (await readFile(packageJsonPath, "utf8")).toLowerCase();

      if (pkgContent.includes("vitest")) frameworks.push("vitest");
      if (pkgContent.includes("jest")) frameworks.push("jest");
      if (pkgContent.includes("mocha")) frameworks.push("mocha");
      if (pkgContent.includes("playwright")) frameworks.push("playwright");
      if (pkgContent.includes("cypress")) frameworks.push("cypress");
    } catch {
      // Ignore unreadable package.json
    }
  }

  const checks = [
    { file: "pytest.ini", name: "pytest" },
    { file: "setup.cfg", pattern: "pytest", name: "pytest" },
    { file: "Cargo.toml", pattern: "test", name: "cargo test" },
    { file: "go.mod", pattern: "test", name: "go test" },
  ];

  for (const check of checks) {
    const filePath = path.join(basePath, check.file);
    if (!(await pathExists(filePath))) {
      continue;
    }

    if (!check.pattern) {
      frameworks.push(check.name);
      continue;
    }

    try {
      const content = (await readFile(filePath, "utf8")).toLowerCase();
      if (content.includes(check.pattern)) {
        frameworks.push(check.name);
      }
    } catch {
      // Ignore unreadable file
    }
  }

  return [...new Set(frameworks)];
}

async function findKeyFiles(basePath: string): Promise<string[]> {
  const keyFiles = [
    "README.md",
    "README.rst",
    "CONTRIBUTING.md",
    "CHANGELOG.md",
    "package.json",
    "Cargo.toml",
    "go.mod",
    "pyproject.toml",
    "setup.py",
    "tsconfig.json",
    "turbo.json",
    "nx.json",
    "Makefile",
    "Dockerfile",
    "docker-compose.yml",
    ".github/CONTRIBUTING.md",
    ".github/PULL_REQUEST_TEMPLATE.md",
  ];

  const found: string[] = [];

  for (const file of keyFiles) {
    if (await pathExists(path.join(basePath, file))) {
      found.push(file);
    }
  }

  return found;
}
