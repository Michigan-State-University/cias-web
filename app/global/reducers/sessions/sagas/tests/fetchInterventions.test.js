import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { Roles } from 'models/User/UserRoles';
import { createSession } from 'utils/reducerCreators';

import fetchSessionsSaga, {
  fetchSessions,
} from 'global/reducers/sessions/sagas/fetchSessions';
import { fetchSessionsSuccess, fetchSessionsError } from '../../actions';
import { FETCH_SESSIONS_REQUEST } from '../../constants';

describe('fetchInterventions saga', () => {
  const mockInterventions = [createSession(), createSession(1)];
  const payload = { role: Roles.admin };

  it('Check fetchInterventions generator success connection', () => {
    const apiResponse = { data: cloneDeep(mockInterventions) };

    return expectSaga(fetchSessions, { payload })
      .provide([[matchers.call.fn(axios.get), { data: apiResponse }]])
      .put(fetchSessionsSuccess(mockInterventions))
      .run();
  });
  it('Check fetchInterventions error connection', () => {
    const error = new Error('test');
    return expectSaga(fetchSessions, { payload })
      .provide([[matchers.call.fn(axios.get), throwError(error)]])
      .put(fetchSessionsError(error))
      .run();
  });

  it('Check fetchInterventions connection', () => {
    const sagaFunction = fetchSessionsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(FETCH_SESSIONS_REQUEST, fetchSessions),
    );
  });
});
