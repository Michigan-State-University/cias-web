import { call, put, takeEvery, select } from '@redux-saga/core/effects';
import { replace } from 'connected-react-router';
import axios from 'axios';

import { Roles } from 'models/User/RolesManager';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import LocalStorageService from 'utils/localStorageService';

import { WithSaga } from 'global/reducers/types';

import { verifyShortLinkError, verifyShortLinkRequest } from '../actions';
import { makeSelectUserRoles } from '../selectors';
import { getShortLinkRedirectPath } from '../utils';
import { VERIFY_SHORT_LINK_REQUEST } from '../constants';

function* verifyShortLinkWorker({
  payload: { slug },
}: ReturnType<typeof verifyShortLinkRequest>) {
  const requestUrl = `/v1/short_links/verify`;
  const requestBody = objectToSnakeCase({ slug });

  const currentUserRoles: Nullable<Roles[]> = yield select(
    makeSelectUserRoles(),
  );
  // clear headers if user is a predefined participant
  const clearHeaders = currentUserRoles?.includes(Roles.PredefinedParticipant);

  if (clearHeaders) {
    LocalStorageService.clearHeaders();
  }

  try {
    const { data } = yield call(axios.post, requestUrl, requestBody);
    const { path, locationState } = getShortLinkRedirectPath(data.data);
    yield put(replace(path, locationState));
  } catch (error) {
    yield put(verifyShortLinkError(error));
  }
}

function* verifyShortLinkSaga() {
  yield takeEvery(VERIFY_SHORT_LINK_REQUEST, verifyShortLinkWorker);
}

export const withVerifyShortLinkSaga: WithSaga = {
  key: 'verifyShortLink',
  saga: verifyShortLinkSaga,
};
