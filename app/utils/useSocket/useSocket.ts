import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Channel } from '@anycable/web';
import { ChannelParamsMap } from '@anycable/core/channel';

import useDeepObjectMemo from 'utils/useDeepObjectMemo';
import { SocketContext } from 'components/ActionCable';

import { LISTEN_SOCKET_MESSAGE_EVENT_NAME } from './constants';
import {
  SocketAction,
  SocketErrorMessage,
  SocketErrorMessageData,
  SocketErrorMessageStatus,
  SocketMessage,
  SocketMessageListener,
  SocketOptions,
} from './types';

export const useSocket = <
  TMessage extends
    | SocketMessage<string, object | string | undefined>
    | SocketErrorMessage<
        string,
        SocketErrorMessageData,
        SocketErrorMessageStatus
      >,
  TAction extends SocketAction<string, object> | null = null,
  TConnectionParams extends ChannelParamsMap = {},
>(
  channelName: string,
  // IMPORTANT NOTE: message listeners are attached to the socket at the time
  // when subscription is created and are NOT updated during the life of a
  // subscription. It means that message listeners will NOT see any changes that
  // happens after subscription.
  // Example: Redux state changes - if you use a state selector in message
  // listener, it will have value from the moment of subscription creation even
  // if the state changed in the meantime.
  messageListener: SocketMessageListener<TMessage>,
  {
    socketConnectionParams,
    suspend = false,
    onUnsubscribe,
  }: SocketOptions<TConnectionParams>,
) => {
  type TChannel = Channel<TConnectionParams, TMessage>;

  const cable = useContext(SocketContext);
  const [channel, setChannel] = useState<TChannel | null>();
  const [connected, setConnected] = useState(false);

  const memoizedParams = useDeepObjectMemo(socketConnectionParams);

  const subscribe = useCallback(() => {
    if (!channel && cable && !suspend) {
      try {
        const newChannel = cable.subscribeTo(
          channelName,
          memoizedParams,
        ) as TChannel;
        // Since @anycable/core 0.5.0 `subscribeTo` is synchronous and hands back
        // a channel the server has not confirmed yet. Publish it straight away
        // rather than awaiting the ack: callers reach it through
        // `channel?.perform(...)`, so while this hook returns undefined their
        // actions are dropped silently, and the library itself queues a
        // `perform` until the subscription is acknowledged (Cable#_perform
        // awaits `subscription.pending('subscribed')`).
        newChannel.on(LISTEN_SOCKET_MESSAGE_EVENT_NAME, messageListener);

        // `channel.state` is read once per render, so the flag has to live in
        // React state for a transition to reach the UI. The immediate call also
        // covers the case the listeners cannot see: `subscribeTo` emits
        // `connect` synchronously when the identifier is already subscribed,
        // before there is anything listening.
        const syncConnected = () =>
          setConnected(newChannel.state === 'connected');

        newChannel.on('connect', syncConnected);
        newChannel.on('disconnect', syncConnected);
        newChannel.on('close', syncConnected);
        syncConnected();

        setChannel(newChannel);
      } catch {
        // Intentionally swallowed — WebSocket disconnect errors are non-actionable
      }
    }
  }, [channel, cable, memoizedParams, suspend]);

  const unsubscribe = useCallback(() => {
    if (channel) {
      channel.disconnect();
      setChannel(null);
      setConnected(false);
      if (onUnsubscribe) {
        onUnsubscribe();
      }
    }
  }, [channel]);

  useEffect(() => {
    subscribe();
    return unsubscribe;
  }, [subscribe, unsubscribe]);

  const perform = useCallback(
    (action: TAction) => {
      if (!channel || !action) return;
      const { name, data } = action;
      return channel.perform(name, data);
    },
    [channel],
  );

  return useMemo(() => {
    if (!channel) return undefined;

    return {
      perform,
      isConnected: connected,
    };
  }, [perform, connected]);
};

export default useSocket;
