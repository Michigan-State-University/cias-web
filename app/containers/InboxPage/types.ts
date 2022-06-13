import { ApiData } from 'models/Api';
import { Message, MessageReadDTO, NewMessageDTO } from 'models/LiveChat';

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

// Create a union type with any new SocketMessage type
export type ConversationChannelMessage =
  | MessageSentSocketMessage
  | MessageReadSocketMessage;

// SOCKET ACTIONS

export type OnMessageSentSocketAction = SocketAction<
  ConversationChannelActionName.ON_MESSAGE_SENT,
  NewMessageDTO
>;

export type OnMessageReadSocketAction = SocketAction<
  ConversationChannelActionName.ON_MESSAGE_READ,
  MessageReadDTO
>;

// Create a union type with any new SocketAction type
export type ConversationChannelAction =
  | OnMessageSentSocketAction
  | OnMessageReadSocketAction;
