import axios from 'axios';
import get from 'lodash/get';
import { put, takeLatest, call } from 'redux-saga/effects';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import { fetchInterventionsSuccess, fetchInterventionsError } from '../actions';
import { FETCH_INTERVENTIONS_REQUEST } from '../constants';

import messages from '../messages';

export function* fetchInterventionsWorker({
  payload: { paginationData, filterData, organizationId },
}) {
  const requestURL = `v1/interventions`;

  const { startIndex, endIndex } = paginationData ?? {};
  const { sharing, starred, ...restFilters } = filterData ?? {};

  const requestParams = {
    startIndex,
    endIndex,
    organizationId,
    ...restFilters,
  };

  if (sharing) {
    requestParams[sharing] = true;
  }

  if (starred) {
    requestParams.starred = true;
  }

  try {
    const { data } = yield call(axios.get, requestURL, {
      params: objectToSnakeCase(requestParams),
    });

    const { interventions_size: interventionsSize } = data;
    const interventions = jsonApiToArray(data, 'simpleIntervention');

    yield put(
      fetchInterventionsSuccess(interventions, {
        paginationData,
        interventionsSize,
      }),
    );
  } catch (error) {
    yield put(
      fetchInterventionsError(
        get(error, 'message', formatMessage(messages.defaultError)),
      ),
    );
  }
}

export function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventionsWorker);
}

export const withFetchInterventionsSaga = {
  key: 'fetchInterventions',
  saga: fetchInterventionsSaga,
};
