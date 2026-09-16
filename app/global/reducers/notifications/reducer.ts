import produce from 'immer';
import { getType, Reducer } from 'typesafe-actions';

import { WithReducer } from 'global/reducers/types';

import { deleteItemById } from 'utils/reduxUtils';

import { NotificationsAction, NotificationsState } from './types';
import {
  markNotificationReadLocally,
  onNewNotificationReceive,
  onUnreadNotificationsFetchedReceive,
  setNavigatorAvailabilityLocally,
  setNotificationsListVisible,
} from './actions';

export const notificationsReducerKey = 'notifications';

export const initialState: NotificationsState = {
  notificationsListVisible: false,
  notifications: [],
  navigatorAvailability: null,
};

/* eslint-disable default-case, no-param-reassign, @typescript-eslint/default-param-last */
export const notificationsReducer: Reducer<
  NotificationsState,
  NotificationsAction
> = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
      case getType(setNotificationsListVisible): {
        const { notificationsListVisible } = payload;
        draft.notificationsListVisible = notificationsListVisible;
        break;
      }
      case getType(onUnreadNotificationsFetchedReceive): {
        const { notifications } = payload;
        draft.notifications = notifications;
        break;
      }
      case getType(onNewNotificationReceive): {
        const { notification } = payload;
        draft.notifications.unshift(notification);
        break;
      }
      case getType(markNotificationReadLocally): {
        const { notificationId } = payload;
        deleteItemById(draft.notifications, notificationId);
        break;
      }
      case getType(setNavigatorAvailabilityLocally): {
        const { online } = payload;
        draft.navigatorAvailability = online;
        break;
      }
    }
  });

export const withNotificationsReducer: WithReducer = {
  key: notificationsReducerKey,
  // @ts-ignore
  reducer: notificationsReducer,
};
