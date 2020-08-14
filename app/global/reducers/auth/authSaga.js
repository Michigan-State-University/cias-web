import { put, takeEvery, all, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import LocalStorageService from 'utils/localStorageService';
import { LOG_OUT } from './constants';

function* logOut() {
  yield call(LocalStorageService.clearHeaders);

  yield put(push('/login'));
}

export function* authSaga() {
  yield all([yield takeEvery(LOG_OUT, logOut)]);
}
