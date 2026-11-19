import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';

import { SmsCampaign } from 'models/SmsCampaign';

import { jsonApiToArray } from 'utils/jsonApiMapper';

import {
  fetchSmsCampaignsError,
  fetchSmsCampaignsRequest,
  fetchSmsCampaignsSuccess,
} from '../actions';
import { FETCH_SMS_CAMPAIGNS_REQUEST } from '../constants';

export function* fetchSmsCampaigns({
  payload: { interventionId },
}: ReturnType<typeof fetchSmsCampaignsRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/sms_campaigns`;

  try {
    const { data } = yield call(axios.get, requestURL);
    const campaigns = jsonApiToArray(data, 'smsCampaign') as SmsCampaign[];
    yield put(fetchSmsCampaignsSuccess(campaigns));
  } catch (error) {
    yield put(fetchSmsCampaignsError());
  }
}

export default function* fetchSmsCampaignsSaga() {
  yield takeLatest(FETCH_SMS_CAMPAIGNS_REQUEST, fetchSmsCampaigns);
}
