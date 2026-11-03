/**
 * The one route handler on the site (TECH-5, HERO-7): the current season,
 * condition and day-or-night for the visitor's nearest Algoma station, or
 * Sault Ste. Marie for everyone else. Reads Vercel's IP geolocation headers
 * and keeps nothing (HERO-5, HERO-6).
 */
import type { NextRequest } from "next/server";
import { seasonFor } from "@/lib/season";
import { stationFromHeaders } from "@/lib/stations";
import { fallbackNight, getObservation } from "@/lib/weather";

export async function GET(request: NextRequest) {
  const now = new Date();
  const station = stationFromHeaders(request.headers);
  const season = seasonFor(now);
  const headers = { "cache-control": "public, max-age=300, s-maxage=300", "content-type": "application/json" };

  try {
    const obs = await getObservation(station, now);
    return Response.json(
      {
        ok: true,
        station: { id: station.id, name: station.name },
        season,
        condition: obs.condition,
        night: obs.night,
        observedAt: obs.observedAt ?? null,
        source: "Environment and Climate Change Canada",
      },
      { headers },
    );
  } catch {
    return Response.json(
      {
        ok: false,
        station: { id: station.id, name: station.name },
        season,
        condition: "clear",
        night: fallbackNight(now),
        observedAt: null,
        source: "fallback",
      },
      { headers: { ...headers, "cache-control": "no-store" } },
    );
  }
}
