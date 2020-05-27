import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOG_OUT } from '../reducers/auth/constants';
import { setIsLoggedIn } from '../reducers/auth/actions';

function* logOut() {
  yield put(setIsLoggedIn(false));
  yield put(push('/login'));
}

export default function* authSaga() {
  yield all([yield takeEvery(LOG_OUT, logOut)]);
}
