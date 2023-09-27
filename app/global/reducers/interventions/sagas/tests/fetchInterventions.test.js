import axios from 'axios';
import get from 'lodash/get';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { createIntervention } from 'utils/reducerCreators';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import {
  fetchInterventionsSuccess,
  fetchInterventionsError,
} from '../../actions';
import { FETCH_INTERVENTIONS_REQUEST } from '../../constants';
import messages from '../../messages';
import {
  fetchInterventionsSaga,
  fetchInterventionsWorker,
} from '../fetchInterventions';

describe('fetchInterventions saga', () => {
  it('Check fetchInterventions generator success connection', () => {
    const apiResponse = {
      data: [createIntervention(0, 'simple_intervention')],
      interventions_size: 1,
    };

    return expectSaga(fetchInterventionsWorker, { payload: {} })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(
        fetchInterventionsSuccess(
          jsonApiToArray(apiResponse, 'simpleIntervention'),
          {
            paginationData: undefined,
            interventionsSize: 1,
          },
        ),
      )
      .run();
  });
  it('Check fetchInterventions error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchInterventionsWorker, { payload: {} })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(
        fetchInterventionsError(
          get(error, 'message', formatMessage(messages.defaultError)),
        ),
      )
      .run();
  });

  it('Check fetchInterventions connection', () => {
    const sagaFunction = fetchInterventionsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventionsWorker),
    );
  });
});
