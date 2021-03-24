import axios from 'axios';
import cloneDeep from 'lodash/cloneDeep';
import { takeLatest } from 'redux-saga/effects';
import { throwError } from 'redux-saga-test-plan/providers';
import { toast } from 'react-toastify';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import LocalStorageService from 'utils/localStorageService';
import { createUser } from 'utils/reducerCreators';
import { mapCurrentUserWithoutAttributes } from 'utils/mapResponseObjects';
import { initialState } from 'global/reducers/auth/reducer';
import { apiUserResponse } from 'utils/apiResponseCreators';

import { editUserSuccess, editUserError } from '../../actions';
import { EDIT_USER_REQUEST, EDIT_USER_ERROR } from '../../constants';
import { editUser } from '../editUser';
import { editUserSaga } from '../index';

describe('editUser saga', () => {
  const mockApiResponse = apiUserResponse();
  const payload = createUser();
  const mockState = { auth: { ...initialState, user: createUser() } };

  it('Check editUser generator success connection', () => {
    const apiResponse = cloneDeep({
      data: {
        id: mockApiResponse.data.id,
        ...mockApiResponse.data.attributes,
      },
    });
    apiResponse.data.first_name = 'test';
    const successUser = mapCurrentUserWithoutAttributes(apiResponse.data);

    return expectSaga(editUser, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), apiResponse]])
      .call(LocalStorageService.updateState, { user: successUser })
      .put(editUserSuccess(successUser))
      .run();
  });
  it('Check editUser error connection', () => {
    const error = new Error('test-error');

    return expectSaga(editUser, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, error.toString(), {
        toastId: EDIT_USER_ERROR,
      })
      .put(editUserError(error))
      .run();
  });
  it('Check editUser connection', () => {
    const sagaFunction = editUserSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(EDIT_USER_REQUEST, editUser),
    );
  });
});
