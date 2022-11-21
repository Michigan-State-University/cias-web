import { NotificationEvent } from './NotificationEvent';
import {
  ConversationTranscriptReadyNotificationData,
  InterventionConversationsTranscriptReadyNotificationData,
  NewConversationNotificationData,
  NotificationData,
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

export type ConversationTranscriptReadyNotification = GenericNotification<
  NotificationEvent.CONVERSATION_TRANSCRIPT_READY,
  ConversationTranscriptReadyNotificationData
>;

export type InterventionConversationsTranscriptReadyNotification =
  GenericNotification<
    NotificationEvent.INTERVENTION_CONVERSATIONS_TRANSCRIPT_READY,
    InterventionConversationsTranscriptReadyNotificationData
  >;

// Union type
export type Notification =
  | NewConversationNotification
  | ConversationTranscriptReadyNotification
  | InterventionConversationsTranscriptReadyNotification;
