/**
 * Read the light-theme colour tokens out of tokens.css at build time, for the
 * one place that cannot use CSS variables: the Open Graph images drawn with
 * ImageResponse. Keeps raw values in a single file (DSN-10).
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";

export type TokenMap = Record<string, string>;

let cache: TokenMap | undefined;

export function readTokens(): TokenMap {
  if (cache) return cache;
  const css = readFileSync(join(process.cwd(), "src/styles/tokens.css"), "utf8");
  const light = css.split("@media")[0];
  const map: TokenMap = {};
  for (const m of light.matchAll(/--dp-([a-z0-9-]+):\s*([^;]+);/g)) {
    map[m[1]] = m[2].trim();
  }
  cache = map;
  return map;
}
