import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  changeActivateStatusError,
  changeActivateStatusSuccess,
} from '../actions';
import { CHANGE_ACTIVATE_STATUS_REQUEST } from '../constants';

import messages from '../messages';

export function* changeActivateStatus({ payload: { userId, active } }) {
  const requestUrl = `/v1/users/${userId}`;
  try {
    if (!active) yield call(axios.delete, requestUrl);
    else yield call(axios.patch, requestUrl, { active });
    yield put(changeActivateStatusSuccess());
    yield call(toast.info, formatMessage(messages.changeStatusSuccess));
  } catch (error) {
    yield put(changeActivateStatusError());
    yield call(toast.error, formatMessage(messages.changeStatusFailure));
  }
}

export default function* changeActivateStatusSaga() {
  yield takeLatest(CHANGE_ACTIVATE_STATUS_REQUEST, changeActivateStatus);
}
