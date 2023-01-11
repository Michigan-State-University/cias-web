import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest, call, put } from 'redux-saga/effects';

import { formatMessage } from 'utils/intlOutsideReact';

import { IMPORT_INTERVENTION_REQUEST } from '../constants';

import messages from '../messages';
import { importInterventionError, importInterventionSuccess } from '../actions';

export function* importIntervention({ payload: { file, extraOptions } }) {
  const requestURL = `v1/interventions/import`;

  try {
    const formData = new FormData();
    formData.append(`imported_file[file]`, file);

    const headers = { 'Content-Type': 'multipart/form-data' };
    yield call(axios.post, requestURL, formData, { headers });

    yield put(importInterventionSuccess());
    if (extraOptions?.onSuccess) {
      extraOptions.onSuccess();
    }
    yield call(toast.info, formatMessage(messages.importSuccess));
  } catch (error) {
    yield put(importInterventionError(error));
    yield call(toast.error, formatMessage(messages.importError));
  }
}

export default function* importInterventionSaga() {
  yield takeLatest(IMPORT_INTERVENTION_REQUEST, importIntervention);
}
