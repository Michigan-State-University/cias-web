import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';
import { push } from 'connected-react-router';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import globalMessages from 'global/i18n/globalMessages';
import { apiProblemResponse } from 'utils/apiResponseCreators';

import createInterventionSaga, {
  createIntervention,
} from 'global/reducers/intervention/sagas/createIntervention';
import { createProblemSuccess } from '../../actions';
import { CREATE_PROBLEM_ERROR, CREATE_PROBLEM_REQUEST } from '../../constants';

describe('createProblem saga', () => {
  const mockApiResponse = apiProblemResponse();

  it('Check createProblem generator success connection', () => {
    const apiResponse = { data: { mockApiResponse } };
    return expectSaga(createIntervention)
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(createProblemSuccess(defaultMapper(apiResponse.data)))
      .put(push(`/interventions/${apiResponse.data.id}`))
      .run();
  });
  it('Check createProblem error connection', () => {
    const error = new Error('test');
    return expectSaga(createIntervention)
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(toast.error, formatMessage(globalMessages.createProblemError), {
        toastId: CREATE_PROBLEM_ERROR,
      })
      .run();
  });

  it('Check createProblem connection', () => {
    const sagaFunction = createInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(CREATE_PROBLEM_REQUEST, createIntervention),
    );
  });
});
