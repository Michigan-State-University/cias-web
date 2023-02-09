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

// Union type
export type NotificationData =
  | NewConversationNotificationData
  | ConversationTranscriptReadyNotificationData
  | InterventionConversationsTranscriptReadyNotificationData
  | SuccessfullyRestoredInterventionNotificationData
  | UnsuccessfulImportNotificationData
  | NewNarratorWasSetNotificationData;
