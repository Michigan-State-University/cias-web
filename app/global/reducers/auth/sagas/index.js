import { all } from 'redux-saga/effects';
import confirmPhoneNumberSaga from './confirmPhoneNumber';
import logOutSaga from './logOut';
import editUserSaga from './editUser';
import changePasswordSaga from './changePassword';
import addAvatarSaga from './addAvatar';
import deleteAvatarSaga from './deleteAvatar';
import changeEmailSaga from './changeEmail';
import changePhoneNumberSaga from './changePhoneNumber';
import sendSmsTokenSaga from './sendSmsToken';
import logInGuestSaga from './logInGuest';
import editPhoneNumberQuestionSaga from './editPhoneNumberQuestion';

export {
  logOutSaga,
  editUserSaga,
  changePasswordSaga,
  addAvatarSaga,
  deleteAvatarSaga,
  changeEmailSaga,
  changePhoneNumberSaga,
  confirmPhoneNumberSaga,
  sendSmsTokenSaga,
  logInGuestSaga,
  editPhoneNumberQuestionSaga,
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
    confirmPhoneNumberSaga(),
    sendSmsTokenSaga(),
    logInGuestSaga(),
  ]);
}
