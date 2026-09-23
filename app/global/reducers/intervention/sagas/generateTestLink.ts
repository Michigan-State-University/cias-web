import axios from 'axios';
import { call, put, takeEvery } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { formatMessage } from 'utils/intlOutsideReact';
import { appendTestLinkToken } from 'utils/testLinkToken';

import { generateTestLinkError, generateTestLinkSuccess } from '../actions';
import messages from '../messages';
import {
  GENERATE_TEST_LINK_ERROR,
  GENERATE_TEST_LINK_REQUEST,
} from '../constants';

type GenerateTestLinkAction = {
  type: string;
  payload: {
    interventionId: string;
    url: string;
    onSuccess: (testUrl: string, expiresAt: Nullable<string>) => void;
    onError?: (error: unknown) => void;
  };
};

/**
 * The mint endpoint does **not** answer in JSON:API — it returns a bare
 * `{ data: { id, type, attributes: { token, expires_at } } }` envelope, so the response is read off
 * `data.data.attributes` and not through `jsonApiToObject`.
 *
 * **Exactly one of `onSuccess` / `onError` must run on every path** — the caller hands over a
 * promise that only these callbacks settle, and a return without calling back leaves its clipboard
 * write pending forever.
 */
export function* generateTestLink({
  payload: { interventionId, url, onSuccess, onError },
}: GenerateTestLinkAction) {
  const requestUrl = `/v1/interventions/${interventionId}/test_link`;

  let token: Nullable<string> = null;
  let expiresAt: Nullable<string> = null;

  try {
    const { data } = yield call(axios.post, requestUrl);
    token = data?.data?.attributes?.token ?? null;
    expiresAt = data?.data?.attributes?.expires_at ?? null;

    if (!token) throw new Error('Test link token missing from the response');

    yield put(generateTestLinkSuccess(url));
  } catch (error) {
    yield put(generateTestLinkError(url, error));
    yield call(toast.error, formatMessage(messages.generateTestLinkError), {
      toastId: GENERATE_TEST_LINK_ERROR,
    });
    if (onError) yield call(onError, error);
    return;
  }

  // Outside the try on purpose: a failure to hand the link over (a blocked clipboard, say) is the
  // caller's to report, and must not be mistaken for a failed mint.
  yield call(onSuccess, appendTestLinkToken(url, token), expiresAt);
}

// `takeEvery`, not `takeLatest`: the two copy controls mint independently, and cancelling an
// in-flight mint would strand its loader and leave the caller's clipboard write unsettled.
export default function* generateTestLinkSaga() {
  yield takeEvery(GENERATE_TEST_LINK_REQUEST, generateTestLink);
}
