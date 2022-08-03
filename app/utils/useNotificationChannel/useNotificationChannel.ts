import { useSelector } from 'react-redux';

import { SocketMessageListener, useSocket } from 'utils/useSocket';

import { makeSelectIsUserLoggedIn } from 'global/reducers/auth';

import { NotificationChannelMessage } from './types';
import {
  NOTIFICATION_CHANNEL_NAME,
  NotificationChannelMessageTopic,
} from './constants';

export const useNotificationChannel = () => {
  const isLoggedIn = useSelector(makeSelectIsUserLoggedIn());

  const messageListener: SocketMessageListener<NotificationChannelMessage> = ({
    topic,
  }) => {
    switch (topic) {
      case NotificationChannelMessageTopic.PLACEHOLDER:
        break;
      default:
        break;
    }
  };

  useSocket<NotificationChannelMessage>(
    NOTIFICATION_CHANNEL_NAME,
    messageListener,
    { suspend: !isLoggedIn },
  );

  return {};
};
