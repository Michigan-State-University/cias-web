import { call, put, takeEvery } from '@redux-saga/core/effects';
import axios from 'axios';

import objectToSnakeCase from 'utils/objectToSnakeCase';

import { WithSaga } from 'global/reducers/types';

import { replace } from 'connected-react-router';
import {
  verifySmsLinkError,
  verifySmsLinkRequest,
  verifySmsLinkSuccess,
} from '../actions';
import { VERIFY_SMS_LINK_REQUEST } from '../constants';

function* verifySmsLinkWorker({
  payload: { slug },
}: ReturnType<typeof verifySmsLinkRequest>) {
  const requestUrl = `/v1/sms_links/verify`;
  const requestBody = objectToSnakeCase({ sms_link: { slug } });

  try {
    const { data } = yield call(axios.post, requestUrl, requestBody);

    if (data.link_type) {
      yield put(verifySmsLinkSuccess(data));
      yield put(replace('/user_sms_link', data));
    } else {
      yield put(verifySmsLinkError('Invalid link'));
    }
  } catch (error) {
    yield put(verifySmsLinkError(error));
  }
}

function* verifySmsLinkSaga() {
  yield takeEvery(VERIFY_SMS_LINK_REQUEST, verifySmsLinkWorker);
}

export const withVerifySmsLinkSaga: WithSaga = {
  key: 'verifySmsLink',
  saga: verifySmsLinkSaga,
};
