import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';

import { updateSessionSettings } from 'global/reducers/intervention/sagas/updateSessionSettings';
import {
  updateSessionSettingsError,
  updateSessionSettingsSuccess,
} from '../../actions';
import { UPDATE_SESSION_SETTINGS_REQUEST } from '../../constants';
import { updateSessionSettingsSaga } from '../index';
import { initialState } from '../../reducer';

describe('updateSessionSettings saga', () => {
  const mockState = {
    intervention: {
      ...initialState,
      intervention: createIntervention(),
      cache: { intervention: createIntervention() },
    },
  };
  it('Check updateSessionSettings generator success connection', () => {
    const apiResponse = { message: 'test' };
    return expectSaga(updateSessionSettings)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.put), { data: apiResponse }]])
      .put(updateSessionSettingsSuccess())
      .run();
  });

  it('Check updateSessionSettings error connection', () => {
    const error = new Error('test');
    return expectSaga(updateSessionSettings)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.put), throwError(error)]])
      .put(updateSessionSettingsError())
      .run();
  });

  it('Check updateSessionSettings connection', () => {
    const sagaFunction = updateSessionSettingsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(UPDATE_SESSION_SETTINGS_REQUEST, updateSessionSettings),
    );
  });
});
