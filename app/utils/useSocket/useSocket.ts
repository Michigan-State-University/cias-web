import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Channel } from '@anycable/web';

import { SocketContext } from 'components/ActionCable';
import useDeepObjectMemo from 'utils/useDeepObjectMemo';
import { ChannelParamsMap } from '@anycable/core/channel';
import { LISTEN_SOCKET_MESSAGE_EVENT_NAME } from './constants';
import {
  SocketAction,
  SocketErrorMessage,
  SocketErrorMessageData,
  SocketErrorMessageStatus,
  SocketMessage,
  SocketOptions,
} from './types';

export const useSocket = <
  TMessage extends
    | SocketMessage<string, object>
    | SocketErrorMessage<
        string,
        SocketErrorMessageData,
        SocketErrorMessageStatus
      >,
  TAction extends SocketAction<string, object> | null = null,
  TSocketParams extends ChannelParamsMap | undefined = undefined,
>(
  channelName: string,
  { socketConnectionParams, suspend = false }: SocketOptions<TSocketParams>,
) => {
  type TChannel = Channel<{}, TMessage>;

  const cable = useContext(SocketContext);
  const [channel, setChannel] = useState<TChannel | null>();

  const memoizedParams = useDeepObjectMemo(socketConnectionParams);

  const subscribe = useCallback(async () => {
    if (!channel && cable && !suspend) {
      setChannel(await cable.subscribeTo(channelName, memoizedParams));
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

  const listen = useCallback(
    (callback: TChannel['receive']) => {
      if (!channel) return;
      return channel.on(LISTEN_SOCKET_MESSAGE_EVENT_NAME, callback);
    },
    [channel],
  );

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
      listen,
      perform,
    };
  }, [listen, perform]);
};

export default useSocket;
