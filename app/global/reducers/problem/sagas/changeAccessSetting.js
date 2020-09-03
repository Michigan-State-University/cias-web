import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  CHANGE_ACCESS_SETTING_REQUEST,
  CHANGE_ACCESS_SETTING_ERROR,
} from '../constants';
import {
  changeAccessSettingSuccess,
  changeAccessSettingFailure,
} from '../actions';
import messages from '../messages';

function* changeAccessSetting({ payload: { id, setting } }) {
  const requestURL = `v1/problems/${id}`;
  try {
    yield axios.patch(requestURL, { shared_to: setting });
    yield put(changeAccessSettingSuccess());
  } catch (error) {
    yield put(
      showError(formatMessage(messages.changeAccessSettingFailure), {
        id: CHANGE_ACCESS_SETTING_ERROR,
      }),
    );
    yield put(changeAccessSettingFailure(error));
  }
}

export default function* changeAccessSettingSaga() {
  yield takeLatest(CHANGE_ACCESS_SETTING_REQUEST, changeAccessSetting);
}
