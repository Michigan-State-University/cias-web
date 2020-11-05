import axios from 'axios';
import { error as showError } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { formatMessage } from 'utils/intlOutsideReact';

import { copyInterventionSuccess } from '../../actions';
import {
  COPY_INTERVENTION_ERROR,
  COPY_INTERVENTION_REQUEST,
} from '../../constants';
import messages from '../../messages';
import copyInterventionSaga, { copyIntervention } from '../copyIntervention';

describe('copyIntervention saga', () => {
  const mockIntervention = createIntervention();
  const payload = { interventionId: mockIntervention.id };

  it('Check copyIntervention generator success connection', () => {
    const apiResponse = { data: { ...mockIntervention, id: 'test-id-copied' } };
    return expectSaga(copyIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(copyInterventionSuccess(apiResponse.data))
      .run();
  });
  it('Check copyIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(copyIntervention, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(
        showError(formatMessage(messages.copyError), {
          id: COPY_INTERVENTION_ERROR,
        }),
      )
      .run();
  });

  it('Check changeAccessSetting connection', () => {
    const sagaFunction = copyInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(COPY_INTERVENTION_REQUEST, copyIntervention),
    );
  });
});
