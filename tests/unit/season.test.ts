import { describe, expect, it } from "vitest";
import { seasonFor } from "@/lib/season";

// HERO-3, HERO-10: the season at each boundary, read in Sault Ste. Marie's time zone.
const at = (iso: string) => new Date(iso);

describe("seasonFor", () => {
  it("turns at the Algoma Live boundaries", () => {
    expect(seasonFor(at("2026-03-20T12:00:00-04:00"))).toBe("winter");
    expect(seasonFor(at("2026-03-21T12:00:00-04:00"))).toBe("spring");
    expect(seasonFor(at("2026-06-20T12:00:00-04:00"))).toBe("spring");
    expect(seasonFor(at("2026-06-21T12:00:00-04:00"))).toBe("summer");
    expect(seasonFor(at("2026-09-21T12:00:00-04:00"))).toBe("summer");
    expect(seasonFor(at("2026-09-22T12:00:00-04:00"))).toBe("autumn");
    expect(seasonFor(at("2026-12-20T12:00:00-05:00"))).toBe("autumn");
    expect(seasonFor(at("2026-12-21T12:00:00-05:00"))).toBe("winter");
    expect(seasonFor(at("2027-01-15T12:00:00-05:00"))).toBe("winter");
  });

  it("uses the home time zone, not UTC", () => {
    // 03:00 UTC on Mar 21 is still 23:00 on Mar 20 in Sault Ste. Marie.
    expect(seasonFor(at("2026-03-21T03:00:00Z"))).toBe("winter");
    expect(seasonFor(at("2026-03-21T05:00:00Z"))).toBe("spring");
  });
});
