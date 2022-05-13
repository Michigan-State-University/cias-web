import axios from 'axios';
import { put, select, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import objectKeysToSnakeCase from 'utils/objectToSnakeCase';

import {
  sendInterventionInviteError,
  sendInterventionInviteSuccess,
} from '../actions';
import {
  SEND_INTERVENTION_INVITE_ERROR,
  SEND_INTERVENTION_INVITE_REQUEST,
  SEND_INTERVENTION_INVITE_SUCCESS,
} from '../constants';
import messages from '../messages';
import { makeSelectIntervention } from '../selectors';

export function* sendInterventionInvite({
  payload: { emails, interventionId },
}) {
  const { organizationId } = yield select(makeSelectIntervention());

  const organizationPrefix = organizationId
    ? `/organizations/${organizationId}/`
    : '';
  const requestURL = `v1/${organizationPrefix}interventions/${interventionId}/invitations`;
  const requestBody = organizationId
    ? {
        intervention_invitations: emails,
      }
    : {
        intervention_invitation: { emails },
      };
  try {
    yield call(axios.post, requestURL, objectKeysToSnakeCase(requestBody));

    yield put(sendInterventionInviteSuccess());
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
