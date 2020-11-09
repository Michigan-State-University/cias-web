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
  deleteOtherUserAvatarSuccess,
  deleteOtherUserAvatarError,
} from '../../actions';

import {
  DELETE_OTHER_USER_AVATAR_ERROR,
  DELETE_OTHER_USER_AVATAR_REQUEST,
} from '../../constants';
import deleteOtherUserAvatarSaga, {
  deleteOtherUserAvatar,
} from '../deleteAvatar';
import messages from '../../messages';

describe('deleteAvatar saga', () => {
  const payload = {
    userId: '0',
  };

  it('Check deleteAvatar generator success connection', () => {
    const apiResponse = apiUserResponse();
    apiResponse.data.attributes.avatar_url = null;

    return expectSaga(deleteOtherUserAvatar, { payload })
      .provide([[matchers.call.fn(axios.delete), { data: apiResponse }]])
      .put(deleteOtherUserAvatarSuccess(mapCurrentUser(apiResponse.data)))
      .run();
  });
  it('Check deleteAvatar error connection', () => {
    const error = new Error('test');
    return expectSaga(deleteOtherUserAvatar, { payload })
      .provide([[matchers.call.fn(axios.delete), throwError(error)]])
      .call(toast.error, formatMessage(messages.deleteAvatarError), {
        toastId: DELETE_OTHER_USER_AVATAR_ERROR,
      })
      .put(deleteOtherUserAvatarError(error))
      .run();
  });

  it('Check deleteAvatar connection', () => {
    const sagaFunction = deleteOtherUserAvatarSaga();
    const takeLatestDescriptor = sagaFunction.next().value;
    expect(takeLatestDescriptor).toEqual(
      takeLatest(DELETE_OTHER_USER_AVATAR_REQUEST, deleteOtherUserAvatar),
    );
  });
});
