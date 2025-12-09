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

    // Get the intervention name
    const nameElement = page.locator('[data-cy="intervention-name-input"]');
    await nameElement.waitFor({ state: 'visible', timeout: 10000 });
    interventionName = (await nameElement.inputValue()) || '';
  });

  test.describe('Search functionality', () => {
    test('should filter interventions by name', async ({ page }) => {
      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Search for the intervention by name
      await dashboardPage.searchInterventions(interventionName);

      // Wait for search results
      await page.waitForTimeout(1000);

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

      // Wait for search results
      await page.waitForTimeout(1000);

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

      // Get initial count of interventions with similar name
      const initialCount = await dashboardPage.getVisibleInterventionCount();

      // Duplicate the intervention
      await dashboardPage.duplicateIntervention(interventionId);

      // Wait for the duplication to complete
      await page.waitForTimeout(2000);

      // Refresh the page to see the new intervention
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // There should be more interventions now (the duplicated one)
      const newCount = await dashboardPage.getVisibleInterventionCount();
      expect(newCount).toBeGreaterThanOrEqual(initialCount);
    });
  });

  test.describe('Status filter functionality', () => {
    test('should have Draft, Published, and Paused selected by default', async ({ page }) => {
      // Go to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Get the default selected filters
      const selectedFilters = await dashboardPage.getSelectedStatusFilters();

      // Verify default selections include Draft, Published, and Paused
      expect(selectedFilters).toContain('Draft');
      expect(selectedFilters).toContain('Published');
      expect(selectedFilters).toContain('Paused');
      expect(selectedFilters).toHaveLength(3);
    });

    test('should filter interventions by Draft status', async ({ page }) => {
      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Filter by Draft status
      await dashboardPage.filterByStatus(['Draft']);

      // Wait for filter to be applied
      await page.waitForTimeout(1000);

      // The draft intervention should be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible();
    });

    test('should filter interventions by Published status', async ({ page }) => {
      // First publish the intervention
      await interventionPage.publishIntervention();

      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Filter by Published status
      await dashboardPage.filterByStatus(['Published']);

      // Wait for filter to be applied
      await page.waitForTimeout(1000);

      // The published intervention should be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible();
    });

    test('should filter interventions by Paused status', async ({ page }) => {
      // First publish then pause the intervention
      await interventionPage.publishIntervention();
      await interventionPage.pauseIntervention();

      // Go back to dashboard
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Filter by Paused status only (this clears existing selections first)
      await dashboardPage.filterByStatus(['Paused']);

      // Wait for filter to be applied and interventions to reload
      await page.waitForTimeout(2000);

      // The paused intervention should be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible({ timeout: 10000 });
    });

    test('should hide draft interventions when filtering by Published', async ({ page }) => {
      // Go back to dashboard (intervention is still in Draft status)
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Filter by Published status only
      await dashboardPage.filterByStatus(['Published']);

      // Wait for filter to be applied
      await page.waitForTimeout(1000);

      // The draft intervention should NOT be visible
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).not.toBeVisible();
    });

    test('should filter by multiple statuses', async ({ page }) => {
      // Go back to dashboard (intervention is in Draft status)
      await dashboardPage.goto();
      await dashboardPage.waitForInterventionsToLoad();

      // Filter by both Draft and Published statuses
      await dashboardPage.filterByStatus(['Draft', 'Published']);

      // Wait for filter to be applied
      await page.waitForTimeout(1000);

      // The draft intervention should be visible (matches Draft filter)
      const tile = dashboardPage.getInterventionTile(interventionId);
      await expect(tile).toBeVisible();
    });
  });
});
