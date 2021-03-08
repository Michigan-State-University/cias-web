import { put, takeLatest } from 'redux-saga/effects';

import { TOGGLE_NOTIFICATIONS_REQUEST } from '../constants';
import {
  toggleNotificationsSuccess,
  toggleNotificationsError,
} from '../actions';

export function* toggleNotifications() {
  try {
    yield put(toggleNotificationsSuccess());
  } catch (error) {
    yield put(toggleNotificationsError(error));
  }
}

export default function* toggleNotificationsSaga() {
  yield takeLatest(TOGGLE_NOTIFICATIONS_REQUEST, toggleNotifications);
}
