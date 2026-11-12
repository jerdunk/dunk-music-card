import { defineConfig } from "@playwright/test";
export default defineConfig({
  testDir: "tests/browser",
  use: { baseURL: "http://127.0.0.1:4173", headless: true },
  webServer: {
    command: "npx vite --host 127.0.0.1 --port 4173",
    url: "http://127.0.0.1:4173/tests/fixture.html",
    reuseExistingServer: !process.env.CI,
  },
  projects: [
    { name: "mobile", use: { viewport: { width: 390, height: 844 } } },
    { name: "tablet", use: { viewport: { width: 820, height: 1180 } } },
    { name: "desktop", use: { viewport: { width: 1440, height: 1000 } } },
    {
      name: "firefox",
      use: { browserName: "firefox", viewport: { width: 1440, height: 1000 } },
    },
    {
      name: "webkit",
      use: { browserName: "webkit", viewport: { width: 390, height: 844 } },
    },
  ],
});
