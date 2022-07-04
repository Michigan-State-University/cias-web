import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import LocalStorageService from 'utils/localStorageService';

import { LOG_OUT, REDIRECT_QUERY_KEY } from '../constants';
import { resetReducer } from '../actions';

export function* logOut(
  { payload: { redirectTo } } = { payload: { redirectTo: null } },
) {
  yield call(LocalStorageService.clearUserData);

  const queryParams = new URLSearchParams(window.location.search);

  if (redirectTo)
    queryParams.append(REDIRECT_QUERY_KEY, encodeURIComponent(redirectTo));

  yield put(push(`/login${redirectTo ? `?${queryParams.toString()}` : ''}`));
  yield put(resetReducer());
}

export default function* logOutSaga() {
  yield takeEvery(LOG_OUT, logOut);
}
