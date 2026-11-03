import { describe, expect, it } from "vitest";
import { DEFAULT_STATION, inAlgoma, nearestStation, stationFromHeaders } from "@/lib/stations";

// HERO-5, HERO-10: in-region and nearest-station checks.
const places = {
  saultSteMarie: [46.52, -84.33],
  wawa: [47.99, -84.77],
  elliotLake: [46.38, -82.66],
  sudbury: [46.49, -80.99],
  toronto: [43.65, -79.38],
} as const;

describe("inAlgoma", () => {
  it("knows the district", () => {
    expect(inAlgoma(...places.saultSteMarie)).toBe(true);
    expect(inAlgoma(...places.wawa)).toBe(true);
    expect(inAlgoma(...places.elliotLake)).toBe(true);
    expect(inAlgoma(...places.sudbury)).toBe(false);
    expect(inAlgoma(...places.toronto)).toBe(false);
    expect(inAlgoma(Number.NaN, Number.NaN)).toBe(false);
  });
});

describe("nearestStation", () => {
  it("picks the nearest city page inside the district", () => {
    expect(nearestStation(...places.saultSteMarie).id).toBe("on-162");
    expect(nearestStation(...places.wawa).id).toBe("on-138");
    expect(nearestStation(...places.elliotLake).id).toBe("on-170");
  });
  it("sends everyone else to Sault Ste. Marie", () => {
    expect(nearestStation(...places.sudbury)).toBe(DEFAULT_STATION);
    expect(nearestStation(...places.toronto)).toBe(DEFAULT_STATION);
  });
});

describe("stationFromHeaders", () => {
  it("reads Vercel's geolocation headers", () => {
    const h = new Headers({ "x-vercel-ip-latitude": "47.99", "x-vercel-ip-longitude": "-84.77" });
    expect(stationFromHeaders(h).name).toBe("Wawa");
  });
  it("defaults without headers or with junk", () => {
    expect(stationFromHeaders(new Headers()).id).toBe("on-162");
    expect(stationFromHeaders(new Headers({ "x-vercel-ip-latitude": "x" })).id).toBe("on-162");
  });
});
