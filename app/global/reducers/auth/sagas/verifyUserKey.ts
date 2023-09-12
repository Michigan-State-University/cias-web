import { call, put, takeEvery } from '@redux-saga/core/effects';
import { replace } from 'connected-react-router';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { parametrizeRoutePath } from 'utils/router';
import { mapPlainUserData } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';
import objectToCamelCase from 'utils/objectToCamelCase';

import { RoutePath } from 'global/constants';
import { WithSaga } from 'global/reducers/types';

import { AnswerSessionPageLocationState } from 'global/types/locationState';
import { VERIFY_USER_KEY_REQUEST } from '../constants';
import {
  verifyUserKeyError,
  verifyUserKeyRequest,
  verifyUserKeySuccess,
} from '../actions';
import { VerifyUserKeyResponse } from '../types';

function* verifyUserKeyWorker({
  payload: { userKey },
}: ReturnType<typeof verifyUserKeyRequest>) {
  const requestUrl = `v1/verify_user_key`;
  const requestBody = objectToSnakeCase({ userKey });

  try {
    const { data } = yield call(axios.post, requestUrl, requestBody);
    const { redirectData, user }: VerifyUserKeyResponse =
      objectToCamelCase(data);

    const mappedUser = mapPlainUserData(user);
    yield call(LocalStorageService.setState, { user: mappedUser });
    yield put(verifyUserKeySuccess(mappedUser));

    const {
      userInterventionId,
      interventionId,
      sessionId,
      healthClinicId,
      multipleFillSessionAvailable,
    } = redirectData;

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
        userInterventionId,
      };

      yield put(replace(`${redirectPath}?${queryParams}`, locationState));
    } else {
      // redirect to the intervention modules list
      const redirectPath = parametrizeRoutePath(RoutePath.USER_INTERVENTION, {
        userInterventionId,
      });

      yield put(replace(redirectPath));
    }
  } catch (error) {
    yield put(verifyUserKeyError(error));
  }
}

function* verifyUserKeySaga() {
  yield takeEvery(VERIFY_USER_KEY_REQUEST, verifyUserKeyWorker);
}

export const withVerifyUserKeySaga: WithSaga = {
  key: 'verifyUserKey',
  saga: verifyUserKeySaga,
};
