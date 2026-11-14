/**
 * Test useSocket against the real @anycable/web client.
 *
 * These tests drive the actual library (no `jest.mock('@anycable/web')`) over an
 * in-memory transport, so they exercise the subscribe/message/unsubscribe
 * handshake the browser performs.
 */

import React, { ReactNode } from 'react';
import { renderHook } from '@testing-library/react-hooks';
import { waitFor } from '@testing-library/react';
import { createCable } from '@anycable/web';

import { SocketContext } from 'components/ActionCable';
import { AnycableTestTransport } from 'utils/testUtils/anycableTestTransport';

import { useSocket } from '../useSocket';
import { SocketAction } from '../types';

const CHANNEL_NAME = 'TestChannel';
const CABLE_URL = 'ws://localhost/cable';

type TestMessage = {
  topic: 'hello';
  data: { value: number };
  status: 200;
};

type TestAction = SocketAction<'doThing', { x: number }>;

const setup = async (options = {}) => {
  const transport = new AnycableTestTransport(CABLE_URL);

  const cable = createCable(CABLE_URL, {
    transport,
    protocol: 'actioncable-v1-json',
    monitor: false,
    lazy: false,
  });

  const messageListener = jest.fn();

  const wrapper = ({ children }: { children?: ReactNode }) => (
    <SocketContext.Provider value={cable}>{children}</SocketContext.Provider>
  );

  const rendered = renderHook(
    () =>
      useSocket<TestMessage, TestAction>(CHANNEL_NAME, messageListener, {
        socketConnectionParams: { id: 'abc' },
        ...options,
      }),
    { wrapper },
  );

  // The server greets the client; only then does the cable send commands.
  transport.receive({ type: 'welcome' });

  return { transport, cable, messageListener, ...rendered };
};

/** The `message` commands the client wrote, with their payloads parsed. */
const performedActions = (transport: AnycableTestTransport) =>
  transport.sentMessages
    .filter(({ command }) => command === 'message')
    .map(({ data }) => JSON.parse(data));

const confirmSubscription = (transport: AnycableTestTransport) =>
  transport.receive({
    type: 'confirm_subscription',
    identifier: transport.subscribeIdentifier,
  });

/** Wait for the subscribe command, ack it, and wait until the hook sees it. */
const establishSubscription = async (
  transport: AnycableTestTransport,
  result: { current?: { isConnected: boolean } | undefined },
) => {
  await waitFor(() => expect(transport.subscribeIdentifier).toBeDefined());
  confirmSubscription(transport);
  await waitFor(() => expect(result.current?.isConnected).toBe(true));
};

describe('useSocket', () => {
  it('sends a subscribe command carrying the channel name and connection params', async () => {
    const { transport } = await setup();

    await waitFor(() => expect(transport.subscribeIdentifier).toBeDefined());

    expect(JSON.parse(transport.subscribeIdentifier!)).toEqual({
      channel: CHANNEL_NAME,
      id: 'abc',
    });
  });

  it('reports isConnected only once the server confirms the subscription', async () => {
    const { transport, result } = await setup();

    await waitFor(() => expect(transport.subscribeIdentifier).toBeDefined());

    // Before the ack the hook must not claim a live connection.
    expect(result.current?.isConnected).toBeFalsy();

    confirmSubscription(transport);

    await waitFor(() => expect(result.current).toBeDefined());
    expect(result.current!.isConnected).toBe(true);
  });

  it('passes a message frame for the subscribed channel to the listener', async () => {
    const { transport, messageListener, result } = await setup();

    await establishSubscription(transport, result);

    transport.receive({
      identifier: transport.subscribeIdentifier,
      message: { topic: 'hello', data: { value: 1 }, status: 200 },
    });

    await waitFor(() => expect(messageListener).toHaveBeenCalledTimes(1));
    // The library calls listeners as (message, meta) — assert on the message.
    expect(messageListener.mock.calls[0][0]).toEqual({
      topic: 'hello',
      data: { value: 1 },
      status: 200,
    });
  });

  it('sends an unsubscribe command on unmount', async () => {
    const { transport, unmount, result } = await setup();

    await establishSubscription(transport, result);

    unmount();

    await waitFor(() =>
      expect(
        transport.sentMessages.some(({ command }) => command === 'unsubscribe'),
      ).toBe(true),
    );
  });

  it('runs the whole unmount cleanup without a runtime error', async () => {
    // React reports an error thrown in an effect cleanup as an uncaught error
    // rather than rethrowing it out of `unmount()`, so the error is captured
    // here instead of with `expect(...).not.toThrow()`.
    const consoleError = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {});

    try {
      const onUnsubscribe = jest.fn();
      const { transport, unmount, result } = await setup({ onUnsubscribe });

      await establishSubscription(transport, result);
      expect(onUnsubscribe).not.toHaveBeenCalled();

      unmount();

      // The callback only runs if the cleanup got past every preceding line.
      await waitFor(() => expect(onUnsubscribe).toHaveBeenCalledTimes(1));

      const reported = consoleError.mock.calls
        .flat()
        .map((entry) => String(entry))
        .join('\n');

      expect(reported).not.toContain('is not a function');
    } finally {
      consoleError.mockRestore();
    }
  });

  it('puts a perform action on the wire as an Action Cable message command', async () => {
    const { transport, result } = await setup();

    await establishSubscription(transport, result);

    result.current!.perform({ name: 'doThing', data: { x: 1 } });

    await waitFor(() =>
      expect(
        transport.sentMessages.some(({ command }) => command === 'message'),
      ).toBe(true),
    );

    const sent = transport.sentMessages.find(
      ({ command }) => command === 'message',
    )!;

    expect(sent.identifier).toBe(transport.subscribeIdentifier);
    expect(JSON.parse(sent.data)).toEqual({ x: 1, action: 'doThing' });
  });

  it('delivers a perform issued before the subscription is acknowledged', async () => {
    // The hook must hand back a usable channel straight away. Callers reach it
    // through `channel?.perform(...)`, so if the hook withheld the channel until
    // the ack, an action taken in that window would vanish with no error.
    const { transport, result } = await setup();

    await waitFor(() => expect(transport.subscribeIdentifier).toBeDefined());
    expect(result.current).toBeDefined();

    result.current!.perform({ name: 'doThing', data: { x: 1 } });

    // Still unacknowledged, so the library holds the action rather than sending it.
    expect(performedActions(transport)).toHaveLength(0);

    confirmSubscription(transport);

    await waitFor(() => expect(performedActions(transport)).toHaveLength(1));
    expect(performedActions(transport)[0]).toEqual({ x: 1, action: 'doThing' });
  });

  it('clears isConnected when the connection drops', async () => {
    const { transport, result } = await setup();

    await establishSubscription(transport, result);

    // Drop the socket the way a lost network would, rather than unmounting —
    // this is what proves the channel's own disconnect/close listeners work.
    await transport.close();

    await waitFor(() => expect(result.current?.isConnected).toBe(false));
  });

  it('rejects a perform action that cannot be delivered', async () => {
    // `useInterventionChannel` awaits perform inside a try/catch and shows an
    // error toast, so the rejection has to survive the hook rather than be
    // swallowed. (The other channel hooks fire and forget — see the note in
    // the migration report.)
    const { transport, cable, result } = await setup();

    await establishSubscription(transport, result);

    const { perform } = result.current!;
    cable.disconnect();

    await expect(
      perform({ name: 'doThing', data: { x: 1 } }),
    ).rejects.toBeDefined();
  });

  it('does not subscribe while suspended', async () => {
    const { transport } = await setup({ suspend: true });

    await waitFor(() => expect(transport.opened).toBe(true));

    expect(transport.subscribeIdentifier).toBeUndefined();
  });
});
