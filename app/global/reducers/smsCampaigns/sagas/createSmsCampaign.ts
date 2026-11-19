import axios from 'axios';
import { call, put, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { SmsCampaign } from 'models/SmsCampaign';

import {
  getApiErrorCodesForDisplay,
  getApiRetryAfter,
} from 'utils/apiErrorCodes';
import { formatMessage } from 'utils/intlOutsideReact';
import { jsonApiToObject } from 'utils/jsonApiMapper';
import objectToSnakeCase from 'utils/objectToSnakeCase';

import {
  createSmsCampaignError,
  createSmsCampaignRequest,
  createSmsCampaignSuccess,
} from '../actions';
import { CREATE_SMS_CAMPAIGN_REQUEST } from '../constants';
import messages from '../messages';

export function* createSmsCampaign({
  payload: { interventionId, data, onSuccess },
}: ReturnType<typeof createSmsCampaignRequest>) {
  const requestURL = `v1/interventions/${interventionId}/predefined_participants/sms_campaigns`;

  const requestBody = { sms_campaign: objectToSnakeCase(data) };

  try {
    const { data: responseData } = yield call(
      axios.post,
      requestURL,
      requestBody,
    );

    const campaign = jsonApiToObject(
      responseData,
      'smsCampaign',
    ) as SmsCampaign;

    yield put(createSmsCampaignSuccess(campaign));
    yield call(toast.success, formatMessage(messages.createSmsCampaignSuccess));

    if (onSuccess) yield call(onSuccess);
  } catch (error) {
    yield put(
      createSmsCampaignError(
        getApiErrorCodesForDisplay(error),
        getApiRetryAfter(error),
      ),
    );
  }
}

export default function* createSmsCampaignSaga() {
  yield takeLatest(CREATE_SMS_CAMPAIGN_REQUEST, createSmsCampaign);
}
