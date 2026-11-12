import { PredefinedParticipant } from 'models/PredefinedParticipant';
import { SmsCampaignComposableKind, SmsCampaignKind } from 'models/SmsCampaign';

/** `PredefinedParticipants::SmsRecipientsQuery::REMINDER_INTERVAL`. */
export const MANUAL_REMINDER_INTERVAL_HOURS = 24;

const MILLISECONDS_PER_HOUR = 60 * 60 * 1000;

export const countSmsCampaignRecipients = (
  participants: PredefinedParticipant[],
  kind: SmsCampaignComposableKind,
): number => {
  const cooldownCutoff =
    Date.now() - MANUAL_REMINDER_INTERVAL_HOURS * MILLISECONDS_PER_HOUR;

  const isEligible =
    kind === SmsCampaignKind.INVITATION
      ? // `invitation_scope`: never invited over SMS.
        ({ smsInvitationSentAt }: PredefinedParticipant) => !smsInvitationSentAt
      : // `manual_reminder_scope`: invited, and past the 24 h cooldown.
        ({ smsInvitationSentAt, lastReminderSentAt }: PredefinedParticipant) =>
          !!smsInvitationSentAt &&
          (!lastReminderSentAt ||
            Date.parse(lastReminderSentAt) <= cooldownCutoff);

  return participants.filter(
    (participant) =>
      participant.active &&
      !!participant.phone?.number &&
      isEligible(participant),
  ).length;
};
