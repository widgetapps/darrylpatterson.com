import { expect, test } from "@playwright/test";

// QA-3: Home's two app cards and the essay link. HERO-10: every season and
// condition renders with the API stubbed.
test("Home shows the two apps and the link to the essay", async ({ page }) => {
  await page.goto("/");
  const cards = page.locator("article[data-app]");
  await expect(cards).toHaveCount(2);
  await expect(cards.nth(0)).toContainText("Track Tutor");
  await expect(cards.nth(1)).toContainText("Algoma Live");
  await expect(cards.nth(0).getByRole("link", { name: /tracktutor\.com/ })).toHaveAttribute("href", "https://tracktutor.com");
  await expect(cards.nth(1).getByRole("link", { name: /algomalive\.ca/ })).toHaveAttribute("href", "https://algomalive.ca");
  await expect(page.getByTestId("essay-link")).toHaveAttribute("href", "/ai");
  await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);
  // Open Graph and Twitter images on Home (CNT-10).
  await expect(page.locator('meta[property="og:image"]')).toHaveCount(1);
  await expect(page.locator('meta[name="twitter:image"]')).toHaveCount(1);
});

test("the hero repaints from the weather API", async ({ page }) => {
  await page.route("**/api/weather", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({ ok: true, season: "winter", condition: "snow", night: true }),
    }),
  );
  await page.goto("/");
  const hero = page.getByTestId("living-hero");
  await expect(hero).toHaveAttribute("data-season", "winter");
  await expect(hero).toHaveAttribute("data-condition", "snow");
  await expect(hero).toHaveAttribute("data-night", "true");
  await expect(page.getByTestId("hero-scene")).toHaveAttribute("aria-hidden", "true");
  await expect(page.getByTestId("hero-scene").locator("text")).toHaveCount(0);
});

test("the hero scene stays hidden until the weather answers, then fades in", async ({ page }) => {
  let answer: (() => void) | undefined;
  const held = new Promise<void>((resolve) => (answer = resolve));
  await page.route("**/api/weather", async (route) => {
    await held;
    await route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, season: "summer", condition: "rain", night: false }) });
  });
  await page.goto("/");
  const hero = page.getByTestId("living-hero");
  const scene = hero.locator(".hero-reveal");
  await expect(hero).toHaveAttribute("data-ready", "false");
  await expect(scene).toHaveCSS("opacity", "0");
  // The headline is live text and never waits for the weather (HERO-1).
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  answer?.();
  await expect(hero).toHaveAttribute("data-ready", "true");
  await expect(hero).toHaveAttribute("data-condition", "rain");
  await expect(scene).toHaveCSS("opacity", "1");
});

test("the hero asks the weather again every minute", async ({ page }) => {
  let calls = 0;
  await page.route("**/api/weather", (route) => {
    calls += 1;
    const condition = calls === 1 ? "clear" : "snow";
    return route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, season: "winter", condition, night: false }) });
  });
  await page.clock.install();
  await page.goto("/");
  const hero = page.getByTestId("living-hero");
  await expect(hero).toHaveAttribute("data-condition", "clear");
  expect(calls).toBe(1);
  await page.clock.runFor(60_000);
  await expect(hero).toHaveAttribute("data-condition", "snow");
  expect(calls).toBe(2);
});

test("the hero keeps a season scene when the API fails", async ({ page }) => {
  await page.route("**/api/weather", (route) => route.fulfill({ status: 500, body: "down" }));
  await page.goto("/");
  const hero = page.getByTestId("living-hero");
  await expect(hero).toHaveAttribute("data-season", /spring|summer|autumn|winter/);
  await expect(hero).toHaveAttribute("data-condition", "clear");
  await expect(hero).toHaveAttribute("data-ready", "true");
});

const seasons = ["spring", "summer", "autumn", "winter"] as const;
const conditions = ["clear", "partly cloudy", "overcast", "fog", "rain", "snow", "thunderstorm", "windy"] as const;

test.describe("every season and condition renders", () => {
  test.skip(({ viewport }) => (viewport?.width ?? 0) < 400, "scene matrix runs on desktop only");
  for (const season of seasons) {
    test(season, async ({ page }) => {
      for (const [i, condition] of conditions.entries()) {
        const night = i % 2 === 1;
        await page.route("**/api/weather", (route) =>
          route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ ok: true, season, condition, night }) }),
        );
        await page.goto("/");
        const hero = page.getByTestId("living-hero");
        await expect(hero).toHaveAttribute("data-condition", condition);
        await expect(hero).toHaveAttribute("data-night", String(night));
        await expect(page.getByTestId("hero-scene").locator("path, circle, rect").first()).toBeAttached();
        await page.unroute("**/api/weather");
      }
    });
  }
});

test("the weather route answers with a known shape", async ({ request }) => {
  const res = await request.get("/api/weather", { headers: { "x-vercel-ip-latitude": "47.99", "x-vercel-ip-longitude": "-84.77" } });
  expect(res.status()).toBe(200);
  const body = await res.json();
  expect(body.station.name).toBe("Wawa");
  expect(["spring", "summer", "autumn", "winter"]).toContain(body.season);
  expect(["clear", "partly cloudy", "overcast", "fog", "rain", "snow", "thunderstorm", "windy"]).toContain(body.condition);
  expect(typeof body.night).toBe("boolean");
});
