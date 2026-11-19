import { defineMessages, MessageDescriptor } from 'react-intl';

import participantInviterMessages from './messages';

const scope =
  'app.containers.InterventionDetailsPage.containers.ParticipantInviter.smsCampaignErrors';

const messages = defineMessages({
  INVALID_KIND: {
    id: `${scope}.INVALID_KIND`,
    defaultMessage: 'Something went wrong. Please try again.',
  },
  BODY_BLANK: {
    id: `${scope}.BODY_BLANK`,
    defaultMessage: 'Message is required.',
  },
  BODY_FORBIDDEN_CHARACTERS: {
    id: `${scope}.BODY_FORBIDDEN_CHARACTERS`,
    defaultMessage: 'Message contains unsupported characters.',
  },
  BODY_TOO_LONG: {
    id: `${scope}.BODY_TOO_LONG`,
    defaultMessage: 'Message is too long.',
  },
  DUPLICATE_LINK_VARIABLE: {
    id: `${scope}.DUPLICATE_LINK_VARIABLE`,
    defaultMessage: 'Two links use the same variable name.',
  },
  UNKNOWN_LINK_VARIABLE: {
    id: `${scope}.UNKNOWN_LINK_VARIABLE`,
    defaultMessage:
      'The message uses a variable that has no link. Add the link or remove the variable.',
  },
  UNUSED_LINK_VARIABLE: {
    id: `${scope}.UNUSED_LINK_VARIABLE`,
    defaultMessage:
      'A link was added but its variable does not appear in the message.',
  },
  INVALID_LINK_TYPE: {
    id: `${scope}.INVALID_LINK_TYPE`,
    defaultMessage: 'A link has an invalid type.',
  },
  INVALID_LINK: {
    id: `${scope}.INVALID_LINK`,
    defaultMessage:
      'A link address is invalid. It must start with http:// or https://.',
  },
  INVALID_DAYS_AFTER: {
    id: `${scope}.INVALID_DAYS_AFTER`,
    defaultMessage: 'The number of days is outside the allowed range.',
  },
  SCHEDULED_REMINDER_NOT_ALLOWED: {
    id: `${scope}.SCHEDULED_REMINDER_NOT_ALLOWED`,
    defaultMessage: 'A scheduled reminder cannot be added to a reminder.',
  },
  NO_RECIPIENTS: {
    id: `${scope}.NO_RECIPIENTS`,
    defaultMessage: 'No participants to send to.',
  },
  DAILY_SMS_CAP_EXCEEDED: {
    id: `${scope}.DAILY_SMS_CAP_EXCEEDED`,
    defaultMessage: 'Daily SMS limit reached. Please try again tomorrow.',
  },
  CAMPAIGN_IN_PROGRESS: {
    id: `${scope}.CAMPAIGN_IN_PROGRESS`,
    defaultMessage: 'A send is already in progress.',
  },
  CAMPAIGN_NOT_CANCELLABLE: {
    id: `${scope}.CAMPAIGN_NOT_CANCELLABLE`,
    defaultMessage:
      'This reminder can no longer be cancelled. The list has been refreshed.',
  },
  RATE_LIMITED: {
    id: `${scope}.RATE_LIMITED`,
    defaultMessage: 'Too many attempts. Please try again later.',
  },
  HTTP_403: {
    id: `${scope}.HTTP_403`,
    defaultMessage:
      'You are not the current editor of this intervention, so you cannot send SMS messages.',
  },
  HTTP_404: {
    id: `${scope}.HTTP_404`,
    defaultMessage: 'This intervention is no longer available.',
  },
  NETWORK_ERROR: {
    id: `${scope}.NETWORK_ERROR`,
    defaultMessage: 'The server could not be reached. Please try again.',
  },
  unknown: {
    id: `${scope}.unknown`,
    defaultMessage: 'Something went wrong ({code}).',
  },
});

const codeMessages: Record<string, MessageDescriptor> = {
  ...messages,
  // Synthesized by `getApiErrorCodesForDisplay` from `details.reason`.
  NOT_PUBLISHED: participantInviterMessages.smsCampaignNotPublishedError,
  BODY_TOO_MANY_SEGMENTS: messages.BODY_TOO_LONG,
};

const SCHEDULED_REMINDER_ERROR_PREFIX = 'SCHEDULED_REMINDER_';

export const isScheduledReminderErrorCode = (code: string) =>
  code.startsWith(SCHEDULED_REMINDER_ERROR_PREFIX) &&
  code !== 'SCHEDULED_REMINDER_NOT_ALLOWED';

export const stripScheduledReminderPrefix = (code: string) =>
  isScheduledReminderErrorCode(code)
    ? code.slice(SCHEDULED_REMINDER_ERROR_PREFIX.length)
    : code;

export default codeMessages;
