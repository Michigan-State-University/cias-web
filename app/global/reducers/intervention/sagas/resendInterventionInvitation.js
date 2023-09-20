import axios from 'axios';
import { takeEvery, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { RESEND_INTERVENTION_INVITATION_REQUEST } from '../constants';
import messages from '../messages';

export function* resendInterventionInvitation({
  payload: { id, interventionId },
}) {
  const requestURL = `v1/interventions/${interventionId}/invitations/${id}/resend`;
  try {
    yield call(axios.get, requestURL);
    yield call(toast.info, formatMessage(messages.resendInviteSuccess));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.resendInviteError));
  }
}

export default function* resendInterventionInvitationSaga() {
  yield takeEvery(
    [RESEND_INTERVENTION_INVITATION_REQUEST],
    resendInterventionInvitation,
  );
}
