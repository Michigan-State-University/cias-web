import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });
console.log('🔧 Playwright config loaded');
console.log(`Base URL: ${process.env.E2E_BASE_URL || 'http://localhost:4200'}`);
console.log(`WebServer command: npm run start`);
console.log(`WebServer URL: http://localhost:4200`);
console.log(`CI mode: ${!!process.env.CI}`);
console.log('');

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  testDir: './e2e',
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: 0,
  /* Maximum time one test can run for */
  timeout: 30000,
  /* Configure workers.
   */
  workers: process.env.CI ? 1 : parseInt(process.env.E2E_WORKER_COUNT || '5', 10),
  /* Reporter to use. See https://playwright.dev/docs/test-reporters */
  reporter: [['html', { open: 'never' }], ['list']],
  /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
  use: {
    /* Base URL to use in actions like `await page.goto('')`. */
    baseURL: process.env.E2E_BASE_URL || 'http://localhost:4200',

    /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
    trace: 'on-first-retry',

    /* Take screenshot on failure */
    screenshot: 'only-on-failure',

    /* Video recording */
    video: 'retain-on-failure',

    // Add extra time for API responses
    actionTimeout: 15000,
    navigationTimeout: 30000,
  },

  /* Configure projects for major browsers */
  projects: [
    // Setup project for authentication
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
    },
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: { width: 1500, height: 900 },
        // Note: storageState is now handled by e2e/fixtures/test.ts based on worker index
      },
      dependencies: ['setup'],
    },
    {
      name: 'firefox',
      use: {
        ...devices['Desktop Firefox'],
        viewport: { width: 1500, height: 900 },
        // Note: storageState is now handled by e2e/fixtures/test.ts based on worker index
      },
      dependencies: ['setup'],
    },
    {
      name: 'webkit',
      use: {
        ...devices['Desktop Safari'],
        viewport: { width: 1500, height: 900 },
        // Note: storageState is now handled by e2e/fixtures/test.ts based on worker index
      },
      dependencies: ['setup'],
    },
  ],

  /* Run your local dev server before starting the tests */
  webServer: process.env.CI ? {
    // In CI, serve the pre-built production bundle from current branch
    // The frontend will connect to API_URL from environment (staging API)
    command: 'npm run start:prod',
    url: 'http://localhost:4200',
    reuseExistingServer: false,
    timeout: 30 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  } : {
    // Locally, run the dev server with current branch code
    command: 'npm run start',
    url: 'http://localhost:4200',
    reuseExistingServer: true,
    timeout: 120 * 1000,
    stdout: 'pipe',
    stderr: 'pipe',
  },
});
