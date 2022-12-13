import React from 'react';
import { useIntl } from 'react-intl';

import { InterventionConversationsTranscriptReadyNotification } from 'models/Notification';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: InterventionConversationsTranscriptReadyNotification;
}>;

export const InterventionConversationsTranscriptReadyNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName, interventionId } = notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.transcriptIsReady)}
      content={formatMessage(
        messages.interventionConversationsTranscriptReadyContent,
        {
          interventionName,
        },
      )}
      linkTo={`/interventions/${interventionId}`}
      readOnClick
      {...props}
    />
  );
};
