import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import LocalStorageService from 'utils/localStorageService';
import { mapCurrentUser } from 'utils/mapResponseObjects';
import { formatMessage } from 'utils/intlOutsideReact';

import messages from '../messages';
import { DELETE_AVATAR_REQUEST, DELETE_AVATAR_ERROR } from '../constants';
import { makeSelectUser } from '../selectors';
import { deleteAvatarSuccess, deleteAvatarError } from '../actions';

export function* deleteAvatar() {
  const user = yield select(makeSelectUser());
  const requestURL = `/v1/users/${user.id}/avatars`;

  try {
    const {
      data: { data },
    } = yield call(axios.delete, requestURL);

    const mappedUser = mapCurrentUser(data);
    yield call(LocalStorageService.updateState, { user: mappedUser });
    yield put(deleteAvatarSuccess(mappedUser));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.deleteAvatarError), {
      toastId: DELETE_AVATAR_ERROR,
    });
    yield put(deleteAvatarError());
  }
}

export default function* deleteAvatarSaga() {
  yield takeLatest(DELETE_AVATAR_REQUEST, deleteAvatar);
}
