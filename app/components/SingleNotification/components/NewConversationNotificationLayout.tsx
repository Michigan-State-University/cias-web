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
  notification: { createdAt, data, id },
  timeFormatLocale,
}: Props) => {
  const { message, conversationId } = data;

  return (
    <GhostLink to={`/live-chat?conversation_id=${conversationId}`}>
      <ConversationInfoBox
        id={id}
        active
        highlighted
        time={createdAt}
        timeFormatLocale={timeFormatLocale}
        messageContent={message}
        messageSentByCurrentUser={false}
        interlocutorData={data}
      />
    </GhostLink>
  );
};
