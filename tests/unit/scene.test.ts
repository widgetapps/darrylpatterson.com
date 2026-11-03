import { describe, expect, it } from "vitest";
import { sceneFor } from "@/lib/scene";
import { SEASONS } from "@/lib/season";
import { CONDITIONS } from "@/lib/weather";

// HERO-2, DSN-10: every scene resolves to token references only.
describe("sceneFor", () => {
  it("uses token references, never raw colours", () => {
    for (const season of SEASONS) {
      for (const condition of CONDITIONS) {
        for (const night of [false, true]) {
          const s = sceneFor({ season, condition, night });
          for (const value of [s.skyTop, s.skyBottom, s.water, s.ground, s.leaf, s.cloud]) {
            expect(value).toMatch(/^var\(--dp-[a-z0-9-]+\)$/);
          }
        }
      }
    }
  });
  it("draws the right layers", () => {
    expect(sceneFor({ season: "winter", condition: "snow", night: true })).toMatchObject({
      winter: true,
      leaves: false,
      snow: true,
      moon: false,
      sun: false,
      water: "var(--dp-water-ice)",
    });
    expect(sceneFor({ season: "summer", condition: "clear", night: false })).toMatchObject({ sun: true, clouds: false, leaf: "var(--dp-leaf-summer)" });
    expect(sceneFor({ season: "autumn", condition: "thunderstorm", night: false })).toMatchObject({ storm: true, rain: true, heavyClouds: true });
    expect(sceneFor({ season: "spring", condition: "fog", night: false })).toMatchObject({ fog: true, sun: false });
    expect(sceneFor({ season: "spring", condition: "windy", night: true })).toMatchObject({ windy: true, moon: true, clouds: true });
  });
});
