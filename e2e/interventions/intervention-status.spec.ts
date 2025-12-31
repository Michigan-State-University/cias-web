import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { InterventionPage } from '../pages/InterventionPage';

test.describe('Intervention Status Management', () => {
  let dashboardPage: DashboardPage;
  let interventionPage: InterventionPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    interventionPage = new InterventionPage(page);

    // Create an intervention for testing
    await dashboardPage.goto();
    await dashboardPage.createIntervention();
  });

  test('should start with Draft status', async () => {
    const status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('draft');
  });

  test('should publish an intervention', async () => {
    // Verify initial status is Draft
    let status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('draft');

    // Publish the intervention
    await interventionPage.publishIntervention();

    // Verify status changed to Published
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('published');
  });

  test('should pause a published intervention', async ({ page }) => {
    // First publish the intervention
    await interventionPage.publishIntervention();

    // Verify status is Published
    let status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('published');

    // Pause the intervention
    await interventionPage.pauseIntervention();

    // Verify status changed to Paused
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('paused');
  });

  test('should archive a draft intervention', async () => {
    // Verify initial status is Draft
    let status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('draft');

    // Archive the intervention
    await interventionPage.archiveIntervention();

    // Verify status changed to Archived
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('archived');
  });

  test('should go through full lifecycle: Draft -> Published -> Paused -> Published -> Closed', async () => {
    // Verify initial status is Draft
    let status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('draft');

    // Publish the intervention
    await interventionPage.publishIntervention();
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('published');

    // Pause the intervention
    await interventionPage.pauseIntervention();
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('paused');

    // Reactivate the intervention (back to Published)
    await interventionPage.reactivateIntervention();
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('published');

    // Close the intervention
    await interventionPage.closeIntervention();
    status = await interventionPage.getInterventionStatus();
    expect(status.toLowerCase()).toContain('closed');
  });
});
