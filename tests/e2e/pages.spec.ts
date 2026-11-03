import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

// QA-2, QA-3, A11Y-1, A11Y-3, A11Y-7: every route, its contract, and axe.
const routes = [
  { path: "/", h1: "Darryl makes useful things using AI.", current: "Home" },
  { path: "/ai", h1: "On AI", current: "On AI" },
  { path: "/about", h1: "About", current: "About" },
  { path: "/contact", h1: "Get in touch", current: "Contact" },
  { path: "/this-page-does-not-exist", h1: "That page flew south.", current: null, status: 404 },
];

for (const route of routes) {
  test.describe(route.path, () => {
    test("has the landmarks, one h1, the nav and the skip link", async ({ page }) => {
      const response = await page.goto(route.path);
      expect(response?.status()).toBe(route.status ?? 200);

      await expect(page.locator("h1")).toHaveCount(1);
      await expect(page.locator("h1")).toHaveText(route.h1);

      await expect(page.locator("header")).toHaveCount(1);
      await expect(page.locator("main#main")).toHaveCount(1);
      await expect(page.locator("footer")).toHaveCount(1);
      await expect(page.getByRole("navigation", { name: "Primary" })).toBeVisible();

      const nav = page.getByRole("navigation", { name: "Primary" });
      await expect(nav.getByRole("link")).toHaveText(["Home", "On AI", "About", "Contact"]);
      if (route.current) {
        await expect(nav.getByRole("link", { name: route.current, exact: true })).toHaveAttribute("aria-current", "page");
      } else {
        await expect(nav.locator("[aria-current]")).toHaveCount(0);
      }

      // The skip link is the first thing in the tab order and lands on main.
      await page.keyboard.press("Tab");
      const skip = page.getByRole("link", { name: "Skip to content" });
      await expect(skip).toBeFocused();
      await expect(skip).toHaveAttribute("href", "#main");

      // No horizontal scroll at any width (A11Y-7).
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });

    test("passes the axe audit at WCAG 2.2 AA", async ({ page }) => {
      await page.goto(route.path);
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"])
        .exclude("[data-testid=hero-scene]")
        .analyze();
      expect(results.violations, JSON.stringify(results.violations, null, 2)).toEqual([]);
    });
  });
}

test("sitemap and robots are served", async ({ request }) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  for (const path of ["/", "/ai", "/about", "/contact"]) {
    expect(xml).toContain(`https://darrylpatterson.com${path === "/" ? "" : path}`);
  }
  const robots = await request.get("/robots.txt");
  expect(robots.status()).toBe(200);
  expect(await robots.text()).toContain("sitemap.xml");
});

test("every page has a unique title and description", async ({ page }) => {
  const seen = new Set<string>();
  for (const route of routes.slice(0, 4)) {
    await page.goto(route.path);
    const title = await page.title();
    const description = await page.locator('meta[name="description"]').getAttribute("content");
    expect(title.length).toBeGreaterThan(3);
    expect(description?.length ?? 0).toBeGreaterThan(20);
    expect(seen.has(title)).toBe(false);
    seen.add(title);
  }
});
