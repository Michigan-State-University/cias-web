import React, { useContext } from 'react';
import CheckCircle from 'assets/svg/check-circle.svg';

import { Notification } from 'models/Notification';

import { NotificationChannelContext } from 'utils/useNotificationChannel';

import InfoBox, { Props as InfoBoxProps } from 'components/InfoBox';
import Icon from 'components/Icon';
import GhostLink from 'components/GhostLink';
import ConditionalWrapper from 'components/ConditionalWrapper';

import { NotificationLayoutProps } from '../types';

type Props = NotificationLayoutProps<{
  notification: Notification;
  title: string;
  content: string;
  linkTo?: string;
  readOnClick?: boolean;
  icon?: React.ReactNode;
}>;

export const SingleNotificationBaseLayout = ({
  notification: { createdAt, id },
  linkTo,
  readOnClick,
  icon = <Icon src={CheckCircle} />,
  ...props
}: Props) => {
  const { readNotification } = useContext(NotificationChannelContext) ?? {};

  const redirectOnClick = !!linkTo;

  const handleClick: InfoBoxProps['onClick'] = (event) => {
    if (readOnClick && readNotification) {
      if (!redirectOnClick) {
        event.stopPropagation();
      }

      readNotification({ notificationId: id });
    }
  };

  return (
    <ConditionalWrapper
      if={redirectOnClick}
      with={GhostLink}
      wrapperProps={{ to: linkTo }}
    >
      <InfoBox
        id={id}
        active
        highlighted
        time={createdAt}
        onClick={handleClick}
        icon={icon}
        {...props}
      />
    </ConditionalWrapper>
  );
};
