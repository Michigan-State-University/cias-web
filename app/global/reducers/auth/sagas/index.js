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
import loginSaga from './logIn';
import verifyCodeSaga from './verifyCode';
import fetchSelfDetailsSaga from './fetchSelfDetails';
import updateUsersTimezoneSaga from './updateUsersTimezone';
import termsAcceptSaga from './acceptTerms';

export * from './verifyUserKey';

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
  loginSaga,
  verifyCodeSaga,
  fetchSelfDetailsSaga,
  updateUsersTimezoneSaga,
  termsAcceptSaga,
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
    loginSaga(),
    verifyCodeSaga(),
    fetchSelfDetailsSaga(),
    updateUsersTimezoneSaga(),
    termsAcceptSaga(),
  ]);
}
