import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  fetchUsersWithAccessRequest,
  sendInterventionInvitationsError,
  sendInterventionInvitationsRequest,
  sendInterventionInvitationsSuccess,
} from '../actions';
import {
  SEND_INTERVENTION_INVITATIONS_ERROR,
  SEND_INTERVENTION_INVITATIONS_REQUEST,
  SEND_INTERVENTION_INVITATIONS_SUCCESS,
} from '../constants';
import messages from '../messages';

function* sendInterventionInvitations({
  payload: { interventionId, invitations, onSuccess },
}: ReturnType<typeof sendInterventionInvitationsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/invitations`;
  const requestBody = {
    invitations,
  };

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectToSnakeCase(requestBody),
    );

    const sentInvitations = jsonApiToArray(data, 'invitation');
    yield put(sendInterventionInvitationsSuccess(sentInvitations));
    yield put(fetchUsersWithAccessRequest(interventionId));
    yield call(toast.info, formatMessage(messages.sendInviteSuccess), {
      toastId: SEND_INTERVENTION_INVITATIONS_SUCCESS,
    });

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    yield put(sendInterventionInvitationsError());
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.sendInviteError),
      {
        toastId: SEND_INTERVENTION_INVITATIONS_ERROR,
      },
    );
  }
}

export default function* sendInterventionInvitationsSaga() {
  yield takeEvery(
    SEND_INTERVENTION_INVITATIONS_REQUEST,
    sendInterventionInvitations,
  );
}
