import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import {
  exportInterventionRequest,
  exportInterventionSuccess,
  exportInterventionError,
} from '../actions';
import messages from '../messages';
import {
  EXPORT_INTERVENTION_REQUEST,
  EXPORT_INTERVENTION_ERROR,
} from '../constants';

function* exportIntervention({
  payload: { interventionId, onSuccess },
}: ReturnType<typeof exportInterventionRequest>) {
  const url = `v1/interventions/${interventionId}/export`;

  try {
    yield call(axios.post, url);
    yield put(exportInterventionSuccess());
    onSuccess();
  } catch (error) {
    yield put(exportInterventionError(error));
    yield call(toast.error, formatMessage(messages.exportInterventionError), {
      toastId: EXPORT_INTERVENTION_ERROR,
    });
  }
}

function* exportInterventionSaga() {
  yield takeEvery(EXPORT_INTERVENTION_REQUEST, exportIntervention);
}

export const withExportInterventionSaga = {
  key: 'exportInterventionSaga',
  saga: exportInterventionSaga,
};
