import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';

import {
  removePhoneError,
  removePhoneRequest,
  removePhoneSuccess,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';
import { REMOVE_PHONE_ERROR, REMOVE_PHONE_REQUEST } from '../constants';
import messages from '../messages';

function* removePhone({
  payload: { phoneId },
}: ReturnType<typeof removePhoneRequest>) {
  const currentTextMessageId: string = yield select(
    makeSelectSelectedMessageId(),
  );
  const url = `/v1/sms_plans/${currentTextMessageId}/alert_phones/${phoneId}`;

  try {
    yield call(axios.delete, url);
    yield put(removePhoneSuccess(phoneId));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.removePhoneError), {
      toastId: REMOVE_PHONE_ERROR,
    });
    yield put(removePhoneError(error as ApiError));
  }
}

export function* removePhoneSaga() {
  yield takeLatest(REMOVE_PHONE_REQUEST, removePhone);
}
