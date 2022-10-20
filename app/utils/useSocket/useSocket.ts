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
    | SocketMessage<string, object | undefined>
    | SocketErrorMessage<
        string,
        SocketErrorMessageData,
        SocketErrorMessageStatus
      >,
  TAction extends SocketAction<string, object> | null = null,
  TConnectionParams extends ChannelParamsMap = {},
>(
  channelName: string,
  messageListener: SocketMessageListener<TMessage>,
  { socketConnectionParams, suspend = false }: SocketOptions<TConnectionParams>,
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
      state: channel.state,
    };
  }, [perform]);
};

export default useSocket;
