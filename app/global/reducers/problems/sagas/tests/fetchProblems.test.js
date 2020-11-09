import axios from 'axios';
import get from 'lodash/get';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { createProblem } from 'utils/reducerCreators';

import { fetchProblemsSuccess, fetchProblemsError } from '../../actions';
import { FETCH_PROBLEMS_REQUEST } from '../../constants';
import fetchProblemsSaga, { fetchProblems } from '../fetchProblems';
import messages from '../../messages';

describe('fetchProblems saga', () => {
  it('Check fetchProblems generator success connection', () => {
    const apiResponse = { problems: [createProblem()] };

    return expectSaga(fetchProblems)
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchProblemsSuccess(apiResponse.problems))
      .run();
  });
  it('Check fetchProblems error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchProblems)
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(
        fetchProblemsError(
          get(error, 'message', formatMessage(messages.defaultError)),
        ),
      )
      .run();
  });

  it('Check fetchProblems connection', () => {
    const sagaFunction = fetchProblemsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_PROBLEMS_REQUEST, fetchProblems),
    );
  });
});
