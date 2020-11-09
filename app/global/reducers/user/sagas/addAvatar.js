import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  ADD_OTHER_USER_AVATAR_REQUEST,
  ADD_OTHER_USER_AVATAR_ERROR,
} from '../constants';
import { addOtherUserAvatarSuccess, addOtherUserAvatarError } from '../actions';

export function* addAvatar({ payload: { userId, image, imageUrl } }) {
  const requestURL = `/v1/users/${userId}/avatars`;

  const formData = new FormData();
  formData.append('avatar[file]', image);

  try {
    const {
      data: { data },
    } = yield call(axios.post, requestURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const mappedUser = mapCurrentUser(data);
    yield put(addOtherUserAvatarSuccess(mappedUser));
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.addAvatarError, {
        toastId: ADD_OTHER_USER_AVATAR_ERROR,
      }),
    );
    yield put(addOtherUserAvatarError(error));
  }
}

export default function* addAvatarSaga() {
  yield takeLatest(ADD_OTHER_USER_AVATAR_REQUEST, addAvatar);
}
