import axios from 'axios';
import { call, put, takeLatest } from '@redux-saga/core/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import { HttpStatusCodes } from 'utils/constants';

import { CollaboratorData } from 'models/Collaborator';

import { WithSaga } from 'global/reducers/types';

import {
  fetchCurrentUserCollaboratorDataError,
  fetchCurrentUserCollaboratorDataRequest,
  fetchCurrentUserCollaboratorDataSuccess,
} from '../actions';
import messages from '../messages';
import { FETCH_CURRENT_USER_COLLABORATOR_DATA_REQUEST } from '../constants';

export function* fetchCurrentUserCollaboratorData({
  payload: { interventionId },
}: ReturnType<typeof fetchCurrentUserCollaboratorDataRequest>) {
  const requestURL = `v1/interventions/${interventionId}/permission`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const currentUserCollaboratorData: CollaboratorData = jsonApiToObject(
      data,
      'collaborator',
    );
    yield put(
      fetchCurrentUserCollaboratorDataSuccess(currentUserCollaboratorData),
    );
  } catch (error: any) {
    yield put(fetchCurrentUserCollaboratorDataError());
    if (error?.response?.status !== HttpStatusCodes.NOT_FOUND) {
      yield call(
        toast.error,
        error?.response?.data?.message ||
          formatMessage(messages.fetchCurrentUserCollaboratorDataError),
      );
    }
  }
}

function* fetchCurrentUserCollaboratorDataSaga() {
  yield takeLatest(
    FETCH_CURRENT_USER_COLLABORATOR_DATA_REQUEST,
    fetchCurrentUserCollaboratorData,
  );
}

export const withFetchCurrentUserCollaboratorDataSaga: WithSaga = {
  key: 'fetchCurrentUserCollaboratorData',
  saga: fetchCurrentUserCollaboratorDataSaga,
};
