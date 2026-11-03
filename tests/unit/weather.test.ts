import { afterEach, describe, expect, it, vi } from "vitest";
import {
  CONDITIONS,
  clearObservationCache,
  fallbackNight,
  getObservation,
  isNight,
  mapCondition,
  observationFromCityPage,
} from "@/lib/weather";
import { DEFAULT_STATION, STATIONS } from "@/lib/stations";

// HERO-4, HERO-10: Environment Canada wording to the eight scene conditions.
describe("mapCondition", () => {
  it.each([
    ["Sunny", "clear"],
    ["Clear", "clear"],
    ["Mainly Sunny", "partly cloudy"],
    ["Partly Cloudy", "partly cloudy"],
    ["A few clouds", "partly cloudy"],
    ["Mostly Cloudy", "overcast"],
    ["Cloudy", "overcast"],
    ["Light Rain", "rain"],
    ["Rain Showers", "rain"],
    ["Drizzle", "rain"],
    ["Freezing Rain", "rain"],
    ["Light Snow", "snow"],
    ["Flurries", "snow"],
    ["Blowing Snow", "snow"],
    ["Ice Pellets", "snow"],
    ["Fog", "fog"],
    ["Mist", "fog"],
    ["Haze", "fog"],
    ["Smoke", "fog"],
    ["Thunderstorm with light rain", "thunderstorm"],
  ])("%s -> %s", (text, expected) => {
    expect(mapCondition(text)).toBe(expected);
  });

  it("falls back to the icon code when the text is empty", () => {
    expect(mapCondition("", 16)).toBe("snow");
    expect(mapCondition(undefined, 24)).toBe("fog");
    expect(mapCondition(null, 43)).toBe("windy");
    expect(mapCondition(null, 999)).toBe("clear");
  });

  it("turns a fair sky windy on strong wind", () => {
    expect(mapCondition("Sunny", 0, { gustKmh: 45 })).toBe("windy");
    expect(mapCondition("Partly Cloudy", 2, { speedKmh: 30 })).toBe("windy");
    expect(mapCondition("Sunny", 0, { speedKmh: 10, gustKmh: 20 })).toBe("clear");
    expect(mapCondition("Rain", 12, { gustKmh: 60 })).toBe("rain");
  });

  it("only ever returns a known condition", () => {
    for (const text of ["", "Something new", "Light Freezing Drizzle and Fog", "Snow Grains"]) {
      expect(CONDITIONS).toContain(mapCondition(text));
    }
  });
});

describe("isNight", () => {
  const sunrise = "2026-11-03T12:22:00Z";
  const sunset = "2026-11-03T22:20:00Z";
  it("is day between sunrise and sunset at the station", () => {
    expect(isNight(new Date("2026-11-03T15:00:00Z"), sunrise, sunset)).toBe(false);
    expect(isNight(new Date("2026-11-03T12:00:00Z"), sunrise, sunset)).toBe(true);
    expect(isNight(new Date("2026-11-03T23:00:00Z"), sunrise, sunset)).toBe(true);
  });
  it("falls back to 7:00 to 18:00 at home without rise and set times", () => {
    expect(isNight(new Date("2026-07-01T16:00:00Z"))).toBe(false); // noon in Sault Ste. Marie
    expect(isNight(new Date("2026-07-01T04:00:00Z"))).toBe(true); // midnight
    expect(fallbackNight(new Date("2026-01-01T22:30:00Z"))).toBe(false); // 17:30
    expect(fallbackNight(new Date("2026-01-01T23:30:00Z"))).toBe(true); // 18:30
  });
});

describe("observationFromCityPage", () => {
  const page = {
    properties: {
      name: { en: "Sault Ste. Marie" },
      currentConditions: {
        condition: { en: "Light Rain" },
        iconCode: { value: 12 },
        timestamp: { en: "2026-11-03T20:00:00Z" },
        wind: { speed: { value: { en: 11 } }, gust: { value: { en: 32 } } },
      },
      riseSet: { sunrise: { en: "2026-11-03T12:22:00Z" }, sunset: { en: "2026-11-03T22:20:00Z" } },
    },
  };
  it("reads the condition, the station name and day or night", () => {
    const obs = observationFromCityPage(page, new Date("2026-11-03T20:05:00Z"));
    expect(obs).toEqual({ condition: "rain", night: false, observedAt: "2026-11-03T20:00:00Z", stationName: "Sault Ste. Marie" });
  });
  it("survives an empty page", () => {
    const obs = observationFromCityPage({}, new Date("2026-07-01T16:00:00Z"));
    expect(obs.condition).toBe("clear");
    expect(obs.night).toBe(false);
  });
});

describe("getObservation", () => {
  afterEach(() => clearObservationCache());

  it("caches each station for ten minutes so a burst costs one upstream call (HERO-6)", async () => {
    const fetchImpl = vi.fn(async () => new Response(JSON.stringify({ properties: { currentConditions: { condition: { en: "Sunny" } } } }), { status: 200 }));
    const t0 = new Date("2026-07-01T16:00:00Z");
    await getObservation(DEFAULT_STATION, t0, fetchImpl as unknown as typeof fetch);
    await getObservation(DEFAULT_STATION, new Date(t0.getTime() + 5 * 60_000), fetchImpl as unknown as typeof fetch);
    expect(fetchImpl).toHaveBeenCalledTimes(1);
    await getObservation(STATIONS[1], t0, fetchImpl as unknown as typeof fetch);
    expect(fetchImpl).toHaveBeenCalledTimes(2);
    await getObservation(DEFAULT_STATION, new Date(t0.getTime() + 11 * 60_000), fetchImpl as unknown as typeof fetch);
    expect(fetchImpl).toHaveBeenCalledTimes(3);
  });

  it("throws on an upstream error so the route can fall back", async () => {
    const fetchImpl = vi.fn(async () => new Response("nope", { status: 503 }));
    await expect(getObservation(DEFAULT_STATION, new Date(), fetchImpl as unknown as typeof fetch)).rejects.toThrow(/503/);
  });
});
