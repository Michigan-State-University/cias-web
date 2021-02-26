import { all } from 'redux-saga/effects';
import confirmPhoneNumberSaga from './confirmPhoneNumber';
import logOutSaga from './logOut';
import editUserSaga from './editUser';
import changePasswordSaga from './changePassword';
import addAvatarSaga from './addAvatar';
import deleteAvatarSaga from './deleteAvatar';
import changeEmailSaga from './changeEmail';
import changePhoneNumberSaga from './changePhoneNumber';
import changeNotificationsSettingsSaga from './changeNotificationsSettings';
import sendSmsTokenSaga from './sendSmsToken';
import logInGuestSaga from './logInGuest';

export {
  logOutSaga,
  editUserSaga,
  changePasswordSaga,
  addAvatarSaga,
  deleteAvatarSaga,
  changeEmailSaga,
  changePhoneNumberSaga,
  changeNotificationsSettingsSaga,
  confirmPhoneNumberSaga,
  sendSmsTokenSaga,
  logInGuestSaga,
};

export default function* allAuthSagas() {
  yield all([
    logOutSaga(),
    editUserSaga(),
    changePasswordSaga(),
    addAvatarSaga(),
    deleteAvatarSaga(),
    changeEmailSaga(),
    changePhoneNumberSaga(),
    changeNotificationsSettingsSaga(),
    confirmPhoneNumberSaga(),
    sendSmsTokenSaga(),
    logInGuestSaga(),
  ]);
}
