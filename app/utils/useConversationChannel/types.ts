import { ApiData } from 'models/Api';
import {
  DenormalizedConversation,
  Message,
  MessageReadDTO,
  ConversationCreatedDTO,
  MessageSentDTO,
} from 'models/LiveChat';

import { SocketAction, SocketMessage } from 'utils/useSocket';

import {
  ConversationChannelActionName,
  ConversationChannelMessageTopic,
} from './constants';

// SOCKET MESSAGES

export type MessageSentSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.MESSAGE_SENT,
  ApiData<Message>
>;

export type MessageReadSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.MESSAGE_READ,
  MessageReadDTO
>;

export type ConversationCreatedSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CONVERSATION_CREATED,
  ApiData<DenormalizedConversation>
>;

// Create a union type with any new SocketMessage type
export type ConversationChannelMessage =
  | MessageSentSocketMessage
  | MessageReadSocketMessage
  | ConversationCreatedSocketMessage;

// SOCKET ACTIONS

export type OnMessageSentSocketAction = SocketAction<
  ConversationChannelActionName.ON_MESSAGE_SENT,
  MessageSentDTO
>;

export type OnMessageReadSocketAction = SocketAction<
  ConversationChannelActionName.ON_MESSAGE_READ,
  MessageReadDTO
>;

export type OnConversationCreatedSocketAction = SocketAction<
  ConversationChannelActionName.ON_CONVERSATION_CREATED,
  ConversationCreatedDTO
>;

// Create a union type with any new SocketAction type
export type ConversationChannelAction =
  | OnMessageSentSocketAction
  | OnMessageReadSocketAction
  | OnConversationCreatedSocketAction;
