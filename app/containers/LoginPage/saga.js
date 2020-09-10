import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { logIn } from 'global/reducers/auth/actions';

import { LOGIN_REQUEST } from './constants';
import { loginError, loginSuccess } from './actions';

function* login({ payload: { email, password } }) {
  const requestURL = `v1/auth/sign_in`;

  try {
    const {
      data: { data },
    } = yield axios.post(requestURL, {
      email,
      password,
    });
    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.setState, mappedUser);
    yield put(logIn(mappedUser));
    yield put(loginSuccess());
    yield put(push('/'));
  } catch (error) {
    yield put(loginError(error.toString()));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
