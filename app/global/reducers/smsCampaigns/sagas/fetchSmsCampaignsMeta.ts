import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { SmsCampaignMeta } from 'models/SmsCampaign';

import objectToCamelCase from 'utils/objectToCamelCase';

import {
  fetchSmsCampaignsMetaError,
  fetchSmsCampaignsMetaRequest,
  fetchSmsCampaignsMetaSuccess,
} from '../actions';
import { FETCH_SMS_CAMPAIGNS_META_REQUEST } from '../constants';

export function* fetchSmsCampaignsMeta({
  payload: { interventionId },
}: ReturnType<typeof fetchSmsCampaignsMetaRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/sms_campaigns/meta`;

  try {
    const { data } = yield call(axios.get, requestURL);
    // A plain JSON body, not JSON:API.
    yield put(
      fetchSmsCampaignsMetaSuccess(objectToCamelCase(data) as SmsCampaignMeta),
    );
  } catch {
    yield put(fetchSmsCampaignsMetaError());
  }
}

export default function* fetchSmsCampaignsMetaSaga() {
  yield takeLatest(FETCH_SMS_CAMPAIGNS_META_REQUEST, fetchSmsCampaignsMeta);
}
