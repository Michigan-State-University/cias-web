import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';

import {
  updateInterventionSettingsError,
  updateInterventionSettingsSuccess,
} from '../../actions';
import { UPDATE_INTERVENTION_SETTINGS_REQUEST } from '../../constants';
import { updateInterventionSettingsSaga } from '../index';
import { updateInterventionSettings } from '../updateInterventionSettings';
import { initialState } from '../../reducer';

describe('updateInterventionSettings saga', () => {
  const mockState = { problem: { ...initialState, problem: createProblem() } };
  it('Check updateInterventionSettings generator success connection', () => {
    const apiResponse = { message: 'test' };
    return expectSaga(updateInterventionSettings)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.put), { data: apiResponse }]])
      .put(updateInterventionSettingsSuccess())
      .run();
  });

  it('Check updateInterventionSettings error connection', () => {
    const error = new Error('test');
    return expectSaga(updateInterventionSettings)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.put), throwError(error)]])
      .put(updateInterventionSettingsError())
      .run();
  });

  it('Check updateInterventionSettings connection', () => {
    const sagaFunction = updateInterventionSettingsSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(
        UPDATE_INTERVENTION_SETTINGS_REQUEST,
        updateInterventionSettings,
      ),
    );
  });
});
