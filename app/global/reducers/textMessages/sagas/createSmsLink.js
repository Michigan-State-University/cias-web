import { call, put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';
import { toast } from 'react-toastify';

import { jsonApiToObject } from 'utils/jsonApiMapper';
import { formatApiErrorMessage } from 'utils/formatApiErrorMessage';

import { CREATE_SMS_LINK_REQUEST } from '../constants';

import { createSmsLinkSuccess, createSmsLinkError } from '../actions';
import messages from '../messages';

export function* createSmsLink({
  payload: { smsPlanId, linkType, url, variable },
} = {}) {
  const requestURL = '/v1/sms_links';

  try {
    const { data } = yield call(axios.post, requestURL, {
      sms_link: { sms_plan_id: smsPlanId, link_type: linkType, url, variable },
    });

    yield put(createSmsLinkSuccess(jsonApiToObject(data, 'smsLink')));
  } catch (error) {
    yield call(
      toast.error,
      formatApiErrorMessage(error, messages.createSmsLinkError),
    );
    yield put(createSmsLinkError(error));
  }
}

export default function* createSmsLinkSaga() {
  yield takeLatest(CREATE_SMS_LINK_REQUEST, createSmsLink);
}
