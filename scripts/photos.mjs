#!/usr/bin/env node
/**
 * MIG-1 / TECH-6: re-export the photos at the sizes the design needs.
 * Portraits under public/me become 800px squares; the landscapes under
 * public/photos become 1600px wide. Run once after dropping in new originals.
 */
import sharp from "sharp";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const jobs = [
  { dir: "public/me", width: 800, height: 800 },
  { dir: "public/photos", width: 1600 },
];

for (const job of jobs) {
  for (const name of readdirSync(job.dir).filter((n) => /\.jpe?g$/i.test(n))) {
    const file = join(job.dir, name);
    const input = sharp(file);
    const meta = await input.metadata();
    if ((meta.width ?? 0) <= job.width) {
      console.log(`keep  ${file} (${meta.width}x${meta.height})`);
      continue;
    }
    const buf = await input
      .rotate()
      .resize({ width: job.width, height: job.height, fit: "cover", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    await sharp(buf).toFile(file);
    console.log(`wrote ${file} (${job.width}x${job.height ?? "auto"}, ${(buf.length / 1024).toFixed(0)} KB)`);
  }
}
