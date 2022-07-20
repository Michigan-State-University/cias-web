import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { PendingNavigatorInvitations } from 'models/NavigatorSetup';
import {
  INVITE_NAVIGATOR_BY_EMAIL_REQUEST,
  INVITE_NAVIGATOR_BY_EMAIL_ERROR,
  INVITE_NAVIGATOR_BY_EMAIL_SUCCESS,
} from '../constants';
import {
  inviteNavigatorsByEmailSuccess,
  inviteNavigatorsByEmailRequest,
} from '../actions';
import messages from '../messages';

export function* inviteNavigatorByEmail({
  payload: { emails, interventionId },
}: ReturnType<typeof inviteNavigatorsByEmailRequest>) {
  const url = `/v1/interventions/${interventionId}/navigator_invitations`;
  try {
    const { data } = yield call(axios.post, url, {
      navigator_invitation: {
        emails,
      },
    });
    const invitations = jsonApiToArray(
      data,
      'navigatorInvitation',
    ) as PendingNavigatorInvitations[];
    yield put(inviteNavigatorsByEmailSuccess(invitations));
    yield call(toast.success, formatMessage(messages.navigatorHasBeenInvited), {
      toastId: INVITE_NAVIGATOR_BY_EMAIL_SUCCESS,
    });
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: INVITE_NAVIGATOR_BY_EMAIL_ERROR,
    });
  }
}

export default function* inviteNavigatorByEmailSaga() {
  yield takeLatest(INVITE_NAVIGATOR_BY_EMAIL_REQUEST, inviteNavigatorByEmail);
}
