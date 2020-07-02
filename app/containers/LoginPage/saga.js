import { put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import { LOGIN_REQUEST } from './constants';
import { loginError, loginSuccess } from './actions';
import { logIn } from '../../global/reducers/auth/actions';

function* login({ payload: { email, password } }) {
  const requestURL = `auth/sign_in`;

  try {
    const {
      data: { data },
    } = yield axios.post(requestURL, {
      email,
      password,
    });

    yield put(
      logIn({
        firstName: data.first_name,
        lastName: data.last_name,
      }),
    );
    yield put(loginSuccess());
    yield put(push('/'));
  } catch (error) {
    const errorMessage = error.response.data.errors[0];
    yield put(loginError(errorMessage));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
