import { test as setup, expect } from '@playwright/test';
import path from 'path';
import fs from 'fs';

/**
 * Authentication setup for e2e tests with multi-user support.
 * 
 * Environment variables:
 * - E2E_ADMIN_EMAIL_PATTERN: Email pattern with {index} placeholder (default: 'e2e_admin_{index}@example.com')
 * - E2E_ADMIN_PASSWORD: Password for all e2e admin accounts
 * - E2E_VERIFICATION_CODE: 2FA code (if enabled)
 * - E2E_WORKER_COUNT: Number of worker accounts to create auth files for (default: 5)
 * - E2E_AUTH_SETUP_DELAY_MS: Delay in milliseconds between auth attempts to avoid rate limiting (default: 2000)
 */
setup('authenticate admin users for all workers', async ({ browser }) => {
  // Set timeout based on worker count and delay
  // Formula: (WORKER_COUNT * (60s per auth + delay)) with some buffer
  const WORKER_COUNT = parseInt(process.env.E2E_WORKER_COUNT || '5', 10);
  const AUTH_DELAY_MS = parseInt(process.env.E2E_AUTH_SETUP_DELAY_MS || '2000', 10);
  const timeoutMs = WORKER_COUNT * (60000 + AUTH_DELAY_MS) + 30000; // 30s buffer
  
  setup.setTimeout(timeoutMs);
  console.log(`\nSetup timeout set to ${timeoutMs / 1000}s for ${WORKER_COUNT} workers`);

  const emailPattern = process.env.E2E_ADMIN_EMAIL_PATTERN || 'e2e_admin_{index}@example.com';
  const password = process.env.E2E_ADMIN_PASSWORD;
  const verificationCode = process.env.E2E_VERIFICATION_CODE;

  if (!password || !verificationCode) {
    throw new Error(
      'E2E_ADMIN_PASSWORD and E2E_VERIFICATION_CODE environment variables must be set',
    );
  }

  // Create auth directory if it doesn't exist
  const authDir = path.join(__dirname, '.auth');
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }
  
  console.log(`\nAuthenticating ${WORKER_COUNT} admin users...`);
  if (AUTH_DELAY_MS > 0) {
    console.log(`Delay between auth attempts: ${AUTH_DELAY_MS}ms`);
  }

  // Authenticate each admin account separately
  for (let workerIndex = 0; workerIndex < WORKER_COUNT; workerIndex++) {
    const adminEmail = emailPattern.replace('{index}', workerIndex.toString());
    console.log(`\nAuthenticating ${adminEmail}...`);

    // Create a new context and page for each authentication
    const context = await browser.newContext();
    const page = await context.newPage();

    try {
      // Navigate to login page
      await page.goto('/');

      // Fill in login form
      await page.locator('[data-cy="login-email-input"]').fill(adminEmail);
      await page.locator('[data-cy="login-password-input"]').fill(password);

      // Click login button
      await page.locator('[data-cy="login-submit-button"]').click();

      // Check for error messages on the login page
      const errorMessage = page.locator('[role="alert"], .error-message, [class*="error"]');
      
      // Check if 2FA verification is needed
      const verificationInput = page.locator('[data-cy="verification-code-input"]');
      
      // Wait for either verification code input or dashboard navigation
      const result = await Promise.race([
        verificationInput.waitFor({ state: 'visible', timeout: 20000 }).then(() => '2fa'),
        page.waitForURL(/\/$|\/\?/, { timeout: 20000 }).then(() => 'dashboard'),
        errorMessage.first().waitFor({ state: 'visible', timeout: 20000 }).then(() => 'error'),
      ]).catch(() => 'timeout');

      if (result === 'error') {
        const errorText = await errorMessage.first().textContent();
        console.warn(`⚠ Login error for ${adminEmail}: ${errorText}`);
        throw new Error(`Authentication failed for ${adminEmail}: ${errorText}`);
      }

      if (result === 'timeout') {
        throw new Error(`Timeout waiting for login response for ${adminEmail}`);
      }

      if (result === '2fa') {
        await verificationInput.fill(verificationCode);
        await page.locator('[data-cy="verification-submit-button"]').click();
      }

      // Verify we're on the dashboard (root URL, not login)
      await expect(page).not.toHaveURL(/\/login/, { timeout: 30000 });

      // Save the authenticated state for this worker
      const workerAuthFile = path.join(authDir, `admin-worker-${workerIndex}.json`);
      await context.storageState({ path: workerAuthFile });
      console.log(`✓ Created auth file: admin-worker-${workerIndex}.json`);
    } catch (error) {
      // Log error with screenshot for debugging
      console.error(`✗ Failed to authenticate ${adminEmail}:`);
      console.error(error instanceof Error ? error.message : String(error));
      
      // Take screenshot for debugging
      const screenshotPath = path.join(authDir, `error-${adminEmail.replace('@', '-at-')}.png`);
      await page.screenshot({ path: screenshotPath }).catch(() => {});
      console.error(`Screenshot saved to: ${screenshotPath}`);
      
      throw error;
    } finally {
      await page.close();
      await context.close();
    }

    // Add delay between auth attempts to avoid rate limiting (skip for last iteration)
    if (AUTH_DELAY_MS > 0 && workerIndex < WORKER_COUNT - 1) {
      console.log(`Waiting ${AUTH_DELAY_MS}ms before next authentication...`);
      await new Promise(resolve => setTimeout(resolve, AUTH_DELAY_MS));
    }
  }

  console.log(`\n✓ Successfully authenticated ${WORKER_COUNT} admin users`);
  console.log('✓ Each worker will use a separate admin account to avoid rate limiting');
});
