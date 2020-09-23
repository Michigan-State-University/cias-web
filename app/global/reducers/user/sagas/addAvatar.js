import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import {
  ADD_OTHER_USER_AVATAR_REQUEST,
  ADD_OTHER_USER_AVATAR_ERROR,
} from '../constants';
import { addOtherUserAvatarSuccess, addOtherUserAvatarError } from '../actions';

function* addAvatar({ payload: { userId, image, imageUrl } }) {
  const requestURL = `/v1/users/${userId}/avatars`;

  const formData = new FormData();
  formData.append('avatar[file]', image);

  try {
    const {
      data: { data },
    } = yield axios.post(requestURL, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    const mappedUser = mapCurrentUser(data);
    yield put(addOtherUserAvatarSuccess(mappedUser));
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    yield put(
      showError(formatMessage(messages.addAvatarError), {
        id: ADD_OTHER_USER_AVATAR_ERROR,
      }),
    );
    yield put(addOtherUserAvatarError(error));
  }
}

export default function* addAvatarSaga() {
  yield takeLatest(ADD_OTHER_USER_AVATAR_REQUEST, addAvatar);
}
