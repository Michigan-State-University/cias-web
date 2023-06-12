import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';

import { Editor } from 'models/Intervention';

import {
  SocketErrorMessageData,
  SocketMessageListener,
  useSocket,
} from 'utils/useSocket';
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
  UnexpectedErrorData,
} from './types';
import {
  INTERVENTION_CHANNEL_NAME,
  InterventionChannelActionName,
  InterventionChannelMessageTopic,
} from './constants';

export type InterventionChannel = ReturnType<typeof useInterventionChannel>;

export const useInterventionChannel = (interventionId?: string) => {
  const dispatch = useDispatch();

  const showErrorToast = ({ error }: SocketErrorMessageData) => {
    toast.error(error);
  };

  const onEditingStarted = ({ current_editor }: EditingStartedData) => {
    const currentEditor: Editor = objectToCamelCase(current_editor);
    dispatch(setCurrentEditor(currentEditor));
    dispatch(setStartingEditing(false));
  };

  const onEditingStopped = () => {
    dispatch(setCurrentEditor(null));
    dispatch(setStoppingEditing(false));
  };

  const onUnexpectedError = (errorData: UnexpectedErrorData) => {
    showErrorToast(errorData);
    dispatch(setStoppingEditing(false));
    dispatch(setStartingEditing(false));
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
      case InterventionChannelMessageTopic.UNEXPECTED_ERROR:
        onUnexpectedError(data);
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
