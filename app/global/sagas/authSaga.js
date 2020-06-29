import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOG_OUT } from '../reducers/auth/constants';

function* logOut() {
  yield put(push('/login'));
}

export default function* authSaga() {
  yield all([yield takeEvery(LOG_OUT, logOut)]);
}
