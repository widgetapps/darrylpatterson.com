/**
 * Environment Canada city pages inside the Algoma District, and the rule for
 * choosing one from Vercel's IP geolocation headers (HERO-5). Nothing about
 * the visitor is kept; the coordinates are read once and turned into a
 * station id (HERO-6).
 */
export type Station = { id: string; name: string; lat: number; lon: number };

export const ALGOMA_BBOX = { south: 46.0, north: 49.5, west: -86.5, east: -81.5 };

export const STATIONS: readonly Station[] = [
  { id: "on-162", name: "Sault Ste. Marie", lat: 46.52, lon: -84.33 },
  { id: "on-138", name: "Wawa", lat: 47.99, lon: -84.77 },
  { id: "on-170", name: "Elliot Lake", lat: 46.38, lon: -82.66 },
  { id: "on-21", name: "Blind River", lat: 46.19, lon: -82.96 },
  { id: "on-91", name: "Chapleau", lat: 47.84, lon: -83.4 },
  { id: "on-78", name: "Hornepayne", lat: 49.22, lon: -84.78 },
  { id: "on-67", name: "White River", lat: 48.59, lon: -85.28 },
  { id: "on-163", name: "Montreal River Harbour", lat: 47.24, lon: -84.64 },
];

export const DEFAULT_STATION: Station = STATIONS[0];

export function inAlgoma(lat: number, lon: number): boolean {
  return (
    Number.isFinite(lat) &&
    Number.isFinite(lon) &&
    lat >= ALGOMA_BBOX.south &&
    lat <= ALGOMA_BBOX.north &&
    lon >= ALGOMA_BBOX.west &&
    lon <= ALGOMA_BBOX.east
  );
}

/** Nearest station for a point inside the district; Sault Ste. Marie otherwise. */
export function nearestStation(lat: number, lon: number): Station {
  if (!inAlgoma(lat, lon)) return DEFAULT_STATION;
  let best = DEFAULT_STATION;
  let bestD = Number.POSITIVE_INFINITY;
  for (const s of STATIONS) {
    // Flat-earth distance is fine at this scale; longitude is shrunk by cos(lat).
    const dLat = s.lat - lat;
    const dLon = (s.lon - lon) * Math.cos((lat * Math.PI) / 180);
    const d = dLat * dLat + dLon * dLon;
    if (d < bestD) {
      bestD = d;
      best = s;
    }
  }
  return best;
}

export function stationFromHeaders(headers: Headers): Station {
  const lat = Number.parseFloat(headers.get("x-vercel-ip-latitude") ?? "");
  const lon = Number.parseFloat(headers.get("x-vercel-ip-longitude") ?? "");
  return nearestStation(lat, lon);
}

export function stationById(id: string): Station | undefined {
  return STATIONS.find((s) => s.id === id);
}
