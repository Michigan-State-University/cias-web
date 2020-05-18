import { put, takeEvery, all } from 'redux-saga/effects';
import { setToken } from '../../global/reducers/auth';
import { LOGIN_SUCCESS } from '../LoginPage/constants';

function* tokenAssign({ payload: { token } }) {
  yield put(setToken(token));
}

export default function* rootSaga() {
  yield all([takeEvery(LOGIN_SUCCESS, tokenAssign)]);
}
