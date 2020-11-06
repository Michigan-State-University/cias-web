import { put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  DELETE_OTHER_USER_AVATAR_REQUEST,
  DELETE_OTHER_USER_AVATAR_ERROR,
} from '../constants';
import {
  deleteOtherUserAvatarSuccess,
  deleteOtherUserAvatarError,
} from '../actions';

function* deleteOtherUserAvatar({ payload: { userId } }) {
  const requestURL = `/v1/users/${userId}/avatars`;

  try {
    const {
      data: { data },
    } = yield axios.delete(requestURL);

    const mappedUser = mapCurrentUser(data);
    yield put(deleteOtherUserAvatarSuccess(mappedUser));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.deleteOtherUserAvatarError),
      {
        toastId: DELETE_OTHER_USER_AVATAR_ERROR,
      },
    );
    yield put(deleteOtherUserAvatarError(error));
  }
}

export default function* deleteOtherUserAvatarSaga() {
  yield takeLatest(DELETE_OTHER_USER_AVATAR_REQUEST, deleteOtherUserAvatar);
}
