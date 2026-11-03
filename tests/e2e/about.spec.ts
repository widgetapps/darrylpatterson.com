import { expect, test } from "@playwright/test";

// SITE-5, A11Y-6: the list filter works with the keyboard, exposes its state,
// and lives in the URL.
test("the company list filters by type from the URL and the chips", async ({ page }) => {
  await page.goto("/about?type=brand");
  const group = page.getByRole("group", { name: "Filter by type" });
  await expect(group.getByRole("button", { name: "Brands" })).toHaveAttribute("aria-pressed", "true");
  await expect(group.getByRole("button", { name: "All" })).toHaveAttribute("aria-pressed", "false");
  const rows = page.locator("#list-h ~ div li, #work ul li");
  const brandCount = await rows.count();
  expect(brandCount).toBeGreaterThan(0);
  expect(brandCount).toBeLessThan(148);

  await group.getByRole("button", { name: "Agencies" }).focus();
  await page.keyboard.press("Enter");
  await expect(group.getByRole("button", { name: "Agencies" })).toHaveAttribute("aria-pressed", "true");
  await expect(page).toHaveURL(/\?type=agency$/);

  await group.getByRole("button", { name: "All" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.locator("#work ul li")).toHaveCount(148);
});

test("About carries the three case studies and the licence section", async ({ page }) => {
  await page.goto("/about");
  await expect(page.locator("#work article")).toHaveCount(3);
  await expect(page.locator("#license")).toBeVisible();
  await expect(page.getByText("Past President, Rotary Club of Sault Ste. Marie, 2025/2026")).toBeVisible();
});
