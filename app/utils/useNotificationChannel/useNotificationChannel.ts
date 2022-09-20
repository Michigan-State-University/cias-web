import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import { SocketMessageListener, useSocket } from 'utils/useSocket';
import { jsonApiToArray, jsonApiToObject } from 'utils/jsonApiMapper';

import { makeSelectIsUserLoggedIn } from 'global/reducers/auth';
import {
  markNotificationReadLocally,
  onNewNotificationReceive,
  onUnreadNotificationsFetchedReceive,
} from 'global/reducers/notifications/actions';

import {
  NewNotificationData,
  NotificationChannelAction,
  NotificationChannelMessage,
  ReadNotificationData,
  UnreadNotificationsFetchedData,
} from './types';
import {
  NOTIFICATION_CHANNEL_NAME,
  NotificationChannelActionName,
  NotificationChannelMessageTopic,
} from './constants';

export const useNotificationChannel = () => {
  const dispatch = useDispatch();

  const isLoggedIn = useSelector(makeSelectIsUserLoggedIn());

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

  const channel = useSocket<
    NotificationChannelMessage,
    NotificationChannelAction
  >(NOTIFICATION_CHANNEL_NAME, messageListener, { suspend: !isLoggedIn });

  const readNotification = (data: ReadNotificationData) => {
    const { notificationId } = data;
    dispatch(markNotificationReadLocally(notificationId));
    channel?.perform({
      name: NotificationChannelActionName.ON_READ_NOTIFICATION,
      data,
    });
    toast.dismiss(notificationId);
  };

  return {
    readNotification,
  };
};
