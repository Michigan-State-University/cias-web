import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage } from '../pages';

/**
 * E2E Tests for Session Creation
 * 
 * Verifies creating sessions within interventions following Playwright best practices
 */
test.describe('Session Creation', () => {
  
  /**
   * Test: Create intervention with 3 sessions
   * 
   * Verifies:
   * - Creating multiple sessions in one intervention
   * - Sessions are displayed with correct enter buttons
   * - Session count is accurate
   */
  test('should create an intervention with 3 sessions', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Create 3 sessions
    for (let i = 0; i < 3; i++) {
      await interventionPage.createSession('classic');
      await page.waitForTimeout(500);
    }

    // Verify all sessions created
    expect(await interventionPage.getSessionCount()).toBe(3);

    // Verify all enter buttons visible
    await expect(page.locator('[data-cy^="enter-session-"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(1)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(2)).toBeVisible();
  });

  /**
   * Test: Create different session types
   * 
   * Verifies:
   * - Creating Classic and SMS session types
   * - Both session types are properly displayed
   */
  test('should create different session types', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Create classic and SMS sessions
    await interventionPage.createSession('classic');
    await interventionPage.createSession('sms');

    // Verify both created and visible
    expect(await interventionPage.getSessionCount()).toBe(2);
    await expect(page.locator('[data-cy^="enter-session-"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(1)).toBeVisible();
  });

  /**
   * Test: Session creation with API validation
   * 
   * Verifies:
   * - API returns 201 status
   * - Response contains proper session data
   */
  test('should create session with valid API response', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Monitor API call
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await interventionPage.createSession('classic');

    const response = await responsePromise;
    expect(response.status()).toBe(201);
    
    const responseBody = await response.json();
    expect(responseBody).toHaveProperty('data');
    expect(responseBody.data).toHaveProperty('id');
  });
});

