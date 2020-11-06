import axios from 'axios';
import { put, select, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  fetchInterventionEmailsSuccess,
  sendInterventionInviteError,
  sendInterventionInviteSuccess,
} from '../actions';
import {
  SEND_INTERVENTION_INVITE_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
} from '../constants';
import messages from '../messages';
import { makeSelectProblem } from '../selectors';

export function* sendInterventionInvite({
  payload: { emails, interventionId },
}) {
  const problem = yield select(makeSelectProblem());
  const interventionIndex = problem.interventions.findIndex(
    intervention => intervention.id === interventionId,
  );

  const requestURL = `v1/interventions/${interventionId}/invitations`;
  try {
    const {
      data: { intervention_invitations: users },
    } = yield call(axios.post, requestURL, {
      intervention_invitation: { emails },
    });
    yield put(sendInterventionInviteSuccess());
    yield put(fetchInterventionEmailsSuccess(users, interventionIndex));
    yield call(toast.info, formatMessage(messages.sendInviteSuccess), {
      toastId: SEND_INTERVENTION_INVITE_SUCCESS,
    });
  } catch (error) {
    yield put(sendInterventionInviteError());
    yield call(toast.error, formatMessage(messages.sendInviteError), {
      toastId: SEND_INTERVENTION_INVITE_ERROR,
    });
  }
}

export default function* sendInterventionInviteSaga() {
  yield takeLatest([SEND_INTERVENTION_INVITE_REQUEST], sendInterventionInvite);
}
