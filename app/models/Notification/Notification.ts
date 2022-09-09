import { NotificationEvent } from './NotificationEvent';
import {
  ConversationCreatedNotificationData,
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

export type ConversationCreatedNotification = GenericNotification<
  NotificationEvent.NEW_CONVERSATION,
  ConversationCreatedNotificationData
>;

// Union type
export type Notification = ConversationCreatedNotification;
