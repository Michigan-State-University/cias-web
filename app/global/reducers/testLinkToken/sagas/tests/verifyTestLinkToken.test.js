import axios from 'axios';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { TestLinkTokenStatus } from 'models/TestLinkToken';

import { verifyTestLinkToken } from '../verifyTestLinkToken';
import {
  verifyTestLinkTokenError,
  verifyTestLinkTokenSuccess,
} from '../../actions';

describe('verifyTestLinkToken saga', () => {
  const token = 'signed.token.value';
  const payload = { payload: { token } };

  const respondWith = (data) => [[matchers.call.fn(axios.post), { data }]];

  it('posts the token to the verification endpoint, top level', () => {
    const calls = [];

    return expectSaga(verifyTestLinkToken, payload)
      .provide({
        call({ fn, args }, next) {
          if (fn === axios.post) {
            calls.push(args);
            return { data: { status: 'valid', valid: true } };
          }
          return next();
        },
      })
      .run()
      .then(() => {
        expect(calls).toEqual([
          ['/v1/test_link_tokens/verify', { test_link_token: token }],
        ]);
      });
  });

  it.each([
    ['valid', TestLinkTokenStatus.VALID],
    ['expired', TestLinkTokenStatus.EXPIRED],
    ['invalid', TestLinkTokenStatus.INVALID],
  ])('passes the backend verdict "%s" through unchanged', (status, expected) =>
    expectSaga(verifyTestLinkToken, payload)
      .provide(respondWith({ status, valid: status === 'valid' }))
      .put(verifyTestLinkTokenSuccess(expected))
      .run(),
  );

  describe('when there is no usable verdict', () => {
    it('reports an error when the request fails', () =>
      expectSaga(verifyTestLinkToken, payload)
        .provide([
          [matchers.call.fn(axios.post), throwError(new Error('offline'))],
        ])
        .put(verifyTestLinkTokenError())
        .run());

    it('reports an error on an unrecognised status', () =>
      expectSaga(verifyTestLinkToken, payload)
        .provide(respondWith({ status: 'something_new' }))
        .put(verifyTestLinkTokenError())
        .run());

    it('reports an error on a body with no status at all', () =>
      expectSaga(verifyTestLinkToken, payload)
        .provide(respondWith({}))
        .put(verifyTestLinkTokenError())
        .run());

    it('does not let a stray "valid: true" through', () =>
      expectSaga(verifyTestLinkToken, payload)
        .provide(respondWith({ valid: true }))
        .put(verifyTestLinkTokenError())
        .run());
  });
});
