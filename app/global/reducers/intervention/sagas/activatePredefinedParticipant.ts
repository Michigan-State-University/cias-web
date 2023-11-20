import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  activatePredefinedParticipantError,
  activatePredefinedParticipantRequest,
  activatePredefinedParticipantSuccess,
} from '../actions';
import {
  ACTIVATE_PREDEFINED_PARTICIPANT_ERROR,
  ACTIVATE_PREDEFINED_PARTICIPANT_REQUEST,
} from '../constants';
import messages from '../messages';

function* activatePredefinedParticipant({
  payload: { interventionId, participantId },
}: ReturnType<typeof activatePredefinedParticipantRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/${participantId}`;
  const requestBody = {
    predefinedUser: {
      active: true,
    },
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
    yield put(activatePredefinedParticipantSuccess(predefinedParticipant));
  } catch (error) {
    yield put(activatePredefinedParticipantError());
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.activatePredefinedParticipantError),
      {
        toastId: ACTIVATE_PREDEFINED_PARTICIPANT_ERROR,
      },
    );
  }
}

export default function* activatePredefinedParticipantSaga() {
  yield takeEvery(
    ACTIVATE_PREDEFINED_PARTICIPANT_REQUEST,
    activatePredefinedParticipant,
  );
}
