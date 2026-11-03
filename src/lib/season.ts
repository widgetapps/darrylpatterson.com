/**
 * Season from the date, with the same boundaries as the Algoma Live logo
 * (HERO-3): spring Mar 21, summer Jun 21, autumn Sep 22, winter Dec 21.
 * The date is read in Sault Ste. Marie's time zone, not the server's.
 */
export const SEASONS = ["spring", "summer", "autumn", "winter"] as const;
export type Season = (typeof SEASONS)[number];

export const HOME_TIME_ZONE = "America/Toronto";

export function monthDay(date: Date, timeZone = HOME_TIME_ZONE): { month: number; day: number } {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone,
    month: "numeric",
    day: "numeric",
  }).formatToParts(date);
  const month = Number(parts.find((p) => p.type === "month")?.value);
  const day = Number(parts.find((p) => p.type === "day")?.value);
  return { month, day };
}

export function seasonFor(date: Date, timeZone = HOME_TIME_ZONE): Season {
  const { month, day } = monthDay(date, timeZone);
  const md = month * 100 + day;
  if (md >= 1221 || md < 321) return "winter";
  if (md < 621) return "spring";
  if (md < 922) return "summer";
  return "autumn";
}

export function isSeason(value: unknown): value is Season {
  return typeof value === "string" && (SEASONS as readonly string[]).includes(value);
}
