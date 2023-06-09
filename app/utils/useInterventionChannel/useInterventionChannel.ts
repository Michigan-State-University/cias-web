import { useDispatch } from 'react-redux';

import { Editor } from 'models/Intervention';

import { SocketMessageListener, useSocket } from 'utils/useSocket';
import objectToCamelCase from 'utils/objectToCamelCase';

import {
  resetCollaborationState,
  setCurrentEditor,
  setStartingEditing,
  setStoppingEditing,
} from 'global/reducers/intervention';

import {
  InterventionChannelMessage,
  EditingStartedData,
  InterventionChannelAction,
  InterventionChannelConnectionParams,
} from './types';
import {
  INTERVENTION_CHANNEL_NAME,
  InterventionChannelActionName,
  InterventionChannelMessageTopic,
} from './constants';

export type InterventionChannel = ReturnType<typeof useInterventionChannel>;

export const useInterventionChannel = (interventionId?: string) => {
  const dispatch = useDispatch();

  const onEditingStarted = ({ current_editor }: EditingStartedData) => {
    const currentEditor: Editor = objectToCamelCase(current_editor);
    dispatch(setCurrentEditor(currentEditor));
    dispatch(setStartingEditing(false));
  };

  const onEditingStopped = () => {
    dispatch(setCurrentEditor(null));
    dispatch(setStoppingEditing(false));
  };

  const messageListener: SocketMessageListener<InterventionChannelMessage> = ({
    data,
    topic,
  }) => {
    switch (topic) {
      case InterventionChannelMessageTopic.EDITING_STARTED:
        onEditingStarted(data);
        break;
      case InterventionChannelMessageTopic.EDITING_STOPPED:
        onEditingStopped();
        break;
      default:
        break;
    }
  };

  const onUnsubscribe = () => {
    dispatch(resetCollaborationState());
  };

  const channel = useSocket<
    InterventionChannelMessage,
    InterventionChannelAction,
    InterventionChannelConnectionParams
  >(INTERVENTION_CHANNEL_NAME, messageListener, {
    socketConnectionParams: { id: interventionId },
    suspend: !interventionId,
    onUnsubscribe,
  });

  const startEditing = () => {
    dispatch(setStartingEditing(true));
    channel?.perform({
      name: InterventionChannelActionName.ON_EDITING_STARTED,
      data: {},
    });
  };

  const stopEditing = () => {
    dispatch(setStoppingEditing(true));
    channel?.perform({
      name: InterventionChannelActionName.ON_EDITING_STOPPED,
      data: {},
    });
  };

  return {
    startEditing,
    stopEditing,
  };
};
