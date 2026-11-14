/**
 * Test SocketProvider against the real @anycable/web client.
 *
 * The cable is created with the library's default `lazy: true`, so no socket is
 * opened until something subscribes — `global.WebSocket` is stubbed anyway so
 * that an eager-connect regression fails loudly instead of hitting the network.
 */

import React, { useContext } from 'react';
import { render, act, waitFor } from '@testing-library/react';
import { writeStorage, deleteFromStorage } from '@rehooks/local-storage';
import { Cable } from '@anycable/core';

import { HEADERS } from 'utils/localStorageService';

import { SocketProvider, SocketContext } from '../SocketProvider';

const WEBSOCKET_URL = 'ws://localhost:3000/cable';

const headersFor = (uid: string) => ({
  'Access-Token': 'tok',
  Uid: uid,
  Client: 'client-1',
});

let currentCable: Nullable<Cable> = null;

const CableProbe = () => {
  currentCable = useContext(SocketContext);
  return null;
};

const renderProvider = () =>
  render(
    <SocketProvider>
      <CableProbe />
    </SocketProvider>,
  );

describe('SocketProvider', () => {
  let webSocketSpy: jest.Mock;

  beforeEach(() => {
    process.env.WEBSOCKET_URL = WEBSOCKET_URL;
    currentCable = null;
    webSocketSpy = jest.fn();
    // @ts-expect-error — minimal stand-in, the lazy cable must never call it
    global.WebSocket = webSocketSpy;
    act(() => {
      deleteFromStorage(HEADERS);
    });
  });

  afterEach(() => {
    act(() => {
      deleteFromStorage(HEADERS);
    });
  });

  it('creates no cable while there are no auth headers', () => {
    renderProvider();

    expect(currentCable).toBeNull();
  });

  it('creates a cable whose transport url carries the logged-in uid', async () => {
    act(() => {
      writeStorage(HEADERS, headersFor('user@example.com'));
    });
    renderProvider();

    await waitFor(() => expect(currentCable).not.toBeNull());

    expect(currentCable!.transport.url).toBe(
      `${WEBSOCKET_URL}?access_token=tok&uid=user%40example.com&client=client-1`,
    );
    expect(webSocketSpy).not.toHaveBeenCalled();
  });

  it('retargets the existing cable when the uid changes instead of creating a second one', async () => {
    act(() => {
      writeStorage(HEADERS, headersFor('first@example.com'));
    });
    renderProvider();

    await waitFor(() => expect(currentCable).not.toBeNull());
    const cable = currentCable!;

    act(() => {
      writeStorage(HEADERS, headersFor('second@example.com'));
    });

    await waitFor(() =>
      expect(cable.transport.url).toContain('second%40example.com'),
    );
    expect(currentCable).toBe(cable);
  });

  it('disconnects the cable when the auth headers are cleared', async () => {
    act(() => {
      writeStorage(HEADERS, headersFor('user@example.com'));
    });
    renderProvider();

    await waitFor(() => expect(currentCable).not.toBeNull());
    const cable = currentCable!;
    const disconnect = jest.spyOn(cable, 'disconnect');

    act(() => {
      deleteFromStorage(HEADERS);
    });

    // The logout path must actually tear the cable down — before the 1.x
    // migration it called the removed `cable.close()`, which threw inside a
    // try/catch and left the socket open.
    await waitFor(() => expect(disconnect).toHaveBeenCalledTimes(1));
    await waitFor(() => expect(currentCable).toBeNull());
  });
});
