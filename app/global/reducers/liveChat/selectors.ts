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

export const makeSelectActiveInterventionConversations = () =>
  createSelector(
    selectLiveChatState,
    ({ activeInterventionConversations }) => activeInterventionConversations,
  );

export const makeSelectArchivedInterventionConversations = () =>
  createSelector(
    selectLiveChatState,
    ({ archivedInterventionConversations }) =>
      archivedInterventionConversations,
  );

export const makeSelectActiveConversations = () =>
  createSelector(
    selectLiveChatState,
    ({ activeConversations }) => activeConversations,
  );

export const makeSelectArchivedConversations = () =>
  createSelector(
    selectLiveChatState,
    ({ archivedConversations }) => archivedConversations,
  );

export const makeSelectOpenedConversationId = () =>
  createSelector(
    selectLiveChatState,
    ({ openedConversationId }) => openedConversationId,
  );

export const makeSelectOpenedConversation = () =>
  createSelector(
    selectLiveChatState,
    ({ activeConversations, archivedConversations, openedConversationId }) => {
      if (isNil(openedConversationId)) return null;
      return (
        activeConversations[openedConversationId] ??
        archivedConversations[openedConversationId]
      );
    },
  );

export const makeSelectOpenedConversationMessages = () =>
  createSelector(selectLiveChatState, ({ messages, openedConversationId }) => {
    if (isNil(openedConversationId)) return null;
    return messages[openedConversationId];
  });

export const makeSelectGuestInterlocutorId = () =>
  createSelector(
    selectLiveChatState,
    ({ guestInterlocutorId }) => guestInterlocutorId,
  );

export const makeSelectCurrentInterlocutorId = () =>
  createSelector(
    makeSelectOpenedConversation(),
    makeSelectUserId(),
    makeSelectGuestInterlocutorId(),
    (openedConversation, currentUserId, guestInterlocutorId) => {
      if (isNil(openedConversation)) return null;

      if (currentUserId) {
        return (
          Object.values(openedConversation.liveChatInterlocutors).find(
            ({ userId }) => userId === currentUserId,
          )?.id ?? null
        );
      }

      return guestInterlocutorId;
    },
  );

export const makeSelectCreatingConversation = () =>
  createSelector(
    selectLiveChatState,
    ({ creatingConversation }) => creatingConversation,
  );

export const makeSelectArchivingConversation = () =>
  createSelector(
    selectLiveChatState,
    ({ archivingConversation }) => archivingConversation,
  );

export const makeSelectNavigatorUnavailable = () =>
  createSelector(
    selectLiveChatState,
    ({ navigatorUnavailable }) => navigatorUnavailable,
  );

export const makeSelectLiveChatSetup = () =>
  createSelector(selectLiveChatState, ({ liveChatSetup }) => liveChatSetup);

export const makeSelectParticipantFiles = () =>
  createSelector(
    selectLiveChatState,
    ({ liveChatSetup }) => liveChatSetup?.participantFiles,
  );

export const makeSelectOpenedConversationInterventionId = () =>
  createSelector(
    makeSelectOpenedConversation(),
    (openedConversation) => openedConversation?.interventionId,
  );

export const makeSelectNavigatorHelpingMaterialsStates = () =>
  createSelector(
    selectLiveChatState,
    ({ navigatorHelpingMaterialsStates }) => navigatorHelpingMaterialsStates,
  );

export const makeSelectOpenedConversationNavigatorHelpingMaterialsState = () =>
  createSelector(
    makeSelectOpenedConversationInterventionId(),
    makeSelectNavigatorHelpingMaterialsStates(),
    (interventionId, navigatorHelpingMaterialsStates) => {
      if (!interventionId) return null;
      return navigatorHelpingMaterialsStates[interventionId];
    },
  );

export const makeSelectOtherInterlocutor = () =>
  createSelector(
    makeSelectOpenedConversation(),
    makeSelectUserId(),
    (openedConversation, currentUserId) => {
      const liveChatInterlocutors = openedConversation?.liveChatInterlocutors;
      return (
        liveChatInterlocutors &&
        Object.values(liveChatInterlocutors).find(
          ({ userId }) => userId !== currentUserId,
        )
      );
    },
  );
