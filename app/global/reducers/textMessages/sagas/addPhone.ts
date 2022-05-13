import axios from 'axios';
import { put, call, takeLatest, select } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatMessage } from 'utils/intlOutsideReact';

import { ApiError } from 'models/Api';
import { Phone } from 'models/Phone';

import { addPhoneError, addPhoneSuccess } from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';
import { ADD_PHONE_ERROR, ADD_PHONE_REQUEST } from '../constants';
import messages from '../messages';

function* addPhone() {
  const currentTextMessageId: string = yield select(
    makeSelectSelectedMessageId(),
  );
  const url = `/v1/sms_plans/${currentTextMessageId}/alert_phones`;

  try {
    const { data } = yield call(axios.post, url, {
      phone: {
        prefix: '+1',
        iso: 'US',
        number: '',
      },
    });
    const addedPhone = jsonApiToObject(data, 'phone') as Phone;
    yield put(addPhoneSuccess(addedPhone));
  } catch (error) {
    yield call(toast.error, formatMessage(messages.addPhoneError), {
      toastId: ADD_PHONE_ERROR,
    });
    yield put(addPhoneError(error as ApiError));
  }
}

export function* addPhoneSaga() {
  yield takeLatest(ADD_PHONE_REQUEST, addPhone);
}
