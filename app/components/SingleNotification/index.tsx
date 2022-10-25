import React from 'react';

import { Notification, NotificationEvent } from 'models/Notification';

import { CustomDayjsLocale } from 'utils/dayjs';

import {
  NewConversationNotificationLayout,
  NewNarratorWasSetNotificationLayout,
} from './components';

type Props = {
  notification: Notification;
  timeFormatLocale: CustomDayjsLocale;
};

const SingleNotification = ({ notification, timeFormatLocale }: Props) => {
  const { event } = notification;

  switch (event) {
    case NotificationEvent.NEW_CONVERSATION:
      return (
        <NewConversationNotificationLayout
          notification={notification}
          timeFormatLocale={timeFormatLocale}
        />
      );
    case NotificationEvent.NEW_NARRATOR_WAS_SET:
      return (
        <NewNarratorWasSetNotificationLayout
          notification={notification}
          timeFormatLocale={timeFormatLocale}
        />
      );
    default:
      return null;
  }
};

export default SingleNotification;
