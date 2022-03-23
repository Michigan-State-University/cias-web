import axios from 'axios';
import { takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
  COPY_INTERVENTION_SUCCESS,
} from '../constants';

export function* copyIntervention({ payload: { interventionId, users } }) {
  const requestURL = `v1/interventions/${interventionId}/clone`;
  let params;
  if (users) params = { intervention: { user_ids: users } };
  try {
    yield call(axios.post, requestURL, params);

    const successMessage = users
      ? messages.copySuccess
      : messages.duplicateSuccess;

    yield call(
      toast.info,
      formatMessage(successMessage, {
        userCount: users?.length,
      }),
      {
        toastId: `${COPY_INTERVENTION_SUCCESS}_${Boolean(users)}`,
      },
    );
  } catch (error) {
    const errorMessage = users ? messages.copyError : messages.duplicateError;

    yield call(toast.error, formatMessage(errorMessage), {
      toastId: `${COPY_INTERVENTION_ERROR}_${Boolean(users)}`,
    });
  }
}

export default function* copyInterventionSaga() {
  yield takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention);
}
