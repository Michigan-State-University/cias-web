import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { apiInterventionResponse } from 'utils/apiResponseCreators';

import { editInterventionSuccess, editInterventionError } from '../../actions';
import { initialState } from '../../reducer';
import editInterventionSaga, { editIntervention } from '../editIntervention';
import { EDIT_INTERVENTION_REQUEST } from '../../constants';

describe('editIntervention saga', () => {
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };

  it('Check editIntervention generator success connection', () => {
    const apiResponse = apiInterventionResponse();
    apiResponse.data.attributes.name = mockIntervention.name;

    return expectSaga(editIntervention)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.put), { data: apiResponse }]])
      .put(
        editInterventionSuccess({
          ...apiResponse.data.attributes,
          id: apiResponse.data.id,
        }),
      )
      .run();
  });
  it('Check addAvatar error connection', () => {
    const error = new Error('test');
    return expectSaga(editIntervention)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.put), throwError(error)]])
      .put(editInterventionError(error))
      .run();
  });

  it('Check addAvatar connection', () => {
    const sagaFunction = editInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(EDIT_INTERVENTION_REQUEST, editIntervention),
    );
  });
});
