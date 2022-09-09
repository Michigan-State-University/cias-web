import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { NotificationsState } from './types';
import { initialState, notificationsReducerKey } from './reducer';

const selectNotificationsState = (rootState: RootState): NotificationsState =>
  rootState[notificationsReducerKey] || initialState;

export const makeSelectNotifications = () =>
  createSelector(
    selectNotificationsState,
    ({ notifications }) => notifications,
  );
