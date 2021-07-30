import axios from 'axios';
import { put, select, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import groupBy from 'lodash/groupBy';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';
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
  const { sessions, organizationId } = yield select(makeSelectIntervention());
  const sessionIndex = sessions.findIndex(
    (session) => session.id === sessionId,
  );
  const organizationPrefix = organizationId
    ? `/organizations/${organizationId}/`
    : '';
  const requestURL = `v1/${organizationPrefix}sessions/${sessionId}/invitations`;
  const requestBody = organizationId
    ? {
        session_invitations: emails,
      }
    : {
        session_invitation: { emails },
      };
  try {
    const { data } = yield call(axios.post, requestURL, requestBody);
    let invitations = jsonApiToArray(data, 'invitation');
    if (organizationId) {
      invitations = groupBy(invitations, 'healthClinicId');
    }
    console.log(invitations);
    yield put(sendSessionInviteSuccess());
    yield put(fetchSessionEmailsSuccess(invitations, sessionIndex));
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
