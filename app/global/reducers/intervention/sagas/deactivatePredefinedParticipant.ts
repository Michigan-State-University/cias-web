import axios from 'axios';
import { put, call, takeEvery } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import {
  deactivatePredefinedParticipantError,
  deactivatePredefinedParticipantRequest,
  deactivatePredefinedParticipantSuccess,
} from '../actions';
import {
  DEACTIVATE_PREDEFINED_PARTICIPANT_ERROR,
  DEACTIVATE_PREDEFINED_PARTICIPANT_REQUEST,
} from '../constants';
import messages from '../messages';

function* deactivatePredefinedParticipant({
  payload: { interventionId, participantId },
}: ReturnType<typeof deactivatePredefinedParticipantRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/${participantId}`;
  const requestBody = {
    predefinedUser: {
      active: false,
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
    yield put(deactivatePredefinedParticipantSuccess(predefinedParticipant));
  } catch (error) {
    yield put(deactivatePredefinedParticipantError());
    yield call(
      toast.error,
      formatApiErrorMessage(
        error,
        messages.deactivatePredefinedParticipantError,
      ),
      {
        toastId: DEACTIVATE_PREDEFINED_PARTICIPANT_ERROR,
      },
    );
  }
}

export default function* deactivatePredefinedParticipantSaga() {
  yield takeEvery(
    DEACTIVATE_PREDEFINED_PARTICIPANT_REQUEST,
    deactivatePredefinedParticipant,
  );
}
