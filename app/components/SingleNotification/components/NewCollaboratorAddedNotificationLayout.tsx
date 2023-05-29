import React from 'react';
import { useIntl } from 'react-intl';

import CollaborateCircle from 'assets/svg/collaborate-circle.svg';

import { NewCollaboratorAddedNotification } from 'models/Notification';

import Icon from 'components/Icon';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: NewCollaboratorAddedNotification;
}>;

export const NewCollaboratorAddedNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { interventionName, interventionId } = notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.newCollaboratorAddedTitle)}
      content={formatMessage(messages.newCollaboratorAddedContent, {
        interventionName,
      })}
      linkTo={`/interventions/${interventionId}`}
      readOnClick
      icon={<Icon src={CollaborateCircle} />}
      {...props}
    />
  );
};
