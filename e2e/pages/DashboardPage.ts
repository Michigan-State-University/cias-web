import { Page, Locator, expect } from '@playwright/test';

/**
 * Page Object Model for the Dashboard page
 */
export class DashboardPage {
  readonly page: Page;
  readonly createInterventionButton: Locator;
  readonly searchInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createInterventionButton = page.locator(
      '[data-cy="create-intervention-button"]',
    );
    this.searchInput = page.locator('[data-cy="intervention-search-input"]');
  }

  async goto() {
    await this.page.goto('/');
    // Wait for dashboard to load
    await this.page.waitForSelector('[data-cy="create-intervention-button"]', {
      timeout: 30000,
    });
  }

  async createIntervention() {
    await this.createInterventionButton.click();
    // Wait for the intervention to be created and page to navigate
    await this.page.waitForURL(/\/interventions\/.*/, { timeout: 30000 });
  }

  /**
   * Search for interventions by name or note
   */
  async searchInterventions(searchText: string) {
    await this.searchInput.locator('input').fill(searchText);
    // Wait for debounce and API response
    await this.page.waitForTimeout(500);
  }

  /**
   * Clear the search input
   */
  async clearSearch() {
    await this.searchInput.locator('input').fill('');
    await this.page.waitForTimeout(500);
  }

  /**
   * Get an intervention tile by its ID
   */
  getInterventionTile(interventionId: string): Locator {
    return this.page.locator(`[data-cy="intervention-tile-${interventionId}"]`);
  }

  /**
   * Get all visible intervention tiles
   */
  getVisibleInterventionTiles(): Locator {
    return this.page.locator('[data-cy^="intervention-tile-"]');
  }

  /**
   * Get the first intervention tile
   */
  getFirstInterventionTile(): Locator {
    return this.page.locator('[data-cy^="intervention-tile-"]').first();
  }

  /**
   * Star an intervention by its ID
   */
  async starIntervention(interventionId: string) {
    const starButton = this.page.locator(
      `[data-cy="star-intervention-${interventionId}"]`,
    );
    await starButton.click();
    // Wait for API response
    await this.page.waitForTimeout(500);
  }

  /**
   * Check if an intervention is starred
   */
  async isInterventionStarred(interventionId: string): Promise<boolean> {
    const starButton = this.page.locator(
      `[data-cy="star-intervention-${interventionId}"]`,
    );
    const fill = await starButton.evaluate((el) => {
      const svg = el.querySelector('svg');
      return svg ? getComputedStyle(svg).fill : '';
    });
    // If fill is not 'inherit' or transparent, it's starred
    return fill !== 'inherit' && fill !== 'none' && fill !== '';
  }

  /**
   * Open the dropdown menu for an intervention
   */
  async openInterventionDropdown(interventionId: string) {
    const dropdown = this.page.locator(
      `[data-cy="dropdown-trigger-intervention-list-item-options-${interventionId}"]`,
    );
    await dropdown.click();
  }

  /**
   * Duplicate an intervention from the dashboard
   */
  async duplicateIntervention(interventionId: string) {
    await this.openInterventionDropdown(interventionId);
    await this.page
      .locator('[data-cy="dropdown-option-duplicateHere"]')
      .click();
    // Wait for duplication to complete
    await this.page.waitForTimeout(1000);
  }

  /**
   * Get the count of visible intervention tiles
   */
  async getVisibleInterventionCount(): Promise<number> {
    return this.getVisibleInterventionTiles().count();
  }

  /**
   * Check if an intervention with the given name is visible
   */
  async isInterventionVisible(name: string): Promise<boolean> {
    const tile = this.page.locator(
      `[data-cy="intervention-tile-name"]:has-text("${name}")`,
    );
    return tile.isVisible();
  }

  /**
   * Wait for interventions to load
   */
  async waitForInterventionsToLoad() {
    // Wait for at least one intervention tile or the "no results" message
    await this.page
      .locator('[data-cy^="intervention-tile-"], h3:has-text("No results")')
      .first()
      .waitFor({ timeout: 10000 });
  }

  /**
   * Get intervention ID from the URL after creating an intervention
   */
  async getInterventionIdFromUrl(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/\/interventions\/([^/]+)/);
    return match ? match[1] : '';
  }

  /**
   * Filter interventions by status using the status filter dropdown
   * @param statuses Array of status values to filter by (e.g., ['Draft', 'Published', 'Paused'])
   * @param clearFirst Whether to clear existing selections first (default: true)
   */
  async filterByStatus(statuses: string[], clearFirst: boolean = true) {
    const statusFilter = this.page.locator('[data-cy="intervention-status-filter"]');
    const selectInput = statusFilter.locator('#status-filter-input');

    // Clear existing selections if requested
    if (clearFirst) {
      await this.clearStatusFilter();
      await this.page.waitForTimeout(300);
    }

    for (const status of statuses) {
      // Click on the select input to open the dropdown
      await selectInput.click();

      // Find and click the option with the matching status
      // ReactSelect creates options with role="option"
      const option = this.page.locator(`[role="option"]`, {
        hasText: new RegExp(`^${status}$`, 'i'),
      });
      await option.first().click();

      // Wait for the filter to be applied
      await this.page.waitForTimeout(500);
    }
  }

  /**
   * Clear status filter - removes all selected statuses
   */
  async clearStatusFilter() {
    const statusFilter = this.page.locator('[data-cy="intervention-status-filter"]');
    
    // Try clicking the clear all button first (the X indicator)
    const clearButton = statusFilter.locator('[class*="clearIndicator"], svg[height="20"][width="20"]').first();
    if (await clearButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await clearButton.click();
      await this.page.waitForTimeout(500);
      return;
    }

    // Fallback: remove each selected value one by one
    const removeButtons = statusFilter.getByRole('button', { name: /^Remove / });
    let count = await removeButtons.count();
    while (count > 0) {
      await removeButtons.first().click();
      await this.page.waitForTimeout(200);
      count = await removeButtons.count();
    }
    await this.page.waitForTimeout(300);
  }

  /**
   * Get currently selected status filter values
   * @returns Array of selected status labels
   */
  async getSelectedStatusFilters(): Promise<string[]> {
    const statusFilter = this.page.locator('[data-cy="intervention-status-filter"]');
    // Get all remove buttons by their accessible name pattern
    const removeButtons = statusFilter.getByRole('button', { name: /^Remove / });
    const count = await removeButtons.count();
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      const name = await removeButtons.nth(i).getAttribute('aria-label') || 
                   await removeButtons.nth(i).textContent();
      if (name) {
        // Extract status name from "Remove Draft", "Remove Paused", etc.
        const status = name.replace('Remove ', '').trim();
        if (status) values.push(status);
      }
    }
    return values;
  }

  /**
   * Get the status filter container
   */
  getStatusFilter() {
    return this.page.locator('[data-cy="intervention-status-filter"]');
  }
}
