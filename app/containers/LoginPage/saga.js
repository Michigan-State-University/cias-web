import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { setAuthData } from 'global/reducers/auth';
import { LOGIN_REQUEST } from './constants';
import { loginError, loginSuccess } from './actions';

function* login({ payload: { username, password } }) {
  const requestURL = `${process.env.API_URL}/auth/sign_in`;

  try {
    const response = yield axios.post(requestURL, {
      username,
      password,
    });

    const token = response.headers['access-token'];
    const { client, uid } = response.headers;

    yield put(setAuthData({ token, client, uid }));
    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginError(error));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
