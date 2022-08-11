import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  REMOVE_NAVIGATOR_EMAIL_INVITATION_REQUEST,
  REMOVE_NAVIGATOR_EMAIL_INVITATION_ERROR,
  REMOVE_NAVIGATOR_EMAIL_INVITATION_SUCCESS,
} from '../constants';
import {
  removeNavigatorEmailInvitationSuccess,
  removeNavigatorEmailInvitationRequest,
  removeNavigatorEmailInvitationError,
} from '../actions';
import messages from '../messages';

export function* removeNavigatorEmailInvitation({
  payload: { invitationId, interventionId },
}: ReturnType<typeof removeNavigatorEmailInvitationRequest>) {
  const url = `/v1/interventions/${interventionId}/navigator_invitations/${invitationId}`;
  try {
    yield call(axios.delete, url);
    yield put(removeNavigatorEmailInvitationSuccess(invitationId));
    yield call(
      toast.success,
      formatMessage(messages.navigatorInvitationRemovedSuccess),
      {
        toastId: REMOVE_NAVIGATOR_EMAIL_INVITATION_SUCCESS,
      },
    );
  } catch (error) {
    yield put(removeNavigatorEmailInvitationError(invitationId));
    yield call(
      toast.error,
      formatMessage(messages.removeNavigatorEmailInvitationError),
      {
        toastId: REMOVE_NAVIGATOR_EMAIL_INVITATION_ERROR,
      },
    );
  }
}

export default function* removeNavigatorEmailInvitationSaga() {
  yield takeLatest(
    REMOVE_NAVIGATOR_EMAIL_INVITATION_REQUEST,
    removeNavigatorEmailInvitation,
  );
}
