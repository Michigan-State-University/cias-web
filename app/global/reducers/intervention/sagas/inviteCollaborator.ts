import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { Collaborator } from 'models/Collaborator';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { setUsersItemsState, UserItemState } from 'global/reducers/userList';
import {
  addCollaboratorsError,
  addCollaboratorsRequest,
  addCollaboratorsSuccess,
} from '../actions';
import messages from '../messages';
import { ADD_COLLABORATORS_REQUEST } from '../constants';

export function* addCollaborators({
  payload: { emails, interventionId, ids },
}: ReturnType<typeof addCollaboratorsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/collaborators`;

  if (ids) {
    yield put(setUsersItemsState(ids, UserItemState.LOADING));
  }

  try {
    const { data } = yield call(axios.post, requestURL, { emails });
    const collaborators: Collaborator[] = jsonApiToArray(data, 'collaborator');
    yield call(toast.success, formatMessage(messages.addCollaboratorSuccess));
    yield put(addCollaboratorsSuccess(collaborators));
    if (ids) {
      yield put(setUsersItemsState(ids, UserItemState.SUCCESS));
    }
  } catch (error) {
    yield put(addCollaboratorsError(error));
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.addCollaboratorError),
    );
    if (ids) {
      yield put(setUsersItemsState(ids, UserItemState.IDLE));
    }
  }
}

export default function* addCollaboratorsSaga() {
  yield takeLatest(ADD_COLLABORATORS_REQUEST, addCollaborators);
}
