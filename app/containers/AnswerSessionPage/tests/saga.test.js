import axios from 'axios';
import { expectSaga } from 'redux-saga-test-plan';

import {
  captureTestLinkTokenFromUrl,
  clearTestLinkToken,
  getTestLinkToken,
} from 'utils/testLinkToken';

import {
  createUserSession,
  fetchOrCreateUserSession,
} from 'containers/AnswerSessionPage/saga';
import { setTestRunFill } from 'containers/AnswerSessionPage/actions';

const userSessionResponse = {
  data: {
    data: {
      id: 'us-1',
      type: 'user_session',
      attributes: { language_code: 'en' },
    },
  },
};

const setUrl = (url) => window.history.replaceState({}, '', url);

const land = (url) => {
  setUrl(url);
  captureTestLinkTokenFromUrl();
  expect(window.location.search).not.toContain('test_link_token');
};

const runWithCapturedBody = (saga, sessionId) => {
  const capturedBodies = [];

  return expectSaga(saga, { payload: { sessionId } })
    .provide({
      select: () => ({ query: {} }),
      call({ fn, args }, next) {
        if (fn === axios.post) {
          capturedBodies.push(args[1]);
          return userSessionResponse;
        }
        return next();
      },
    })
    .run()
    .then(() => capturedBodies);
};

describe('AnswerSessionPage saga — test-link token forwarding', () => {
  beforeEach(() => {
    clearTestLinkToken();
    setUrl('/');
  });

  describe.each([
    ['createUserSession', createUserSession],
    ['fetchOrCreateUserSession', fetchOrCreateUserSession],
  ])('%s', (_name, saga) => {
    it('forwards a test_link_token captured at bootstrap at the top level of the payload', async () => {
      land('/interventions/i-1/sessions/s-1/fill?test_link_token=abc');

      const [body] = await runWithCapturedBody(saga, 's-1');

      expect(body).toEqual({
        user_session: { session_id: 's-1', health_clinic_id: undefined },
        test_link_token: 'abc',
      });
      // The token must NOT be nested inside the resource key — the backend reads it top level.
      expect(body.user_session.test_link_token).toBeUndefined();
    });

    it('leaves the payload unchanged when no token was captured', async () => {
      const [body] = await runWithCapturedBody(saga, 's-1');

      expect(body).toEqual({
        user_session: { session_id: 's-1', health_clinic_id: undefined },
      });
      expect(body).not.toHaveProperty('test_link_token');
    });

    // The token used to be dropped after the first successful create, which left a researcher's
    // "Start session again" fill unmarked and therefore permanent. Do not reinstate that.
    it('keeps the token after success, so a later create in the same tab is still marked', async () => {
      land('/interventions/i-1/sessions/s-1/fill?test_link_token=abc');

      await runWithCapturedBody(saga, 's-1');
      expect(getTestLinkToken()).toEqual('abc');

      const [body] = await runWithCapturedBody(saga, 's-2');
      expect(body).toHaveProperty('test_link_token', 'abc');
    });
  });

  // The only cover for the raw `meta.test_run` read, in a file that camelizes everywhere else:
  // write `meta.testRun` instead and every other test stays green with the banner permanently dark.
  describe.each([
    ['createUserSession', createUserSession],
    ['fetchOrCreateUserSession', fetchOrCreateUserSession],
  ])('%s — reports what the backend said about the marker', (_name, saga) => {
    const runWithMeta = (saga_, testRun) =>
      expectSaga(saga_, { payload: { sessionId: 's-1' } }).provide({
        select: () => ({ query: {} }),
        call: ({ fn }, next) =>
          fn === axios.post
            ? {
                data: {
                  ...userSessionResponse.data,
                  meta: { test_run: testRun },
                },
              }
            : next(),
      });

    it.each([[true], [false]])('forwards meta.test_run === %s', async (flag) =>
      runWithMeta(saga, flag).put(setTestRunFill(flag, false)).run(),
    );

    it('reports a token that was sent but did not apply', async () => {
      land('/interventions/i-1/sessions/s-1/fill?test_link_token=abc');

      return runWithMeta(saga, false).put(setTestRunFill(false, true)).run();
    });

    it('reports no failure when the link did apply', async () => {
      land('/interventions/i-1/sessions/s-1/fill?test_link_token=abc');

      return runWithMeta(saga, true).put(setTestRunFill(true, true)).run();
    });

    it('reports no failure when no link was sent', async () =>
      runWithMeta(saga, false).put(setTestRunFill(false, false)).run());
  });
});
