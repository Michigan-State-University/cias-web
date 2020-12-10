import { put, takeLatest, call } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { changePhoneNumberSuccess, changePhoneNumberError } from '../actions';
import {
  CHANGE_PHONE_NUMBER_REQUEST,
  CHANGE_PHONE_NUMBER_SUCCESS,
} from '../constants';
import messages from '../messages';

export function* changePhoneNumber({
  payload: {
    data: { phoneNumber, countryCode },
  },
}) {
  try {
    yield call(
      toast.success,
      formatMessage(messages.changePhoneNumberSuccess),
      {
        toastId: CHANGE_PHONE_NUMBER_SUCCESS,
      },
    );
    yield put(changePhoneNumberSuccess({ phoneNumber, countryCode }));
  } catch (error) {
    yield put(changePhoneNumberError(error.toString()));
  }
}

export default function* changePhoneNumberSaga() {
  yield takeLatest(CHANGE_PHONE_NUMBER_REQUEST, changePhoneNumber);
}
