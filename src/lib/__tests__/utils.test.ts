import { describe, it, expect } from "vitest";
import { cn } from "../utils";

describe("cn (className merger)", () => {
  it("merges multiple class names", () => {
    expect(cn("px-4", "py-2")).toBe("px-4 py-2");
  });

  it("deduplicates conflicting tailwind classes (last wins)", () => {
    expect(cn("px-4", "px-6")).toBe("px-6");
  });

  it("handles conditional classes", () => {
    expect(cn("base", false && "hidden", "extra")).toBe("base extra");
  });

  it("handles undefined and null inputs", () => {
    expect(cn("base", undefined, null, "extra")).toBe("base extra");
  });

  it("handles empty string", () => {
    expect(cn("", "px-4")).toBe("px-4");
  });

  it("returns empty string for no inputs", () => {
    expect(cn()).toBe("");
  });

  it("merges complex tailwind conflicts correctly", () => {
    expect(cn("text-red-500", "text-blue-500")).toBe("text-blue-500");
  });
});
