import { NotificationEvent } from './NotificationEvent';
import {
  CollaboratorRemovedNotificationData,
  ConversationTranscriptReadyNotificationData,
  InterventionConversationsTranscriptReadyNotificationData,
  NewCollaboratorAddedNotificationData,
  NewConversationNotificationData,
  NewNarratorWasSetNotificationData,
  NotificationData,
  SuccessfullyRestoredInterventionNotificationData,
  UnsuccessfulImportNotificationData,
} from './NotificationData';

export type GenericNotification<
  Event extends NotificationEvent,
  Data extends NotificationData,
> = {
  id: string;
  notifiableId: string;
  notifiableType: string;
  createdAt: string;
  isRead: boolean;
  event: Event;
  data: Data;
};

export type NewConversationNotification = GenericNotification<
  NotificationEvent.NEW_CONVERSATION,
  NewConversationNotificationData
>;

export type NewNarratorWasSetNotification = GenericNotification<
  NotificationEvent.NEW_NARRATOR_WAS_SET,
  NewNarratorWasSetNotificationData
>;

export type ConversationTranscriptReadyNotification = GenericNotification<
  NotificationEvent.CONVERSATION_TRANSCRIPT_READY,
  ConversationTranscriptReadyNotificationData
>;

export type InterventionConversationsTranscriptReadyNotification =
  GenericNotification<
    NotificationEvent.INTERVENTION_CONVERSATIONS_TRANSCRIPT_READY,
    InterventionConversationsTranscriptReadyNotificationData
  >;

export type SuccessfullyRestoredInterventionNotification = GenericNotification<
  NotificationEvent.SUCCESSFULLY_RESTORED_INTERVENTION,
  SuccessfullyRestoredInterventionNotificationData
>;

export type UnsuccessfulImportNotification = GenericNotification<
  NotificationEvent.UNSUCCESSFUL_INTERVENTION_IMPORT,
  UnsuccessfulImportNotificationData
>;

export type NewCollaboratorAddedNotification = GenericNotification<
  NotificationEvent.NEW_COLLABORATOR_ADDED,
  NewCollaboratorAddedNotificationData
>;

export type CollaboratorRemovedNotification = GenericNotification<
  NotificationEvent.COLLABORATOR_REMOVED,
  CollaboratorRemovedNotificationData
>;

// Union type
export type Notification =
  | NewConversationNotification
  | NewNarratorWasSetNotification
  | ConversationTranscriptReadyNotification
  | InterventionConversationsTranscriptReadyNotification
  | SuccessfullyRestoredInterventionNotification
  | UnsuccessfulImportNotification
  | NewCollaboratorAddedNotification
  | CollaboratorRemovedNotification;
