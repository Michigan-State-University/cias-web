import { NotificationEvent } from './NotificationEvent';
import {
  NewConversationNotificationData,
  NewNarratorWasSetNotificationData,
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

export type NewNarratorWasSetNotification = GenericNotification<
  NotificationEvent.NEW_NARRATOR_WAS_SET,
  NewNarratorWasSetNotificationData
>;

// Union type
export type Notification =
  | NewConversationNotification
  | NewNarratorWasSetNotification;
