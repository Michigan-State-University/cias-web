import { SocketMessage } from 'utils/useSocket';

import { NotificationChannelMessageTopic } from './constants';

// SOCKET MESSAGES

export type PlaceholderSocketMessage = SocketMessage<
  NotificationChannelMessageTopic.PLACEHOLDER,
  {}
>;

// Create a union type with any new SocketMessage type
export type NotificationChannelMessage = PlaceholderSocketMessage;
