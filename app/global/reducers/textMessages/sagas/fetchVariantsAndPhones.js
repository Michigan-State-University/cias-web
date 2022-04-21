import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';

import { mapJsonApiToObject } from 'utils/jsonApiMapper';

import {
  FETCH_VARIANTS_AND_PHONES_ERROR,
  FETCH_VARIANTS_AND_PHONES_REQUEST,
} from '../constants';
import {
  fetchVariantsAndPhonesSuccess,
  fetchVariantsAndPhonesError,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';
import messages from '../messages';

export function* fetchVariantsAndPhones() {
  try {
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `v1/sms_plans/${currentTextMessageId}`;
    const { data } = yield call(axios.get, requestUrl);
    const { variants, phones } = mapJsonApiToObject(data, 'smsPlan', {
      isSingleObject: true,
    });
    yield put(fetchVariantsAndPhonesSuccess(variants, phones));
  } catch (error) {
    yield call(
      toast.error,
      formatMessage(messages.fetchVariantsAndPhonesError),
      {
        toastId: FETCH_VARIANTS_AND_PHONES_ERROR,
      },
    );
    yield put(fetchVariantsAndPhonesError(error));
  }
}

export default function* fetchVariantsAndPhonesSaga() {
  yield takeLatest(FETCH_VARIANTS_AND_PHONES_REQUEST, fetchVariantsAndPhones);
}
