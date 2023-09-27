import { put, takeLatest, call, select, delay } from 'redux-saga/effects';
import { replace } from 'connected-react-router';
import axios from 'axios';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { ForbiddenReason, HttpStatusCodes } from 'utils/constants';
import { requestErrorMessageHandler } from 'utils/errors/requestErrorMessageHandler';
import { responseStatusEquals } from 'utils/axiosUtils';
import objectToCamelCase from 'utils/objectToCamelCase';
import { getRedirectPathFromQueryParams } from 'utils/router';

import { makeSelectLocation } from 'containers/App/selectors';
import { UserStorageController } from '../UserStorageController';
import {
  logIn,
  loginError,
  loginSuccess,
  termsNotAccepted,
  verificationCodeNeeded,
} from '../actions';
import { LOGIN_REQUEST } from '../constants';

function* login({ payload: { email, password } }) {
  const requestURL = `v1/auth/sign_in`;
  const location = yield select(makeSelectLocation());
  try {
    let config = {};
    const userStorageController = new UserStorageController(email);
    const verificationCode = userStorageController.getVerificationCode();

    if (verificationCode)
      config = {
        headers: { 'Verification-Code': verificationCode },
      };

    const { data } = yield axios.post(
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

    const redirectPath = getRedirectPathFromQueryParams(location.search);
    yield put(replace(redirectPath));
  } catch (error) {
    yield delay(300);

    if (responseStatusEquals(error.response, HttpStatusCodes.FORBIDDEN)) {
      yield put(loginError(''));
      const {
        response: {
          data: {
            details: { reason, require_fields: extraFields },
          },
        },
      } = error;
      if (reason === ForbiddenReason.TWO_FACTOR_NEEDED)
        yield put(verificationCodeNeeded());
      if (reason === ForbiddenReason.TERMS_NOT_ACCEPTED)
        yield put(
          termsNotAccepted(
            { ...objectToCamelCase(extraFields), email },
            password,
          ),
        );
    } else {
      yield put(loginError(requestErrorMessageHandler(error)));
    }
  }
}

export default function* loginSaga() {
  yield takeLatest(LOGIN_REQUEST, login);
}
