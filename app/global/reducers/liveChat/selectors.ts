import { createSelector } from 'reselect';
import isNil from 'lodash/isNil';

import { InterventionConversation } from 'models/LiveChat';

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

export const makeSelectInterventionConversationsValues = () =>
  createSelector(selectLiveChatState, ({ interventionConversations }) =>
    Object.values(interventionConversations),
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

export const makeSelectUnreadConversationsCounts = () =>
  createSelector(
    makeSelectInterventionConversationsValues(),
    makeSelectConversations(),
    makeSelectUserId(),
    (interventionConversationsValues, conversations, currentUserId) =>
      interventionConversationsValues.reduce(
        (unreadConversationsCounts, { interventionId, conversationIds }) => {
          const count = conversationIds.filter((conversationId) => {
            const { lastMessage, liveChatInterlocutors } =
              conversations[conversationId];
            if (!lastMessage || lastMessage.isRead) return false;

            return (
              liveChatInterlocutors[lastMessage.interlocutorId]?.userId !==
              currentUserId
            );
          }).length;

          // eslint-disable-next-line no-param-reassign
          unreadConversationsCounts[interventionId] = count;
          return unreadConversationsCounts;
        },
        {} as Record<InterventionConversation['interventionId'], number>,
      ),
  );

export const makeSelectCreatingConversation = () =>
  createSelector(
    selectLiveChatState,
    ({ creatingConversation }) => creatingConversation,
  );
