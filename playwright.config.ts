import { defineConfig, devices } from '@playwright/test';


export default defineConfig({
    use: {
        trace: 'on-first-retry',
        baseURL: "http://localhost:3000"
    },
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    outputDir: "./test-e2e-results",
    testDir: "./test-e2e",
    projects:
        [
            {
                name: 'chromium',
                use: { ...devices['Desktop Chrome'] }
            }
        ],
    webServer: {
        command: "npm run dev",
        url: "http://localhost:3000",
        reuseExistingServer: !process.env.CI,
    }

})