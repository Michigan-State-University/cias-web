import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage } from '../pages';

test.describe('Create Intervention by Admin', () => {
  test('should create an intervention with a session', async ({ page }) => {
    // Initialize page objects
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    // Navigate to dashboard and create intervention
    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Create a session in the intervention
    await interventionPage.createSession();

    // Verify session was created
    const enterButton = page.locator('[data-cy="enter-session-0"]');
    await expect(enterButton).toBeVisible();
  });

  test('should create an intervention with multiple sessions', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    // Navigate to dashboard and create intervention
    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Create multiple sessions
    await interventionPage.createMultipleSessions(3);

    // Verify all sessions were created by checking for enter buttons
    for (let i = 0; i < 3; i++) {
      const enterButton = page.locator(`[data-cy="enter-session-${i}"]`);
      await expect(enterButton).toBeVisible();
    }
  });

  test('should delete a session from an intervention', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    // Navigate to dashboard and create intervention
    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Create two sessions
    await interventionPage.createMultipleSessions(2);

    // Verify we have 2 sessions
    let sessionCount = await interventionPage.getSessionCount();
    expect(sessionCount).toBe(2);

    // Delete the first session
    await interventionPage.deleteSession(0);

    // Wait for UI to update
    await page.waitForTimeout(1000);

    // Verify we now have 1 session
    sessionCount = await interventionPage.getSessionCount();
    expect(sessionCount).toBe(1);
  });

  test('should duplicate a session in an intervention', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    // Navigate to dashboard and create intervention
    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Create one session
    await interventionPage.createSession();

    // Verify we have 1 session
    let sessionCount = await interventionPage.getSessionCount();
    expect(sessionCount).toBe(1);

    // Duplicate the session
    await interventionPage.duplicateSession(0);

    // The clone operation doesn't immediately update the UI, need to reload
    await page.reload();

    // Wait for second session to appear in the DOM
    await page.waitForSelector('[data-cy="enter-session-1"]', { timeout: 15000 });

    // Verify we now have 2 sessions
    sessionCount = await interventionPage.getSessionCount();
    expect(sessionCount).toBe(2);
  });
});
