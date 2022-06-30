import { createSelector } from 'reselect';
import isNil from 'lodash/isNil';

import { RootState } from 'global/reducers';
import { makeSelectUserId } from 'global/reducers/auth';

import { initialState, liveChatReducerKey } from './reducer';
import { LiveChatState } from './types';

const selectLiveChatState = (rootState: RootState): LiveChatState =>
  rootState[liveChatReducerKey] || initialState;

export const makeSelectLiveChatLoader = (
  name: keyof LiveChatState['loaders'],
) => createSelector(selectLiveChatState, ({ loaders }) => loaders[name]);

export const makeSelectLiveChatError = (name: keyof LiveChatState['errors']) =>
  createSelector(selectLiveChatState, ({ errors }) => errors[name]);

export const makeSelectInterventionConversations = () =>
  createSelector(
    selectLiveChatState,
    ({ interventionConversations }) => interventionConversations,
  );

export const makeSelectConversations = () =>
  createSelector(selectLiveChatState, ({ conversations }) => conversations);

export const makeSelectOpenedConversationId = () =>
  createSelector(
    selectLiveChatState,
    ({ openedConversationId }) => openedConversationId,
  );

export const makeSelectOpenedConversation = () =>
  createSelector(
    selectLiveChatState,
    ({ conversations, openedConversationId }) => {
      if (isNil(openedConversationId)) return null;
      return conversations[openedConversationId];
    },
  );

export const makeSelectOpenedConversationMessages = () =>
  createSelector(selectLiveChatState, ({ messages, openedConversationId }) => {
    if (isNil(openedConversationId)) return null;
    return messages[openedConversationId];
  });

export const makeSelectCurrentInterlocutorId = () =>
  createSelector(
    makeSelectOpenedConversation(),
    makeSelectUserId(),
    (openedConversation, currentUserId) => {
      if (isNil(openedConversation)) return null;
      if (isNil(currentUserId)) return null;
      return (
        Object.values(openedConversation.liveChatInterlocutors).find(
          ({ userId }) => userId === currentUserId,
        )?.id ?? null
      );
    },
  );
