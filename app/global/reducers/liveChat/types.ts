import { ActionType } from 'typesafe-actions';

import { Conversation, Message } from 'models/LiveChat';
import { ApiError } from 'models/Api';

import * as actions from './actions';

export type LiveChatAction = ActionType<typeof actions>;

export type LiveChatState = {
  conversations: Record<Conversation['id'], Conversation>;
  messages: Record<Conversation['id'], Message[]>;
  openedConversationId: Nullable<string>;
  loaders: {
    conversations: boolean;
    messages: boolean;
  };
  errors: {
    conversations: Nullable<ApiError>;
    messages: Nullable<ApiError>;
  };
};
