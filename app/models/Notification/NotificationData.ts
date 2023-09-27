import { CharacterType } from 'models/Character';
import { AppFile } from 'models/File';

export type NewConversationNotificationData = {
  conversationId: string;
  userId: string;
  avatarUrl?: Nullable<string>;
  firstName: string;
  lastName: string;
  message: string;
};

export type NewNarratorWasSetNotificationData = {
  name: string;
  newNarrator: CharacterType;
};

export type ConversationTranscriptReadyNotificationData = {
  archived: boolean;
  conversationId: string;
  interventionName: string;
  transcript: AppFile;
};

export type InterventionConversationsTranscriptReadyNotificationData = {
  interventionId: string;
  interventionName: string;
  transcript: AppFile;
};

export type SuccessfullyRestoredInterventionNotificationData = {
  interventionId: string;
  interventionName: string;
};

export type UnsuccessfulImportNotificationData = {};

export type NewCollaboratorAddedNotificationData = {
  interventionName: string;
  interventionId: string;
};

export type CollaboratorRemovedNotificationData = {
  interventionName: string;
  interventionId: string;
};

export type StartEditingInterventionNotificationData = {
  interventionName: string;
  interventionId: string;
  userId: string;
  firstName: string;
  lastName: string;
  avatarUrl: string;
};

export type StopEditingInterventionNotificationData =
  StartEditingInterventionNotificationData;

export type SensitiveDataRemovedNotificationData = {
  interventionId: string;
  interventionName: string;
};

// Union type
export type NotificationData =
  | NewConversationNotificationData
  | ConversationTranscriptReadyNotificationData
  | InterventionConversationsTranscriptReadyNotificationData
  | SuccessfullyRestoredInterventionNotificationData
  | UnsuccessfulImportNotificationData
  | NewNarratorWasSetNotificationData
  | NewCollaboratorAddedNotificationData
  | CollaboratorRemovedNotificationData
  | StartEditingInterventionNotificationData
  | StopEditingInterventionNotificationData
  | SensitiveDataRemovedNotificationData;
