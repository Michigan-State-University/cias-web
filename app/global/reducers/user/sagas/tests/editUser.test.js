import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { pickUserAttributes } from 'utils/mapResponseObjects';
import { createUser } from 'utils/reducerCreators';
import { apiUserResponse } from 'utils/apiResponseCreators';

import objectToCamelCase from 'utils/objectToCamelCase';
import { editOtherUserSuccess, editOtherUserError } from '../../actions';
import {
  EDIT_OTHER_USER_ERROR,
  EDIT_OTHER_USER_REQUEST,
} from '../../constants';
import editSingleUserSaga, { editSingleUser } from '../editUser';

describe('editSingleUser saga', () => {
  const mockUser = createUser();
  const payload = {
    userId: mockUser.id,
    ...mockUser,
    firstName: 'test-edit',
  };

  it('Check editSingleUser generator success connection', () => {
    const apiResponse = apiUserResponse();
    const apiResponseWithoutAttributes = {
      id: apiResponse.data.id,
      type: 'user',
      attributes: {
        id: apiResponse.data.id,
        ...apiResponse.data.attributes,
      },
    };
    apiResponseWithoutAttributes.attributes.first_name = payload.firstName;

    return expectSaga(editSingleUser, { payload })
      .provide([
        [
          matchers.call.fn(axios.patch),
          { data: { data: apiResponseWithoutAttributes } },
        ],
      ])
      .put(
        editOtherUserSuccess(
          pickUserAttributes(
            objectToCamelCase(apiResponseWithoutAttributes.attributes),
          ),
        ),
      )
      .run();
  });
  it('Check editSingleUser error connection', () => {
    const error = new Error('test');
    return expectSaga(editSingleUser, { payload })
      .provide([[matchers.call.fn(axios.patch), throwError(error)]])
      .call(toast.error, error.toString(), {
        toastId: EDIT_OTHER_USER_ERROR,
      })
      .put(editOtherUserError(error))
      .run();
  });

  it('Check deleteAvatar connection', () => {
    const sagaFunction = editSingleUserSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(EDIT_OTHER_USER_REQUEST, editSingleUser),
    );
  });
});
