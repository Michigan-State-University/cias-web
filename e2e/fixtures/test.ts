import { test as base, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Extend the base test with worker-specific authentication and token management
export const test = base.extend<{}, { workerStorageState: string }>({
  // Worker-scoped fixture that determines which auth file to use
  workerStorageState: [
    async ({}, use, workerInfo) => {
      // Get total number of auth files available
      const WORKER_COUNT = parseInt(process.env.E2E_WORKER_COUNT || '5', 10);

      // Wrap worker index to available auth files using modulo
      // This handles cases where Playwright assigns worker indices beyond the worker count
      // (e.g., when running multiple browser projects)
      const authFileIndex = workerInfo.workerIndex % WORKER_COUNT;
      const authFile = path.join(__dirname, `../.auth/admin-worker-${authFileIndex}.json`);

      // Verify the auth file exists
      if (!fs.existsSync(authFile)) {
        throw new Error(
          `Auth file ${authFile} does not exist. Run 'npm run e2e:setup' to create worker-specific auth files.`
        );
      }

      await use(authFile);
    },
    { scope: 'worker' },
  ],

  // Context fixture that uses the worker-specific storage state
  context: async ({ browser, workerStorageState }, use) => {
    const context = await browser.newContext({
      storageState: workerStorageState,
    });

    await use(context);
    await context.close();
  },

  // Page fixture with token persistence at teardown
  //
  // Token rotation during the test is handled by the app's own axios interceptors
  // (app/utils/axios.js), which update localStorage on every API response.
  // We only need to persist the final state to the auth file so the next test
  // starts with valid tokens.
  page: async ({ context, workerStorageState }, use) => {
    const page = await context.newPage();

    await use(page);

    // After the test completes, persist the browser's current storage state
    // to the auth file so subsequent tests start with the latest tokens.
    // Only persist if the page is still on a valid (non-login) URL to avoid
    // saving a logged-out state after auth failures.
    try {
      const currentUrl = page.url();
      const isOnLoginPage = currentUrl.includes('/login');

      if (!isOnLoginPage) {
        const storageState = await context.storageState();
        fs.writeFileSync(workerStorageState, JSON.stringify(storageState, null, 2));
      }
    } catch {
      // Best-effort — page may already be closed on timeout
    }

    await page.close();
  },
});

export { expect };

// Re-export Page type for convenience
export type { Page, Locator } from '@playwright/test';
