import React from 'react';

import { NewConversationNotification } from 'models/Notification';

import { CustomDayjsLocale } from 'utils/dayjs';

import GhostLink from 'components/GhostLink';
import { ConversationInfoBox } from 'components/ConversationInfoBox';

type Props = {
  notification: NewConversationNotification;
  timeFormatLocale: CustomDayjsLocale;
};

export const NewConversationNotificationLayout = ({
  notification: { createdAt, isRead, data },
  timeFormatLocale,
}: Props) => {
  const { message, conversationId } = data;

  return (
    <GhostLink to={`/live-chat?conversation_id=${conversationId}`}>
      <ConversationInfoBox
        highlighted={!isRead}
        unread={!isRead}
        messageCreatedAt={createdAt}
        messageContent={message}
        messageSentByCurrentUser={false}
        interlocutorData={data}
        timeFormatLocale={timeFormatLocale}
      />
    </GhostLink>
  );
};
