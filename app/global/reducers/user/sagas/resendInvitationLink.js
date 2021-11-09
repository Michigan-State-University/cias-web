import { takeLatest, put, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import axios from 'axios';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { RESEND_INVITATION_LINK_REQUEST } from '../constants';
import {
  resendInvitationLinkError,
  resendInvitationLinkSuccess,
} from '../actions';

function* resendInvitationLink({ payload: { userId } }) {
  const url = '/v1/users/invitations/resend';
  const body = {
    id: userId,
  };
  try {
    yield call(axios.post, url, body);
    yield put(resendInvitationLinkSuccess());
    yield call(toast.info, formatMessage(messages.resendInvitationLinkSuccess));
  } catch (error) {
    yield put(resendInvitationLinkError({ error }));
    yield call(toast.error, formatMessage(messages.resendInvitationLinkError));
  }
}

export default function* resendInvitationLinkSaga() {
  yield takeLatest(RESEND_INVITATION_LINK_REQUEST, resendInvitationLink);
}
