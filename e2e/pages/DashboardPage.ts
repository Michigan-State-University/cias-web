import { Page, Locator, expect } from '@playwright/test';

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

    if (this.page.url().includes('/login')) {
      throw new Error('Authentication failed - redirected to login page. Run auth setup again.');
    }

    await this.page.waitForSelector('[data-cy="create-intervention-button"]', {
      timeout: 30000,
    });
  }

  async createIntervention() {
    await this.createInterventionButton.click();
    await this.page.waitForURL(/\/interventions\/.*/, { timeout: 30000 });
  }

  async searchInterventions(searchText: string) {
    await this.searchInput.locator('input').fill(searchText);
    await this.page.waitForTimeout(500);
  }

  async clearSearch() {
    await this.searchInput.locator('input').fill('');
    await this.page.waitForTimeout(500);
  }

  getInterventionTile(interventionId: string): Locator {
    return this.page.locator(`[data-cy="intervention-tile-${interventionId}"]`);
  }

  getVisibleInterventionTiles(): Locator {
    return this.page.locator('[data-cy^="intervention-tile-"]');
  }

  getFirstInterventionTile(): Locator {
    return this.page.locator('[data-cy^="intervention-tile-"]').first();
  }

  async starIntervention(interventionId: string) {
    const starButton = this.page.locator(
      `[data-cy="star-intervention-${interventionId}"]`,
    );
    await starButton.click();
    await this.page.waitForTimeout(500);
  }

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

  async openInterventionDropdown(interventionId: string) {
    const dropdown = this.page.locator(
      `[data-cy="dropdown-trigger-intervention-list-item-options-${interventionId}"]`,
    );
    await dropdown.click();
  }

  async duplicateIntervention(interventionId: string) {
    await this.openInterventionDropdown(interventionId);
    await this.page
      .locator('[data-cy="dropdown-option-duplicateHere"]')
      .click();
    await this.page.waitForTimeout(1000);
  }

  async getVisibleInterventionCount(): Promise<number> {
    return this.getVisibleInterventionTiles().count();
  }

  async isInterventionVisible(name: string): Promise<boolean> {
    const tile = this.page.locator(
      `[data-cy="intervention-tile-name"]:has-text("${name}")`,
    );
    return tile.isVisible();
  }

  async waitForInterventionsToLoad() {
    // Wait for at least one intervention tile or the "no results" message
    await this.page
      .locator('[data-cy^="intervention-tile-"], h3:has-text("No results")')
      .first()
      .waitFor({ timeout: 10000 });
  }

  async getInterventionIdFromUrl(): Promise<string> {
    const url = this.page.url();
    const match = url.match(/\/interventions\/([^/]+)/);
    return match ? match[1] : '';
  }

  // FiltersModal methods
  async openFiltersModal() {
    // Click the filters button (has VscSettings icon)
    const filtersButton = this.page.getByRole('button', { name: /filters/i });
    await filtersButton.click();
    
    // Wait for modal to be visible
    await this.page.locator('[role="dialog"]').waitFor({ state: 'visible', timeout: 5000 });
    await this.page.waitForTimeout(500);
  }

  async closeFiltersModal() {
    // Click close button or press Escape
    const closeButton = this.page.locator('[role="dialog"]').getByRole('button', { name: /close/i });
    if (await closeButton.isVisible({ timeout: 1000 }).catch(() => false)) {
      await closeButton.click();
    } else {
      await this.page.keyboard.press('Escape');
    }
    await this.page.waitForTimeout(500);
  }

  async applyFilters() {
    // Click outside the select to close any open dropdowns
    // Click on the modal header/title area which is safe
    const modalHeader = this.page.locator('[role="dialog"]').locator('h2, h3, [class*="ModalHeader"]').first();
    if (await modalHeader.isVisible({ timeout: 1000 }).catch(() => false)) {
      await modalHeader.click();
      await this.page.waitForTimeout(300);
    }
    
    // Press Escape as backup to close dropdowns
    await this.page.keyboard.press('Escape');
    await this.page.waitForTimeout(300);
    
    // Click the Apply button in the modal
    const applyButton = this.page.locator('[role="dialog"]').getByRole('button', { name: /apply/i });
    await applyButton.click({ timeout: 10000 });
    
    // Wait for modal to close and filters to be applied
    await this.page.locator('[role="dialog"]').waitFor({ state: 'hidden', timeout: 5000 });
    await this.page.waitForTimeout(1000); // Wait for interventions to reload with filters
  }

  async filterByStatus(statuses: string[], clearFirst: boolean = true) {
    const statusFilter = this.page.locator('[data-cy="intervention-status-filter"]');
    const selectInput = statusFilter.locator('#status-filter-input');

    // Clear existing selections if requested
    if (clearFirst) {
      await this.clearStatusFilterInModal();
      await this.page.waitForTimeout(300);
    }

    for (const status of statuses) {
      // Click on the select input to open the dropdown
      await selectInput.click();
      await this.page.waitForTimeout(300);

      // Find and click the option with the matching status
      // ReactSelect creates options with role="option"
      const option = this.page.locator(`[role="option"]`, {
        hasText: new RegExp(`^${status}$`, 'i'),
      });
      await option.first().click();

      // Wait for the option to be selected
      await this.page.waitForTimeout(300);
      
      // Close the dropdown by pressing Escape
      await this.page.keyboard.press('Escape');
      await this.page.waitForTimeout(300);
    }
  }

  async clearStatusFilterInModal() {
    const statusFilter = this.page.locator('[data-cy="intervention-status-filter"]');
    
    // React-select has a clear indicator (X button) that clears all selections
    const clearIndicator = statusFilter.locator('[class*="clearIndicator"]');
    
    if (await clearIndicator.isVisible({ timeout: 1000 }).catch(() => false)) {
      await clearIndicator.click();
      await this.page.waitForTimeout(500);
      return;
    }

    // Fallback: remove each value individually by clicking the remove button on each multi-value
    const removeButtons = statusFilter.locator('[class*="multiValueRemove"]');
    let count = await removeButtons.count();
    while (count > 0) {
      await removeButtons.first().click();
      await this.page.waitForTimeout(200);
      count = await removeButtons.count();
    }
    await this.page.waitForTimeout(300);
  }

  async getSelectedStatusFiltersInModal(): Promise<string[]> {
    const statusFilter = this.page.locator('[data-cy="intervention-status-filter"]');
    
    // Wait for the select to be visible
    await statusFilter.waitFor({ state: 'visible', timeout: 5000 });
    
    // React-select renders selected values in divs with class containing 'multiValue'
    const multiValues = statusFilter.locator('[class*="multiValue"]');
    
    // Wait a bit for values to render
    await this.page.waitForTimeout(500);
    
    const count = await multiValues.count();
    
    // If no values are selected, return empty array
    if (count === 0) {
      return [];
    }
    
    const values: string[] = [];
    for (let i = 0; i < count; i++) {
      // Get the label part of the multi-value (not the remove button)
      const label = multiValues.nth(i).locator('[class*="multiValueLabel"]');
      
      // Use allTextContents to avoid timeout issues
      const texts = await label.allTextContents();
      if (texts.length > 0 && texts[0]) {
        values.push(texts[0].trim());
      }
    }
    
    return values;
  }

  getStatusFilter() {
    return this.page.locator('[data-cy="intervention-status-filter"]');
  }
}
