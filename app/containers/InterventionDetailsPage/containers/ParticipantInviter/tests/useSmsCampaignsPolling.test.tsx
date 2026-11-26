/**
 * The campaign endpoints answer 403 to anyone without edit access to the
 * intervention, and `utils/axios` turns any GET 403 into a redirect to
 * `/no-access`. So `enabled` is not an optimisation: every request this hook
 * makes has to be behind it, the interval included, or a user who merely
 * opened the invite modal is thrown out of the page they were on.
 */
import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { combineReducers, createStore } from 'redux';
import { act, renderHook } from '@testing-library/react-hooks';

import {
  SmsCampaign,
  SmsCampaignKind,
  SmsCampaignStatus,
} from 'models/SmsCampaign';

import { FETCH_PREDEFINED_PARTICIPANTS_REQUEST } from 'global/reducers/intervention/constants';
import {
  SMS_CAMPAIGNS_POLLING_INTERVAL,
  fetchSmsCampaignsRequest,
  fetchSmsCampaignsSuccess,
  smsCampaignsReducer,
} from 'global/reducers/smsCampaigns';

import { useSmsCampaignsPolling } from '../useSmsCampaignsPolling';

const INTERVENTION_ID = 'intervention-1';

const campaign = (overrides: Partial<SmsCampaign> = {}): SmsCampaign => ({
  id: 'campaign-1',
  kind: SmsCampaignKind.INVITATION,
  status: SmsCampaignStatus.SENDING,
  scheduledAt: null,
  sentAt: null,
  acceptedCount: 0,
  failedCount: 0,
  recipientsCount: 2,
  scheduledAtProvisional: false,
  body: 'Campaign body',
  links: [],
  ...overrides,
});

const IN_PROGRESS = campaign();
const SETTLED = campaign({ id: 'campaign-2', status: SmsCampaignStatus.SENT });

// A real reducer, so moving a campaign from sending to sent really changes
// what the hook's selector sees.
const makeStore = () => {
  const store = createStore(
    combineReducers({ smsCampaigns: smsCampaignsReducer }) as any,
  );
  jest.spyOn(store, 'dispatch');
  return store;
};

const seed = (store: any, campaigns: SmsCampaign[]) => {
  act(() => {
    store.dispatch(fetchSmsCampaignsSuccess(campaigns));
  });
  (store.dispatch as jest.Mock).mockClear();
};

const dispatchedOfType = (store: any, type: string) =>
  (store.dispatch as jest.Mock).mock.calls
    .map(([action]: [any]) => action)
    .filter((action: any) => action?.type === type);

const campaignFetches = (store: any) =>
  dispatchedOfType(store, fetchSmsCampaignsRequest.toString());

// A plain action creator, not a typesafe-actions one - `toString()` on it
// returns the function source, which would silently match nothing.
const participantFetches = (store: any) =>
  dispatchedOfType(store, FETCH_PREDEFINED_PARTICIPANTS_REQUEST);

type PollingProps = { enabled: boolean };

const renderPolling = (store: any, enabled: boolean) => {
  // Typed on `PollingProps` so `rerender` takes them; `FC` adds `children`.
  const wrapper: FC<PollingProps> = ({ children }) => (
    <Provider store={store}>{children}</Provider>
  );

  return renderHook<PollingProps, void>(
    ({ enabled: isEnabled }) =>
      useSmsCampaignsPolling(INTERVENTION_ID, isEnabled),
    { initialProps: { enabled }, wrapper },
  );
};

const tick = (times = 1) =>
  act(() => {
    jest.advanceTimersByTime(SMS_CAMPAIGNS_POLLING_INTERVAL * times);
  });

describe('useSmsCampaignsPolling', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
    jest.restoreAllMocks();
  });

  describe('while disabled', () => {
    it('does not fetch the campaigns at all', () => {
      const store = makeStore();

      renderPolling(store, false);

      expect(campaignFetches(store)).toHaveLength(0);
    });

    it('does not poll, even with a campaign left in progress in the store', () => {
      const store = makeStore();
      seed(store, [IN_PROGRESS]);

      renderPolling(store, false);
      tick(3);

      expect(campaignFetches(store)).toHaveLength(0);
    });

    it('does not refetch the participants when a campaign settles', () => {
      const store = makeStore();
      seed(store, [IN_PROGRESS]);

      renderPolling(store, false);
      act(() => {
        store.dispatch(fetchSmsCampaignsSuccess([SETTLED]));
      });

      expect(participantFetches(store)).toHaveLength(0);
    });
  });

  describe('while enabled', () => {
    it('fetches the campaigns once on mount', () => {
      const store = makeStore();

      renderPolling(store, true);

      expect(campaignFetches(store)).toHaveLength(1);
      expect(campaignFetches(store)[0].payload).toMatchObject({
        interventionId: INTERVENTION_ID,
        silent: false,
      });
    });

    it('does not start the interval when nothing is in progress', () => {
      const store = makeStore();
      seed(store, [SETTLED]);

      renderPolling(store, true);
      tick(3);

      expect(campaignFetches(store)).toHaveLength(1);
    });

    it('polls silently while a campaign is in progress', () => {
      const store = makeStore();
      seed(store, [IN_PROGRESS]);

      renderPolling(store, true);
      tick(2);

      // The mount fetch plus one per tick.
      expect(campaignFetches(store)).toHaveLength(3);
      expect(campaignFetches(store)[1].payload).toMatchObject({
        silent: true,
      });
    });

    // A finished campaign changes the participants themselves - their
    // invitation timestamps decide who a reminder may still go to.
    it('refetches the participants when a campaign settles', () => {
      const store = makeStore();
      seed(store, [IN_PROGRESS]);

      renderPolling(store, true);
      act(() => {
        store.dispatch(fetchSmsCampaignsSuccess([SETTLED]));
      });

      expect(participantFetches(store)).toHaveLength(1);
    });
  });

  describe('when the gate closes mid-campaign', () => {
    it('stops polling', () => {
      const store = makeStore();
      seed(store, [IN_PROGRESS]);

      const { rerender } = renderPolling(store, true);
      tick(1);
      const whileOpen = campaignFetches(store).length;

      rerender({ enabled: false });
      tick(3);

      expect(campaignFetches(store)).toHaveLength(whileOpen);
    });

    it('does not mistake the closing for a campaign that settled', () => {
      const store = makeStore();
      seed(store, [IN_PROGRESS]);

      const { rerender } = renderPolling(store, true);
      rerender({ enabled: false });

      expect(participantFetches(store)).toHaveLength(0);
    });
  });
});
