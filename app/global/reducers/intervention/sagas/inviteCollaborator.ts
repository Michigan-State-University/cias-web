import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { Collaborator } from 'models/Collaborator';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import {
  makeResearcherLoading,
  makeResearcherNotLoading,
} from 'global/reducers/userList/actions';
import {
  addCollaboratorsError,
  addCollaboratorsRequest,
  addCollaboratorsSuccess,
} from '../actions';
import messages from '../messages';
import { ADD_COLLABORATORS_REQUEST } from '../constants';

export function* addCollaborators({
  payload: { emails, interventionId, id },
}: ReturnType<typeof addCollaboratorsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/collaborators`;

  try {
    yield put(makeResearcherLoading(id));
    const { data } = yield call(axios.post, requestURL, { emails });
    const collaborators: Collaborator[] = jsonApiToArray(data, 'collaborator');
    yield call(toast.success, formatMessage(messages.addCollaboratorSuccess));
    yield put(addCollaboratorsSuccess(collaborators));
    yield put(makeResearcherNotLoading(id));
  } catch (error) {
    yield put(addCollaboratorsError(error));
    yield put(makeResearcherNotLoading(id));
    yield call(toast.error, formatMessage(messages.addCollaboratorError));
  }
}

export default function* addCollaboratorsSaga() {
  yield takeLatest(ADD_COLLABORATORS_REQUEST, addCollaborators);
}
