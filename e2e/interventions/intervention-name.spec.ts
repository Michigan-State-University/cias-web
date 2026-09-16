import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { InterventionPage } from '../pages/InterventionPage';

test.describe('Edit Intervention Title', () => {
  let dashboardPage: DashboardPage;
  let interventionPage: InterventionPage;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    interventionPage = new InterventionPage(page);

    await dashboardPage.goto();
    await dashboardPage.createIntervention();
  });

  test('should start with Default title', async () => {
    const title = await interventionPage.getInterventionName();
    expect(title).toBe('New e-Intervention');
  });

  test('should edit the intervention title', async () => {
    const newTitle = 'Updated Intervention Title';
    await interventionPage.editInterventionName(newTitle);
    const title = await interventionPage.getInterventionName();
    expect(title).toBe(newTitle);
  });

});
