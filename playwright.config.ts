import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

// The pipeline signs in only its own account, so CI shards aren't logged out.
if (process.env.E2E_AI) {
  process.env.E2E_WORKER_COUNT ??= '6';
  process.env.E2E_ACCOUNT_OFFSET ??= '5';
  process.env.E2E_ACCOUNTS_NEEDED ??= '1';
}

// No setup dependency: the MCP server runs every project, redoing 2FA each run.
const aiPipelineProjects = [
  { name: 'setup', testMatch: /.*\.setup\.ts/, retries: 2 },
  {
    name: 'webkit',
    use: { ...devices['Desktop Safari'], viewport: { width: 1500, height: 900 } },
  },
  {
    name: 'ai',
    testDir: './e2e/ai',
    testIgnore: [],
    testMatch: 'seed.spec.ts',
    use: { ...devices['Desktop Safari'], viewport: { width: 1500, height: 900 } },
  },
];

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
  /* e2e/ai/ is pipeline tooling; only the `ai` project runs from it. */
  testIgnore: /[\\/]e2e[\\/]ai[\\/]/,
  /* Run tests in files in parallel */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Maximum time one test can run for — CI uses a remote staging API so needs more time */
  timeout: process.env.CI ? 90000 : 30000,
  /* Assertions were the one timeout left on Playwright's 5s default while action
   * and navigation were raised for CI. That is not enough for elements that only
   * render once data comes back from the remote staging API — e.g. the add-screen
   * button, which waits on the session load. */
  expect: {
    timeout: process.env.CI ? 15000 : 5000,
  },
  /* Continue running tests even if some fail */
  maxFailures: process.env.CI ? undefined : 0,
  /* Configure workers.
   */
  workers:
    process.env.CI || process.env.E2E_AI
      ? 1
      : parseInt(process.env.E2E_WORKER_COUNT || '5', 10),
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

    // Add extra time for API responses — CI uses a remote staging API
    actionTimeout: process.env.CI ? 30000 : 15000,
    navigationTimeout: process.env.CI ? 60000 : 30000,
  },

  /* Configure projects for major browsers */
  projects: process.env.E2E_AI ? aiPipelineProjects : [
    // Setup project for authentication - marked as optional, won't block other tests
    {
      name: 'setup',
      testMatch: /.*\.setup\.ts/,
      retries: 2,
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
  webServer: process.env.E2E_AI ? undefined : process.env.CI ? {
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
