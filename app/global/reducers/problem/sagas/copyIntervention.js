import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { copyInterventionSuccess } from '../actions';
import {
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
} from '../constants';

export function* copyIntervention({ payload: { interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/clone`;

  try {
    const response = yield call(axios.post, requestURL);

    const copiedInterventions = response.data.data;

    yield put(copyInterventionSuccess(copiedInterventions));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.copyError), {
      toastId: COPY_INTERVENTION_ERROR,
    });
  }
}

export default function* copyInterventionSaga() {
  yield takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention);
}
