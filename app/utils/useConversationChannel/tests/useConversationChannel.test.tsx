/**
 * Test useConversationChannel against the real @anycable/web client.
 *
 * This covers the live-chat behaviour that the 0.3 -> 1.1 migration put at risk:
 * `isConnected` is what gates `fetchLiveChatSetup()` and `changeScreenTitle()`
 * in LiveChatParticipantPanel, so if it never turned true the participant panel
 * would stay empty and the navigator would never see the participant's screen.
 */

import React, { ReactNode } from 'react';
import { Provider } from 'react-redux';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { createCable } from '@anycable/web';

import { SocketContext } from 'components/ActionCable';
import { AnycableTestTransport } from 'utils/testUtils/anycableTestTransport';
import { createTestStore } from 'utils/testUtils/storeUtils';

import { useConversationChannel } from '../useConversationChannel';
import {
  CONVERSATION_CHANNEL_NAME,
  ConversationChannelActionName,
} from '../constants';

jest.mock('react-toastify', () => ({
  toast: { info: jest.fn(), error: jest.fn(), success: jest.fn() },
}));

const CABLE_URL = 'ws://localhost/cable';
const INTERVENTION_ID = 'intervention-1';

const setup = async () => {
  const transport = new AnycableTestTransport(CABLE_URL);
  const cable = createCable(CABLE_URL, {
    transport,
    protocol: 'actioncable-v1-json',
    monitor: false,
    lazy: false,
  });

  const store = createTestStore();
  // redux-injectors would otherwise swap in the real root reducer
  store.replaceReducer = () => {};

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <Provider store={store}>
      <SocketContext.Provider value={cable}>{children}</SocketContext.Provider>
    </Provider>
  );

  const rendered = renderHook(() => useConversationChannel(INTERVENTION_ID), {
    wrapper,
  });

  transport.receive({ type: 'welcome' });

  await waitFor(() => expect(transport.subscribeIdentifier).toBeDefined());
  transport.receive({
    type: 'confirm_subscription',
    identifier: transport.subscribeIdentifier,
  });
  await waitFor(() => expect(rendered.result.current.isConnected).toBe(true));

  return { transport, ...rendered };
};

const performedActions = (transport: AnycableTestTransport) =>
  transport.sentMessages
    .filter(({ command }) => command === 'message')
    .map(({ data }) => JSON.parse(data));

describe('useConversationChannel', () => {
  it('subscribes to ConversationChannel scoped to the intervention', async () => {
    const { transport } = await setup();

    expect(JSON.parse(transport.subscribeIdentifier!)).toEqual({
      channel: CONVERSATION_CHANNEL_NAME,
      intervention_id: INTERVENTION_ID,
    });
  });

  it('reports isConnected once the subscription is confirmed', async () => {
    // setup() already asserts this; keeping it explicit documents the guarantee
    // that gates the whole participant panel.
    const { result } = await setup();

    expect(result.current.isConnected).toBe(true);
  });

  it('sends the live chat setup request that fills the participant panel', async () => {
    const { transport, result } = await setup();

    result.current.fetchLiveChatSetup();

    await waitFor(() =>
      expect(
        performedActions(transport).some(
          ({ action }) =>
            action === ConversationChannelActionName.ON_FETCH_LIVE_CHAT_SETUP,
        ),
      ).toBe(true),
    );

    const sent = performedActions(transport).find(
      ({ action }) =>
        action === ConversationChannelActionName.ON_FETCH_LIVE_CHAT_SETUP,
    );
    expect(sent).toMatchObject({ interventionId: INTERVENTION_ID });
  });

  it('sends the screen title the navigator displays for the participant', async () => {
    const { transport, result } = await setup();

    result.current.changeScreenTitle({
      conversationId: 'conversation-1',
      currentScreenTitle: 'Session 1 - Screen 2',
      currentLocation: 'dashboard',
    });

    await waitFor(() =>
      expect(
        performedActions(transport).some(
          ({ action }) =>
            action ===
            ConversationChannelActionName.ON_CURRENT_SCREEN_TITLE_CHANGED,
        ),
      ).toBe(true),
    );

    const sent = performedActions(transport).find(
      ({ action }) =>
        action ===
        ConversationChannelActionName.ON_CURRENT_SCREEN_TITLE_CHANGED,
    );
    expect(sent).toMatchObject({
      conversationId: 'conversation-1',
      currentScreenTitle: 'Session 1 - Screen 2',
    });
  });

  it('sends a chat message typed by the participant', async () => {
    const { transport, result } = await setup();

    result.current.sendMessage({
      conversationId: 'conversation-1',
      content: 'hello navigator',
    } as any);

    await waitFor(() =>
      expect(
        performedActions(transport).some(
          ({ action }) =>
            action === ConversationChannelActionName.ON_MESSAGE_SENT,
        ),
      ).toBe(true),
    );

    const sent = performedActions(transport).find(
      ({ action }) => action === ConversationChannelActionName.ON_MESSAGE_SENT,
    );
    expect(sent).toMatchObject({ content: 'hello navigator' });
  });
});
