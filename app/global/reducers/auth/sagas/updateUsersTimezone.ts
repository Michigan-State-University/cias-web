import { put, select, takeLatest } from '@redux-saga/core/effects';

import { User } from 'models/User';

import { UPDATE_USERS_TIMEZONE } from '../constants';
import { makeSelectUser } from '../selectors';
import { editUserRequest, updateUsersTimezone } from '../actions';

export function* updateUsersTimezoneWorker({
  payload: { timezone },
}: ReturnType<typeof updateUsersTimezone>) {
  const user: User = yield select(makeSelectUser());
  if (user?.id && user.timeZone !== timezone) {
    yield put(editUserRequest({ timeZone: timezone }));
  }
}

export default function* updateUsersTimezoneSaga() {
  yield takeLatest(UPDATE_USERS_TIMEZONE, updateUsersTimezoneWorker);
}
