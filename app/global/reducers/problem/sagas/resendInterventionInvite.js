import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { info as showInfo, error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  sendInterventionInviteError,
  sendInterventionInviteSuccess,
} from '../actions';
import { RESEND_INTERVENTION_INVITE_REQUEST } from '../constants';
import messages from '../messages';

function* resendInterventionInvite({ payload: { id, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/invitations/${id}/resend`;
  try {
    yield axios.get(requestURL);
    yield put(sendInterventionInviteSuccess());
    yield put(showInfo(formatMessage(messages.resendInviteSuccess)));
  } catch (error) {
    yield put(sendInterventionInviteError());
    yield put(showError(formatMessage(messages.resendInviteError)));
  }
}

export default function* resendInterventionInviteSaga() {
  yield takeLatest(
    [RESEND_INTERVENTION_INVITE_REQUEST],
    resendInterventionInvite,
  );
}
