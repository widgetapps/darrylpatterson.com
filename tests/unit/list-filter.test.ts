import { describe, expect, it } from "vitest";
import { list, LIST_TYPES } from "@/lib/content";
import { FILTERS, filterList, filterQuery, parseFilter } from "@/lib/list-filter";

// SITE-5, QA-1: the list filter logic.
describe("list filter", () => {
  it("parses the URL value and ignores junk", () => {
    expect(parseFilter("agency")).toBe("agency");
    expect(parseFilter("gov")).toBe("gov");
    expect(parseFilter("nope")).toBe("all");
    expect(parseFilter(null)).toBe("all");
  });
  it("has one chip per type plus All", () => {
    expect(FILTERS.map((f) => f.id)).toEqual(["all", ...Object.keys(LIST_TYPES)]);
  });
  it("filters the real list and the types add up to 148", () => {
    expect(filterList(list, "all")).toHaveLength(148);
    const total = (Object.keys(LIST_TYPES) as (keyof typeof LIST_TYPES)[]).reduce(
      (n, t) => n + filterList(list, t).length,
      0,
    );
    expect(total).toBe(148);
    expect(filterList(list, "agency").every((r) => r.type === "agency")).toBe(true);
  });
  it("writes a clean query", () => {
    expect(filterQuery("all")).toBe("");
    expect(filterQuery("brand")).toBe("?type=brand");
  });
});
