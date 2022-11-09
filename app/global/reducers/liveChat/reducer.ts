import produce from 'immer';
import { getType } from 'typesafe-actions';
import { pull } from 'lodash';

import { updateItemById } from 'utils/reduxUtils';

import { WithReducer } from 'global/reducers/types';

import {
  fetchConversationMessagesError,
  fetchConversationMessagesRequest,
  fetchConversationMessagesSuccess,
  onMessageSentReceive,
  openConversation,
  onMessageReadReceive,
  closeConversation,
  fetchActiveConversationsRequest,
  fetchActiveConversationsSuccess,
  fetchActiveConversationsError,
  onConversationCreatedReceive,
  markMessageReadLocally,
  setCreatingConversation,
  setGuestInterlocutorId,
  setArchivingConversation,
  onConversationArchivedReceive,
  setNavigatorUnavailable,
  onLiveChatSetupFetchedReceive,
  setFetchingLiveChatSetup,
  fetchArchivedConversationsRequest,
  fetchArchivedConversationsSuccess,
  fetchArchivedConversationsError,
  fetchNavigatorHelpingMaterialsRequest,
  fetchNavigatorHelpingMaterialsSuccess,
  fetchNavigatorHelpingMaterialsError,
  onCurrentScreenTitleChanged,
  setCurrentNavigatorUnavailable,
  setCallingOutNavigator,
  setCallOutNavigatorUnlockTime,
  setCancellingCallOut,
  setWaitingForNavigator,
} from './actions';
import { LiveChatAction, LiveChatState } from './types';

export const liveChatReducerKey = 'liveChat';

export const initialState: LiveChatState = {
  activeInterventionConversations: {},
  activeConversations: {},
  archivedInterventionConversations: {},
  archivedConversations: {},
  messages: {},
  navigatorHelpingMaterialsStates: {},
  openedConversationId: null,
  guestInterlocutorId: null,
  creatingConversation: false,
  archivingConversation: false,
  callingOutNavigator: false,
  waitingForNavigator: false,
  cancellingCallOut: false,
  callOutNavigatorUnlockTime: null,
  navigatorUnavailable: false,
  currentNavigatorUnavailable: false,
  liveChatSetup: null,
  loaders: {
    activeConversations: false,
    archivedConversations: false,
    messages: false,
    liveChatSetup: false,
  },
  errors: {
    activeConversations: null,
    archivedConversations: null,
    messages: null,
  },
};

/* eslint-disable default-case, no-param-reassign */
export const liveChatReducer = (
  state: LiveChatState = initialState,
  { type, payload }: LiveChatAction,
) =>
  produce(state, (draft) => {
    switch (type) {
      case getType(openConversation): {
        const { conversationId } = payload;
        draft.openedConversationId = conversationId;
        break;
      }
      case getType(closeConversation): {
        draft.openedConversationId = null;
        draft.currentNavigatorUnavailable = false;
        break;
      }
      case getType(fetchActiveConversationsRequest): {
        draft.loaders.activeConversations = true;
        draft.errors.activeConversations = null;
        break;
      }
      case getType(fetchActiveConversationsSuccess): {
        const { interventionConversations, conversations } = payload;
        draft.activeInterventionConversations = interventionConversations;
        draft.activeConversations = conversations;
        draft.loaders.activeConversations = false;
        break;
      }
      case getType(fetchActiveConversationsError): {
        const { error } = payload;
        draft.loaders.activeConversations = false;
        draft.errors.activeConversations = error;
        break;
      }
      case getType(fetchArchivedConversationsRequest): {
        draft.loaders.archivedConversations = true;
        draft.errors.archivedConversations = null;
        break;
      }
      case getType(fetchArchivedConversationsSuccess): {
        const { interventionConversations, conversations } = payload;
        draft.archivedInterventionConversations = interventionConversations;
        draft.archivedConversations = conversations;
        draft.loaders.archivedConversations = false;
        break;
      }
      case getType(fetchArchivedConversationsError): {
        const { error } = payload;
        draft.loaders.archivedConversations = false;
        draft.errors.archivedConversations = error;
        break;
      }
      case getType(fetchConversationMessagesRequest): {
        draft.loaders.messages = true;
        draft.errors.messages = null;
        break;
      }
      case getType(fetchConversationMessagesSuccess): {
        const { conversationId, messages } = payload;
        draft.messages[conversationId] = messages;
        draft.loaders.messages = false;
        break;
      }
      case getType(fetchConversationMessagesError): {
        const { error } = payload;
        draft.loaders.messages = false;
        draft.errors.messages = error;
        break;
      }
      case getType(onMessageSentReceive): {
        const { message } = payload;
        const { conversationId } = message;
        draft.messages[conversationId]?.push(message);

        const conversation = draft.activeConversations[conversationId];
        if (conversation) {
          conversation.lastMessage = message;
        }
        break;
      }
      case getType(markMessageReadLocally): {
        const { conversationId, messageId } = payload;
        const { lastMessage } = draft.activeConversations[conversationId] ?? {};

        if (lastMessage?.id === messageId) {
          lastMessage.isRead = true;
        }

        const messages = draft.messages[conversationId];
        if (messages) {
          updateItemById(messages, messageId, {
            isRead: true,
          });
        }
        break;
      }
      case getType(onMessageReadReceive): {
        const { messageId, conversationId } = payload;

        const messages = draft.messages[conversationId];
        if (messages) {
          updateItemById(messages, messageId, {
            isRead: true,
          });
        }

        const { lastMessage } = draft.activeConversations[conversationId] ?? {};
        if (lastMessage && lastMessage.id === messageId) {
          lastMessage.isRead = true;
        }
        break;
      }
      case getType(setCreatingConversation): {
        draft.creatingConversation = payload.creatingConversation;
        break;
      }
      case getType(onConversationCreatedReceive): {
        const {
          newConversationData: { conversation, interventionConversation },
        } = payload;
        const { interventionId } = interventionConversation;
        if (state.activeInterventionConversations[interventionId]) {
          draft.activeInterventionConversations[
            interventionId
          ].conversationIds.push(conversation.id);
        } else {
          draft.activeInterventionConversations[interventionId] =
            interventionConversation;
        }
        draft.activeConversations[conversation.id] = conversation;
        draft.messages[conversation.id] = [conversation.lastMessage];
        break;
      }
      case getType(setGuestInterlocutorId): {
        draft.guestInterlocutorId = payload.guestInterlocutorId;
        break;
      }
      case getType(setArchivingConversation): {
        draft.archivingConversation = payload.archivingConversation;
        break;
      }
      case getType(setNavigatorUnavailable): {
        draft.navigatorUnavailable = payload.navigatorUnavailable;
        break;
      }
      case getType(setCurrentNavigatorUnavailable): {
        draft.currentNavigatorUnavailable = payload.currentNavigatorUnavailable;
        break;
      }
      case getType(onConversationArchivedReceive): {
        // find conversation to archive
        const { conversationId } = payload;
        const conversation = draft.activeConversations[conversationId];
        if (!conversation) break;

        // mark conversation as archive and move to archived conversations
        conversation.archived = true;
        draft.archivedConversations[conversationId] = conversation;
        delete draft.activeConversations[conversationId];

        // find intervention conversation associated with the archived conversation
        const { interventionId } = conversation;
        const activeInterventionConversation =
          draft.activeInterventionConversations[interventionId];
        if (!activeInterventionConversation) break;

        // remove conversation from active intervention conversation
        // and delete active intervention conversation if doesn't refer to
        // any conversation anymore
        pull(activeInterventionConversation.conversationIds, conversationId);
        if (activeInterventionConversation.conversationIds.length === 0) {
          delete draft.activeInterventionConversations[interventionId];
        }

        // add conversation to an existing archived intervention conversation
        // or create one if doesn't exist yet
        const archivedInterventionConversation =
          draft.archivedInterventionConversations[interventionId];
        if (archivedInterventionConversation) {
          archivedInterventionConversation.conversationIds.push(conversationId);
        } else {
          draft.archivedInterventionConversations[interventionId] = {
            interventionId,
            interventionName: activeInterventionConversation.interventionName,
            conversationIds: [conversationId],
          };
        }
        break;
      }
      case getType(onLiveChatSetupFetchedReceive): {
        draft.loaders.liveChatSetup = false;
        draft.liveChatSetup = payload.liveChatSetup;
        break;
      }
      case getType(setFetchingLiveChatSetup): {
        draft.loaders.liveChatSetup = payload.fetchingLiveChatSetup;
        break;
      }
      case getType(fetchNavigatorHelpingMaterialsRequest): {
        const { interventionId } = payload;
        draft.navigatorHelpingMaterialsStates[interventionId] = {
          data: null,
          loading: true,
          error: null,
        };
        break;
      }
      case getType(fetchNavigatorHelpingMaterialsSuccess): {
        const { interventionId, helpingMaterials } = payload;
        const navigatorHelpingMaterials =
          draft.navigatorHelpingMaterialsStates[interventionId];
        navigatorHelpingMaterials.data = helpingMaterials;
        navigatorHelpingMaterials.loading = false;
        break;
      }
      case getType(fetchNavigatorHelpingMaterialsError): {
        const { interventionId, error } = payload;
        const navigatorHelpingMaterials =
          draft.navigatorHelpingMaterialsStates[interventionId];
        navigatorHelpingMaterials.error = error;
        navigatorHelpingMaterials.loading = false;
        break;
      }
      case getType(onCurrentScreenTitleChanged): {
        const { conversationId, currentScreenTitle } = payload;
        const conversation = draft.activeConversations[conversationId];
        conversation.currentScreenTitle = currentScreenTitle;
        break;
      }
      case getType(setCallingOutNavigator): {
        draft.callingOutNavigator = payload.callingOutNavigator;
        break;
      }
      case getType(setCallOutNavigatorUnlockTime): {
        draft.callOutNavigatorUnlockTime = payload.unlockTime;
        break;
      }
      case getType(setWaitingForNavigator): {
        draft.waitingForNavigator = payload.waitingForNavigator;
        break;
      }
      case getType(setCancellingCallOut): {
        draft.cancellingCallOut = payload.cancellingCallOut;
        break;
      }
    }
  });

export const withLiveChatReducer: WithReducer = {
  key: liveChatReducerKey,
  // @ts-ignore
  reducer: liveChatReducer,
};
