import { put, takeEvery, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import LocalStorageService from 'utils/localStorageService';

import { LOG_OUT } from '../constants';

export function* logOut() {
  yield call(LocalStorageService.clearHeaders);
  yield call(LocalStorageService.clearState);

  yield put(push('/login'));
}

export default function* logOutSaga() {
  yield takeEvery(LOG_OUT, logOut);
}
