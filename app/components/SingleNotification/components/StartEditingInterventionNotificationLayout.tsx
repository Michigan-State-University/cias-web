import React from 'react';
import { useIntl } from 'react-intl';

import EditCircle from 'assets/svg/edit-circle.svg';

import { StartEditingInterventionNotification } from 'models/Notification';

import Icon from 'components/Icon';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: StartEditingInterventionNotification;
}>;

export const StartEditingInterventionNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName, firstName, lastName } = notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.startEditingInterventionTitle)}
      content={formatMessage(messages.startEditingInterventionContent, {
        firstName,
        lastName,
        interventionName,
      })}
      readOnClick
      icon={<Icon src={EditCircle} />}
      {...props}
    />
  );
};
