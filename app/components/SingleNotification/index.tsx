import React from 'react';

import { Notification, NotificationEvent } from 'models/Notification';

import {
  CollaboratorRemovedNotificationLayout,
  ConversationTranscriptReadyNotificationLayout,
  InterventionConversationsTranscriptReadyNotificationLayout,
  NewCollaboratorAddedNotificationLayout,
  NewConversationNotificationLayout,
  NewNarratorWasSetNotificationLayout,
  StartEditingInterventionNotificationLayout,
  SuccessfullyRestoredInterventionNotificationLayout,
  UnsuccessfulImportNotificationLayout,
} from './components';
import { NotificationLayoutCommonProps } from './types';
import { StopEditingInterventionNotificationLayout } from './components/StopEditingInterventionNotificationLayout';

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
    case NotificationEvent.COLLABORATOR_REMOVED:
      return (
        <CollaboratorRemovedNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.START_EDITING_INTERVENTION:
      return (
        <StartEditingInterventionNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    case NotificationEvent.STOP_EDITING_INTERVENTION:
      return (
        <StopEditingInterventionNotificationLayout
          notification={notification}
          {...commonProps}
        />
      );
    default:
      return null;
  }
};

export default SingleNotification;
