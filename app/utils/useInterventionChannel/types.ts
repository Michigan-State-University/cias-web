import { EditorDTO } from 'models/Intervention';

import {
  SocketAction,
  SocketErrorMessage,
  SocketErrorMessageData,
  SocketMessage,
} from 'utils/useSocket';

import {
  InterventionChannelActionName,
  InterventionChannelMessageTopic,
} from './constants';

// DATA TYPES

export type UnexpectedErrorData = SocketErrorMessageData;

export type OnEditingStartedData = {};
export type EditingStartedData = {
  current_editor: EditorDTO;
};

export type OnEditingStoppedData = {};
export type EditingStoppedData = {};

export type OnForceEditingStartedData = {};
export type ForceEditingStartedData = {
  current_editor: EditorDTO;
};

// SOCKET MESSAGES
export type UnexpectedErrorSocketErrorMessage = SocketErrorMessage<
  InterventionChannelMessageTopic.UNEXPECTED_ERROR,
  UnexpectedErrorData,
  400
>;

export type EditingStartedSocketMessage = SocketMessage<
  InterventionChannelMessageTopic.EDITING_STARTED,
  EditingStartedData
>;

export type EditingStoppedSocketMessage = SocketMessage<
  InterventionChannelMessageTopic.EDITING_STOPPED,
  EditingStoppedData
>;

export type ForceEditingStartedMessage = SocketMessage<
  InterventionChannelMessageTopic.FORCE_EDITING_STARTED,
  ForceEditingStartedData
>;

// Create a union type with any new SocketMessage type
export type InterventionChannelMessage =
  | EditingStartedSocketMessage
  | EditingStoppedSocketMessage
  | UnexpectedErrorSocketErrorMessage
  | ForceEditingStartedMessage;

// SOCKET ACTIONS

export type StartEditingSocketAction = SocketAction<
  InterventionChannelActionName.ON_EDITING_STARTED,
  OnEditingStartedData
>;

export type StopEditingSocketAction = SocketAction<
  InterventionChannelActionName.ON_EDITING_STOPPED,
  OnEditingStoppedData
>;

export type ForceStartEditingSocketAction = SocketAction<
  InterventionChannelActionName.ON_FORCE_EDITING_STARTED,
  OnForceEditingStartedData
>;

// Create a union type with any new SocketAction type
export type InterventionChannelAction =
  | StartEditingSocketAction
  | StopEditingSocketAction
  | ForceStartEditingSocketAction;

export type InterventionChannelConnectionParams = {
  id?: string;
};
