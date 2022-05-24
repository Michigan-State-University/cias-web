import { createSelector } from 'reselect';

import { initialState } from './reducer';
import { LiveChatState } from './types';

const selectLiveChatState = (rootState: {
  liveChat: LiveChatState;
}): LiveChatState => rootState.liveChat || initialState;

export const makeSelectSingleConversationState = (conversationId: string) =>
  createSelector(
    selectLiveChatState,
    ({ conversations }) => conversations[conversationId],
  );
