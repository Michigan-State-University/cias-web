import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  removeCollaboratorError,
  removeCollaboratorRequest,
  removeCollaboratorSuccess,
} from '../actions';
import messages from '../messages';
import { REMOVE_COLLABORATOR_REQUEST } from '../constants';

export function* removeCollaborator({
  payload: { collaboratorId, interventionId },
}: ReturnType<typeof removeCollaboratorRequest>) {
  const requestURL = `v1/interventions/${interventionId}/collaborators/${collaboratorId}`;

  try {
    yield call(axios.delete, requestURL);
    yield put(removeCollaboratorSuccess());
  } catch (error) {
    yield put(removeCollaboratorError());
    yield call(toast.error, formatMessage(messages.removeCollaboratorError));
  }
}

export default function* removeCollaboratorSaga() {
  yield takeLatest(REMOVE_COLLABORATOR_REQUEST, removeCollaborator);
}
