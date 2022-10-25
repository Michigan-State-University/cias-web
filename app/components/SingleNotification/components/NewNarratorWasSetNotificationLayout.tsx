import React, { useContext } from 'react';
import { useIntl } from 'react-intl';

import { themeColors } from 'theme';
import CheckCircle from 'assets/svg/check-circle.svg';

import { NewNarratorWasSetNotification } from 'models/Notification';

import { CustomDayjsLocale } from 'utils/dayjs';
import { NotificationsActionsContext } from 'utils/useNotificationChannel';

import SingleNotificationBaseLayout, {
  Props as SingleNotificationBaseLayoutProps,
} from 'components/SingleNotificationBaseLayout';
import Icon from 'components/Icon';

import messages from '../messages';

type Props = {
  notification: NewNarratorWasSetNotification;
  timeFormatLocale: CustomDayjsLocale;
};

export const NewNarratorWasSetNotificationLayout = ({
  notification: { createdAt, data, id },
  timeFormatLocale,
}: Props) => {
  const { formatMessage } = useIntl();

  const { readNotification } = useContext(NotificationsActionsContext) ?? {};

  const { name } = data;

  const handleClick: SingleNotificationBaseLayoutProps['onClick'] = (event) => {
    event.stopPropagation();
    if (readNotification) {
      readNotification({ notificationId: id });
    }
  };

  // workaround for markup not working with react-intl values in styled tags
  const content = `${formatMessage(
    messages.newNarratorWasSetContentBeforeName,
  )} <span style='color: ${
    themeColors.secondary
  }; font-weight: 700'> ${name} </span> ${formatMessage(
    messages.newNarratorWasSetContentAfterName,
  )}`;

  return (
    <SingleNotificationBaseLayout
      id={id}
      active
      highlighted
      time={createdAt}
      timeFormatLocale={timeFormatLocale}
      icon={<Icon src={CheckCircle} />}
      title={formatMessage(messages.newNarratorWasSetTitle)}
      content={content}
      isHtmlContent
      onClick={handleClick}
    />
  );
};
