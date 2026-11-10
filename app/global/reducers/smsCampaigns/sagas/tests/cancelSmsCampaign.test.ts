import axios from 'axios';
import { toast } from 'react-toastify';
import { takeEvery } from 'redux-saga/effects';
import * as matchers from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';
import { expectSaga } from 'redux-saga-test-plan';

import { SmsCampaignKind, SmsCampaignStatus } from 'models/SmsCampaign';

import { formatMessage } from 'utils/intlOutsideReact';

import cancelSmsCampaignSaga, { cancelSmsCampaign } from '../cancelSmsCampaign';
import {
  cancelSmsCampaignError,
  cancelSmsCampaignSuccess,
  fetchSmsCampaignsRequest,
} from '../../actions';
import { CANCEL_SMS_CAMPAIGN_REQUEST } from '../../constants';
import messages from '../../messages';

describe('cancelSmsCampaign saga', () => {
  const interventionId = 'int-1';
  const campaignId = 'rem-1';
  // @ts-ignore — only the payload is read
  const payload = { interventionId, campaignId };

  const response = {
    data: {
      data: {
        id: campaignId,
        type: 'sms_campaign',
        attributes: {
          kind: 'scheduled_reminder',
          status: 'cancelled',
          scheduled_at: '2099-11-02T13:00:00.000Z',
          sent_at: null,
          accepted_count: 0,
          failed_count: 0,
          recipients_count: null,
          scheduled_at_provisional: false,
        },
      },
    },
  };

  const errorWithCode = (code: string) => ({
    response: { status: 422, data: { details: { errors: [{ code }] } } },
  });

  it('posts to the campaign cancel path', () => {
    const urls: string[] = [];

    return expectSaga(cancelSmsCampaign, { payload } as any)
      .provide({
        call({ fn, args }: any, next: any) {
          if (fn === axios.post) {
            urls.push(args[0]);
            return response;
          }
          return next();
        },
      })
      .run()
      .then(() => {
        expect(urls).toEqual([
          `v1/interventions/${interventionId}/predefined_participants/sms_campaigns/${campaignId}/cancel`,
        ]);
      });
  });

  it('maps the cancelled campaign and toasts', () =>
    expectSaga(cancelSmsCampaign, { payload } as any)
      .provide([[matchers.call.fn(axios.post), response]])
      .put(
        cancelSmsCampaignSuccess({
          id: campaignId,
          kind: SmsCampaignKind.SCHEDULED_REMINDER,
          status: SmsCampaignStatus.CANCELLED,
          scheduledAt: '2099-11-02T13:00:00.000Z',
          sentAt: null,
          acceptedCount: 0,
          failedCount: 0,
          recipientsCount: null,
          scheduledAtProvisional: false,
        }),
      )
      .call(toast.success, formatMessage(messages.cancelSmsCampaignSuccess))
      .run());

  it('refetches the list when the campaign is no longer cancellable', () =>
    expectSaga(cancelSmsCampaign, { payload } as any)
      .provide([
        [
          matchers.call.fn(axios.post),
          throwError(errorWithCode('CAMPAIGN_NOT_CANCELLABLE') as any),
        ],
      ])
      .put(cancelSmsCampaignError(['CAMPAIGN_NOT_CANCELLABLE']))
      // `silent` — the refetch must not flash the list loader.
      .put(fetchSmsCampaignsRequest(interventionId, true))
      .run());

  it('does not refetch for an unrelated error code', () =>
    expectSaga(cancelSmsCampaign, { payload } as any)
      .provide([
        [
          matchers.call.fn(axios.post),
          throwError(errorWithCode('RATE_LIMITED') as any),
        ],
      ])
      .put(cancelSmsCampaignError(['RATE_LIMITED']))
      .not.put(fetchSmsCampaignsRequest(interventionId, true))
      .run());

  it('reports the cancel error against the row that was clicked', () =>
    expectSaga(cancelSmsCampaign, { payload } as any)
      .provide([
        [
          matchers.call.fn(axios.post),
          throwError({
            response: { status: 403, data: {}, headers: {} },
          } as any),
        ],
      ])
      .put(cancelSmsCampaignError(['HTTP_403']))
      .run());

  it('watcher uses takeEvery so two rows can be cancelled at once', () => {
    const sagaFunction = cancelSmsCampaignSaga();
    expect(sagaFunction.next().value).toEqual(
      takeEvery(CANCEL_SMS_CAMPAIGN_REQUEST, cancelSmsCampaign),
    );
  });
});
