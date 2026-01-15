import { Page, Locator, expect } from '@playwright/test';

export class SessionPage {
  readonly page: Page;
  readonly backToInterventionButton: Locator;
  readonly sessionNameInput: Locator;
  readonly contentTab: Locator;
  readonly settingsTab: Locator;
  readonly branchingTab: Locator;

  constructor(page: Page) {
    this.page = page;
    this.backToInterventionButton = page.locator('[data-cy="back-intervention-button"]');
    this.sessionNameInput = page.locator('[data-cy="session-name-input"]');
    this.contentTab = page.locator('a:has-text("Content")');
    this.settingsTab = page.locator('a:has-text("Settings")');
    this.branchingTab = page.locator('a:has-text("Branching")');
  }

  async goto(interventionId: string, sessionId: string) {
    await this.page.goto(`/interventions/${interventionId}/sessions/${sessionId}/edit`);
    await this.verifySessionPageLoaded();
  }

  async goBackToIntervention() {
    await this.backToInterventionButton.click();
    await this.page.waitForURL(/\/interventions\/[^\/]+$/, { timeout: 10000 });
  }

  async updateSessionName(newName: string) {
    await this.sessionNameInput.waitFor({ state: 'visible', timeout: 10000 });
    
    const input = this.sessionNameInput.locator('input');
    await input.click();
    await input.fill(newName);
    
    await this.page.keyboard.press('Tab');

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/sessions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );
  }

  async getSessionName(): Promise<string> {
    await this.sessionNameInput.waitFor({ state: 'visible', timeout: 10000 });
    const input = this.sessionNameInput.locator('input');
    return input.inputValue();
  }

  async goToSettings() {
    await this.settingsTab.click();
    await this.page.waitForURL(/\/settings$/, { timeout: 10000 });
  }

  async goToBranching() {
    await this.branchingTab.click();
    await this.page.waitForURL(/\/branching$/, { timeout: 10000 });
  }

  async goToContent() {
    await this.contentTab.click();
    await this.page.waitForURL(/\/edit$/, { timeout: 10000 });
  }

  async verifySessionPageLoaded() {
    await expect(this.sessionNameInput).toBeVisible();
    await expect(this.backToInterventionButton).toBeVisible();
  }

  async isOnSessionPage(): Promise<boolean> {
    return this.page.url().includes('/sessions/');
  }

  /**
   * Click the "+ Add new screen" button
   */
  async clickAddNewScreen() {
    const addScreenButton = this.page.locator('[data-cy="add-screen-button"]');
    await addScreenButton.waitFor({ state: 'visible', timeout: 10000 });
    await addScreenButton.click();
  }

  /**
   * Select a question type from the question type chooser
   */
  async selectQuestionType(questionType: 'single' | 'multiple' | 'text' | 'other') {
    const questionTypeSelector = this.page.locator(`[data-cy="question-type-${questionType}"]`);
    await questionTypeSelector.waitFor({ state: 'visible', timeout: 5000 });
    await questionTypeSelector.click();
  }

  /**
   * Wait for a question to be created via API
   */
  async waitForQuestionCreated() {
    return this.page.waitForResponse(
      (response) =>
        response.url().includes('/question_groups') &&
        response.request().method() === 'POST' &&
        response.status() === 201,
      { timeout: 15000 }
    );
  }
}
