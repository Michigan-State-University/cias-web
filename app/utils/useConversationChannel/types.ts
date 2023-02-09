import { ApiData } from 'models/Api';
import { DenormalizedConversation, Message } from 'models/LiveChat';
import { LiveChatSetup } from 'models/NavigatorSetup';

import {
  SocketAction,
  SocketErrorMessage,
  SocketErrorMessageData,
  SocketMessage,
} from 'utils/useSocket';

import {
  ConversationChannelActionName,
  ConversationChannelMessageTopic,
} from './constants';

// DATA TYPES

export type MessageSentData = ApiData<Message>;
export type SendMessageData = {
  conversationId: string;
  interlocutorId: string;
  content: string;
};

export type MessageErrorData = SocketErrorMessageData<{
  conversationId: string;
}>;

export type MessageReadData = {
  conversationId: string;
  messageId: string;
};
export type ReadMessageData = MessageReadData;

export type ConversationCreatedData = ApiData<DenormalizedConversation>;
export type CreateConversationData = {
  firstMessageContent: string;
  interventionId: string;
};

export type NavigatorUnavailableErrorData = SocketErrorMessageData;

export type ConversationArchivedData = {
  conversationId: string;
  archivedAt: string;
};

export type ArchiveConversationData = {
  conversationId: string;
};

export type FetchLiveChatSetupData = {
  interventionId: string;
};

export type ChangeScreenTitleData = {
  conversationId: string;
  currentScreenTitle: string;
  currentLocation: string;
};

export type LiveChatSetupFetchedData = ApiData<LiveChatSetup>;

export type CallOutNavigatorData = {
  interventionId: string;
};

export type NavigatorCalledOutData = {
  unlockTime: string;
};

export type CallOutNavigatorErrorData = SocketErrorMessageData<{
  unlockTime: string;
}>;

export type CancelCallOutData = {
  interventionId: string;
};

export type CallOutCancelledData = {
  summoningUserId: string;
};

export type CurrentNavigatorAvailableData = {
  conversationId: string;
};

// SOCKET MESSAGES

export type MessageSentSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.MESSAGE_SENT,
  MessageSentData
>;

export type MessageErrorSocketErrorMessage = SocketErrorMessage<
  ConversationChannelMessageTopic.MESSAGE_ERROR,
  MessageErrorData,
  422
>;

export type MessageReadSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.MESSAGE_READ,
  MessageReadData
>;

export type ConversationCreatedSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CONVERSATION_CREATED,
  ConversationCreatedData
>;

export type NavigatorUnavailableSocketMessage =
  SocketMessage<ConversationChannelMessageTopic.NAVIGATOR_UNAVAILABLE>;

export type NavigatorUnavailableErrorSocketErrorMessage = SocketErrorMessage<
  ConversationChannelMessageTopic.NAVIGATOR_UNAVAILABLE_ERROR,
  NavigatorUnavailableErrorData,
  404
>;

export type ConversationArchivedSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CONVERSATION_ARCHIVED,
  ConversationArchivedData
>;

export type LiveChatSetupFetchedSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.LIVE_CHAT_SETUP_FETCHED,
  LiveChatSetupFetchedData
>;

export type NavigatorAvailableSocketMessage =
  SocketMessage<ConversationChannelMessageTopic.NAVIGATOR_AVAILABLE>;

export type CurrentScreenTitleChangedSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CURRENT_SCREEN_TITLE_CHANGED,
  ChangeScreenTitleData
>;

export type CurrentNavigatorUnavailableSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CURRENT_NAVIGATOR_UNAVAILABLE,
  CurrentNavigatorAvailableData
>;

export type CurrentNavigatorAvailableSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CURRENT_NAVIGATOR_AVAILABLE,
  CurrentNavigatorAvailableData
>;

export type NavigatorCalledOutSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.NAVIGATOR_CALLED_OUT,
  NavigatorCalledOutData
>;

export type CalOutUnavailableSocketErrorMessage = SocketErrorMessage<
  ConversationChannelMessageTopic.CALL_OUT_UNAVAILABLE_ERROR,
  CallOutNavigatorErrorData,
  422
>;

export type CallOutCalledSocketMessage = SocketMessage<
  ConversationChannelMessageTopic.CALL_OUT_CANCELLED,
  CallOutCancelledData
>;

// Create a union type with any new SocketMessage type
export type ConversationChannelMessage =
  | MessageSentSocketMessage
  | MessageErrorSocketErrorMessage
  | MessageReadSocketMessage
  | ConversationCreatedSocketMessage
  | NavigatorUnavailableSocketMessage
  | ConversationArchivedSocketMessage
  | NavigatorUnavailableErrorSocketErrorMessage
  | LiveChatSetupFetchedSocketMessage
  | NavigatorAvailableSocketMessage
  | CurrentScreenTitleChangedSocketMessage
  | CurrentNavigatorUnavailableSocketMessage
  | CurrentNavigatorAvailableSocketMessage
  | NavigatorCalledOutSocketMessage
  | CalOutUnavailableSocketErrorMessage
  | CallOutCalledSocketMessage;

// SOCKET ACTIONS

export type SendMessageSocketAction = SocketAction<
  ConversationChannelActionName.ON_MESSAGE_SENT,
  SendMessageData
>;

export type ReadMessageSocketAction = SocketAction<
  ConversationChannelActionName.ON_MESSAGE_READ,
  ReadMessageData
>;

export type CreateConversationSocketAction = SocketAction<
  ConversationChannelActionName.ON_CONVERSATION_CREATED,
  CreateConversationData
>;

export type ArchiveConversationSocketAction = SocketAction<
  ConversationChannelActionName.ON_CONVERSATION_ARCHIVED,
  ArchiveConversationData
>;

export type FetchLiveChatSetupSocketAction = SocketAction<
  ConversationChannelActionName.ON_FETCH_LIVE_CHAT_SETUP,
  FetchLiveChatSetupData
>;

export type ChangeScreenTitleAction = SocketAction<
  ConversationChannelActionName.ON_CURRENT_SCREEN_TITLE_CHANGED,
  ChangeScreenTitleData
>;

export type CallOutNavigatorAction = SocketAction<
  ConversationChannelActionName.ON_CALL_OUT_NAVIGATOR,
  CallOutNavigatorData
>;

export type CancelCallOutAction = SocketAction<
  ConversationChannelActionName.ON_CANCEL_CALL_OUT,
  CancelCallOutData
>;

// Create a union type with any new SocketAction type
export type ConversationChannelAction =
  | SendMessageSocketAction
  | ReadMessageSocketAction
  | CreateConversationSocketAction
  | ArchiveConversationSocketAction
  | FetchLiveChatSetupSocketAction
  | ChangeScreenTitleAction
  | CallOutNavigatorAction
  | CancelCallOutAction;

export type ConversationChannelConnectionParams = {
  intervention_id?: string;
};
