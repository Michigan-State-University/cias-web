import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';
import { apiUserResponse } from 'utils/apiResponseCreators';

import {
  addOtherUserAvatarSuccess,
  addOtherUserAvatarError,
} from '../../actions';

import addAvatarSaga, { addAvatar } from '../addAvatar';
import {
  ADD_OTHER_USER_AVATAR_ERROR,
  ADD_OTHER_USER_AVATAR_REQUEST,
} from '../../constants';
import messages from '../../messages';

describe('addAvatar saga', () => {
  const payload = {
    userId: '0',
    image: new File([''], 'filename', { type: 'multipart/form-data' }),
    imageUrl: 'http://image.png',
  };

  it('Check addAvatar generator success connection', () => {
    const apiResponse = apiUserResponse();
    apiResponse.data.attributes.avatar_url = payload.imageUrl;

    return expectSaga(addAvatar, { payload })
      .provide([[matchers.call.fn(axios.post), { data: apiResponse }]])
      .put(addOtherUserAvatarSuccess(mapCurrentUser(apiResponse.data)))
      .run();
  });
  it('Check addAvatar error connection', () => {
    const error = new Error('test');
    return expectSaga(addAvatar, { payload })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(
        toast.error,
        formatMessage(messages.addAvatarError, {
          toastId: ADD_OTHER_USER_AVATAR_ERROR,
        }),
      )
      .put(addOtherUserAvatarError(error))
      .run();
  });

  it('Check addAvatar connection', () => {
    const sagaFunction = addAvatarSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(ADD_OTHER_USER_AVATAR_REQUEST, addAvatar),
    );
  });
});
