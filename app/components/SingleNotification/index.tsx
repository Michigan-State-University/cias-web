import React from 'react';

import { Notification } from 'models/Notification';

import { CustomDayjsLocale } from 'utils/dayjs';

import { ConversationInfoBox } from 'components/ConversationInfoBox';

export type Props = {
  notification: Notification;
  timeFormatLocale: CustomDayjsLocale;
};

const SingleNotification = ({
  notification: { createdAt, isRead, data },
  timeFormatLocale,
}: Props) => {
  const { message } = data;

  return (
    <ConversationInfoBox
      highlighted={!isRead}
      unread={!isRead}
      messageCreatedAt={createdAt}
      messageContent={message}
      messageSentByCurrentUser={false}
      interlocutorData={data}
      timeFormatLocale={timeFormatLocale}
    />
  );
};

export default SingleNotification;
