import { call, put, takeLatest } from 'redux-saga/effects';
import request from 'utils/request';
import { LOGIN_REQUEST } from './constants';
import { loginError, loginSuccess } from './actions';

function* login({ payload: { username, password } }) {
  const requestURL = `${process.env.API_URL}/auth/sign_in`;

  try {
    const response = yield call(request, requestURL, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: username, password }),
    });

    const token = response.headers.get('access-token');

    yield put(loginSuccess(token));
  } catch (error) {
    yield put(loginError(error));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
