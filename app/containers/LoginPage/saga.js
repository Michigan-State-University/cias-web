import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { LOGIN_REQUEST } from './constants';
import { loginError, loginSuccess } from './actions';
import { setIsLoggedIn } from '../../global/reducers/auth/actions';

function* login({ payload: { username, password } }) {
  const requestURL = `auth/sign_in`;

  try {
    yield axios.post(requestURL, {
      username,
      password,
    });

    yield put(setIsLoggedIn(true));
    yield put(loginSuccess());
    yield put(push('/'));
  } catch (error) {
    yield put(loginError(error));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
