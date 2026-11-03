import { describe, expect, it } from "vitest";
import { redirects, resolveRedirect } from "@/lib/redirects";

// SITE-6, QA-1: the redirect map.
describe("redirects", () => {
  it("covers the old URLs", () => {
    expect(resolveRedirect("/thework")).toBe("/about#work");
    expect(resolveRedirect("/thework/")).toBe("/about#work");
    expect(resolveRedirect("/thework/onehome")).toBe("/about#work");
    expect(resolveRedirect("/thelist")).toBe("/about#work");
    expect(resolveRedirect("/license")).toBe("/about#license");
  });
  it("leaves the new routes alone", () => {
    for (const path of ["/", "/ai", "/about", "/contact", "/thework/a/b"]) {
      expect(resolveRedirect(path)).toBeUndefined();
    }
  });
  it("only points at pages that exist", () => {
    for (const r of redirects) {
      expect(r.destination.replace(/#.*$/, "")).toMatch(/^\/(ai|about|contact)?$/);
    }
  });
});
