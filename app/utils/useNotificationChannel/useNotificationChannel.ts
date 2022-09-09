import { useDispatch, useSelector } from 'react-redux';

import { SocketMessageListener, useSocket } from 'utils/useSocket';
import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';

import { makeSelectIsUserLoggedIn } from 'global/reducers/auth';
import {
  onNewNotificationReceive,
  onUnreadNotificationsFetchedReceive,
} from 'global/reducers/notifications/actions';

import {
  NewNotificationData,
  NotificationChannelMessage,
  UnreadNotificationsFetchedData,
} from './types';
import {
  NOTIFICATION_CHANNEL_NAME,
  NotificationChannelMessageTopic,
} from './constants';

export const useNotificationChannel = () => {
  const isLoggedIn = useSelector(makeSelectIsUserLoggedIn());
  const dispatch = useDispatch();

  const onUnreadNotificationsFetched = (
    data: UnreadNotificationsFetchedData,
  ) => {
    const notifications = jsonApiToArray(data, 'notification');
    notifications.reverse();
    dispatch(onUnreadNotificationsFetchedReceive(notifications));
  };

  const onNewNotification = (data: NewNotificationData) => {
    const notification = jsonApiToObject(data, 'notification');
    dispatch(onNewNotificationReceive(notification));
  };

  const messageListener: SocketMessageListener<NotificationChannelMessage> = ({
    data,
    topic,
  }) => {
    switch (topic) {
      case NotificationChannelMessageTopic.UNREAD_NOTIFICATIONS_FETCHED:
        onUnreadNotificationsFetched(data);
        break;
      case NotificationChannelMessageTopic.NEW_NOTIFICATION:
        onNewNotification(data);
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
