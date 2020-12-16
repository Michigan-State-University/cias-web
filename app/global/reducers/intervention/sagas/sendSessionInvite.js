import axios from 'axios';
import { put, select, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  fetchSessionEmailsSuccess,
  sendSessionInviteError,
  sendSessionInviteSuccess,
} from '../actions';
import {
  SEND_SESSION_INVITE_ERROR,
  SEND_SESSION_INVITE_REQUEST,
  SEND_SESSION_INVITE_SUCCESS,
} from '../constants';
import messages from '../messages';
import { makeSelectIntervention } from '../selectors';

export function* sendSessionInvite({ payload: { emails, sessionId } }) {
  const intervention = yield select(makeSelectIntervention());
  const sessionIndex = intervention.sessions.findIndex(
    session => session.id === sessionId,
  );

  const requestURL = `v1/sessions/${sessionId}/invitations`;
  try {
    const test = yield call(axios.post, requestURL, {
      session_invitation: { emails },
    });
    console.log(test)
    const {
      data: { session_invitations: users },
    } = test
    yield put(sendSessionInviteSuccess());
    yield put(fetchSessionEmailsSuccess(users, sessionIndex));
    yield call(toast.info, formatMessage(messages.sendInviteSuccess), {
      toastId: SEND_SESSION_INVITE_SUCCESS,
    });
  } catch (error) {
    yield put(sendSessionInviteError());
    yield call(toast.error, formatMessage(messages.sendInviteError), {
      toastId: SEND_SESSION_INVITE_ERROR,
    });
  }
}

export default function* sendSessionInviteSaga() {
  yield takeLatest([SEND_SESSION_INVITE_REQUEST], sendSessionInvite);
}
