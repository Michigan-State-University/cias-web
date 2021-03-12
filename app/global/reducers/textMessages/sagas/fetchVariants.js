import { put, takeLatest, select, call } from 'redux-saga/effects';
import axios from 'axios';

import { mapJsonApiToObject } from 'utils/jsonApiMapper';

import { FETCH_VARIANTS_REQUEST } from '../constants';
import { fetchVariantsSuccess, fetchVariantsError } from '../actions';
import { makeSelectSelectedMessageId } from '../selectors';

export function* fetchVariants() {
  try {
    const currentTextMessageId = yield select(makeSelectSelectedMessageId());
    const requestUrl = `v1/sms_plans/${currentTextMessageId}`;
    const { data } = yield call(axios.get, requestUrl);
    const mappedData = mapJsonApiToObject(data, 'smsPlan', {
      isSingleObject: true,
    });
    yield put(fetchVariantsSuccess(mappedData.variants));
  } catch (error) {
    yield put(fetchVariantsError(error));
  }
}

export default function* fetchVariantsSaga() {
  yield takeLatest(FETCH_VARIANTS_REQUEST, fetchVariants);
}
