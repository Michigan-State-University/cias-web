import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import axios from 'axios';
import { toast } from 'react-toastify';

import { fulfillRaSession } from '../fulfillRaSession';
import {
  fulfillRaSessionSuccess,
  fulfillRaSessionError,
  fetchPredefinedParticipantsRequest,
} from '../../actions';

describe('fulfillRaSession saga', () => {
  const slug = 'participant-slug';
  const interventionId = 'intervention-1';
  const sessionId = 'session-1';
  const userSessionId = 'user-session-1';

  const buildResponse = (overrides = {}) => ({
    data: {
      data: {
        already_completed: false,
        user_session_id: userSessionId,
        session_id: sessionId,
        intervention_id: interventionId,
        health_clinic_id: null,
        lang: 'en',
        ...overrides,
      },
    },
  });

  let openSpy;

  beforeEach(() => {
    openSpy = jest.spyOn(window, 'open').mockImplementation(() => null);
    jest.spyOn(toast, 'info').mockImplementation(() => undefined);
    jest.spyOn(toast, 'error').mockImplementation(() => undefined);
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('posts to the RA session endpoint and opens the fill tab when not yet completed', async () => {
    await expectSaga(fulfillRaSession, { payload: { slug } })
      .provide([[matchers.call.fn(axios.post), buildResponse()]])
      .call(axios.post, `/v1/predefined_participants/${slug}/ra_session`)
      .put(fulfillRaSessionSuccess())
      .run();

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url, target] = openSpy.mock.calls[0];
    expect(url).toContain(
      `/interventions/${interventionId}/sessions/${sessionId}/fill`,
    );
    expect(url).toContain(`userSessionId=${userSessionId}`);
    expect(url).toContain('lang=en');
    expect(target).toBe('_blank');
  });

  it('includes the health clinic id in the fill url when present', async () => {
    await expectSaga(fulfillRaSession, { payload: { slug } })
      .provide([
        [
          matchers.call.fn(axios.post),
          buildResponse({ health_clinic_id: 'clinic-1' }),
        ],
      ])
      .run();

    expect(openSpy).toHaveBeenCalledTimes(1);
    const [url] = openSpy.mock.calls[0];
    expect(url).toContain('cid=clinic-1');
  });

  it('does not open a tab and refreshes participants when already completed', async () => {
    await expectSaga(fulfillRaSession, { payload: { slug } })
      .provide([
        [
          matchers.call.fn(axios.post),
          buildResponse({ already_completed: true }),
        ],
      ])
      .put(fulfillRaSessionSuccess())
      .put(fetchPredefinedParticipantsRequest(interventionId))
      .run();

    expect(openSpy).not.toHaveBeenCalled();
    expect(toast.info).toHaveBeenCalledTimes(1);
  });

  it('dispatches an error and shows a toast when the request fails', async () => {
    const error = new Error('request failed');

    await expectSaga(fulfillRaSession, { payload: { slug } })
      .provide([[matchers.call.fn(axios.post), throwError(error)]])
      .put(fulfillRaSessionError(error))
      .run();

    expect(openSpy).not.toHaveBeenCalled();
    expect(toast.error).toHaveBeenCalledTimes(1);
  });
});
