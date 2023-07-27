import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import { Collaborator } from 'models/Collaborator';

import {
  fetchCollaboratorsError,
  fetchCollaboratorsRequest,
  fetchCollaboratorsSuccess,
} from '../actions';
import messages from '../messages';
import { FETCH_COLLABORATORS_REQUEST } from '../constants';

export function* fetchCollaborators({
  payload: { interventionId },
}: ReturnType<typeof fetchCollaboratorsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/collaborators`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const collaborators: Collaborator[] = jsonApiToArray(data, 'collaborator');
    yield put(fetchCollaboratorsSuccess(collaborators));
  } catch (error) {
    yield put(fetchCollaboratorsError(error));
    yield call(toast.error, formatMessage(messages.addCollaboratorError));
  }
}

export default function* fetchCollaboratorsSaga() {
  yield takeLatest(FETCH_COLLABORATORS_REQUEST, fetchCollaborators);
}
