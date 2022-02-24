import { put, takeLatest } from 'redux-saga/effects';

import { changePhoneNumberSuccess, changePhoneNumberError } from '../actions';
import { CHANGE_PHONE_NUMBER_REQUEST } from '../constants';

export function* changePhoneNumber({
  payload: {
    data: { phoneNumber },
  },
}) {
  try {
    yield put(changePhoneNumberSuccess({ phoneNumber }));
  } catch (error) {
    yield put(changePhoneNumberError(error?.toString()));
  }
}

export default function* changePhoneNumberSaga() {
  yield takeLatest(CHANGE_PHONE_NUMBER_REQUEST, changePhoneNumber);
}
