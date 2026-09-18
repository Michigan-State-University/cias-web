import { test, expect } from '../fixtures/test';
import { DashboardPage } from '../pages/DashboardPage';
import { InterventionPage } from '../pages/InterventionPage';

test.describe('Dashboard - Intervention Management', () => {
  let dashboardPage: DashboardPage;
  let interventionPage: InterventionPage;
  let interventionId: string;
  let interventionName: string;

  test.beforeEach(async ({ page }) => {
    dashboardPage = new DashboardPage(page);
    interventionPage = new InterventionPage(page);

    // Create an intervention for testing
    await dashboardPage.goto();
    await dashboardPage.createIntervention();

    // Get the intervention ID from the URL
    interventionId = await dashboardPage.getInterventionIdFromUrl();
    expect(interventionId).toBeTruthy();

    // Every new intervention is called "New e-Intervention", and the account these
    // tests run as has plenty of those — searching for that name matches all of
    // them, so give this one a name only it has.
    interventionName = `dashboard-${Date.now()}`;
    await interventionPage.editInterventionName(interventionName);
  });

  test.describe('Search functionality', () => {
    test('should filter interventions by name', async ({ page }) => {
      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Search for the intervention by name
      await dashboardPage.searchInterventions(interventionName);

      // The intervention should be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible();
    });

    test('should filter interventions by note', async ({ page }) => {
      // First add a note to the intervention
      const noteText = 'Test note for search ' + Date.now();
      await interventionPage.addNote(noteText);

      // Verify note was saved
      const savedNote = await interventionPage.getNoteText();
      expect(savedNote).toBe(noteText);

      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Search for the intervention by note
      await dashboardPage.searchInterventions(noteText);

      // The intervention should be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible();
    });

    test('should show no results for non-matching search', async ({ page }) => {
      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Search for a non-existing intervention
      const randomSearch = 'nonexistent_intervention_xyz_' + Date.now();
      await dashboardPage.searchInterventions(randomSearch);

      // Wait for search results
      await page.waitForTimeout(1000);

      // The created intervention should not be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).not.toBeVisible();
    });
  });

  test.describe('Star functionality', () => {
    test('should star and unstar an intervention', async ({ page }) => {
      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Star the intervention
      await dashboardPage.starIntervention(interventionId);

      // Wait for the API to respond
      await page.waitForTimeout(500);

      // Unstar the intervention
      await dashboardPage.starIntervention(interventionId);

      // Wait for the API to respond
      await page.waitForTimeout(500);

      // The intervention should still be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible();
    });
  });

  test.describe('Duplicate functionality', () => {
    test('should duplicate an intervention', async ({ page }) => {
      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Get total count before any filtering
      const totalCount = await dashboardPage.getVisibleInterventionCount();
      console.log(`Total interventions on dashboard: ${totalCount}`);

      // Search for the specific intervention by its unique name
      await dashboardPage.searchInterventions(interventionName);

      // Only this intervention carries that name
      await expect(dashboardPage.getVisibleInterventionTiles()).toHaveCount(1);

      // Duplicate the intervention
      await dashboardPage.duplicateIntervention(interventionId);

      // The copy is made by a background job and the dashboard does not refetch on
      // its own, so this reloads and searches again until both show up
      await dashboardPage.waitForSearchResultCount(interventionName, 2);
    });
  });

});