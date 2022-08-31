import { NotificationEvent } from './NotificationEvent';
import {
  ConversationCreatedNotificationData,
  NotificationData,
} from './NotificationData';

export type GenericNotification<
  Event extends NotificationEvent,
  Data extends NotificationData,
> = {
  notifiableId: string;
  notifiableType: string;
  createdAt: string;
  isRead: boolean;
  event: Event;
  data: Data;
};

export type ConversationCreatedNotification = GenericNotification<
  NotificationEvent.NEW_MESSAGE,
  ConversationCreatedNotificationData
>;

// Union type
export type Notification = ConversationCreatedNotification;
