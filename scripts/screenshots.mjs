#!/usr/bin/env node
/**
 * CNT-2 / DSN-6: real screenshots of the two apps, taken with Playwright's
 * Chromium at 1200x750, into public/apps. Run when the apps' home pages change.
 */
import { chromium } from "@playwright/test";
import { mkdirSync } from "node:fs";

const targets = [
  { id: "tracktutor", url: "https://tracktutor.com/" },
  { id: "algomalive", url: "https://algomalive.ca/" },
];

mkdirSync("public/apps", { recursive: true });
const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 1200, height: 750 },
  deviceScaleFactor: 1,
  colorScheme: "light",
  reducedMotion: "reduce",
});
for (const t of targets) {
  const page = await context.newPage();
  await page.goto(t.url, { waitUntil: "networkidle", timeout: 60_000 });
  await page.waitForTimeout(1500);
  await page.screenshot({ path: `public/apps/${t.id}.png`, fullPage: false });
  console.log(`wrote public/apps/${t.id}.png`);
  await page.close();
}
await browser.close();
