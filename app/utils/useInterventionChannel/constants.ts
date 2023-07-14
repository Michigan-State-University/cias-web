export const INTERVENTION_CHANNEL_NAME = 'InterventionChannel';

export enum InterventionChannelMessageTopic {
  UNEXPECTED_ERROR = 'unexpected_error',
  EDITING_STARTED = 'editing_started',
  EDITING_STOPPED = 'editing_stopped',
  FORCE_EDITING_STARTED = 'force_editing_started',
}

export enum InterventionChannelActionName {
  ON_EDITING_STARTED = 'on_editing_started',
  ON_EDITING_STOPPED = 'on_editing_stopped',
  ON_FORCE_EDITING_STARTED = 'on_force_editing_started',
}
