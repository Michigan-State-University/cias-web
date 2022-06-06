import { createSelector } from 'reselect';

import { RootState } from 'global/reducers';

import { initialState, liveChatReducerKey } from './reducer';
import { LiveChatState } from './types';

const selectLiveChatState = (rootState: RootState): LiveChatState =>
  rootState[liveChatReducerKey] || initialState;

export const makeSelectSingleConversationState = (conversationId: string) =>
  createSelector(
    selectLiveChatState,
    ({ conversations }) => conversations[conversationId],
  );
