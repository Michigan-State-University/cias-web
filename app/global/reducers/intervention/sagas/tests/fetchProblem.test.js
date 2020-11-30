import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import orderBy from 'lodash/orderBy';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { defaultMapper } from 'utils/mapResponseObjects';
import {
  apiProblemResponse,
  apiInterventionResponse,
} from 'utils/apiResponseCreators';

import { fetchProblemSuccess, fetchProblemError } from '../../actions';

import { FETCH_PROBLEM_REQUEST } from '../../constants';
import fetchProblemSaga, { fetchProblem } from '../fetchProblem';

describe('fetchProblem saga', () => {
  const payload = { id: 'test-id' };

  it('Check fetchProblem generator success connection', () => {
    const problemApiResponse = apiProblemResponse();
    const interventionApiResponse = {
      data: [apiInterventionResponse().data],
    };
    const problem = cloneDeep(problemApiResponse.data);
    const interventions = cloneDeep(interventionApiResponse.data);
    const mappedInterventions = interventions.map(defaultMapper);
    problem.interventions = orderBy(mappedInterventions, 'position');
    return expectSaga(fetchProblem, { payload })
      .provide([
        [
          matchers.call(axios.get, `v1/interventions/${payload.id}`),
          problemApiResponse,
        ],
        [
          matchers.call(axios.get, `v1/interventions/${payload.id}/sessions`),
          { data: interventionApiResponse },
        ],
      ])
      .put(fetchProblemSuccess(problem))
      .run();
  });
  it('Check fetchProblem error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchProblem, { payload })
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
      .put(fetchProblemError(error))
      .run();
  });

  it('Check fetchProblem connection', () => {
    const sagaFunction = fetchProblemSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_PROBLEM_REQUEST, fetchProblem),
    );
  });
});
