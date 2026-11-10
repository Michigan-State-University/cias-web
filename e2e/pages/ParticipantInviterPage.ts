import { Locator, Page, expect } from '@playwright/test';

import { waitForApiResponse } from '../utils/waitForApiResponse';

export class ParticipantInviterPage {
  readonly page: Page;
  readonly openModalButton: Locator;
  readonly predefinedParticipantsTab: Locator;
  readonly openCampaignsViewButton: Locator;
  readonly sendInvitationButton: Locator;
  readonly sendReminderButton: Locator;
  readonly bodyInput: Locator;
  readonly bodyCounter: Locator;
  readonly reminderBodyInput: Locator;
  readonly daysAfterInput: Locator;
  readonly submitButton: Locator;
  readonly errorList: Locator;
  readonly campaignsList: Locator;

  constructor(page: Page) {
    this.page = page;
    this.openModalButton = page.locator(
      '[data-cy="participants-inviter-button"]',
    );
    this.predefinedParticipantsTab = page.locator(
      '[data-cy="predefined-participants-tab"]',
    );
    this.openCampaignsViewButton = page.locator(
      '[data-cy="open-sms-campaigns-view"]',
    );
    this.sendInvitationButton = page.locator(
      '[data-cy="send-sms-invitation-button"]',
    );
    this.sendReminderButton = page.locator(
      '[data-cy="send-sms-reminder-button"]',
    );
    this.bodyInput = page.locator('[data-cy="sms-campaign-body"]');
    this.bodyCounter = page.locator('[data-cy="sms-campaign-counter"]');
    this.reminderBodyInput = page.locator(
      '[data-cy="sms-campaign-reminder-body"]',
    );
    this.daysAfterInput = page.locator('[data-cy="sms-campaign-days-after"]');
    this.submitButton = page.locator('[data-cy="sms-campaign-submit"]');
    this.errorList = page.locator('[data-cy="sms-campaign-error-list"]');
    this.campaignsList = page.locator('[data-cy="sms-campaigns-list"]');
  }

  async open() {
    await this.openModalButton.waitFor({ state: 'visible', timeout: 30000 });
    await this.openModalButton.click();
    await this.page
      .locator('#modal-portal [role="dialog"]')
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  async goToPredefinedParticipantsTab() {
    const participantsResponse = waitForApiResponse(this.page, {
      urlIncludes: '/predefined_participants',
      method: 'GET',
      status: 200,
    });
    await this.predefinedParticipantsTab.click();
    await participantsResponse;
  }

  /**
   * Creates one predefined participant through the UI. `phone` is left out by
   * default: a participant without a phone number is never an SMS recipient,
   * which lets a test exercise the real endpoint without any SMS going out.
   */
  async createPredefinedParticipant(externalId: string) {
    await this.page
      .locator('[data-cy="invite-participants-button-PREDEFINED"]')
      .first()
      .click();

    await this.page.locator('input[name="externalId"]').fill(externalId);

    const createResponse = waitForApiResponse(this.page, {
      urlIncludes: '/predefined_participants',
      method: 'POST',
      status: 201,
    });
    await this.page
      .locator('[data-cy="predefined-participant-form-submit"]')
      .click();
    await createResponse;

    // Creating a participant opens their "Manage participant" view; the SMS
    // campaign buttons live on the list behind it.
    await this.page
      .locator('[data-cy="invite-participants-back-button"]')
      .click();
    await this.page
      .locator('[data-cy="predefined-participants-table"]')
      .waitFor({ state: 'visible', timeout: 10000 });
  }

  /** Sending starts from the SMS campaigns view, not from the participant list. */
  async openCampaignsView() {
    await this.openCampaignsViewButton.click();
    await this.sendInvitationButton.waitFor({
      state: 'visible',
      timeout: 10000,
    });
  }

  async openCompose(kind: 'invitation' | 'reminder') {
    const metaResponse = waitForApiResponse(this.page, {
      urlIncludes: '/sms_campaigns/meta',
      method: 'GET',
      status: 200,
    });
    await (
      kind === 'invitation'
        ? this.sendInvitationButton
        : this.sendReminderButton
    ).click();
    await metaResponse;
    await this.bodyInput.waitFor({ state: 'visible', timeout: 10000 });
  }

  /** The checkbox input itself is visually hidden, so click its label. */
  async toggleReminder() {
    await this.page
      .locator('[data-cy="sms-campaign-add-reminder-label"]')
      .click();
  }

  async expectErrorCode(code: string) {
    await expect(
      this.page.locator(`[data-cy="sms-campaign-error-${code}"]`),
    ).toBeVisible();
  }

  /** The counter reads "123/1600 characters · 1 SMS (GSM7)". */
  async readCounter(): Promise<{
    length: number;
    segments: number;
    encoding: string;
  }> {
    const text = (await this.bodyCounter.textContent()) ?? '';
    const match = text.match(
      /(\d+)\/\d+\s+characters.*?(\d+)\s+SMS\s+\((\w+)\)/,
    );
    if (!match) throw new Error(`Unexpected counter text: "${text}"`);
    return {
      length: Number(match[1]),
      segments: Number(match[2]),
      encoding: match[3],
    };
  }
}
