import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { REMOVE_TEXT_MESSAGE_VARIANT_REQUEST } from '../constants';
import {
  removeTextMessageVariantSuccess,
  removeTextMessageVariantError,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';

export function* removeTextMessageVariant({ payload: { variantId } }) {
  try {
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `/v1/sms_plans/${currentTextMessageId}/variants/${variantId}`;

    yield call(axios.delete, requestUrl);
    yield put(removeTextMessageVariantSuccess());
  } catch (error) {
    yield put(removeTextMessageVariantError(error));
  }
}

export default function* removeTextMessageVariantSaga() {
  yield takeLatest(
    REMOVE_TEXT_MESSAGE_VARIANT_REQUEST,
    removeTextMessageVariant,
  );
}
