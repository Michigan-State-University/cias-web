import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  sendInterventionInvitationsError,
  sendInterventionInvitationsSuccess,
} from '../actions';
import { RESEND_INTERVENTION_INVITE_REQUEST } from '../constants';
import messages from '../messages';

export function* resendInterventionInvite({ payload: { id, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/invitations/${id}/resend`;
  try {
    yield call(axios.get, requestURL);
    yield put(sendInterventionInvitationsSuccess());
    yield call(toast.info, formatMessage(messages.resendInviteSuccess));
  } catch (error) {
    yield put(sendInterventionInvitationsError());
    yield call(toast.error, formatMessage(messages.resendInviteError));
  }
}

export default function* resendInterventionInviteSaga() {
  yield takeLatest(
    [RESEND_INTERVENTION_INVITE_REQUEST],
    resendInterventionInvite,
  );
}
