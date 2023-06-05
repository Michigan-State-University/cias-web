import { useDispatch } from 'react-redux';

import { Editor } from 'models/Intervention';

import { SocketMessageListener, useSocket } from 'utils/useSocket';
import objectToCamelCase from 'utils/objectToCamelCase';

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
import {
  setCurrentEditor,
  setStartingEditing,
  setStoppingEditing,
} from '../../global/reducers/intervention';

export type InterventionChannel = ReturnType<typeof useInterventionChannel>;

export const useInterventionChannel = (id: string) => {
  const dispatch = useDispatch();

  const onEditingStarted = (data: EditingStartedData) => {
    const currentEditor: Editor = objectToCamelCase(data);
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

  const channel = useSocket<
    InterventionChannelMessage,
    InterventionChannelAction,
    InterventionChannelConnectionParams
  >(INTERVENTION_CHANNEL_NAME, messageListener, {
    socketConnectionParams: { id },
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
