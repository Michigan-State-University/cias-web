import axios from 'axios';
import * as Sentry from '@sentry/browser';
import { call, put, takeLatest } from 'redux-saga/effects';

import { TestLinkTokenStatus } from 'models/TestLinkToken';

import { VERIFY_TEST_LINK_TOKEN_REQUEST } from '../constants';
import {
  verifyTestLinkTokenRequest,
  verifyTestLinkTokenSuccess,
  verifyTestLinkTokenError,
} from '../actions';

const VERIFIED_STATUSES: string[] = [
  TestLinkTokenStatus.VALID,
  TestLinkTokenStatus.EXPIRED,
  TestLinkTokenStatus.INVALID,
];

export function* verifyTestLinkToken({
  payload: { token },
}: ReturnType<typeof verifyTestLinkTokenRequest>) {
  const url = '/v1/test_link_tokens/verify';

  try {
    const { data } = yield call(axios.post, url, { test_link_token: token });

    if (!VERIFIED_STATUSES.includes(data?.status)) {
      yield put(verifyTestLinkTokenError());
      return;
    }

    yield put(verifyTestLinkTokenSuccess(data.status as TestLinkTokenStatus));
  } catch (error) {
    Sentry.captureException(error);
    yield put(verifyTestLinkTokenError());
  }
}

export function* verifyTestLinkTokenSaga() {
  yield takeLatest(VERIFY_TEST_LINK_TOKEN_REQUEST, verifyTestLinkToken);
}
