import { useContext, useEffect, useState } from 'react';
import { GhostChannel } from '@anycable/core/cable';

import { SocketContext } from 'components/ActionCable';

export const useSocket = (channel: string) => {
  const socket = useContext(SocketContext);
  const [subscription, setSubscription] = useState<GhostChannel>();

  const subscribeToChannel = async () => {
    if (socket) {
      setSubscription(await socket.subscribeTo(channel));
    }
  };

  useEffect(() => {
    if (!subscription && socket) {
      subscribeToChannel();
    }
    return () => {
      if (subscription) {
        subscription.disconnect();
      }
    };
  }, [socket, subscription]);

  return subscription;
};

export default useSocket;
