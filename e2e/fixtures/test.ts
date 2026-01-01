import { test as base, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

// Extend the base test with worker-specific authentication and token management
export const test = base.extend<{}, { workerStorageState: string }>({
  // Worker-scoped fixture that determines which auth file to use
  workerStorageState: [
    async ({ browser }, use, workerInfo) => {
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

  // Page fixture with token rotation handling
  page: async ({ context, workerStorageState }, use, testInfo) => {
    const page = await context.newPage();
    
    // Track if we're updating tokens to prevent race conditions
    let isUpdatingTokens = false;
    
    // Intercept responses to update auth tokens when they change
    page.on('response', async (response) => {
      const headers = response.headers();
      const accessToken = headers['access-token'];
      const client = headers['client'];
      const uid = headers['uid'];
      
      // If new tokens are provided, update both localStorage and the storage state file
      if (accessToken && client && uid && !isUpdatingTokens) {
        isUpdatingTokens = true;
        try {
          // First, update the browser's localStorage immediately
          await page.evaluate(({ accessToken, client, uid }) => {
            const currentHeaders = JSON.parse(localStorage.getItem('headers') || '{}');
            const updatedHeaders = {
              ...currentHeaders,
              'Access-Token': accessToken,
              'Client': client,
              'Uid': uid,
            };
            localStorage.setItem('headers', JSON.stringify(updatedHeaders));
          }, { accessToken, client, uid });
          
          // Then update the storage state file for persistence
          const storageState = await context.storageState();
          const origin = storageState.origins.find(o => o.origin.includes(process.env.E2E_BASE_URL || 'localhost:4200'));
          if (origin) {
            const headersItem = origin.localStorage.find(item => item.name === 'headers');
            if (headersItem) {
              const currentHeaders = JSON.parse(headersItem.value);
              headersItem.value = JSON.stringify({
                ...currentHeaders,
                'Access-Token': accessToken,
                'Client': client,
                'Uid': uid,
              });
              
              // Write the updated state back to the worker's auth file
              fs.writeFileSync(workerStorageState, JSON.stringify(storageState, null, 2));
            }
          }
        } catch (error) {
          // Silently fail - token update is best-effort
         console.warn(`Failed to update tokens for worker ${testInfo.workerIndex}:`, error instanceof Error ? error.message : String(error));
        } finally {
          isUpdatingTokens = false;
        }
      }
    });
    
    await use(page);
    await page.close();
  },
});

export { expect };

// Re-export Page type for convenience
export type { Page, Locator } from '@playwright/test';
