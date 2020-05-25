import { put, takeEvery, all } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { LOGIN_SUCCESS } from 'containers/LoginPage/constants';
import { setToken } from '../reducers/auth';

function* tokenAssign({ payload }) {
  yield put(setToken(payload));
}

function* loginRedirect() {
  yield put(push('/'));
}

export default function* authDataSaga() {
  yield all([
    yield takeEvery(action => /_SUCCESS$/.test(action.type), tokenAssign),
    yield takeEvery(LOGIN_SUCCESS, loginRedirect),
  ]);
}
