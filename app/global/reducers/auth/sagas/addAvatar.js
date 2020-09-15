import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { ADD_AVATAR_REQUEST, ADD_AVATAR_ERROR } from '../constants';
import { makeSelectUser } from '../selectors';
import { addAvatarSuccess, addAvatarError } from '../actions';

function* addAvatar({ payload: { image, imageUrl } }) {
  const user = yield select(makeSelectUser());
  const requestURL = `/v1/users/${user.id}/avatars`;

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
    yield call(LocalStorageService.updateState, mappedUser);
    yield put(addAvatarSuccess(mappedUser));
    window.URL.revokeObjectURL(imageUrl);
  } catch (error) {
    yield put(
      showError(formatMessage(messages.addAvatarError), {
        id: ADD_AVATAR_ERROR,
      }),
    );
    yield put(addAvatarError(error));
  }
}

export default function* addAvatarSaga() {
  yield takeLatest(ADD_AVATAR_REQUEST, addAvatar);
}