import { takeLatest, put } from 'redux-saga/effects';
import { info as showInfo, error as showError } from 'react-toastify-redux';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  changeActivateStatusFailure,
  changeActivateStatusSuccess,
} from '../actions';
import { CHANGE_ACTIVATE_STATUS_REQUEST } from '../constants';

import messages from './messages';

function* changeActivateStatus({ payload: { id, deactivated } }) {
  const requestUrl = `/v1/users/${id}`;
  try {
    if (deactivated) yield axios.delete(requestUrl);
    else yield axios.patch(requestUrl, { deactivated });
    yield put(changeActivateStatusSuccess());
    yield put(showInfo(formatMessage(messages.changeStatusSuccess)));
  } catch (error) {
    yield put(changeActivateStatusFailure());
    yield put(showError(formatMessage(messages.changeStatusFailure)));
  }
}

export default function* changeActivateStatusSaga() {
  yield takeLatest(CHANGE_ACTIVATE_STATUS_REQUEST, changeActivateStatus);
}
