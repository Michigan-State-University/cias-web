import axios from 'axios';
import { initialState } from 'global/reducers/auth/reducer';
import { throwError } from 'redux-saga-test-plan/providers';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import LocalStorageService from 'utils/localStorageService';
import { formatMessage } from 'utils/intlOutsideReact';
import { createUser } from 'utils/reducerCreators';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { apiUserResponse } from 'utils/apiResponseCreators';

import deleteAvatarSaga, { deleteAvatar } from '../deleteAvatar';
import { deleteAvatarSuccess, deleteAvatarError } from '../../actions';
import messages from '../../messages';
import { DELETE_AVATAR_ERROR, DELETE_AVATAR_REQUEST } from '../../constants';

describe('deleteAvatar saga', () => {
  const mockState = { auth: { ...initialState, user: createUser() } };

  it('Check deleteAvatar generator success connection', () => {
    const apiResponse = apiUserResponse();
    apiResponse.data.avatar_url = null;
    const successUser = mapCurrentUser(apiResponse.data);

    return expectSaga(deleteAvatar)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.delete), { data: apiResponse }]])
      .call(LocalStorageService.updateState, { user: successUser })
      .put(deleteAvatarSuccess(successUser))
      .run();
  });
  it('Check deleteAvatar error connection', () =>
    expectSaga(deleteAvatar)
      .withState(mockState)
      .provide([[matchers.call.fn(axios.delete), throwError()]])
      .call(toast.error, formatMessage(messages.deleteAvatarError), {
        toastId: DELETE_AVATAR_ERROR,
      })
      .put(deleteAvatarError())
      .run());
  it('Check deleteAvatar connection', () => {
    const sagaFunction = deleteAvatarSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DELETE_AVATAR_REQUEST, deleteAvatar),
    );
  });
});
