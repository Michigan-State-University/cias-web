import React from 'react';
import { useIntl } from 'react-intl';

import { UnsuccessfulImportNotification } from 'models/Notification';
import Cross from 'assets/svg/cross-alert.svg';

import Icon from 'components/Icon';

import messages from '../messages';
import { NotificationLayoutProps } from '../types';
import { SingleNotificationBaseLayout } from './SingleNotificationBaseLayout';

type Props = NotificationLayoutProps<{
  notification: UnsuccessfulImportNotification;
}>;

export const UnsuccessfulImportNotificationLayout = ({
  notification,
  timeFormatLocale,
}: Props) => {
  const { formatMessage } = useIntl();

  return (
    <SingleNotificationBaseLayout
      notification={notification}
      timeFormatLocale={timeFormatLocale}
      title={formatMessage(messages.importFailedNotificationTitle)}
      content={formatMessage(messages.importFailedNotificationContent)}
      icon={<Icon src={Cross} width={36} height={36} />}
      readOnClick
    />
  );
};
