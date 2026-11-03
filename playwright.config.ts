import { defineConfig, devices } from "@playwright/test";

const PORT = 3100;

// Two viewports by requirement (QA-2), plus the dark theme so axe checks both
// palettes (A11Y-1, DSN-3).
export default defineConfig({
  testDir: "tests/e2e",
  fullyParallel: true,
  retries: process.env.CI ? 1 : 0,
  reporter: process.env.CI ? "github" : "list",
  use: {
    baseURL: `http://localhost:${PORT}`,
    trace: "retain-on-failure",
  },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 } } },
    { name: "phone", use: { ...devices["Desktop Chrome"], viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true } },
    { name: "desktop-dark", use: { ...devices["Desktop Chrome"], viewport: { width: 1280, height: 900 }, colorScheme: "dark" } },
  ],
  webServer: {
    command: `pnpm build && pnpm start -p ${PORT}`,
    url: `http://localhost:${PORT}`,
    reuseExistingServer: !process.env.CI,
    timeout: 240_000,
  },
});
