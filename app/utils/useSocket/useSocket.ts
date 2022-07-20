import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Channel } from '@anycable/web';

import { SocketContext } from 'components/ActionCable';
import { LISTEN_SOCKET_MESSAGE_EVENT_NAME } from './constants';
import { SocketAction, SocketMessage } from './types';

export const useSocket = <
  TMessage extends SocketMessage<string, object>,
  TAction extends SocketAction<string, object> | null = null,
>(
  channelName: string,
  suspend: boolean = false,
) => {
  type TChannel = Channel<{}, TMessage>;

  const cable = useContext(SocketContext);
  const [channel, setChannel] = useState<TChannel | null>();

  const subscribe = useCallback(async () => {
    if (!channel && cable && !suspend) {
      setChannel(await cable.subscribeTo(channelName));
    }
  }, [channel, cable, suspend]);

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
