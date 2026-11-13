import {
  SmsCampaign,
  SmsCampaignData,
  SmsCampaignKind,
  SmsCampaignStatus,
} from 'models/SmsCampaign';

import {
  cancelSmsCampaignError,
  cancelSmsCampaignRequest,
  cancelSmsCampaignSuccess,
  clearSmsCampaignErrors,
  createSmsCampaignError,
  createSmsCampaignRequest,
  createSmsCampaignSuccess,
  fetchSmsCampaignsMetaError,
  fetchSmsCampaignsMetaRequest,
  fetchSmsCampaignsMetaSuccess,
} from '../actions';
import { initialState, smsCampaignsReducer } from '../reducer';

const campaign = (overrides: Partial<SmsCampaign> = {}): SmsCampaign => ({
  id: 'campaign-1',
  kind: SmsCampaignKind.INVITATION,
  status: SmsCampaignStatus.SENDING,
  scheduledAt: '2026-11-04T12:00:00.000Z',
  sentAt: null,
  acceptedCount: 0,
  failedCount: 0,
  recipientsCount: 2,
  scheduledAtProvisional: false,
  body: 'Campaign body',
  links: [],
  ...overrides,
});

const campaignData: SmsCampaignData = {
  kind: SmsCampaignKind.MANUAL_REMINDER,
  body: 'A gentle nudge',
  links: [],
};

describe('smsCampaigns reducer', () => {
  it('returns the initial state for an unknown action', () => {
    // @ts-ignore — deliberately not one of ours
    expect(smsCampaignsReducer(undefined, { type: 'NOPE' })).toEqual(
      initialState,
    );
  });

  it('stores the codes and retry window of a failed create', () => {
    const state = smsCampaignsReducer(
      initialState,
      createSmsCampaignError(['RATE_LIMITED'], 90),
    );

    expect(state.createErrorCodes).toEqual(['RATE_LIMITED']);
    expect(state.createRetryAfter).toEqual(90);
    expect(state.loaders.creatingCampaign).toBe(false);
  });

  it('clears the previous retry window when the form is resubmitted', () => {
    const failed = smsCampaignsReducer(
      initialState,
      createSmsCampaignError(['RATE_LIMITED'], 90),
    );

    const resubmitted = smsCampaignsReducer(
      failed,
      createSmsCampaignRequest('int-1', campaignData),
    );

    expect(resubmitted.createErrorCodes).toEqual([]);
    expect(resubmitted.createRetryAfter).toBeNull();
    expect(resubmitted.loaders.creatingCampaign).toBe(true);
  });

  it('prepends the accepted campaign so the newest stays first', () => {
    const existing = campaign({ id: 'old' });
    const state = smsCampaignsReducer(
      {
        ...initialState,
        campaigns: [existing],
        loaders: { ...initialState.loaders, creatingCampaign: true },
      },
      createSmsCampaignSuccess(campaign({ id: 'new' })),
    );

    expect(state.campaigns.map(({ id }) => id)).toEqual(['new', 'old']);
    expect(state.loaders.creatingCampaign).toBe(false);
  });

  it('marks only the clicked row as cancelling and clears its errors', () => {
    const state = smsCampaignsReducer(
      { ...initialState, cancelErrorCodes: ['RATE_LIMITED'] },
      cancelSmsCampaignRequest('int-1', 'rem-1'),
    );

    expect(state.loaders.cancellingCampaignId).toEqual('rem-1');
    expect(state.cancelErrorCodes).toEqual([]);
  });

  it('replaces the cancelled campaign in place', () => {
    const scheduled = campaign({
      id: 'rem-1',
      kind: SmsCampaignKind.SCHEDULED_REMINDER,
      status: SmsCampaignStatus.SCHEDULED,
    });
    const state = smsCampaignsReducer(
      {
        ...initialState,
        campaigns: [campaign({ id: 'inv-1' }), scheduled],
        loaders: { ...initialState.loaders, cancellingCampaignId: 'rem-1' },
      },
      cancelSmsCampaignSuccess({
        ...scheduled,
        status: SmsCampaignStatus.CANCELLED,
      }),
    );

    expect(state.campaigns.map(({ id }) => id)).toEqual(['inv-1', 'rem-1']);
    expect(state.campaigns[1].status).toEqual(SmsCampaignStatus.CANCELLED);
    expect(state.loaders.cancellingCampaignId).toBeNull();
  });

  it('stops the row loader when cancelling fails', () => {
    const state = smsCampaignsReducer(
      {
        ...initialState,
        loaders: { ...initialState.loaders, cancellingCampaignId: 'rem-1' },
      },
      cancelSmsCampaignError(['CAMPAIGN_NOT_CANCELLABLE']),
    );

    expect(state.cancelErrorCodes).toEqual(['CAMPAIGN_NOT_CANCELLABLE']);
    expect(state.loaders.cancellingCampaignId).toBeNull();
  });

  it('flags a failed meta fetch so the compose view can offer a retry', () => {
    const loading = smsCampaignsReducer(
      initialState,
      fetchSmsCampaignsMetaRequest('intervention-1'),
    );
    expect(loading.loaders.fetchingMeta).toBe(true);
    expect(loading.metaError).toBe(false);

    const failed = smsCampaignsReducer(
      loading,
      // @ts-ignore — only the shape the reducer ignores matters here
      fetchSmsCampaignsMetaError({}),
    );
    expect(failed.loaders.fetchingMeta).toBe(false);
    expect(failed.metaError).toBe(true);
    expect(failed.meta).toBeNull();
  });

  it('clears the meta error once a retry succeeds', () => {
    const meta = { maxBodyLength: 320 } as any;

    const retrying = smsCampaignsReducer(
      { ...initialState, metaError: true },
      fetchSmsCampaignsMetaRequest('intervention-1'),
    );
    expect(retrying.metaError).toBe(false);

    const state = smsCampaignsReducer(
      retrying,
      fetchSmsCampaignsMetaSuccess(meta),
    );
    expect(state.metaError).toBe(false);
    expect(state.meta).toBe(meta);
  });

  it('clears every error bucket at once', () => {
    const dirty = {
      ...initialState,
      metaError: true,
      createErrorCodes: ['RATE_LIMITED'],
      createRetryAfter: 90,
      cancelErrorCodes: ['CAMPAIGN_NOT_CANCELLABLE'],
      campaigns: [campaign()],
    };

    const state = smsCampaignsReducer(dirty, clearSmsCampaignErrors());

    expect(state.createErrorCodes).toEqual([]);
    expect(state.createRetryAfter).toBeNull();
    expect(state.cancelErrorCodes).toEqual([]);
    expect(state.metaError).toBe(false);
    expect(state.campaigns).toHaveLength(1);
  });
});
