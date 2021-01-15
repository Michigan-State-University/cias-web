import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  changeNotificationsSettingsSuccess,
  changeNotificationsSettingsError,
} from '../actions';
import {
  CHANGE_NOTIFICATIONS_SETTINGS_REQUEST,
  CHANGE_NOTIFICATIONS_SETTINGS_SUCCESS,
  CHANGE_NOTIFICATIONS_SETTINGS_ERROR,
} from '../constants';
import messages from '../messages';

export function* changeNotificationsSettings() {
  try {
    yield call(
      toast.success,
      formatMessage(messages.changeNotificationsSettingsSuccess),
      {
        toastId: CHANGE_NOTIFICATIONS_SETTINGS_SUCCESS,
      },
    );
    yield put(changeNotificationsSettingsSuccess());
  } catch (error) {
    yield put(changeNotificationsSettingsError());
    yield call(
      toast.success,
      formatMessage(messages.changeNotificationsSettingsError),
      {
        toastId: CHANGE_NOTIFICATIONS_SETTINGS_ERROR,
      },
    );
  }
}

export default function* changeNotificationsSettingsSaga() {
  yield takeLatest(
    CHANGE_NOTIFICATIONS_SETTINGS_REQUEST,
    changeNotificationsSettings,
  );
}
