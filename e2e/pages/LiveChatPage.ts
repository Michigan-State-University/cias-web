import { Page, expect } from '@playwright/test';

import type { SeededCredentials } from '../fixtures/test';
import { waitForApiResponse } from '../utils/waitForApiResponse';

/**
 * Live chat: the admin-side setup, the navigator panel and the participant
 * chat widget.
 *
 * Both accounts come from the API's e2e seed. The admin pool cannot stand in
 * for the navigator: `InviteNavigators` rejects a user that is neither a
 * researcher nor a navigator.
 */
export const NAVIGATOR_EMAIL = 'e2e_navigator_0@example.com';
export const PARTICIPANT_EMAIL = 'e2e_participant_0@example.com';

export class LiveChatPage {
  constructor(private page: Page) {}

  /**
   * Sign in a seeded account through the UI — the auth fixture only covers the
   * admin pool. Every seeded account shares one password.
   */
  async login(
    email: string,
    { password, verificationCode }: SeededCredentials,
  ) {
    await this.page.goto('/');
    await this.page.locator('[data-cy="login-email-input"]').fill(email);
    await this.page.locator('[data-cy="login-password-input"]').fill(password);
    await this.page.locator('[data-cy="login-submit-button"]').click();

    const verificationInput = this.page.locator(
      '[data-cy="verification-code-input"]',
    );
    const errorMessage = this.page.locator(
      '[role="alert"], .error-message, [class*="error"]',
    );

    // Seeded accounts have 2FA on, but the first screen after submit depends on
    // the environment — race the three outcomes, like e2e/auth.setup.ts does.
    const outcome = await Promise.race([
      verificationInput
        .waitFor({ state: 'visible', timeout: 20000 })
        .then(() => '2fa'),
      this.page
        .waitForURL(/\/$|\/\?/, { timeout: 20000 })
        .then(() => 'signed-in'),
      errorMessage
        .first()
        .waitFor({ state: 'visible', timeout: 20000 })
        .then(() => 'error'),
    ]).catch(() => 'timeout');

    if (outcome === 'error') {
      const text = await errorMessage.first().textContent();
      throw new Error(`Sign-in failed for ${email}: ${text}`);
    }

    if (outcome === 'timeout') {
      throw new Error(
        `Sign-in for ${email} produced neither a dashboard nor a 2FA prompt (url: ${this.page.url()})`,
      );
    }

    if (outcome === '2fa') {
      await verificationInput.fill(verificationCode);
      await this.page.locator('[data-cy="verification-submit-button"]').click();
    }

    await expect(this.page).not.toHaveURL(/\/login/, { timeout: 30000 });
  }

  // --- admin side -----------------------------------------------------------

  /** Turn on live chat ("Setup Navigator") in the intervention settings. */
  async enableLiveChat() {
    const toggle = this.page.locator('#use-navigator-switch');
    await toggle.waitFor({ state: 'attached', timeout: 30000 });

    if (await toggle.isChecked()) return;

    const responsePromise = waitForApiResponse(this.page, {
      urlIncludes: '/interventions/',
      method: 'PATCH',
      status: 200,
      timeout: 30000,
    });

    await this.page.locator('label[for="use-navigator-switch"]').click();
    await responsePromise;
  }

  /**
   * Invite a navigator by email from the navigator settings modal. The email
   * field is a ChipsInput: the address becomes a chip on Enter, then the
   * separate "Invite" button submits it.
   */
  async inviteNavigator(email: string) {
    // Scoped to the modal: ChipsInput is also used by the participant inviter.
    const emailInput = this.page
      .locator('#modal-portal [data-cy="hidden-input"]')
      .first();

    // Switching live chat on opens the navigator settings modal itself
    // (SettingsPanel passes `onSuccess: () => openNavigatorSettingModal(true)`),
    // so the configure button is only needed when the modal is already closed.
    const modalAlreadyOpen = await emailInput
      .waitFor({ state: 'visible', timeout: 10000 })
      .then(() => true)
      .catch(() => false);

    if (!modalAlreadyOpen) {
      await this.page
        .locator('[data-cy="configure-navigator-settings"]')
        .click();
      await emailInput.waitFor({ state: 'visible', timeout: 30000 });
    }

    await emailInput.fill(email);
    await emailInput.press('Enter');

    const responsePromise = waitForApiResponse(this.page, {
      urlIncludes: 'navigator_invitations',
      method: 'POST',
      status: 201,
      timeout: 30000,
    });

    await this.page.locator('[data-cy="invite-navigator-button"]').click();
    await responsePromise;

    // Leave the settings page usable: the open modal would swallow later clicks.
    await this.closeModal();
  }

  async closeModal() {
    const closeButton = this.page
      .locator('[data-cy="modal-close-button"]')
      .first();

    if (await closeButton.isVisible().catch(() => false)) {
      await closeButton.click();
      await expect(closeButton).toBeHidden({ timeout: 10000 });
    }
  }

  /**
   * Accept the invitation without going through the mailbox.
   *
   * `V1::LiveChat::Navigators::InvitationsController#confirm` skips
   * authentication and takes the intervention id and the email as plain query
   * params, so the link in the email can be reconstructed here.
   */
  async confirmNavigatorInvitation(interventionId: string, email: string) {
    const apiUrl = process.env.API_URL ?? 'http://localhost:3000';
    const response = await this.page.request.get(
      `${apiUrl}/v1/live_chat/navigators/invitations/confirm`,
      { params: { intervention_id: interventionId, email } },
    );

    // The endpoint redirects back to the web app on success.
    expect(response.status(), 'navigator invitation confirm').toBeLessThan(400);
  }

  // --- navigator side -------------------------------------------------------

  /**
   * Make sure the navigator counts as available for live chat.
   *
   * A plain navigator needs no action: `NotificationChannel#subscribed` sets
   * `online: true` for them, so simply being signed in is enough. Only a
   * navigator who is also a researcher or an admin has to declare availability,
   * via the "Open to live chat messages?" modal — and that account would also
   * see the navbar switch. Both are handled here so either kind of account
   * works.
   */
  async goOnline() {
    const availabilityModalSave = this.page.locator(
      '[data-cy="navigator-availability-save"]',
    );

    const mustDeclare = await availabilityModalSave
      .waitFor({ state: 'visible', timeout: 5000 })
      .then(() => true)
      .catch(() => false);

    if (!mustDeclare) return;

    await this.page
      .locator('label[for="navigators-availability-option-yes"]')
      .click();
    await availabilityModalSave.click();
    await expect(availabilityModalSave).toBeHidden({ timeout: 15000 });

    const toggle = this.page.locator(
      '[data-cy="navigator-availability-switch"]',
    );
    await expect(toggle).not.toBeChecked({ timeout: 15000 });
  }

  /**
   * Close whatever modal is covering the page, and say what it was if it will
   * not go away — a silent "element intercepts pointer events" is hard to chase.
   */
  async dismissBlockingModal() {
    const portal = this.page.locator('#modal-portal');

    const hasContent = await portal
      .locator(':scope > *')
      .first()
      .isVisible()
      .catch(() => false);
    if (!hasContent) return;

    await this.closeModal();

    const stillThere = await portal
      .locator(':scope > *')
      .first()
      .isVisible()
      .catch(() => false);
    if (stillThere) {
      const text = (await portal.innerText().catch(() => ''))
        .trim()
        .slice(0, 300);
      throw new Error(
        `A modal is blocking the page and has no close button: ${text}`,
      );
    }
  }

  async openInbox() {
    await this.page.goto('/live-chat');
  }

  /**
   * Open the conversation whose preview contains `token`.
   *
   * Not "the first one": this account keeps the conversations of every earlier
   * run, and the list is not ordered by creation, so picking the first item
   * opens an unrelated old conversation roughly half the time. Pass a short
   * token from the start of the message — the preview is an EllipsisText, so
   * matching on a whole sentence never succeeds.
   */
  async openConversationWith(token: string, interventionName: string) {
    // The inbox groups conversations by intervention and keeps exactly one
    // group open — `index === 0` until something is selected
    // (ConversationList.tsx:62-69). Conversations in the collapsed groups are
    // not in the DOM at all, so the right group has to be expanded first.
    const group = this.page
      .locator('[data-cy="intervention-conversations-collapse"]')
      .filter({ hasText: interventionName });

    await group.waitFor({ state: 'visible', timeout: 60000 });

    const conversation = group
      .locator('[data-cy="conversation-list-item"]')
      .filter({ hasText: token });

    if (!(await conversation.isVisible().catch(() => false))) {
      await group.click();
    }

    await conversation.waitFor({ state: 'visible', timeout: 60000 });
    await conversation.click();
  }

  /** The participant's current screen, pushed over the conversation channel. */
  currentScreenTitle() {
    return this.page.locator('[data-cy="interlocutor-current-screen"]');
  }

  // --- participant side -----------------------------------------------------

  /** Enter the intervention as a participant via the invite link. */
  async enterInterventionAsParticipant(interventionId: string) {
    await this.page.goto(`/interventions/${interventionId}/invite`);
  }

  async openChatWidget() {
    const icon = this.page.locator('[data-cy="live-chat-icon"]');
    await icon.waitFor({ state: 'visible', timeout: 60000 });
    await icon.click();
  }

  /**
   * Get the participant to a state where they can type. With a navigator
   * online the chat input is there already; otherwise the panel shows
   * "Connect with Support" and the input appears once a navigator picks up.
   */
  async startConversation(): Promise<void> {
    const input = this.page.locator('[data-cy="chat-message-input"]');
    const callOut = this.page.locator('[data-cy="call-out-navigator"]');

    const ready = await Promise.race([
      input.waitFor({ state: 'visible', timeout: 30000 }).then(() => 'input'),
      callOut
        .waitFor({ state: 'visible', timeout: 30000 })
        .then(() => 'call-out'),
    ]).catch(() => 'neither');

    if (ready === 'neither') {
      throw new Error(
        'The participant panel offered neither a chat input nor "Connect with Support".',
      );
    }

    if (ready === 'input') return;

    // No navigator is attached yet: ask for one, then wait for the panel to
    // turn into a conversation the participant can type into.
    await callOut.click();
    await input.waitFor({ state: 'visible', timeout: 90000 });
  }

  // --- shared chat actions --------------------------------------------------

  async sendChatMessage(content: string) {
    const input = this.page.locator('[data-cy="chat-message-input"]');
    await input.waitFor({ state: 'visible', timeout: 60000 });
    await input.fill(content);
    await this.page.locator('[data-cy="chat-message-send"]').click();
  }

  chatMessage(content: string) {
    return this.page.locator('[data-cy="chat-message"]', { hasText: content });
  }
}
