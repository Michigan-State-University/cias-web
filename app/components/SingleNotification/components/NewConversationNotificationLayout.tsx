import React from 'react';

import { NewConversationNotification } from 'models/Notification';

import { RoutePath } from 'global/constants';

import GhostLink from 'components/GhostLink';
import { ConversationInfoBox } from 'components/ConversationInfoBox';

import { NotificationLayoutProps } from '../types';

type Props = NotificationLayoutProps<{
  notification: NewConversationNotification;
}>;

export const NewConversationNotificationLayout = ({
  notification: { createdAt, data, id },
  timeFormatLocale,
  ...props
}: Props) => {
  const { message, conversationId } = data;

  return (
    <GhostLink to={`${RoutePath.INBOX}?conversation_id=${conversationId}`}>
      <ConversationInfoBox
        id={id}
        active
        highlighted
        time={createdAt}
        timeFormatLocale={timeFormatLocale}
        messageContent={message}
        messageSentByCurrentUser={false}
        interlocutorData={data}
        {...props}
      />
    </GhostLink>
  );
};
