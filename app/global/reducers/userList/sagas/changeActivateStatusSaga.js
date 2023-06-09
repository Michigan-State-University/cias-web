import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  changeActivateStatusFailure,
  changeActivateStatusSuccess,
} from '../actions';
import { CHANGE_ACTIVATE_STATUS_REQUEST } from '../constants';

import messages from './messages';

function* changeActivateStatus({ payload: { id, active } }) {
  const requestUrl = `/v1/users/${id}`;
  try {
    if (!active) yield axios.delete(requestUrl);
    else yield axios.patch(requestUrl, { active });
    yield put(changeActivateStatusSuccess());
    yield call(toast.info, formatMessage(messages.changeStatusSuccess));
  } catch (error) {
    yield put(changeActivateStatusFailure());
    yield call(toast.error, formatMessage(messages.changeStatusFailure));
  }
}

export default function* changeActivateStatusSaga() {
  yield takeLatest(CHANGE_ACTIVATE_STATUS_REQUEST, changeActivateStatus);
}
