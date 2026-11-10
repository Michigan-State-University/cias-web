import React, { FC } from 'react';
import { useIntl } from 'react-intl';

import { ErrorList } from './ErrorList';
import messages from './messages';
import smsCampaignErrorCodeMessages, {
  isScheduledReminderErrorCode,
  stripScheduledReminderPrefix,
} from './smsCampaignErrorCodeMessages';

export type Props = {
  errorCodes: string[];
  /** Seconds from a 429 `Retry-After`, shown alongside RATE_LIMITED. */
  retryAfter?: Nullable<number>;
};

export const SmsCampaignErrorList: FC<Props> = ({ errorCodes, retryAfter }) => {
  const { formatMessage } = useIntl();

  if (!errorCodes.length) return null;

  const formatCode = (code: string): string => {
    const baseCode = stripScheduledReminderPrefix(code);
    const descriptor =
      smsCampaignErrorCodeMessages[baseCode] ??
      smsCampaignErrorCodeMessages.unknown;
    const text = formatMessage(descriptor, { code });

    if (code === 'RATE_LIMITED' && retryAfter) {
      return `${text} ${formatMessage(messages.smsCampaignRetryAfter, {
        seconds: retryAfter,
      })}`;
    }

    if (isScheduledReminderErrorCode(code)) {
      return formatMessage(messages.smsCampaignScheduledReminderErrorPrefix, {
        error: text,
      });
    }

    return text;
  };

  return (
    <ErrorList
      dataCy="sms-campaign-error-list"
      header={formatMessage(messages.smsCampaignErrorListHeader)}
      items={errorCodes.map((code) => ({
        key: code,
        text: formatCode(code),
        dataCy: `sms-campaign-error-${code}`,
      }))}
    />
  );
};
