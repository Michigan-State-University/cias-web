import { delay, put, select, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import Cookies from 'js-cookie';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { HttpStatusCodes } from 'utils/constants';
import { formatMessage } from 'utils/intlOutsideReact';

import { verificationCodeError, verificationCodeSuccess } from '../actions';
import {
  VERIFICATION_CODE_REQUEST,
  VERIFICATION_CODE_COOKIE,
} from '../constants';
import { makeSelectLoginFormData } from '../selectors';
import messages from '../messages';

function* verifyCode({ payload: { verificationCode } }) {
  const requestURL = `/v1/users/confirm_logging_code`;

  const { email } = yield select(makeSelectLoginFormData());

  try {
    const {
      // eslint-disable-next-line camelcase
      data: { verification_code },
    } = yield axios.patch(
      requestURL,
      objectToSnakeCase({ verificationCode, email }),
      {
        headers: { Uid: email },
      },
    );

    Cookies.set(VERIFICATION_CODE_COOKIE, verification_code, {
      expires: 30,
      secure: true,
      sameSite: 'strict',
    });

    yield delay(300);
    yield put(verificationCodeSuccess());
  } catch (error) {
    yield delay(300);

    switch (error.response.status) {
      case HttpStatusCodes.NOT_FOUND:
        yield put(
          verificationCodeError(
            formatMessage(messages.codeVerification404Error),
          ),
        );
        break;

      case HttpStatusCodes.REQUEST_TIMEOUT:
        yield put(
          verificationCodeError(
            formatMessage(messages.codeVerification408Error),
          ),
        );
        break;

      default:
        yield put(verificationCodeError(error));
        break;
    }
  }
}

export default function* verifyCodeSaga() {
  yield takeLatest(VERIFICATION_CODE_REQUEST, verifyCode);
}
