import axios from 'axios';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { formatMessage } from 'utils/intlOutsideReact';

import generateTestLinkSaga, {
  generateTestLink,
} from 'global/reducers/intervention/sagas/generateTestLink';
import { generateTestLinkError, generateTestLinkSuccess } from '../../actions';
import {
  GENERATE_TEST_LINK_ERROR,
  GENERATE_TEST_LINK_REQUEST,
} from '../../constants';
import messages from '../../messages';

describe('generateTestLink saga', () => {
  const interventionId = 'int-1';
  const url = 'https://cias.app/interventions/int-1/sessions/s-1/fill?lang=en';
  const expiresAt = '2026-09-04T12:03:16Z';

  // A bare envelope, NOT JSON:API — the `data.data` nesting is what the endpoint really returns.
  const mintResponse = {
    data: {
      data: {
        id: 'nonce-1',
        type: 'test_link_token',
        attributes: {
          token: 'signed.token.value',
          expires_at: expiresAt,
          intervention_id: interventionId,
        },
      },
    },
  };

  it('hands the composed test url and the expiry back to the caller', () => {
    const onSuccess = jest.fn();

    return expectSaga(generateTestLink, {
      payload: { interventionId, url, onSuccess },
    })
      .provide([[matchers.call.fn(axios.post), mintResponse]])
      .put(generateTestLinkSuccess(url))
      .call(onSuccess, `${url}&test_link_token=signed.token.value`, expiresAt)
      .run()
      .then(() => {
        expect(onSuccess).toHaveBeenCalledWith(
          `${url}&test_link_token=signed.token.value`,
          expiresAt,
        );
      });
  });

  it('posts to the intervention test_link endpoint', () => {
    const capturedUrls = [];

    return expectSaga(generateTestLink, {
      payload: { interventionId, url, onSuccess: jest.fn() },
    })
      .provide({
        call({ fn, args }, next) {
          if (fn === axios.post) {
            capturedUrls.push(args[0]);
            return mintResponse;
          }
          return next();
        },
      })
      .run()
      .then(() => {
        expect(capturedUrls).toEqual([
          `/v1/interventions/${interventionId}/test_link`,
        ]);
      });
  });

  it('reports an error and does not call back when the request fails', () => {
    const onSuccess = jest.fn();
    const error = new Error('Request failed with status code 403');

    return expectSaga(generateTestLink, {
      payload: { interventionId, url, onSuccess },
    })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(generateTestLinkError(url, error))
      .call(toast.error, formatMessage(messages.generateTestLinkError), {
        toastId: GENERATE_TEST_LINK_ERROR,
      })
      .run()
      .then(() => {
        expect(onSuccess).not.toHaveBeenCalled();
      });
  });

  it('releases the caller with onError when the request fails', () => {
    const onError = jest.fn();
    const error = new Error('Request failed with status code 403');

    return expectSaga(generateTestLink, {
      payload: { interventionId, url, onSuccess: jest.fn(), onError },
    })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .call(onError, error)
      .run()
      .then(() => {
        expect(onError).toHaveBeenCalledWith(error);
      });
  });

  it('treats a response without a token as an error and releases the caller', () => {
    const onSuccess = jest.fn();
    const onError = jest.fn();

    return expectSaga(generateTestLink, {
      payload: { interventionId, url, onSuccess, onError },
    })
      .provide([[matchers.call.fn(axios.post), { data: { data: {} } }]])
      .not.put(generateTestLinkSuccess(url))
      .run()
      .then(() => {
        expect(onSuccess).not.toHaveBeenCalled();
        expect(onError).toHaveBeenCalledTimes(1);
      });
  });

  it('watcher uses takeEvery on the correct action type', () => {
    const sagaFunction = generateTestLinkSaga();
    expect(sagaFunction.next().value).toEqual(
      takeEvery(GENERATE_TEST_LINK_REQUEST, generateTestLink),
    );
  });
});
