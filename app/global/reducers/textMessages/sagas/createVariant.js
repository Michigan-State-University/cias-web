import { put, takeLatest, call, select } from 'redux-saga/effects';
import axios from 'axios';

import { makeSelectSelectedMessageId } from 'global/reducers/textMessages/selectors';
import objectToCamelCase from 'utils/objectToCamelCase';
import { defaultMapper } from 'utils/mapResponseObjects';

import { CREATE_VARIANT_REQUEST } from '../constants';
import { createVariantError, createVariantSuccess } from '../actions';

export function* createVariant() {
  try {
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `/v1/sms_plans/${currentTextMessageId}/variants`;
    const {
      data: { data },
    } = yield call(axios.post, requestUrl, {
      variant: {
        formula_match: '=',
        content: '',
      },
    });
    const mappedData = objectToCamelCase(defaultMapper(data));
    yield put(createVariantSuccess(mappedData, currentTextMessageId));
  } catch (error) {
    yield put(createVariantError(error));
  }
}

export default function* createVariantSaga() {
  yield takeLatest(CREATE_VARIANT_REQUEST, createVariant);
}
