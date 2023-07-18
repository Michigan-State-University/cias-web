import React from 'react';
import { useIntl } from 'react-intl';

import { NewNarratorWasSetNotification } from 'models/Notification';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: NewNarratorWasSetNotification;
}>;

export const NewNarratorWasSetNotificationLayout = ({
  notification,
  ...props
}: Props) => {
  const { formatMessage } = useIntl();

  const { name: interventionName } = notification.data;

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      title={formatMessage(messages.newNarratorWasSetTitle)}
      content={formatMessage(messages.newNarratorWasSetContent, {
        interventionName,
      })}
      readOnClick
      {...props}
    />
  );
};
