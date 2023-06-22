import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import globalMessages from 'global/i18n/globalMessages';
import { RoutePath } from 'global/constants';

import { formatMessage } from 'utils/intlOutsideReact';
import { apiInterventionResponse } from 'utils/apiResponseCreators';
import { parametrizeRoutePath } from 'utils/router';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import createInterventionSaga, {
  createIntervention,
} from 'global/reducers/intervention/sagas/createIntervention';
import { createInterventionSuccess } from '../../actions';
import {
  CREATE_INTERVENTION_ERROR,
  CREATE_INTERVENTION_REQUEST,
} from '../../constants';

describe('createIntervention saga', () => {
  const mockApiResponse = apiInterventionResponse();
  it('Check createIntervention generator success connection', () => {
    const apiResponse = { data: { ...mockApiResponse } };
    return expectSaga(createIntervention)
      .provide([[matchers.call.fn(axios.post), apiResponse]])
      .put(
        createInterventionSuccess(
          jsonApiToObject({ data: mockApiResponse.data }, 'intervention'),
        ),
      )
      .put(
        push(
          parametrizeRoutePath(RoutePath.INTERVENTION_DETAILS, {
            interventionId: mockApiResponse.data.id,
          }),
        ),
      )
      .run();
  });
  it('Check createIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(createIntervention)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(
        toast.error,
        formatMessage(globalMessages.createInterventionError),
        {
          toastId: CREATE_INTERVENTION_ERROR,
        },
      )
      .run();
  });

  it('Check createIntervention connection', () => {
    const sagaFunction = createInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_INTERVENTION_REQUEST, createIntervention),
    );
  });
});
