import { call, put, takeEvery, select } from '@redux-saga/core/effects';
import { replace } from 'connected-react-router';
import axios from 'axios';

import { Roles } from 'models/User/RolesManager';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import LocalStorageService from 'utils/localStorageService';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { WithSaga } from 'global/reducers/types';

import { VERIFY_USER_KEY_REQUEST } from '../constants';
import {
  verifyUserKeyError,
  verifyUserKeyRequest,
  verifyUserKeySuccess,
} from '../actions';
import { VerifyUserKeyResponseDTO } from '../types';
import { makeSelectUserRoles } from '../selectors';
import { getPredefinedParticipantRedirectPath } from '../utils';

function* verifyUserKeyWorker({
  payload: { userKey },
}: ReturnType<typeof verifyUserKeyRequest>) {
  const requestUrl = `/v1/predefined_participants/verify`;
  const requestBody = objectToSnakeCase({ slug: userKey });

  const currentUserRoles: Nullable<Roles[]> = yield select(
    makeSelectUserRoles(),
  );
  // clear headers if user is a guest or predefined participant
  const clearHeaders =
    !currentUserRoles || currentUserRoles.includes(Roles.PredefinedParticipant);

  if (clearHeaders) {
    LocalStorageService.clearHeaders();
  }

  try {
    const { data } = yield call(axios.post, requestUrl, requestBody);
    const { redirect_data: redirectData, user }: VerifyUserKeyResponseDTO =
      data;

    const mappedUser = jsonApiToObject({ data: user }, 'user');
    yield call(LocalStorageService.setState, { user: mappedUser });
    yield put(verifyUserKeySuccess(mappedUser));

    const { path, locationState } =
      getPredefinedParticipantRedirectPath(redirectData);
    yield put(replace(path, locationState));
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
