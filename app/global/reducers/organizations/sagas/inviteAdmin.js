import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  INVITE_ADMIN_ERROR,
  INVITE_ADMIN_REQUEST,
  INVITE_ADMIN_SUCCESS,
  mapRoleToInviteEndpoint,
} from '../constants';
import { inviteAdminFailure, inviteAdminSuccess } from '../actions';
import messages from '../messages';

export function* inviteAdmin({ payload: { email, role, id } }) {
  const requestURL = mapRoleToInviteEndpoint(role, id);

  try {
    yield call(axios.post, requestURL, {
      email,
    });

    yield put(inviteAdminSuccess());

    yield call(toast.success, formatMessage(messages.inviteAdminSuccess), {
      toastId: INVITE_ADMIN_SUCCESS,
    });
  } catch (error) {
    yield put(inviteAdminFailure(error));

    yield call(toast.error, formatMessage(messages.inviteAdminError), {
      toastId: INVITE_ADMIN_ERROR,
    });
  }
}

export default function* inviteAdminSaga() {
  yield takeLatest(INVITE_ADMIN_REQUEST, inviteAdmin);
}
