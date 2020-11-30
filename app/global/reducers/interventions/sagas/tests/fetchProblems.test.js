import axios from 'axios';
import get from 'lodash/get';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { createProblem } from 'utils/reducerCreators';

import fetchInterventionsSaga, {
  fetchInterventions,
} from 'global/reducers/interventions/sagas/fetchInterventions';
import { fetchProblemsSuccess, fetchProblemsError } from '../../actions';
import { FETCH_PROBLEMS_REQUEST } from '../../constants';
import messages from '../../messages';

describe('fetchProblems saga', () => {
  it('Check fetchProblems generator success connection', () => {
    const apiResponse = { interventions: [createProblem()] };

    return expectSaga(fetchInterventions)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchProblemsSuccess(apiResponse.interventions))
      .run();
  });
  it('Check fetchProblems error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchInterventions)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(
        fetchProblemsError(
          get(error, 'message', formatMessage(messages.defaultError)),
        ),
      )
      .run();
  });

  it('Check fetchProblems connection', () => {
    const sagaFunction = fetchInterventionsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_PROBLEMS_REQUEST, fetchInterventions),
    );
  });
});
