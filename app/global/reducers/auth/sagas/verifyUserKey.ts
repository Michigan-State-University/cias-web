import { put, takeEvery, call } from '@redux-saga/core/effects';
import { replace } from 'connected-react-router';
import axios from 'axios';

import { ApiError } from 'models/Api';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { HttpStatusCodes } from 'utils/constants';
import { parametrizeRoutePath } from 'utils/router';
import objectToCamelCase from 'utils/objectToCamelCase';

import { RoutePath } from 'global/constants';
import { WithSaga } from 'global/reducers/types';

import { AnswerSessionPageLocationState } from 'global/types/locationState';
import { VERIFY_USER_KEY_REQUEST } from '../constants';
import { verifyUserKeyRequest, verifyUserKeySuccess } from '../actions';
import { VerifyUserKeyResponse } from '../types';

function* verifyUserKeyWorker({
  payload: { userKey },
}: ReturnType<typeof verifyUserKeyRequest>) {
  const requestUrl = `v1/verify_user_key`;
  const requestBody = objectToSnakeCase({ userKey });

  try {
    const { data } = yield call(axios.post, requestUrl, requestBody);
    const mappedData: VerifyUserKeyResponse = objectToCamelCase(data);

    yield put(verifyUserKeySuccess());

    const {
      interventionId,
      sessionId,
      healthClinicId, // TODO handle clinic id when we decide on https://htdevelopers.atlassian.net/browse/CIAS30-3661 and remove role disablement
      multipleFillSessionAvailable,
    } = mappedData;

    if (sessionId) {
      // redirect to answer session page
      const redirectPath = parametrizeRoutePath(RoutePath.ANSWER_SESSION, {
        interventionId,
        sessionId,
      });

      const queryParams = new URLSearchParams();
      if (healthClinicId) {
        queryParams.append('cid', healthClinicId);
      }

      const locationState: AnswerSessionPageLocationState = {
        multipleFillSessionAvailable,
      };

      yield put(replace(`${redirectPath}?${queryParams}`, locationState));
    } else {
      // redirect to the intervention modules list
      const redirectPath = parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
        interventionId,
      });

      yield put(replace(redirectPath));
    }
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
