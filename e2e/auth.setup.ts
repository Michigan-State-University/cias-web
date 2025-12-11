import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Authentication setup for e2e tests with token rotation support.
 * 
 * Important: Since the backend rotates tokens after each request and we can't have
 * multiple active sessions from the same user, we create ONE auth session and copy
 * it to multiple worker files. The token rotation will be handled by the test
 * fixtures which update tokens dynamically from response headers.
 * 
 * This approach works because:
 * 1. Each worker starts with a copy of the same initial auth state
 * 2. After the first request, each worker's auth file diverges (different tokens)
 * 3. The page fixture intercepts responses and updates tokens per-worker
 * 4. Workers maintain isolated auth states throughout test execution
 */
setup('authenticate admin for all workers', async ({ page }) => {
  const adminEmail = process.env.E2E_ADMIN_EMAIL;
  const password = process.env.E2E_ADMIN_PASSWORD;
  const verificationCode = process.env.E2E_VERIFICATION_CODE;

  if (!adminEmail || !password || !verificationCode) {
    throw new Error(
      'E2E_ADMIN_EMAIL, E2E_VERIFICATION_CODE and E2E_ADMIN_PASSWORD environment variables must be set',
    );
  }

  // Create auth directory if it doesn't exist
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  console.log('\nAuthenticating admin user...');

  // Navigate to login page
  await page.goto('/');

  // Fill in login form
  await page.locator('[data-cy="login-email-input"]').fill(adminEmail);
  await page.locator('[data-cy="login-password-input"]').fill(password);

  // Click login button
  await page.locator('[data-cy="login-submit-button"]').click();

  // Check if 2FA verification is needed
  const verificationInput = page.locator('[data-cy="verification-code-input"]');
  const isOnDashboard = page.waitForURL(/\/$|\/\?/, { timeout: 5000 }).catch(() => null);

  // Wait for either verification code input or dashboard
  const result = await Promise.race([
    verificationInput.waitFor({ state: 'visible', timeout: 10000 }).then(() => '2fa'),
    isOnDashboard.then(() => 'dashboard'),
  ]);

  if (result === '2fa') {
    await verificationInput.fill(verificationCode);
    await page.locator('[data-cy="verification-submit-button"]').click();
  }

  // Verify we're on the dashboard (root URL, not login)
  await expect(page).not.toHaveURL(/\/login/, { timeout: 30000 });

  // Save the authenticated state
  const mainAuthFile = path.join(authDir, 'admin.json');
  await page.context().storageState({ path: mainAuthFile });
  console.log('✓ Created main auth file: admin.json');

  // Copy the auth state to worker-specific files
  // Default to 5 workers (can be overridden by environment variable)
  const WORKER_COUNT = parseInt(process.env.E2E_WORKER_COUNT || '5', 10);
  const authContent = fs.readFileSync(mainAuthFile, 'utf-8');

  console.log(`\nCreating ${WORKER_COUNT} worker-specific auth files...`);
  for (let workerIndex = 0; workerIndex < WORKER_COUNT; workerIndex++) {
    const workerAuthFile = path.join(authDir, `admin-worker-${workerIndex}.json`);
    fs.writeFileSync(workerAuthFile, authContent);
    console.log(`✓ Created auth file: admin-worker-${workerIndex}.json`);
  }

  console.log(`\n✓ Successfully created auth files for ${WORKER_COUNT} workers`);
  console.log('✓ Each worker will maintain independent token state during test execution');
});
