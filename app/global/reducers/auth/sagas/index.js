import { all } from 'redux-saga/effects';
import logOutSaga from './logOut';
import editUserSaga from './editUser';

export { logOutSaga, editUserSaga };

export default function* allAuthSagas() {
  yield all([logOutSaga(), editUserSaga()]);
}
