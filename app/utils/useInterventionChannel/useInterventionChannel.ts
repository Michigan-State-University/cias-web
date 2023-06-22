import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { useInjectSaga } from 'redux-injectors';

import { Editor } from 'models/Intervention';

import {
  SocketErrorMessageData,
  SocketMessageListener,
  useSocket,
} from 'utils/useSocket';
import objectToCamelCase from 'utils/objectToCamelCase';

import {
  refreshInterventionData,
  resetCollaborationState,
  setCurrentEditor,
  setStartingEditing,
  setStoppingEditing,
  withRefreshInterventionDataSaga,
} from 'global/reducers/intervention';

import {
  InterventionChannelMessage,
  EditingStartedData,
  InterventionChannelAction,
  InterventionChannelConnectionParams,
  UnexpectedErrorData,
  ForceEditingStartedData,
} from './types';
import {
  INTERVENTION_CHANNEL_NAME,
  InterventionChannelActionName,
  InterventionChannelMessageTopic,
} from './constants';

export type InterventionChannel = ReturnType<typeof useInterventionChannel>;

export const useInterventionChannel = (interventionId?: string) => {
  const dispatch = useDispatch();

  useInjectSaga(withRefreshInterventionDataSaga);

  const showErrorToast = ({ error }: SocketErrorMessageData) => {
    toast.error(error);
  };

  const onEditingStarted = ({ current_editor }: EditingStartedData) => {
    const currentEditor: Editor = objectToCamelCase(current_editor);
    dispatch(setCurrentEditor(currentEditor));
    dispatch(setStartingEditing(false));
  };

  const onEditingStopped = () => {
    dispatch(refreshInterventionData(interventionId!, false));
    dispatch(setCurrentEditor(null));
    dispatch(setStoppingEditing(false));
  };

  const onForceEditingStarted = ({
    current_editor,
  }: ForceEditingStartedData) => {
    const currentEditor: Editor = objectToCamelCase(current_editor);
    dispatch(setCurrentEditor(currentEditor));
    dispatch(setStartingEditing(false));
    // refreshes intervention data for the user forcing editing too to get
    // latest changes made by the user that was forced to stop editing
    dispatch(refreshInterventionData(interventionId!, true));
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
      case InterventionChannelMessageTopic.UNEXPECTED_ERROR:
        onUnexpectedError(data);
        break;
      case InterventionChannelMessageTopic.EDITING_STARTED:
        onEditingStarted(data);
        break;
      case InterventionChannelMessageTopic.EDITING_STOPPED:
        onEditingStopped();
        break;
      case InterventionChannelMessageTopic.FORCE_EDITING_STARTED:
        onForceEditingStarted(data);
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

  const forceStartEditing = () => {
    dispatch(setStartingEditing(true));
    channel?.perform({
      name: InterventionChannelActionName.ON_FORCE_EDITING_STARTED,
      data: {},
    });
  };

  return {
    startEditing,
    stopEditing,
    forceStartEditing,
  };
};
