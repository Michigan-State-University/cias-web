import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { Channel } from '@anycable/web';

import { SocketContext } from 'components/ActionCable';
import {
  LISTEN_SOCKET_MESSAGE_EVENT_NAME,
  SENT_SOCKET_MESSAGE_EVENT_NAME,
} from './constants';

export const useSocket = <TChannel extends Channel>(channelName: string) => {
  const cable = useContext(SocketContext);
  const [channel, setChannel] = useState<TChannel>();

  const subscribeToChannel = async () => {
    if (cable) {
      setChannel((await cable.subscribeTo(channelName)) as TChannel);
    }
  };

  useEffect(() => {
    if (!channel && cable) {
      subscribeToChannel();
    }
    return () => {
      if (channel) {
        channel.disconnect();
      }
    };
  }, [cable, channel]);

  const listen = useCallback(
    (callback: TChannel['receive']) => {
      if (!channel) return;
      return channel.on(LISTEN_SOCKET_MESSAGE_EVENT_NAME, callback);
    },
    [channel],
  );

  const sent = useCallback(
    // type same as incoming messages
    // TODO remove union with object when BE implements incoming messages format
    (data: Required<Parameters<TChannel['receive']>[0]> | object) => {
      if (!channel) return;
      return channel.perform(SENT_SOCKET_MESSAGE_EVENT_NAME, data);
    },
    [channel],
  );

  return useMemo(() => {
    if (!channel) return undefined;

    return {
      listen,
      sent,
    };
  }, [listen, sent]);
};

export default useSocket;
