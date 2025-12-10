import { Page, Locator, expect } from '@playwright/test';

// Access setting types
export enum InterventionAccessType {
  ANYONE = 'anyone',
  REGISTERED = 'registered',
  INVITED = 'invited',
}

// Intervention types (matches backend values)
export enum InterventionType {
  DEFAULT = 'Intervention',
  FIXED = 'Intervention::FixedOrder',
  FLEXIBLE = 'Intervention::FlexibleOrder',
}

export class InterventionPage {
  readonly page: Page;
  readonly createSessionButton: Locator;
  readonly backButton: Locator;
  readonly nameInput: Locator;
  readonly noteInput: Locator;
  readonly settingsPanel: Locator;

  constructor(page: Page) {
    this.page = page;
    this.createSessionButton = page.locator('[data-cy="create-session-button"]');
    this.backButton = page.locator('[data-cy="back-intervention-button"]');
    this.nameInput = page.locator('[data-cy="intervention-name-input"]');
    this.noteInput = page.locator('[data-cy="intervention-note-input"]');
    this.settingsPanel = page.locator('[data-cy="intervention-settings-panel"]');
  }

  async createSession(sessionType: 'classic' | 'sms' = 'classic') {
    // Check if the create session dialog is already open (from a previous action)
    const createSessionDialogButton = this.page.locator('button:has-text("Create session")');
    let dialogAlreadyOpen = await createSessionDialogButton.isVisible().catch(() => false);

    if (!dialogAlreadyOpen) {
      // Wait for any existing dialog/modal to close first
      const modalPortal = this.page.locator('#modal-portal [role="dialog"]');
      const modalVisible = await modalPortal.isVisible().catch(() => false);
      if (modalVisible) {
        // Close the modal by pressing Escape or clicking outside
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(500);
      }

      // Wait for the create session button to be visible and click it
      await this.createSessionButton.waitFor({ state: 'visible', timeout: 10000 });
      await this.createSessionButton.click();

      // Wait for the dialog to appear
      await createSessionDialogButton.waitFor({ state: 'visible', timeout: 5000 });
    }

    // Select session type in the dialog (Classic is pre-selected)
    if (sessionType === 'classic') {
      const classicOption = this.page.getByText('Classic session', { exact: true });
      if (await classicOption.isVisible()) {
        await classicOption.click();
      }
    } else {
      const smsOption = this.page.getByText('SMS Campaign', { exact: true });
      await smsOption.click();
    }

    // Intercept the API call before clicking create
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/sessions') &&
        response.request().method() === 'POST',
      { timeout: 15000 },
    );

    // Click the create session button in the dialog
    await createSessionDialogButton.click();

    const response = await responsePromise;
    expect(response.status()).toBe(201);

    await this.page.waitForTimeout(1000);
  }

  async createMultipleSessions(count: number) {
    for (let i = 0; i < count; i++) {
      await this.createSession();
    }
  }

  async enterSession(index: number = 0) {
    const enterSessionButton = this.page.locator(
      `[data-cy="enter-session-${index}"]`,
    );
    await enterSessionButton.click();
    await this.page.waitForURL(/\/edit/, { timeout: 30000 });
  }

  async goBackToIntervention() {
    await this.backButton.click();
  }

  async getSessionCount(): Promise<number> {
    const sessions = this.page.locator('[data-cy^="enter-session-"]');
    return sessions.count();
  }

  async deleteSession(sessionIndex: number) {
    // We need to find the session ID from the dropdown trigger
    // The sessions have data-cy="enter-session-{index}" and the dropdown is in the same container
    const sessionContainer = this.page
      .locator(`[data-cy="enter-session-${sessionIndex}"]`)
      .locator('..')
      .locator('..')
      .locator('..')
      .locator('..');

    // Find and click the dropdown trigger (dots icon)
    const dropdownTrigger = sessionContainer.locator('[data-cy^="dropdown-trigger-"]');
    await dropdownTrigger.click();

    // Wait for dropdown to open and click delete option
    const deleteOption = this.page.locator('[data-cy="dropdown-option-delete"]');
    await deleteOption.waitFor({ state: 'visible', timeout: 5000 });

    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/sessions/') &&
        response.request().method() === 'DELETE',
    );

    await deleteOption.click();

    // Handle confirmation modal if present
    const confirmButton = this.page.locator('button:has-text("Confirm")');
    if (await confirmButton.isVisible({ timeout: 2000 }).catch(() => false)) {
      await confirmButton.click();
    }

    await responsePromise;
  }

  async duplicateSession(sessionIndex: number) {
    // Find all dropdown triggers (session options menus) and click the one at the specified index
    const dropdownTriggers = this.page.locator('[data-cy^="dropdown-trigger-session-list-item-options"]');
    await dropdownTriggers.nth(sessionIndex).click();

    // Wait for dropdown to open and click duplicate option
    const duplicateOption = this.page.locator('[data-cy="dropdown-option-duplicate"]');
    await duplicateOption.waitFor({ state: 'visible', timeout: 5000 });

    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/sessions/') &&
        response.url().includes('/clone') &&
        response.request().method() === 'POST',
      { timeout: 15000 },
    );

    await duplicateOption.click();

    await responsePromise;
  }

  async addNote(noteText: string) {
    await this.noteInput.waitFor({ state: 'visible', timeout: 10000 });

    const textarea = this.noteInput.locator('textarea');
    
    await textarea.click();
    await textarea.fill(noteText);

    // Click outside to trigger the save (blur triggers save in ApprovableInput)
    await this.page.locator('h2:has-text("Note")').click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );
  }

  async getNoteText(): Promise<string> {
    await this.noteInput.waitFor({ state: 'visible', timeout: 10000 });
    const textarea = this.noteInput.locator('textarea');
    return textarea.inputValue();
  }

  async changeAccessSettings(accessType: InterventionAccessType) {
    // Click on the label instead of the hidden radio input
    const labelSelector = `label[for="access-radio-${accessType}"]`;
    const label = this.page.locator(labelSelector);
    const radioInput = this.page.locator(`#access-radio-${accessType}`);

    await label.waitFor({ state: 'visible', timeout: 10000 });

    // Check if already selected
    const isChecked = await radioInput.isChecked();
    if (isChecked) {
      // Already selected, no API call will be made
      return;
    }

    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );

    await label.click();

    await responsePromise;
  }

  async getSelectedAccessSetting(): Promise<InterventionAccessType | null> {
    // Check each access type radio to find the selected one
    const accessTypes: InterventionAccessType[] = [
      InterventionAccessType.ANYONE,
      InterventionAccessType.REGISTERED,
      InterventionAccessType.INVITED,
    ];
    
    for (const accessType of accessTypes) {
      const radio = this.page.locator(`#access-radio-${accessType}`);
      if (await radio.isChecked()) {
        return accessType;
      }
    }
    return null;
  }

  async changeInterventionType(type: InterventionType) {
    // Click on the label instead of the hidden radio input
    const labelSelector = `label[for="access-radio-${type}"]`;
    const label = this.page.locator(labelSelector);

    await label.waitFor({ state: 'visible', timeout: 10000 });
    await label.click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );
  }

  async addInvitedParticipant(email: string) {
    // The hidden input for adding emails
    const emailInput = this.page.locator('[data-cy="hidden-input"]');
    await emailInput.fill(email);
    await emailInput.press('Enter');

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') && response.status() === 200,
      { timeout: 10000 },
    );
  }

  async isSessionScheduleVisible(sessionIndex: number): Promise<boolean> {
    // Session schedule is shown for sessions after the first one
    // Each session with schedule has [data-cy="session-schedule"]
    const scheduleElements = this.page.locator('[data-cy="session-schedule"]');
    const count = await scheduleElements.count();
    
    // First session (index 0) never has schedule
    if (sessionIndex === 0) {
      // Check if first session has NO schedule by verifying the element isn't in first session tile
      return false; // First session should never have schedule in sequential type
    }
    
    // For subsequent sessions, check if schedule exists
    // The nth schedule element corresponds to session index - 1 (since first session has none)
    if (sessionIndex - 1 < count) {
      return scheduleElements.nth(sessionIndex - 1).isVisible();
    }
    return false;
  }

  async isEstimateTimeVisible(sessionIndex: number): Promise<boolean> {
    const estimateElements = this.page.locator('[data-cy="session-estimate-time"]');
    const count = await estimateElements.count();
    
    if (sessionIndex < count) {
      return estimateElements.nth(sessionIndex).isVisible();
    }
    return false;
  }

  getSessionScheduleSelector(sessionIndex: number) {
    // Find the session tile first, then look for schedule selector within its container
    // The session tiles are in a list, and each has schedule options
    const sessionSchedules = this.page.locator('[data-cy="session-schedule"]');
    // For session index 1 (second session), it's the first schedule element (first session has no schedule)
    // Adjust index as only sessions after first have schedule
    return sessionSchedules.nth(sessionIndex > 0 ? sessionIndex - 1 : 0).locator('[data-cy="session-schedule-selector"]');
  }

  getEstimateTimeInput(sessionIndex: number) {
    // Find all estimate time inputs and get the one at the specified index
    const estimateInputs = this.page.locator('[data-cy="session-estimate-time-input"]');
    return estimateInputs.nth(sessionIndex);
  }

  async setEstimateTime(sessionIndex: number, minutes: string) {
    const input = this.getEstimateTimeInput(sessionIndex);
    
    const responsePromise = this.page.waitForResponse(
      (response) =>
        response.url().includes('/sessions/') &&
        response.request().method() === 'PUT' &&
        response.status() === 200,
      { timeout: 10000 },
    );
    
    await input.fill(minutes);
    await input.blur();

    await responsePromise;
  }

  async getInterventionStatus(): Promise<string> {
    const statusLabel = this.page.locator('[data-cy="intervention-status"]');
    await statusLabel.waitFor({ state: 'visible', timeout: 10000 });
    return (await statusLabel.textContent()) || '';
  }

  async openStatusDropdown() {
    const dropdown = this.page.locator(
      '[data-cy="dropdown-trigger-intervention-status-dropdown"]',
    );
    await dropdown.click();
  }

  async publishIntervention() {
    await this.openStatusDropdown();

    // Click publish option
    const publishOption = this.page.locator('[data-cy="dropdown-option-publish"]');
    await publishOption.click();

    // Confirm in the modal
    const confirmButton = this.page.locator('[data-cy="confirmation-box-confirm-button"]');
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );

    await this.page.waitForTimeout(500);
  }

  async pauseIntervention() {
    await this.openStatusDropdown();

    // Click pause option
    const pauseOption = this.page.locator('[data-cy="dropdown-option-pause"]');
    await pauseOption.click();

    // Confirm in the modal
    const confirmButton = this.page.locator('[data-cy="confirmation-box-confirm-button"]');
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );

    await this.page.waitForTimeout(500);
  }

  async archiveIntervention() {
    await this.openStatusDropdown();

    // Click archive option
    const archiveOption = this.page.locator('[data-cy="dropdown-option-archive"]');
    await archiveOption.click();

    // Confirm in the modal
    const confirmButton = this.page.locator('[data-cy="confirmation-box-confirm-button"]');
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );


    await this.page.waitForTimeout(500);
  }

  async reactivateIntervention() {
    await this.openStatusDropdown();

    // Click reactivate option
    const reactivateOption = this.page.locator('[data-cy="dropdown-option-reactivate"]');
    await reactivateOption.click();

    // Confirm in the modal
    const confirmButton = this.page.locator('[data-cy="confirmation-box-confirm-button"]');
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );

    await this.page.waitForTimeout(500);
  }

  async closeIntervention() {
    await this.openStatusDropdown();

    // Click close option
    const closeOption = this.page.locator('[data-cy="dropdown-option-close"]');
    await closeOption.click();

    // Confirm in the modal
    const confirmButton = this.page.locator('[data-cy="confirmation-box-confirm-button"]');
    await confirmButton.waitFor({ state: 'visible', timeout: 5000 });
    await confirmButton.click();

    // Wait for API response
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );

    await this.page.waitForTimeout(500);
  }

  async getInterventionName(): Promise<string> {
    await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
    const input = this.nameInput;
    return input.inputValue();
  }

  async editInterventionName(newName: string) {
    await this.nameInput.waitFor({ state: 'visible', timeout: 10000 });
    
    await this.nameInput.fill(newName);
    
    // Trigger blur by pressing Tab or clicking outside - this should trigger the save
    await this.nameInput.press('Tab');
    
    await this.page.waitForResponse(
      (response) =>
        response.url().includes('/interventions/') &&
        response.request().method() === 'PATCH' &&
        response.status() === 200,
      { timeout: 10000 },
    );
  }
}
