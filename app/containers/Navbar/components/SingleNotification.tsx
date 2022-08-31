import React from 'react';

import { Notification } from 'models/Notification';

import { CustomDayjsLocale } from 'utils/dayjs';

import { ConversationInfoBox } from 'components/ConversationInfoBox';

type Props = {
  notification: Notification;
};

const SingleNotification = ({
  notification: { createdAt, isRead, data },
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
      timeFormatLocale={CustomDayjsLocale.EN_LONG_RELATIVE_TIME}
    />
  );
};

export default SingleNotification;
