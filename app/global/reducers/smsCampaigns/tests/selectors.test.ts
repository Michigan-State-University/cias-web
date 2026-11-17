/**
 * What counts as a campaign still on its way.
 *
 * The API stamps an immediate campaign with server time, so the one thing
 * these selectors must not do is decide it from the browser clock: a machine
 * running a few seconds behind would read a just-sent campaign as pending,
 * nothing would poll it out of that state, and the row would sit on
 * "Scheduled" until the researcher navigated away.
 */
import {
  SmsCampaign,
  SmsCampaignKind,
  SmsCampaignStatus,
} from 'models/SmsCampaign';

import { RootState } from 'global/reducers';

import { initialState } from '../reducer';
import {
  makeSelectHasSmsCampaignsInProgress,
  makeSelectLatestSmsCampaign,
} from '../selectors';

const campaign = (overrides: Partial<SmsCampaign> = {}): SmsCampaign => ({
  id: 'campaign-1',
  kind: SmsCampaignKind.INVITATION,
  status: SmsCampaignStatus.SCHEDULED,
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

const minutesFromNow = (minutes: number) =>
  new Date(Date.now() + minutes * 60 * 1000).toISOString();

const stateWith = (campaigns: SmsCampaign[]) =>
  ({ smsCampaigns: { ...initialState, campaigns } }) as unknown as RootState;

const hasInProgress = (campaigns: SmsCampaign[]) =>
  makeSelectHasSmsCampaignsInProgress()(stateWith(campaigns));

describe('makeSelectHasSmsCampaignsInProgress', () => {
  describe('an immediate campaign', () => {
    // The POST answers with `scheduled_at: Time.current`, so a client clock
    // running behind sees a date in its own future for a campaign the server
    // has already started.
    it.each([SmsCampaignKind.INVITATION, SmsCampaignKind.MANUAL_REMINDER])(
      'is in progress even when its date reads as future (%s)',
      (kind) => {
        expect(
          hasInProgress([campaign({ kind, scheduledAt: minutesFromNow(10) })]),
        ).toBe(true);
      },
    );

    it('is in progress while sending', () => {
      expect(
        hasInProgress([campaign({ status: SmsCampaignStatus.SENDING })]),
      ).toBe(true);
    });
  });

  describe('a scheduled reminder', () => {
    const reminder = (overrides: Partial<SmsCampaign> = {}) =>
      campaign({ kind: SmsCampaignKind.SCHEDULED_REMINDER, ...overrides });

    it('is not in progress until its date has passed', () => {
      expect(
        hasInProgress([reminder({ scheduledAt: minutesFromNow(10) })]),
      ).toBe(false);
    });

    it('is in progress once its date has passed', () => {
      expect(
        hasInProgress([reminder({ scheduledAt: minutesFromNow(-10) })]),
      ).toBe(true);
    });

    it('is in progress without a date at all', () => {
      expect(hasInProgress([reminder({ scheduledAt: null })])).toBe(true);
    });

    // Only `scheduled` waits for the clock - once the backend moves it on,
    // the date it was waiting for says nothing any more.
    it('is in progress while sending, whatever its date says', () => {
      expect(
        hasInProgress([
          reminder({
            status: SmsCampaignStatus.SENDING,
            scheduledAt: minutesFromNow(10),
          }),
        ]),
      ).toBe(true);
    });
  });

  it.each([
    SmsCampaignStatus.SENT,
    SmsCampaignStatus.FAILED,
    SmsCampaignStatus.CANCELLED,
    SmsCampaignStatus.SKIPPED,
  ])('is not in progress once settled (%s)', (status) => {
    expect(hasInProgress([campaign({ status })])).toBe(false);
  });

  it('is false for an empty list', () => {
    expect(hasInProgress([])).toBe(false);
  });
});

describe('makeSelectLatestSmsCampaign', () => {
  it('prefers an open campaign over a more recent settled one', () => {
    const settled = campaign({
      id: 'newer',
      status: SmsCampaignStatus.SENT,
    });
    const open = campaign({ id: 'older', status: SmsCampaignStatus.SENDING });

    const { latest, inProgress } = makeSelectLatestSmsCampaign()(
      // The list arrives newest-first.
      stateWith([settled, open]),
    );

    expect(latest).toBe(open);
    expect(inProgress).toBe(true);
  });

  it('falls back to the newest campaign when none is open', () => {
    const newest = campaign({ id: 'newer', status: SmsCampaignStatus.SENT });
    const older = campaign({ id: 'older', status: SmsCampaignStatus.FAILED });

    const { latest, inProgress } = makeSelectLatestSmsCampaign()(
      stateWith([newest, older]),
    );

    expect(latest).toBe(newest);
    expect(inProgress).toBe(false);
  });
});
