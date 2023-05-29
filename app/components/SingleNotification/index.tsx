import React from 'react';

import { Notification, NotificationEvent } from 'models/Notification';

import {
  ConversationTranscriptReadyNotificationLayout,
  InterventionConversationsTranscriptReadyNotificationLayout,
  NewConversationNotificationLayout,
  NewNarratorWasSetNotificationLayout,
  SuccessfullyRestoredInterventionNotificationLayout,
  UnsuccessfulImportNotificationLayout,
  NewCollaboratorAddedNotificationLayout,
} from './components';
import { NotificationLayoutCommonProps } from './types';

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
    case NotificationEvent.SUCCESSFULLY_RESTORED_INTERVENTION:
      return (
        <SuccessfullyRestoredInterventionNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.UNSUCCESSFUL_INTERVENTION_IMPORT:
      return (
        <UnsuccessfulImportNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.NEW_NARRATOR_WAS_SET:
      return (
        <NewNarratorWasSetNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.NEW_COLLABORATOR_ADDED:
      return (
        <NewCollaboratorAddedNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    default:
      return null;
  }
};

export default SingleNotification;
