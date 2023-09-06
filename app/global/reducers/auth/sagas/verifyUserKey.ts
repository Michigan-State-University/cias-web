import { takeEvery, put, call } from '@redux-saga/core/effects';
import axios from 'axios';
import { replace } from 'connected-react-router';

import { ApiError } from 'models/Api';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { HttpStatusCodes } from 'utils/constants';

import { RoutePath } from 'global/constants';
import { WithSaga } from 'global/reducers/types';

import { VERIFY_USER_KEY_REQUEST } from '../constants';
import { verifyUserKeyRequest, verifyUserKeySuccess } from '../actions';

function* verifyUserKeyWorker({
  payload: { userKey },
}: ReturnType<typeof verifyUserKeyRequest>) {
  const requestUrl = `v1/verify_user_key`;
  const requestBody = objectToSnakeCase({ userKey });

  try {
    yield call(axios.post, requestUrl, requestBody);
    yield put(verifyUserKeySuccess());
  } catch (error) {
    switch ((error as ApiError)?.response?.status) {
      case HttpStatusCodes.NOT_FOUND: {
        yield put(replace(RoutePath.NOT_FOUND));
        break;
      }
      case HttpStatusCodes.UNAUTHORIZED: {
        yield put(replace(RoutePath.FORBIDDEN));
        break;
      }
      default: {
        yield put(replace(RoutePath.NOT_FOUND));
        break;
      }
    }
  }
}

function* verifyUserKeySaga() {
  yield takeEvery(VERIFY_USER_KEY_REQUEST, verifyUserKeyWorker);
}

export const withVerifyUserKeySaga: WithSaga = {
  key: 'verifyUserKey',
  saga: verifyUserKeySaga,
};
