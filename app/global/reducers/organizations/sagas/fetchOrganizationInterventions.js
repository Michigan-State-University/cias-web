import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import { FETCH_ORGANIZATION_INTERVENTIONS_REQUEST } from '../constants';
import {
  fetchOrganizationInterventionsFailure,
  fetchOrganizationInterventionsSuccess,
} from '../actions';

export function* fetchOrganizationInterventions({
  payload: { organizationId, paginationData },
}) {
  const requestURL = `v1/interventions`;
  const { startIndex, endIndex } = paginationData ?? {};

  try {
    const { data } = yield call(axios.get, requestURL, {
      params: objectToSnakeCase({ startIndex, endIndex, organizationId }),
    });

    const { interventions_size: interventionCount } = data;
    const interventions = jsonApiToArray(data, 'intervention');

    yield put(
      fetchOrganizationInterventionsSuccess(
        interventions,
        interventionCount,
        startIndex,
      ),
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
