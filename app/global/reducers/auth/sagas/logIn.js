import { put, takeLatest, call, select, delay } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import axios from 'axios';
import Cookies from 'js-cookie';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { HttpStatusCodes } from 'utils/constants';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';
import { responseStatusEquals } from 'utils/axiosUtils';

import { makeSelectLocation } from 'containers/App/selectors';
import {
  logIn,
  loginError,
  loginSuccess,
  verificationCodeNeeded,
} from '../actions';
import {
  LOGIN_REQUEST,
  REDIRECT_QUERY_KEY,
  VERIFICATION_CODE_COOKIE,
} from '../constants';

function* login({ payload: { email, password } }) {
  const requestURL = `v1/auth/sign_in`;

  try {
    let config = {};
    const userCookie = Cookies.getJSON(email);

    if (userCookie && userCookie[VERIFICATION_CODE_COOKIE])
      config = {
        headers: { 'Verification-Code': userCookie[VERIFICATION_CODE_COOKIE] },
      };

    const {
      data: { data },
    } = yield axios.post(
      requestURL,
      {
        email,
        password,
      },
      config,
    );
    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.setState, { user: { ...mappedUser } });
    yield put(logIn(mappedUser));
    yield put(loginSuccess());

    const location = yield select(makeSelectLocation());
    const queryParams = new URLSearchParams(location.search);

    if (queryParams.has(REDIRECT_QUERY_KEY))
      yield put(push(decodeURIComponent(queryParams.get(REDIRECT_QUERY_KEY))));
    else yield put(push('/'));
  } catch (error) {
    yield delay(300);
    yield put(loginError(requestErrorMessageHandler(error)));

    if (responseStatusEquals(error.response, HttpStatusCodes.FORBIDDEN))
      yield put(verificationCodeNeeded());
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
