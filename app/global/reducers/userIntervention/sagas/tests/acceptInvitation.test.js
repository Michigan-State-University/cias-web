import axios from 'axios';
import { expectSaga } from 'redux-saga-test-plan';

import {
  captureTestLinkTokenFromUrl,
  clearTestLinkToken,
  getTestLinkToken,
} from 'utils/testLinkToken';

import { acceptInvitation } from '../acceptInvitation';

const userInterventionResponse = {
  data: {
    data: {
      id: 'ui-1',
      type: 'user_intervention',
      attributes: { blocked: false },
    },
  },
};

const setUrl = (url) => window.history.replaceState({}, '', url);

const land = (url) => {
  setUrl(url);
  captureTestLinkTokenFromUrl();
  expect(window.location.search).not.toContain('test_link_token');
};

const runWithCapturedBody = () => {
  const capturedBodies = [];

  return expectSaga(acceptInvitation, {
    payload: { interventionId: 'i-1', clinicId: null },
  })
    .provide({
      call({ fn, args }, next) {
        if (fn === axios.post) {
          capturedBodies.push(args[1]);
          return userInterventionResponse;
        }
        return next();
      },
    })
    .run()
    .then(() => capturedBodies);
};

describe('acceptInvitation saga — test-link token forwarding', () => {
  beforeEach(() => {
    clearTestLinkToken();
    setUrl('/');
  });

  it('forwards a test_link_token captured at bootstrap at the top level of the payload', async () => {
    land('/interventions/i-1/invite?test_link_token=abc');

    const [body] = await runWithCapturedBody();

    expect(body).toEqual({
      intervention_id: 'i-1',
      health_clinic_id: null,
      test_link_token: 'abc',
    });
  });

  it('leaves the payload unchanged when no token was captured', async () => {
    const [body] = await runWithCapturedBody();

    expect(body).toEqual({
      intervention_id: 'i-1',
      health_clinic_id: null,
    });
    expect(body).not.toHaveProperty('test_link_token');
  });

  it('keeps the token after success, so a later accept in the same tab is still marked', async () => {
    land('/interventions/i-1/invite?test_link_token=abc');

    await runWithCapturedBody();
    expect(getTestLinkToken()).toEqual('abc');

    const [body] = await runWithCapturedBody();
    expect(body).toHaveProperty('test_link_token', 'abc');
  });
});
