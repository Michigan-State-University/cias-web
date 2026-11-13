import React, { useMemo } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';

import { PredefinedParticipant } from 'models/PredefinedParticipant';

import Text from 'components/Text';

import messages from './messages';
import { formatTimestamp } from './utils';

export type Props = {
  participant: PredefinedParticipant;
};

export const SentInvitationsInfo = ({
  participant: { smsInvitationSentAt, emailInvitationSentAt, firstOpenedAt },
}: Props) => {
  const { formatMessage } = useIntl();

  const formattedSmsInvitationSentAt = formatTimestamp(smsInvitationSentAt);

  const formattedEmailInvitationSentAt = formatTimestamp(emailInvitationSentAt);

  const formattedFirstOpenedAt = formatTimestamp(firstOpenedAt);

  const sentInvitationsMessage = useMemo(() => {
    if (formattedSmsInvitationSentAt && formattedEmailInvitationSentAt) {
      return formatMessage(
        messages.predefinedParticipantSmsAndEmailInvitationSent,
        {
          smsDate: formattedSmsInvitationSentAt,
          emailDate: formattedEmailInvitationSentAt,
        },
      );
    }

    if (formattedSmsInvitationSentAt) {
      return formatMessage(messages.predefinedParticipantSmsInvitationSent, {
        smsDate: formattedSmsInvitationSentAt,
      });
    }

    if (formattedEmailInvitationSentAt) {
      return formatMessage(messages.predefinedParticipantEmailInvitationSent, {
        emailDate: formattedEmailInvitationSentAt,
      });
    }

    return formatMessage(messages.predefinedParticipantInvitationNotSent);
  }, [formattedSmsInvitationSentAt, formattedEmailInvitationSentAt]);

  return (
    <>
      <Text fontWeight="bold" lineHeight={1.2}>
        {formatMessage(messages.predefinedParticipantInvitationLabel)}
      </Text>
      <Text
        lineHeight={1.2}
        color={themeColors.text}
        textOpacity={
          formattedSmsInvitationSentAt || formattedEmailInvitationSentAt
            ? 1
            : 0.7
        }
        mt={8}
      >
        {sentInvitationsMessage}
      </Text>

      <Text fontWeight="bold" lineHeight={1.2} mt={16}>
        {formatMessage(messages.predefinedParticipantLinkOpenedLabel)}
      </Text>
      <Text
        lineHeight={1.2}
        color={themeColors.text}
        textOpacity={formattedFirstOpenedAt ? 1 : 0.7}
        mt={8}
        data-cy="predefined-participant-link-opened"
      >
        {formattedFirstOpenedAt ??
          formatMessage(messages.predefinedParticipantLinkNotOpened)}
      </Text>
    </>
  );
};
