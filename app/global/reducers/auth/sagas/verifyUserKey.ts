import { call, put, takeEvery } from '@redux-saga/core/effects';
import { replace } from 'connected-react-router';

import { Roles } from 'models/User/RolesManager';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { parametrizeRoutePath } from 'utils/router';
import { mapPlainUserData } from 'utils/mapResponseObjects';
import LocalStorageService from 'utils/localStorageService';

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

const mockData = (): VerifyUserKeyResponse => {
  return {
    redirectData: {
      userInterventionId: '9f3ba52d-2b8d-4ff8-9579-b4b02d5d59e9',
      interventionId: 'e0c37422-551e-46c2-bcbd-b7301a234250',
      // sessionId: '513edd15-3f96-45de-90d6-ce7b25f79b20',
      sessionId: null,
      healthClinicId: null,
      multipleFillSessionAvailable: true,
    },
    user: {
      id: 'f53117a2-b7d8-4cd3-acfc-f842e985fe48',
      email: 'participant@interventionauthoring.org',
      fullName: '',
      firstName: '',
      lastName: '',
      description: '',
      smsNotification: true,
      timeZone: 'America/New_York',
      active: true,
      roles: [Roles.PredefinedParticipant],
      phone: null,
      teamId: null,
      adminsTeamIds: [],
      feedbackCompleted: false,
      emailNotification: true,
      organizableId: null,
      quickExitEnabled: false,
      teamName: null,
      healthClinicsIds: null,
      avatarUrl: null,
    },
  };
};

function* verifyUserKeyWorker({
  payload: { userKey },
}: ReturnType<typeof verifyUserKeyRequest>) {
  const requestUrl = `v1/verify_user_key`;
  const requestBody = objectToSnakeCase({ userKey });

  try {
    // const { data } = yield call(axios.post, requestUrl, requestBody);
    // const { redirectData, user }: VerifyUserKeyResponse =
    //   objectToCamelCase(data);
    // TODO replace below mock with the above response data
    const { redirectData, user } = mockData();

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
