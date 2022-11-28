import { AppFile } from 'models/File';

export type NewConversationNotificationData = {
  conversationId: string;
  userId: string;
  avatarUrl?: Nullable<string>;
  firstName: string;
  lastName: string;
  message: string;
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

// Union type
export type NotificationData =
  | NewConversationNotificationData
  | ConversationTranscriptReadyNotificationData
  | InterventionConversationsTranscriptReadyNotificationData;
