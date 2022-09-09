import produce from 'immer';
import { getType, Reducer } from 'typesafe-actions';

import { WithReducer } from 'global/reducers/types';

import { NotificationsAction, NotificationsState } from './types';
import {
  onNewNotificationReceive,
  onUnreadNotificationsFetchedReceive,
} from './actions';

export const notificationsReducerKey = 'notifications';

export const initialState: NotificationsState = {
  notifications: [],
};

/* eslint-disable default-case, no-param-reassign */
export const notificationsReducer: Reducer<
  NotificationsState,
  NotificationsAction
> = (state = initialState, { type, payload }) =>
  produce(state, (draft) => {
    switch (type) {
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
    }
  });

export const withNotificationsReducer: WithReducer = {
  key: notificationsReducerKey,
  // @ts-ignore
  reducer: notificationsReducer,
};
