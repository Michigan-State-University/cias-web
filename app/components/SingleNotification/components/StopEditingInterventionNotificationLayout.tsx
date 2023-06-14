import React from 'react';
import { useIntl } from 'react-intl';

import EditCircle from 'assets/svg/edit-circle.svg';

import { StopEditingInterventionNotification } from 'models/Notification';

import Icon from 'components/Icon';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: StopEditingInterventionNotification;
}>;

export const StopEditingInterventionNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName, firstName, lastName, interventionId } =
    notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.stopEditingInterventionTitle)}
      content={formatMessage(messages.stopEditingInterventionContent, {
        firstName,
        lastName,
        interventionName,
      })}
      linkTo={`/interventions/${interventionId}`}
      readOnClick
      icon={<Icon src={EditCircle} />}
      {...props}
    />
  );
};
