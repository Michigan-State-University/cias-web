import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { responseStatusEquals } from 'utils/axiosUtils';
import { HttpStatusCodes } from 'utils/constants';

import { Roles } from 'models/User/UserRoles';
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

    const message =
      role === Roles.clinicAdmin
        ? messages.inviteClinicAdminSuccess
        : messages.inviteAdminSuccess;

    yield call(toast.info, formatMessage(message), {
      toastId: INVITE_ADMIN_SUCCESS,
    });
  } catch (error) {
    const { response } = error;

    yield put(inviteAdminFailure(error));

    let errorMessage = formatMessage(messages.inviteAdminError);
    if (responseStatusEquals(response, HttpStatusCodes.FORBIDDEN))
      errorMessage = formatMessage(messages.inviteAdmin403Error);

    yield call(toast.error, errorMessage, {
      toastId: INVITE_ADMIN_ERROR,
    });
  }
}

export default function* inviteAdminSaga() {
  yield takeLatest(INVITE_ADMIN_REQUEST, inviteAdmin);
}
