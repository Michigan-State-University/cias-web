import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { info as showInfo, error as showError } from 'react-toastify-redux';

import { formatMessage } from 'utils/intlOutsideReact';
import {
  deleteInterventionInviteError,
  deleteInterventionInviteSuccess,
} from '../actions';
import { DELETE_INTERVENTION_INVITE_REQUEST } from '../constants';
import messages from '../messages';

function* deleteInterventionInvite({ payload: { id, interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/invitations/${id}`;
  try {
    yield axios.delete(requestURL);
    yield put(deleteInterventionInviteSuccess());
    yield put(showInfo(formatMessage(messages.deleteInviteSuccess)));
  } catch (error) {
    yield put(deleteInterventionInviteError());
    yield put(showError(formatMessage(messages.deleteInviteError)));
  }
}

export default function* deleteInterventionInviteSaga() {
  yield takeLatest(
    [DELETE_INTERVENTION_INVITE_REQUEST],
    deleteInterventionInvite,
  );
}
