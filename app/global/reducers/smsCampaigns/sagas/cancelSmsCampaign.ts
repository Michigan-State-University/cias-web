import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { SmsCampaign } from 'models/SmsCampaign';

import { getApiErrorCodesForDisplay } from 'utils/apiErrorCodes';
import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';

import {
  cancelSmsCampaignError,
  cancelSmsCampaignRequest,
  cancelSmsCampaignSuccess,
  fetchSmsCampaignsRequest,
} from '../actions';
import { CANCEL_SMS_CAMPAIGN_REQUEST } from '../constants';
import messages from '../messages';

export function* cancelSmsCampaign({
  payload: { interventionId, campaignId },
}: ReturnType<typeof cancelSmsCampaignRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/sms_campaigns/${campaignId}/cancel`;

  try {
    const { data } = yield call(axios.post, requestURL);
    const campaign = jsonApiToObject(data, 'smsCampaign') as SmsCampaign;

    yield put(cancelSmsCampaignSuccess(campaign));
    yield call(toast.success, formatMessage(messages.cancelSmsCampaignSuccess));
  } catch (error) {
    const errorCodes = getApiErrorCodesForDisplay(error);
    yield put(cancelSmsCampaignError(errorCodes));

    // CAMPAIGN_NOT_CANCELLABLE means the local list is stale — the campaign
    // already left `scheduled`. Re-fetch so the UI catches up.
    if (errorCodes.includes('CAMPAIGN_NOT_CANCELLABLE')) {
      yield put(fetchSmsCampaignsRequest(interventionId, true));
    }
  }
}

export default function* cancelSmsCampaignSaga() {
  yield takeEvery(CANCEL_SMS_CAMPAIGN_REQUEST, cancelSmsCampaign);
}
