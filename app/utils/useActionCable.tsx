import { useContext, useEffect, useRef } from 'react';
import { Cable } from 'actioncable';

import { ternary } from 'utils/ternary';
import isNullOrUndefined from 'utils/isNullOrUndefined';

import { ActionCableContext } from 'components/ActionCable';

type Props = {
  channel: string;
  room: string | number;
  onReceived: (data: any) => void;
  onInitialized?: () => void;
  onConnected?: () => void;
  onDisconnected?: () => void;
  onRejected?: () => void;
};
export const useActionCable = ({
  channel,
  room,
  onReceived,
  onInitialized,
  onConnected,
  onDisconnected,
  onRejected,
}: Props) => {
  const hasMounted = useRef(false);
  const cable: Cable = useContext(ActionCableContext);

  const createSubscription = () =>
    cable.subscriptions.create(
      ternary(isNullOrUndefined(room), channel, { channel, room }),
      {
        received: (data: any) => {
          if (process.env.LOG_WEBSOCKET)
            console.log(
              `ActionCableConsumer: receive - { channel: ${channel}, room: ${room}, data: ${data} }`,
            );

          if (onReceived) onReceived(data);
        },
        initialized: () => {
          if (process.env.LOG_WEBSOCKET)
            console.log(
              `ActionCableConsumer: initialize - { channel: ${channel}, room: ${room} }`,
            );

          if (onInitialized) onInitialized();
        },
        connected: () => {
          if (process.env.LOG_WEBSOCKET)
            console.log(
              `ActionCableConsumer: connect - { channel: ${channel}, room: ${room} }`,
            );

          if (onConnected) onConnected();
        },
        disconnected: () => {
          if (process.env.LOG_WEBSOCKET)
            console.log(
              `ActionCableConsumer: disconnect - { channel: ${channel}, room: ${room} }`,
            );

          if (onDisconnected) onDisconnected();
        },
        rejected: () => {
          if (process.env.LOG_WEBSOCKET)
            console.log(
              `ActionCableConsumer: reject - { channel: ${channel}, room: ${room} }`,
            );

          if (onRejected) onRejected();
        },
      },
    ) || null;

  const subscription = useRef(createSubscription());

  useEffect(() => {
    if (!hasMounted.current) {
      if (cable) subscription.current = createSubscription();
    } else hasMounted.current = true;

    return () => subscription.current && subscription.current.unsubscribe();
  }, [cable, channel, room]);

  return { subscription };
};
