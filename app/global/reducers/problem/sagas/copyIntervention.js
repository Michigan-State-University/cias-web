import axios from 'axios';
import { put, takeLatest } from 'redux-saga/effects';
import { error as showError } from 'react-toastify-redux';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { copyInterventionSuccess } from '../actions';
import {
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
} from '../constants';

function* copyIntervention({ payload: { interventionId } }) {
  const requestURL = `v1/interventions/${interventionId}/clone`;

  try {
    const response = yield axios.post(requestURL);

    const copiedInterventions = response.data.data;

    yield put(copyInterventionSuccess(copiedInterventions));
  } catch (error) {
    yield put(
      showError(formatMessage(messages.copyError), {
        id: COPY_INTERVENTION_ERROR,
      }),
    );
  }
}

export default function* copyInterventionSaga() {
  yield takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention);
}
