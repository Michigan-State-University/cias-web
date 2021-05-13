import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_ORGANIZATION_INTERVENTIONS_REQUEST } from '../constants';
import {
  fetchOrganizationInterventionsFailure,
  fetchOrganizationInterventionsSuccess,
} from '../actions';

export function* fetchOrganizationInterventions({
  payload: { organizationId },
}) {
  const requestURL = `v1/organizations/${organizationId}/interventions`;

  try {
    const {
      data: { interventions },
    } = yield call(axios.get, requestURL);

    yield put(fetchOrganizationInterventionsSuccess(interventions));
  } catch (error) {
    yield put(fetchOrganizationInterventionsFailure(error));
  }
}

export default function* fetchOrganizationInterventionsSaga() {
  yield takeLatest(
    FETCH_ORGANIZATION_INTERVENTIONS_REQUEST,
    fetchOrganizationInterventions,
  );
}
