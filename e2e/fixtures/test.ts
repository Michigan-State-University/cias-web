import { test as base, expect, Page, Request } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const PENDING_REQUESTS_TIMEOUT_MS = 10000;

// The API replaces the access token on every response, and the app stores the
// new one when the response arrives. A request still running when a test ends
// (a save fired by its last action) would leave the old token in the saved
// state; the API stops accepting that a few seconds later, so the next test,
// and every retry after it, would start logged out.
const trackPendingRequests = (page: Page) => {
  const pending = new Set<Request>();
  const settle = (request: Request) => pending.delete(request);

  page.on('request', (request) => {
    if (['xhr', 'fetch'].includes(request.resourceType())) pending.add(request);
  });
  page.on('requestfinished', settle);
  page.on('requestfailed', settle);

  return async () => {
    const deadline = Date.now() + PENDING_REQUESTS_TIMEOUT_MS;
    while (pending.size > 0 && Date.now() < deadline) {
      await page.waitForTimeout(100);
    }
    // Gives the app's response interceptor time to store the new token.
    await page.waitForTimeout(250);
  };
};

// Extend the base test with worker-specific authentication and token management
export const test = base.extend<{}, { workerStorageState: string }>({
  // Worker-scoped fixture that determines which auth file to use
  workerStorageState: [
    async ({}, use, workerInfo) => {
      // Get total number of auth files available
      const WORKER_COUNT = parseInt(process.env.E2E_WORKER_COUNT || '5', 10);

      // Where this process starts in the account pool. Sharded CI runs give each
      // shard its own offset so two shards never drive the same admin account:
      // the API rotates the access token on every request, so sharing an account
      // across processes logs them both out.
      const ACCOUNT_OFFSET = parseInt(process.env.E2E_ACCOUNT_OFFSET || '0', 10);

      // `parallelIndex`, NOT `workerIndex`: workerIndex is unique per worker
      // process and keeps climbing as Playwright recycles workers (a new project,
      // or a worker replaced after a failure), so it walks off the accounts this
      // run authenticated. parallelIndex stays within 0..workers-1 and is
      // guaranteed distinct between workers running at the same time.
      const authFileIndex =
        (ACCOUNT_OFFSET + workerInfo.parallelIndex) % WORKER_COUNT;
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
    const waitForPendingRequests = trackPendingRequests(page);

    await use(page);

    // After the test completes, persist the browser's current storage state
    // to the auth file so subsequent tests start with the latest tokens.
    // Only persist if the page is still on a valid (non-login) URL to avoid
    // saving a logged-out state after auth failures.
    try {
      await waitForPendingRequests();

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
