import axios from 'axios';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createIntervention } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { apiInterventionResponse } from 'utils/apiResponseCreators';
import globalMessages from 'global/i18n/globalMessages';

import editInterventionSaga, {
  editIntervention,
} from 'global/reducers/intervention/sagas/editIntervention';
import { editInterventionSuccess } from '../../actions';
import { initialState } from '../../reducer';
import {
  EDIT_INTERVENTION_ERROR,
  EDIT_INTERVENTION_REQUEST,
} from '../../constants';

describe('editIntervention saga', () => {
  const mockIntervention = createIntervention();
  const mockState = {
    intervention: { ...initialState, intervention: mockIntervention },
  };

  it('Check editIntervention generator success connection', () => {
    const apiResponse = apiInterventionResponse();
    apiResponse.data.attributes.name = mockIntervention.name;

    return expectSaga(editIntervention, {
      payload: {
        intervention: { id: mockIntervention.id, name: mockIntervention.name },
      },
    })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), { data: apiResponse }]])
      .put(
        editInterventionSuccess({
          ...defaultMapper(apiResponse.data),
        }),
      )
      .run();
  });
  it('Check editIntervention error connection', () => {
    const error = new Error('test');
    return expectSaga(editIntervention, {
      payload: {
        intervention: { id: mockIntervention.id, name: mockIntervention.name },
      },
    })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, formatMessage(globalMessages.editInterventionError), {
        toastId: EDIT_INTERVENTION_ERROR,
      })
      .run();
  });

  it('Check editIntervention connection', () => {
    const sagaFunction = editInterventionSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeEvery(EDIT_INTERVENTION_REQUEST, editIntervention),
    );
  });
});
