import { z } from "zod";
import type { Plugin, PluginContext } from "@opencode-ai/plugin";
import { isFeatureEnabled } from "../../lib/config";

// Repository analyzer plugin for GitHub repositories
const Plugin$1: Plugin = async (context: PluginContext) => {
  if (!isFeatureEnabled("repoAnalyzer")) {
    return { tool: [] };
  }

  const repoAnalyzeSchema = z.object({
    repo: z.string()
      .describe("GitHub repository in format 'owner/repo' (e.g., 'vercel/next.js')"),
    depth: z.number()
      .min(1)
      .max(100)
      .optional()
      .default(1)
      .describe("Git clone depth (1 = shallow, faster)"),
    focus: z.string()
      .optional()
      .describe("Focus analysis on specific directory (e.g., 'src/', 'packages/core/')"),
    cleanup: z.boolean()
      .optional()
      .default(true)
      .describe("Remove cloned repo after analysis (default: true)"),
  });

  const repoAnalyzeTool = context.tool(
    repoAnalyzeSchema,
    async ({ repo, depth = 1, focus, cleanup = true }) => {
      const tmpDir = process.env.TMPDIR || "/tmp";
      const repoName = repo.split("/")[1] || repo.replace("/", "-");
      const clonePath = `${tmpDir}/${repoName}`;

      try {
        // Check if gh CLI is available
        const ghCheck = await runCommand("which gh");
        if (!ghCheck.success) {
          return {
            success: false,
            error: "GitHub CLI (gh) not found. Install: brew install gh",
          };
        }

        // Clean up existing clone if exists
        await runCommand(`rm -rf "${clonePath}"`);

        // Clone the repository
        const cloneResult = await runCommand(
          `gh repo clone ${repo} "${clonePath}" -- --depth ${depth}`
        );
        
        if (!cloneResult.success) {
          return {
            success: false,
            error: `Failed to clone repository: ${cloneResult.stderr}`,
          };
        }

        // Get repository info
        const repoInfoResult = await runCommand(
          `gh repo view ${repo} --json description,languages,stargazerCount,defaultBranchRef`
        );

        let repoInfo: Record<string, unknown> = {};
        if (repoInfoResult.success) {
          try {
            repoInfo = JSON.parse(repoInfoResult.stdout);
          } catch {
            // Ignore parse errors
          }
        }

        // Get current SHA for permalinks
        const shaResult = await runCommand(
          `cd "${clonePath}" && git rev-parse HEAD`
        );
        const sha = shaResult.success ? shaResult.stdout.trim() : "unknown";

        // Analyze repository structure
        const structure = await analyzeStructure(clonePath, focus);

        // Detect package managers
        const packageManagers = await detectPackageManagers(clonePath);

        // Detect test frameworks
        const testFrameworks = await detectTestFrameworks(clonePath);

        // Find key files
        const keyFiles = await findKeyFiles(clonePath);

        // Build result
        const result = {
          success: true,
          repo,
          clonePath,
          sha,
          permalinkBase: `https://github.com/${repo}/blob/${sha}`,
          info: {
            description: (repoInfo.description as string) || "",
            stars: (repoInfo.stargazerCount as number) || 0,
            defaultBranch: ((repoInfo.defaultBranchRef as Record<string, string>)?.name) || "main",
          },
          languages: ((repoInfo.languages as Array<{ name: string }>)?.map(l => l.name)) || [],
          structure,
          packageManagers,
          testFrameworks,
          keyFiles,
          analysisPath: focus ? `${clonePath}/${focus}` : clonePath,
        };

        // Cleanup if requested
        if (cleanup) {
          await runCommand(`rm -rf "${clonePath}"`);
          return { ...result, clonePath: "(cleaned up)" };
        }

        return result;
      } catch (error) {
        return {
          success: false,
          error: `Analysis failed: ${error instanceof Error ? error.message : String(error)}`,
        };
      }
    }
  ).describe(
    "Clone and analyze a GitHub repository. Returns structure, languages, package managers, test frameworks, and key files. " +
    "The cloned repo is available at /tmp for further analysis with grep/read tools. " +
    "Example: repo-analyze({ repo: 'vercel/next.js', depth: 1 })"
  );

  return { tool: [repoAnalyzeTool] };
};

export default Plugin$1;

// Helper functions
async function runCommand(cmd: string): Promise<{ success: boolean; stdout: string; stderr: string }> {
  try {
    const process = Bun.spawn(cmd, { 
      shell: true,
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

interface StructureInfo {
  directories: Record<string, number>;
  totalFiles: number;
  topLevelFiles: string[];
  focus?: { path: string; files: number; directories: Record<string, number> };
}

async function analyzeStructure(basePath: string, focus?: string): Promise<StructureInfo> {
  const result: StructureInfo = {
    directories: {},
    totalFiles: 0,
    topLevelFiles: [],
  };

  // Count top-level directories and files
  const lsResult = await runCommand(`ls -1 "${basePath}"`);
  if (lsResult.success) {
    const entries = lsResult.stdout.split("\n").filter(Boolean);
    
    for (const entry of entries) {
      const isDir = await runCommand(`test -d "${basePath}/${entry}"`);
      if (isDir.success) {
        // Count files in directory
        const countResult = await runCommand(`find "${basePath}/${entry}" -type f | wc -l`);
        const count = parseInt(countResult.stdout, 10) || 0;
        result.directories[entry] = count;
        result.totalFiles += count;
      } else {
        result.topLevelFiles.push(entry);
      }
    }
  }

  // Analyze focus directory if specified
  if (focus) {
    const focusPath = `${basePath}/${focus}`.replace(/\/+$/, "");
    const focusExists = await runCommand(`test -d "${focusPath}"`);
    
    if (focusExists.success) {
      const focusInfo: StructureInfo["focus"] = {
        path: focus,
        files: 0,
        directories: {},
      };

      const focusLsResult = await runCommand(`ls -1 "${focusPath}"`);
      if (focusLsResult.success) {
        const focusEntries = focusLsResult.stdout.split("\n").filter(Boolean);
        
        for (const entry of focusEntries) {
          const isDir = await runCommand(`test -d "${focusPath}/${entry}"`);
          if (isDir.success) {
            const countResult = await runCommand(`find "${focusPath}/${entry}" -type f | wc -l`);
            const count = parseInt(countResult.stdout, 10) || 0;
            focusInfo.directories[entry] = count;
            focusInfo.files += count;
          } else {
            focusInfo.files += 1;
          }
        }
      }
      
      result.focus = focusInfo;
    }
  }

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
    const result = await runCommand(`test -f "${basePath}/${check.file}"`);
    if (result.success) {
      managers.push(check.name);
    }
  }

  return managers;
}

async function detectTestFrameworks(basePath: string): Promise<string[]> {
  const frameworks: string[] = [];

  // Check package.json for test frameworks
  const pkgResult = await runCommand(`cat "${basePath}/package.json" 2>/dev/null`);
  if (pkgResult.success) {
    const pkgContent = pkgResult.stdout.toLowerCase();
    
    if (pkgContent.includes("vitest")) frameworks.push("vitest");
    if (pkgContent.includes("jest")) frameworks.push("jest");
    if (pkgContent.includes("mocha")) frameworks.push("mocha");
    if (pkgContent.includes("playwright")) frameworks.push("playwright");
    if (pkgContent.includes("cypress")) frameworks.push("cypress");
  }

  // Check for other test files
  const checks = [
    { file: "pytest.ini", name: "pytest" },
    { file: "setup.cfg", pattern: "pytest", name: "pytest" },
    { file: "Cargo.toml", pattern: "test", name: "cargo test" },
    { file: "go.mod", pattern: "test", name: "go test" },
  ];

  for (const check of checks) {
    const result = await runCommand(`test -f "${basePath}/${check.file}"`);
    if (result.success && !check.pattern) {
      frameworks.push(check.name);
    } else if (result.success && check.pattern) {
      const content = await runCommand(`cat "${basePath}/${check.file}"`);
      if (content.success && content.stdout.toLowerCase().includes(check.pattern)) {
        frameworks.push(check.name);
      }
    }
  }

  return [...new Set(frameworks)]; // Remove duplicates
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
    const result = await runCommand(`test -f "${basePath}/${file}"`);
    if (result.success) {
      found.push(file);
    }
  }

  return found;
}
