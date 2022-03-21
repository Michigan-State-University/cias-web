import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createSession } from 'utils/reducerCreators';
import { formatMessage } from 'utils/intlOutsideReact';

import copySessionSaga, {
  copySession,
} from 'global/reducers/intervention/sagas/copySession';
import {
  COPY_SESSION_ERROR,
  COPY_SESSION_REQUEST,
  COPY_SESSION_SUCCESS,
} from '../../constants';
import messages from '../../messages';

describe('copyIntervention saga', () => {
  const mockIntervention = createSession();
  const payload = { sessionId: mockIntervention.id };

  it('Check copyIntervention generator success connection', () => {
    const apiResponse = { data: { ...mockIntervention, id: 'test-id-copied' } };
    return expectSaga(copySession, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .call(toast.info, formatMessage(messages.copySuccess), {
        toastId: COPY_SESSION_SUCCESS,
      })
      .run();
  });
  it('Check copyIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(copySession, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(toast.error, formatMessage(messages.copyError), {
        toastId: COPY_SESSION_ERROR,
      })
      .run();
  });

  it('Check changeAccessSetting connection', () => {
    const sagaFunction = copySessionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(COPY_SESSION_REQUEST, copySession),
    );
  });
});
