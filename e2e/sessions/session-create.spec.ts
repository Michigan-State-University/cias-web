import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage } from '../pages';

test.describe('Session Creation', () => {
  
  test('should create an intervention with 3 sessions', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    for (let i = 0; i < 3; i++) {
      await interventionPage.createSession('classic');
      await page.waitForTimeout(500);
    }

    expect(await interventionPage.getSessionCount()).toBe(3);

    await expect(page.locator('[data-cy^="enter-session-"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(1)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(2)).toBeVisible();
  });

  test('should create different session types', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createSession('classic');
    await interventionPage.createSession('sms');

    expect(await interventionPage.getSessionCount()).toBe(2);
    await expect(page.locator('[data-cy^="enter-session-"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(1)).toBeVisible();
  });

  test('should create session with valid API response', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

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

