/**
 * Current conditions from Environment and Climate Change Canada's MSC GeoMet
 * API (HERO-4), mapped to the eight conditions the hero scene can draw. Day
 * or night comes from the station's sunrise and sunset, never the visitor's
 * clock. Each station's answer is cached for ten minutes (HERO-6).
 */
import { HOME_TIME_ZONE } from "./season";
import { DEFAULT_STATION, type Station } from "./stations";

export const CONDITIONS = [
  "clear",
  "partly cloudy",
  "overcast",
  "fog",
  "rain",
  "snow",
  "thunderstorm",
  "windy",
] as const;
export type Condition = (typeof CONDITIONS)[number];

export function isCondition(value: unknown): value is Condition {
  return typeof value === "string" && (CONDITIONS as readonly string[]).includes(value);
}

export type Observation = {
  condition: Condition;
  night: boolean;
  observedAt?: string;
  stationName?: string;
};

const WINDY_GUST_KMH = 40;
const WINDY_SPEED_KMH = 30;

/** Environment Canada icon codes that pin a condition when the text is unhelpful. */
const ICON_CONDITIONS: Record<number, Condition> = {
  0: "clear",
  1: "partly cloudy",
  2: "partly cloudy",
  3: "overcast",
  6: "rain",
  7: "snow",
  8: "snow",
  9: "thunderstorm",
  10: "overcast",
  11: "rain",
  12: "rain",
  13: "rain",
  14: "rain",
  15: "snow",
  16: "snow",
  17: "snow",
  18: "snow",
  19: "thunderstorm",
  23: "fog",
  24: "fog",
  25: "snow",
  26: "snow",
  27: "rain",
  28: "rain",
  30: "clear",
  31: "partly cloudy",
  32: "partly cloudy",
  33: "overcast",
  36: "rain",
  37: "rain",
  38: "snow",
  39: "thunderstorm",
  40: "snow",
  43: "windy",
  44: "fog",
};

/**
 * Map Environment Canada's condition text (with the icon code and wind as
 * tie-breakers) to one of the eight scene conditions.
 */
export function mapCondition(
  text: string | undefined | null,
  iconCode?: number | null,
  wind?: { speedKmh?: number | null; gustKmh?: number | null },
): Condition {
  const t = (text ?? "").toLowerCase();
  let condition: Condition | undefined;

  if (t.includes("thunder")) condition = "thunderstorm";
  else if (/snow|flurr|blizzard|ice pellet|ice crystal/.test(t)) condition = "snow";
  else if (/rain|drizzle|shower|precip/.test(t)) condition = "rain";
  else if (/fog|mist|haze|smoke/.test(t)) condition = "fog";
  else if (/mostly cloudy|overcast|^cloudy/.test(t)) condition = "overcast";
  else if (/partly|mainly|a few clouds|light cloud/.test(t)) condition = "partly cloudy";
  else if (/sunny|clear/.test(t)) condition = "clear";
  else if (t.includes("cloud")) condition = "overcast";
  else if (t.includes("wind")) condition = "windy";

  if (!condition && typeof iconCode === "number" && iconCode in ICON_CONDITIONS) {
    condition = ICON_CONDITIONS[iconCode];
  }
  if (!condition) condition = "clear";

  if (condition === "clear" || condition === "partly cloudy") {
    const gust = wind?.gustKmh ?? 0;
    const speed = wind?.speedKmh ?? 0;
    if (gust >= WINDY_GUST_KMH || speed >= WINDY_SPEED_KMH || iconCode === 43) condition = "windy";
  }
  return condition;
}

/** Night when now is before today's sunrise or after sunset at the station. */
export function isNight(now: Date, sunriseIso?: string | null, sunsetIso?: string | null): boolean {
  const sunrise = sunriseIso ? Date.parse(sunriseIso) : Number.NaN;
  const sunset = sunsetIso ? Date.parse(sunsetIso) : Number.NaN;
  if (Number.isFinite(sunrise) && Number.isFinite(sunset)) {
    const t = now.getTime();
    return t < sunrise || t > sunset;
  }
  return fallbackNight(now);
}

/** Without rise and set times, day is 7:00 to 18:00 at home. */
export function fallbackNight(now: Date, timeZone = HOME_TIME_ZONE): boolean {
  const hour = Number(
    new Intl.DateTimeFormat("en-CA", { timeZone, hour: "numeric", hour12: false }).format(now),
  );
  return hour < 7 || hour >= 18;
}

type CityPage = {
  properties?: {
    name?: { en?: string };
    currentConditions?: {
      condition?: { en?: string };
      iconCode?: { value?: number | string };
      timestamp?: { en?: string };
      wind?: {
        speed?: { value?: { en?: number | string } };
        gust?: { value?: { en?: number | string } };
      };
    };
    riseSet?: { sunrise?: { en?: string }; sunset?: { en?: string } };
  };
};

export const GEOMET_BASE = "https://api.weather.gc.ca/collections/citypageweather-realtime/items";
export const CACHE_SECONDS = 600;

const memory = new Map<string, { at: number; value: Observation }>();

function num(v: number | string | undefined | null): number | null {
  if (v === undefined || v === null) return null;
  const n = typeof v === "number" ? v : Number.parseFloat(v);
  return Number.isFinite(n) ? n : null;
}

export function observationFromCityPage(page: CityPage, now: Date): Observation {
  const p = page.properties ?? {};
  const cc = p.currentConditions ?? {};
  const condition = mapCondition(cc.condition?.en, num(cc.iconCode?.value), {
    speedKmh: num(cc.wind?.speed?.value?.en),
    gustKmh: num(cc.wind?.gust?.value?.en),
  });
  return {
    condition,
    night: isNight(now, p.riseSet?.sunrise?.en, p.riseSet?.sunset?.en),
    observedAt: cc.timestamp?.en,
    stationName: p.name?.en,
  };
}

export async function getObservation(
  station: Station = DEFAULT_STATION,
  now: Date = new Date(),
  fetchImpl: typeof fetch = fetch,
): Promise<Observation> {
  const hit = memory.get(station.id);
  if (hit && now.getTime() - hit.at < CACHE_SECONDS * 1000) return hit.value;

  const res = await fetchImpl(`${GEOMET_BASE}/${station.id}?f=json`, {
    headers: { accept: "application/json" },
    next: { revalidate: CACHE_SECONDS },
    signal: AbortSignal.timeout(4000),
  });
  if (!res.ok) throw new Error(`GeoMet ${res.status} for ${station.id}`);
  const page = (await res.json()) as CityPage;
  const value = observationFromCityPage(page, now);
  memory.set(station.id, { at: now.getTime(), value });
  return value;
}

export function clearObservationCache(): void {
  memory.clear();
}
