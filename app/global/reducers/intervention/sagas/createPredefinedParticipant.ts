import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  createPredefinedParticipantError,
  createPredefinedParticipantRequest,
  createPredefinedParticipantSuccess,
} from '../actions';
import {
  CREATE_PREDEFINED_PARTICIPANT_ERROR,
  CREATE_PREDEFINED_PARTICIPANT_REQUEST,
  CREATE_PREDEFINED_PARTICIPANT_SUCCESS,
} from '../constants';
import messages from '../messages';

function* createPredefinedParticipant({
  payload: { interventionId, predefinedParticipantData, onSuccess },
}: ReturnType<typeof createPredefinedParticipantRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants`;
  const requestBody = {
    predefinedUser: predefinedParticipantData,
  };

  try {
    const { data } = yield call(
      axios.post,
      requestURL,
      objectToSnakeCase(requestBody),
    );

    const predefinedParticipant = jsonApiToObject(
      data,
      'predefinedParticipant',
    );
    yield put(createPredefinedParticipantSuccess(predefinedParticipant));
    yield call(
      toast.success,
      formatMessage(messages.createPredefinedParticipantSuccess),
      {
        toastId: CREATE_PREDEFINED_PARTICIPANT_SUCCESS,
      },
    );

    if (onSuccess) {
      onSuccess(predefinedParticipant.id);
    }
  } catch (error) {
    yield put(createPredefinedParticipantError());
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.createPredefinedParticipantError),
      {
        toastId: CREATE_PREDEFINED_PARTICIPANT_ERROR,
      },
    );
  }
}

export default function* createPredefinedParticipantSaga() {
  yield takeEvery(
    CREATE_PREDEFINED_PARTICIPANT_REQUEST,
    createPredefinedParticipant,
  );
}
