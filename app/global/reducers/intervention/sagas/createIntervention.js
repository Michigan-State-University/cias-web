import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { createInterventionSuccess } from '../actions';
import {
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_ERROR,
} from '../constants';

export function* createIntervention() {
  const requestURL = `v1/interventions`;

  try {
    const { data } = yield call(axios.post, requestURL, {
      name: 'New e-Intervention',
    });

    const intervention = jsonApiToObject(data, 'intervention');

    yield put(createInterventionSuccess(intervention));
    yield put(push(`/interventions/${intervention.id}`));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(globalMessages.createInterventionError),
      {
        toastId: CREATE_INTERVENTION_ERROR,
      },
    );
  }
}
export default function* createInterventionSaga() {
  yield takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention);
}
