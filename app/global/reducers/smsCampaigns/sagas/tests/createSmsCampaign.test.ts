import axios from 'axios';
import { toast } from 'react-toastify';
import { takeLatest } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import {
  SmsCampaignKind,
  SmsCampaignLinkType,
  SmsCampaignStatus,
} from 'models/SmsCampaign';

import { formatMessage } from 'utils/intlOutsideReact';

import createSmsCampaignSaga, { createSmsCampaign } from '../createSmsCampaign';
import {
  createSmsCampaignError,
  createSmsCampaignSuccess,
} from '../../actions';
import { CREATE_SMS_CAMPAIGN_REQUEST } from '../../constants';
import messages from '../../messages';

describe('createSmsCampaign saga', () => {
  const interventionId = 'int-1';

  const link = {
    url: 'https://example.com',
    variable: 'info',
    linkType: SmsCampaignLinkType.WEBSITE,
  };

  const invitation = {
    kind: SmsCampaignKind.INVITATION,
    body: 'Please join ::info::',
    links: [link],
  };

  const reminder = {
    kind: SmsCampaignKind.MANUAL_REMINDER,
    body: 'A gentle nudge',
    links: [],
  };

  const response = {
    data: {
      data: {
        id: 'campaign-1',
        type: 'sms_campaign',
        attributes: {
          kind: 'invitation',
          status: 'sending',
          scheduled_at: '2026-11-04T12:00:00.000Z',
          sent_at: null,
          accepted_count: 0,
          failed_count: 0,
          recipients_count: 2,
          scheduled_at_provisional: false,
        },
      },
    },
  };

  /** Runs the saga and hands back the request url + body actually posted. */
  const capturePost = (data: any) => {
    const posted: any[] = [];

    return expectSaga(createSmsCampaign, {
      payload: { interventionId, data, onSuccess: undefined },
    } as any)
      .provide({
        call({ fn, args }: any, next: any) {
          if (fn === axios.post) {
            posted.push({ url: args[0], body: args[1] });
            return response;
          }
          return next();
        },
      })
      .run()
      .then(() => posted[0]);
  };

  it('posts to the intervention-scoped campaigns path', async () => {
    const { url } = await capturePost(invitation);

    expect(url).toEqual(
      `v1/interventions/${interventionId}/predefined_participants/sms_campaigns`,
    );
  });

  it('snake-cases the links and omits scheduled_reminder when there is none', async () => {
    const { body } = await capturePost(invitation);

    expect(body.sms_campaign).toEqual({
      kind: 'invitation',
      body: 'Please join ::info::',
      links: [
        {
          url: 'https://example.com',
          variable: 'info',
          link_type: 'website',
        },
      ],
    });
    // Not merely null — the key must be absent.
    expect('scheduled_reminder' in body.sms_campaign).toBe(false);
  });

  it('sends the scheduled reminder with days_after and its own links', async () => {
    const { body } = await capturePost({
      ...invitation,
      scheduledReminder: {
        body: 'Reminder ::info::',
        daysAfter: 3,
        links: [link],
      },
    });

    expect(body.sms_campaign.scheduled_reminder).toEqual({
      body: 'Reminder ::info::',
      days_after: 3,
      links: [
        {
          url: 'https://example.com',
          variable: 'info',
          link_type: 'website',
        },
      ],
    });
  });

  it('posts a manual reminder under its own kind, with no scheduled reminder', async () => {
    const { body } = await capturePost(reminder);

    expect(body.sms_campaign.kind).toEqual('manual_reminder');
    expect('scheduled_reminder' in body.sms_campaign).toBe(false);
  });

  it('maps the accepted campaign, toasts and calls onSuccess', () => {
    const onSuccess = jest.fn();

    return expectSaga(createSmsCampaign, {
      // @ts-ignore
      payload: { interventionId, data: invitation, onSuccess },
    })
      .provide([[matchers.call.fn(axios.post), response]])
      .put(
        createSmsCampaignSuccess({
          id: 'campaign-1',
          kind: SmsCampaignKind.INVITATION,
          status: SmsCampaignStatus.SENDING,
          scheduledAt: '2026-11-04T12:00:00.000Z',
          sentAt: null,
          acceptedCount: 0,
          failedCount: 0,
          recipientsCount: 2,
          scheduledAtProvisional: false,
        }),
      )
      .call(toast.success, formatMessage(messages.createSmsCampaignSuccess))
      .run()
      .then(() => {
        expect(onSuccess).toHaveBeenCalled();
      });
  });

  it('keeps every validation code of a 422 and shows no toast', () => {
    const error = {
      response: {
        status: 422,
        data: {
          details: {
            errors: [
              { code: 'UNKNOWN_LINK_VARIABLE' },
              { code: 'SCHEDULED_REMINDER_BODY_BLANK' },
            ],
          },
        },
      },
    };

    return expectSaga(createSmsCampaign, {
      // @ts-ignore
      payload: { interventionId, data: invitation, onSuccess: undefined },
    })
      .provide([[matchers.call.fn(axios.post), throwError(error as any)]])
      .put(
        createSmsCampaignError(
          ['UNKNOWN_LINK_VARIABLE', 'SCHEDULED_REMINDER_BODY_BLANK'],
          null,
        ),
      )
      .not.call.fn(toast.error)
      .not.call.fn(toast.success)
      .run();
  });

  it('carries the retry window of a 429 RATE_LIMITED', () => {
    const error = {
      response: {
        status: 429,
        data: {
          details: { errors: [{ code: 'RATE_LIMITED' }], retry_after: 90 },
        },
        headers: {},
      },
    };

    return expectSaga(createSmsCampaign, {
      // @ts-ignore
      payload: { interventionId, data: invitation, onSuccess: undefined },
    })
      .provide([[matchers.call.fn(axios.post), throwError(error as any)]])
      .put(createSmsCampaignError(['RATE_LIMITED'], 90))
      .run();
  });

  it('turns details.reason into a NOT_PUBLISHED code', () => {
    const error = {
      response: {
        status: 400,
        data: { details: { reason: 'intervention_not_published' } },
        headers: {},
      },
    };

    return expectSaga(createSmsCampaign, {
      // @ts-ignore
      payload: { interventionId, data: invitation, onSuccess: undefined },
    })
      .provide([[matchers.call.fn(axios.post), throwError(error as any)]])
      .put(createSmsCampaignError(['NOT_PUBLISHED'], null))
      .run();
  });

  it('synthesises HTTP_403 for a body-less 403 so the form is never silent', () => {
    const error = { response: { status: 403, data: {}, headers: {} } };

    return expectSaga(createSmsCampaign, {
      // @ts-ignore
      payload: { interventionId, data: invitation, onSuccess: undefined },
    })
      .provide([[matchers.call.fn(axios.post), throwError(error as any)]])
      .put(createSmsCampaignError(['HTTP_403'], null))
      .run();
  });

  it('does not call onSuccess when the request fails', () => {
    const onSuccess = jest.fn();

    return expectSaga(createSmsCampaign, {
      // @ts-ignore
      payload: { interventionId, data: invitation, onSuccess },
    })
      .provide([
        [matchers.call.fn(axios.post), throwError(new Error('boom') as any)],
      ])
      .run()
      .then(() => {
        expect(onSuccess).not.toHaveBeenCalled();
      });
  });

  it('watcher uses takeLatest so a double submit posts once', () => {
    const sagaFunction = createSmsCampaignSaga();
    expect(sagaFunction.next().value).toEqual(
      takeLatest(CREATE_SMS_CAMPAIGN_REQUEST, createSmsCampaign),
    );
  });
});
