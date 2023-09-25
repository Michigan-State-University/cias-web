import axios from 'axios';
import { takeEvery, call, put } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { RESEND_INTERVENTION_INVITATION_REQUEST } from '../constants';
import messages from '../messages';
import {
  resendInterventionInvitationError,
  resendInterventionInvitationSuccess,
} from '../actions';

export function* resendInterventionInvitation({
  payload: { id, interventionId },
}) {
  const requestURL = `v1/interventions/${interventionId}/invitations/${id}/resend`;
  try {
    yield call(axios.get, requestURL);
    yield call(toast.info, formatMessage(messages.resendInviteSuccess));
    yield put(resendInterventionInvitationSuccess(id));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.resendInviteError));
    yield put(resendInterventionInvitationError(id));
  }
}

export default function* resendInterventionInvitationSaga() {
  yield takeEvery(
    [RESEND_INTERVENTION_INVITATION_REQUEST],
    resendInterventionInvitation,
  );
}
