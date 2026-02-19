/**
 * Tests for model-resolver.ts - Full 5-level pipeline
 */

import { describe, it, expect } from "bun:test";
import {
  resolveModel,
  resolveModelWithSource,
  withCliModel,
  withFrontmatterModel,
  withUserModel,
  withInheritedModel,
  buildOptions,
} from "./model-resolver";

// System default used across tests
const SYSTEM_DEFAULT = "zai-coding-plan/glm-5";

describe("resolveModel - Priority Pipeline", () => {
  describe("Level 5: System Default (fallback)", () => {
    it("returns system default when no other model provided", () => {
      expect(resolveModel({ systemDefault: SYSTEM_DEFAULT })).toBe(
        SYSTEM_DEFAULT,
      );
    });

    it("returns system default when all other models are empty", () => {
      expect(
        resolveModel({
          cliModel: "",
          frontmatterModel: "",
          userModel: "",
          inheritedModel: "",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe(SYSTEM_DEFAULT);
    });
  });

  describe("Level 4: Inherited Model", () => {
    it("returns inherited model when provided", () => {
      expect(
        resolveModel({
          inheritedModel: "google/gemini-pro",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("google/gemini-pro");
    });

    it("falls back to system default when inherited is empty", () => {
      expect(
        resolveModel({
          inheritedModel: "",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe(SYSTEM_DEFAULT);
    });
  });

  describe("Level 3: User Model (JSON config)", () => {
    it("returns user model when provided", () => {
      expect(
        resolveModel({
          userModel: "openai/gpt-4",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("openai/gpt-4");
    });

    it("user model overrides inherited model", () => {
      expect(
        resolveModel({
          userModel: "openai/gpt-4",
          inheritedModel: "google/gemini-pro",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("openai/gpt-4");
    });

    it("falls back to inherited when user model is empty", () => {
      expect(
        resolveModel({
          userModel: "",
          inheritedModel: "google/gemini-pro",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("google/gemini-pro");
    });
  });

  describe("Level 2: Frontmatter Model", () => {
    it("returns frontmatter model when provided", () => {
      expect(
        resolveModel({
          frontmatterModel: "anthropic/claude-sonnet-4",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-sonnet-4");
    });

    it("frontmatter overrides user model", () => {
      expect(
        resolveModel({
          frontmatterModel: "anthropic/claude-sonnet-4",
          userModel: "openai/gpt-4",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-sonnet-4");
    });

    it("frontmatter overrides inherited model", () => {
      expect(
        resolveModel({
          frontmatterModel: "anthropic/claude-sonnet-4",
          inheritedModel: "google/gemini-pro",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-sonnet-4");
    });

    it("falls back to user model when frontmatter is empty", () => {
      expect(
        resolveModel({
          frontmatterModel: "",
          userModel: "openai/gpt-4",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("openai/gpt-4");
    });
  });

  describe("Level 1: CLI Model (highest priority)", () => {
    it("returns CLI model when provided", () => {
      expect(
        resolveModel({
          cliModel: "anthropic/claude-opus-4",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-opus-4");
    });

    it("CLI overrides all other models", () => {
      expect(
        resolveModel({
          cliModel: "anthropic/claude-opus-4",
          frontmatterModel: "anthropic/claude-sonnet-4",
          userModel: "openai/gpt-4",
          inheritedModel: "google/gemini-pro",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-opus-4");
    });

    it("falls back to frontmatter when CLI is empty", () => {
      expect(
        resolveModel({
          cliModel: "",
          frontmatterModel: "anthropic/claude-sonnet-4",
          userModel: "openai/gpt-4",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-sonnet-4");
    });
  });

  describe("Whitespace handling", () => {
    it("trims whitespace from all model values", () => {
      expect(
        resolveModel({
          userModel: "  openai/gpt-4  ",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("openai/gpt-4");
    });

    it("treats whitespace-only as undefined", () => {
      expect(
        resolveModel({
          userModel: "   ",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe(SYSTEM_DEFAULT);
    });
  });

  describe("Different model formats", () => {
    it("handles OpenAI format", () => {
      expect(
        resolveModel({
          userModel: "openai/gpt-4o",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("openai/gpt-4o");
    });

    it("handles Anthropic format", () => {
      expect(
        resolveModel({
          userModel: "anthropic/claude-3-opus",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("anthropic/claude-3-opus");
    });

    it("handles Ollama/local format", () => {
      expect(
        resolveModel({
          userModel: "ollama/llama3",
          systemDefault: SYSTEM_DEFAULT,
        }),
      ).toBe("ollama/llama3");
    });
  });
});

describe("resolveModelWithSource", () => {
  it("returns 'cli' source when CLI model provided", () => {
    const result = resolveModelWithSource({
      cliModel: "anthropic/claude-opus-4",
      userModel: "openai/gpt-4",
      systemDefault: SYSTEM_DEFAULT,
    });

    expect(result.model).toBe("anthropic/claude-opus-4");
    expect(result.source).toBe("cli");
  });

  it("returns 'frontmatter' source when frontmatter model provided", () => {
    const result = resolveModelWithSource({
      frontmatterModel: "anthropic/claude-sonnet-4",
      userModel: "openai/gpt-4",
      systemDefault: SYSTEM_DEFAULT,
    });

    expect(result.model).toBe("anthropic/claude-sonnet-4");
    expect(result.source).toBe("frontmatter");
  });

  it("returns 'user-override' source when user model provided", () => {
    const result = resolveModelWithSource({
      userModel: "openai/gpt-4",
      systemDefault: SYSTEM_DEFAULT,
    });

    expect(result.model).toBe("openai/gpt-4");
    expect(result.source).toBe("user-override");
  });

  it("returns 'inherited' source when inherited model provided", () => {
    const result = resolveModelWithSource({
      inheritedModel: "google/gemini-pro",
      systemDefault: SYSTEM_DEFAULT,
    });

    expect(result.model).toBe("google/gemini-pro");
    expect(result.source).toBe("inherited");
  });

  it("returns 'system-default' source when no override provided", () => {
    const result = resolveModelWithSource({
      systemDefault: SYSTEM_DEFAULT,
    });

    expect(result.model).toBe(SYSTEM_DEFAULT);
    expect(result.source).toBe("system-default");
  });
});

describe("Helper functions", () => {
  describe("withCliModel", () => {
    it("returns object with cliModel when value provided", () => {
      expect(withCliModel("openai/gpt-4")).toEqual({ cliModel: "openai/gpt-4" });
    });

    it("returns empty object when undefined", () => {
      expect(withCliModel(undefined)).toEqual({});
    });
  });

  describe("withFrontmatterModel", () => {
    it("returns object with frontmatterModel when value provided", () => {
      expect(withFrontmatterModel("openai/gpt-4")).toEqual({
        frontmatterModel: "openai/gpt-4",
      });
    });

    it("returns empty object when undefined", () => {
      expect(withFrontmatterModel(undefined)).toEqual({});
    });
  });

  describe("withUserModel", () => {
    it("returns object with userModel when value provided", () => {
      expect(withUserModel("openai/gpt-4")).toEqual({ userModel: "openai/gpt-4" });
    });

    it("returns empty object when undefined", () => {
      expect(withUserModel(undefined)).toEqual({});
    });
  });

  describe("withInheritedModel", () => {
    it("returns object with inheritedModel when value provided", () => {
      expect(withInheritedModel("openai/gpt-4")).toEqual({
        inheritedModel: "openai/gpt-4",
      });
    });

    it("returns empty object when undefined", () => {
      expect(withInheritedModel(undefined)).toEqual({});
    });
  });
});

describe("buildOptions", () => {
  it("builds complete options from partials", () => {
    const options = buildOptions(
      { cliModel: "anthropic/claude-opus-4" },
      { userModel: "openai/gpt-4" },
      { systemDefault: SYSTEM_DEFAULT },
    );

    expect(options).toEqual({
      cliModel: "anthropic/claude-opus-4",
      userModel: "openai/gpt-4",
      systemDefault: SYSTEM_DEFAULT,
    });
  });

  it("works with helper functions", () => {
    const options = buildOptions(
      withCliModel("anthropic/claude-opus-4"),
      withUserModel("openai/gpt-4"),
      { systemDefault: SYSTEM_DEFAULT },
    );

    expect(options.cliModel).toBe("anthropic/claude-opus-4");
    expect(options.userModel).toBe("openai/gpt-4");
    expect(options.systemDefault).toBe(SYSTEM_DEFAULT);
  });

  it("throws when systemDefault is missing", () => {
    expect(() => buildOptions({ userModel: "openai/gpt-4" })).toThrow(
      "systemDefault is required",
    );
  });

  it("merges overlapping partials (last wins)", () => {
    const options = buildOptions(
      { userModel: "openai/gpt-3.5-turbo" },
      { userModel: "openai/gpt-4" },
      { systemDefault: SYSTEM_DEFAULT },
    );

    expect(options.userModel).toBe("openai/gpt-4");
  });
});
