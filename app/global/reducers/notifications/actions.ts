import { createAction } from 'typesafe-actions';

import { Notification } from 'models/Notification';

import {
  ON_NEW_NOTIFICATION_RECEIVE,
  ON_UNREAD_NOTIFICATIONS_FETCHED_RECEIVE,
} from './constants';

export const onUnreadNotificationsFetchedReceive = createAction(
  ON_UNREAD_NOTIFICATIONS_FETCHED_RECEIVE,
  (action) => (notifications: Notification[]) => action({ notifications }),
);

export const onNewNotificationReceive = createAction(
  ON_NEW_NOTIFICATION_RECEIVE,
  (action) => (notification: Notification) => action({ notification }),
);
