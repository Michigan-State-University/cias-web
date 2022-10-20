import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { jsonApiToArray } from 'utils/jsonApiMapper';
import { PendingNavigatorInvitation } from 'models/NavigatorSetup';
import {
  INVITE_NAVIGATOR_BY_EMAIL_REQUEST,
  INVITE_NAVIGATOR_BY_EMAIL_ERROR,
  INVITE_NAVIGATOR_BY_EMAIL_SUCCESS,
} from '../constants';
import {
  inviteNavigatorsByEmailSuccess,
  inviteNavigatorsByEmailRequest,
  inviteNavigatorsByEmailError,
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
    ) as PendingNavigatorInvitation[];
    yield put(inviteNavigatorsByEmailSuccess(invitations));
    yield call(toast.info, formatMessage(messages.navigatorHasBeenInvited), {
      toastId: INVITE_NAVIGATOR_BY_EMAIL_SUCCESS,
    });
  } catch (error) {
    yield put(inviteNavigatorsByEmailError());
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: INVITE_NAVIGATOR_BY_EMAIL_ERROR,
    });
  }
}

export default function* inviteNavigatorByEmailSaga() {
  yield takeLatest(INVITE_NAVIGATOR_BY_EMAIL_REQUEST, inviteNavigatorByEmail);
}
