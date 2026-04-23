import axios from 'axios';
import { put, call, takeLatest } from 'redux-saga/effects';

import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
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

export function* bulkCreatePredefinedParticipants({
  payload: { interventionId, data, onSuccess },
}: ReturnType<typeof bulkCreatePredefinedParticipantsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/bulk_create`;

  // Strip variable_answers before snake-casing — lodash snakeCase() mangles dotted keys like "s1.mood" → "s_1_mood". Re-attached below.
  const participantsWithoutAnswers = data.participants.map(
    ({
      variableAnswers,
      ...rest
    }: {
      variableAnswers?: Record<string, string>;
      [key: string]: unknown;
    }) => rest,
  );
  const originalVariableAnswers = data.participants.map(
    (p: { variableAnswers?: Record<string, string> }) =>
      p.variableAnswers ?? {},
  );

  const snakeCasedBody = objectToSnakeCase({
    predefinedUsers: {
      ...data,
      participants: participantsWithoutAnswers,
    },
  });
  snakeCasedBody.predefined_users.participants.forEach(
    (p: Record<string, unknown>, i: number) => {
      // eslint-disable-next-line no-param-reassign
      p.variable_answers = originalVariableAnswers[i];
    },
  );

  try {
    yield call(axios.post, requestURL, snakeCasedBody);

    yield put(bulkCreatePredefinedParticipantsSuccess());
    yield call(
      toast.success,
      formatMessage(messages.bulkCreatePredefinedParticipantsAccepted),
      {
        toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_SUCCESS,
      },
    );

    yield put(fetchPredefinedParticipantsRequest(interventionId));

    if (onSuccess) {
      onSuccess();
    }
  } catch (error) {
    yield put(bulkCreatePredefinedParticipantsError(error));

    const structuredErrors = (error as any)?.response?.data?.details?.errors;
    if (Array.isArray(structuredErrors) && structuredErrors.length > 0) {
      yield call(
        toast.error,
        formatMessage(messages.bulkCreatePredefinedParticipantsErrorList, {
          count: structuredErrors.length,
        }),
        {
          toastId: BULK_CREATE_PREDEFINED_PARTICIPANTS_ERROR,
        },
      );
    } else {
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
}

export default function* bulkCreatePredefinedParticipantsSaga() {
  yield takeLatest(
    BULK_CREATE_PREDEFINED_PARTICIPANTS_REQUEST,
    bulkCreatePredefinedParticipants,
  );
}
