import { ApiData } from 'models/Api';
import { Notification } from 'models/Notification';

import { SocketMessage } from 'utils/useSocket';

import { NotificationChannelMessageTopic } from './constants';

export type UnreadNotificationsFetchedData = ApiData<Notification[]>;

export type NewNotificationData = ApiData<Notification>;

// SOCKET MESSAGES
export type UnreadNotificationsFetchedSocketMessage = SocketMessage<
  NotificationChannelMessageTopic.UNREAD_NOTIFICATIONS_FETCHED,
  UnreadNotificationsFetchedData
>;

export type NewNotificationSocketMessage = SocketMessage<
  NotificationChannelMessageTopic.NEW_NOTIFICATION,
  NewNotificationData
>;

// Create a union type with any new SocketMessage type
export type NotificationChannelMessage =
  | NewNotificationSocketMessage
  | UnreadNotificationsFetchedSocketMessage;
