import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import { jsonApiToArray } from 'utils/jsonApiMapper';
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
    const { data } = yield call(axios.get, requestURL);
    const organizationInterventions = jsonApiToArray(data, 'intervention');

    yield put(
      fetchOrganizationInterventionsSuccess(organizationInterventions || []),
    );
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
