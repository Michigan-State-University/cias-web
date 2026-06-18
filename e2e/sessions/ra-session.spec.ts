import { test, expect } from '../fixtures/test';
import { DashboardPage, InterventionPage } from '../pages';

test.describe('Research Assistant Sessions', () => {
  test('creates a Research Assistant session', async ({ page }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createRaSession();

    expect(await interventionPage.getSessionCount()).toBe(1);
  });

  test('allows only one Research Assistant session per intervention', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // RA is offered before one exists...
    expect(await interventionPage.isRaSessionTypeAvailable()).toBe(true);

    await interventionPage.createRaSession();

    // ...and no longer offered once the intervention already has one.
    expect(await interventionPage.isRaSessionTypeAvailable()).toBe(false);
  });

  test('blocks duplicating an RA session into an intervention that already has one', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    // Keep the name short — the picker truncates long intervention names with an ellipsis.
    const targetName = `ra-t-${Date.now().toString().slice(-6)}`;

    // Target intervention already has an RA session.
    await dashboardPage.goto();
    await dashboardPage.createIntervention();
    await interventionPage.editInterventionName(targetName);
    const targetInterventionId = await dashboardPage.getInterventionIdFromUrl();
    await interventionPage.createRaSession();

    // Source intervention also has an RA session.
    await page.goto('/');
    await dashboardPage.waitForInterventionsToLoad();
    await dashboardPage.createIntervention();
    await interventionPage.createRaSession();

    // Attempt to copy the source RA session into the target.
    await interventionPage.startInternalSessionCopy(0, targetName);

    // The copy is blocked client-side: an error toast shows and the picker stays open.
    await expect(
      page.getByText(/already has a Research Assistant session/i),
    ).toBeVisible();
    await expect(page.locator('[role="dialog"]')).toBeVisible();

    // The target still has exactly one session — nothing was copied.
    await page.goto(`/interventions/${targetInterventionId}`);
    await page.waitForTimeout(1000);
    expect(await interventionPage.getSessionCount()).toBe(1);
  });

  test('duplicates a Research Assistant session into an intervention without one', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    // Keep the name short — the picker truncates long intervention names with an ellipsis.
    const targetName = `ra-c-${Date.now().toString().slice(-6)}`;

    // Target intervention without an RA session.
    await dashboardPage.goto();
    await dashboardPage.createIntervention();
    await interventionPage.editInterventionName(targetName);
    const targetInterventionId = await dashboardPage.getInterventionIdFromUrl();

    // Source intervention with an RA session.
    await page.goto('/');
    await dashboardPage.waitForInterventionsToLoad();
    await dashboardPage.createIntervention();
    await interventionPage.createRaSession();

    await interventionPage.duplicateSessionInternally(0, targetName);

    await page.goto(`/interventions/${targetInterventionId}`);
    await page.waitForTimeout(1000);

    // The RA session was copied in...
    expect(await interventionPage.getSessionCount()).toBe(1);
    // ...and the target now counts as having an RA session.
    expect(await interventionPage.isRaSessionTypeAvailable()).toBe(false);
  });

  test('keeps the Research Assistant session alongside classic sessions', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createRaSession();
    await interventionPage.createSession('classic');

    expect(await interventionPage.getSessionCount()).toBe(2);
  });

  test('re-enables creating a Research Assistant session after the existing one is deleted', async ({
    page,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    await interventionPage.createRaSession();
    expect(await interventionPage.isRaSessionTypeAvailable()).toBe(false);

    await interventionPage.deleteSession(0);
    await page.waitForTimeout(1000);

    expect(await interventionPage.getSessionCount()).toBe(0);
    expect(await interventionPage.isRaSessionTypeAvailable()).toBe(true);
  });
});
