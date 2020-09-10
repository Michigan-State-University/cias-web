import { all } from 'redux-saga/effects';
import logOutSaga from './logOut';
import editUserSaga from './editUser';
import changePasswordSaga from './changePassword';
import addAvatarSaga from './addAvatar';
import deleteAvatarSaga from './deleteAvatar';
import changeEmailSaga from './changeEmail';

export {
  logOutSaga,
  editUserSaga,
  changePasswordSaga,
  addAvatarSaga,
  deleteAvatarSaga,
  changeEmailSaga,
};

export default function* allAuthSagas() {
  yield all([
    logOutSaga(),
    editUserSaga(),
    changePasswordSaga(),
    addAvatarSaga(),
    deleteAvatarSaga(),
    changeEmailSaga(),
  ]);
}
