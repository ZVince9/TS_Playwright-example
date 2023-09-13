import { defineConfig, devices } from "@playwright/test";

export default defineConfig({
  testDir: "../tests",
  outputDir: "../allure-results",
  preserveOutput: "failures-only",

  fullyParallel: true,
  retries: process.env.CI ? 2 : 1,
  reporter: [
    [
      "allure-playwright",
      {
        detail: true,
        outputFolder: "allure-results",
        suiteTitle: false,
      },
    ],
  ],
  use: {
    headless: true,
    trace: "on-first-retry",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
  },

  /* Configure projects for major browsers */
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },

    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"] },
    },

    {
      name: "webkit",
      use: { ...devices["Desktop Safari"] },
    },
  ],
});
