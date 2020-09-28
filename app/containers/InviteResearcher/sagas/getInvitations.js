import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';

import { GET_INVITATIONS_REQUEST } from '../constants';
import { getInvitationsSuccess, getInvitationsError } from '../actions';

export function* getInvitations() {
  const requestUrl = `/v1/users/invitations`;
  try {
    const {
      data: { invitations },
    } = yield call(axios.get, requestUrl);
    yield put(getInvitationsSuccess(invitations));
  } catch (error) {
    yield put(getInvitationsError(error.toString()));
  }
}

export default function* getInvitationsSaga() {
  yield takeLatest(GET_INVITATIONS_REQUEST, getInvitations);
}
