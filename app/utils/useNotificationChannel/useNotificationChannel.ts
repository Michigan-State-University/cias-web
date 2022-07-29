import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useSocket } from 'utils/useSocket';

import { makeSelectIsUserLoggedIn } from 'global/reducers/auth';

import { NotificationChannelMessage } from './types';
import {
  NOTIFICATION_CHANNEL_NAME,
  NotificationChannelMessageTopic,
} from './constants';

export const useNotificationChannel = () => {
  const isLoggedIn = useSelector(makeSelectIsUserLoggedIn());

  const channel = useSocket<NotificationChannelMessage>(
    NOTIFICATION_CHANNEL_NAME,
    { suspend: !isLoggedIn },
  );

  useEffect(() => {
    channel?.listen(({ topic }) => {
      switch (topic) {
        case NotificationChannelMessageTopic.PLACEHOLDER:
          break;
        default:
          break;
      }
    });
  }, [channel]);

  return {};
};
