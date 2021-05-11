import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { GET_INVITATIONS_REQUEST } from '../constants';
import { getInvitationsSuccess, getInvitationsError } from '../actions';

export function* getInvitations() {
  const requestUrl = `/v1/users/invitations`;
  try {
    const { data } = yield call(axios.get, requestUrl);
    const invitations = jsonApiToArray(data, 'invitation');
    yield put(getInvitationsSuccess(invitations));
  } catch (error) {
    yield put(getInvitationsError(error.toString()));
  }
}

export default function* getInvitationsSaga() {
  yield takeLatest(GET_INVITATIONS_REQUEST, getInvitations);
}
