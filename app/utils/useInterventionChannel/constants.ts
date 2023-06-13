export const INTERVENTION_CHANNEL_NAME = 'InterventionChannel';

export enum InterventionChannelMessageTopic {
  EDITING_STARTED = 'editing_started',
  EDITING_STOPPED = 'editing_stopped',
  UNEXPECTED_ERROR = 'unexpected_error',
}

export enum InterventionChannelActionName {
  ON_EDITING_STARTED = 'on_editing_started',
  ON_EDITING_STOPPED = 'on_editing_stopped',
}
