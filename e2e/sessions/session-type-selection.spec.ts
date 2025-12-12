import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage } from '../pages';

/**
 * E2E Tests for Session Type Selection Modal
 * 
 * Verifies modal behavior based on DISABLED_SMS_CAMPAIGN environment variable:
 * - When false/not set: Modal shows with Classic and SMS options
 * - When true: Modal doesn't show, creates Classic session directly
 */
test.describe('Session Type Selection Modal', () => {
  
  /**
   * Test: Modal allows selecting session type and creating session
   * 
   * Verifies:
   * 1. Modal appears with both Classic and SMS options
   * 2. Classic session is pre-selected by default
   * 3. User can select SMS Campaign option
   * 4. Creating session works for selected type
   */
  test('should show modal and allow selecting session type', async ({ page }) => {
    // Arrange
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Act: Click create session button
    await interventionPage.createSessionButton.click();

    // Assert: Modal should appear with both options
    await expect(page.getByText('Select the type of new session')).toBeVisible();
    
    const classicOption = page.locator('[data-cy="session-type-option-Session::Classic"]');
    const smsOption = page.locator('[data-cy="session-type-option-Session::Sms"]');
    
    await expect(classicOption).toBeVisible();
    await expect(smsOption).toBeVisible();

    // Assert: Classic is pre-selected
    const classicRadio = page.locator('#session-type-chooser-Session\\:\\:Classic');
    await expect(classicRadio).toBeChecked();

    // Act: Switch to SMS option and create
    await smsOption.click();
    
    const responsePromise = page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );

    await page.locator('[data-cy="create-session-submit-button"]').click();
    await responsePromise;

    // Assert: Session created
    await page.waitForTimeout(1000);
    expect(await interventionPage.getSessionCount()).toBe(1);
  });

  /**
   * Test: Delete a session
   * 
   * Verifies:
   * 1. User can delete a session
   * 2. Session count decreases after deletion
   * 3. DELETE API request is sent successfully
   */
  test('should delete a session', async ({ page }) => {
    // Arrange: Create intervention with 2 sessions
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createSession('classic');
    await interventionPage.createSession('classic');

    // Verify initial count
    expect(await interventionPage.getSessionCount()).toBe(2);

    // Act: Delete the first session (deleteSession already waits for API response)
    await interventionPage.deleteSession(0);

    // Assert: Session count should decrease
    await page.waitForTimeout(1000);
    expect(await interventionPage.getSessionCount()).toBe(1);
  });

  /**
   * Test: Duplicate a session
   * 
   * Verifies:
   * 1. User can duplicate an existing session
   * 2. Session count increases after duplication
   * 3. Clone API request is sent successfully
   */
  test('should duplicate a session', async ({ page }) => {
    // Arrange: Create intervention with 1 session
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createSession('classic');

    // Verify initial count
    expect(await interventionPage.getSessionCount()).toBe(1);

    // Act: Duplicate the session (duplicateSession already waits for API response)
    await interventionPage.duplicateSession(0);

    // The clone operation doesn't immediately update the UI, need to reload
    await page.reload();

    // Assert: Wait for second session to appear in the DOM
    await page.waitForSelector('[data-cy="enter-session-1"]', { timeout: 15000 });
    
    // Session count should increase
    expect(await interventionPage.getSessionCount()).toBe(2);

    // Verify both sessions are visible
    await expect(page.locator('[data-cy^="enter-session-"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(1)).toBeVisible();
  });
});

/**
 * Note: Testing when DISABLED_SMS_CAMPAIGN=true
 * 
 * When the feature is disabled, modal should NOT appear and classic session
 * is created directly. This requires setting the environment variable:
 * 
 * DISABLED_SMS_CAMPAIGN=true npm run e2e -- e2e/sessions/session-type-selection.spec.ts
 */

