import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { defaultMapper } from 'utils/mapResponseObjects';
import {
  apiInterventionResponse,
  apiSessionResponse,
} from 'utils/apiResponseCreators';

import fetchInterventionSaga, {
  fetchIntervention,
} from 'global/reducers/intervention/sagas/fetchIntervention';
import {
  fetchInterventionSuccess,
  fetchInterventionError,
} from '../../actions';

import { FETCH_INTERVENTION_REQUEST } from '../../constants';

describe('fetchIntervention saga', () => {
  const payload = { id: 'test-id' };

  it('Check fetchIntervention generator success connection', () => {
    const interventionApiResponse = apiInterventionResponse();
    const sessionApiResponse = {
      data: [apiSessionResponse().data],
    };
    const intervention = cloneDeep(interventionApiResponse.data);
    const sessions = cloneDeep(sessionApiResponse.data);
    const mappedInterventions = sessions.map(defaultMapper);
    intervention.sessions = orderBy(mappedInterventions, 'position');
    return expectSaga(fetchIntervention, { payload })
      .provide([
        [
          matchers.call(axios.get, `v1/interventions/${payload.id}`),
          interventionApiResponse,
        ],
        [
          matchers.call(axios.get, `v1/interventions/${payload.id}/sessions`),
          { data: sessionApiResponse },
        ],
      ])
      .put(fetchInterventionSuccess(intervention))
      .run();
  });
  it('Check fetchIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchIntervention, { payload })
      .provide([
        [
          matchers.call(axios.get, `v1/interventions/${payload.id}`),
          throwError(error),
        ],
        [
          matchers.call(
            axios.get,
            `v1/interventions/${payload.id}/interventions`,
          ),
          throwError(error),
        ],
      ])
      .put(fetchInterventionError(error))
      .run();
  });

  it('Check fetchIntervention connection', () => {
    const sagaFunction = fetchInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_INTERVENTION_REQUEST, fetchIntervention),
    );
  });
});
