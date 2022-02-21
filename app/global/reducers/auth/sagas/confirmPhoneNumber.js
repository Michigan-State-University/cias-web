import { call, delay, put, takeLatest, select } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import LocalStorageService from 'utils/localStorageService';

import {
  makeSelectPhoneNumberPreview,
  makeSelectUser,
} from 'global/reducers/auth/selectors';
import { confirmPhoneNumberSuccess, confirmPhoneNumberError } from '../actions';
import {
  CONFIRM_PHONE_NUMBER_ERROR,
  CONFIRM_PHONE_NUMBER_REQUEST,
  CONFIRM_PHONE_NUMBER_SUCCESS,
} from '../constants';
import messages from '../messages';

export function* confirmPhoneNumber({ payload: { smsToken, onSuccess } }) {
  const requestURL = `v1/users/verify_sms_token`;
  const phoneNumberPreview = yield select(makeSelectPhoneNumberPreview());

  try {
    yield call(axios.patch, requestURL, {
      sms_token: smsToken,
    });

    if (onSuccess) onSuccess();
    yield call(
      toast.success,
      formatMessage(messages.confirmPhoneNumberSuccess),
      {
        toastId: CONFIRM_PHONE_NUMBER_SUCCESS,
      },
    );
    yield put(confirmPhoneNumberSuccess());
    if (!phoneNumberPreview) {
      const user = yield select(makeSelectUser());
      yield call(LocalStorageService.updateState, {
        user: {
          ...user,
          phone: { ...user.phone, confirmed: true },
        },
      });
    }
  } catch (error) {
    yield call(toast.error, formatMessage(messages.confirmPhoneNumberError), {
      toastId: CONFIRM_PHONE_NUMBER_ERROR,
    });
    yield delay(1000);
    yield put(confirmPhoneNumberError(error?.toString()));
  }
}

export default function* confirmPhoneNumberSaga() {
  yield takeLatest(CONFIRM_PHONE_NUMBER_REQUEST, confirmPhoneNumber);
}
