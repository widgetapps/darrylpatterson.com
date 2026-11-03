/**
 * What the hero scene draws for a season, a condition and day or night. Every
 * colour is a token reference, never a value (DSN-10).
 */
import type { Season } from "./season";
import type { Condition } from "./weather";

export type SceneState = { season: Season; condition: Condition; night: boolean };

export type Scene = SceneState & {
  skyTop: string;
  skyBottom: string;
  water: string;
  ground: string;
  leaf: string;
  cloud: string;
  sun: boolean;
  moon: boolean;
  clouds: boolean;
  heavyClouds: boolean;
  winter: boolean;
  leaves: boolean;
  rain: boolean;
  snow: boolean;
  storm: boolean;
  fog: boolean;
  windy: boolean;
};

const v = (name: string) => `var(--dp-${name})`;

const LEAF: Record<Season, string> = {
  spring: v("leaf-spring"),
  summer: v("leaf-summer"),
  autumn: v("leaf-autumn"),
  winter: v("birch-bark"),
};
const GROUND: Record<Season, string> = {
  spring: v("ground-spring"),
  summer: v("ground-summer"),
  autumn: v("ground-autumn"),
  winter: v("ground-winter"),
};

export function sceneFor({ season, condition, night }: SceneState): Scene {
  const winter = season === "winter";
  const grey = condition === "overcast" || condition === "rain" || condition === "snow" || condition === "fog";
  const storm = condition === "thunderstorm";
  const fair = condition === "clear" || condition === "partly cloudy" || condition === "windy";

  let skyTop: string;
  let skyBottom: string;
  if (night) {
    skyTop = grey || storm ? v("sky-night-grey") : v("sky-night");
    skyBottom = grey || storm ? v("sky-storm") : v("sky-night-horizon");
  } else if (storm) {
    skyTop = v("sky-storm");
    skyBottom = v("cloud-dark");
  } else if (grey) {
    skyTop = v("sky-overcast");
    skyBottom = v("sky-fog");
  } else {
    skyTop = v("sky-day-deep");
    skyBottom = v("sky-day");
  }

  return {
    season,
    condition,
    night,
    skyTop,
    skyBottom,
    water: winter ? v("water-ice") : night ? v("water-night") : v("water"),
    ground: GROUND[season],
    leaf: LEAF[season],
    cloud: grey || storm ? v("cloud-dark") : v("cloud"),
    sun: !night && fair,
    moon: night && fair,
    clouds: condition === "partly cloudy" || condition === "windy",
    heavyClouds: grey || storm,
    winter,
    leaves: !winter,
    rain: condition === "rain" || storm,
    snow: condition === "snow",
    storm,
    fog: condition === "fog",
    windy: condition === "windy",
  };
}
