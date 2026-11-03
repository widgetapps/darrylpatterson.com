#!/usr/bin/env node
/**
 * DSN-10 / TECH-2: no raw colour values outside src/styles/tokens.css.
 * Scans src/ and content/ for hex, rgb() and hsl() literals.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = process.cwd();
const ALLOW = new Set(["src/styles/tokens.css"]);
const EXT = new Set([".ts", ".tsx", ".css", ".json", ".mjs"]);
const PATTERN = /#(?:[0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{3,4})\b|\b(?:rgba?|hsla?)\(/gi;

function walk(dir, out = []) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (EXT.has(p.slice(p.lastIndexOf(".")))) out.push(p);
  }
  return out;
}

const files = [...walk(join(ROOT, "src")), ...walk(join(ROOT, "content"))];
const problems = [];
for (const file of files) {
  const rel = relative(ROOT, file);
  if (ALLOW.has(rel)) continue;
  const lines = readFileSync(file, "utf8").split("\n");
  lines.forEach((line, i) => {
    const hits = line.match(PATTERN);
    if (hits) problems.push(`${rel}:${i + 1}: ${hits.join(", ")}`);
  });
}

if (problems.length) {
  console.error("Raw colour values found outside src/styles/tokens.css (DSN-10):");
  for (const p of problems) console.error("  " + p);
  process.exit(1);
}
console.log(`lint:tokens ok (${files.length} files)`);
