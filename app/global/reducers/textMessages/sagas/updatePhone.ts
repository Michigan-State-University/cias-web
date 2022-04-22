import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import { ApiError } from 'models/Api';

import {
  updatePhoneError,
  updatePhoneRequest,
  updatePhoneSuccess,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';
import { UPDATE_PHONE_ERROR, UPDATE_PHONE_REQUEST } from '../constants';
import messages from '../messages';

function* updatePhone({
  payload: { phoneId, phoneAttributes },
}: ReturnType<typeof updatePhoneRequest>) {
  const currentTextMessageId: string = yield select(
    makeSelectSelectedMessageId(),
  );
  const url = `/v1/sms_plans/${currentTextMessageId}/alert_phones/${phoneId}`;

  try {
    yield call(
      axios.patch,
      url,
      objectToSnakeCase({ phone: { ...phoneAttributes } }),
    );
    yield put(updatePhoneSuccess());
  } catch (error) {
    yield call(toast.error, formatMessage(messages.updatePhoneError), {
      toastId: UPDATE_PHONE_ERROR,
    });
    yield put(updatePhoneError(error as ApiError));
  }
}

export function* updatePhoneSaga() {
  yield takeLatest(UPDATE_PHONE_REQUEST, updatePhone);
}
