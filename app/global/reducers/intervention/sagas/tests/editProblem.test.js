import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { createProblem } from 'utils/reducerCreators';
import { defaultMapper } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { apiProblemResponse } from 'utils/apiResponseCreators';
import globalMessages from 'global/i18n/globalMessages';

import { editProblemSuccess } from '../../actions';
import { initialState } from '../../reducer';
import editProblemSaga, { editProblem } from '../editProblem';
import { EDIT_PROBLEM_ERROR, EDIT_PROBLEM_REQUEST } from '../../constants';

describe('editProblem saga', () => {
  const mockProblem = createProblem();
  const mockState = {
    problem: { ...initialState, problem: mockProblem },
  };

  it('Check editProblem generator success connection', () => {
    const apiResponse = apiProblemResponse();
    apiResponse.data.attributes.name = mockProblem.name;

    return expectSaga(editProblem)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), { data: apiResponse }]])
      .put(
        editProblemSuccess({
          ...mockProblem,
          ...defaultMapper(apiResponse.data),
        }),
      )
      .run();
  });
  it('Check editProblem error connection', () => {
    const error = new Error('test');
    return expectSaga(editProblem)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, formatMessage(globalMessages.editProblemError), {
        toastId: EDIT_PROBLEM_ERROR,
      })
      .run();
  });

  it('Check editProblem connection', () => {
    const sagaFunction = editProblemSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(EDIT_PROBLEM_REQUEST, editProblem),
    );
  });
});
