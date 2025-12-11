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

      await this.page.waitForTimeout(500);
    }
  }

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

  getStatusFilter() {
    return this.page.locator('[data-cy="intervention-status-filter"]');
  }
}
