import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToArray } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  bulkCreatePredefinedParticipantsError,
  bulkCreatePredefinedParticipantsRequest,
  bulkCreatePredefinedParticipantsSuccess,
  fetchPredefinedParticipantsRequest,
} from '../actions';
import {
  BULK_CREATE_PREDEFINED_PARTICIPANTS_ERROR,
  BULK_CREATE_PREDEFINED_PARTICIPANTS_REQUEST,
  BULK_CREATE_PREDEFINED_PARTICIPANTS_SUCCESS,
} from '../constants';
import messages from '../messages';

function* bulkCreatePredefinedParticipants({
  payload: { interventionId, data, onSuccess },
}: ReturnType<typeof bulkCreatePredefinedParticipantsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/bulk_create`;

  try {
    const { data: responseData } = yield call(
      axios.post,
      requestURL,
      objectToSnakeCase({ predefinedUsers: data }),
    );

    const predefinedParticipants = jsonApiToArray(
      responseData,
      'predefinedParticipant',
    );

    console.log('Created predefined participants:', predefinedParticipants);
    yield put(bulkCreatePredefinedParticipantsSuccess(predefinedParticipants));
    yield call(
      toast.success,
      formatMessage(messages.bulkCreatePredefinedParticipantsSuccess),
      {
        toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_SUCCESS,
      },
    );

    // Refresh the predefined participants list
    yield put(fetchPredefinedParticipantsRequest(interventionId));

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    yield put(bulkCreatePredefinedParticipantsError(error));
    yield call(
      toast.error,
      formatApiErrorMessage(
        error,
        messages.bulkCreatePredefinedParticipantsError,
      ),
      {
        toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_ERROR,
      },
    );
  }
}

export default function* bulkCreatePredefinedParticipantsSaga() {
  yield takeLatest(
    BULK_CREATE_PREDEFINED_PARTICIPANTS_REQUEST,
    bulkCreatePredefinedParticipants,
  );
}
