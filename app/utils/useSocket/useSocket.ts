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

  const memoizedParams = useDeepObjectMemo(socketConnectionParams);

  const subscribe = useCallback(async () => {
    if (!channel && cable && !suspend) {
      const newChannel = (await cable.subscribeTo(
        channelName,
        memoizedParams,
      )) as TChannel;
      newChannel.on(LISTEN_SOCKET_MESSAGE_EVENT_NAME, messageListener);
      setChannel(newChannel);
    }
  }, [channel, cable, memoizedParams, suspend]);

  const unsubscribe = useCallback(() => {
    if (channel) {
      channel.disconnect();
      channel.close();
      setChannel(null);
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
      isConnected: channel.state === 'connected',
    };
  }, [perform]);
};

export default useSocket;
