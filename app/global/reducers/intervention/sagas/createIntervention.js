import axios from 'axios';
import { put, takeLatest, call } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';

import globalMessages from 'global/i18n/globalMessages';
import { RoutePath } from 'global/constants';

import { formatMessage } from 'utils/intlOutsideReact';
import { parametrizeRoutePath } from 'utils/router';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import { createInterventionSuccess } from '../actions';
import {
  CREATE_INTERVENTION_REQUEST,
  CREATE_INTERVENTION_ERROR,
} from '../constants';

function* createIntervention({ payload: { organizationId } }) {
  const requestURL = `v1/interventions`;

  try {
    const requestData = {
      name: 'New e-Intervention',
    };
    if (organizationId) {
      requestData.organization_id = organizationId;
    }
    const { data } = yield call(axios.post, requestURL, requestData);

    const intervention = jsonApiToObject(data, 'intervention');

    yield put(createInterventionSuccess(intervention));
    yield put(
      push(
        parametrizeRoutePath(RoutePath.INTERVENTION_DETAILS, {
          interventionId: intervention.id,
        }),
      ),
    );
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

function* createInterventionSaga() {
  yield takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention);
}

export const withCreateInterventionSaga = {
  key: 'createIntervention',
  saga: createInterventionSaga,
};
