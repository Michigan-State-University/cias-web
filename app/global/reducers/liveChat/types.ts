import { ActionType } from 'typesafe-actions';

import {
  Conversation,
  InterventionConversation,
  Message,
} from 'models/LiveChat';
import { LiveChatSetup } from 'models/NavigatorSetup';
import { ApiError } from 'models/Api';

import * as actions from './actions';

export type LiveChatAction = ActionType<typeof actions>;

export type LiveChatState = {
  interventionConversations: Record<
    InterventionConversation['interventionId'],
    InterventionConversation
  >;
  conversations: Record<Conversation['id'], Conversation>;
  messages: Record<Conversation['id'], Message[]>;
  openedConversationId: Nullable<string>;
  guestInterlocutorId: Nullable<string>;
  creatingConversation: boolean;
  archivingConversation: boolean;
  navigatorUnavailable: boolean;
  liveChatSetup: Nullable<LiveChatSetup>;
  loaders: {
    conversations: boolean;
    messages: boolean;
    liveChatSetup: boolean;
  };
  errors: {
    conversations: Nullable<ApiError>;
    messages: Nullable<ApiError>;
  };
};

export type ReducedConversationsData = {
  interventionConversations: Record<string, InterventionConversation>;
  conversations: Record<Conversation['id'], Conversation>;
};

export type NewConversationData = {
  conversation: Conversation;
  interventionConversation: InterventionConversation;
};
