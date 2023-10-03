import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  updatePredefinedParticipantError,
  updatePredefinedParticipantRequest,
  updatePredefinedParticipantSuccess,
} from '../actions';
import {
  UPDATE_PREDEFINED_PARTICIPANT_ERROR,
  UPDATE_PREDEFINED_PARTICIPANT_REQUEST,
  UPDATE_PREDEFINED_PARTICIPANT_SUCCESS,
} from '../constants';
import messages from '../messages';

function* updatePredefinedParticipant({
  payload: { interventionId, participantId, predefinedParticipantData },
}: ReturnType<typeof updatePredefinedParticipantRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/${participantId}`;
  const requestBody = {
    predefinedUser: predefinedParticipantData,
  };

  try {
    const { data } = yield call(
      axios.patch,
      requestURL,
      objectToSnakeCase(requestBody),
    );

    const predefinedParticipant = jsonApiToObject(
      data,
      'predefinedParticipant',
    );
    yield put(updatePredefinedParticipantSuccess(predefinedParticipant));
    yield call(
      toast.success,
      formatMessage(messages.updatePredefinedParticipantSuccess),
      {
        toastId: UPDATE_PREDEFINED_PARTICIPANT_SUCCESS,
      },
    );
  } catch (error) {
    yield put(updatePredefinedParticipantError());
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.updatePredefinedParticipantError),
      {
        toastId: UPDATE_PREDEFINED_PARTICIPANT_ERROR,
      },
    );
  }
}

export default function* updatePredefinedParticipantSaga() {
  yield takeEvery(
    UPDATE_PREDEFINED_PARTICIPANT_REQUEST,
    updatePredefinedParticipant,
  );
}
