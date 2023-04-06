import React from 'react';
import { useIntl } from 'react-intl';

import { SuccessfullyRestoredInterventionNotification } from 'models/Notification';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: SuccessfullyRestoredInterventionNotification;
}>;

export const SuccessfullyRestoredInterventionNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName, interventionId } = notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.successfullyRestoredInterventionTitle)}
      content={formatMessage(messages.successfullyRestoredInterventionContent, {
        interventionName,
      })}
      linkTo={`/interventions/${interventionId}`}
      readOnClick
      {...props}
    />
  );
};
