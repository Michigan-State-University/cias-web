import { createAction } from 'typesafe-actions';

import { Notification } from 'models/Notification';

import {
  MARK_NOTIFICATION_READ_LOCALLY,
  ON_NEW_NOTIFICATION_RECEIVE,
  ON_UNREAD_NOTIFICATIONS_FETCHED_RECEIVE,
  SET_NOTIFICATIONS_LIST_VISIBLE,
} from './constants';

export const setNotificationsListVisible = createAction(
  SET_NOTIFICATIONS_LIST_VISIBLE,
  (action) => (notificationsListVisible: boolean) =>
    action({ notificationsListVisible }),
);

export const onUnreadNotificationsFetchedReceive = createAction(
  ON_UNREAD_NOTIFICATIONS_FETCHED_RECEIVE,
  (action) => (notifications: Notification[]) => action({ notifications }),
);

export const onNewNotificationReceive = createAction(
  ON_NEW_NOTIFICATION_RECEIVE,
  (action) => (notification: Notification) => action({ notification }),
);

export const markNotificationReadLocally = createAction(
  MARK_NOTIFICATION_READ_LOCALLY,
  (action) => (notificationId: Notification['id']) =>
    action({ notificationId }),
);
