import axios from 'axios';
import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  INVITE_NAVIGATOR_BY_EMAIL_REQUEST,
  INVITE_NAVIGATOR_BY_EMAIL_ERROR,
} from '../constants';
import {
  inviteNavigatorsByEmailSuccess,
  inviteNavigatorsByEmailRequest,
} from '../actions';
import messages from '../messages';

export function* inviteNavigatorByEmail({
  payload: { emails, interventionId },
}: ReturnType<typeof inviteNavigatorsByEmailRequest>) {
  const url = `/v1/live_chat/navigators/invitations`;
  try {
    yield call(axios.post, url, {
      navigator_invitation: {
        emails,
        intervention_id: interventionId,
      },
    });
    yield put(
      inviteNavigatorsByEmailSuccess(
        emails.map((email) => ({ email, id: `${Math.random()}` })),
      ),
    );
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updateError), {
      toastId: INVITE_NAVIGATOR_BY_EMAIL_ERROR,
    });
  }
}

export default function* inviteNavigatorByEmailSaga() {
  yield takeLatest(INVITE_NAVIGATOR_BY_EMAIL_REQUEST, inviteNavigatorByEmail);
}
