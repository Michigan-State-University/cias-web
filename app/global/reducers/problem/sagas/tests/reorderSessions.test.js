import axios from 'axios';
import { error as showError } from 'react-toastify-redux';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';
import { createIntervention } from 'utils/reducerCreators';

import { reorderSessionsSuccess, reorderSessionsError } from '../../actions';
import {
  REORDER_INTERVENTION_LIST_ERROR,
  REORDER_INTERVENTION_LIST,
} from '../../constants';
import messages from '../../messages';
import { reorderSessions } from '../reorderSessions';
import { reorderSessionsSaga } from '../index';

describe('reorderSessions saga', () => {
  const reorderedList = [createIntervention(), createIntervention(1)];
  const payload = { problemId: '0', reorderedList };

  it('Check reorderSessions generator success connection', () =>
    expectSaga(reorderSessions, { payload })
      .provide([[matchers.call.fn(axios.patch), {}]])
      .put(reorderSessionsSuccess())
      .run());
  it('Check reorderSessions error connection', () => {
    const error = new Error('test');
    return expectSaga(reorderSessions, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .put(
        showError(formatMessage(messages.reorderError), {
          id: REORDER_INTERVENTION_LIST_ERROR,
        }),
      )
      .put(reorderSessionsError(error))
      .run();
  });

  it('Check reorderSessions connection', () => {
    const sagaFunction = reorderSessionsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(REORDER_INTERVENTION_LIST, reorderSessions),
    );
  });
});
