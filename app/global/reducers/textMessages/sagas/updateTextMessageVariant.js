import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';
import { UPDATE_TEXT_MESSAGE_VARIANT_REQUEST } from '../constants';
import {
  updateTextMessageVariantSuccess,
  updateTextMessageVariantError,
} from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';

export function* updateTextMessageVariant({
  payload: {
    value: { data, variantId },
  },
}) {
  try {
    const { value, field } = data;
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `/v1/sms_plans/${currentTextMessageId}/variants/${variantId}`;
    const body = objectToSnakeCase({ variant: { [field]: value } });

    yield call(axios.patch, requestUrl, body);
    yield put(updateTextMessageVariantSuccess());
  } catch (error) {
    yield put(updateTextMessageVariantError(error));
  }
}

export default function* updateTextMessageVariantSaga() {
  yield takeLatest(
    UPDATE_TEXT_MESSAGE_VARIANT_REQUEST,
    updateTextMessageVariant,
  );
}
