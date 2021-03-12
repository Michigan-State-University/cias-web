import { put, takeLatest, call, select } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';
import { logIn } from 'global/reducers/auth/actions';

import { makeSelectLocation } from 'containers/App/selectors';
import { LOGIN_REQUEST, REDIRECT_QUERY_KEY } from './constants';
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

    const location = yield select(makeSelectLocation());
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(REDIRECT_QUERY_KEY))
      yield put(push(decodeURIComponent(queryParams.get(REDIRECT_QUERY_KEY))));
    else yield put(push('/'));
  } catch (error) {
    yield put(loginError(requestErrorMessageHandler(error)));
  }
}

export default function* loginPageSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
