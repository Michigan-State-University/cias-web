import { ActionType } from 'typesafe-actions';

import { LiveChatMessage } from 'models/LiveChatMessage';
import * as actions from './actions';

export type LiveChatAction = ActionType<typeof actions>;

type ConversationRecord = {
  loading: boolean;
  messages: LiveChatMessage[];
  hasError: boolean;
};

export type LiveChatState = {
  conversations: Record<string, ConversationRecord>;
};
