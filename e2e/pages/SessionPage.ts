import { Page, Locator, expect } from '@playwright/test';

import { waitForApiResponse } from '../utils/waitForApiResponse';

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

    await waitForApiResponse(this.page, {
      urlIncludes: '/sessions/',
      method: 'PATCH',
      status: 200,
      timeout: 10000,
    });
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
    return waitForApiResponse(this.page, {
      urlIncludes: '/question_groups',
      method: 'POST',
      status: 201,
      timeout: 15000,
    });
  }

  async addScreen(questionType: 'single' | 'multiple' | 'text' | 'other') {
    const created = this.waitForQuestionCreated();
    await this.clickAddNewScreen();
    await this.selectQuestionType(questionType);
    await created;
    await expect(
      this.page.locator('[data-cy="question-details"]'),
    ).toBeVisible();
  }

  get narratorHandle(): Locator {
    return this.page.locator('#lottie');
  }

  get narratorCharacter(): Locator {
    return this.page.locator('.react-draggable', {
      has: this.page.locator('#lottie'),
    });
  }

  async openNarratorTab() {
    const settingsPanel = this.page.locator('[data-cy="settings-panel"]');
    await expect(settingsPanel).toBeVisible();
    await settingsPanel.getByText('Narrator', { exact: true }).click();
    await expect(
      this.page.locator('[data-cy="narrator-blocks"]'),
    ).toBeVisible();
  }

  narratorBlockHeader(index: number): Locator {
    return this.page
      .locator(`[data-cy="narrator-block-${index}"]`)
      .getByText(new RegExp(`^${index + 1}\\.`))
      .last();
  }

  async openNarratorBlock(index: number) {
    await expect(
      this.page.locator(`[data-cy="narrator-block-${index}"]`),
    ).toBeVisible();

    const cursor = await this.narratorCharacter.evaluate(
      (node) => getComputedStyle(node).cursor,
    );
    if (cursor === 'grab') return;

    await this.narratorBlockHeader(index).click();

    await expect(
      this.narratorCharacter,
      'The narrator never became draggable (NarratorContainer sets cursor: grab ' +
        'only when draggable && editingPossible). Reaching the editor via ' +
        'gotoViaIntervention is known to work; a direct goto may not.',
    ).toHaveCSS('cursor', 'grab');
  }

  async gotoViaIntervention(interventionId: string) {
    await this.page.goto(`/interventions/${interventionId}`);

    const sessionLink = this.page.locator('[data-cy="enter-session-0"]');
    await expect(sessionLink).toBeVisible();
    await sessionLink.click();

    await this.page.waitForURL(/\/sessions\/[^/]+\//, { timeout: 30000 });
    if (!/\/edit$/.test(this.page.url())) {
      await this.page.getByText('Screen Creation').first().click();
    }
    await this.page.waitForURL(/\/edit$/, { timeout: 30000 });

    await this.verifySessionPageLoaded();
    await expect(
      this.page.locator('[data-cy="question-details"]'),
    ).toBeVisible();
  }
}
