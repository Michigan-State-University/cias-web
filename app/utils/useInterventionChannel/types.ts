import { EditorDTO } from 'models/Intervention';

import { SocketAction, SocketMessage } from 'utils/useSocket';

import {
  InterventionChannelActionName,
  InterventionChannelMessageTopic,
} from './constants';

// DATA TYPES

export type StartEditingData = {};
export type EditingStartedData = EditorDTO;

export type StopEditingData = {};
export type EditingStoppedData = {};

// SOCKET MESSAGES

export type EditingStartedSocketMessage = SocketMessage<
  InterventionChannelMessageTopic.EDITING_STARTED,
  EditingStartedData
>;

export type EditingStoppedSocketMessage = SocketMessage<
  InterventionChannelMessageTopic.EDITING_STOPPED,
  EditingStoppedData
>;

// Create a union type with any new SocketMessage type
export type InterventionChannelMessage =
  | EditingStartedSocketMessage
  | EditingStoppedSocketMessage;

// SOCKET ACTIONS

export type StartEditingSocketAction = SocketAction<
  InterventionChannelActionName.ON_EDITING_STARTED,
  {}
>;

export type StopEditingSocketAction = SocketAction<
  InterventionChannelActionName.ON_EDITING_STOPPED,
  {}
>;

// Create a union type with any new SocketAction type
export type InterventionChannelAction =
  | StartEditingSocketAction
  | StopEditingSocketAction;

export type InterventionChannelConnectionParams = {
  id: string;
};
