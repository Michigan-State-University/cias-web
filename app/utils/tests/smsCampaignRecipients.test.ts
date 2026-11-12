import { SmsCampaignKind } from 'models/SmsCampaign';

import {
  countSmsCampaignRecipients,
  MANUAL_REMINDER_INTERVAL_HOURS,
} from '../smsCampaignRecipients';

const INVITED_AT = '2026-10-30T12:00:00.000Z';

const hoursAgo = (hours: number) =>
  new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();

const participant = (overrides = {}) =>
  ({
    id: 'pp',
    active: true,
    phone: { iso: 'US', prefix: '+1', number: '5551234567' },
    smsInvitationSentAt: null,
    lastReminderSentAt: null,
    ...overrides,
  }) as any;

describe('countSmsCampaignRecipients', () => {
  it('counts only active, reachable, not yet invited participants for an invitation', () => {
    const participants = [
      participant({ id: 'fresh' }),
      participant({ id: 'invited', smsInvitationSentAt: INVITED_AT }),
      participant({ id: 'inactive', active: false }),
      participant({ id: 'no-phone', phone: null }),
      participant({ id: 'blank-phone', phone: { number: '' } }),
    ];

    expect(
      countSmsCampaignRecipients(participants, SmsCampaignKind.INVITATION),
    ).toBe(1);
  });

  it('counts invited participants past the reminder cooldown for a manual reminder', () => {
    const participants = [
      participant({ id: 'never-reminded', smsInvitationSentAt: INVITED_AT }),
      participant({
        id: 'reminded-long-ago',
        smsInvitationSentAt: INVITED_AT,
        lastReminderSentAt: hoursAgo(MANUAL_REMINDER_INTERVAL_HOURS + 1),
      }),
      participant({
        id: 'still-in-cooldown',
        smsInvitationSentAt: INVITED_AT,
        lastReminderSentAt: hoursAgo(MANUAL_REMINDER_INTERVAL_HOURS - 1),
      }),
      // Never invited, so there is nothing to remind them of.
      participant({ id: 'not-invited' }),
    ];

    expect(
      countSmsCampaignRecipients(participants, SmsCampaignKind.MANUAL_REMINDER),
    ).toBe(2);
  });

  it('counts nothing in an empty list', () => {
    expect(countSmsCampaignRecipients([], SmsCampaignKind.INVITATION)).toBe(0);
  });
});
