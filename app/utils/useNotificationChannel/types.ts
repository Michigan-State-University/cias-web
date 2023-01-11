import { ApiData, ApiDataCollection } from 'models/Api';
import { Notification } from 'models/Notification';

import { SocketAction, SocketMessage } from 'utils/useSocket';

import {
  NotificationChannelActionName,
  NotificationChannelMessageTopic,
} from './constants';

// DATA TYPES

export type UnreadNotificationsFetchedData = ApiDataCollection<Notification>;

export type NewNotificationData = ApiData<Notification>;

export type ReadNotificationData = {
  notificationId: string;
};

export type SetNavigatorAvailabilityData = {
  online: boolean;
};

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

// SOCKET ACTIONS

export type ReadNotificationSocketAction = SocketAction<
  NotificationChannelActionName.ON_READ_NOTIFICATION,
  ReadNotificationData
>;

export type SetNavigatorAvailabilityAction = SocketAction<
  NotificationChannelActionName.ON_NAVIGATOR_AVAILABILITY_SET,
  SetNavigatorAvailabilityData
>;

export type NotificationChannelAction =
  | ReadNotificationSocketAction
  | SetNavigatorAvailabilityAction;
