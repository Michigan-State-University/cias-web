import { test as setup, expect } from '@playwright/test';
import path from 'path';

const authFile = path.join(__dirname, '.auth/admin.json');

setup('authenticate as admin', async ({ page }) => {
  const adminEmail = process.env.E2E_ADMIN_EMAIL;
  const password = process.env.E2E_ADMIN_PASSWORD;
  const verificationCode = process.env.E2E_VERIFICATION_CODE;

  if (!adminEmail || !password || !verificationCode) {
    throw new Error(
      'E2E_ADMIN_EMAIL, E2E_VERIFICATION_CODE and E2E_ADMIN_PASSWORD environment variables must be set',
    );
  }

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

  // Save signed-in state to file
  await page.context().storageState({ path: authFile });
});
