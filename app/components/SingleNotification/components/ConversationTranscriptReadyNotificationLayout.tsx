import React from 'react';
import { useIntl } from 'react-intl';

import { ConversationTranscriptReadyNotification } from 'models/Notification';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: ConversationTranscriptReadyNotification;
}>;

export const ConversationTranscriptReadyNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName, conversationId, archived } = notification.data;

  const redirectLink = archived
    ? `/live-chat/archive?conversation_id=${conversationId}`
    : `/live-chat?conversation_id=${conversationId}`;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.transcriptIsReady)}
      content={formatMessage(messages.conversationTranscriptReadyContent, {
        interventionName,
      })}
      linkTo={redirectLink}
      readOnClick
      {...props}
    />
  );
};
