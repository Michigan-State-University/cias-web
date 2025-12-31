import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage } from '../pages';

test.describe('Session Type Selection Modal', () => {
  
  test('should show modal and allow selecting session type', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createSessionButton.click();

    await expect(page.getByText('Select the type of new session')).toBeVisible();
    
    const classicOption = page.locator('[data-cy="session-type-option-Session::Classic"]');
    const smsOption = page.locator('[data-cy="session-type-option-Session::Sms"]');
    
    await expect(classicOption).toBeVisible();
    await expect(smsOption).toBeVisible();

    const classicRadio = page.locator('#session-type-chooser-Session\\:\\:Classic');
    await expect(classicRadio).toBeChecked();

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

    await page.waitForTimeout(1000);
    expect(await interventionPage.getSessionCount()).toBe(1);
  });

  test('should delete a session', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createSession('classic');
    await interventionPage.createSession('classic');

    expect(await interventionPage.getSessionCount()).toBe(2);

    await interventionPage.deleteSession(0);

    await page.waitForTimeout(1000);
    expect(await interventionPage.getSessionCount()).toBe(1);
  });

  test('should duplicate a session', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createSession('classic');

    expect(await interventionPage.getSessionCount()).toBe(1);

    await interventionPage.duplicateSession(0);

    await page.reload();

    await page.waitForSelector('[data-cy="enter-session-1"]', { timeout: 15000 });

    expect(await interventionPage.getSessionCount()).toBe(2);

    await expect(page.locator('[data-cy^="enter-session-"]').nth(0)).toBeVisible();
    await expect(page.locator('[data-cy^="enter-session-"]').nth(1)).toBeVisible();
  });

  test('should duplicate a session internally to another intervention', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    const uniqueKey = Date.now();
    const sourceName = `source-${uniqueKey}`;
    const targetName = `target-${uniqueKey}`;

    await dashboardPage.goto();

    await dashboardPage.createIntervention();
    await interventionPage.editInterventionName(sourceName);
    const sourceInterventionId = await dashboardPage.getInterventionIdFromUrl();

    await page.goto('/');
    await dashboardPage.waitForInterventionsToLoad();

    await dashboardPage.createIntervention();
    await interventionPage.editInterventionName(targetName);
    const targetInterventionId = await dashboardPage.getInterventionIdFromUrl();

    expect(await interventionPage.getSessionCount()).toBe(0);

    await page.goto(`/interventions/${sourceInterventionId}`);
    await page.waitForTimeout(1000);

    await interventionPage.createSession('classic');
    expect(await interventionPage.getSessionCount()).toBe(1);

    await interventionPage.duplicateSessionInternally(0, targetName);

    await page.goto(`/interventions/${targetInterventionId}`);
    await page.waitForTimeout(1000);

    expect(await interventionPage.getSessionCount()).toBe(1);

    await expect(page.locator('[data-cy="enter-session-0"]')).toBeVisible();
  });
});