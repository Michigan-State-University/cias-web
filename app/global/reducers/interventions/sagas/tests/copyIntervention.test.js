import axios from 'axios';
import { push } from 'connected-react-router';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { apiInterventionResponse } from 'utils/apiResponseCreators';
import { createUser } from 'utils/reducerCreators';
import messages from 'global/reducers/interventions/messages';

import copyInterventionSaga, {
  copyIntervention,
} from 'global/reducers/interventions/sagas/copyIntervention';
import { copyInterventionSuccess } from '../../actions';
import {
  COPY_INTERVENTION_SUCCESS,
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
} from '../../constants';

describe('copyIntervention saga', () => {
  const createPayload = withParams => ({
    interventionId: 'intervention-test',
    users: withParams ? [createUser(), createUser(1)] : null,
    withoutRedirect: false,
  });

  it('Check copyIntervention generator success connection', () => {
    const apiResponse = apiInterventionResponse();
    const payload = createPayload(true);

    return expectSaga(copyIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .call(
        toast.success,
        formatMessage(messages.sendSuccess, {
          name: apiResponse.data.attributes.name,
        }),
        {
          toastId: COPY_INTERVENTION_SUCCESS,
        },
      )
      .run();
  });

  it('Check copyIntervention generator success connection without params', () => {
    const apiResponse = apiInterventionResponse();
    const payload = createPayload(false);

    return expectSaga(copyIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(copyInterventionSuccess(defaultMapper(apiResponse.data)))
      .put(push('/'))
      .run();
  });
  it('Check copyIntervention error connection', () => {
    const error = new Error('test');
    const payload = createPayload(true);
    return expectSaga(copyIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(toast.error, formatMessage(messages.copyError), {
        toastId: COPY_INTERVENTION_ERROR,
      })
      .run();
  });

  it('Check copyIntervention connection', () => {
    const sagaFunction = copyInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention),
    );
  });
});
