import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { error as showError } from 'react-toastify-redux';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { DELETE_AVATAR_REQUEST, DELETE_AVATAR_ERROR } from '../constants';
import { makeSelectUser } from '../selectors';
import { deleteAvatarSuccess, deleteAvatarError } from '../actions';

function* deleteAvatar() {
  const user = yield select(makeSelectUser());
  const requestURL = `/v1/users/${user.id}/avatars`;

  try {
    const {
      data: { data },
    } = yield axios.delete(requestURL);

    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.updateState, mappedUser);
    yield put(deleteAvatarSuccess(mappedUser));
  } catch (error) {
    yield put(
      showError(formatMessage(messages.deleteAvatarError), {
        id: DELETE_AVATAR_ERROR,
      }),
    );
    yield put(deleteAvatarError(error));
  }
}

export default function* deleteAvatarSaga() {
  yield takeLatest(DELETE_AVATAR_REQUEST, deleteAvatar);
}
