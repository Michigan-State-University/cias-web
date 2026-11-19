import {
  isScheduledReminderErrorCode,
  stripScheduledReminderPrefix,
} from '../smsCampaignErrorCodeMessages';

describe('scheduled reminder error codes', () => {
  it('recognises a prefixed validation code', () => {
    expect(isScheduledReminderErrorCode('SCHEDULED_REMINDER_BODY_BLANK')).toBe(
      true,
    );
    expect(
      isScheduledReminderErrorCode('SCHEDULED_REMINDER_INVALID_DAYS_AFTER'),
    ).toBe(true);
  });

  it('leaves an unprefixed code alone', () => {
    expect(isScheduledReminderErrorCode('BODY_BLANK')).toBe(false);
    expect(isScheduledReminderErrorCode('RATE_LIMITED')).toBe(false);
  });

  it('treats SCHEDULED_REMINDER_NOT_ALLOWED as a campaign-level error', () => {
    // It is about the campaign as a whole ("a reminder cannot carry a
    // reminder"), not a field of the reminder section, so it must NOT be
    // routed there or it would read as "Scheduled reminder: NOT_ALLOWED".
    expect(isScheduledReminderErrorCode('SCHEDULED_REMINDER_NOT_ALLOWED')).toBe(
      false,
    );
    expect(stripScheduledReminderPrefix('SCHEDULED_REMINDER_NOT_ALLOWED')).toBe(
      'SCHEDULED_REMINDER_NOT_ALLOWED',
    );
  });

  it('strips the prefix so the shared message map can be reused', () => {
    expect(stripScheduledReminderPrefix('SCHEDULED_REMINDER_BODY_BLANK')).toBe(
      'BODY_BLANK',
    );
    expect(stripScheduledReminderPrefix('BODY_BLANK')).toBe('BODY_BLANK');
  });
});
