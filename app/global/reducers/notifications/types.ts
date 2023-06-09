import { ActionType } from 'typesafe-actions';

import { Notification } from 'models/Notification';

import * as actions from './actions';

export type NotificationsAction = ActionType<typeof actions>;

export type NotificationsState = {
  notificationsListVisible: boolean;
  notifications: Notification[];
  navigatorAvailability: Nullable<boolean>;
};
