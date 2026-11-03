import { expect, test } from "@playwright/test";

// SITE-6, QA-4: each old URL answers 308 to the new one.
const cases = [
  ["/thework", "/about#work"],
  ["/thework/onehome", "/about#work"],
  ["/thelist", "/about#work"],
  ["/license", "/about#license"],
] as const;

for (const [from, to] of cases) {
  test(`${from} -> ${to}`, async ({ request }) => {
    const res = await request.get(from, { maxRedirects: 0 });
    expect(res.status()).toBe(308);
    expect(res.headers()["location"]).toBe(to);
  });
}
