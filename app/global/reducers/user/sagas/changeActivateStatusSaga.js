import { takeLatest, put } from 'redux-saga/effects';
import { info as showInfo, error as showError } from 'react-toastify-redux';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  changeActivateStatusError,
  changeActivateStatusSuccess,
} from '../actions';
import { CHANGE_ACTIVATE_STATUS_REQUEST } from '../constants';

import messages from '../messages';

function* changeActivateStatus({ payload: { userId, active } }) {
  const requestUrl = `/v1/users/${userId}`;
  try {
    if (!active) yield axios.delete(requestUrl);
    else yield axios.patch(requestUrl, { active });
    yield put(changeActivateStatusSuccess());
    yield put(showInfo(formatMessage(messages.changeStatusSuccess)));
  } catch (error) {
    yield put(changeActivateStatusError());
    yield put(showError(formatMessage(messages.changeStatusFailure)));
  }
}

export default function* changeActivateStatusSaga() {
  yield takeLatest(CHANGE_ACTIVATE_STATUS_REQUEST, changeActivateStatus);
}
