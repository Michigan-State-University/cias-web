import { takeEvery, call } from 'redux-saga/effects';

import axios from 'axios';
import LocalStorageService from 'utils/localStorageService';

import { LOG_IN_GUEST } from '../constants';

export function* logInGuest({ payload: { sessionId } }) {
  const requestUrl = 'v1/preview_session_users/';
  const body = {
    session_id: sessionId,
  };
  const { data } = yield call(axios.post, requestUrl, body);
  yield call(LocalStorageService.setGuestHeaders, data);
}

export default function* logInGuestSaga() {
  yield takeEvery([LOG_IN_GUEST], logInGuest);
}
