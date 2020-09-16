import axios from 'axios';
import { put, select, takeLatest } from 'redux-saga/effects';
import { info as showInfo, error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  makeSelectCurrentInterventionIndex,
  makeSelectProblem,
} from '../selectors';
import {
  sendInterventionInviteError,
  sendInterventionInviteSuccess,
} from '../actions';
import {
  RESEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
} from '../constants';
import messages from '../messages';

function* sendInterventionInvite({ payload: { emails } }) {
  const interventionIndex = yield select(makeSelectCurrentInterventionIndex());
  const problem = yield select(makeSelectProblem());
  const intervention = problem.interventions[interventionIndex];
  const requestURL = `v1/problems/${intervention.problem_id}/interventions/${
    intervention.id
  }/invite`;
  try {
    yield axios.post(requestURL, { intervention: { emails } });
    yield put(sendInterventionInviteSuccess());
    yield put(
      showInfo(formatMessage(messages.sendInviteSuccess), {
        id: SEND_INTERVENTION_INVITE_SUCCESS,
      }),
    );
  } catch (error) {
    yield put(sendInterventionInviteError());
    yield put(
      showError(formatMessage(messages.sendInviteError), {
        id: SEND_INTERVENTION_INVITE_ERROR,
      }),
    );
  }
}

export default function* sendInterventionInviteSaga() {
  yield takeLatest(
    [SEND_INTERVENTION_INVITE_REQUEST, RESEND_INTERVENTION_INVITE_REQUEST],
    sendInterventionInvite,
  );
}
