import axios from 'axios';
import get from 'lodash/get';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { createIntervention } from 'utils/reducerCreators';
import { jsonApiToArray } from 'utils/jsonApiMapper';

import fetchInterventionsSaga, {
  fetchInterventions,
} from 'global/reducers/interventions/sagas/fetchInterventions';
import {
  fetchInterventionsSuccess,
  fetchInterventionsError,
} from '../../actions';
import { FETCH_INTERVENTIONS_REQUEST } from '../../constants';
import messages from '../../messages';

describe('fetchInterventions saga', () => {
  it('Check fetchInterventions generator success connection', () => {
    const apiResponse = { data: [createIntervention()], interventions_size: 1 };

    return expectSaga(fetchInterventions, { payload: {} })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(
        fetchInterventionsSuccess(jsonApiToArray(apiResponse, 'intervention'), {
          paginationData: undefined,
          interventionsSize: 1,
        }),
      )
      .run();
  });
  it('Check fetchInterventions error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchInterventions, { payload: {} })
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
      takeLatest(FETCH_INTERVENTIONS_REQUEST, fetchInterventions),
    );
  });
});
