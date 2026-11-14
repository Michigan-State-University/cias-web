import { expect } from '@playwright/test';

import { test } from '../fixtures/test';
import {
  DashboardPage,
  InterventionPage,
  InterventionAccessType,
  InterventionType,
  LiveChatPage,
  NAVIGATOR_EMAIL,
  PARTICIPANT_EMAIL,
} from '../pages';

/**
 * Live chat end to end: participant <-> navigator over the AnyCable
 * ConversationChannel.
 *
 * This is the flow that the @anycable/web 0.3 -> 1.1 migration put at risk.
 * Since 0.5.0 `cable.subscribeTo` returns before the server confirms the
 * subscription, so `useSocket`'s `isConnected` stayed false forever unless the
 * ack is awaited. `isConnected` gates both `fetchLiveChatSetup()` and
 * `changeScreenTitle()` in LiveChatParticipantPanel, so a regression there
 * leaves the participant panel empty and the navigator without the
 * participant's screen title — with no error anywhere.
 *
 * Three browser contexts: the admin (from the shared auth fixture), the
 * navigator and the participant (both logged in through the UI, because the
 * fixture only covers the admin pool).
 */
test.describe('Live chat', () => {
  // Three logins plus intervention setup against a remote API.
  test.setTimeout(180_000);

  test('a participant and a navigator exchange messages in real time', async ({
    page,
    browser,
    seededCredentials,
  }) => {
    const dashboardPage = new DashboardPage(page);
    const interventionPage = new InterventionPage(page);
    const adminLiveChat = new LiveChatPage(page);

    // --- admin: build an intervention that offers live chat ------------------

    await dashboardPage.goto();
    await dashboardPage.createIntervention();
    const interventionId = await dashboardPage.getInterventionIdFromUrl();

    // The navigator's inbox groups conversations by intervention name, and
    // every intervention is created as "New e-Intervention", so a unique name
    // is what makes this run's group identifiable.
    const interventionName = `Live chat e2e ${Date.now()}`;
    await interventionPage.editInterventionName(interventionName);

    // The chat widget is hidden for the DEFAULT type (UserInterventionPage).
    await interventionPage.changeInterventionType(InterventionType.FLEXIBLE);
    await interventionPage.createSession();
    await interventionPage.changeAccessSettings(
      InterventionAccessType.REGISTERED,
    );

    await adminLiveChat.enableLiveChat();
    await adminLiveChat.inviteNavigator(NAVIGATOR_EMAIL);
    await adminLiveChat.confirmNavigatorInvitation(
      interventionId,
      NAVIGATOR_EMAIL,
    );

    await interventionPage.publishIntervention();

    // --- navigator: come online and watch the inbox --------------------------

    const navigatorContext = await browser.newContext();
    const navigatorPage = await navigatorContext.newPage();
    const navigator = new LiveChatPage(navigatorPage);

    const participantContext = await browser.newContext();
    const participantPage = await participantContext.newPage();
    const participant = new LiveChatPage(participantPage);

    try {
      await navigator.login(NAVIGATOR_EMAIL, seededCredentials);
      await navigator.goOnline();
      await navigator.openInbox();

      // --- participant: start a conversation ---------------------------------

      await participant.login(PARTICIPANT_EMAIL, seededCredentials);
      await participant.enterInterventionAsParticipant(interventionId);

      await participant.openChatWidget();

      // With a navigator online the panel opens straight into a conversation;
      // otherwise it offers "Connect with Support" first.
      await participant.startConversation();

      // The conversation record is created by the participant's first message
      // (`on_conversation_created`), so it cannot reach the navigator's inbox
      // before this point. The token goes first: the inbox preview is an
      // EllipsisText, so anything at the end of the line is truncated away.
      const token = `p${Date.now() % 1_000_000}`;
      const participantMessage = `${token} from the participant`;
      await participant.sendChatMessage(participantMessage);

      // --- the assertions this spec exists for -------------------------------

      // 1. The conversation reaches the navigator's inbox without a reload —
      //    the subscription is live on both sides.
      await navigator.openConversationWith(token, interventionName);

      await expect(navigator.chatMessage(participantMessage)).toBeVisible({
        timeout: 60_000,
      });

      // 2. The participant's current screen is pushed over the channel. This is
      //    the signal that dies when `isConnected` never turns true.
      await expect(navigator.currentScreenTitle()).toBeVisible({
        timeout: 60_000,
      });

      // 3. The reply travels back to the participant, also without a reload.
      const navigatorMessage = `hello from the navigator ${Date.now()}`;
      await navigator.sendChatMessage(navigatorMessage);

      await expect(participant.chatMessage(navigatorMessage)).toBeVisible({
        timeout: 60_000,
      });
    } finally {
      await participantContext.close();
      await navigatorContext.close();
    }
  });
});
