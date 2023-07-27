import axios from 'axios';
import get from 'lodash/get';
import { put, takeLatest, call } from 'redux-saga/effects';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import { fetchInterventionsSuccess, fetchInterventionsError } from '../actions';
import { FETCH_INTERVENTIONS_REQUEST } from '../constants';

import messages from '../messages';

export function* fetchInterventions({
  payload: { paginationData, filterData },
}) {
  const requestURL = `v1/interventions`;

  const { startIndex, endIndex } = paginationData ?? {};
  try {
    const { data } = yield call(axios.get, requestURL, {
      params: objectToSnakeCase({ startIndex, endIndex, ...filterData }),
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
export default function* fetchInterventionsSaga() {
  yield takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions);
}
