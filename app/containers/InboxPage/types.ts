import { Channel } from '@anycable/web';

import { ApiData } from 'models/Api';
import { LiveChatMessage } from 'models/LiveChatMessage';

import { SocketMessage } from 'utils/useSocket';

import { ConversationChannelTopic } from './constants';

export type NewChatMessageSocketMessage = SocketMessage<
  ConversationChannelTopic.NEW_CHAT_MESSAGE,
  ApiData<LiveChatMessage>
>;

// Create a union type with any new SocketMessage type
export type ConversationChannelMessage = NewChatMessageSocketMessage;

// Use this type for useSocket hook
export type ConversationChannel = Channel<{}, ConversationChannelMessage>;
