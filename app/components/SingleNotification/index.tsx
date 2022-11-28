import React from 'react';

import { Notification, NotificationEvent } from 'models/Notification';

import { NewConversationNotificationLayout } from './components';
import { NotificationLayoutCommonProps } from './types';
import { ConversationTranscriptReadyNotificationLayout } from './components/ConversationTranscriptReadyNotificationLayout';
import { InterventionConversationsTranscriptReadyNotificationLayout } from './components/InterventionConversationsTranscriptReadyNotificationLayout';

type Props = {
  notification: Notification;
} & NotificationLayoutCommonProps;

const SingleNotification = ({ notification, ...commonProps }: Props) => {
  const { event } = notification;

  switch (event) {
    case NotificationEvent.NEW_CONVERSATION:
      return (
        <NewConversationNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.CONVERSATION_TRANSCRIPT_READY:
      return (
        <ConversationTranscriptReadyNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.INTERVENTION_CONVERSATIONS_TRANSCRIPT_READY:
      return (
        <InterventionConversationsTranscriptReadyNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    default:
      return null;
  }
};

export default SingleNotification;
