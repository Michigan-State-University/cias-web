import React from 'react';
import { useIntl } from 'react-intl';

import CollaborateCircle from 'assets/svg/collaborate-circle.svg';

import { themeColors } from 'theme';

import { CollaboratorRemovedNotification } from 'models/Notification';

import Icon from 'components/Icon';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: CollaboratorRemovedNotification;
}>;

export const CollaboratorRemovedNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName } = notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.collaboratorRemovedTitle)}
      content={formatMessage(messages.collaboratorRemovedContent, {
        interventionName,
      })}
      readOnClick
      icon={<Icon src={CollaborateCircle} fill={themeColors.alert} />}
      {...props}
    />
  );
};
