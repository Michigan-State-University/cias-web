import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { sendSessionInviteError, sendSessionInviteSuccess } from '../actions';
import { RESEND_SESSION_INVITE_REQUEST } from '../constants';
import messages from '../messages';

export function* resendSessionInvite({ payload: { id, sessionId } }) {
  const requestURL = `v1/sessions/${sessionId}/invitations/${id}/resend`;
  try {
    yield call(axios.get, requestURL);
    yield put(sendSessionInviteSuccess());
    yield call(toast.info, formatMessage(messages.resendInviteSuccess));
  } catch (error) {
    yield put(sendSessionInviteError());
    yield call(toast.error, formatMessage(messages.resendInviteError));
  }
}

export default function* resendSessionInviteSaga() {
  yield takeLatest([RESEND_SESSION_INVITE_REQUEST], resendSessionInvite);
}
