import { toast } from 'react-toastify';
import axios from 'axios';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import LocalStorageService from 'utils/localStorageService';
import { formatMessage } from 'utils/intlOutsideReact';
import { createUser } from 'utils/reducerCreators';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { apiUserResponse } from 'utils/apiResponseCreators';

import { ADD_AVATAR_REQUEST, ADD_AVATAR_ERROR } from '../../constants';
import addAvatarSaga, { addAvatar } from '../addAvatar';
import { addAvatarSuccess, addAvatarError } from '../../actions';
import { initialState } from '../../reducer';
import messages from '../../messages';

describe('addAvatar saga', () => {
  const payload = {
    image: new File([''], 'filename', { type: 'multipart/form-data' }),
    imageUrl: 'test.com/image.png',
  };

  const mockState = { auth: { ...initialState, user: createUser() } };

  it('Check addAvatar generator success connection', () => {
    const apiResponse = apiUserResponse();
    apiResponse.data.avatar_url = payload.imageUrl;
    const successUser = mapCurrentUser(apiResponse.data);

    return expectSaga(addAvatar, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .call(LocalStorageService.updateState, { user: successUser })
      .put(addAvatarSuccess(successUser))
      .run();
  });
  it('Check addAvatar error connection', () =>
    expectSaga(addAvatar, { payload })
      .withState(mockState)
      .provide([[matchers.call.fn(axios.post), throwError()]])
      .call(
        toast.error,
        formatMessage(messages.addAvatarError, {
          toastId: ADD_AVATAR_ERROR,
        }),
      )
      .put(addAvatarError())
      .run());
  it('Check addAvatar connection', () => {
    const sagaFunction = addAvatarSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ADD_AVATAR_REQUEST, addAvatar),
    );
  });
});
